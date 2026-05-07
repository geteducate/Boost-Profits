import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { requireAdmin } from "@/integrations/supabase/admin-middleware";
import { supabase } from "@/integrations/supabase/client";

// Server-side admin verification. Throws 401/403 from middleware if the
// caller is not signed in or lacks the admin role. We swallow those into
// router redirects below so users get a clean UX instead of a raw error.
const verifyAdmin = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => ({ ok: true as const }));

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    // Hydrate the browser session first so the auth-protected server fn
    // receives a valid bearer token on the very first navigation.
    if (typeof window !== "undefined") {
      const { data } = await supabase.auth.getUser();
      if (!data.user) throw redirect({ to: "/login" });
    }
    try {
      await verifyAdmin();
    } catch (e) {
      if (e instanceof Response || (e as any)?.isRedirect) {
        const status = (e as Response)?.status;
        if (status === 403) throw redirect({ to: "/app" });
        throw redirect({ to: "/login" });
      }
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
});
