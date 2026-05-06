import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const trackPageViewSchema = z.object({
  session_id: z.string().trim().min(1).max(100),
  path: z.string().trim().min(1).max(500),
  referrer: z.string().trim().max(500).optional().nullable(),
  utm_source: z.string().trim().max(100).optional().nullable(),
  utm_medium: z.string().trim().max(100).optional().nullable(),
  utm_campaign: z.string().trim().max(100).optional().nullable(),
  user_agent: z.string().trim().max(500).optional().nullable(),
});

// Cheap per-IP rate limit to keep bots from flooding analytics.
const ipHits = new Map<string, { count: number; reset: number }>();
function rateLimit(ip: string, max = 120, windowMs = 60 * 1000) {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.reset < now) {
    ipHits.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}

export const trackPageViewFn = createServerFn({ method: "POST" })
  .inputValidator((d) => trackPageViewSchema.parse(d))
  .handler(async ({ data }) => {
    const ip =
      (getRequestHeader("x-forwarded-for") ?? "").split(",")[0]?.trim() ||
      "unknown";

    if (!rateLimit(ip)) return { ok: false };

    const { error } = await supabaseAdmin.from("page_views").insert({
      session_id: data.session_id,
      path: data.path,
      referrer: data.referrer ?? null,
      utm_source: data.utm_source ?? null,
      utm_medium: data.utm_medium ?? null,
      utm_campaign: data.utm_campaign ?? null,
      user_agent: data.user_agent ?? null,
    });

    if (error) {
      console.error("trackPageView insert error:", error);
      return { ok: false };
    }
    return { ok: true };
  });
