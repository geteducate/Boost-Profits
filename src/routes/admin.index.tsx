import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AdminShell } from "@/components/AdminShell";
import { StatCard, StatusPill } from "@/components/AppShell";
import { Activity, Inbox, MousePointerClick, Users2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — Boost Profits" }] }),
  component: AdminOverview,
});

type PV = { id: string; path: string; created_at: string; session_id: string; referrer: string | null };
type Lead = { id: string; name: string; email: string; company: string | null; created_at: string; status: string };

function AdminOverview() {
  const [views, setViews] = useState<PV[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [v, l] = await Promise.all([
        supabase.from("page_views").select("*").order("created_at", { ascending: false }).limit(500),
        supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(50),
      ]);
      if (!mounted) return;
      if (v.data) setViews(v.data as PV[]);
      if (l.data) setLeads(l.data as Lead[]);
    })();

    const ch = supabase
      .channel("admin-live")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "page_views" }, (p) => {
        setViews((prev) => [p.new as PV, ...prev].slice(0, 500));
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, (p) => {
        setLeads((prev) => [p.new as Lead, ...prev].slice(0, 50));
      })
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(ch);
    };
  }, []);

  const now = Date.now();
  const liveWindow = views.filter((v) => now - new Date(v.created_at).getTime() < 5 * 60 * 1000);
  const last24h = views.filter((v) => now - new Date(v.created_at).getTime() < 24 * 60 * 60 * 1000);
  const uniqueSessions24h = new Set(last24h.map((v) => v.session_id)).size;
  const liveSessions = new Set(liveWindow.map((v) => v.session_id)).size;
  const leads24h = leads.filter((l) => now - new Date(l.created_at).getTime() < 24 * 60 * 60 * 1000).length;

  // Top pages
  const counts = new Map<string, number>();
  last24h.forEach((v) => counts.set(v.path, (counts.get(v.path) ?? 0) + 1));
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  const topMax = top[0]?.[1] ?? 1;

  return (
    <AdminShell title="Control room" subtitle="Live signals across the funnel — streaming now.">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Live visitors (5m)" value={String(liveSessions)} delta="real-time" tone="success" icon={<Activity className="h-4 w-4" />} />
        <StatCard label="Sessions (24h)" value={String(uniqueSessions24h)} delta={`${last24h.length} views`} tone="success" icon={<Users2 className="h-4 w-4" />} />
        <StatCard label="Leads (24h)" value={String(leads24h)} delta={`${leads.length} total`} icon={<Inbox className="h-4 w-4" />} />
        <StatCard label="Total views" value={views.length.toLocaleString()} delta="last 500 tracked" tone="success" icon={<MousePointerClick className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="card-premium p-6 lg:col-span-2">
          <p className="text-eyebrow">Top pages (24h)</p>
          {top.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">No traffic yet — visit the site to see live data.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {top.map(([path, n]) => (
                <div key={path}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono">{path}</span>
                    <span className="text-muted-foreground tabular-nums">{n}</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(n / topMax) * 100}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-glow)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card-premium p-6">
          <p className="text-eyebrow">Recent leads</p>
          {leads.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">No leads yet — submit the contact form to see one stream in.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {leads.slice(0, 6).map((r) => (
                <motion.li
                  key={r.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{r.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.company || r.email}</p>
                  </div>
                  <StatusPill status={(r.status === "new" ? "Pending" : "Active") as any} />
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 card-premium p-6">
        <div className="flex items-center justify-between">
          <p className="text-eyebrow">Live activity stream</p>
          <span className="inline-flex items-center gap-1.5 text-xs text-success font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Streaming via realtime
          </span>
        </div>
        {views.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">Waiting for events…</p>
        ) : (
          <ul className="mt-4 max-h-72 space-y-1.5 overflow-y-auto text-sm">
            {views.slice(0, 30).map((v) => (
              <motion.li
                key={v.id}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between gap-3 rounded-md px-2 py-1.5 hover:bg-muted/40"
              >
                <span className="font-mono text-xs">{v.path}</span>
                <span className="text-xs text-muted-foreground">
                  {v.referrer ? new URL(v.referrer).hostname : "direct"} ·{" "}
                  {new Date(v.created_at).toLocaleTimeString()}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}
