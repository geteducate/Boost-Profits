import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col p-8 md:p-12">
        <Logo />
        <div className="flex flex-1 items-center justify-center">
          <form
            className="w-full max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                toast.success(mode === "login" ? "Welcome back" : "Account created");
                nav({ to: "/app" });
              }, 600);
            }}
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
                  <Input id="name" required className="mt-1.5" placeholder="Jane Doe" />
                </div>
              )}
              <div>
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" required className="mt-1.5" placeholder="jane@studio.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required className="mt-1.5" placeholder="••••••••" />
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
          </form>
        </div>
        <p className="text-xs text-muted-foreground"><Link to="/" className="hover:underline">← Back to site</Link></p>
      </div>
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <div className="absolute inset-0 bg-hero opacity-60" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">Boost Profits</p>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight">
              Get paid on time,<br />every milestone.
            </h2>
          </div>
          <div className="card-premium bg-background/95 p-6 text-foreground shadow-elegant">
            <p className="text-eyebrow">This week</p>
            <p className="mt-2 text-3xl font-extrabold tracking-tight">$12,480 recovered</p>
            <p className="mt-1 text-sm text-muted-foreground">93% on-time payment rate</p>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-success" style={{ width: "93%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
