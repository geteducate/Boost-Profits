import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StatCard, StatusPill } from "@/components/AppShell";
import { Wallet, TrendingUp, Clock } from "lucide-react";

export const Route = createFileRoute("/app/payments")({
  head: () => ({ meta: [{ title: "Payments — Boost Profits" }] }),
  component: PaymentsPage,
});

const payments = [
  { d: "Apr 22", c: "Helix Labs", a: "$960", src: "Stripe", s: "Paid", n: "Milestone 2" },
  { d: "Apr 15", c: "Fern & Co.", a: "$2,400", src: "ACH", s: "Paid", n: "Final balance" },
  { d: "Apr 10", c: "Atlas Marketing", a: "$1,250", src: "Stripe", s: "Paid", n: "Q2 deposit" },
  { d: "Apr 05", c: "Vertex Build", a: "$3,800", src: "Wire", s: "Paid", n: "Phase 1" },
  { d: "Mar 28", c: "Quanta", a: "$2,100", src: "Stripe", s: "Pending", n: "Late retry" },
];

function PaymentsPage() {
  return (
    <AppShell title="Payments" subtitle="Every transaction, every source.">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Collected (mo)" value="$24,910" delta="+22%" tone="success" icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Settled" value="42" delta="+9 vs last" tone="success" icon={<Wallet className="h-4 w-4" />} />
        <StatCard label="Pending" value="$2,100" delta="1 transaction" tone="warning" icon={<Clock className="h-4 w-4" />} />
      </div>
      <div className="mt-6 card-premium overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-6 py-3">Date</th><th className="px-6 py-3">Client</th><th className="px-6 py-3">Amount</th><th className="px-6 py-3">Source</th><th className="px-6 py-3">Note</th><th className="px-6 py-3">Status</th></tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} className="border-t border-border hover:bg-muted/40">
                <td className="px-6 py-3 text-muted-foreground">{p.d}</td>
                <td className="px-6 py-3 font-semibold">{p.c}</td>
                <td className="px-6 py-3 tabular-nums font-semibold">{p.a}</td>
                <td className="px-6 py-3 text-muted-foreground">{p.src}</td>
                <td className="px-6 py-3 text-muted-foreground">{p.n}</td>
                <td className="px-6 py-3"><StatusPill status={p.s as any} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
