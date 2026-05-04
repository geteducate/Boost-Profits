import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/sheets")({
  head: () => ({ meta: [{ title: "Google Sheets sync — Admin" }] }),
  component: SheetsAdmin,
});

function SheetsAdmin() {
  return (
    <AdminShell title="Google Sheets sync" subtitle="Lead and payment data, mirrored to your Sheet.">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card-premium p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eyebrow">Active sheet</p>
              <p className="mt-1 text-base font-bold">BoostProfits — Leads & Payments</p>
              <a className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline" href="#">docs.google.com/spreadsheets/... <ExternalLink className="h-3 w-3" /></a>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2.5 py-1 text-xs font-semibold text-success"><Check className="h-3 w-3" />Healthy</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div><p className="text-[11px] text-muted-foreground">Last sync</p><p className="font-semibold">2 min ago</p></div>
            <div><p className="text-[11px] text-muted-foreground">Rows synced</p><p className="font-semibold tabular-nums">1,284</p></div>
            <div><p className="text-[11px] text-muted-foreground">Errors (24h)</p><p className="font-semibold tabular-nums text-success">0</p></div>
          </div>
          <Button className="mt-6 bg-cta text-primary-foreground" onClick={() => toast.success("Sync triggered")}>
            <RefreshCw className="mr-1.5 h-4 w-4" />Trigger sync now
          </Button>
        </div>
        <div className="card-premium p-6">
          <p className="text-eyebrow">Mapped fields</p>
          <ul className="mt-4 space-y-2 text-sm">
            {["name","email","company","service","message","date","source","utm_campaign","status","admin_notes"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-success" /><span className="font-mono text-xs">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
