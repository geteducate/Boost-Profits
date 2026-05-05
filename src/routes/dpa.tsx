import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/dpa")({
  component: DpaPage,
  head: () => ({
    meta: [
      { title: "Data Processing Addendum — BoostProfits" },
      { name: "description", content: "BoostProfits Data Processing Addendum and subprocessor list." },
    ],
  }),
});

function DpaPage() {
  return (
    <LegalLayout title="Data Processing Addendum" intro="Required when BoostProfits processes personal data on your behalf.">
      <h2>1. Roles</h2>
      <p>You are the Data Controller for personal data you upload about your end customers. BoostProfits acts as the Data Processor for that data.</p>

      <h2>2. Subprocessors</h2>
      <ul>
        <li><strong>Cloudflare, AWS</strong> — hosting and infrastructure</li>
        <li><strong>Resend</strong> — transactional email delivery</li>
        <li><strong>Paddle.com Market Limited</strong> — Merchant of Record (payments, subscription billing, tax, invoicing)</li>
      </ul>

      <h2>3. International transfers</h2>
      <p>International transfers are governed by Standard Contractual Clauses (SCCs) or applicable adequacy decisions.</p>

      <h2>4. Security</h2>
      <p>TLS 1.2+ in transit, AES-256 at rest, role-based access, audit logging, and annual penetration testing.</p>

      <h2>5. Breach notification</h2>
      <p>We notify affected customers within 72 hours of confirming a personal data breach.</p>

      <h2>6. Sign</h2>
      <p>Email <span className="font-mono">dpa@boostprofits.com</span> for a counter-signed PDF copy.</p>
    </LegalLayout>
  );
}
