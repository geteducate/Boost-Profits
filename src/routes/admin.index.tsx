import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatCard, StatusPill } from "@/components/AppShell";
import { Activity, Inbox, MousePointerClick, Users2 } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — Boost Profits" }] }),
  component: AdminOverview,
});

function AdminOverview() {
  return (
    <AdminShell title="Control room" subtitle="Live signals across the funnel.">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Live visitors" value="34" delta="↑ 12 in last hr" tone="success" icon={<Activity className="h-4 w-4" />} />
        <StatCard label="Signups (24h)" value="18" delta="+5 vs yesterday" tone="success" icon={<Users2 className="h-4 w-4" />} />
        <StatCard label="Form submissions" value="42" delta="3 unread" icon={<Inbox className="h-4 w-4" />} />
        <StatCard label="Conversion rate" value="3.8%" delta="+0.4 pts" tone="success" icon={<MousePointerClick className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="card-premium p-6 lg:col-span-2">
          <p className="text-eyebrow">Top pages (24h)</p>
          <div className="mt-4 space-y-3">
            {[
              { p: "/", v: 1240 }, { p: "/pricing", v: 612 }, { p: "/service", v: 488 }, { p: "/faq", v: 224 }, { p: "/contact", v: 142 },
            ].map((r) => (
              <div key={r.p}>
                <div className="flex items-center justify-between text-sm"><span className="font-mono">{r.p}</span><span className="text-muted-foreground tabular-nums">{r.v}</span></div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-glow)]" style={{ width: `${(r.v / 1240) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-premium p-6">
          <p className="text-eyebrow">Recent signups</p>
          <ul className="mt-4 space-y-3">
            {[
              { n: "Idris T.", c: "Lumen Agency", s: "Active" },
              { n: "Mara K.", c: "Northwind Studio", s: "Active" },
              { n: "Jess R.", c: "Helix Labs", s: "Pending" },
              { n: "Owen P.", c: "Atlas Marketing", s: "Active" },
            ].map((r) => (
              <li key={r.n} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{r.n}</p>
                  <p className="text-xs text-muted-foreground">{r.c}</p>
                </div>
                <StatusPill status={r.s as any} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
