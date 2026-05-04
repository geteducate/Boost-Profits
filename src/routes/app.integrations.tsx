import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Cloud, Mail, CreditCard, Webhook, BarChart3, Database, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/integrations")({
  head: () => ({ meta: [{ title: "Integrations — Boost Profits" }] }),
  component: IntegrationsPage,
});

const initial = [
  { i: Cloud, n: "Google Sheets", d: "Sync leads, invoices and payments to a sheet.", c: true },
  { i: Mail, n: "Email (SMTP)", d: "Send branded reminders from your domain.", c: true },
  { i: CreditCard, n: "Stripe", d: "Collect card and ACH payments instantly.", c: false },
  { i: Webhook, n: "Webhooks", d: "Trigger external workflows on payment events.", c: false },
  { i: BarChart3, n: "Plausible / GA4", d: "Forward signup conversions to analytics.", c: false },
  { i: Database, n: "HubSpot CRM", d: "Two-way sync clients and pipeline stage.", c: false },
];

function IntegrationsPage() {
  const [items, setItems] = useState(initial);

  const toggle = (name: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.n !== name) return it;
        const next = !it.c;
        toast.success(next ? `${name} connected` : `${name} disconnected`);
        return { ...it, c: next };
      }),
    );
  };

  return (
    <AppShell title="Integrations" subtitle="Connect Boost Profits to the tools you already use.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.n} className="card-premium lift p-6">
            <div className="flex items-start justify-between">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary"><it.i className="h-5 w-5" /></span>
              {it.c && <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-semibold text-success"><Check className="h-3 w-3" />Connected</span>}
            </div>
            <h3 className="mt-5 text-base font-bold">{it.n}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{it.d}</p>
            <Button
              onClick={() => toggle(it.n)}
              className={`mt-5 w-full ${it.c ? "" : "bg-cta text-primary-foreground"}`}
              variant={it.c ? "outline" : "default"}
            >
              {it.c ? "Disconnect" : "Connect"}
            </Button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
