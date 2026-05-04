import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({ meta: [{ title: "Audit logs — Admin" }] }),
  component: AuditAdmin,
});

const logs = [
  { t: "2 min ago", u: "Jane Doe", a: "Updated invoice #1042 amount", ip: "98.2.x.x" },
  { t: "12 min ago", u: "System", a: "Reminder sent · #1040 · Northwind Studio", ip: "—" },
  { t: "1 hr ago", u: "Mark P.", a: "Deleted lead Sara Lin", ip: "73.5.x.x" },
  { t: "2 hr ago", u: "Jane Doe", a: "Created project ‘Q2 retainer’", ip: "98.2.x.x" },
  { t: "Yesterday", u: "Lia S.", a: "Connected Google Sheets", ip: "104.1.x.x" },
];

function AuditAdmin() {
  return (
    <AdminShell title="Audit logs" subtitle="Every change, every actor.">
      <div className="card-premium overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-6 py-3">When</th><th className="px-6 py-3">Actor</th><th className="px-6 py-3">Action</th><th className="px-6 py-3">IP</th></tr></thead>
          <tbody>
            {logs.map((l, i) => (
              <tr key={i} className="border-t border-border hover:bg-muted/40">
                <td className="px-6 py-3 text-muted-foreground">{l.t}</td>
                <td className="px-6 py-3 font-semibold">{l.u}</td>
                <td className="px-6 py-3">{l.a}</td>
                <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
