import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Boost Profits" }] }),
  component: SettingsPage,
});

const sections = ["Profile", "Workspace", "Branding", "Notifications", "Billing", "Security"] as const;
type Section = typeof sections[number];

const initialProfile = {
  fullName: "Jane Doe",
  email: "jane@studio.com",
  workspace: "Studio Northwind",
  currency: "USD ($)",
};

function SettingsPage() {
  const [active, setActive] = useState<Section>("Profile");
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [notifs, setNotifs] = useState({ paid: true, digest: true, confetti: false });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(draft);
    toast.success(`${active} saved`);
  };

  const cancel = () => {
    setDraft(profile);
    toast("Changes discarded");
  };

  return (
    <AppShell title="Settings" subtitle="Manage your workspace.">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="card-premium p-3 h-fit">
          {sections.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActive(s)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
                active === s ? "bg-cta text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </nav>
        <form className="card-premium p-6 space-y-6" onSubmit={save}>
          <div>
            <h2 className="text-lg font-bold">{active}</h2>
            <p className="text-sm text-muted-foreground">
              {active === "Profile" && "How you appear to clients on invoices and reminders."}
              {active === "Workspace" && "Workspace identity and defaults."}
              {active === "Branding" && "Logo, colors and email branding."}
              {active === "Notifications" && "Choose what we ping you about."}
              {active === "Billing" && "Plan, payment method and invoices."}
              {active === "Security" && "Password, 2FA and active sessions."}
            </p>
          </div>

          {active === "Notifications" ? (
            <div className="space-y-4">
              <Toggle label="Email me when an invoice is paid" checked={notifs.paid} onChange={(v) => setNotifs((n) => ({ ...n, paid: v }))} />
              <Toggle label="Daily AR digest" checked={notifs.digest} onChange={(v) => setNotifs((n) => ({ ...n, digest: v }))} />
              <Toggle label="Confetti on payment received" checked={notifs.confetti} onChange={(v) => setNotifs((n) => ({ ...n, confetti: v }))} />
            </div>
          ) : active === "Billing" ? (
            <BillingPanel />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={draft.fullName} onChange={(v) => setDraft({ ...draft, fullName: v })} />
              <Field label="Email" value={draft.email} onChange={(v) => setDraft({ ...draft, email: v })} />
              <Field label="Workspace name" value={draft.workspace} onChange={(v) => setDraft({ ...draft, workspace: v })} />
              <Field label="Currency" value={draft.currency} onChange={(v) => setDraft({ ...draft, currency: v })} />
            </div>
          )}

          {active !== "Billing" && (
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={cancel}>Cancel</Button>
              <Button type="submit" className="bg-cta text-primary-foreground">Save changes</Button>
            </div>
          )}
        </form>
      </div>
    </AppShell>
  );
}

function BillingPanel() {
  const { subscription, tier, isActive, loading } = useSubscription();
  const [opening, setOpening] = useState(false);
  const openPortal = async () => {
    if (!subscription) return;
    setOpening(true);
    try {
      const { url } = await createPortalSession({ data: { environment: subscription.environment as any } });
      window.open(url, "_blank");
    } catch (e: any) {
      toast.error(e.message || "Could not open billing portal");
    } finally {
      setOpening(false);
    }
  };
  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!subscription) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">No active subscription.</p>
        <Button asChild className="bg-cta text-primary-foreground"><a href="/pricing">View plans</a></Button>
      </div>
    );
  }
  const tierName = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : "—";
  const cycle = subscription.price_id?.includes("yearly") ? "Yearly" : "Monthly";
  const renewLabel = subscription.cancel_at_period_end ? "Ends on" : subscription.status === "trialing" ? "Trial ends" : "Renews on";
  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-border p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-eyebrow">Current plan</p>
            <p className="mt-1 text-xl font-bold">{tierName} <span className="text-sm font-normal text-muted-foreground">· {cycle}</span></p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isActive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>{subscription.status}</span>
        </div>
        {subscription.current_period_end && (
          <p className="mt-3 text-sm text-muted-foreground">{renewLabel} {new Date(subscription.current_period_end).toLocaleDateString()}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={openPortal} disabled={opening} className="bg-cta text-primary-foreground">{opening ? "Opening…" : "Manage subscription"}</Button>
        <Button variant="outline" asChild><a href="/pricing">Change plan</a></Button>
      </div>
      <p className="text-xs text-muted-foreground">Manage subscription opens the secure billing portal where you can update your card, change plan, download invoices, or cancel.</p>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input className="mt-1.5" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
