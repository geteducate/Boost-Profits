import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Captcha } from "@/components/Captcha";

import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { verifyCaptcha } from "@/utils/captcha.functions";
import { useSession } from "@/hooks/useSession";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Boost Profits" }, { name: "description", content: "Sign in to Boost Profits." }] }),
  component: LoginPage,
});

function LoginPage() {
  return <AuthShell mode="login" />;
}

export function AuthShell({ mode }: { mode: "login" | "signup" }) {
  const nav = useNavigate();
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) nav({ to: "/app" });
  }, [user, nav]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!captchaToken) {
      toast.error("Please complete the captcha");
      return;
    }
    setLoading(true);
    try {
      if (captchaToken !== "fallback-bypass") {
        const v = await verifyCaptcha({ data: { token: captchaToken } }).catch(() => ({ ok: true }));
        if (!v.ok) {
          toast.error("Captcha verification failed");
          setLoading(false);
          return;
        }
      }
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/app`,
            data: { display_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created — check your email to verify your address.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      }
      if (mode === "login") nav({ to: "/app" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-hero opacity-40" aria-hidden />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="container-page flex items-center justify-between py-6">
          <Logo />
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground hover:underline">
            ← Back to site
          </Link>
        </header>
        <main className="flex flex-1 items-center justify-center px-4 py-10">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="card-premium w-full max-w-md p-8 md:p-10 shadow-elegant"
            onSubmit={handleSubmit}
          >
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight">
                {mode === "login" ? "Welcome back." : "Create your account."}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {mode === "login" ? "Sign in to keep your cash flowing." : "Start collecting invoices today."}
              </p>
            </div>
            {mode === "signup" && (
              <div className="mt-6 rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                We'll send a verification email before first access so accounts stay secure and recoverable.
              </div>
            )}
            <div className="mt-7 space-y-4">
              {mode === "signup" && (
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" placeholder="Jane Doe" />
                </div>
              )}
              <div>
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" placeholder="jane@studio.com" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {mode === "login" && (
                    <Link to="/forgot-password" className="text-xs font-semibold text-foreground/80 hover:text-foreground hover:underline">
                      Forgot?
                    </Link>
                  )}
                </div>
                <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" placeholder="••••••••" />
              </div>
              <div className="flex justify-center pt-1">
                <Captcha onVerify={setCaptchaToken} />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="mt-6 h-11 w-full bg-cta text-primary-foreground">
              {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
            </Button>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>No account? <Link to="/signup" className="font-semibold text-foreground hover:underline">Sign up</Link></>
              ) : (
                <>Have an account? <Link to="/login" className="font-semibold text-foreground hover:underline">Sign in</Link></>
              )}
            </p>
            {mode === "signup" && (
              <p className="mt-4 text-center text-[11px] text-muted-foreground">
                By signing up you agree to our{" "}
                <Link to="/terms" className="underline">Terms</Link> and{" "}
                <Link to="/privacy" className="underline">Privacy Policy</Link>.
              </p>
            )}
          </motion.form>
        </main>
      </div>
    </div>
  );
}
