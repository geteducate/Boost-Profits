import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Section } from "@/components/Section";
import { FAQ_ITEMS } from "./index";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Boost Profits" },
      { name: "description", content: "Answers to common questions about security, billing, integrations and workflows." },
      { property: "og:title", content: "FAQ — Boost Profits" },
      { property: "og:description", content: "Security, billing, integrations and workflow answers." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <MarketingLayout>
      <section className="bg-hero">
        <div className="container-page py-20 text-center md:py-24">
          <p className="text-eyebrow">FAQ</p>
          <h1 className="text-display mt-4">Questions, answered.</h1>
        </div>
      </section>
      <Section>
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQ_ITEMS.map((f) => (
            <details key={f.q} className="group card-premium p-5 open:shadow-elegant">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                {f.q}
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </MarketingLayout>
  );
}
