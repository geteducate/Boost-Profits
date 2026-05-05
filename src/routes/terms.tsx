import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — BoostProfits" },
      { name: "description", content: "The terms governing your use of BoostProfits." },
    ],
  }),
});

function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" intro="The agreement between you and BoostProfits.">
      <p>These Terms govern your access to and use of the BoostProfits website and service (the "Service"). By creating an account or using the Service, you agree to these Terms. The Service is provided by <strong>BoostProfits</strong> ("BoostProfits", "we", "us"). If you are using the Service on behalf of an organisation, you represent that you have authority to bind that organisation.</p>

      <h2>1. The Service</h2>
      <p>BoostProfits provides invoice collection and milestone payment automation for service businesses, made available under the plan you select.</p>

      <h2>2. Accounts</h2>
      <p>You must be at least 18 years old, provide accurate information, keep your credentials confidential, and you are responsible for all activity under your account.</p>

      <h2>3. Acceptable use</h2>
      <p>You must not misuse the Service, including: unlawful use; fraud or spam; infringing the intellectual property rights of others; sending malware; interfering with or probing the security of the Service; or scraping or reverse-engineering the Service.</p>

      <h2>4. Payments, billing, and refunds — Paddle as Merchant of Record</h2>
      <p>Our order process is conducted by our online reseller <strong>Paddle.com</strong>. Paddle.com is the <strong>Merchant of Record</strong> for all our orders. Paddle provides all customer service inquiries and handles returns. Payment, billing, tax, cancellation, and refund mechanics are governed by the <a href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" rel="noreferrer noopener" className="underline">Paddle Buyer Terms</a> and our <a href="/refund" className="underline">Refund Policy</a>. Subscriptions renew automatically until cancelled; you may cancel at any time, and cancellation takes effect at the end of the current billing period.</p>

      <h2>5. Intellectual property</h2>
      <p>The Service, including all software, documentation, branding, and content, is owned by BoostProfits and its licensors and is protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable, revocable right to use the Service in accordance with your plan. You may not copy, resell, redistribute, reverse engineer, or circumvent any technical limits of the Service. You retain ownership of content you upload; you grant us a limited licence to host and process it solely to provide the Service.</p>

      <h2>6. Service availability</h2>
      <p>We target 99.9% uptime but do not guarantee that the Service will be uninterrupted or error-free. Scheduled maintenance is announced in-app at least 48 hours in advance where possible.</p>

      <h2>7. Suspension and termination</h2>
      <p>We may suspend or terminate access for material breach, non-payment, security or fraud risk, or repeated or serious policy violations. On termination, you may export your data within 30 days, after which it will be deleted or anonymised.</p>

      <h2>8. Disclaimers and liability</h2>
      <p>The Service is provided "as is" and we disclaim all implied warranties (including merchantability and fitness for a particular purpose) to the fullest extent permitted by law. To the maximum extent permitted by law, our aggregate liability is capped at the fees you paid in the 12 months preceding the claim, and we are not liable for indirect, consequential, or special damages, including loss of profits, data, or goodwill. Nothing in these Terms excludes liability for fraud, death, or personal injury where such exclusion is prohibited by law.</p>

      <h2>9. Indemnity</h2>
      <p>You will indemnify BoostProfits against claims arising from your content, your unlawful use of the Service, or your breach of these Terms.</p>

      <h2>10. Changes</h2>
      <p>We may update these Terms; material changes will be emailed at least 14 days before they take effect.</p>

      <h2>11. Governing law</h2>
      <p>These Terms are governed by the laws of the seller's jurisdiction. Disputes will be resolved by the competent courts of that jurisdiction.</p>

      <h2>12. Contact</h2>
      <p>BoostProfits — <span className="font-mono">legal@boostprofits.com</span>.</p>
    </LegalLayout>
  );
}
