CREATE TABLE public.user_medications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  drug_name TEXT NOT NULL,
  rxcui TEXT,
  dosage TEXT,
  frequency TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.user_medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own medications"
  ON public.user_medications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own medications"
  ON public.user_medications FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own medications"
  ON public.user_medications FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own medications"
  ON public.user_medications FOR DELETE
  USING (user_id = auth.uid());

CREATE TRIGGER user_medications_updated_at
  BEFORE UPDATE ON public.user_medications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
