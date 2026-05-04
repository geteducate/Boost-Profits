CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.user_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  integration TEXT NOT NULL,
  connected BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, integration)
);

ALTER TABLE public.user_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own integrations" ON public.user_integrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own integrations" ON public.user_integrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own integrations" ON public.user_integrations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own integrations" ON public.user_integrations FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_user_integrations_updated_at
BEFORE UPDATE ON public.user_integrations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();