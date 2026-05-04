import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { CursorHalo } from "./CursorHalo";
import { trackPageView } from "@/lib/tracking";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    trackPageView(path);
  }, [path]);

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <CursorHalo />
      {/* Ambient backdrop — premium navy aurora for depth */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.97_0.014_252)_0%,oklch(0.94_0.022_252)_100%)]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[960px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.62_0.13_250/0.18),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[-220px] right-[-120px] h-[480px] w-[680px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.32_0.09_263/0.14),transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 left-[-100px] h-[360px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.13_220/0.10),transparent_70%)] blur-3xl" />
      </div>
      <SiteHeader />
      <AnimatePresence mode="wait">
        <motion.main
          key={path}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
    </div>
  );
}
