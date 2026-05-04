import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, Clock, FileText, Plus, TrendingUp, Users, Wallet } from "lucide-react";
import { AppShell, StatCard, StatusPill } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — Boost Profits" }] }),
  component: AppDashboard,
});

const bars = [42, 56, 48, 70, 62, 84, 78, 92, 86, 96, 88, 100];

function AppDashboard() {
  return (
    <AppShell
      title="Good morning, Jane"
      subtitle="Here’s what’s moving in your cash flow today."
      actions={
        <>
          <Button variant="outline" asChild><Link to="/app/clients">+ New client</Link></Button>
          <Button asChild className="bg-cta text-primary-foreground"><Link to="/app/invoices"><Plus className="mr-1.5 h-4 w-4" /> New invoice</Link></Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Recovered (mo)" value="$12,480" delta="+18% vs last" tone="success" icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="On-time rate" value="93%" delta="+4.2 pts" tone="success" icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="Overdue" value="14" delta="3 added today" tone="destructive" icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Active clients" value="28" delta="+2 this week" icon={<Users className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <div className="card-premium lg:col-span-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eyebrow">Cash recovered</p>
              <p className="mt-1 text-xl font-bold">Last 12 months</p>
            </div>
            <span className="rounded-full bg-success/12 px-2 py-0.5 text-xs font-semibold text-success">+24% YoY</span>
          </div>
          <div className="mt-6 flex h-56 items-end gap-2">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="w-full rounded-t-md bg-gradient-to-t from-[var(--primary)] to-[var(--primary-glow)]" style={{ height: `${h}%` }} />
                <span className="text-[10px] text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-premium lg:col-span-2 p-6">
          <p className="text-eyebrow">Activity</p>
          <ul className="mt-4 space-y-4">
            {[
              { i: Wallet, t: "Helix Labs paid $960", s: "Just now", tone: "success" },
              { i: FileText, t: "Invoice #1042 sent to Lumen", s: "12 min ago", tone: "primary" },
              { i: Clock, t: "Overdue: Northwind Studio $1,200", s: "1 hour ago", tone: "warning" },
              { i: ArrowUpRight, t: "Milestone 2 approved · Atlas Co.", s: "2 hours ago", tone: "primary" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${a.tone === "success" ? "bg-success/12 text-success" : a.tone === "warning" ? "bg-warning/15 text-[oklch(0.45_0.15_60)]" : "bg-primary/8 text-primary"}`}>
                  <a.i className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{a.t}</p>
                  <p className="text-xs text-muted-foreground">{a.s}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 card-premium p-6">
        <div className="flex items-center justify-between">
          <p className="text-eyebrow">Recent invoices</p>
          <Button variant="ghost" size="sm" asChild><Link to="/app/invoices">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
        </div>
        <div className="mt-4 -mx-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-6 py-3">Invoice</th><th className="px-6 py-3">Client</th><th className="px-6 py-3">Amount</th><th className="px-6 py-3">Due</th><th className="px-6 py-3">Status</th></tr>
            </thead>
            <tbody>
              {[
                { n: "#1042", c: "Lumen Agency", a: "$1,840", d: "Apr 30", s: "Sent" },
                { n: "#1041", c: "Helix Labs", a: "$960", d: "Apr 22", s: "Paid" },
                { n: "#1040", c: "Northwind Studio", a: "$3,200", d: "Apr 18", s: "Overdue" },
                { n: "#1039", c: "Fern & Co.", a: "$2,400", d: "Apr 15", s: "Paid" },
                { n: "#1038", c: "Atlas Co.", a: "$1,250", d: "Apr 10", s: "Paid" },
              ].map((r) => (
                <tr key={r.n} className="border-t border-border hover:bg-muted/40">
                  <td className="px-6 py-3 font-semibold">{r.n}</td>
                  <td className="px-6 py-3">{r.c}</td>
                  <td className="px-6 py-3 tabular-nums">{r.a}</td>
                  <td className="px-6 py-3 text-muted-foreground">{r.d}</td>
                  <td className="px-6 py-3"><StatusPill status={r.s as any} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
