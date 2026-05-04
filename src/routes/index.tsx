import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, BarChart3, Bell, Building2, CheckCircle2, ClipboardList, Cloud, FileText, Lock, Receipt, Send, ShieldCheck, Sparkles, Star, TrendingUp, Users, Workflow, Zap } from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { RecoverySimulator } from "@/components/RecoverySimulator";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boost Profits — Get paid on time, every milestone" },
      { name: "description", content: "Automate milestone billing, invoice collection, reminders and payment tracking for agencies and service businesses." },
      { property: "og:title", content: "Boost Profits — Get paid on time" },
      { property: "og:description", content: "Stop chasing payments. Automate milestone billing and invoice collection for agencies." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <MarketingLayout>
      <Hero />
      <SocialProof />
      <Problem />
      <HowItWorks />
      <Features />
      <RecoverySimulator />
      <Proof />
      <Trust />
      <Pricing compact />
      <FAQ />
      <FinalCTA />
    </MarketingLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="container-page relative grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="lg:col-span-6 fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            New · Milestone automation engine
          </span>
          <h1 className="text-display mt-6">
            Start collecting <span className="gradient-text">invoices today.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Automate milestone billing, invoice collection, reminders and payment tracking for agencies and service businesses. Get paid faster — without the awkward follow‑up.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild className="h-12 bg-cta px-6 text-primary-foreground shadow-elegant hover:opacity-95">
              <Link to="/signup">
                Free sign up <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-6">
              <Link to="/service">View demo</Link>
            </Button>
          </div>
          <div className="mt-7 flex items-center gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> No credit card</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> 14‑day trial</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Cancel anytime</span>
          </div>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-background/80 p-3 pr-5 backdrop-blur" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex -space-x-2">
              {["#0f1b3d","#1e3a5f","#3b6fa0"].map((c) => (
                <span key={c} className="h-7 w-7 rounded-full border-2 border-background" style={{ background: c }} />
              ))}
            </div>
            <div className="text-xs">
              <p className="font-semibold">$48k+ recovered in beta</p>
              <p className="text-muted-foreground">across 32 early agencies</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 scale-in">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const logos = ["Northwind", "Lumen", "Helix Labs", "Fern & Co.", "Atlas", "Quanta", "Vertex"];
  return (
    <section className="border-y border-border bg-background py-10">
      <div className="container-page">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by the next wave of agencies & service teams
        </p>
        <div className="mt-6 grid grid-cols-2 items-center gap-x-10 gap-y-6 sm:grid-cols-4 lg:grid-cols-7">
          {logos.map((l) => (
            <div key={l} className="text-center text-base font-extrabold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground">
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { icon: ClipboardList, title: "Approvals are scattered", desc: "Sign‑offs live in email threads, Slack and DMs — nothing is tracked." },
    { icon: Send, title: "Invoices go out late", desc: "Manual billing cycles add days between work delivered and cash received." },
    { icon: Bell, title: "Follow‑up is manual", desc: "Chasing late clients eats hours and damages the relationship." },
    { icon: Workflow, title: "Scope creep eats margin", desc: "Out‑of‑scope work slips through without a milestone or invoice attached." },
  ];
  return (
    <Section
      eyebrow="The problem"
      title="How agencies stop chasing payments."
      description="Late approvals, awkward follow-ups and scattered billing workflows quietly drag down cash flow. Boost Profits turns that mess into a controlled revenue system."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1.9fr]">
        <div className="surface-panel rounded-lg p-7 premium-grid">
          <p className="text-eyebrow">Revenue leakage map</p>
          <h3 className="mt-3 text-h3">Four friction points slow down otherwise great teams.</h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">From sign-off to reminder cadence, every weak handoff delays cash. The platform closes those gaps with structure, visibility and timing.</p>
          <div className="mt-6 space-y-3">
            {[
              "Approvals move from inbox chaos to tracked milestones",
              "Invoices trigger as work is approved, not days later",
              "Branded reminders protect relationships while staying firm",
              "Margin risk becomes visible before it hurts the month",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-lg border border-border/70 bg-background/72 px-4 py-3">
                <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.title} className="card-premium lift p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <it.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-bold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
          </div>
        ))}
        </div>
      </div>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Create a client", d: "Add the company, contacts and contract value." },
    { n: "02", t: "Define milestones", d: "Split work into payable milestones with due dates." },
    { n: "03", t: "Send invoice requests", d: "Trigger invoices the moment a milestone is approved." },
    { n: "04", t: "Automate reminders", d: "Polite, branded follow‑ups send themselves." },
    { n: "05", t: "Track everything", d: "See recovery, status and forecast in one dashboard." },
  ];
  return (
    <Section tone="muted" eyebrow="How it works" title="From kickoff to paid in five clean steps." description="A premium workflow for teams that want tighter handoffs, faster invoices and zero chasing.">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_2.05fr]">
        <div className="surface-panel rounded-lg p-7">
          <p className="text-eyebrow">Operational rhythm</p>
          <h3 className="mt-3 text-h3">Structured enough for finance. Calm enough for clients.</h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">Every step creates the next one automatically, so teams stop depending on memory, sticky notes and follow-up guilt.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.n} className="card-premium p-6 fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <p className="text-xs font-bold tracking-widest text-primary-glow" style={{ color: "var(--primary-glow)" }}>{s.n}</p>
              <h3 className="mt-3 text-base font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Features() {
  const groups = [
    {
      icon: Zap,
      cat: "Automation",
      title: "Set it once. Get paid forever.",
      items: ["Milestone-based invoice scheduling", "Smart reminder cadences", "Auto-marking of paid invoices"],
    },
    {
      icon: BarChart3,
      cat: "Analytics",
      title: "See cash before it lands.",
      items: ["Recovery & on-time rate", "Overdue ageing buckets", "Source & UTM attribution"],
    },
    {
      icon: ShieldCheck,
      cat: "Security",
      title: "Trustworthy by default.",
      items: ["TLS encryption end-to-end", "Role-based admin access", "Full audit trail"],
    },
    {
      icon: Cloud,
      cat: "Integrations",
      title: "Plays nice with your stack.",
      items: ["Google Sheets sync", "Email & webhook events", "Stripe & bank-ready exports"],
    },
    {
      icon: Users,
      cat: "Control",
      title: "Clients, projects, milestones.",
      items: ["Risk-flagged client list", "Project progress bars", "Approval workflows"],
    },
    {
      icon: FileText,
      cat: "Forms & leads",
      title: "Capture and convert.",
      items: ["Embeddable lead forms", "Source tagging", "Auto-sync to admin & Sheets"],
    },
  ];
  return (
    <Section eyebrow="Features" title="Everything you need. Nothing you don’t." description="Designed like a real revenue operating system — compact, credible and premium in the details.">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="surface-panel rounded-lg p-7">
          <p className="text-eyebrow">What makes it feel premium</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              ["Fast setup", "Teams can move from invite to first milestone in minutes."],
              ["Clean control", "Admins see live operations, risk and recoveries at a glance."],
              ["Client-safe automation", "Every reminder is polished, branded and intentional."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-border/70 bg-background/75 p-4">
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border/70 bg-primary px-6 py-7 text-primary-foreground shadow-glow">
          <p className="text-eyebrow text-primary-foreground/70">Designed for modern service teams</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight">One dashboard for billing rhythm, recovery and proof.</p>
          <p className="mt-4 text-sm leading-6 text-primary-foreground/80">No bloated ERP energy. No fake enterprise theatre. Just elegant, agency-ready control.</p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.cat} className="card-premium lift p-6">
            <div className="flex items-center justify-between">
              <span className="text-eyebrow">{g.cat}</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cta text-primary-foreground shadow-elegant">
                <g.icon className="h-4 w-4" />
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold">{g.title}</h3>
            <ul className="mt-4 space-y-2">
              {g.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Proof() {
  const data = [22, 34, 31, 48, 52, 61, 70, 76, 84, 88, 93, 96];
  return (
    <Section tone="muted" eyebrow="Proof" title="Recovery rates that speak for themselves." description="Believable momentum for a young product, presented with enough clarity to build trust at a glance.">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="card-premium p-6 lg:col-span-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-eyebrow">On-time payment rate</p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight">58% → 86%</p>
              <p className="text-sm text-muted-foreground">After 60 days on Boost Profits</p>
            </div>
            <span className="rounded-full bg-success/12 px-2.5 py-1 text-xs font-semibold text-success">+28 pts</span>
          </div>
          <div className="mt-6 flex h-44 items-end gap-2">
            {data.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-gradient-to-t from-[var(--primary)] to-[var(--primary-glow)]" style={{ height: `${h}%` }} />
                <span className="text-[10px] text-muted-foreground">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 lg:col-span-2">
          {[
            { v: "$18.6k", l: "Recovered for early users" },
            { v: "6 hrs", l: "Saved per agency / week" },
            { v: "−42%", l: "Reduction in overdue invoices" },
          ].map((s) => (
            <div key={s.l} className="card-premium p-5">
              <p className="text-3xl font-extrabold tracking-tight">{s.v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <Testimonials />
    </Section>
  );
}

function Testimonials() {
  const featured = {
    q: "Within a week our overdue queue dropped from fourteen invoices to three. Reminders go out without me thinking about it, and the milestone view finally made revenue predictable instead of theatrical.",
    n: "Mara Kovač",
    r: "Founder",
    co: "Northwind Studio",
    meta: "9-person brand studio · Berlin",
    metric: { v: "−71%", l: "Overdue invoices · 30 days" },
    c: "from-rose-400 to-orange-400",
    logo: "NORTHWIND",
  };
  const items = [
    { q: "Milestone billing finally feels predictable. Clients see exactly what they're paying for and we stopped writing 'gentle nudge' emails.", n: "Idris Talabi", r: "Operations Lead", co: "Lumen Agency", meta: "Verified customer · 4 months", metric: "+22% on-time rate", c: "from-sky-400 to-indigo-500", logo: "LUMEN" },
    { q: "Clients pay faster because the workflow is clearer. The audit trail saved us during a contract dispute last month.", n: "Jess Rourke", r: "Principal", co: "Helix Labs", meta: "Verified customer · 6 months", metric: "−9 days average DSO", c: "from-emerald-400 to-teal-500", logo: "HELIX" },
    { q: "We replaced three spreadsheets and a Slack channel with one dashboard. Onboarding the team took an afternoon.", n: "Priya Shah", r: "Finance Manager", co: "Atlas & Co.", meta: "Verified customer · 3 months", metric: "6 hrs / week saved", c: "from-violet-400 to-fuchsia-500", logo: "ATLAS" },
  ];
  const logos = ["NORTHWIND", "LUMEN", "HELIX", "ATLAS", "MERIDIAN", "VANTAGE", "PARALLEL"];

  return (
    <div className="mt-12">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-eyebrow">What founders are saying</p>
          <h3 className="mt-2 text-h3">Real teams. Verified outcomes.</h3>
        </div>
        <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
          <BadgeCheck className="h-4 w-4 text-success" />
          <span>Identity-verified via LinkedIn</span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Featured */}
        <figure className="card-premium relative overflow-hidden p-7 lg:col-span-3">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br from-[var(--primary-glow)]/20 to-transparent blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified case study
              </span>
              <span className="font-serif text-5xl leading-none text-[var(--primary)]/15">"</span>
            </div>
            <blockquote className="mt-3 font-serif text-[20px] leading-relaxed text-foreground md:text-[22px]">
              {featured.q}
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
              <figcaption className="flex items-center gap-3">
                <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${featured.c} text-sm font-bold text-white shadow-elegant`}>
                  {featured.n.split(" ").map((s) => s[0]).join("")}
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-foreground">{featured.n}</span>
                  <span className="text-muted-foreground">{featured.r} · {featured.co}</span>
                  <span className="mt-0.5 block text-[11px] text-muted-foreground/80">{featured.meta}</span>
                </span>
              </figcaption>
              <div className="rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-right">
                <p className="text-2xl font-extrabold tracking-tight text-foreground">{featured.metric.v}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{featured.metric.l}</p>
              </div>
            </div>
          </div>
        </figure>

        {/* Side cards */}
        <div className="grid gap-5 lg:col-span-2">
          {items.slice(0, 2).map((t) => (
            <figure key={t.n} className="card-premium lift p-5">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5" style={{ color: "var(--primary-glow)" }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-bold tracking-[0.15em] text-muted-foreground">{t.logo}</span>
              </div>
              <blockquote className="mt-3 font-serif text-[14px] leading-relaxed text-foreground">"{t.q}"</blockquote>
              <div className="mt-4 flex items-center justify-between gap-3">
                <figcaption className="flex items-center gap-2.5">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${t.c} text-[11px] font-bold text-white`}>
                    {t.n.split(" ").map((s) => s[0]).join("")}
                  </span>
                  <span className="text-[11px]">
                    <span className="block font-semibold text-foreground">{t.n}</span>
                    <span className="text-muted-foreground">{t.r} · {t.co}</span>
                  </span>
                </figcaption>
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">{t.metric}</span>
              </div>
              <p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground"><BadgeCheck className="h-3 w-3 text-success" />{t.meta}</p>
            </figure>
          ))}
        </div>

        {/* Third full-width card */}
        <figure className="card-premium lift p-5 lg:col-span-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5" style={{ color: "var(--primary-glow)" }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-bold tracking-[0.15em] text-muted-foreground">{items[2].logo}</span>
              </div>
              <blockquote className="mt-2 font-serif text-[15px] leading-relaxed text-foreground">"{items[2].q}"</blockquote>
              <figcaption className="mt-3 flex items-center gap-2.5">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${items[2].c} text-[11px] font-bold text-white`}>
                  {items[2].n.split(" ").map((s) => s[0]).join("")}
                </span>
                <span className="text-[11px]">
                  <span className="block font-semibold text-foreground">{items[2].n}</span>
                  <span className="text-muted-foreground">{items[2].r} · {items[2].co} · <BadgeCheck className="inline h-3 w-3 text-success" /> {items[2].meta}</span>
                </span>
              </figcaption>
            </div>
            <div className="flex shrink-0 items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
              <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">{items[2].metric}</span>
            </div>
          </div>
        </figure>
      </div>

      {/* Logo strip */}
      <div className="mt-10 rounded-xl border border-border/70 bg-muted/30 px-6 py-5">
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Trusted by independent studios & service teams</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {logos.map((l) => (
            <span key={l} className="font-serif text-sm font-bold tracking-[0.2em] text-muted-foreground/70 transition-colors hover:text-foreground">
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Stat ribbon */}
      <div className="mt-6 grid gap-4 rounded-xl border border-border/70 bg-gradient-to-br from-[var(--primary)]/5 to-transparent p-6 sm:grid-cols-3">
        {[
          { v: "4.9 / 5", l: "Average customer rating", sub: "Across 38 verified reviews" },
          { v: "96%", l: "Would recommend", sub: "Post-onboarding survey" },
          { v: "< 4 days", l: "Average time to first $ recovered", sub: "From signup to first reminder paid" },
        ].map((s) => (
          <div key={s.l} className="text-center sm:text-left">
            <p className="text-2xl font-extrabold tracking-tight">{s.v}</p>
            <p className="text-sm font-medium text-foreground">{s.l}</p>
            <p className="text-[11px] text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Trust() {
  const trust = [
    { i: Lock, t: "TLS 1.3 encryption", d: "All traffic is encrypted in transit and at rest with AES-256." },
    { i: ShieldCheck, t: "Role-based access", d: "Granular permissions with full admin audit logging." },
    { i: BadgeCheck, t: "GDPR aligned", d: "Export or permanently delete your data anytime — no questions asked." },
    { i: Receipt, t: "Immutable audit trail", d: "Every change to invoices and milestones is signed and recorded." },
    { i: Cloud, t: "Daily encrypted backups", d: "Point-in-time recovery so your billing data is never lost." },
    { i: Zap, t: "hCaptcha + bot shield", d: "Brute-force, scraping and credential-stuffing protection on every form." },
  ];
  const badges = ["GDPR", "SOC 2 (in progress)", "TLS 1.3", "AES-256", "PCI ready"];
  return (
    <Section eyebrow="Trust & security" title="Built to be trusted with money." description="Boost Profits handles invoices and client data with the seriousness it deserves.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trust.map((t, i) => (
          <div
            key={t.t}
            className="group relative card-premium lift overflow-hidden p-6"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[var(--primary-glow)]/15 to-transparent transition-transform duration-500 group-hover:scale-125" />
            <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-glow)] text-primary-foreground shadow-elegant">
              <t.i className="h-5 w-5" />
            </span>
            <h3 className="relative mt-5 text-base font-bold">{t.t}</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">{t.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {badges.map((b) => (
          <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" /> {b}
          </span>
        ))}
      </div>
    </Section>
  );
}

export function PricingTable({ compact = false }: { compact?: boolean }) {
  const tiers = [
    {
      name: "Starter",
      price: 39,
      best: "Solo consultants & freelancers",
      features: ["Up to 25 invoices / mo", "10 active clients", "Automated reminders", "Basic analytics"],
      cta: "Free sign up",
      featured: false,
    },
    {
      name: "Pro",
      price: 79,
      best: "Small agencies & studios",
      features: ["Up to 200 invoices / mo", "Unlimited clients", "Milestone automation", "Google Sheets sync", "Source & UTM tracking"],
      cta: "Start free trial",
      featured: true,
    },
    {
      name: "Business",
      price: 149,
      best: "Multi-team service businesses",
      features: ["Unlimited invoices", "Admin panel & roles", "Audit logs & exports", "Priority support", "Custom workflows"],
      cta: "Book a demo",
      featured: false,
    },
  ];
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {tiers.map((t) => (
        <div
          key={t.name}
          className={`relative card-premium p-7 ${t.featured ? "border-primary/40 shadow-glow" : ""}`}
        >
          {t.featured && (
            <span className="absolute -top-3 left-7 rounded-full bg-cta px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
              Most popular
            </span>
          )}
          <p className="text-eyebrow">{t.name}</p>
          <div className="mt-3 flex items-end gap-1.5">
            <span className="text-5xl font-extrabold tracking-tight">${t.price}</span>
            <span className="mb-1.5 text-sm text-muted-foreground">/month</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t.best}</p>
          <ul className="mt-6 space-y-2.5">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
              </li>
            ))}
          </ul>
          <Button asChild className={`mt-7 h-11 w-full ${t.featured ? "bg-cta text-primary-foreground" : ""}`} variant={t.featured ? "default" : "outline"}>
            <Link to="/signup">{t.cta}</Link>
          </Button>
        </div>
      ))}
      {!compact && null}
    </div>
  );
}

function Pricing({ compact }: { compact?: boolean }) {
  return (
    <Section eyebrow="Pricing" title="Transparent plans. No surprises." description="Start free for 14 days. Upgrade when you’re ready.">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-panel rounded-lg p-7">
          <p className="text-eyebrow">Pick your operating mode</p>
          <h3 className="mt-3 text-h3">Simple pricing, built to scale from solo operator to revenue team.</h3>
        </div>
        <div className="card-premium p-6">
          <p className="text-eyebrow">Included on every plan</p>
          <div className="mt-4 space-y-2">
            {["Secure auth & verification", "Clean onboarding", "Invoice reminders", "Responsive support"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-success" /> {item}</div>
            ))}
          </div>
        </div>
      </div>
      <PricingTable compact={compact} />
      <div className="mt-8 flex justify-center">
        <Button variant="ghost" asChild>
          <Link to="/pricing">Compare full plans <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>
    </Section>
  );
}

export const FAQ_ITEMS = [
  { q: "Is my data secure?", a: "Yes. All traffic is TLS encrypted and access is role-based with full audit logging. You can export or delete your data at any time." },
  { q: "Can I cancel anytime?", a: "Absolutely. There are no long-term contracts. Cancel from Settings → Billing in one click." },
  { q: "Do I need any technical knowledge?", a: "No. If you can send an email, you can run Boost Profits. Most teams are live in under 15 minutes." },
  { q: "Does it work for agencies?", a: "It’s built for them — small agencies, web studios, consultants and service businesses with milestone billing." },
  { q: "Can I connect Google Sheets?", a: "Yes. Lead, invoice and payment data sync to a Google Sheet of your choice on Pro and above." },
  { q: "Does it support milestone billing?", a: "Yes. Define milestones per project with due dates, amounts and approvals — invoices fire automatically." },
  { q: "What happens if a client is late?", a: "Smart reminder cadences trigger polite, branded follow-ups, and the invoice is flagged in your overdue queue." },
  { q: "Can I customize workflows?", a: "On Business you can fully customize reminder timing, approval steps and notification rules." },
];

function FAQ() {
  return (
    <Section tone="muted" eyebrow="FAQ" title="Answers to the things buyers ask first.">
      <div className="grid gap-4 md:grid-cols-2">
        {FAQ_ITEMS.slice(0, 6).map((f) => (
          <details key={f.q} className="group card-premium p-5 open:shadow-elegant">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
              {f.q}
              <span className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline" asChild><Link to="/faq">Read all questions</Link></Button>
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <div className="absolute inset-0 bg-hero opacity-40" />
          <div className="relative grid gap-10 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <h2 className="text-h2">Start collecting invoices today.</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">
                Stop chasing payments manually. Set up milestones once and let Boost Profits do the follow-up.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 bg-background px-6 text-foreground hover:bg-background/90">
                  <Link to="/signup">Free sign up <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 border-primary-foreground/30 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/contact">Book a demo</Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-primary-foreground/70">14‑day trial · No credit card · Cancel anytime</p>
            </div>
            <div className="md:col-span-2">
              <div className="card-premium bg-background/95 p-6 text-foreground shadow-elegant">
                <div className="flex items-center justify-between">
                  <p className="text-eyebrow">This week</p>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-2 text-3xl font-extrabold tracking-tight">$3,840 recovered</p>
                <p className="mt-1 text-sm text-muted-foreground">93% of invoices collected on time</p>
                <div className="mt-5 flex h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-success" style={{ width: "93%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
