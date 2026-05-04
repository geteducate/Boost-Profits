import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { trackPageView } from "@/lib/tracking";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    trackPageView(path);
  }, [path]);

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Ambient backdrop — subtle navy aurora for depth */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.62_0.13_250/0.12),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[420px] w-[620px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.32_0.09_263/0.10),transparent_70%)] blur-3xl" />
      </div>
      <SiteHeader />
      <AnimatePresence mode="wait">
        <motion.main
          key={path}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
    </div>
  );
}
