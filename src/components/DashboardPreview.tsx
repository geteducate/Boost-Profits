import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { LiveGraph } from "./LiveGraph";

export function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
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
          <Stat label="Recovered" value="$3,840" trend="+12%" icon={<TrendingUp className="h-4 w-4" />} />
          <Stat label="On-time rate" value="86%" trend="+3.1%" icon={<CheckCircle2 className="h-4 w-4" />} />
          <Stat label="Overdue" value="3" trend="-2" tone="warning" icon={<Clock className="h-4 w-4" />} />
        </div>

        <div className="px-5 pb-5">
          <LiveGraph />
        </div>

        <div className="grid gap-4 px-5 pb-5">
          <div className="card-premium p-4">
            <p className="text-eyebrow">Recent invoices</p>
            <ul className="mt-3 divide-y divide-border">
              {[
                { c: "Client · Brand studio", a: "$1,200", s: "Paid", tone: "success" },
                { c: "Client · Web agency", a: "$840", s: "Sent", tone: "info" },
                { c: "Client · Dev shop", a: "$460", s: "Overdue", tone: "warning" },
                { c: "Client · Consultancy", a: "$1,400", s: "Paid", tone: "success" },
              ].map((r, i) => (
                <motion.li
                  key={r.c}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center justify-between py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.c}</p>
                    <p className="text-[11px] text-muted-foreground">Milestone 2 of 4</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tabular-nums">{r.a}</span>
                    <Badge tone={r.tone as any}>{r.s}</Badge>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        className="absolute -bottom-6 -right-4 hidden md:block"
      >
        <div className="card-premium flex items-center gap-3 p-3 pr-4 shadow-elegant">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-success/15 text-success">
            <ArrowUpRight className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">Just now</p>
            <p className="text-sm font-semibold">Client paid $460</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Stat({ label, value, trend, tone = "success", icon }: { label: string; value: string; trend: string; tone?: "success" | "warning"; icon: React.ReactNode }) {
  return (
    <div className="card-premium p-4">
      <div className="flex items-center justify-between">
        <span className="text-eyebrow">{label}</span>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">{icon}</span>
      </div>
      <p className="mt-2 text-2xl font-extrabold tracking-tight tabular-nums">{value}</p>
      <p className={`mt-0.5 text-xs font-semibold ${tone === "success" ? "text-success" : "text-warning"}`}>{trend}</p>
    </div>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone: "success" | "warning" | "info" }) {
  const map = {
    success: "bg-success/12 text-success",
    warning: "bg-warning/15 text-[oklch(0.5_0.15_60)]",
    info: "bg-primary/8 text-primary",
  } as const;
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${map[tone]}`}>{children}</span>;
}
