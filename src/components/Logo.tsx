import { Link } from "@tanstack/react-router";

/**
 * Custom Boost Profits mark.
 * A stacked "BP" monogram inside a navy hex shield with a rising bar — represents
 * trust (shield), growth (rising bars) and finance (stacked currency strokes).
 */
export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="bp-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="oklch(0.32 0.09 263)" />
          <stop offset="1" stopColor="oklch(0.55 0.13 250)" />
        </linearGradient>
        <linearGradient id="bp-spark" x1="0" y1="40" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="oklch(0.85 0.13 200)" stopOpacity="0.0" />
          <stop offset="1" stopColor="oklch(0.85 0.13 200)" />
        </linearGradient>
      </defs>
      {/* shield */}
      <path
        d="M20 1.5 L36 6.2 V21 C36 30.5 28.6 36.7 20 38.5 C11.4 36.7 4 30.5 4 21 V6.2 Z"
        fill="url(#bp-grad)"
      />
      {/* rising bars */}
      <rect x="11" y="22" width="3.4" height="6" rx="1" fill="url(#bp-spark)" opacity="0.95" />
      <rect x="16" y="18" width="3.4" height="10" rx="1" fill="url(#bp-spark)" opacity="0.95" />
      <rect x="21" y="13" width="3.4" height="15" rx="1" fill="url(#bp-spark)" opacity="0.95" />
      {/* spark / arrow tip */}
      <path d="M26.5 12 L29.5 9 L29.5 12.5 Z" fill="oklch(0.92 0.15 95)" />
      {/* B+P stroke fused */}
      <path
        d="M11 8 H17 C19.2 8 20.6 9.2 20.6 11 C20.6 12.4 19.7 13.2 18.5 13.5 C20.1 13.8 21.2 14.8 21.2 16.4 C21.2 18.4 19.6 19.5 17.2 19.5 H11 Z M14 10.4 V12.7 H16.4 C17.4 12.7 17.9 12.3 17.9 11.5 C17.9 10.8 17.4 10.4 16.4 10.4 Z M14 14.8 V17.1 H16.8 C17.9 17.1 18.4 16.7 18.4 15.9 C18.4 15.2 17.9 14.8 16.8 14.8 Z"
        fill="white"
        opacity="0.96"
      />
    </svg>
  );
}

export function Logo({ to = "/", invert = false, size = 36 }: { to?: string; invert?: boolean; size?: number }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2.5">
      <span className="relative inline-flex transition-transform duration-300 group-hover:scale-[1.04]">
        <LogoMark size={size} className="drop-shadow-[0_4px_12px_rgba(15,27,61,0.18)]" />
      </span>
      <span className={`text-[17px] font-extrabold tracking-tight ${invert ? "text-primary-foreground" : "text-foreground"}`}>
        Boost
        <span style={{ color: "var(--primary-glow)" }}>Profits</span>
      </span>
    </Link>
  );
}
