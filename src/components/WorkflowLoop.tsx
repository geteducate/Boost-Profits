import { ClipboardList, Send, CheckCircle2, Bell, BarChart3 } from "lucide-react";

/**
 * Lightweight, CSS-only looping illustration of the 5-step workflow.
 * No JS animation libraries. GPU-friendly (opacity + transform).
 * Respects prefers-reduced-motion.
 */
const STEPS = [
  { i: ClipboardList, t: "Add client & milestones" },
  { i: Send, t: "Invoice fires on approval" },
  { i: Bell, t: "Reminders run themselves" },
  { i: CheckCircle2, t: "Client pays on time" },
  { i: BarChart3, t: "You see cash forecast" },
];

export function WorkflowLoop() {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[var(--primary)]/8 via-background to-[var(--primary-glow)]/10">
      <div className="absolute inset-0 bg-hero opacity-25" aria-hidden />
      <div className="relative flex h-full w-full items-center justify-center px-6">
        <ol className="flex w-full max-w-3xl items-stretch justify-between gap-3">
          {STEPS.map((s, idx) => (
            <li
              key={s.t}
              className="wf-step flex flex-1 flex-col items-center gap-3 text-center"
              style={{ animationDelay: `${idx * 0.6}s` }}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cta text-primary-foreground shadow-elegant">
                <s.i className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-semibold leading-tight text-foreground">{s.t}</span>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .wf-step { opacity: 0.35; animation: wfPulse 3s ease-in-out infinite; }
        @keyframes wfPulse {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          15%, 35% { opacity: 1; transform: translateY(-2px); }
          60% { opacity: 0.35; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wf-step { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
