import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/refund")({
  component: RefundPage,
  head: () => ({
    meta: [
      { title: "Refund Policy — BoostProfits" },
      { name: "description", content: "BoostProfits 30-day money-back guarantee and refund process." },
    ],
  }),
});

function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" intro="30-day money-back guarantee.">
      <h2>1. 30-day money-back guarantee</h2>
      <p>We offer a <strong>30-day money-back guarantee</strong> on all paid plans. If you are not satisfied with your purchase, you may request a full refund within <strong>30 days</strong> of your order date.</p>

      <h2>2. How to request a refund</h2>
      <p>Refunds are processed by our payment provider and Merchant of Record, <strong>Paddle</strong>. To request a refund:</p>
      <ul>
        <li>Visit <a href="https://paddle.net" target="_blank" rel="noreferrer noopener" className="underline">paddle.net</a> and look up your order using the email address used at checkout, or</li>
        <li>Email us at <span className="font-mono">support@boostprofits.com</span> and we will assist you with the request.</li>
      </ul>

      <h2>3. After the refund window</h2>
      <p>You may cancel your subscription at any time from Settings → Billing. Cancellation stops future renewals; charges already incurred outside the 30-day window are not refunded except where required by law or at our discretion.</p>

      <h2>4. Contact</h2>
      <p>BoostProfits — <span className="font-mono">support@boostprofits.com</span>.</p>
    </LegalLayout>
  );
}
