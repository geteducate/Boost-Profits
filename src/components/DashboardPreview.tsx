import { ArrowUpRight, CheckCircle2, Clock, TrendingUp } from "lucide-react";

const bars = [42, 56, 48, 70, 62, 84, 78, 92, 86, 96, 88, 100];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export function DashboardPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 bg-hero blur-3xl opacity-70" />
      <div className="card-premium overflow-hidden shadow-glow">
        <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning" />
            <span className="h-2.5 w-2.5 rounded-full bg-success" />
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">app.boostprofits.com / dashboard</span>
          <span className="text-[11px] font-semibold text-success inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Live
          </span>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-3">
          <Stat label="Recovered" value="$12,480" trend="+18%" icon={<TrendingUp className="h-4 w-4" />} />
          <Stat label="On-time rate" value="93%" trend="+4.2%" icon={<CheckCircle2 className="h-4 w-4" />} />
          <Stat label="Overdue" value="14" trend="-6" tone="warning" icon={<Clock className="h-4 w-4" />} />
        </div>

        <div className="grid gap-4 px-5 pb-5 lg:grid-cols-5">
          <div className="card-premium lg:col-span-3 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-eyebrow">Recovery</p>
                <p className="text-sm font-semibold mt-0.5">Last 12 months</p>
              </div>
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">+24% YoY</span>
            </div>
            <div className="mt-4 flex h-32 items-end gap-1.5">
              {bars.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[var(--primary)] to-[var(--primary-glow)] transition-all"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium lg:col-span-2 p-4">
            <p className="text-eyebrow">Recent invoices</p>
            <ul className="mt-3 divide-y divide-border">
              {[
                { c: "Northwind Studio", a: "$3,200", s: "Paid", tone: "success" },
                { c: "Lumen Agency", a: "$1,840", s: "Sent", tone: "info" },
                { c: "Helix Labs", a: "$960", s: "Overdue", tone: "warning" },
                { c: "Fern & Co.", a: "$2,400", s: "Paid", tone: "success" },
              ].map((r) => (
                <li key={r.c} className="flex items-center justify-between py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.c}</p>
                    <p className="text-[11px] text-muted-foreground">Milestone 2 of 4</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tabular-nums">{r.a}</span>
                    <Badge tone={r.tone as any}>{r.s}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -right-4 hidden md:block">
        <div className="card-premium flex items-center gap-3 p-3 pr-4 shadow-elegant">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-success/15 text-success">
            <ArrowUpRight className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">Just now</p>
            <p className="text-sm font-semibold">Helix Labs paid $960</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  trend,
  tone = "success",
  icon,
}: {
  label: string;
  value: string;
  trend: string;
  tone?: "success" | "warning";
  icon: React.ReactNode;
}) {
  return (
    <div className="card-premium p-4">
      <div className="flex items-center justify-between">
        <span className="text-eyebrow">{label}</span>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {icon}
        </span>
      </div>
      <p className="mt-2 text-2xl font-extrabold tracking-tight tabular-nums">{value}</p>
      <p className={`mt-0.5 text-xs font-semibold ${tone === "success" ? "text-success" : "text-warning"}`}>
        {trend}
      </p>
    </div>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone: "success" | "warning" | "info" }) {
  const map = {
    success: "bg-success/12 text-success",
    warning: "bg-warning/15 text-[oklch(0.5_0.15_60)]",
    info: "bg-primary/8 text-primary",
  } as const;
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${map[tone]}`}>{children}</span>
  );
}
