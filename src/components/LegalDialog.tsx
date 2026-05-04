import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

type Kind = "privacy" | "terms" | "dpa" | "legal";

const CONTENT: Record<Kind, { title: string; intro: string; sections: { h: string; p: ReactNode }[] }> = {
  privacy: {
    title: "Privacy Policy",
    intro: "How Boost Profits collects, uses and protects your data.",
    sections: [
      { h: "1. Data we collect", p: "Account information (name, email, company), invoice and client data you store, and product analytics (page views, device, anonymized IP). We never sell personal data." },
      { h: "2. How we use it", p: "To deliver the service, send transactional and reminder emails on your behalf, prevent abuse, and improve the product. Marketing emails are opt-in." },
      { h: "3. Where it lives", p: "Data is hosted on EU/US infrastructure (AWS / Cloudflare) under industry-standard encryption (TLS in transit, AES-256 at rest)." },
      { h: "4. Your rights", p: "You can export, correct or delete your data at any time from Settings → Account, or by emailing privacy@boostprofits.com. We respond within 30 days." },
      { h: "5. Cookies", p: "We use essential cookies for sign-in and a privacy-friendly first-party analytics cookie. No third-party advertising trackers." },
      { h: "6. Contact", p: "Data Protection Officer — privacy@boostprofits.com." },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "The agreement between you and Boost Profits.",
    sections: [
      { h: "1. Account", p: "You must be 18+ and provide accurate information. You are responsible for activity under your account." },
      { h: "2. Subscription", p: "Plans renew automatically. You can cancel at any time from Settings → Billing — cancellation takes effect at the end of the current period." },
      { h: "3. Acceptable use", p: "No fraud, no harassment of clients, no use of the platform to send spam or illegal content. We may suspend accounts that violate this." },
      { h: "4. Service availability", p: "We target 99.9% uptime. Scheduled maintenance is announced in-app at least 48 hours ahead when possible." },
      { h: "5. Liability", p: "Boost Profits is provided as-is. To the extent permitted by law, our liability is capped at the fees paid in the previous 12 months." },
      { h: "6. Changes", p: "We may update these terms; material changes will be emailed at least 14 days before they take effect." },
    ],
  },
  dpa: {
    title: "Data Processing Addendum",
    intro: "Required when Boost Profits processes personal data on your behalf.",
    sections: [
      { h: "1. Roles", p: "You are the Data Controller. Boost Profits is the Data Processor for the personal data you store about your clients." },
      { h: "2. Subprocessors", p: "Hosting (Cloudflare, AWS), email delivery (Resend), payment processing (Stripe). Full list with regions available on request." },
      { h: "3. Transfers", p: "International transfers are governed by Standard Contractual Clauses (SCCs) where applicable." },
      { h: "4. Security", p: "TLS 1.2+ in transit, AES-256 at rest, role-based access, audit logging, annual penetration testing." },
      { h: "5. Breach notification", p: "We will notify affected customers within 72 hours of confirming a personal data breach." },
      { h: "6. Sign", p: "Email dpa@boostprofits.com to receive a counter-signed PDF copy." },
    ],
  },
  legal: {
    title: "Legal & Compliance",
    intro: "Company information and compliance overview.",
    sections: [
      { h: "Entity", p: "Boost Profits, Inc. — Delaware C-Corp." },
      { h: "Compliance", p: "GDPR-aligned, SOC 2 Type I in progress, PCI-DSS handled by Stripe (no card data stored)." },
      { h: "Intellectual property", p: "All trademarks, logos and content © Boost Profits, Inc. unless otherwise noted." },
      { h: "Contact", p: "legal@boostprofits.com" },
    ],
  },
};

export function LegalDialog({ kind, children }: { kind: Kind; children: ReactNode }) {
  const c = CONTENT[kind];
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <DialogHeader className="border-b border-border bg-surface px-6 py-5">
            <DialogTitle className="text-xl font-extrabold tracking-tight">{c.title}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">{c.intro} · Last updated {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long" })}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[65vh]">
            <div className="space-y-6 px-6 py-6 text-sm leading-relaxed">
              {c.sections.map((s) => (
                <section key={s.h}>
                  <h4 className="text-[13px] font-bold tracking-tight">{s.h}</h4>
                  <p className="mt-1.5 text-muted-foreground">{s.p}</p>
                </section>
              ))}
              <p className="rounded-lg border border-border bg-muted/40 p-3 text-[11px] text-muted-foreground">
                This document is a plain-English summary for product transparency. It is not a substitute for legal advice — for the executable contract email <span className="font-mono text-foreground">legal@boostprofits.com</span>.
              </p>
            </div>
          </ScrollArea>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
