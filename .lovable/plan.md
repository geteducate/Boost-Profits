## Revenue Leak Visualizer — Full Redesign

Replace the existing `src/components/RecoverySimulator.tsx` with a brand-new high-impact interactive section. Keep the same export name (`RecoverySimulator`) so `src/routes/index.tsx` (line 44) needs zero changes — the lazy import keeps working.

### Layout (2-column on lg, stacked on mobile)

```
┌──────────────────────────────────────────────────────────┐
│  Eyebrow: REVENUE LEAK VISUALIZER                        │
│  H2: See exactly how much you're losing — and recovering │
├────────────────────────┬─────────────────────────────────┤
│  LEFT: Animated Scene  │  RIGHT: Choices + Live Results  │
│  (sticky on lg)        │                                 │
│  • Leaking pipe SVG    │  Step 1: Agency Size (3 cards)  │
│  • $ bills falling     │  Step 2: Project Types (chips)  │
│    through cracks      │  Step 3: Milestone Style (3)    │
│  • Vault on right side │  Step 4: Pain Level (3 icons)   │
│  • State: leaking →    │  [ Run Simulation ] CTA         │
│    sealing → flowing   │  ─────────────────────────       │
│  • Particles, glow     │  Results panel (animated):      │
│                        │  • Massive $ Recovered (count)  │
│                        │  • Before/After bar comparison  │
│                        │  • Hours saved (clock spin)     │
│                        │  • On-time ring chart 58→86%    │
│                        │  • ROI + break-even badge       │
│                        │  • Insight callout              │
│                        │  • Email capture for report     │
└────────────────────────┴─────────────────────────────────┘
```

### File changes

**1. Rewrite `src/components/RecoverySimulator.tsx`** (single self-contained file, ~450 lines):

- Named export `RecoverySimulator` preserved.
- Local React state for the 4 selections + `simulated` boolean + `email` field.
- Pure-CSS/SVG animated scene (no new deps): leaking pipe with animated `<path>` strokes, falling-bill rectangles using `@keyframes fall` + drift, vault SVG with closing doors when `simulated`, particle burst on simulate.
- `AnimatedCounter` (already exists at `src/components/AnimatedCounter.tsx`) used for all numbers; `key` swaps on simulate to retrigger.
- Ring chart for on-time rate: SVG circle with `stroke-dasharray` animated via inline style transition.
- Before/After bars: two horizontal bars with `width` transitioning over 1.2s.
- Email capture: posts to existing `leads.functions.ts` `submitLead` (or no-op fallback) — confirms with toast via existing `sonner`.

**2. New keyframes in `src/styles.css`** — append a small block:
- `@keyframes bpFall` (translateY -20→640, opacity fade)
- `@keyframes bpFloat` (gentle vault hover)
- `@keyframes bpParticle` (burst outward)
- `@keyframes bpSealPulse`
- Utility classes `.bp-fall`, `.bp-vault-float`, `.bp-particle`.

### Selections → math (deterministic, feels alive)

```
sizeMultiplier:     small=1, growing=2.4, established=5.2
projectsBase:       0.8 + 0.15 * selectedProjectTypes.length (cap 1.4)
milestoneFactor:    fewBig=0.85, balanced=1.0, manySmall=1.25
painFactor:         bleeding=1.4, average=1.0, fine=0.6

monthlyRevenueLeak  = 4200 * sizeMultiplier * milestoneFactor * painFactor * projectsBase
recovered12mo       = round(monthlyRevenueLeak * 12 * 0.78)
hoursSavedPerMonth  = round(6 + 4 * sizeMultiplier * painFactor)
onTimeBefore        = clamp(58 - 8*painFactor, 35, 70)
onTimeAfter         = 86
proPlanCost12mo     = 66 * 12  // 792
roiMultiple         = round(recovered12mo / proPlanCost12mo)
breakEvenDays       = max(2, round(792 / (recovered12mo/365)))
insight             = pick from copy bank based on recovered12mo bucket
```

All numbers re-derive on every "Run Simulation" click.

### Visual / interaction polish

- Cards: `bg-[#0F1117] border-white/7 hover:border-[#00C27C]/60`, selected = `border-[#00C27C] shadow-[0_0_0_1px_#00C27C,0_18px_40px_rgba(0,194,124,0.18)] -translate-y-0.5`.
- Chips: pill, click to toggle, checkmark icon when selected.
- Run Simulation: PRIMARY button, disabled until size + ≥1 project + milestone + pain chosen; on click triggers scene transition (300ms seal animation → 600ms flow start) + result reveal with `fade-up`.
- Reduced-motion: respect `prefers-reduced-motion` (skip falling bills + particle burst, keep counters instant).
- Mobile: scene shrinks to ~280px tall above the controls; results stack below.

### Copy (sentence case, brand voice)

- Eyebrow: `REVENUE LEAK VISUALIZER`
- H2: `See exactly how much you're losing — and recovering`
- Sub: `Four quick choices. One honest number. No fluff.`
- Insights bank:
  - >$120k: `That's enough to pay for your entire team's salary for a quarter.`
  - $40k–120k: `That's a senior hire — recovered, not chased.`
  - <$40k: `That's your next 6 months of tools, paid for.`
- Email CTA: `Email me a personalized PDF report` → button `Send my report`.

### Out of scope

- No new routes, no DB tables, no new deps.
- `index.tsx` untouched (already lazy-imports the component).
- `AdminShell`, theme toggle, other sections untouched.

### Acceptance

- Section replaces the old simulator at the same scroll position.
- All 4 selection groups work; CTA gates correctly.
- Scene visibly changes from "leaking" to "vault flowing" on simulate.
- Counters animate; ring fills; bars grow; insight + ROI + break-even + email capture all render.
- Works in both dark and light themes (uses tokens, no hardcoded bg conflicts in light mode — uses `bg-card`, `border-border`, etc., with accent color literals only for highlights).
- No TS errors, no console warnings.
