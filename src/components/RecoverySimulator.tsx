import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Bell, CalendarClock, Clock, FileText, Info, Lock, ShieldCheck, Sparkles, TrendingUp, Wallet, Workflow } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

/* Animated counter */
function useCountUp(value: number, duration = 800) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    startRef.current = null;
    let raf = 0;
    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return display;
}

const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

export function RecoverySimulator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [volume, setVolume] = useState(24);          // invoices / month
  const [avgValue, setAvgValue] = useState(1800);    // avg invoice $
  const [latePct, setLatePct] = useState(38);        // % late
  const [daysLate, setDaysLate] = useState(18);      // avg days late
  const [reminders, setReminders] = useState(true);
  const [milestones, setMilestones] = useState(true);
  const [scope, setScope] = useState(false);

  const result = useMemo(() => {
    const monthlyBilled = volume * avgValue;
    const lateAmount = monthlyBilled * (latePct / 100);
    // base recovery from automation lifts
    let lift = 0;
    if (reminders) lift += 0.34;
    if (milestones) lift += 0.22;
    if (scope) lift += 0.11;
    lift = Math.min(lift, 0.72);
    const recovered = lateAmount * lift;
    const overdueReductionPct = Math.round(lift * 100 * 0.78);
    const hoursSaved = Math.round(volume * (reminders ? 0.55 : 0.18) + (milestones ? 4 : 0));
    const newDaysLate = Math.max(2, Math.round(daysLate * (1 - lift * 0.7)));
    const annualRecovery = recovered * 12;
    return { monthlyBilled, lateAmount, recovered, overdueReductionPct, hoursSaved, newDaysLate, annualRecovery };
  }, [volume, avgValue, latePct, daysLate, reminders, milestones, scope]);

  const recoveredAnim = useCountUp(result.recovered);
  const annualAnim = useCountUp(result.annualRecovery);
  const reduceAnim = useCountUp(result.overdueReductionPct);
  const hoursAnim = useCountUp(result.hoursSaved);

  // Build 12-month series: current vs improved
  const months = 12;
  const series = useMemo(() => {
    const current: number[] = [];
    const improved: number[] = [];
    for (let i = 0; i < months; i++) {
      const seasonal = 1 + Math.sin((i / months) * Math.PI * 2) * 0.06;
      const baseLate = result.lateAmount * seasonal;
      current.push(baseLate);
      // improved: late shrinks, recovered piles up cumulatively
      const monthRecover = result.recovered * seasonal;
      improved.push(Math.max(0, baseLate - monthRecover));
    }
    return { current, improved };
  }, [result.lateAmount, result.recovered]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border/60 bg-[oklch(0.97_0.012_252)]">
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-[oklch(0.62_0.13_250/0.18)] blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[480px] w-[480px] rounded-full bg-[oklch(0.36_0.09_260/0.18)] blur-3xl" />
      </div>

      <div className="container-page relative py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Revenue recovery simulator
          </span>
          <h2 className="text-h2 mt-5">Simulate your <span className="gradient-text">revenue recovery</span></h2>
          <p className="mt-4 text-base text-muted-foreground">
            Estimate how much cash your agency could recover by automating milestone billing,
            reminders and payment follow-up.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* LEFT — INPUTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="card-premium p-6 md:p-8 lg:col-span-5"
          >
            <p className="text-eyebrow">Your workflow</p>
            <div className="mt-5 space-y-6">
              <SliderRow label="Monthly invoices" value={volume} suffix=" / mo" min={4} max={120} step={1} onChange={setVolume} />
              <SliderRow label="Average invoice value" value={avgValue} prefix="$" min={250} max={12000} step={50} onChange={setAvgValue} />
              <SliderRow label="Currently paid late" value={latePct} suffix="%" min={5} max={75} step={1} onChange={setLatePct} />
              <SliderRow label="Average days late" value={daysLate} suffix=" days" min={3} max={60} step={1} onChange={setDaysLate} />
            </div>

            <div className="mt-7 space-y-3 border-t border-border/70 pt-6">
              <ToggleRow icon={Bell} label="Automated reminders" hint="Polite, on-brand cadence" checked={reminders} onChange={setReminders} />
              <ToggleRow icon={Workflow} label="Milestone billing" hint="Lock approvals before next phase" checked={milestones} onChange={setMilestones} />
              <ToggleRow icon={ShieldCheck} label="Scope creep protection" hint="Auto change-orders on new asks" checked={scope} onChange={setScope} />
            </div>

            <p className="mt-6 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Info className="h-3 w-3" /> Demo data shown — real results depend on your workflow.
            </p>
          </motion.div>

          {/* RIGHT — RESULT + CHART */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Headline result */}
            <div className="card-premium relative overflow-hidden p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-eyebrow text-primary">Potential recovered this month</p>
                  <p className="mt-2 font-sans text-[44px] leading-none font-extrabold tracking-tight tabular-nums md:text-[56px]">
                    {fmt(recoveredAnim)}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    On <span className="font-semibold text-foreground tabular-nums">{fmt(result.monthlyBilled)}</span> billed monthly.
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-success/12 px-2.5 py-1 text-xs font-semibold text-success">
                  <TrendingUp className="h-3.5 w-3.5" /> Projected
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Metric icon={FileText} label="Overdue reduced" value={`${Math.round(reduceAnim)}%`} />
                <Metric icon={Clock} label="Hours saved" value={`${Math.round(hoursAnim)} hrs`} />
                <Metric icon={Wallet} label="Annual recovery" value={fmt(annualAnim)} />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-11 bg-cta px-5 text-primary-foreground shadow-elegant">
                  <Link to="/signup">See my recovery <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 px-5">
                  <Link to="/contact">Book demo</Link>
                </Button>
              </div>
            </div>

            {/* Chart */}
            <div className="card-premium overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  <p className="text-sm font-bold tracking-tight">12-month outlook</p>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <LegendDot color="oklch(0.78 0.04 260)" label="Current" />
                  <LegendDot color="oklch(0.55 0.13 250)" label="With automation" />
                </div>
              </div>
              <RecoveryChart current={series.current} improved={series.improved} animate={inView} />
              <p className="border-t border-border px-5 py-3 text-center text-xs text-muted-foreground">
                See the difference automation can make.
              </p>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-lg border border-border/70 bg-background/60 px-4 py-3 text-[11px] font-medium text-muted-foreground backdrop-blur">
              <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3" /> Secure</span>
              <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-3 w-3" /> Built for agencies</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3 w-3" /> Privacy-safe</span>
              <span>No credit card required</span>
              <span>Easy to set up</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SliderRow({
  label, value, min, max, step, onChange, prefix = "", suffix = "",
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; prefix?: string; suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-foreground/90">{label}</label>
        <span className="text-sm font-bold tabular-nums text-primary">
          {prefix}{value.toLocaleString()}{suffix}
        </span>
      </div>
      <Slider
        className="mt-3"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  );
}

function ToggleRow({
  icon: Icon, label, hint, checked, onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; hint: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-background/60 px-3 py-2.5 transition hover:bg-[oklch(0.55_0.13_250/0.06)]">
      <span className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/8 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-sm font-semibold">{label}</span>
          <span className="block text-[11px] text-muted-foreground">{hint}</span>
        </span>
      </span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}

function Metric({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-background/60 p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <p className="mt-1 text-base font-extrabold tabular-nums">{value}</p>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />{label}
    </span>
  );
}

function RecoveryChart({ current, improved, animate }: { current: number[]; improved: number[]; animate: boolean }) {
  const w = 640, h = 240, padX = 28, padTop = 18, padBot = 30;
  const innerH = h - padTop - padBot;
  const max = Math.max(...current, ...improved, 1);
  const n = current.length;
  const labels = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const xAt = (i: number) => padX + (i * (w - padX * 2)) / (n - 1);
  const yAt = (v: number) => padTop + innerH - (v / max) * innerH;

  // Smooth path via simple Catmull-Rom-ish curve
  const toPath = (arr: number[]) => {
    const pts = arr.map((v, i) => [xAt(i), yAt(v)] as const);
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[i + 1];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  };
  const curPath = toPath(current);
  const impPath = toPath(improved);
  const areaPath = `${impPath} L ${xAt(n - 1)} ${yAt(0)} L ${xAt(0)} ${yAt(0)} Z`;
  const gapArea = `${curPath} L ${xAt(n - 1)} ${padTop + innerH} L ${xAt(0)} ${padTop + innerH} Z`;

  // "Paid" invoice markers along improved curve where it drops noticeably
  const paidMarkers = improved
    .map((v, i) => ({ i, drop: (current[i] - v) / max }))
    .filter((m) => m.drop > 0.04 && m.i > 0);

  return (
    <div className="px-3 py-4">
      <svg viewBox={`0 0 ${w} ${h}`} className="block h-56 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.13 250 / 0.28)" />
            <stop offset="100%" stopColor="oklch(0.62 0.13 250 / 0)" />
          </linearGradient>
          <linearGradient id="rc-cur-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.03 260 / 0.22)" />
            <stop offset="100%" stopColor="oklch(0.78 0.03 260 / 0)" />
          </linearGradient>
          <linearGradient id="rc-imp-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.55 0.13 250)" />
            <stop offset="100%" stopColor="oklch(0.36 0.09 260)" />
          </linearGradient>
        </defs>

        {/* gridlines + AR axis label */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={padX} x2={w - padX} y1={padTop + innerH * g} y2={padTop + innerH * g} stroke="oklch(0.92 0.012 252)" strokeDasharray="3 4" />
        ))}
        <text x={padX} y={padTop - 6} fontSize="9" fill="oklch(0.5 0.025 258)" letterSpacing="1">OUTSTANDING A/R</text>

        {/* current (no automation) — flat dashed area */}
        <motion.path
          d={gapArea}
          fill="url(#rc-cur-area)"
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d={curPath}
          fill="none"
          stroke="oklch(0.72 0.03 260)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* improved area + line */}
        <motion.path
          d={areaPath}
          fill="url(#rc-area)"
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.path
          d={impPath}
          fill="none"
          stroke="url(#rc-imp-stroke)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* invoice "paid" markers — tiny receipt glyphs on the improved line */}
        {paidMarkers.map(({ i }, k) => {
          const x = xAt(i);
          const y = yAt(improved[i]);
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.35, delay: 0.6 + k * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <circle cx={x} cy={y} r={6} fill="oklch(0.98 0.005 252)" stroke="oklch(0.55 0.13 250)" strokeWidth={1.5} />
              <path d={`M ${x - 2.2} ${y - 0.6} L ${x - 0.4} ${y + 1.4} L ${x + 2.6} ${y - 1.8}`} stroke="oklch(0.55 0.13 250)" strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          );
        })}

        {/* x-axis labels */}
        {labels.map((l, i) => (
          <text key={i} x={xAt(i)} y={h - 12} textAnchor="middle" fontSize="10" fill="oklch(0.5 0.025 258)">{l}</text>
        ))}

        {/* end-of-line callouts */}
        <g>
          <circle cx={xAt(n - 1)} cy={yAt(current[n - 1])} r={3} fill="oklch(0.72 0.03 260)" />
          <circle cx={xAt(n - 1)} cy={yAt(improved[n - 1])} r={3.5} fill="oklch(0.36 0.09 260)" />
        </g>
      </svg>
    </div>
  );
}
