import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";

export const Route = createFileRoute("/admin/forms")({
  head: () => ({ meta: [{ title: "Form submissions — Admin" }] }),
  component: FormsAdmin,
});

const forms = [
  { f: "Contact", n: "Sara Lin", e: "sara@studio.io", m: "Curious if you support EU VAT...", d: "2h ago" },
  { f: "Demo request", n: "Owen P.", e: "owen@atlas.cm", m: "Need a walkthrough for our PMs.", d: "5h ago" },
  { f: "Contact", n: "Mike V.", e: "mike@vertex.dev", m: "Onboarding question.", d: "Yesterday" },
];

function FormsAdmin() {
  return (
    <AdminShell title="Form submissions" subtitle="Everything captured from the public site.">
      <div className="grid gap-4 lg:grid-cols-2">
        {forms.map((s, i) => (
          <article key={i} className="card-premium p-6">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-semibold text-primary">{s.f}</span>
              <span className="text-xs text-muted-foreground">{s.d}</span>
            </div>
            <h3 className="mt-3 text-base font-bold">{s.n}</h3>
            <p className="text-xs text-muted-foreground">{s.e}</p>
            <p className="mt-3 text-sm">{s.m}</p>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
