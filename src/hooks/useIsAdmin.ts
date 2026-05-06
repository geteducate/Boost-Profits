import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "./useSession";

/**
 * Lightweight client-side check for the admin role.
 * The actual /admin route is gated server-side via `requireSupabaseAuth` +
 * a `user_roles` lookup — this hook is only used to decide whether to render
 * the discreet footer link.
 */
export function useIsAdmin() {
  const { user, loading: sessionLoading } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionLoading) return;
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!cancelled) {
        setIsAdmin(!!data);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, sessionLoading]);

  return { isAdmin, loading };
}
