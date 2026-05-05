import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — BoostProfits" },
      { name: "description", content: "How BoostProfits collects, uses, shares, and protects your personal data." },
    ],
  }),
});

function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" intro="How BoostProfits collects, uses, and protects your personal data.">
      <p>BoostProfits ("BoostProfits", "we", "us") is the <strong>data controller</strong> for personal data processed in connection with our website and service. This notice explains what we collect, why, the legal basis we rely on, who we share it with, and your rights.</p>

      <h2>1. Categories of personal data</h2>
      <ul>
        <li><strong>Account data</strong>: name, email address, password hash, company name.</li>
        <li><strong>Customer content</strong>: invoices, client records, and other data you upload.</li>
        <li><strong>Billing data</strong>: plan, transaction history, billing address, and tax identifiers (collected by our payment provider).</li>
        <li><strong>Usage and device data</strong>: pages viewed, feature interactions, device type, browser, IP address.</li>
        <li><strong>Support data</strong>: messages and attachments you send to our support team.</li>
      </ul>

      <h2>2. Purposes and legal bases</h2>
      <ul>
        <li><strong>Provide the service</strong> (account creation, delivering features) — legal basis: <em>performance of a contract</em>.</li>
        <li><strong>Billing, invoicing, and tax compliance</strong> — legal basis: <em>performance of a contract</em> and <em>legal obligation</em>.</li>
        <li><strong>Security, fraud prevention, and abuse detection</strong> — legal basis: <em>legitimate interests</em> in protecting our service and users.</li>
        <li><strong>Product analytics and improvement</strong> — legal basis: <em>legitimate interests</em> in improving the product.</li>
        <li><strong>Customer support</strong> — legal basis: <em>performance of a contract</em>.</li>
        <li><strong>Marketing emails</strong> — legal basis: <em>consent</em> (you can withdraw at any time).</li>
      </ul>

      <h2>3. How we share data (recipients)</h2>
      <ul>
        <li><strong>Paddle.com Market Limited</strong> — our Merchant of Record. Paddle processes payments, manages subscriptions, calculates and remits sales tax/VAT, and issues invoices and refunds on our behalf.</li>
        <li><strong>Hosting and infrastructure providers</strong> (Cloudflare, AWS) — to host and serve the application.</li>
        <li><strong>Email delivery</strong> (Resend) — to send transactional emails.</li>
        <li><strong>Professional advisers</strong> (legal, accounting) — when reasonably necessary.</li>
        <li><strong>Authorities</strong> — where required by law or to protect rights.</li>
      </ul>

      <h2>4. International transfers</h2>
      <p>Where personal data is transferred outside the UK/EEA, we rely on adequacy decisions or Standard Contractual Clauses (SCCs) as a safeguard.</p>

      <h2>5. Data retention</h2>
      <ul>
        <li><strong>Account data</strong>: retained while your account is active and for up to <strong>12 months</strong> after closure, then deleted or anonymised.</li>
        <li><strong>Customer content</strong>: retained while your account is active; deleted within <strong>30 days</strong> of account deletion (or sooner on request).</li>
        <li><strong>Billing and invoicing records</strong>: retained for up to <strong>7 years</strong> to comply with tax and accounting laws.</li>
        <li><strong>Support messages</strong>: retained for up to <strong>24 months</strong>.</li>
        <li><strong>Server logs and security data</strong>: retained for up to <strong>90 days</strong>.</li>
      </ul>

      <h2>6. Your rights</h2>
      <p>Subject to applicable law, you have the right to access, rectify, erase, restrict, port, or object to processing of your personal data, and to withdraw consent. EU/UK residents may lodge a complaint with their local supervisory authority. To exercise any right, email <span className="font-mono">privacy@boostprofits.com</span>; we respond within 30 days.</p>

      <h2>7. Security</h2>
      <p>We apply appropriate technical and organisational measures including TLS 1.2+ in transit, AES-256 at rest, role-based access controls, and audit logging.</p>

      <h2>8. Cookies</h2>
      <p>We use essential cookies required for sign-in and session management, and a privacy-friendly first-party analytics cookie. We do not use third-party advertising trackers. You can manage cookies in your browser settings.</p>

      <h2>9. Contact</h2>
      <p>BoostProfits — <span className="font-mono">privacy@boostprofits.com</span>.</p>
    </LegalLayout>
  );
}
