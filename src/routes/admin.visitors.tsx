import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatCard } from "@/components/AppShell";
import { Activity, Eye, MousePointerClick } from "lucide-react";

export const Route = createFileRoute("/admin/visitors")({
  head: () => ({ meta: [{ title: "Visitors — Admin" }] }),
  component: VisitorsAdmin,
});

function VisitorsAdmin() {
  const series = [12, 18, 22, 28, 34, 41, 48, 55, 50, 60, 72, 86, 92, 80, 76, 88, 96, 104, 112, 120, 110, 96, 82, 70];
  return (
    <AdminShell title="Visitor analytics" subtitle="Real-time traffic and conversion signals.">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Live now" value="34" delta="up" tone="success" icon={<Activity className="h-4 w-4" />} />
        <StatCard label="Page views (24h)" value="4,812" delta="+8.2%" tone="success" icon={<Eye className="h-4 w-4" />} />
        <StatCard label="Signups (24h)" value="18" delta="+5 vs yesterday" tone="success" icon={<MousePointerClick className="h-4 w-4" />} />
        <StatCard label="Demo requests" value="6" delta="2 from /pricing" tone="success" icon={<MousePointerClick className="h-4 w-4" />} />
      </div>

      <div className="mt-6 card-premium p-6">
        <div className="flex items-end justify-between">
          <div><p className="text-eyebrow">Hourly visitors</p><p className="mt-0.5 text-sm font-semibold">Last 24 hours</p></div>
          <span className="rounded-full bg-success/12 px-2 py-0.5 text-xs font-semibold text-success">+18% vs prev</span>
        </div>
        <div className="mt-6 flex h-44 items-end gap-1">
          {series.map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[var(--primary)] to-[var(--primary-glow)]" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card-premium p-6">
          <p className="text-eyebrow">Top referrers</p>
          <ul className="mt-4 space-y-3 text-sm">
            {[["google.com", 1422], ["x.com", 612], ["producthunt.com", 488], ["partners.helix.io", 224]].map(([n, v]) => (
              <li key={n as string} className="flex items-center justify-between"><span className="font-medium">{n}</span><span className="tabular-nums text-muted-foreground">{v}</span></li>
            ))}
          </ul>
        </div>
        <div className="card-premium p-6">
          <p className="text-eyebrow">Conversion by page</p>
          <ul className="mt-4 space-y-3 text-sm">
            {[["/pricing → /signup", "6.2%"], ["/service → /signup", "4.1%"], ["/ → /signup", "2.8%"], ["/faq → /contact", "9.4%"]].map(([n, v]) => (
              <li key={n} className="flex items-center justify-between"><span className="font-mono text-xs">{n}</span><span className="font-semibold tabular-nums">{v}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
