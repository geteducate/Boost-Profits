import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StatCard } from "@/components/AppShell";
import { TrendingUp, Clock, CheckCircle2, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Boost Profits" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const recovery = [12, 18, 22, 28, 32, 41, 48, 55, 62, 70, 78, 86];
  const overdue = [22, 18, 16, 14, 13, 11, 10, 8, 7, 6, 5, 4];
  return (
    <AppShell title="Analytics" subtitle="Performance, recovery and source attribution.">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Collection rate" value="93%" delta="+4.2 pts" tone="success" icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="AR-days" value="18" delta="-23 vs Q1" tone="success" icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Recovered" value="$84,210" delta="+22% YoY" tone="success" icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Active leads" value="142" delta="+18 this wk" icon={<BarChart3 className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Chart title="Recovery trend" sub="Last 12 months" series={recovery} accent="primary" />
        <Chart title="Overdue trend" sub="Going down — that’s what we like." series={overdue} accent="warning" inverted />
      </div>

      <div className="mt-6 card-premium p-6">
        <p className="text-eyebrow">Lead sources</p>
        <div className="mt-4 space-y-3">
          {[
            { s: "Direct", v: 38 }, { s: "Google Ads", v: 24 }, { s: "Referral", v: 18 }, { s: "Twitter / X", v: 12 }, { s: "Other", v: 8 },
          ].map((r) => (
            <div key={r.s}>
              <div className="flex items-center justify-between text-sm"><span className="font-medium">{r.s}</span><span className="text-muted-foreground tabular-nums">{r.v}%</span></div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-glow)]" style={{ width: `${r.v * 2.5}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function Chart({ title, sub, series, accent, inverted }: { title: string; sub: string; series: number[]; accent: string; inverted?: boolean }) {
  return (
    <div className="card-premium p-6">
      <div>
        <p className="text-eyebrow">{title}</p>
        <p className="mt-0.5 text-sm font-semibold">{sub}</p>
      </div>
      <div className="mt-4 flex h-44 items-end gap-1.5">
        {series.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`w-full rounded-t-md ${accent === "warning" ? "bg-gradient-to-t from-[oklch(0.6_0.18_60)] to-[oklch(0.78_0.15_75)]" : "bg-gradient-to-t from-[var(--primary)] to-[var(--primary-glow)]"}`}
              style={{ height: `${inverted ? 100 - h : h}%` }}
            />
            <span className="text-[10px] text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
