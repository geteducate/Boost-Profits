import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/legal")({
  component: LegalPage,
  head: () => ({
    meta: [
      { title: "Legal & Compliance — BoostProfits" },
      { name: "description", content: "Company information, compliance overview, and links to BoostProfits legal documents." },
    ],
  }),
});

function LegalPage() {
  return (
    <LegalLayout title="Legal & Compliance" intro="Company information and compliance overview.">
      <h2>Entity</h2>
      <p>BoostProfits.</p>

      <h2>Merchant of Record</h2>
      <p>Our order process is conducted by our online reseller <strong>Paddle.com</strong>. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.</p>

      <h2>Compliance</h2>
      <p>GDPR-aligned. Card data is handled by Paddle; BoostProfits never stores card data.</p>

      <h2>Documents</h2>
      <ul>
        <li><Link to="/privacy" className="underline">Privacy Policy</Link></li>
        <li><Link to="/terms" className="underline">Terms of Service</Link></li>
        <li><Link to="/refund" className="underline">Refund Policy</Link></li>
        <li><Link to="/dpa" className="underline">Data Processing Addendum</Link></li>
      </ul>

      <h2>Contact</h2>
      <p><span className="font-mono">legal@boostprofits.com</span></p>
    </LegalLayout>
  );
}
