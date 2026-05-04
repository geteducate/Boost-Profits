import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatusPill } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users — Admin" }] }),
  component: UsersAdmin,
});

const users = [
  { n: "Jane Doe", e: "jane@studio.com", r: "Owner", s: "Active" },
  { n: "Mark P.", e: "mark@studio.com", r: "Admin", s: "Active" },
  { n: "Lia S.", e: "lia@studio.com", r: "Member", s: "Active" },
  { n: "Tom B.", e: "tom@studio.com", r: "Member", s: "Pending" },
];

function UsersAdmin() {
  return (
    <AdminShell title="User management" subtitle="Roles and access across the workspace." actions={<Button className="bg-cta text-primary-foreground">Invite user</Button>}>
      <div className="card-premium overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-6 py-3">User</th><th className="px-6 py-3">Email</th><th className="px-6 py-3">Role</th><th className="px-6 py-3">Status</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.e} className="border-t border-border hover:bg-muted/40">
                <td className="px-6 py-3"><div className="flex items-center gap-3"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cta text-xs font-bold text-primary-foreground">{u.n.split(" ").map((s) => s[0]).join("")}</span><span className="font-semibold">{u.n}</span></div></td>
                <td className="px-6 py-3 text-muted-foreground">{u.e}</td>
                <td className="px-6 py-3">{u.r}</td>
                <td className="px-6 py-3"><StatusPill status={u.s as any} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
