import { createServerFn } from "@tanstack/react-start";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; name?: string; tier: string }) => data)
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const resendKey = process.env.RESEND_API_KEY;
    if (!lovableKey || !resendKey) throw new Error("Email keys not configured");

    const tierName = data.tier.charAt(0).toUpperCase() + data.tier.slice(1);
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0f172a">
        <h1 style="font-size:22px;margin:0 0 12px">Welcome to Boost Profits${data.name ? `, ${data.name}` : ""}!</h1>
        <p style="color:#475569;line-height:1.6">Your <b>${tierName}</b> plan is active. You can now access your dashboard, automate milestone billing, and start collecting invoices faster.</p>
        <p style="margin:24px 0">
          <a href="https://boostprofits.app/app" style="background:#0f1b3d;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">Open dashboard</a>
        </p>
        <p style="color:#94a3b8;font-size:12px">Need help? Just reply to this email.</p>
      </div>`;

    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": resendKey,
      },
      body: JSON.stringify({
        from: "Boost Profits <onboarding@resend.dev>",
        to: [data.email],
        subject: "Welcome to Boost Profits 🎉",
        html,
      }),
    });
    if (!res.ok) {
      const t = await res.text();
      console.error("Resend error:", t);
      throw new Error("Failed to send welcome email");
    }
    return { ok: true };
  });
