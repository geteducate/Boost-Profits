import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp } from "lucide-react";

/**
 * Live-feeling area chart. Generates a smooth, slowly-mutating series so the
 * front page graph never looks static. Numbers are realistic for a young product:
 * 70-180 events/day, gentle upward drift.
 */
export function LiveGraph() {
  const POINTS = 32;
  // Deterministic initial series so SSR HTML matches first client render (no hydration mismatch).
  const [series, setSeries] = useState<number[]>(() => {
    const out: number[] = [];
    for (let i = 0; i < POINTS; i++) {
      // gentle sine-based wave between ~10 and ~26
      out.push(18 + Math.sin(i / 3) * 6 + Math.cos(i / 5) * 2);
    }
    return out;
  });
  const [today, setToday] = useState(0);
  const [pulse, setPulse] = useState(0);
  const tRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Randomize series only after mount (client-only).
    setSeries((prev) => {
      const out: number[] = [];
      let v = 12;
      for (let i = 0; i < prev.length; i++) {
        v += (Math.random() - 0.45) * 3 + 0.15;
        out.push(Math.max(6, Math.min(34, v)));
      }
      return out;
    });
    const tick = () => {
      setSeries((prev) => {
        const last = prev[prev.length - 1];
        const next = Math.max(6, Math.min(36, last + (Math.random() - 0.45) * 4 + 0.1));
        return [...prev.slice(1), next];
      });
      setToday((t) => t + (Math.random() < 0.4 ? 1 : 0));
      setPulse((p) => p + 1);
    };
    tRef.current = window.setInterval(tick, 1600);
    return () => window.clearInterval(tRef.current);
  }, []);


  const w = 600, h = 180, pad = 8;
  const max = Math.max(...series), min = Math.min(...series);
  const range = max - min || 1;
  const step = (w - pad * 2) / (series.length - 1);
  const pts = series.map((v, i) => {
    const x = pad + i * step;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  const area = `${line} L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`;
  const lastPt = pts[pts.length - 1];

  return (
    <div className="card-premium overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <p className="text-sm font-bold tracking-tight">Live activity</p>
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[10px] font-semibold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Streaming
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span><span className="font-bold text-foreground tabular-nums">{Math.round(series[series.length - 1])}</span> /min</span>
          <span className="inline-flex items-center gap-1 text-success font-semibold">
            <TrendingUp className="h-3 w-3" /> +{(((series[series.length - 1] - series[0]) / series[0]) * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block h-44 w-full">
          <defs>
            <linearGradient id="lg-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.55 0.13 250)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="oklch(0.55 0.13 250)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lg-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.32 0.09 263)" />
              <stop offset="100%" stopColor="oklch(0.62 0.13 250)" />
            </linearGradient>
          </defs>
          {/* gridlines */}
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="oklch(0.92 0.012 252)" strokeDasharray="3 4" strokeWidth="1" />
          ))}
          <motion.path
            d={area}
            fill="url(#lg-area)"
            initial={false}
            animate={{ d: area }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="url(#lg-line)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ d: line }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          <motion.circle
            cx={lastPt[0]}
            cy={lastPt[1]}
            r="5"
            fill="oklch(0.62 0.13 250)"
            initial={false}
            animate={{ cx: lastPt[0], cy: lastPt[1] }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          <motion.circle
            key={pulse}
            cx={lastPt[0]}
            cy={lastPt[1]}
            r="5"
            fill="oklch(0.62 0.13 250)"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 3 }}
            transition={{ duration: 1.6 }}
          />
        </svg>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border border-t border-border text-center">
        <Stat label="Active sessions" value={Math.max(1, Math.round(series[series.length - 1] / 6)).toString()} />
        <Stat label="Events / hour" value={Math.round(series.reduce((a, b) => a + b, 0) / series.length).toString()} />
        <Stat label="Today" value={`${(74 + today).toLocaleString()}`} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-base font-extrabold tabular-nums">{value}</p>
    </div>
  );
}
