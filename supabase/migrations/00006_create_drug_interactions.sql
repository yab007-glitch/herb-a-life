CREATE TABLE public.drug_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  herb_id UUID REFERENCES public.herbs(id) ON DELETE CASCADE NOT NULL,
  drug_name TEXT NOT NULL,
  rxcui TEXT,
  severity public.interaction_severity NOT NULL DEFAULT 'mild',
  description TEXT NOT NULL,
  mechanism TEXT,
  evidence_level TEXT,
  source TEXT,
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(herb_id, drug_name)
);

ALTER TABLE public.drug_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view interactions"
  ON public.drug_interactions FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage interactions"
  ON public.drug_interactions FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE TRIGGER drug_interactions_updated_at
  BEFORE UPDATE ON public.drug_interactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
