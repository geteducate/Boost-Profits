import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Captcha } from "@/components/Captcha";
import { LegalDialog } from "@/components/LegalDialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { verifyCaptcha } from "@/server/captcha.functions";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Boost Profits" }, { name: "description", content: "Sign in to Boost Profits." }] }),
  component: LoginPage,
});

function LoginPage() {
  return <AuthShell mode="login" />;
}

export function AuthShell({ mode }: { mode: "login" | "signup" }) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!captchaToken) {
      toast.error("Please complete the captcha");
      return;
    }
    setLoading(true);
    try {
      const v = await verifyCaptcha({ data: { token: captchaToken } });
      if (!v.ok) {
        toast.error("Captcha verification failed");
        setLoading(false);
        return;
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
        toast.success("Account created — welcome!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      }
      nav({ to: "/app" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col p-8 md:p-12">
        <Logo />
        <div className="flex flex-1 items-center justify-center">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-sm"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl font-extrabold tracking-tight">
              {mode === "login" ? "Welcome back." : "Create your account."}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "login" ? "Sign in to keep your cash flowing." : "Start collecting invoices today."}
            </p>
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
              <div className="pt-1">
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
                <LegalDialog kind="terms"><button type="button" className="underline">Terms</button></LegalDialog> and{" "}
                <LegalDialog kind="privacy"><button type="button" className="underline">Privacy Policy</button></LegalDialog>.
              </p>
            )}
          </motion.form>
        </div>
        <p className="text-xs text-muted-foreground"><Link to="/" className="hover:underline">← Back to site</Link></p>
      </div>
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <div className="absolute inset-0 bg-hero opacity-60" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex h-full flex-col justify-between p-12 text-primary-foreground"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">Boost Profits</p>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight">
              Get paid on time,<br />every milestone.
            </h2>
          </div>
          <div className="card-premium bg-background/95 p-6 text-foreground shadow-elegant">
            <p className="text-eyebrow">This week</p>
            <p className="mt-2 text-3xl font-extrabold tracking-tight">$3,840 recovered</p>
            <p className="mt-1 text-sm text-muted-foreground">86% on-time payment rate</p>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div initial={{ width: 0 }} animate={{ width: "86%" }} transition={{ duration: 1.2, delay: 0.6 }} className="h-full bg-success" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
