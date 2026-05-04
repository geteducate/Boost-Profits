import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Boost Profits" },
      { name: "description", content: "Talk to our team about milestone billing and invoice automation." },
      { property: "og:title", content: "Contact — Boost Profits" },
      { property: "og:description", content: "Send a message or book a demo." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  return (
    <MarketingLayout>
      <section className="bg-hero">
        <div className="container-page py-20 text-center md:py-24">
          <p className="text-eyebrow">Contact</p>
          <h1 className="text-display mt-4">Let’s talk.</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Tell us about your team and we’ll get back within one business day.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-5">
            {[
              { i: Mail, t: "Email", d: "hello@boostprofits.com" },
              { i: Phone, t: "Phone", d: "+1 (415) 555‑0142" },
              { i: MapPin, t: "Office", d: "548 Market St, San Francisco" },
            ].map((c) => (
              <div key={c.t} className="card-premium p-5 flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary"><c.i className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm font-semibold">{c.t}</p>
                  <p className="text-sm text-muted-foreground">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
          <form
            className="card-premium p-7 lg:col-span-3"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                toast.success("Thanks — we’ll be in touch within one business day.");
                (e.target as HTMLFormElement).reset();
              }, 700);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Full name" required />
              <Field id="email" label="Work email" type="email" required />
              <Field id="company" label="Company" />
              <Field id="size" label="Team size" placeholder="1-10" />
            </div>
            <div className="mt-4">
              <Label htmlFor="msg">How can we help?</Label>
              <Textarea id="msg" required rows={5} className="mt-1.5" placeholder="Tell us about your billing workflow..." />
            </div>
            <Button type="submit" disabled={loading} className="mt-6 h-11 w-full bg-cta text-primary-foreground sm:w-auto sm:px-6">
              {loading ? "Sending..." : (<>Send message <Send className="ml-1.5 h-4 w-4" /></>)}
            </Button>
          </form>
        </div>
      </Section>
    </MarketingLayout>
  );
}

function Field({ id, label, type = "text", required, placeholder }: { id: string; label: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <Label htmlFor={id}>{label}{required && <span className="ml-0.5 text-destructive">*</span>}</Label>
      <Input id={id} type={type} required={required} placeholder={placeholder} className="mt-1.5" />
    </div>
  );
}
