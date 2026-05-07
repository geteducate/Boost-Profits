import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Flame,
  Image as ImageIcon,
  Layers,
  LineChart,
  Mail,
  Megaphone,
  Palette,
  Rocket,
  Smile,
  Sparkles,
  TrendingUp,
  Vault,
  Wand2,
  Wrench,
  Zap,
} from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Size = "small" | "growing" | "established";
type Milestone = "fewBig" | "balanced" | "manySmall";
type Pain = "bleeding" | "average" | "fine";

const SIZES: { id: Size; label: string; range: string; icon: typeof Building2; mult: number }[] = [
  { id: "small", label: "Small Studio", range: "$5k–25k MRR · 1–4 people", icon: Sparkles, mult: 1 },
  { id: "growing", label: "Growing Agency", range: "$25k–80k MRR · 5–15 people", icon: Rocket, mult: 2.4 },
  { id: "established", label: "Established Firm", range: "$80k+ MRR · 16+ people", icon: Building2, mult: 5.2 },
];

const PROJECTS: { id: string; label: string; icon: typeof Code2 }[] = [
  { id: "web", label: "Web Design", icon: Palette },
  { id: "brand", label: "Branding", icon: Wand2 },
  { id: "dev", label: "Development", icon: Code2 },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "content", label: "Content", icon: ImageIcon },
  { id: "retainer", label: "Retainers", icon: Wrench },
];

const MILESTONES: { id: Milestone; label: string; sub: string; factor: number }[] = [
  { id: "fewBig", label: "Few big", sub: "2–3 milestones per project", factor: 0.85 },
  { id: "balanced", label: "Balanced", sub: "4–6 milestones per project", factor: 1.0 },
  { id: "manySmall", label: "Many small", sub: "7+ milestones per project", factor: 1.25 },
];

const PAINS: { id: Pain; label: string; sub: string; icon: typeof Flame; factor: number; tone: string }[] = [
  { id: "bleeding", label: "We're bleeding cash", sub: "Constant chasing, late every month", icon: Flame, factor: 1.4, tone: "text-[#FF5C5C]" },
  { id: "average", label: "Average chasing", sub: "A few overdue invoices weekly", icon: Clock, factor: 1.0, tone: "text-[#F5A623]" },
  { id: "fine", label: "Mostly fine", sub: "Just want predictability", icon: Smile, factor: 0.6, tone: "text-[#00C27C]" },
];

export function RecoverySimulator() {
  const [size, setSize] = useState<Size | null>(null);
  const [projects, setProjects] = useState<string[]>([]);
  const [milestone, setMilestone] = useState<Milestone | null>(null);
  const [pain, setPain] = useState<Pain | null>(null);
  const [runId, setRunId] = useState(0);
  const [email, setEmail] = useState("");

  const ready = size && projects.length > 0 && milestone && pain;
  const simulated = runId > 0;

  const results = useMemo(() => {
    if (!ready) return null;
    const sm = SIZES.find((s) => s.id === size)!.mult;
    const pf = 0.8 + 0.15 * projects.length;
    const mf = MILESTONES.find((m) => m.id === milestone)!.factor;
    const pn = PAINS.find((p) => p.id === pain)!.factor;
    const monthlyLeak = 4200 * sm * mf * pn * Math.min(pf, 1.4);
    const recovered = Math.round(monthlyLeak * 12 * 0.78);
    const hours = Math.round(6 + 4 * sm * pn);
    const onTimeBefore = Math.max(35, Math.min(70, Math.round(58 - 8 * pn)));
    const onTimeAfter = 86;
    const proCost = 66 * 12;
    const roi = Math.max(1, Math.round(recovered / proCost));
    const breakEven = Math.max(2, Math.round(792 / Math.max(recovered / 365, 1)));
    const insight =
      recovered > 120000
        ? "That's enough to pay for your entire team's salary for a quarter."
        : recovered > 40000
          ? "That's a senior hire — recovered, not chased."
          : "That's your next 6 months of tools, paid for.";
    return { recovered, monthlyLeak: Math.round(monthlyLeak), hours, onTimeBefore, onTimeAfter, roi, breakEven, insight };
  }, [ready, size, projects, milestone, pain]);

  const toggleProject = (id: string) =>
    setProjects((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const handleRun = () => {
    if (!ready) return;
    setRunId((r) => r + 1);
    setTimeout(() => {
      const el = document.getElementById("rlv-results");
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 120);
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }
    toast.success("Report on its way", { description: `We'll send your personalized leak report to ${email}.` });
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-hero opacity-60" />
      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-eyebrow text-[#00C27C]">Revenue leak visualizer</span>
          <h2 className="mt-3 text-h2">See exactly how much you're losing — and recovering</h2>
          <p className="mt-4 text-muted-foreground">Four quick choices. One honest number. No fluff.</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* LEFT — animated scene */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Scene simulated={simulated} runId={runId} />
          </div>

          {/* RIGHT — selections + results */}
          <div className="space-y-8">
            <Step n={1} title="Pick your agency size">
              <div className="grid gap-3 sm:grid-cols-3">
                {SIZES.map((s) => {
                  const active = size === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSize(s.id)}
                      className={cardCls(active) + " text-left"}
                    >
                      <s.icon className={`h-5 w-5 ${active ? "text-[#00C27C]" : "text-muted-foreground"}`} />
                      <p className="mt-3 text-sm font-semibold">{s.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{s.range}</p>
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step n={2} title="What do you sell?" hint="Pick all that apply">
              <div className="flex flex-wrap gap-2">
                {PROJECTS.map((p) => {
                  const active = projects.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => toggleProject(p.id)}
                      className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "border-[#00C27C] bg-[#00C27C]/10 text-[#00C27C] shadow-[0_0_0_1px_rgba(0,194,124,0.3)]"
                          : "border-border bg-card text-foreground hover:border-[#00C27C]/50"
                      }`}
                    >
                      {active ? <CheckCircle2 className="h-4 w-4" /> : <p.icon className="h-4 w-4" />}
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step n={3} title="How are projects milestoned?">
              <div className="grid gap-3 sm:grid-cols-3">
                {MILESTONES.map((m) => {
                  const active = milestone === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMilestone(m.id)}
                      className={cardCls(active) + " text-left"}
                    >
                      <Layers className={`h-5 w-5 ${active ? "text-[#00C27C]" : "text-muted-foreground"}`} />
                      <p className="mt-3 text-sm font-semibold">{m.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{m.sub}</p>
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step n={4} title="How painful is chasing payments?">
              <div className="grid gap-3 sm:grid-cols-3">
                {PAINS.map((p) => {
                  const active = pain === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPain(p.id)}
                      className={cardCls(active) + " text-left"}
                    >
                      <p.icon className={`h-5 w-5 ${active ? "text-[#00C27C]" : p.tone}`} />
                      <p className="mt-3 text-sm font-semibold">{p.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{p.sub}</p>
                    </button>
                  );
                })}
              </div>
            </Step>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={handleRun}
                disabled={!ready}
                className="bg-[#00C27C] text-[#08090D] font-bold hover:bg-[#00A869] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,194,124,0.3)] transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                size="lg"
              >
                <Zap className="mr-1.5 h-4 w-4" />
                {simulated ? "Re-run simulation" : "Run simulation"}
              </Button>
              {!ready && <span className="text-xs text-muted-foreground">Make all four picks to unlock</span>}
            </div>

            {/* Results */}
            <div id="rlv-results" className="scroll-mt-28">
              {simulated && results && <Results key={runId} r={results} email={email} setEmail={setEmail} onSubmit={handleEmail} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function cardCls(active: boolean) {
  return [
    "group relative flex flex-col rounded-xl border p-4 transition-all duration-200",
    active
      ? "border-[#00C27C] bg-[#00C27C]/[0.06] shadow-[0_0_0_1px_#00C27C,0_18px_40px_-20px_rgba(0,194,124,0.4)] -translate-y-0.5"
      : "border-border bg-card hover:border-[#00C27C]/50 hover:-translate-y-0.5",
  ].join(" ");
}

function Step({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex items-baseline gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#00C27C]/40 bg-[#00C27C]/10 text-xs font-bold text-[#00C27C]">
          {n}
        </span>
        <h3 className="text-base font-semibold">{title}</h3>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/* ---------------- Scene ---------------- */

function Scene({ simulated, runId }: { simulated: boolean; runId: number }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#0B1220] via-[#0F1117] to-[#0A1A14] p-6 shadow-[0_30px_80px_-30px_rgba(0,194,124,0.35)]">
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_10%,rgba(0,194,124,0.18),transparent_50%),radial-gradient(circle_at_80%_90%,rgba(55,138,221,0.14),transparent_55%)]" />
      <div className="relative flex items-center justify-between">
        <span className="text-eyebrow text-[#00C27C]">{simulated ? "Sealed · flowing" : "Live leak"}</span>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
          simulated ? "bg-[#00C27C]/12 text-[#00C27C]" : "bg-[#FF5C5C]/12 text-[#FF5C5C]"
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${simulated ? "bg-[#00C27C]" : "bg-[#FF5C5C]"} bp-pulse-dot`} />
          {simulated ? "secure" : "leaking"}
        </span>
      </div>

      <svg viewBox="0 0 480 360" className="relative mt-4 h-[280px] w-full md:h-[360px]" key={runId}>
        <defs>
          <linearGradient id="pipe" x1="0" x2="1">
            <stop offset="0" stopColor="#1a2230" />
            <stop offset="1" stopColor="#0f1620" />
          </linearGradient>
          <linearGradient id="flow" x1="0" x2="1">
            <stop offset="0" stopColor="#00C27C" />
            <stop offset="1" stopColor="#5BE3B5" />
          </linearGradient>
          <radialGradient id="vaultGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#00C27C" stopOpacity="0.5" />
            <stop offset="1" stopColor="#00C27C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* invoices feeding pipe */}
        <g transform="translate(10,60)">
          <rect width="60" height="80" rx="6" fill="#161e2c" stroke="rgba(255,255,255,0.08)" />
          <rect x="8" y="10" width="44" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
          <rect x="8" y="20" width="30" height="4" rx="2" fill="rgba(255,255,255,0.10)" />
          <rect x="8" y="60" width="20" height="6" rx="2" fill="#00C27C" />
        </g>

        {/* pipe */}
        <rect x="80" y="170" width="280" height="36" rx="18" fill="url(#pipe)" stroke="rgba(255,255,255,0.06)" />
        {/* flow inside pipe */}
        <rect x="84" y="174" width="272" height="28" rx="14" fill="url(#flow)" opacity={simulated ? 0.9 : 0.25}
          style={{ transition: "opacity 700ms ease" }} />

        {/* leaks (cracks) */}
        {[140, 210, 290].map((cx, i) => (
          <g key={i}>
            <path
              d={`M${cx} 206 l-4 12 l8 -2 l-4 14`}
              stroke={simulated ? "transparent" : "#FF5C5C"}
              strokeWidth="2"
              fill="none"
              style={{ transition: "stroke 400ms ease" }}
            />
            {/* dripping bills when leaking */}
            {!simulated && (
              <g>
                {[0, 1, 2].map((j) => (
                  <rect
                    key={j}
                    x={cx - 8}
                    y={220}
                    width="16"
                    height="10"
                    rx="2"
                    fill="#1a8a5f"
                    opacity="0.85"
                    style={{
                      animation: `bpFall 2.6s ${i * 0.4 + j * 0.7}s linear infinite`,
                      transformOrigin: `${cx}px 230px`,
                    }}
                  />
                ))}
              </g>
            )}
            {/* seal pulse on simulate */}
            {simulated && (
              <circle cx={cx} cy={206} r="6" fill="none" stroke="#00C27C" strokeWidth="2"
                style={{ animation: "bpSealPulse 900ms ease-out forwards" }} />
            )}
          </g>
        ))}

        {/* vault */}
        <g transform="translate(370,130)">
          <ellipse cx="50" cy="80" rx="70" ry="70" fill="url(#vaultGlow)" opacity={simulated ? 1 : 0.35}
            style={{ transition: "opacity 600ms" }} />
          <g style={{ animation: simulated ? "bpFloat 4s ease-in-out infinite" : "none" }}>
            <rect x="10" y="20" width="80" height="100" rx="12" fill="#0F1620" stroke="#00C27C" strokeOpacity={simulated ? 0.7 : 0.25} strokeWidth="2" />
            <circle cx="50" cy="70" r="22" fill="none" stroke="#00C27C" strokeOpacity={simulated ? 0.9 : 0.3} strokeWidth="3" />
            <circle cx="50" cy="70" r="6" fill="#00C27C" opacity={simulated ? 1 : 0.4} />
            <rect x="46" y="70" width="8" height="32" fill="#00C27C" opacity={simulated ? 0.9 : 0.3} />
            <text x="50" y="20" textAnchor="middle" fontSize="9" fill="#00C27C" fontWeight="700" letterSpacing="2">VAULT</text>
          </g>
          {/* particle burst */}
          {simulated && [...Array(10)].map((_, i) => (
            <circle key={i} cx="50" cy="80" r="3" fill="#00C27C"
              style={{
                animation: `bpParticle 900ms ${i * 40}ms ease-out forwards`,
                transform: `rotate(${i * 36}deg)`,
                transformOrigin: "50px 80px",
              }}
            />
          ))}
        </g>
      </svg>

      <div className="relative mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" /> Invoices</span>
        <span className={simulated ? "text-[#00C27C]" : "text-[#FF5C5C]"}>
          {simulated ? "→ Sealed pipeline →" : "→ Cash leaking out →"}
        </span>
        <span className="inline-flex items-center gap-1.5"><Vault className="h-3.5 w-3.5" /> Recovered</span>
      </div>
    </div>
  );
}

/* ---------------- Results ---------------- */

function Results({
  r,
  email,
  setEmail,
  onSubmit,
}: {
  r: { recovered: number; monthlyLeak: number; hours: number; onTimeBefore: number; onTimeAfter: number; roi: number; breakEven: number; insight: string };
  email: string;
  setEmail: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const ringR = 44;
  const C = 2 * Math.PI * ringR;
  const dash = (r.onTimeAfter / 100) * C;

  return (
    <div className="fade-up space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-[#00C27C]/30 bg-gradient-to-br from-[#0F1117] to-[#0A1A14] p-8 shadow-[0_30px_80px_-30px_rgba(0,194,124,0.4)]">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00C27C]/10 blur-3xl" />
        <div className="relative">
          <p className="text-eyebrow text-[#00C27C]">Recovered in 12 months</p>
          <p className="mt-3 text-[clamp(2.75rem,8vw,5rem)] font-extrabold leading-none tracking-tight">
            <AnimatedCounter value={r.recovered} prefix="$" duration={1800} />
          </p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">{r.insight}</p>
        </div>
      </div>

      {/* Before/After */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-eyebrow">Monthly cash recovered</p>
        <div className="mt-5 space-y-4">
          <BarRow label="Before" value={Math.round(r.monthlyLeak * 0.22)} max={r.monthlyLeak} color="#FF5C5C" />
          <BarRow label="After" value={r.monthlyLeak} max={r.monthlyLeak} color="#00C27C" highlight />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {/* Hours saved */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <Clock className="h-5 w-5 text-[#378ADD] [animation:spin_8s_linear_infinite]" />
          <p className="mt-3 text-2xl font-bold">
            <AnimatedCounter value={r.hours} duration={1400} suffix=" hrs" />
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Saved every month chasing</p>
        </div>

        {/* On-time ring */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <svg width="60" height="60" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={ringR} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r={ringR}
                fill="none"
                stroke="#00C27C"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${C}`}
                transform="rotate(-90 50 50)"
                style={{ transition: "stroke-dasharray 1400ms ease-out" }}
              />
              <text x="50" y="55" textAnchor="middle" fontSize="20" fontWeight="800" fill="currentColor">
                {r.onTimeAfter}%
              </text>
            </svg>
            <div>
              <p className="text-xs text-muted-foreground">On-time rate</p>
              <p className="text-sm font-semibold">
                {r.onTimeBefore}% <span className="text-muted-foreground">→</span>{" "}
                <span className="text-[#00C27C]">{r.onTimeAfter}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* ROI */}
        <div className="rounded-2xl border border-[#00C27C]/30 bg-[#00C27C]/[0.05] p-5">
          <TrendingUp className="h-5 w-5 text-[#00C27C]" />
          <p className="mt-3 text-2xl font-bold text-[#00C27C]">
            <AnimatedCounter value={r.roi} duration={1400} suffix="×" />
          </p>
          <p className="mt-1 text-xs text-muted-foreground">ROI on Pro · break-even in {r.breakEven} days</p>
        </div>
      </div>

      {/* Insight callout */}
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
        <LineChart className="mt-0.5 h-5 w-5 shrink-0 text-[#00C27C]" />
        <p className="text-sm">
          <span className="font-semibold">Translation:</span> at this scale, BoostProfits Pro pays for itself in under
          two weeks — every month after is pure margin.
        </p>
      </div>

      {/* Email capture */}
      <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-semibold">Email me a personalized PDF report</p>
        <p className="mt-1 text-xs text-muted-foreground">Detailed breakdown, milestone playbook, and recovery roadmap.</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder="you@agency.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 pl-9"
            />
          </div>
          <Button
            type="submit"
            className="h-11 bg-[#00C27C] text-[#08090D] font-bold hover:bg-[#00A869] transition-all"
          >
            Send my report
          </Button>
        </div>
      </form>
    </div>
  );
}

function BarRow({ label, value, max, color, highlight }: { label: string; value: number; max: number; color: string; highlight?: boolean }) {
  const pct = Math.max(4, Math.min(100, (value / max) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-bold tabular-nums ${highlight ? "text-[#00C27C]" : ""}`}>
          <AnimatedCounter value={value} prefix="$" duration={1400} />
          <span className="text-xs font-normal text-muted-foreground"> /mo</span>
        </span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            transition: "width 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
            boxShadow: highlight ? `0 0 24px ${color}55` : undefined,
          }}
        />
      </div>
    </div>
  );
}
