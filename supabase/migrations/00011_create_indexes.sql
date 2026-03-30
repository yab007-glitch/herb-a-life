-- Herb search indexes
CREATE INDEX idx_herbs_slug ON public.herbs(slug);
CREATE INDEX idx_herbs_category ON public.herbs(category_id);
CREATE INDEX idx_herbs_name_trgm ON public.herbs USING gin(name gin_trgm_ops);
CREATE INDEX idx_herbs_scientific_trgm ON public.herbs USING gin(scientific_name gin_trgm_ops);
CREATE INDEX idx_herbs_published ON public.herbs(is_published) WHERE is_published = true;

-- Drug interaction indexes
CREATE INDEX idx_drug_interactions_herb ON public.drug_interactions(herb_id);
CREATE INDEX idx_drug_interactions_drug ON public.drug_interactions(drug_name);
CREATE INDEX idx_drug_interactions_rxcui ON public.drug_interactions(rxcui) WHERE rxcui IS NOT NULL;
CREATE INDEX idx_drug_interactions_severity ON public.drug_interactions(severity);

-- User data indexes
CREATE INDEX idx_user_medications_user ON public.user_medications(user_id);
CREATE INDEX idx_user_medications_active ON public.user_medications(user_id, is_active) WHERE is_active = true;
CREATE INDEX idx_interaction_checks_user ON public.interaction_checks(user_id);
CREATE INDEX idx_dosage_calculations_user ON public.dosage_calculations(user_id);
CREATE INDEX idx_chat_sessions_user ON public.chat_sessions(user_id);

-- Category indexes
CREATE INDEX idx_herb_categories_slug ON public.herb_categories(slug);
