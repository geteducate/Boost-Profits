import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  CheckCircle2,
  Layers,
  Lock,
  Sparkles,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

/* ---------- helpers ---------- */
function fmtMoney(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
function fmtNum(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

function useCountUp(value: number, duration = 700) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;
    let raf = 0;
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(fromRef.current + (value - fromRef.current) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return display;
}

/* ---------- main ---------- */
export function RevenueSimulator() {
  // inputs
  const [volume, setVolume] = useState(40); // invoices / month
  const [avgValue, setAvgValue] = useState(2200); // $ / invoice
  const [latePct, setLatePct] = useState(38); // % of invoices that go late
  const [daysLate, setDaysLate] = useState(18); // average days late
  const [reminders, setReminders] = useState(true);
  const [milestones, setMilestones] = useState(true);
  const [scopeGuard, setScopeGuard] = useState(false);

  // model — believable, conservative recovery model for an early-stage tool
  const result = useMemo(() => {
    const monthlyBilled = volume * avgValue;
    const lateInvoices = volume * (latePct / 100);
    const latePool = lateInvoices * avgValue;

    // base recovery effectiveness from automation toggles
    let recoveryRate = 0.08; // baseline (just visibility)
    if (reminders) recoveryRate += 0.22;
    if (milestones) recoveryRate += 0.18;
    if (scopeGuard) recoveryRate += 0.07;
    // amplified slightly by how late things are (more upside if worse)
    recoveryRate *= 1 + Math.min(0.35, daysLate / 80);

    const recovered = latePool * recoveryRate;
    const overdueReduction = Math.min(72, recoveryRate * 100); // capped %
    const hoursSaved =
      (reminders ? 8 : 0) +
      (milestones ? 6 : 0) +
      (scopeGuard ? 3 : 0) +
      Math.min(8, lateInvoices * 0.25);
    const annual = recovered * 12;

    return {
      monthlyBilled,
      recovered,
      overdueReduction,
      hoursSaved,
      annual,
      recoveryRate,
    };
  }, [volume, avgValue, latePct, daysLate, reminders, milestones, scopeGuard]);

  // animated numbers
  const aRecovered = useCountUp(result.recovered);
  const aOverdue = useCountUp(result.overdueReduction);
  const aHours = useCountUp(result.hoursSaved);
  const aAnnual = useCountUp(result.annual);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* premium ambient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,oklch(0.93_0.025_252/0.5),transparent)]" />
        <div className="absolute -top-32 right-1/4 h-[420px] w-[640px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.62_0.13_250/0.18),transparent_60%)] blur-3xl" />
      </div>

      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-eyebrow mb-4 inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[var(--primary-glow)]" />
            Revenue recovery simulator
          </p>
          <h2 className="text-h2">Simulate your revenue recovery.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Estimate how much money your agency could recover by automating milestone billing, reminders, and payment follow-up.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* LEFT — controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="lg:col-span-7"
          >
            <div className="card-premium p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <SliderField
                  label="Monthly invoice volume"
                  hint="How many invoices you send per month"
                  value={volume}
                  onChange={setVolume}
                  min={5}
                  max={250}
                  step={1}
                  format={(v) => `${v} invoices`}
                />
                <SliderField
                  label="Average invoice value"
                  hint="Typical invoice size"
                  value={avgValue}
                  onChange={setAvgValue}
                  min={250}
                  max={15000}
                  step={50}
                  format={(v) => fmtMoney(v)}
                />
                <SliderField
                  label="Current late payment rate"
                  hint="Share of invoices paid past due"
                  value={latePct}
                  onChange={setLatePct}
                  min={0}
                  max={80}
                  step={1}
                  format={(v) => `${v}%`}
                />
                <SliderField
                  label="Average days late"
                  hint="How far past due, on average"
                  value={daysLate}
                  onChange={setDaysLate}
                  min={0}
                  max={60}
                  step={1}
                  format={(v) => `${v} days`}
                />
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <ToggleCard
                  icon={Bell}
                  label="Automated reminders"
                  desc="Polite, branded follow-up cadence"
                  checked={reminders}
                  onChange={setReminders}
                />
                <ToggleCard
                  icon={Layers}
                  label="Milestone billing"
                  desc="Invoice on every approved phase"
                  checked={milestones}
                  onChange={setMilestones}
                />
                <ToggleCard
                  icon={Workflow}
                  label="Scope creep protection"
                  desc="Lock approvals, capture extras"
                  checked={scopeGuard}
                  onChange={setScopeGuard}
                />
              </div>

              {/* summary */}
              <div className="mt-7 rounded-xl border border-border/70 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-soft)] p-6 text-primary-foreground shadow-elegant">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/70">
                      Potential recovered revenue this month
                    </p>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl tabular-nums">
                      {fmtMoney(aRecovered)}
                    </p>
                  </div>
                  <span className="hidden rounded-full bg-primary-foreground/12 px-2.5 py-1 text-[11px] font-semibold sm:inline-flex sm:items-center sm:gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5" /> Live estimate
                  </span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <Stat label="Overdue reduced" value={`${fmtNum(aOverdue)}%`} />
                  <Stat label="Hours saved / mo" value={`${fmtNum(aHours)} hrs`} />
                  <Stat label="Projected annual" value={fmtMoney(aAnnual)} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-12 bg-cta px-6 text-primary-foreground shadow-elegant hover:opacity-95">
                  <Link to="/signup">
                    See my recovery <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6">
                  <Link to="/contact">Book demo</Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Demo data shown — real results depend on your workflow.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="lg:col-span-5"
          >
            <RecoveryChart recoveryRate={result.recoveryRate} avgValue={avgValue} volume={volume} latePct={latePct} />
          </motion.div>
        </div>

        {/* trust strip */}
        <div className="mt-10 rounded-xl border border-border/70 bg-background/60 px-6 py-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
            <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-[var(--primary-glow)]" /> Secure</span>
            <span className="hidden h-3 w-px bg-border md:block" />
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5 text-success" /> Built for agencies</span>
            <span className="hidden h-3 w-px bg-border md:block" />
            <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-[var(--primary-glow)]" /> Easy to set up</span>
            <span className="hidden h-3 w-px bg-border md:block" />
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> No credit card</span>
            <span className="hidden h-3 w-px bg-border md:block" />
            <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-[var(--primary-glow)]" /> Privacy-safe</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-primary-foreground/8 px-4 py-3 ring-1 ring-primary-foreground/10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/65">{label}</p>
      <p className="mt-1 text-xl font-extrabold tracking-tight tabular-nums">{value}</p>
    </div>
  );
}

function SliderField({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/70 p-4 transition-all duration-300 hover:border-[var(--primary-glow)]/40 hover:bg-background hover:shadow-elegant">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">{label}</p>
        <p className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-bold tabular-nums">
          {format(value)}
        </p>
      </div>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
      <Slider
        className="mt-3"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? min)}
      />
    </div>
  );
}

function ToggleCard({
  icon: Icon,
  label,
  desc,
  checked,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`group flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all duration-300 ${
        checked
          ? "border-[var(--primary-glow)]/50 bg-gradient-to-br from-[var(--primary-glow)]/10 to-transparent shadow-elegant"
          : "border-border/70 bg-background/70 hover:border-[var(--primary-glow)]/30 hover:bg-background"
      }`}
    >
      <span
        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
          checked ? "bg-gradient-to-br from-[var(--primary)] to-[var(--primary-glow)] text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold">{label}</p>
          <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
        </div>
        <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </button>
  );
}

/* ---------- chart ---------- */
function RecoveryChart({
  recoveryRate,
  avgValue,
  volume,
  latePct,
}: {
  recoveryRate: number;
  avgValue: number;
  volume: number;
  latePct: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // monthly synthetic series — current vs improved
  const months = ["M1", "M2", "M3", "M4", "M5", "M6"];
  const monthlyLatePool = volume * avgValue * (latePct / 100);

  // current workflow recovers ~8% baseline; improved uses computed rate
  const current = months.map((_, i) => Math.round(monthlyLatePool * 0.08 * (1 + i * 0.04)));
  const improved = months.map((_, i) =>
    Math.round(monthlyLatePool * recoveryRate * (1 + i * 0.07)),
  );
  const max = Math.max(...current, ...improved, 1);

  const W = 520;
  const H = 240;
  const PAD_L = 40;
  const PAD_R = 16;
  const PAD_T = 24;
  const PAD_B = 36;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const xFor = (i: number) => PAD_L + (i * innerW) / (months.length - 1);
  const yFor = (v: number) => PAD_T + innerH - (v / max) * innerH;

  const toPath = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`).join(" ");
  const toArea = (arr: number[]) =>
    `${toPath(arr)} L ${xFor(arr.length - 1)} ${PAD_T + innerH} L ${PAD_L} ${PAD_T + innerH} Z`;

  return (
    <div className="card-premium h-full p-6 md:p-7" ref={ref}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-eyebrow">Recovery curve</p>
          <p className="mt-1 text-base font-bold">Current vs automated workflow</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-[11px] font-semibold">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/50" /> Current
          </span>
          <span className="inline-flex items-center gap-1.5 text-foreground">
            <span className="h-2 w-2 rounded-full bg-[var(--primary-glow)]" /> With automation
          </span>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-background to-muted/40 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Recovery comparison chart">
          <defs>
            <linearGradient id="recArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--primary-glow)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--primary-glow)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="recLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--primary-glow)" />
            </linearGradient>
          </defs>

          {/* grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((p) => (
            <line
              key={p}
              x1={PAD_L}
              x2={W - PAD_R}
              y1={PAD_T + innerH * p}
              y2={PAD_T + innerH * p}
              stroke="currentColor"
              className="text-border"
              strokeDasharray="3 4"
              strokeWidth="1"
            />
          ))}

          {/* current (dashed) */}
          <motion.path
            d={toPath(current)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 5"
            className="text-muted-foreground/60"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />

          {/* improved area */}
          <motion.path
            d={toArea(improved)}
            fill="url(#recArea)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          {/* improved line */}
          <motion.path
            d={toPath(improved)}
            fill="none"
            stroke="url(#recLine)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />

          {/* points */}
          {improved.map((v, i) => (
            <motion.circle
              key={i}
              cx={xFor(i)}
              cy={yFor(v)}
              r={4}
              fill="var(--primary-glow)"
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
            />
          ))}

          {/* x labels */}
          {months.map((m, i) => (
            <text
              key={m}
              x={xFor(i)}
              y={H - 10}
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{ fontSize: 11 }}
            >
              {m}
            </text>
          ))}

          {/* y labels */}
          {[0, 0.5, 1].map((p) => (
            <text
              key={p}
              x={PAD_L - 8}
              y={PAD_T + innerH * (1 - p) + 4}
              textAnchor="end"
              className="fill-muted-foreground"
              style={{ fontSize: 10 }}
            >
              {fmtMoney(max * p).replace("$", "$")}
            </text>
          ))}
        </svg>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        See the difference automation can make.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border/70 bg-background/70 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">6-mo current</p>
          <p className="mt-1 text-base font-extrabold tabular-nums">
            {fmtMoney(current.reduce((a, b) => a + b, 0))}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--primary-glow)]/40 bg-gradient-to-br from-[var(--primary-glow)]/10 to-transparent p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">6-mo recovered</p>
          <p className="mt-1 text-base font-extrabold tabular-nums">
            {fmtMoney(improved.reduce((a, b) => a + b, 0))}
          </p>
        </div>
      </div>
    </div>
  );
}
