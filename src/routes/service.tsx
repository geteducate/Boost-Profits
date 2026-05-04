import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Briefcase, Code2, MonitorSmartphone, Megaphone, Receipt, ShieldCheck, Workflow, BarChart3, Cloud, Zap, Lock, CheckCircle2 } from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { PricingTable, FAQ_ITEMS } from "./index";

export const Route = createFileRoute("/service")({
  head: () => ({
    meta: [
      { title: "Product — Boost Profits" },
      { name: "description", content: "Automate invoice collection, milestone billing and payment recovery for agencies and service businesses." },
      { property: "og:title", content: "Boost Profits — Product" },
      { property: "og:description", content: "Built for agencies, studios, consultants and service businesses that invoice by milestone." },
    ],
  }),
  component: ServicePage,
});

function ServicePage() {
  return (
    <MarketingLayout>
      <section className="bg-hero">
        <div className="container-page py-20 md:py-28">
          <p className="text-eyebrow">Product</p>
          <h1 className="text-display mt-4 max-w-4xl">
            Automate invoice collection and reduce payment delays.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Built for agencies, studios, consultants and service businesses that invoice by milestone.
            One workflow, from kickoff to paid.
          </p>
          <div className="mt-8 flex gap-3">
            <Button size="lg" asChild className="h-12 bg-cta px-6 text-primary-foreground"><Link to="/signup">Free sign up <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-6"><Link to="/contact">Book a demo</Link></Button>
          </div>
        </div>
      </section>

      <Section eyebrow="Who it’s for" title="One platform. Six kinds of teams.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { i: Briefcase, t: "Small agencies", d: "Predictable cash flow across multiple retainers and projects." },
            { i: MonitorSmartphone, t: "Web design studios", d: "Tie milestone payments to design and dev sign-offs." },
            { i: Megaphone, t: "Performance marketing", d: "Recurring invoices with attribution and ROI tracking." },
            { i: Code2, t: "E-commerce service teams", d: "Bill against deliverables, not vague timelines." },
            { i: Building2, t: "Consultants", d: "Replace messy follow-ups with calm automation." },
            { i: Receipt, t: "Freelancers", d: "Look like an agency. Get paid like one." },
          ].map((p) => (
            <div key={p.t} className="card-premium lift p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary"><p.i className="h-5 w-5" /></span>
              <h3 className="mt-5 text-base font-bold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="Capabilities" title="Grouped the way teams actually work.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { i: Zap, t: "Efficiency", items: ["Templates for clients/projects", "Bulk milestone creation", "One-click invoice send"] },
            { i: ShieldCheck, t: "Security", items: ["TLS encryption", "Role-based access", "Granular audit logs"] },
            { i: Cloud, t: "Integration", items: ["Google Sheets sync", "Webhook events", "Email & calendar"] },
            { i: BarChart3, t: "Visibility", items: ["Recovery dashboard", "Ageing buckets", "Source & UTM tracking"] },
            { i: Workflow, t: "Automation", items: ["Smart reminder cadences", "Auto-status updates", "Late-payment escalations"] },
            { i: Lock, t: "Control", items: ["Approval workflows", "Risk flags on clients", "Editable reminder copy"] },
          ].map((g) => (
            <div key={g.t} className="card-premium p-6">
              <div className="flex items-center justify-between">
                <span className="text-eyebrow">{g.t}</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cta text-primary-foreground"><g.i className="h-4 w-4" /></span>
              </div>
              <ul className="mt-5 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Service flow" title="From client to cash, in one continuous flow.">
        <ol className="grid gap-3 md:grid-cols-4 lg:grid-cols-8">
          {["Create client", "Create project", "Set milestone", "Generate invoice", "Send reminder", "Mark paid", "Track progress", "Export / sync"].map((s, i) => (
            <li key={s} className="card-premium relative p-5">
              <span className="text-xs font-bold tracking-widest text-primary-glow" style={{ color: "var(--primary-glow)" }}>0{i + 1}</span>
              <p className="mt-2 text-sm font-semibold">{s}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted" eyebrow="Pricing" title="Pick a plan that matches the work.">
        <PricingTable />
      </Section>

      <Section eyebrow="Case studies" title="Real results. Realistic timelines.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { t: "Web studio cuts late payments 60%", d: "An 8-person studio replaced manual reminders with milestone automation and recovered $48k in 90 days." },
            { t: "Agency stops chasing invoices", d: "A growth agency reduced AR-days from 41 to 18 by tying invoices to approved milestones." },
            { t: "Consultant automates everything", d: "A solo consultant runs ten retainers without touching an invoice — and reclaimed five hours a week." },
          ].map((c) => (
            <article key={c.t} className="card-premium lift p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> Case study
              </div>
              <h3 className="mt-4 text-lg font-bold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              <Button variant="ghost" size="sm" className="mt-4 -ml-2" asChild><Link to="/contact">Read story <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="FAQ" title="Buyer questions, answered.">
        <div className="grid gap-4 md:grid-cols-2">
          {FAQ_ITEMS.map((f) => (
            <details key={f.q} className="group card-premium p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                {f.q}<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="py-20">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl bg-primary p-12 text-center text-primary-foreground">
            <h2 className="text-h2">Stop chasing payments manually.</h2>
            <p className="mt-3 text-primary-foreground/80">Set up milestones once. Boost Profits handles the rest.</p>
            <div className="mt-7 flex justify-center gap-3">
              <Button asChild size="lg" className="h-12 bg-background px-6 text-foreground hover:bg-background/90"><Link to="/signup">Free sign up</Link></Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-primary-foreground/30 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10"><Link to="/contact">Book a demo</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
