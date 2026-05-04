import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Cloud, Mail, CreditCard, Webhook, BarChart3, Database, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/integrations")({
  head: () => ({ meta: [{ title: "Integrations — Boost Profits" }] }),
  component: IntegrationsPage,
});

const catalog = [
  { k: "google_sheets", i: Cloud, n: "Google Sheets", d: "Sync leads, invoices and payments to a sheet." },
  { k: "smtp", i: Mail, n: "Email (SMTP)", d: "Send branded reminders from your domain." },
  { k: "stripe", i: CreditCard, n: "Stripe", d: "Collect card and ACH payments instantly." },
  { k: "webhooks", i: Webhook, n: "Webhooks", d: "Trigger external workflows on payment events." },
  { k: "analytics", i: BarChart3, n: "Plausible / GA4", d: "Forward signup conversions to analytics." },
  { k: "hubspot", i: Database, n: "HubSpot CRM", d: "Two-way sync clients and pipeline stage." },
];

function IntegrationsPage() {
  const { session, loading: sessionLoading } = useSession();
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [pending, setPending] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionLoading) return;
    if (!session) { setLoading(false); return; }
    (async () => {
      const { data, error } = await supabase
        .from("user_integrations")
        .select("integration, connected")
        .eq("user_id", session.user.id);
      if (error) toast.error("Could not load integrations");
      else {
        const map: Record<string, boolean> = {};
        data?.forEach((r) => { map[r.integration] = r.connected; });
        setConnected(map);
      }
      setLoading(false);
    })();
  }, [session, sessionLoading]);

  const toggle = async (key: string, name: string) => {
    if (!session) return;
    const next = !connected[key];
    setPending((p) => ({ ...p, [key]: true }));
    const { error } = await supabase
      .from("user_integrations")
      .upsert(
        { user_id: session.user.id, integration: key, connected: next },
        { onConflict: "user_id,integration" },
      );
    setPending((p) => ({ ...p, [key]: false }));
    if (error) { toast.error(`Failed to ${next ? "connect" : "disconnect"} ${name}`); return; }
    setConnected((c) => ({ ...c, [key]: next }));
    toast.success(next ? `${name} connected` : `${name} disconnected`);
  };

  if (sessionLoading || loading) {
    return (
      <AppShell title="Integrations" subtitle="Connect Boost Profits to the tools you already use.">
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
      </AppShell>
    );
  }

  if (!session) {
    return (
      <AppShell title="Integrations" subtitle="Sign in to manage your integrations.">
        <Button asChild className="bg-cta text-primary-foreground"><Link to="/login">Sign in</Link></Button>
      </AppShell>
    );
  }

  return (
    <AppShell title="Integrations" subtitle="Connect Boost Profits to the tools you already use.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {catalog.map((it) => {
          const isOn = !!connected[it.k];
          const isPending = !!pending[it.k];
          return (
            <div key={it.k} className="card-premium lift p-6">
              <div className="flex items-start justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary"><it.i className="h-5 w-5" /></span>
                {isOn && <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-semibold text-success"><Check className="h-3 w-3" />Connected</span>}
              </div>
              <h3 className="mt-5 text-base font-bold">{it.n}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.d}</p>
              <Button
                onClick={() => toggle(it.k, it.n)}
                disabled={isPending}
                className={`mt-5 w-full ${isOn ? "" : "bg-cta text-primary-foreground"}`}
                variant={isOn ? "outline" : "default"}
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : isOn ? "Disconnect" : "Connect"}
              </Button>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
