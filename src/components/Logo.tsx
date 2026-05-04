import { Link } from "@tanstack/react-router";

export function Logo({ to = "/", invert = false }: { to?: string; invert?: boolean }) {
  return (
    <Link to={to} className="flex items-center gap-2 group">
      <span
        className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cta text-primary-foreground shadow-elegant transition-transform group-hover:scale-[1.03]`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l6-6 4 4 8-9" />
          <path d="M14 6h7v7" />
        </svg>
      </span>
      <span className={`text-[17px] font-extrabold tracking-tight ${invert ? "text-primary-foreground" : "text-foreground"}`}>
        Boost<span className="text-primary-glow" style={{ color: "var(--primary-glow)" }}>Profits</span>
      </span>
    </Link>
  );
}
