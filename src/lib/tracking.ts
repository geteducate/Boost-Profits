import { supabase } from "@/integrations/supabase/client";

const KEY = "bp_session_id";

function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}

export async function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    await supabase.from("page_views").insert({
      session_id: getSessionId(),
      path,
      referrer: document.referrer || null,
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      user_agent: navigator.userAgent.slice(0, 280),
    });
  } catch {
    /* ignore */
  }
}
