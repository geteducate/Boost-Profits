import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getCaptchaSiteKey = createServerFn({ method: "GET" }).handler(async () => {
  return { siteKey: process.env.HCAPTCHA_SITE_KEY ?? "" };
});

export const verifyCaptcha = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ token: z.string().min(1).max(5000) }).parse(d))
  .handler(async ({ data }) => {
    const secret = process.env.HCAPTCHA_SECRET_KEY;
    if (!secret) return { ok: false, error: "Captcha not configured" };
    try {
      const body = new URLSearchParams({ secret, response: data.token });
      const res = await fetch("https://api.hcaptcha.com/siteverify", { method: "POST", body });
      const json = (await res.json()) as { success: boolean; "error-codes"?: string[] };
      return { ok: !!json.success, error: json["error-codes"]?.join(",") };
    } catch (e) {
      return { ok: false, error: "verify_failed" };
    }
  });
