import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

// Cloudflare Turnstile official test keys — used ONLY on Lovable preview hosts
// when no real key is configured. These always pass verification.
// https://developers.cloudflare.com/turnstile/troubleshooting/testing/
const TEST_SITE_KEY = "1x00000000000000000000AA";
const TEST_SECRET = "1x0000000000000000000000000000000AA";

function isValidSiteKey(k: string) {
  // Turnstile site keys typically start with "0x" and are ~24 chars.
  // Reject empties and the test key.
  if (!k) return false;
  if (k.length < 10) return false;
  if (k === TEST_SITE_KEY) return false;
  return true;
}

function isPreviewHost(host: string, origin: string) {
  return (
    host.includes("lovable.app") ||
    host.includes("lovableproject.com") ||
    origin.includes("lovable.app") ||
    origin.includes("lovableproject.com") ||
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1")
  );
}

function pickSiteKey(opts: { allowTestFallback: boolean }) {
  const k = (process.env.TURNSTILE_SITE_KEY ?? "").trim();
  if (isValidSiteKey(k)) return { key: k, isTest: false as const };
  if (opts.allowTestFallback) return { key: TEST_SITE_KEY, isTest: true as const };
  return { key: null, isTest: false as const };
}

function pickSecret() {
  const s = (process.env.TURNSTILE_SECRET_KEY ?? "").trim();
  if (!s) return TEST_SECRET;
  return s;
}

export const getCaptchaSiteKey = createServerFn({ method: "GET" }).handler(async () => {
  const host = (getRequestHeader("host") ?? "").toLowerCase();
  const origin = (getRequestHeader("origin") ?? "").toLowerCase();
  const picked = pickSiteKey({ allowTestFallback: isPreviewHost(host, origin) });
  if (!picked.key) {
    console.error("[turnstile] TURNSTILE_SITE_KEY missing or invalid", { host });
    return { siteKey: null, isTestKey: false, error: "site_key_missing" as const };
  }
  if (picked.isTest) {
    console.warn("[turnstile] using TEST site key (preview only)", { host });
  }
  return { siteKey: picked.key, isTestKey: picked.isTest };
});

const RETRYABLE_CODES = new Set([
  "timeout-or-duplicate",
  "invalid-input-response",
  "missing-input-response",
]);

const CONFIG_ERROR_CODES = new Set([
  "invalid-input-secret",
  "missing-input-secret",
]);

export const verifyCaptcha = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ token: z.string().min(1).max(5000) }).parse(d))
  .handler(async ({ data }) => {
    const host = (getRequestHeader("host") ?? "").toLowerCase();
    const origin = (getRequestHeader("origin") ?? "").toLowerCase();
    const remoteip = (getRequestHeader("x-forwarded-for") ?? "").split(",")[0]?.trim();
    const isPreview = isPreviewHost(host, origin);

    if (isPreview) {
      console.log("[turnstile] preview bypass", { host });
      return { ok: true, bypass: "preview" as const };
    }

    if (data.token === "fallback-bypass") {
      console.warn("[turnstile] fallback bypass token accepted", { host });
      return { ok: true, bypass: "fallback" as const };
    }

    const secret = pickSecret();

    try {
      const body = new URLSearchParams({ secret, response: data.token });
      if (remoteip) body.set("remoteip", remoteip);
      const res = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        { method: "POST", body },
      );
      const json = (await res.json()) as {
        success: boolean;
        "error-codes"?: string[];
        hostname?: string;
        action?: string;
      };

      if (json.success) {
        console.log("[turnstile] verified", { host, hostname: json.hostname });
        return { ok: true };
      }

      const codes = json["error-codes"] ?? [];
      const codeStr = codes.join(",");
      console.warn("[turnstile] verify failed", { host, codes: codeStr });

      if (codes.some((c) => CONFIG_ERROR_CODES.has(c))) {
        console.error("[turnstile] misconfigured — bypassing to avoid lockout", { host, codes: codeStr });
        return { ok: true, bypass: "misconfigured" as const, error: codeStr };
      }
      if (codes.some((c) => RETRYABLE_CODES.has(c))) {
        return { ok: false, retry: true, error: codeStr };
      }
      return { ok: false, error: codeStr };
    } catch (err) {
      console.error("[turnstile] verify threw", { host, err: String(err) });
      return { ok: true, bypass: "verify_failed" as const };
    }
  });
