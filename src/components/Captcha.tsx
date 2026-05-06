import { useEffect, useRef, useState, useCallback } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { getCaptchaSiteKey } from "@/utils/captcha.functions";
import { ShieldCheck, ShieldAlert, RefreshCw, Loader2 } from "lucide-react";

type Status = "loading" | "ready" | "verified" | "expired" | "error" | "fallback";

export function Captcha({ onVerify }: { onVerify: (token: string | null) => void }) {
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState<string>("Loading bot protection…");
  const ref = useRef<HCaptcha>(null);

  const loadKey = useCallback(() => {
    setStatus("loading");
    setMessage("Loading bot protection…");
    getCaptchaSiteKey()
      .then((r) => {
        if (r?.siteKey) {
          setSiteKey(r.siteKey);
          setStatus("ready");
          setMessage("Verify you're human to continue.");
        } else {
          setSiteKey(null);
          setStatus("fallback");
          setMessage("Bot protection unavailable — you can continue.");
          onVerify("fallback-bypass");
        }
      })
      .catch(() => {
        setSiteKey(null);
        setStatus("fallback");
        setMessage("Bot protection unavailable — you can continue.");
        onVerify("fallback-bypass");
      });
  }, [onVerify]);

  useEffect(() => {
    loadKey();
  }, [loadKey]);

  const reset = () => {
    try {
      ref.current?.resetCaptcha();
    } catch {}
    onVerify(null);
    setStatus("ready");
    setMessage("Verify you're human to continue.");
  };

  if (!siteKey) {
    const Icon = status === "loading" ? Loader2 : status === "fallback" ? ShieldCheck : ShieldAlert;
    return (
      <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-3 py-2.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${status === "loading" ? "animate-spin" : status === "fallback" ? "text-success" : "text-destructive"}`} />
          {message}
        </span>
        {status !== "loading" && status !== "fallback" && (
          <button type="button" onClick={loadKey} className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] font-semibold hover:bg-muted">
            <RefreshCw className="h-3 w-3" /> Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          {status === "verified" ? (
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
          ) : (
            <ShieldCheck className="h-3.5 w-3.5" />
          )}
          {status === "verified" ? "Verified" : message}
        </span>
        <button type="button" onClick={reset} className="inline-flex items-center gap-1 hover:text-foreground">
          <RefreshCw className="h-3 w-3" /> Reset
        </button>
      </div>
      <div className="origin-top-left">
        <HCaptcha
          ref={ref}
          sitekey={siteKey}
          onVerify={(t) => {
            onVerify(t);
            setStatus("verified");
            setMessage("Verified");
          }}
          onExpire={() => {
            onVerify(null);
            setStatus("expired");
            setMessage("Verification expired — please retry.");
          }}
          onError={() => {
            onVerify(null);
            setStatus("error");
            setMessage("Verification failed — please retry.");
          }}
          onClose={() => onVerify(null)}
        />
      </div>
    </div>
  );
}
