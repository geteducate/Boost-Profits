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
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={draft.fullName} onChange={(v) => setDraft({ ...draft, fullName: v })} />
              <Field label="Email" value={draft.email} onChange={(v) => setDraft({ ...draft, email: v })} />
              <Field label="Workspace name" value={draft.workspace} onChange={(v) => setDraft({ ...draft, workspace: v })} />
              <Field label="Currency" value={draft.currency} onChange={(v) => setDraft({ ...draft, currency: v })} />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={cancel}>Cancel</Button>
            <Button type="submit" className="bg-cta text-primary-foreground">Save changes</Button>
          </div>
        </form>
      </div>
    </AppShell>
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
