CREATE TABLE public.interaction_checks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  herb_id UUID REFERENCES public.herbs(id) ON DELETE SET NULL,
  medications_checked JSONB NOT NULL DEFAULT '[]',
  results JSONB NOT NULL DEFAULT '[]',
  severity_summary public.interaction_severity,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.interaction_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own checks"
  ON public.interaction_checks FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own checks"
  ON public.interaction_checks FOR INSERT
  WITH CHECK (user_id = auth.uid());
