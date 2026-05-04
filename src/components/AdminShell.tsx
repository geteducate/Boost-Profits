import { Link, useRouterState } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import { Activity, ChevronDown, FileSearch, FileSpreadsheet, FileText, History, Inbox, LayoutDashboard, Menu, Radar, Settings2, Shield, ShieldAlert, Users2, X } from "lucide-react";
import { Logo } from "./Logo";

const items = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/leads", label: "Leads", icon: Inbox },
  { to: "/admin/visitors", label: "Visitors", icon: Activity },
  { to: "/admin/sources", label: "Sources / UTM", icon: Radar },
  { to: "/admin/forms", label: "Form submissions", icon: FileText },
  { to: "/admin/sheets", label: "Google Sheets sync", icon: FileSpreadsheet },
  { to: "/admin/users", label: "Users", icon: Users2 },
  { to: "/admin/content", label: "Content", icon: FileSearch },
  { to: "/admin/audit", label: "Audit logs", icon: History },
];

export function AdminShell({ children, title, subtitle, actions }: { children: ReactNode; title?: string; subtitle?: string; actions?: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-primary/[0.03]">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-primary text-primary-foreground transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Logo to="/admin" invert />
          <button className="lg:hidden text-primary-foreground" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <div className="px-5 pt-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold">
            <Shield className="h-3 w-3" /> Admin · Restricted
          </span>
        </div>
        <nav className="space-y-0.5 p-3 mt-2">
          {items.map((it) => {
            const active = it.exact ? path === it.to : path.startsWith(it.to);
            return (
              <Link key={it.to} to={it.to} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-white/15" : "text-primary-foreground/75 hover:bg-white/10 hover:text-primary-foreground"}`}>
                <it.icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/90 px-4 backdrop-blur md:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></button>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-warning" />
            <span className="text-sm font-semibold">Control room</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted">
              <Settings2 className="h-3.5 w-3.5" /> Workspace
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-border px-2 py-1.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cta text-xs font-bold text-primary-foreground">AD</span>
              <span className="hidden text-sm font-semibold sm:inline">Admin</span>
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
