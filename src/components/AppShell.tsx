import { Link, useRouterState } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import { Bell, Building2, ChevronDown, FileText, Home, LayoutDashboard, ListChecks, Menu, MessageSquare, PieChart, Plug, Receipt, Search, Settings, Users, Wallet, X } from "lucide-react";
import { Logo } from "./Logo";
import { Input } from "./ui/input";

const items = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/clients", label: "Clients", icon: Users },
  { to: "/app/projects", label: "Projects", icon: Building2 },
  { to: "/app/milestones", label: "Milestones", icon: ListChecks },
  { to: "/app/invoices", label: "Invoices", icon: FileText },
  { to: "/app/payments", label: "Payments", icon: Wallet },
  { to: "/app/messages", label: "Reminders", icon: MessageSquare },
  { to: "/app/analytics", label: "Analytics", icon: PieChart },
  { to: "/app/integrations", label: "Integrations", icon: Plug },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children, title, subtitle, actions }: { children: ReactNode; title?: string; subtitle?: string; actions?: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-sidebar transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Logo to="/app" />
          <button className="lg:hidden" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <nav className="space-y-0.5 p-3">
          {items.map((it) => {
            const active = it.exact ? path === it.to : path.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-cta text-primary-foreground shadow-elegant"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <it.icon className={`h-4 w-4 ${active ? "" : "text-muted-foreground group-hover:text-foreground"}`} />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute inset-x-3 bottom-3 rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold">Trial: 12 days left</p>
          <p className="mt-1 text-xs text-muted-foreground">Upgrade to keep automations running.</p>
          <Link to="/pricing" className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-cta px-3 py-2 text-xs font-semibold text-primary-foreground">Upgrade</Link>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/85 px-4 backdrop-blur md:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></button>
          <div className="relative hidden flex-1 max-w-md md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search clients, invoices, milestones..." />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-border px-2 py-1.5 hover:bg-muted">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cta text-xs font-bold text-primary-foreground">JD</span>
              <span className="hidden text-sm font-semibold sm:inline">Jane Doe</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          {(title || actions) && (
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                {title && <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h1>}
                {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
              </div>
              {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

export function StatCard({ label, value, delta, tone = "default", icon }: { label: string; value: string; delta?: string; tone?: "default" | "success" | "warning" | "destructive"; icon?: ReactNode }) {
  const toneCls =
    tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : tone === "destructive" ? "text-destructive" : "text-muted-foreground";
  return (
    <div className="card-premium p-5">
      <div className="flex items-center justify-between">
        <span className="text-eyebrow">{label}</span>
        {icon && <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">{icon}</span>}
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight tabular-nums">{value}</p>
      {delta && <p className={`mt-1 text-xs font-semibold ${toneCls}`}>{delta}</p>}
    </div>
  );
}

export function StatusPill({ status }: { status: "Paid" | "Sent" | "Overdue" | "Draft" | "Pending" | "Active" | "Closed" | "At risk" }) {
  const map: Record<string, string> = {
    Paid: "bg-success/12 text-success",
    Sent: "bg-primary/8 text-primary",
    Overdue: "bg-destructive/10 text-destructive",
    Draft: "bg-muted text-muted-foreground",
    Pending: "bg-warning/15 text-[oklch(0.45_0.15_60)]",
    Active: "bg-success/12 text-success",
    Closed: "bg-muted text-muted-foreground",
    "At risk": "bg-warning/15 text-[oklch(0.45_0.15_60)]",
  };
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${map[status]}`}>{status}</span>;
}
