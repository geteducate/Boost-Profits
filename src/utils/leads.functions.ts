import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { verifyCaptcha } from "@/utils/captcha.functions";

const submitLeadSchema = z.object({
  kind: z.enum(["contact", "demo", "newsletter"]).default("contact"),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(150).optional().nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
  utm_source: z.string().trim().max(100).optional().nullable(),
  utm_campaign: z.string().trim().max(100).optional().nullable(),
  captchaToken: z.string().min(1).max(5000),
});

// Per-IP in-memory rate limit (best effort, resets on cold start).
const ipHits = new Map<string, { count: number; reset: number }>();
function rateLimit(ip: string, max = 5, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.reset < now) {
    ipHits.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((d) => submitLeadSchema.parse(d))
  .handler(async ({ data }) => {
    const ip =
      (getRequestHeader("x-forwarded-for") ?? "").split(",")[0]?.trim() ||
      "unknown";

    if (!rateLimit(ip)) {
      throw new Response("Too many submissions, try again later.", { status: 429 });
    }

    const captcha = await verifyCaptcha({ data: { token: data.captchaToken } });
    if (!captcha.ok) {
      throw new Response("Captcha verification failed.", { status: 400 });
    }

    const { error } = await supabaseAdmin.from("leads").insert({
      kind: data.kind,
      name: data.name,
      email: data.email,
      company: data.company ?? null,
      message: data.message ?? null,
      utm_source: data.utm_source ?? null,
      utm_campaign: data.utm_campaign ?? null,
    });

    if (error) {
      console.error("submitLead insert error:", error);
      throw new Response("Could not save submission.", { status: 500 });
    }

    return { ok: true };
  });
