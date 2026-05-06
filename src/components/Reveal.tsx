import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Lightweight scroll-reveal using IntersectionObserver.
 * - Fade + slight slide, max 300ms
 * - Respects prefers-reduced-motion
 * - Disables non-essential motion on small screens
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    if (mq.matches || isMobile) {
      setReduced(true);
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = reduced
    ? undefined
    : {
        transitionDelay: `${delay}ms`,
        transform: visible ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
        opacity: visible ? 1 : 0,
        transition: "opacity 280ms ease-out, transform 280ms ease-out",
        willChange: "opacity, transform",
      };

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
}
