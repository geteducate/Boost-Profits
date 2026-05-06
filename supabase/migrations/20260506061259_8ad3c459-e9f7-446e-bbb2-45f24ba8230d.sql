
-- 1. Realtime: remove sensitive tables from publication & restore default replica identity
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='leads'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.leads';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='page_views'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.page_views';
  END IF;
END $$;

ALTER TABLE public.leads REPLICA IDENTITY DEFAULT;
ALTER TABLE public.page_views REPLICA IDENTITY DEFAULT;

-- 2. user_roles: prevent self-grant. Block all client writes; only service_role can manage.
DROP POLICY IF EXISTS "No client inserts on user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "No client updates on user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "No client deletes on user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Service role manages user_roles" ON public.user_roles;

CREATE POLICY "Service role manages user_roles"
  ON public.user_roles
  AS PERMISSIVE
  FOR ALL
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- 3. leads: tighten the always-true insert policy. Submissions now go through a server fn using service_role.
DROP POLICY IF EXISTS "Anyone can submit lead" ON public.leads;

CREATE POLICY "Service role inserts leads"
  ON public.leads
  FOR INSERT
  TO public
  WITH CHECK (auth.role() = 'service_role');

-- 4. page_views: same — only server-side inserts (service_role)
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;

CREATE POLICY "Service role inserts page views"
  ON public.page_views
  FOR INSERT
  TO public
  WITH CHECK (auth.role() = 'service_role');

-- 5. Lock down SECURITY DEFINER helpers from direct API access.
-- RLS policies still call these internally regardless of EXECUTE grants.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_active_subscription(uuid, text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
