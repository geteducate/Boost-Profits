import { createFileRoute } from "@tanstack/react-router";
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

const sections = ["Profile", "Workspace", "Branding", "Notifications", "Billing", "Security"];

function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Manage your workspace.">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="card-premium p-3 h-fit">
          {sections.map((s, i) => (
            <button key={s} className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${i === 0 ? "bg-cta text-primary-foreground" : "hover:bg-muted"}`}>{s}</button>
          ))}
        </nav>
        <form
          className="card-premium p-6 space-y-6"
          onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}
        >
          <div>
            <h2 className="text-lg font-bold">Profile</h2>
            <p className="text-sm text-muted-foreground">How you appear to clients on invoices and reminders.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Full name</Label><Input className="mt-1.5" defaultValue="Jane Doe" /></div>
            <div><Label>Email</Label><Input className="mt-1.5" defaultValue="jane@studio.com" /></div>
            <div><Label>Workspace name</Label><Input className="mt-1.5" defaultValue="Studio Northwind" /></div>
            <div><Label>Currency</Label><Input className="mt-1.5" defaultValue="USD ($)" /></div>
          </div>
          <div className="border-t border-border pt-6 space-y-4">
            <Toggle label="Email me when an invoice is paid" defaultChecked />
            <Toggle label="Daily AR digest" defaultChecked />
            <Toggle label="Confetti on payment received" />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" className="bg-cta text-primary-foreground">Save changes</Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
