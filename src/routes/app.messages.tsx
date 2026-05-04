import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StatusPill } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Plus } from "lucide-react";

export const Route = createFileRoute("/app/messages")({
  head: () => ({ meta: [{ title: "Reminders — Boost Profits" }] }),
  component: MessagesPage,
});

const queue = [
  { c: "Northwind Studio", inv: "#1040", t: "Email", w: "in 2 hrs", s: "Pending" },
  { c: "Quanta", inv: "#1037", t: "Email", w: "Tomorrow 9:00", s: "Pending" },
  { c: "Lumen Agency", inv: "#1042", t: "Email", w: "May 02 09:00", s: "Pending" },
];
const sent = [
  { c: "Northwind Studio", inv: "#1040", t: "Email", w: "Apr 28", s: "Sent" },
  { c: "Quanta", inv: "#1037", t: "SMS", w: "Apr 26", s: "Sent" },
];

function MessagesPage() {
  return (
    <AppShell
      title="Reminders & messages"
      subtitle="Polite, branded follow-ups that send themselves."
      actions={<Button className="bg-cta text-primary-foreground"><Plus className="mr-1.5 h-4 w-4" />New template</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-premium p-6 lg:col-span-2">
          <p className="text-eyebrow">Queue</p>
          <table className="mt-4 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="py-3">Client</th><th className="py-3">Invoice</th><th className="py-3">Channel</th><th className="py-3">When</th><th className="py-3">Status</th></tr>
            </thead>
            <tbody>
              {[...queue, ...sent].map((r, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="py-3 font-semibold">{r.c}</td>
                  <td className="py-3 font-mono text-xs">{r.inv}</td>
                  <td className="py-3 text-muted-foreground">{r.t}</td>
                  <td className="py-3 text-muted-foreground">{r.w}</td>
                  <td className="py-3"><StatusPill status={r.s as any} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-premium p-6">
          <p className="text-eyebrow">Templates</p>
          <ul className="mt-4 space-y-3">
            {[
              { i: Mail, t: "Friendly reminder · 3 days", d: "Sent 3 days after due date" },
              { i: Mail, t: "Polite escalation · 7 days", d: "Account owner is CC'd" },
              { i: MessageCircle, t: "Final notice · 14 days", d: "Email + SMS" },
            ].map((t) => (
              <li key={t.t} className="rounded-xl border border-border p-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8 text-primary"><t.i className="h-4 w-4" /></span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{t.t}</p>
                    <p className="text-xs text-muted-foreground">{t.d}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
