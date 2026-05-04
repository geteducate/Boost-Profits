import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";

export const Route = createFileRoute("/admin/sources")({
  head: () => ({ meta: [{ title: "Sources & UTM — Admin" }] }),
  component: SourcesAdmin,
});

const sources = [
  { s: "Google Ads", c: "spring_pricing", v: 1240, sg: 42, cv: "3.4%" },
  { s: "Direct", c: "—", v: 980, sg: 28, cv: "2.9%" },
  { s: "Twitter / X", c: "tweet_apr", v: 612, sg: 18, cv: "2.9%" },
  { s: "Referral", c: "partner_helix", v: 488, sg: 22, cv: "4.5%" },
  { s: "Newsletter", c: "weekly_42", v: 224, sg: 12, cv: "5.4%" },
];

function SourcesAdmin() {
  return (
    <AdminShell title="Sources & UTM tracking" subtitle="Where qualified leads actually come from.">
      <div className="card-premium overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-6 py-3">Source</th><th className="px-6 py-3">Campaign</th><th className="px-6 py-3">Visitors</th><th className="px-6 py-3">Signups</th><th className="px-6 py-3">Conv.</th></tr>
          </thead>
          <tbody>
            {sources.map((r) => (
              <tr key={r.s + r.c} className="border-t border-border hover:bg-muted/40">
                <td className="px-6 py-3 font-semibold">{r.s}</td>
                <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{r.c}</td>
                <td className="px-6 py-3 tabular-nums">{r.v}</td>
                <td className="px-6 py-3 tabular-nums">{r.sg}</td>
                <td className="px-6 py-3 font-semibold text-success">{r.cv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
