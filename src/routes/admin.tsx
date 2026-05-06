import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabase } from "@/integrations/supabase/client";

const checkAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase: sb, userId } = context as { supabase: any; userId: string };
    const { data, error } = await sb
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (error) return { isAdmin: false };
    return { isAdmin: !!data };
  });

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    // Make sure session is hydrated on client before calling the auth-protected fn.
    if (typeof window !== "undefined") {
      const { data } = await supabase.auth.getUser();
      if (!data.user) throw redirect({ to: "/login" });
    }
    try {
      const result = await checkAdmin();
      if (!result.isAdmin) throw redirect({ to: "/app" });
    } catch (e) {
      if (e instanceof Response || (e as any)?.isRedirect) throw e;
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
});
