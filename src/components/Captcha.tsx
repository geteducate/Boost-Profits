import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { getCaptchaSiteKey } from "@/server/captcha.functions";
import { ShieldCheck } from "lucide-react";

export function Captcha({ onVerify }: { onVerify: (token: string | null) => void }) {
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HCaptcha>(null);

  useEffect(() => {
    getCaptchaSiteKey()
      .then((r) => {
        setSiteKey(r.siteKey || null);
        setError(null);
      })
      .catch(() => {
        setSiteKey(null);
        setError("Bot protection couldn't load.");
      });
  }, []);

  if (!siteKey) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-3 py-2.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-success" />
        {error ?? "Bot protection initializing…"}
      </div>
    );
  }

  return (
    <div className="origin-top-left">
      <HCaptcha
        ref={ref}
        sitekey={siteKey}
        onVerify={(t) => onVerify(t)}
        onExpire={() => onVerify(null)}
        onError={() => onVerify(null)}
        onClose={() => onVerify(null)}
      />
    </div>
  );
}
