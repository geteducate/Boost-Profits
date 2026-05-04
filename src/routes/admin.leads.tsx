import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { StatusPill } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({ meta: [{ title: "Leads — Admin" }] }),
  component: LeadsAdmin,
});

const seed = [
  { n: "Sara Lin", e: "sara@studio.io", co: "Studio Lin", svc: "Web design", src: "Google Ads", utm: "spring_pricing", d: "2h ago", s: "Active" },
  { n: "Owen P.", e: "owen@atlas.cm", co: "Atlas Marketing", svc: "Performance", src: "Direct", utm: "—", d: "5h ago", s: "Active" },
  { n: "Mike V.", e: "mike@vertex.dev", co: "Vertex Build", svc: "Dev retainer", src: "Referral", utm: "partner_helix", d: "Yesterday", s: "Pending" },
  { n: "Zoë R.", e: "zoe@quanta.io", co: "Quanta", svc: "Consulting", src: "Twitter / X", utm: "tweet_apr", d: "Yesterday", s: "Pending" },
  { n: "Idris T.", e: "idris@lumen.co", co: "Lumen Agency", svc: "Audit", src: "Google Ads", utm: "spring_pricing", d: "2 days ago", s: "Closed" },
];

function LeadsAdmin() {
  const [rows, setRows] = useState(seed);
  const [confirm, setConfirm] = useState<number | null>(null);
  return (
    <AdminShell
      title="Lead management"
      subtitle="Every visitor that raised a hand."
      actions={<Button variant="outline"><Download className="mr-1.5 h-4 w-4" />Export CSV</Button>}
    >
      <div className="card-premium p-5">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px]"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search leads..." className="pl-9" /></div>
          <Button variant="outline" size="sm">All sources</Button>
          <Button variant="outline" size="sm">Date</Button>
          <Button variant="outline" size="sm">Tag</Button>
        </div>
        <div className="mt-5 -mx-5 overflow-x-auto">
          <table className="w-full min-w-[920px] text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-5 py-3">Name</th><th className="px-5 py-3">Email</th><th className="px-5 py-3">Company</th><th className="px-5 py-3">Service</th><th className="px-5 py-3">Source</th><th className="px-5 py-3">UTM</th><th className="px-5 py-3">When</th><th className="px-5 py-3">Status</th><th className="px-5 py-3"></th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-border hover:bg-muted/40">
                  <td className="px-5 py-3 font-semibold">{r.n}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.e}</td>
                  <td className="px-5 py-3">{r.co}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.svc}</td>
                  <td className="px-5 py-3">{r.src}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{r.utm}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.d}</td>
                  <td className="px-5 py-3"><StatusPill status={r.s as any} /></td>
                  <td className="px-5 py-3 text-right"><button className="rounded-md p-1.5 hover:bg-destructive/10" onClick={() => setConfirm(i)}><Trash2 className="h-4 w-4 text-destructive" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {confirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setConfirm(null)}>
          <div className="card-premium w-full max-w-sm bg-background p-6 shadow-glow" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold">Delete lead?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Are you sure? This action cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConfirm(null)}>Cancel</Button>
              <Button variant="destructive" onClick={() => { setRows(rows.filter((_, i) => i !== confirm)); setConfirm(null); toast.success("Lead deleted"); }}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
