import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell, StatusPill } from "@/components/AppShell";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/projects")({
  head: () => ({ meta: [{ title: "Projects — Boost Profits" }] }),
  component: ProjectsPage,
});

const projects = [
  { n: "Brand refresh — Phase II", c: "Northwind Studio", m: "3 / 4", a: "$18,000", d: "May 12", p: 75, s: "Active" },
  { n: "Performance audit", c: "Lumen Agency", m: "1 / 3", a: "$9,400", d: "May 22", p: 33, s: "Active" },
  { n: "Web rebuild", c: "Helix Labs", m: "2 / 5", a: "$24,000", d: "Jun 03", p: 40, s: "Active" },
  { n: "Q2 retainer", c: "Atlas Marketing", m: "2 / 6", a: "$36,000", d: "Jun 30", p: 33, s: "Active" },
  { n: "Site migration", c: "Fern & Co.", m: "4 / 4", a: "$11,800", d: "Apr 28", p: 100, s: "Closed" },
];

function ProjectsPage() {
  return (
    <AppShell
      title="Projects"
      subtitle="Track scope, milestones and progress in one place."
      actions={<Button onClick={() => toast.success("New project created")} className="bg-cta text-primary-foreground"><Plus className="mr-1.5 h-4 w-4" />New project</Button>}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <div key={p.n} className="card-premium lift p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">{p.c}</p>
                <h3 className="mt-1 text-base font-bold">{p.n}</h3>
              </div>
              <StatusPill status={p.s as any} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div><p className="text-[11px] text-muted-foreground">Milestones</p><p className="font-semibold tabular-nums">{p.m}</p></div>
              <div><p className="text-[11px] text-muted-foreground">Value</p><p className="font-semibold tabular-nums">{p.a}</p></div>
              <div><p className="text-[11px] text-muted-foreground">Due</p><p className="font-semibold">{p.d}</p></div>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Progress</span><span className="font-semibold">{p.p}%</span></div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-glow)]" style={{ width: `${p.p}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
