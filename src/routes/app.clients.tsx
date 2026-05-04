import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { AppShell, StatusPill } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const Route = createFileRoute("/app/clients")({
  head: () => ({ meta: [{ title: "Clients — Boost Profits" }] }),
  component: ClientsPage,
});

const clients = [
  { n: "Northwind Studio", c: "mara@northwind.co", p: 4, v: "$48,200", r: "At risk" },
  { n: "Lumen Agency", c: "idris@lumen.co", p: 3, v: "$31,800", r: "Active" },
  { n: "Helix Labs", c: "jess@helix.io", p: 2, v: "$22,500", r: "Active" },
  { n: "Fern & Co.", c: "ops@fernco.com", p: 1, v: "$12,400", r: "Active" },
  { n: "Atlas Marketing", c: "k@atlas.cm", p: 5, v: "$64,000", r: "Active" },
  { n: "Quanta", c: "billing@quanta.io", p: 2, v: "$18,200", r: "At risk" },
  { n: "Vertex Build", c: "mike@vertex.dev", p: 3, v: "$27,800", r: "Active" },
];

function ClientsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | "Active" | "At risk">("All");
  const [risk, setRisk] = useState<"Any" | "Active" | "At risk">("Any");
  const [sort, setSort] = useState<"Name" | "Value" | "Projects">("Name");

  const filtered = useMemo(() => {
    let list = clients.filter((c) => {
      const q = query.toLowerCase();
      const matchQ = !q || c.n.toLowerCase().includes(q) || c.c.toLowerCase().includes(q);
      const matchS = status === "All" || c.r === status;
      const matchR = risk === "Any" || c.r === risk;
      return matchQ && matchS && matchR;
    });
    list = [...list].sort((a, b) => {
      if (sort === "Name") return a.n.localeCompare(b.n);
      if (sort === "Projects") return b.p - a.p;
      return parseInt(b.v.replace(/\D/g, "")) - parseInt(a.v.replace(/\D/g, ""));
    });
    return list;
  }, [query, status, risk, sort]);

  return (
    <AppShell
      title="Clients"
      subtitle="Every account, contact and active engagement."
      actions={
        <Button onClick={() => toast.success("New client form opened")} className="bg-cta text-primary-foreground">
          <Plus className="mr-1.5 h-4 w-4" />New client
        </Button>
      }
    >
      <div className="card-premium p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search clients..." className="pl-9" />
          </div>
          <FilterMenu label={`Status: ${status}`} options={["All", "Active", "At risk"]} onSelect={(v) => setStatus(v as any)} />
          <FilterMenu label={`Risk: ${risk}`} options={["Any", "Active", "At risk"]} onSelect={(v) => setRisk(v as any)} />
          <FilterMenu label={`Sort: ${sort}`} options={["Name", "Value", "Projects"]} onSelect={(v) => setSort(v as any)} />
        </div>
        <div className="mt-5 -mx-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-5 py-3">Client</th><th className="px-5 py-3">Contact</th><th className="px-5 py-3">Projects</th><th className="px-5 py-3">Lifetime value</th><th className="px-5 py-3">Risk</th></tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.n} className="border-t border-border hover:bg-muted/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cta text-xs font-bold text-primary-foreground">{c.n.split(" ").map((s) => s[0]).slice(0,2).join("")}</span>
                      <span className="font-semibold">{c.n}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{c.c}</td>
                  <td className="px-5 py-3 tabular-nums">{c.p}</td>
                  <td className="px-5 py-3 font-semibold tabular-nums">{c.v}</td>
                  <td className="px-5 py-3"><StatusPill status={c.r as any} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-sm text-muted-foreground">No clients match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

function FilterMenu({ label, options, onSelect }: { label: string; options: string[]; onSelect: (v: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map((o) => (
          <DropdownMenuItem key={o} onSelect={() => onSelect(o)}>{o}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
