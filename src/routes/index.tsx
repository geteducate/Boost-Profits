import { lazy, Suspense, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight, BadgeCheck, BarChart3, Bell, CheckCircle2, ClipboardList,
  Cloud, FileText, Lock, PlayCircle, Receipt, Send, ShieldCheck, Sparkles,
  Star, TrendingUp, Users, Workflow, Zap,
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger } from "@/components/Reveal";
import { WorkflowLoop } from "@/components/WorkflowLoop";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { supabase } from "@/integrations/supabase/client";

const RecoverySimulator = lazy(() =>
  import("@/components/RecoverySimulator").then((m) => ({ default: m.RecoverySimulator })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boost Profits — Get Paid On Time, Every Milestone | Automated Billing for Agencies" },
      { name: "description", content: "Agencies lose 20–40% of revenue chasing payments. Boost Profits automates milestone billing, invoice collection and reminders — so you get paid on time without the awkward follow-up." },
      { property: "og:title", content: "Boost Profits — Get Paid On Time, Every Milestone" },
      { property: "og:description", content: "Automated milestone billing for agencies. Stop chasing payments. Protect your cash flow. 14-day free trial, no card required." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <MarketingLayout>
      <Hero />
      <SocialProof />
      <Reveal><Problem /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      <Reveal><DemoVideo /></Reveal>
      <Reveal><Features /></Reveal>
      <Suspense fallback={<div className="py-20" aria-hidden />}>
        <Reveal><RecoverySimulator /></Reveal>
      </Suspense>
      <Reveal><Proof /></Reveal>
      <Reveal><LeadMagnet /></Reveal>
      <Reveal><Trust /></Reveal>
      <Reveal><Pricing compact /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal><FinalCTA /></Reveal>
    </MarketingLayout>
  );
}

/* ─────────────────────────  HERO  ───────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="container-page relative grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="lg:col-span-6 fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Built for agencies and service businesses
          </span>
          <h1 className="text-display mt-6">
            Agencies lose <span className="gradient-text">20–40% of revenue</span> chasing payments. We fix it — automatically.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Boost Profits automates milestone billing, invoice collection and polite reminders so every project gets paid on time — without the awkward follow-up email.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild className="h-12 bg-cta px-6 text-primary-foreground shadow-elegant hover:opacity-95">
              <Link to="/signup">
                Start 14-Day Free Trial – No Card Needed <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-6">
              <a href="#demo"><PlayCircle className="mr-1.5 h-4 w-4" /> Watch 90-sec demo</a>
            </Button>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> No credit card</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> 14-day free trial</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Cancel anytime</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Setup in 15 min</span>
          </div>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-background/80 p-3 pr-5 backdrop-blur" style={{ boxShadow: "var(--shadow-card)" }}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-success/12 text-success">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div className="text-xs">
              <p className="font-semibold">Risk-free guarantee</p>
              <p className="text-muted-foreground">If we don't recover your trial cost in 30 days, we'll refund you in full.</p>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-6 scale-in">
          <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10">
            <div className="absolute right-6 top-6 h-40 w-40 rounded-3xl bg-gradient-to-br from-[var(--primary-glow)]/25 to-transparent blur-2xl float-slow" />
            <div className="absolute -bottom-8 left-2 h-48 w-48 rounded-full bg-gradient-to-tr from-[var(--primary)]/20 to-transparent blur-2xl float-slow" style={{ animationDelay: "1.4s" }} />
          </div>
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  SOCIAL PROOF  ───────────────────────── */

function SocialProof() {
  const stats: { v: React.ReactNode; l: string }[] = [
    { v: <><AnimatedCounter value={63} duration={1800} />+</>, l: "Agencies in early access" },
    { v: <><AnimatedCounter value={1.4} decimals={1} prefix="$" duration={1800} />M+</>, l: "Invoices processed in beta" },
    { v: <><AnimatedCounter value={4.8} decimals={1} duration={1800} /> / 5</>, l: "Average customer rating" },
    { v: <>&lt; <AnimatedCounter value={12} duration={1800} /> min</>, l: "Average time to live" },
  ];
  return (
    <section className="border-y border-border bg-background py-10">
      <div className="container-page">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by independent agencies, studios and service teams worldwide
        </p>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-extrabold tracking-tight text-foreground">{s.v}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  PROBLEM  ───────────────────────── */

function Problem() {
  const items = [
    { icon: ClipboardList, title: "Approvals lost in email", desc: "Sign-offs scatter across inboxes and Slack. Nothing is tracked, nothing closes cleanly." },
    { icon: Send, title: "Invoices go out late", desc: "Manual billing adds days — sometimes weeks — between work delivered and cash received." },
    { icon: Bell, title: "Awkward follow-ups", desc: "Chasing late clients eats hours, kills momentum, and slowly damages the relationship." },
    { icon: Workflow, title: "Scope creep eats margin", desc: "Out-of-scope work slips through without a milestone or invoice attached. You absorb the cost." },
  ];
  return (
    <Section
      eyebrow="The problem"
      title="Cash flow shouldn't depend on memory and guilt."
      description="Most agencies don't have a payment problem — they have a process problem. Late approvals, manual reminders and scattered billing quietly drain 20–40% of monthly revenue."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1.9fr]">
        <div className="surface-panel rounded-lg p-7">
          <p className="text-eyebrow">Revenue leakage map</p>
          <h3 className="mt-3 text-h3">Four friction points slow down otherwise great teams.</h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">From sign-off to reminder cadence, every weak handoff delays cash. Boost Profits closes those gaps with structure, visibility and timing — not more emails.</p>
          <div className="mt-6 space-y-3">
            {[
              "Approvals move from inbox chaos to tracked milestones",
              "Invoices trigger the moment work is approved",
              "Branded reminders stay firm without sounding desperate",
              "Margin risk is visible before it hurts the month",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-lg border border-border/70 bg-background/72 px-4 py-3">
                <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
        <Stagger className="grid gap-4 md:grid-cols-2" step={90}>
          {items.map((it) => (
            <div key={it.title} className="card-premium lift p-6 h-full">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary">
                <it.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-bold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

/* ─────────────────────────  HOW IT WORKS  ───────────────────────── */

function HowItWorks() {
  const steps = [
    { n: "01", t: "Add your client", d: "Company, contacts and contract value — under 60 seconds." },
    { n: "02", t: "Define milestones", d: "Split the project into payable phases with amounts and due dates." },
    { n: "03", t: "Approve & invoice", d: "Client approves a milestone — the invoice fires automatically." },
    { n: "04", t: "Reminders run themselves", d: "Polite, on-brand follow-ups go out on the cadence you set." },
    { n: "05", t: "Track & forecast", d: "See recovery rate, ageing and forecast in one calm dashboard." },
  ];
  return (
    <Section tone="muted" eyebrow="How it works" title="From kickoff to paid in five clean steps." description="Set it up once. Boost Profits handles the chasing for you — forever.">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_2.05fr]">
        <div className="surface-panel rounded-lg p-7">
          <p className="text-eyebrow">Operational rhythm</p>
          <h3 className="mt-3 text-h3">Structured enough for finance. Calm enough for clients.</h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">Every step creates the next one automatically. Your team stops depending on memory, sticky notes and follow-up guilt.</p>
        </div>
        <Stagger className="grid gap-4 md:grid-cols-5" step={110}>
          {steps.map((s) => (
            <div key={s.n} className="card-premium lift p-6 h-full">
              <p className="text-xs font-bold tracking-widest" style={{ color: "var(--primary-glow)" }}>{s.n}</p>
              <h3 className="mt-3 text-base font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

/* ─────────────────────────  DEMO VIDEO PLACEHOLDER  ───────────────────────── */

function DemoVideo() {
  return (
    <Section
      eyebrow="See it work"
      title="Milestone → approval → invoice. In one flow."
      description="A calm, 5-step workflow your clients will move through automatically."
      align="center"
    >
      <div id="demo" className="mx-auto max-w-4xl">
        <WorkflowLoop />
        <div className="mt-6 flex justify-center">
          <Button asChild variant="outline" className="h-11 transition-transform hover:-translate-y-0.5">
            <Link to="/contact">Book a 15-min live walkthrough <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────  FEATURES  ───────────────────────── */

function Features() {
  const groups = [
    { icon: Zap, cat: "Automation", title: "Set it once. Get paid forever.", items: ["Milestone-based invoice scheduling", "Smart reminder cadences", "Auto-marking of paid invoices"] },
    { icon: BarChart3, cat: "Analytics", title: "See cash before it lands.", items: ["Recovery & on-time rate", "Overdue ageing buckets", "Source & UTM attribution"] },
    { icon: Users, cat: "Client experience", title: "Calm, branded, professional.", items: ["Branded client portal", "Polite reminder language", "Approval workflows clients love"] },
    { icon: ShieldCheck, cat: "Security", title: "Trustworthy by default.", items: ["TLS encryption end-to-end", "Role-based admin access", "Full audit trail"] },
    { icon: Cloud, cat: "Integrations", title: "Plays nice with your stack.", items: ["Google Sheets sync", "Email & webhook events", "Stripe & bank-ready exports"] },
    { icon: FileText, cat: "Forms & leads", title: "Capture and convert.", items: ["Embeddable lead forms", "Source tagging", "Auto-sync to admin & Sheets"] },
  ];
  return (
    <Section eyebrow="Features" title="Everything you need. Nothing you don't." description="A real revenue operating system — compact, credible, and premium in the details.">
      <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" step={80}>
        {groups.map((g) => (
          <div key={g.cat} className="card-premium lift p-6 h-full">
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
      </Stagger>
    </Section>
  );
}

/* ─────────────────────────  PROOF / TESTIMONIALS  ───────────────────────── */

function Proof() {
  const data = [22, 34, 31, 48, 52, 61, 70, 76, 84, 88, 93, 96];
  return (
    <Section tone="muted" eyebrow="Results" title="Recovery rates that protect your month." description="Outcomes from agencies running Boost Profits in beta. Updated as we collect more data.">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="card-premium p-6 lg:col-span-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-eyebrow">On-time payment rate</p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight">58% → 86%</p>
              <p className="text-sm text-muted-foreground">Average improvement after 60 days</p>
            </div>
            <span className="rounded-full bg-success/12 px-2.5 py-1 text-xs font-semibold text-success">+28 pts</span>
          </div>
          <div className="mt-6 flex h-44 items-end gap-2">
            {data.map((h, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary-glow shadow-[0_-2px_12px_-4px_color-mix(in_oklab,var(--primary)_60%,transparent)] transition-all duration-700"
                  style={{ height: `${Math.max(h, 6)}%`, minHeight: 8 }}
                />
                <span className="text-[10px] font-medium text-muted-foreground">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 lg:col-span-2">
          {[
            { v: <><AnimatedCounter value={48.2} decimals={1} prefix="$" duration={1800} />k</>, l: "Average recovered per agency / quarter" },
            { v: <><AnimatedCounter value={6.5} decimals={1} duration={1800} /> hrs</>, l: "Saved per week on payment chasing" },
            { v: <>−<AnimatedCounter value={61} duration={1800} />%</>, l: "Reduction in 30-day overdue invoices" },
          ].map((s, i) => (
            <div key={i} className="card-premium p-5">
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
  const items = [
    {
      q: "Within the first month our overdue queue dropped by more than half. Reminders go out without me thinking about it, and the milestone view finally made revenue predictable.",
      r: "Agency Founder",
      co: "9-person brand studio · Berlin",
      metric: "−58% overdue invoices",
    },
    {
      q: "Milestone billing finally feels predictable. Clients see exactly what they're paying for, and we stopped writing 'gentle nudge' emails entirely.",
      r: "Operations Lead",
      co: "Web development agency · Toronto",
      metric: "+24% on-time rate",
    },
    {
      q: "We replaced three spreadsheets and a Slack channel with one dashboard. Onboarding the team took an afternoon. The audit trail saved us during a contract dispute.",
      r: "Finance Manager",
      co: "Multi-team service business · London",
      metric: "6 hrs / week saved",
    },
  ];

  return (
    <div className="mt-12">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-eyebrow">What founders are saying</p>
          <h3 className="mt-2 text-h3">Real teams. Verified outcomes.</h3>
        </div>
        <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
          <BadgeCheck className="h-4 w-4 text-success" />
          <span>Anonymized at customer request</span>
        </div>
      </div>

      <Stagger className="grid gap-5 md:grid-cols-3" step={120}>
        {items.map((t) => (
          <figure key={t.r} className="card-premium lift p-6 h-full">
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5" style={{ color: "var(--primary-glow)" }}>
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">{t.metric}</span>
            </div>
            <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground">"{t.q}"</blockquote>
            <figcaption className="mt-5 border-t border-border pt-4 text-xs">
              <span className="block font-semibold text-foreground">{t.r}</span>
              <span className="text-muted-foreground">{t.co}</span>
            </figcaption>
          </figure>
        ))}
      </Stagger>
    </div>
  );
}

/* ─────────────────────────  LEAD MAGNET  ───────────────────────── */

function LeadMagnet() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[var(--primary)]/5 via-background to-[var(--primary-glow)]/5 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <span className="text-eyebrow">Free · No signup required</span>
              <h2 className="mt-3 text-h2">Get your free Revenue Leak Audit.</h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                A 12-point checklist most agencies fail. Find out exactly where your billing process is leaking money — and how to plug it in under a week.
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {[
                  "Spot scope creep before it costs you",
                  "Tighten your reminder cadence",
                  "Benchmark your DSO vs. industry",
                  "Find your highest-leverage fix",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 bg-cta px-6 text-primary-foreground shadow-elegant">
                  <Link to="/contact">Get the free audit <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6">
                  <Link to="/signup">Or start the free trial</Link>
                </Button>
              </div>
            </div>
            <div className="card-premium p-6">
              <div className="flex items-center justify-between">
                <span className="text-eyebrow">Sample finding</span>
                <Receipt className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-3 text-sm font-semibold">Your average DSO is 38 days.</p>
              <p className="mt-1 text-xs text-muted-foreground">Industry benchmark is 22. Closing this gap on $40k/mo billings frees up roughly <span className="font-semibold text-foreground">$21k</span> in working capital.</p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-glow)]" style={{ width: "62%" }} />
              </div>
              <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">Recovery potential · 62%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  TRUST  ───────────────────────── */

function Trust() {
  const trust = [
    { i: Lock, t: "TLS 1.3 encryption", d: "All traffic is encrypted in transit and at rest with AES-256." },
    { i: ShieldCheck, t: "Role-based access", d: "Granular permissions with full admin audit logging." },
    { i: BadgeCheck, t: "GDPR aligned", d: "Export or permanently delete your data anytime — no questions asked." },
    { i: Receipt, t: "Immutable audit trail", d: "Every change to invoices and milestones is signed and recorded." },
    { i: Cloud, t: "Daily encrypted backups", d: "Point-in-time recovery so your billing data is never lost." },
    { i: Zap, t: "Bot & abuse protection", d: "Cloudflare Turnstile guards every public form against credential stuffing." },
  ];
  const badges = ["GDPR aligned", "SOC 2 (in progress)", "TLS 1.3", "AES-256 at rest", "PCI-ready exports"];
  return (
    <Section eyebrow="Trust & security" title="Built to be trusted with money." description="Boost Profits handles invoices and client data with the seriousness it deserves.">
      <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" step={70}>
        {trust.map((t) => (
          <div
            key={t.t}
            className="group relative card-premium lift overflow-hidden p-6 h-full"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[var(--primary-glow)]/15 to-transparent transition-transform duration-500 group-hover:scale-125" />
            <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-glow)] text-primary-foreground shadow-elegant">
              <t.i className="h-5 w-5" />
            </span>
            <h3 className="relative mt-5 text-base font-bold">{t.t}</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">{t.d}</p>
          </div>
        ))}
      </Stagger>
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

/* ─────────────────────────  PRICING  ───────────────────────── */

export function PricingTable({ compact = false }: { compact?: boolean }) {
  const { openCheckout, loading } = usePricingCheckout();
  const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");
  const tiers = [
    { name: "Starter", monthlyId: "starter_monthly", yearlyId: "starter_yearly", monthly: 39, yearly: 390, best: "Solo consultants & freelancers", features: ["Up to 25 invoices / mo", "10 active clients", "Automated reminders", "Basic analytics", "Email support"], cta: "Start 14-day trial", featured: false },
    { name: "Pro", monthlyId: "pro_monthly", yearlyId: "pro_yearly", monthly: 79, yearly: 790, best: "Growing agencies & studios — most pick this", features: ["Up to 200 invoices / mo", "Unlimited clients", "Milestone automation", "Google Sheets sync", "Source & UTM tracking", "Branded client portal", "Priority email support"], cta: "Start 14-day trial", featured: true },
    { name: "Business", monthlyId: "business_monthly", yearlyId: "business_yearly", monthly: 149, yearly: 1490, best: "Multi-team service businesses", features: ["Unlimited invoices", "Admin panel & roles", "Audit logs & exports", "Custom workflows", "Dedicated success manager", "SSO (on request)"], cta: "Start 14-day trial", featured: false },
  ];
  return (
    <div>
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-lg border border-border bg-background p-1">
          <button onClick={() => setCycle("monthly")} className={`px-4 py-1.5 rounded-md text-sm font-semibold ${cycle === "monthly" ? "bg-cta text-primary-foreground" : "text-muted-foreground"}`}>Monthly</button>
          <button onClick={() => setCycle("yearly")} className={`px-4 py-1.5 rounded-md text-sm font-semibold ${cycle === "yearly" ? "bg-cta text-primary-foreground" : "text-muted-foreground"}`}>
            Yearly <span className="ml-1 rounded-full bg-success/15 px-1.5 py-0.5 text-[10px] font-bold text-success">2 months free</span>
          </button>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {tiers.map((t) => {
          const priceId = cycle === "monthly" ? t.monthlyId : t.yearlyId;
          const displayPrice = cycle === "monthly" ? t.monthly : Math.round(t.yearly / 12);
          return (
            <div key={t.name} className={`relative card-premium p-7 ${t.featured ? "border-primary/40 shadow-glow md:-translate-y-2" : ""}`}>
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cta px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-elegant">Most popular</span>
              )}
              <p className="text-eyebrow">{t.name}</p>
              <div className="mt-3 flex items-end gap-1.5">
                <span className="text-5xl font-extrabold tracking-tight">${displayPrice}</span>
                <span className="mb-1.5 text-sm text-muted-foreground">/month</span>
              </div>
              {cycle === "yearly" ? (
                <p className="mt-1 text-xs font-semibold text-success">Billed ${t.yearly}/year — save ${t.monthly * 12 - t.yearly}</p>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">or save ${t.monthly * 12 - t.yearly}/yr on annual</p>
              )}
              <p className="mt-3 text-sm text-muted-foreground">{t.best}</p>
              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => openCheckout(priceId)}
                disabled={loading}
                className={`mt-7 h-11 w-full ${t.featured ? "bg-cta text-primary-foreground" : ""}`}
                variant={t.featured ? "default" : "outline"}
              >
                {t.cta}
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">14 days free · No card · Cancel anytime</p>
            </div>
          );
        })}
        {!compact && null}
      </div>
    </div>
  );
}

function usePricingCheckout() {
  const navigate = useNavigate();
  const { openCheckout: open, loading } = usePaddleCheckout();
  const openCheckout = async (priceId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate({ to: "/signup" }); return; }
    await open({
      priceId,
      customerEmail: session.user.email,
      customData: { userId: session.user.id },
      successUrl: `${window.location.origin}/app?checkout=success`,
    });
  };
  return { openCheckout, loading };
}

function Pricing({ compact }: { compact?: boolean }) {
  return (
    <Section eyebrow="Pricing" title="Simple plans. Real guarantees." description="Start free for 14 days. Cancel anytime. If we don't recover your trial cost in 30 days, we'll refund you in full.">
      <PricingTable compact={compact} />
      <div className="mt-8 flex justify-center">
        <Button variant="ghost" asChild>
          <Link to="/pricing">Compare full plans <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>
    </Section>
  );
}

/* ─────────────────────────  FAQ  ───────────────────────── */

export const FAQ_ITEMS = [
  { q: "How quickly can I get set up?", a: "Most teams are sending their first automated invoice within 15 minutes. No technical setup required." },
  { q: "Is there really no credit card required?", a: "Correct. Start the 14-day trial with just an email. We'll only ask for billing details when you decide to continue." },
  { q: "What's the guarantee?", a: "If Boost Profits doesn't recover at least your subscription cost within the first 30 days, we'll refund you in full — no friction." },
  { q: "Can I cancel anytime?", a: "Yes. One click in Settings → Billing. No long-term contracts, no cancellation fees." },
  { q: "Is my data secure?", a: "All traffic is TLS 1.3 encrypted, data is AES-256 at rest, access is role-based with full audit logging. SOC 2 in progress." },
  { q: "Does it work for agencies?", a: "It's built specifically for them — design studios, web dev shops, consultancies and any service business doing milestone billing." },
  { q: "Can I connect Google Sheets and Stripe?", a: "Yes. Lead, invoice and payment data sync to a Sheet of your choice on Pro and above. Stripe and bank-ready exports are included." },
  { q: "Will my clients know they're being chased by software?", a: "No. Reminders are branded as you, sent from your domain, with language you approve. They feel like a thoughtful nudge, not a robot." },
  { q: "Does it support milestone billing?", a: "Yes — that's the core. Define milestones per project with amounts, due dates and approvals. Invoices fire automatically on approval." },
  { q: "Can I customize the reminder cadence?", a: "On Pro and Business, fully customize timing, tone, channels and approval steps." },
];

function FAQ() {
  return (
    <Section tone="muted" eyebrow="FAQ" title="Answers to the things buyers ask first.">
      <div className="grid gap-4 md:grid-cols-2">
        {FAQ_ITEMS.slice(0, 8).map((f) => (
          <details key={f.q} className="group card-premium p-5 open:shadow-elegant">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
              {f.q}
              <span className="ml-3 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform group-open:rotate-45">
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

/* ─────────────────────────  FINAL CTA  ───────────────────────── */

function FinalCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <div className="absolute inset-0 bg-hero opacity-40" />
          <div className="relative grid gap-10 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/85">
                <ShieldCheck className="h-3 w-3" /> Risk-free · Money-back guarantee
              </span>
              <h2 className="mt-4 text-h2">Stop chasing. Start collecting.</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">
                Set up milestones once and let Boost Profits do the follow-up. If we don't recover your subscription cost in 30 days, we'll refund you in full.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 bg-background px-6 text-foreground hover:bg-background/90">
                  <Link to="/signup">Start Free Trial – No Card Needed <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 border-primary-foreground/30 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/contact">Book a demo</Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-primary-foreground/70">14-day free trial · No credit card · Cancel anytime · 30-day money-back</p>
            </div>
            <div className="md:col-span-2">
              <div className="card-premium bg-background/95 p-6 text-foreground shadow-elegant">
                <div className="flex items-center justify-between">
                  <p className="text-eyebrow">Your first month, projected</p>
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <p className="mt-2 text-3xl font-extrabold tracking-tight">+$3,840 recovered</p>
                <p className="mt-1 text-sm text-muted-foreground">Based on average beta agency results</p>
                <div className="mt-5 flex h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-success" style={{ width: "93%" }} />
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">93% of invoices collected on time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
