import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell, StatusPill } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/milestones")({
  head: () => ({ meta: [{ title: "Milestones — Boost Profits" }] }),
  component: MilestonesPage,
});

const rows = [
  { n: "Discovery sign-off", p: "Brand refresh", a: "$3,200", d: "Apr 10", s: "Paid", inv: "#1038", appr: "Approved" },
  { n: "Design v1", p: "Brand refresh", a: "$4,800", d: "Apr 24", s: "Sent", inv: "#1042", appr: "Approved" },
  { n: "Audit report", p: "Performance audit", a: "$3,200", d: "Apr 28", s: "Pending", inv: "—", appr: "Pending" },
  { n: "Migration", p: "Site migration", a: "$2,400", d: "Apr 18", s: "Overdue", inv: "#1040", appr: "Approved" },
  { n: "Sprint 1", p: "Web rebuild", a: "$6,000", d: "May 02", s: "Draft", inv: "—", appr: "Pending" },
];

function MilestonesPage() {
  return (
    <AppShell
      title="Milestones"
      subtitle="Every payable step, with its invoice and approval state."
      actions={<Button className="bg-cta text-primary-foreground"><Plus className="mr-1.5 h-4 w-4" />New milestone</Button>}
    >
      <div className="card-premium overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-6 py-3">Milestone</th><th className="px-6 py-3">Project</th><th className="px-6 py-3">Amount</th><th className="px-6 py-3">Due</th><th className="px-6 py-3">Approval</th><th className="px-6 py-3">Invoice</th><th className="px-6 py-3">Status</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.n} className="border-t border-border hover:bg-muted/40">
                <td className="px-6 py-3 font-semibold">{r.n}</td>
                <td className="px-6 py-3 text-muted-foreground">{r.p}</td>
                <td className="px-6 py-3 tabular-nums">{r.a}</td>
                <td className="px-6 py-3 text-muted-foreground">{r.d}</td>
                <td className="px-6 py-3"><StatusPill status={r.appr as any} /></td>
                <td className="px-6 py-3 font-mono text-xs">{r.inv}</td>
                <td className="px-6 py-3"><StatusPill status={r.s as any} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
