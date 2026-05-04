import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Set new password — Boost Profits" }] }),
  component: ResetPage,
});

function ResetPage() {
  const nav = useNavigate();
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase processes the recovery token from the URL hash and emits a
    // PASSWORD_RECOVERY event — listen so we know the user is allowed to update.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pwd.length < 8) return toast.error("Use at least 8 characters");
    if (pwd !== confirm) return toast.error("Passwords don't match");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pwd });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated — you're signed in");
    nav({ to: "/app" });
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
          <h1 className="text-2xl font-extrabold tracking-tight">Set a new password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {ready ? "Pick something strong — minimum 8 characters." : "Validating your reset link..."}
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="pwd">New password</Label>
              <Input id="pwd" type="password" required minLength={8} value={pwd} onChange={(e) => setPwd(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1.5" />
            </div>
            <Button type="submit" disabled={loading || !ready} className="h-11 w-full bg-cta text-primary-foreground">
              {loading ? "Updating..." : "Update password"}
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
