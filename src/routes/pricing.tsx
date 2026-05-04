import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, X } from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { PricingTable } from "./index";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Boost Profits" },
      { name: "description", content: "Simple, transparent pricing for agencies and service businesses. Start free for 14 days." },
      { property: "og:title", content: "Pricing — Boost Profits" },
      { property: "og:description", content: "Starter, Pro and Business plans. Cancel anytime." },
    ],
  }),
  component: PricingPage,
});

const matrix = [
  { f: "Invoices per month", s: "25", p: "200", b: "Unlimited" },
  { f: "Active clients", s: "10", p: "Unlimited", b: "Unlimited" },
  { f: "Milestone automation", s: false, p: true, b: true },
  { f: "Automated reminders", s: true, p: true, b: true },
  { f: "Google Sheets sync", s: false, p: true, b: true },
  { f: "Source & UTM tracking", s: false, p: true, b: true },
  { f: "Admin panel & roles", s: false, p: false, b: true },
  { f: "Audit logs & exports", s: false, p: false, b: true },
  { f: "Custom workflows", s: false, p: false, b: true },
  { f: "Priority support", s: false, p: false, b: true },
];

function PricingPage() {
  return (
    <MarketingLayout>
      <section className="bg-hero">
        <div className="container-page py-20 text-center md:py-24">
          <p className="text-eyebrow">Pricing</p>
          <h1 className="text-display mt-4">Simple. Transparent. Fair.</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            14-day free trial on every plan. No credit card. Cancel anytime.
          </p>
        </div>
      </section>

      <Section>
        <PricingTable />
      </Section>

      <Section tone="muted" eyebrow="Compare" title="Compare every plan.">
        <div className="overflow-x-auto card-premium">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-6 py-4 font-semibold">Feature</th>
                <th className="px-6 py-4 font-semibold">Starter</th>
                <th className="px-6 py-4 font-semibold">Pro</th>
                <th className="px-6 py-4 font-semibold">Business</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.f} className="border-t border-border">
                  <td className="px-6 py-4 font-medium">{row.f}</td>
                  {[row.s, row.p, row.b].map((v, i) => (
                    <td key={i} className="px-6 py-4 text-muted-foreground">
                      {typeof v === "boolean" ? (
                        v ? <CheckCircle2 className="h-4 w-4 text-success" /> : <X className="h-4 w-4 opacity-40" />
                      ) : (
                        v
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild className="bg-cta text-primary-foreground"><Link to="/signup">Free sign up</Link></Button>
          <Button asChild variant="outline"><Link to="/contact">Talk to sales</Link></Button>
        </div>
      </Section>
    </MarketingLayout>
  );
}
