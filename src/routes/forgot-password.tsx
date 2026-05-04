import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Boost Profits" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    setSent(true);
    toast.success("Check your inbox for a reset link");
  }

  return (
    <div className="flex min-h-screen flex-col bg-hero p-8 md:p-12">
      <Logo />
      <div className="flex flex-1 items-center justify-center">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="card-premium w-full max-w-md p-8"
        >
          <h1 className="text-2xl font-extrabold tracking-tight">Reset your password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email and we'll send a secure link to reset your password.
          </p>
          {sent ? (
            <div className="mt-6 rounded-xl border border-success/30 bg-success/8 p-4 text-sm">
              We just emailed <span className="font-semibold">{email}</span>. The link expires in 1 hour.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <Button type="submit" disabled={loading} className="h-11 w-full bg-cta text-primary-foreground">
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </div>
          )}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/login" className="font-semibold text-foreground hover:underline">
              ← Back to sign in
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
