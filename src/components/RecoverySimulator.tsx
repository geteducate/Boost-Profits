import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight, BadgeCheck, Bell, CheckCircle2, Clock, FileText,
  Info, Lock, Radio, ShieldCheck, Sparkles, TrendingUp, Wallet, Workflow, Zap,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

/* Animated counter */
function useCountUp(value: number, duration = 900) {
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
const fmtCompact = (n: number) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return `$${Math.round(n)}`;
};

const CLIENTS = ["Northwind Studio", "Lumen Group", "Atrium Co", "Halo Labs", "Vertex Media", "Foxglove", "Polaris Co", "Bright & Co"];

export function RecoverySimulator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [volume, setVolume] = useState(24);
  const [avgValue, setAvgValue] = useState(1800);
  const [latePct, setLatePct] = useState(38);
  const [daysLate, setDaysLate] = useState(18);
  const [reminders, setReminders] = useState(true);
  const [milestones, setMilestones] = useState(true);
  const [scope, setScope] = useState(false);

  const result = useMemo(() => {
    const monthlyBilled = volume * avgValue;
    const lateAmount = monthlyBilled * (latePct / 100);
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
    // "score" 0-100 based on adoption + lift quality
    const score = Math.round(
      Math.min(100, lift * 100 + (reminders ? 4 : 0) + (milestones ? 4 : 0) + (scope ? 3 : 0)),
    );
    return { monthlyBilled, lateAmount, recovered, overdueReductionPct, hoursSaved, newDaysLate, annualRecovery, lift, score };
  }, [volume, avgValue, latePct, daysLate, reminders, milestones, scope]);

  const recoveredAnim = useCountUp(result.recovered);
  const annualAnim = useCountUp(result.annualRecovery);
  const reduceAnim = useCountUp(result.overdueReductionPct);
  const hoursAnim = useCountUp(result.hoursSaved);
  const scoreAnim = useCountUp(result.score, 700);

  void daysLate;

  /* Live "invoice paid" ticker */
  type Tick = { id: number; client: string; amount: number };
  const [ticks, setTicks] = useState<Tick[]>([]);
  const idRef = useRef(0);
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      const amount = Math.round(avgValue * (0.5 + Math.random() * 1.5));
      const client = CLIENTS[Math.floor(Math.random() * CLIENTS.length)];
      idRef.current += 1;
      setTicks((prev) => [{ id: idRef.current, client, amount }, ...prev].slice(0, 5));
    }, 1800);
    return () => clearInterval(interval);
  }, [inView, avgValue]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[oklch(0.14_0.04_265)] text-white">
      {/* atmospheric backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/3 h-[560px] w-[560px] rounded-full bg-[oklch(0.62_0.18_250/0.35)] blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[600px] w-[600px] rounded-full bg-[oklch(0.55_0.22_300/0.28)] blur-[140px]" />
        <div className="absolute top-1/3 left-0 h-[300px] w-[300px] rounded-full bg-[oklch(0.7_0.18_180/0.18)] blur-[100px]" />
        {/* grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="rs-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rs-grid)" />
        </svg>
      </div>

      <div className="container-page relative py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live simulation
          </span>
          <h2 className="mt-5 font-serif text-[40px] leading-[1.05] tracking-tight md:text-[56px]">
            Simulate your{" "}
            <span className="bg-gradient-to-r from-[oklch(0.85_0.14_220)] via-[oklch(0.78_0.16_270)] to-[oklch(0.78_0.18_320)] bg-clip-text text-transparent">
              revenue recovery
            </span>
          </h2>
          <p className="mt-4 text-base text-white/65">
            Drag, toggle, watch invoices clear in real time. This is the cash your agency
            is leaving on the table — and exactly how much you'd reclaim.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* LEFT — CONTROL DECK */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl md:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
                    <Workflow className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">Control deck</p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-white/40">
                  <Radio className="h-3 w-3" /> Tuned
                </span>
              </div>

              <div className="space-y-5">
                <SliderRow label="Monthly invoices" value={volume} suffix=" / mo" min={4} max={120} step={1} onChange={setVolume} />
                <SliderRow label="Average invoice value" value={avgValue} prefix="$" min={250} max={12000} step={50} onChange={setAvgValue} />
                <SliderRow label="Currently paid late" value={latePct} suffix="%" min={5} max={75} step={1} onChange={setLatePct} />
                <SliderRow label="Average days late" value={daysLate} suffix=" days" min={3} max={60} step={1} onChange={setDaysLate} />
              </div>

              <div className="mt-7 space-y-2.5 border-t border-white/10 pt-6">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">Automations</p>
                <ToggleRow icon={Bell} label="Automated reminders" hint="Polite, on-brand cadence" checked={reminders} onChange={setReminders} />
                <ToggleRow icon={Workflow} label="Milestone billing" hint="Lock approvals before next phase" checked={milestones} onChange={setMilestones} />
                <ToggleRow icon={ShieldCheck} label="Scope creep protection" hint="Auto change-orders on new asks" checked={scope} onChange={setScope} />
              </div>

              {/* Recovery score gauge */}
              <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                  <span>Recovery score</span>
                  <span className="text-white/85 tabular-nums">{Math.round(scoreAnim)} / 100</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[oklch(0.78_0.16_220)] via-[oklch(0.74_0.18_270)] to-[oklch(0.78_0.18_320)] shadow-[0_0_18px_rgba(120,160,255,0.55)]"
                    animate={{ width: `${result.score}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="mt-2 inline-flex items-center gap-1 text-[10px] text-white/45">
                  <Info className="h-2.5 w-2.5" /> Demo data — real lift varies by workflow.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — RESULT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 lg:col-span-7"
          >
            {/* Headline result */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent p-6 backdrop-blur-xl md:p-8">
              {/* glow */}
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[oklch(0.62_0.2_270/0.4)] blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">Potential recovered this month</p>
                  <div className="mt-2 flex items-end gap-3">
                    <p className="font-serif text-[56px] leading-none tracking-tight tabular-nums md:text-[76px]">
                      <AnimatedDigits value={recoveredAnim} />
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-white/60">
                    On <span className="font-semibold text-white tabular-nums">{fmt(result.monthlyBilled)}</span> billed monthly • new days-late{" "}
                    <span className="font-semibold text-white tabular-nums">{result.newDaysLate}d</span>
                  </p>
                </div>
                <span className="hidden shrink-0 sm:inline-flex items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                  <TrendingUp className="h-3.5 w-3.5" /> Projected lift {Math.round(result.lift * 100)}%
                </span>
              </div>

              <div className="relative mt-6 grid grid-cols-3 gap-3">
                <Metric icon={FileText} label="Overdue reduced" value={`${Math.round(reduceAnim)}%`} />
                <Metric icon={Clock} label="Hours saved" value={`${Math.round(hoursAnim)} hrs`} />
                <Metric icon={Wallet} label="Annual recovery" value={fmtCompact(annualAnim)} />
              </div>

              <div className="relative mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="group h-11 bg-white px-5 text-[oklch(0.18_0.04_260)] shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] hover:bg-white/95">
                  <Link to="/signup">
                    Lock in my recovery
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 border-white/20 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/contact">Book demo</Link>
                </Button>
              </div>
            </div>

            {/* Quest board + ticker */}
            <div className="grid gap-5 md:grid-cols-5">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl md:col-span-3">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-white/70" />
                    <p className="text-sm font-semibold tracking-tight">Payoff Quest · Live</p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <LegendDot color="oklch(0.78 0.16 250)" label="Token" />
                    <LegendDot color="oklch(0.82 0.18 145)" label="Cleared" />
                  </div>
                </div>
                <PayoffQuest lift={result.lift} avgValue={avgValue} active={inView} />
              </div>

              {/* Live paid feed */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl md:col-span-2">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-300" />
                    <p className="text-sm font-semibold">Live paid feed</p>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">Streaming</span>
                </div>
                <ul className="relative h-[210px] overflow-hidden px-2 py-2">
                  <AnimatePresence initial={false}>
                    {ticks.map((t) => (
                      <motion.li
                        key={t.id}
                        layout
                        initial={{ opacity: 0, y: -10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="mx-1 my-1 flex items-center justify-between rounded-lg border border-white/5 bg-gradient-to-r from-white/[0.06] to-transparent px-3 py-2"
                      >
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                          <span>
                            <span className="block text-[12px] font-semibold leading-tight">{t.client}</span>
                            <span className="block text-[10px] text-white/45">Invoice cleared</span>
                          </span>
                        </span>
                        <span className="font-serif text-[15px] font-semibold tabular-nums text-emerald-200">
                          +{fmt(t.amount)}
                        </span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                  {ticks.length === 0 && (
                    <li className="mx-1 my-1 flex items-center gap-2 rounded-lg border border-dashed border-white/10 px-3 py-2 text-[12px] text-white/40">
                      <Radio className="h-3.5 w-3.5" /> Listening for paid invoices…
                    </li>
                  )}
                  {/* fade bottom */}
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[oklch(0.14_0.04_265)] to-transparent" />
                </ul>
              </div>
            </div>

            {/* trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] font-medium text-white/55 backdrop-blur">
              <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3" /> SOC2-aligned</span>
              <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-3 w-3" /> Built for agencies</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3 w-3" /> Privacy-safe</span>
              <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> No credit card</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AnimatedDigits({ value }: { value: number }) {
  return <>{fmt(value)}</>;
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
        <label className="text-[12px] font-medium uppercase tracking-wider text-white/60">{label}</label>
        <span className="font-serif text-[18px] font-semibold tabular-nums text-white">
          {prefix}{value.toLocaleString()}<span className="text-white/40">{suffix}</span>
        </span>
      </div>
      <Slider
        className="mt-3 [&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-[oklch(0.78_0.14_220)] [&_[data-slot=slider-range]]:to-[oklch(0.78_0.18_300)] [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-[0_0_0_4px_rgba(255,255,255,0.12)]"
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
    <label
      className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2.5 transition ${
        checked
          ? "border-white/20 bg-gradient-to-r from-white/[0.08] to-white/[0.02] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
          : "border-white/8 bg-white/[0.02] hover:bg-white/[0.04]"
      }`}
    >
      <span className="flex items-center gap-3">
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition ${checked ? "bg-white/15 text-white shadow-[0_0_18px_rgba(160,180,255,0.4)]" : "bg-white/5 text-white/60"}`}>
          <Icon className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-[13px] font-semibold">{label}</span>
          <span className="block text-[11px] text-white/45">{hint}</span>
        </span>
      </span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}

function Metric({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3 backdrop-blur">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <p className="mt-1 font-serif text-[22px] font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-white/55">
      <span className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />{label}
    </span>
  );
}

/* ============================================================
   RecoveryArena — game-like "Invoice Race"
   ============================================================ */
type Chip = {
  id: number;
  client: string;
  amount: number;
  lane: number;       // 0..lanes-1
  progress: number;   // 0..1
  status: "running" | "stuck" | "paid";
  speed: number;
  born: number;
};

function RecoveryArena({ lift, avgValue, active }: { lift: number; avgValue: number; active: boolean }) {
  const lanes = 5;
  const [chips, setChips] = useState<Chip[]>([]);
  const [hud, setHud] = useState({ paid: 0, stuck: 0, recovered: 0, combo: 0 });
  const idRef = useRef(1000);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(performance.now());

  // spawn chips
  useEffect(() => {
    if (!active) return;
    let alive = true;
    const spawn = () => {
      if (!alive) return;
      idRef.current += 1;
      const willPay = Math.random() < 0.35 + lift * 0.6; // higher lift => more paid
      const amount = Math.round(avgValue * (0.4 + Math.random() * 1.6));
      const chip: Chip = {
        id: idRef.current,
        client: CLIENTS[Math.floor(Math.random() * CLIENTS.length)],
        amount,
        lane: Math.floor(Math.random() * lanes),
        progress: 0,
        status: willPay ? "running" : "running",
        speed: 0.18 + Math.random() * 0.12 + lift * 0.18,
        born: performance.now(),
      };
      // pre-decide if it'll get stuck
      (chip as Chip & { _willStick: boolean })._willStick = !willPay;
      setChips((prev) => [...prev.slice(-14), chip]);
      setTimeout(spawn, 480 + Math.random() * 380);
    };
    spawn();
    return () => {
      alive = false;
    };
  }, [active, lift, avgValue]);

  // animation loop
  useEffect(() => {
    if (!active) return;
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - lastRef.current) / 1000);
      lastRef.current = t;
      setChips((prev) => {
        const next: Chip[] = [];
        let paidAdd = 0;
        let stuckAdd = 0;
        let recoveredAdd = 0;
        for (const c of prev) {
          if (c.status === "paid" || c.status === "stuck") {
            // keep visible briefly then drop
            if (t - c.born < 4200) next.push(c);
            continue;
          }
          let p = c.progress + c.speed * dt;
          const willStick = (c as Chip & { _willStick?: boolean })._willStick;
          if (willStick && p > 0.55) {
            next.push({ ...c, progress: 0.58, status: "stuck", born: t });
            stuckAdd += 1;
            continue;
          }
          if (p >= 1) {
            next.push({ ...c, progress: 1, status: "paid", born: t });
            paidAdd += 1;
            recoveredAdd += c.amount;
            continue;
          }
          next.push({ ...c, progress: p });
        }
        if (paidAdd || stuckAdd) {
          setHud((h) => ({
            paid: h.paid + paidAdd,
            stuck: h.stuck + stuckAdd,
            recovered: h.recovered + recoveredAdd,
            combo: paidAdd ? h.combo + paidAdd : 0,
          }));
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  const laneH = 30;
  const laneArr = Array.from({ length: lanes });

  return (
    <div className="relative px-4 pb-4 pt-3">
      {/* HUD */}
      <div className="mb-3 grid grid-cols-3 gap-2">
        <HudStat label="Paid" value={hud.paid.toString()} tone="paid" />
        <HudStat label="Recovered" value={fmtCompact(hud.recovered)} tone="paid" />
        <HudStat label="Combo" value={`x${hud.combo}`} tone={hud.combo >= 3 ? "fire" : "muted"} />
      </div>

      <div
        className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-black/40 to-black/10"
        style={{ height: laneH * lanes + 24 }}
      >
        {/* Late zone */}
        <div className="pointer-events-none absolute inset-y-0 left-[55%] right-[18%] bg-[oklch(0.55_0.22_25/0.12)]">
          <div className="absolute inset-0 [background:repeating-linear-gradient(45deg,rgba(255,255,255,0.04)_0_6px,transparent_6px_12px)]" />
          <span className="absolute left-2 top-1 text-[9px] font-bold uppercase tracking-[0.2em] text-rose-200/70">
            Late zone
          </span>
        </div>
        {/* Goal */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-[oklch(0.78_0.16_250/0.25)] to-transparent">
          <span className="absolute right-2 top-1 text-[9px] font-bold uppercase tracking-[0.2em] text-sky-200/80">
            Paid ✓
          </span>
        </div>

        {/* lanes */}
        {laneArr.map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 border-t border-dashed border-white/[0.06]"
            style={{ top: 12 + i * laneH + laneH }}
          />
        ))}

        {/* chips */}
        {chips.map((c) => {
          const top = 12 + c.lane * laneH + 4;
          const left = `calc(${c.progress * 100}% - 50px)`;
          const isStuck = c.status === "stuck";
          const isPaid = c.status === "paid";
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: 1,
                scale: isPaid ? 1.08 : 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`absolute flex h-[22px] items-center gap-1 rounded-full px-2 text-[10px] font-semibold tabular-nums shadow-md ring-1 backdrop-blur ${
                isPaid
                  ? "bg-emerald-400/90 text-emerald-950 ring-emerald-200/60 shadow-[0_0_14px_rgba(80,255,180,0.55)]"
                  : isStuck
                    ? "bg-rose-500/85 text-white ring-rose-200/40 animate-pulse"
                    : "bg-white/90 text-[oklch(0.18_0.04_265)] ring-white/40"
              }`}
              style={{ top, left, width: 100 }}
            >
              <span className="truncate">{c.client.split(" ")[0]}</span>
              <span className="ml-auto">{fmtCompact(c.amount)}</span>
              {isPaid && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.6, 0] }}
                  transition={{ duration: 0.7 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-emerald-200"
                  aria-hidden
                >
                  +{fmtCompact(c.amount)}
                </motion.span>
              )}
            </motion.div>
          );
        })}

        {/* finish line */}
        <div className="pointer-events-none absolute bottom-0 right-[18%] top-0 w-px bg-gradient-to-b from-transparent via-sky-300/60 to-transparent" />
      </div>

      <p className="mt-2 text-[10px] text-white/40">
        Higher Recovery score = more invoices break through the late zone.
      </p>
    </div>
  );
}

function HudStat({ label, value, tone }: { label: string; value: string; tone: "paid" | "stuck" | "fire" | "muted" }) {
  const colors = {
    paid: "text-emerald-200 border-emerald-300/20 bg-emerald-400/5",
    stuck: "text-rose-200 border-rose-300/20 bg-rose-400/5",
    fire: "text-amber-200 border-amber-300/30 bg-amber-400/10 shadow-[0_0_18px_rgba(255,200,80,0.25)]",
    muted: "text-white/70 border-white/10 bg-white/[0.03]",
  }[tone];
  return (
    <div className={`flex items-center justify-between rounded-lg border px-3 py-1.5 ${colors}`}>
      <span className="text-[9px] font-bold uppercase tracking-[0.18em] opacity-80">{label}</span>
      <span className="font-serif text-[15px] font-semibold tabular-nums">{value}</span>
    </div>
  );
}

