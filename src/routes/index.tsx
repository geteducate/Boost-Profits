import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, BarChart3, Bell, Building2, CheckCircle2, ClipboardList, Cloud, FileText, Lock, Receipt, Send, ShieldCheck, Sparkles, Star, TrendingUp, Users, Workflow, Zap } from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
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
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-background/80 p-3 pr-5 shadow-card-soft backdrop-blur">
            <div className="flex -space-x-2">
              {["#0f1b3d","#1e3a5f","#3b6fa0"].map((c) => (
                <span key={c} className="h-7 w-7 rounded-full border-2 border-background" style={{ background: c }} />
              ))}
            </div>
            <div className="text-xs">
              <p className="font-semibold">$1.4M+ recovered</p>
              <p className="text-muted-foreground">across 1,200 agencies last quarter</p>
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
          Trusted by 1,200+ agencies & service teams
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
      description="Service businesses lose 9% of revenue to late, missed and untracked invoices. We fix the four places it leaks."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
    <Section tone="muted" eyebrow="How it works" title="From kickoff to paid in five clean steps.">
      <div className="grid gap-4 md:grid-cols-5">
        {steps.map((s, i) => (
          <div key={s.n} className="card-premium p-6 fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <p className="text-xs font-bold tracking-widest text-primary-glow" style={{ color: "var(--primary-glow)" }}>{s.n}</p>
            <h3 className="mt-3 text-base font-bold">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
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
    <Section eyebrow="Features" title="Everything you need. Nothing you don’t.">
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
    <Section tone="muted" eyebrow="Proof" title="Recovery rates that speak for themselves.">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="card-premium p-6 lg:col-span-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-eyebrow">On-time payment rate</p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight">61% → 96%</p>
              <p className="text-sm text-muted-foreground">After 90 days on Boost Profits</p>
            </div>
            <span className="rounded-full bg-success/12 px-2.5 py-1 text-xs font-semibold text-success">+35 pts</span>
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
            { v: "$1.4M+", l: "Recovered for clients" },
            { v: "11 hrs", l: "Saved per agency / week" },
            { v: "−68%", l: "Reduction in overdue invoices" },
          ].map((s) => (
            <div key={s.l} className="card-premium p-5">
              <p className="text-3xl font-extrabold tracking-tight">{s.v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { q: "We cut invoice-chasing time in half. The reminders alone paid for the plan.", n: "Mara K.", r: "Founder, Northwind Studio" },
          { q: "Our milestone billing became predictable for the first time.", n: "Idris T.", r: "Ops Lead, Lumen Agency" },
          { q: "Clients pay faster because the workflow is clearer.", n: "Jess R.", r: "Principal, Helix Labs" },
        ].map((t) => (
          <figure key={t.n} className="card-premium p-6">
            <div className="flex gap-1 text-primary-glow" style={{ color: "var(--primary-glow)" }}>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed">“{t.q}”</blockquote>
            <figcaption className="mt-4 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{t.n}</span> · {t.r}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Trust() {
  const trust = [
    { i: Lock, t: "TLS encrypted", d: "All traffic is encrypted in transit and at rest." },
    { i: ShieldCheck, t: "Protected admin", d: "Role-based access with full audit logging." },
    { i: BadgeCheck, t: "Privacy first", d: "GDPR-aligned; export or delete data anytime." },
    { i: Receipt, t: "Audit trail", d: "Every change to invoices and milestones is recorded." },
  ];
  return (
    <Section eyebrow="Trust & security" title="Built to be trusted with money." description="Boost Profits handles invoices and client data with the seriousness it deserves.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {trust.map((t) => (
          <div key={t.t} className="card-premium p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-success/12 text-success">
              <t.i className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-bold">{t.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
          </div>
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
                <p className="mt-2 text-3xl font-extrabold tracking-tight">$12,480 recovered</p>
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
