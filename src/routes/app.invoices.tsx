import { createFileRoute } from "@tanstack/react-router";
import { Plus, Send } from "lucide-react";
import { AppShell, StatusPill } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/invoices")({
  head: () => ({ meta: [{ title: "Invoices — Boost Profits" }] }),
  component: InvoicesPage,
});

const invoices = [
  { n: "#1042", c: "Lumen Agency", a: "$1,840", d: "Apr 30", r: "1 reminder", s: "Sent" },
  { n: "#1041", c: "Helix Labs", a: "$960", d: "Apr 22", r: "—", s: "Paid" },
  { n: "#1040", c: "Northwind Studio", a: "$3,200", d: "Apr 18", r: "3 reminders", s: "Overdue" },
  { n: "#1039", c: "Fern & Co.", a: "$2,400", d: "Apr 15", r: "—", s: "Paid" },
  { n: "#1038", c: "Atlas Marketing", a: "$1,250", d: "Apr 10", r: "—", s: "Paid" },
  { n: "#1037", c: "Quanta", a: "$2,100", d: "Apr 08", r: "2 reminders", s: "Overdue" },
  { n: "#1036", c: "Vertex Build", a: "$3,800", d: "Apr 05", r: "—", s: "Paid" },
];

function InvoicesPage() {
  return (
    <AppShell
      title="Invoices"
      subtitle="Send, resend and track every invoice."
      actions={<Button onClick={() => toast.success("New invoice draft created")} className="bg-cta text-primary-foreground"><Plus className="mr-1.5 h-4 w-4" />New invoice</Button>}
    >
      <div className="card-premium overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-6 py-3">Invoice</th><th className="px-6 py-3">Client</th><th className="px-6 py-3">Amount</th><th className="px-6 py-3">Due</th><th className="px-6 py-3">Reminders</th><th className="px-6 py-3">Status</th><th className="px-6 py-3 text-right">Action</th></tr>
          </thead>
          <tbody>
            {invoices.map((r) => (
              <tr key={r.n} className="border-t border-border hover:bg-muted/40">
                <td className="px-6 py-3 font-mono text-xs font-semibold">{r.n}</td>
                <td className="px-6 py-3">{r.c}</td>
                <td className="px-6 py-3 font-semibold tabular-nums">{r.a}</td>
                <td className="px-6 py-3 text-muted-foreground">{r.d}</td>
                <td className="px-6 py-3 text-muted-foreground">{r.r}</td>
                <td className="px-6 py-3"><StatusPill status={r.s as any} /></td>
                <td className="px-6 py-3 text-right">
                  <Button size="sm" variant={r.s === "Paid" ? "outline" : "default"} className={r.s === "Paid" ? "" : "bg-cta text-primary-foreground"} onClick={() => toast.success(r.s === "Paid" ? "Receipt resent" : "Reminder sent")}>
                    <Send className="mr-1.5 h-3.5 w-3.5" /> {r.s === "Paid" ? "Receipt" : "Remind"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
