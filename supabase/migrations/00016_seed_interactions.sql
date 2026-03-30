-- ============================================================================
-- SEED: 150+ Herb-Drug Interactions
-- Generated for HerbWise medical herbs database
-- ============================================================================

-- ============================================================================
-- ST. JOHN'S WORT INTERACTIONS (most extensive - major CYP3A4 inducer)
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Fluoxetine (Prozac)',
  NULL,
  'contraindicated',
  'Combining St. John''s Wort with SSRIs can cause serotonin syndrome, a potentially life-threatening condition characterized by agitation, confusion, rapid heart rate, high blood pressure, and hyperthermia.',
  'Both St. John''s Wort and SSRIs increase serotonin levels. Combined use leads to excessive serotonergic activity in the central nervous system, risking serotonin syndrome.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Sertraline (Zoloft)',
  NULL,
  'contraindicated',
  'Concurrent use with sertraline significantly increases the risk of serotonin syndrome. Multiple case reports document this dangerous interaction.',
  'Additive serotonergic effects through inhibition of serotonin reuptake by both agents.',
  'well-documented',
  'WHO Monographs'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Paroxetine (Paxil)',
  NULL,
  'contraindicated',
  'St. John''s Wort combined with paroxetine can cause serotonin syndrome. This combination should be strictly avoided.',
  'Both compounds increase synaptic serotonin levels through different mechanisms, causing dangerous serotonergic excess.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Oral Contraceptives',
  NULL,
  'severe',
  'St. John''s Wort significantly reduces the effectiveness of birth control pills, leading to breakthrough bleeding and unintended pregnancies. Multiple case reports of contraceptive failure exist.',
  'Hyperforin in St. John''s Wort induces CYP3A4 and P-glycoprotein, increasing metabolism of ethinyl estradiol and progestins, reducing their plasma levels by up to 50%.',
  'well-documented',
  'WHO Monographs'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Warfarin (Coumadin)',
  NULL,
  'severe',
  'St. John''s Wort decreases warfarin effectiveness by increasing its metabolism, potentially leading to subtherapeutic INR levels and increased risk of blood clots.',
  'Induction of CYP2C9 and CYP3A4 enzymes accelerates warfarin metabolism, reducing anticoagulant effect.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Cyclosporine',
  NULL,
  'contraindicated',
  'St. John''s Wort dramatically reduces cyclosporine blood levels, potentially causing organ transplant rejection. This interaction has caused documented transplant failures.',
  'Strong induction of CYP3A4 and P-glycoprotein increases cyclosporine metabolism and efflux, reducing plasma levels by up to 50%.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Tacrolimus',
  NULL,
  'contraindicated',
  'St. John''s Wort significantly reduces tacrolimus levels, risking organ rejection in transplant patients.',
  'CYP3A4 induction increases tacrolimus metabolism, drastically lowering blood concentrations.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Digoxin',
  NULL,
  'severe',
  'St. John''s Wort reduces digoxin levels by approximately 25%, potentially reducing its cardiac effects.',
  'Induction of P-glycoprotein in the intestine reduces digoxin absorption and increases renal excretion.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'HIV Protease Inhibitors (Indinavir)',
  NULL,
  'contraindicated',
  'St. John''s Wort reduces HIV protease inhibitor levels by 57% or more, potentially leading to treatment failure, viral rebound, and drug resistance.',
  'Potent CYP3A4 and P-glycoprotein induction dramatically increases drug metabolism and decreases absorption.',
  'well-documented',
  'WHO Monographs'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Citalopram (Celexa)',
  NULL,
  'contraindicated',
  'Risk of serotonin syndrome when combined with citalopram, an SSRI antidepressant.',
  'Additive serotonergic activity from both compounds increasing synaptic serotonin.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Simvastatin (Zocor)',
  NULL,
  'severe',
  'St. John''s Wort reduces simvastatin levels by approximately 50%, significantly diminishing its cholesterol-lowering effect.',
  'CYP3A4 induction increases simvastatin metabolism.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Omeprazole (Prilosec)',
  NULL,
  'moderate',
  'St. John''s Wort may reduce the effectiveness of omeprazole by increasing its metabolism.',
  'Induction of CYP2C19 and CYP3A4 accelerates omeprazole metabolism.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Irinotecan (Camptosar)',
  NULL,
  'contraindicated',
  'St. John''s Wort reduces irinotecan levels by approximately 42%, severely compromising chemotherapy effectiveness.',
  'CYP3A4 induction increases conversion of irinotecan to inactive metabolites.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'st-johns-wort'),
  'Alprazolam (Xanax)',
  NULL,
  'severe',
  'St. John''s Wort may reduce alprazolam efficacy through increased metabolism.',
  'CYP3A4 induction accelerates benzodiazepine metabolism.',
  'moderate-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- GINKGO BILOBA INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginkgo-biloba'),
  'Warfarin (Coumadin)',
  NULL,
  'severe',
  'Ginkgo biloba may increase the anticoagulant effect of warfarin, significantly increasing the risk of bleeding including intracranial hemorrhage.',
  'Ginkgolides inhibit platelet-activating factor (PAF), adding to warfarin''s anticoagulant action. May also affect CYP metabolism of warfarin.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginkgo-biloba'),
  'Aspirin',
  NULL,
  'moderate',
  'Ginkgo combined with aspirin may increase bleeding risk. Cases of spontaneous bleeding including hyphema (eye bleeding) have been reported.',
  'Additive antiplatelet effects; ginkgolides inhibit PAF while aspirin inhibits cyclooxygenase.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginkgo-biloba'),
  'Ibuprofen (Advil)',
  NULL,
  'moderate',
  'Combining ginkgo with ibuprofen may increase bleeding risk. A case of fatal intracerebral hemorrhage has been reported with this combination.',
  'Both agents inhibit platelet aggregation through different mechanisms, creating additive antiplatelet effects.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginkgo-biloba'),
  'Clopidogrel (Plavix)',
  NULL,
  'severe',
  'Ginkgo may enhance the antiplatelet effects of clopidogrel, increasing bleeding risk.',
  'Additive inhibition of platelet aggregation through PAF antagonism (ginkgo) and ADP receptor blockade (clopidogrel).',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginkgo-biloba'),
  'Anticonvulsants (Valproic acid)',
  NULL,
  'moderate',
  'Ginkgo may reduce the effectiveness of anticonvulsant medications, potentially increasing seizure risk.',
  'Ginkgo toxin (4-O-methylpyridoxine) may reduce seizure threshold and counteract anticonvulsant effects.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginkgo-biloba'),
  'Trazodone',
  NULL,
  'moderate',
  'A case of coma was reported in an elderly patient taking ginkgo with trazodone. The combination may enhance sedative effects.',
  'Possible additive GABAergic effects or pharmacokinetic interaction.',
  'limited-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- GARLIC INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'garlic'),
  'Warfarin (Coumadin)',
  NULL,
  'severe',
  'Garlic supplements may increase anticoagulant effect of warfarin and increase bleeding risk. Cases of increased INR and bleeding have been reported.',
  'Garlic has antiplatelet and fibrinolytic activity that adds to warfarin''s anticoagulant effect. Ajoene and allicin inhibit platelet aggregation.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'garlic'),
  'Saquinavir',
  NULL,
  'severe',
  'Garlic supplements reduce saquinavir blood levels by approximately 51%, potentially compromising HIV treatment.',
  'Garlic induces CYP3A4 and possibly P-glycoprotein, increasing saquinavir metabolism.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'garlic'),
  'Aspirin',
  NULL,
  'moderate',
  'Garlic may increase the antiplatelet effects of aspirin, elevating bleeding risk.',
  'Additive inhibition of platelet aggregation; garlic inhibits via ajoene while aspirin inhibits via COX.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'garlic'),
  'Isoniazid',
  NULL,
  'moderate',
  'Garlic may reduce isoniazid absorption and blood levels, potentially reducing its effectiveness for tuberculosis treatment.',
  'Garlic may reduce gastrointestinal absorption of isoniazid.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'garlic'),
  'Cyclosporine',
  NULL,
  'moderate',
  'Garlic supplements may reduce cyclosporine levels, potentially increasing transplant rejection risk.',
  'Possible CYP3A4 induction and P-glycoprotein effects reducing cyclosporine bioavailability.',
  'limited-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- GINSENG INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginseng'),
  'Warfarin (Coumadin)',
  NULL,
  'severe',
  'Ginseng may decrease the effectiveness of warfarin, leading to reduced INR values and increased clotting risk.',
  'Ginsenosides may have antiplatelet effects but also induce CYP enzymes that metabolize warfarin, leading to unpredictable INR changes.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginseng'),
  'Insulin',
  NULL,
  'moderate',
  'Ginseng may enhance insulin''s blood sugar-lowering effects, increasing risk of hypoglycemia.',
  'Ginsenosides may increase insulin sensitivity and glucose uptake, adding to insulin''s hypoglycemic effect.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginseng'),
  'Metformin',
  NULL,
  'moderate',
  'Ginseng may enhance blood sugar-lowering effects of metformin, requiring dose adjustments and close monitoring.',
  'Additive hypoglycemic effects through increased insulin sensitivity and glucose metabolism.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginseng'),
  'Phenelzine (Nardil) - MAOI',
  NULL,
  'severe',
  'Combining ginseng with MAO inhibitors can cause headaches, tremors, and manic episodes.',
  'Ginseng may have stimulatory and serotonergic effects that interact with MAO inhibition.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginseng'),
  'Nifedipine',
  NULL,
  'moderate',
  'Ginseng may increase nifedipine blood levels, potentially increasing its blood pressure-lowering and side effects.',
  'Possible CYP3A4 inhibition slowing nifedipine metabolism.',
  'limited-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- VALERIAN INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'valerian'),
  'Diazepam (Valium)',
  NULL,
  'severe',
  'Valerian may enhance the sedative effects of benzodiazepines, causing excessive drowsiness, respiratory depression, and impaired motor function.',
  'Valerian acts on GABA receptors similarly to benzodiazepines, creating additive central nervous system depression.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'valerian'),
  'Lorazepam (Ativan)',
  NULL,
  'severe',
  'Combining valerian with lorazepam increases risk of excessive sedation and CNS depression.',
  'Additive GABAergic effects enhance CNS depression.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'valerian'),
  'Zolpidem (Ambien)',
  NULL,
  'moderate',
  'Valerian may enhance sedative effects of zolpidem, increasing drowsiness and next-day impairment.',
  'Both compounds enhance GABA activity, potentially creating excessive sedation.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'valerian'),
  'Alcohol',
  NULL,
  'moderate',
  'Valerian combined with alcohol may cause additive CNS depression, increasing drowsiness and impaired coordination.',
  'Both valerian and alcohol enhance GABAergic inhibition in the central nervous system.',
  'well-documented',
  'WHO Monographs'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'valerian'),
  'Alprazolam (Xanax)',
  NULL,
  'severe',
  'Concurrent use of valerian and alprazolam may lead to excessive sedation and respiratory depression.',
  'Additive GABA-A receptor modulation causing enhanced CNS depression.',
  'moderate-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- TURMERIC / CURCUMIN INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'turmeric'),
  'Warfarin (Coumadin)',
  NULL,
  'severe',
  'Turmeric and curcumin may enhance anticoagulant effects of warfarin, increasing bleeding risk.',
  'Curcumin inhibits platelet aggregation and may inhibit CYP enzymes involved in warfarin metabolism, potentially increasing warfarin levels.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'turmeric'),
  'Clopidogrel (Plavix)',
  NULL,
  'moderate',
  'Turmeric may increase the antiplatelet effect of clopidogrel, raising bleeding risk.',
  'Curcumin inhibits platelet aggregation through COX and thromboxane inhibition, adding to clopidogrel''s antiplatelet effect.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'turmeric'),
  'Sulfasalazine',
  NULL,
  'moderate',
  'Turmeric may increase sulfasalazine blood levels, potentially increasing its therapeutic effects and side effects.',
  'Curcumin may inhibit P-glycoprotein and BCRP transporters, reducing sulfasalazine efflux and increasing its absorption.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'turmeric'),
  'Tacrolimus',
  NULL,
  'moderate',
  'Curcumin may increase tacrolimus blood levels, requiring monitoring in transplant patients.',
  'Curcumin inhibits CYP3A4 and P-glycoprotein, potentially reducing tacrolimus metabolism and increasing absorption.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'turmeric'),
  'Metformin',
  NULL,
  'mild',
  'Turmeric may enhance the blood sugar-lowering effect of metformin, with potential benefit but requiring monitoring.',
  'Curcumin may improve insulin sensitivity and glucose metabolism, adding to metformin''s hypoglycemic effects.',
  'moderate-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- KAVA INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'kava'),
  'Alprazolam (Xanax)',
  NULL,
  'severe',
  'Kava combined with benzodiazepines may cause excessive sedation, coma, or respiratory depression. A case of coma has been reported with this combination.',
  'Kava kavapyrones enhance GABAergic activity, producing additive CNS depression with benzodiazepines.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'kava'),
  'Levodopa',
  NULL,
  'severe',
  'Kava may reduce the effectiveness of levodopa, worsening Parkinsonian symptoms. Case reports document worsening of symptoms.',
  'Kava may have dopamine antagonist properties that counteract levodopa''s dopaminergic effects.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'kava'),
  'Acetaminophen (Tylenol)',
  NULL,
  'severe',
  'Kava combined with acetaminophen may increase risk of liver damage, as both are hepatotoxic.',
  'Both kava and acetaminophen are metabolized by the liver and can cause hepatotoxicity. Combined use may overwhelm liver detoxification pathways.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'kava'),
  'Alcohol',
  NULL,
  'severe',
  'Combining kava with alcohol significantly increases the risk of liver damage and excessive CNS depression.',
  'Additive hepatotoxicity and GABAergic CNS depression from both substances.',
  'well-documented',
  'WHO Monographs'
);

-- ============================================================================
-- ECHINACEA INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'echinacea'),
  'Cyclosporine',
  NULL,
  'severe',
  'Echinacea''s immune-stimulating properties may counteract the immunosuppressive effects of cyclosporine, risking organ rejection.',
  'Echinacea activates macrophages and T-cells, directly opposing cyclosporine''s immunosuppressive mechanism.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'echinacea'),
  'Tacrolimus',
  NULL,
  'severe',
  'Echinacea may reduce the effectiveness of tacrolimus by stimulating the immune system that tacrolimus is designed to suppress.',
  'Immune stimulation counteracts pharmacological immunosuppression.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'echinacea'),
  'Methotrexate',
  NULL,
  'moderate',
  'Echinacea may interfere with methotrexate''s immunosuppressive effects and potentially increase hepatotoxicity risk with prolonged use.',
  'Immune stimulation may oppose methotrexate''s immunosuppressive action. Both may affect liver function.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'echinacea'),
  'Corticosteroids (Prednisone)',
  NULL,
  'moderate',
  'Echinacea may partially counteract the immunosuppressive effects of corticosteroids.',
  'Echinacea''s immunostimulatory effects oppose the immunosuppressive mechanism of corticosteroids.',
  'moderate-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- LICORICE ROOT INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'licorice-root'),
  'Hydrochlorothiazide (HCTZ)',
  NULL,
  'severe',
  'Licorice may worsen potassium loss caused by thiazide diuretics, potentially leading to dangerous hypokalemia, cardiac arrhythmias, and muscle weakness.',
  'Glycyrrhizin inhibits 11-beta-hydroxysteroid dehydrogenase, causing cortisol to activate mineralocorticoid receptors, promoting potassium excretion. This adds to diuretic potassium wasting.',
  'well-documented',
  'WHO Monographs'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'licorice-root'),
  'Furosemide (Lasix)',
  NULL,
  'severe',
  'Licorice combined with loop diuretics can cause severe potassium depletion and dangerous hypokalemia.',
  'Additive potassium-wasting effects through different mechanisms: licorice via mineralocorticoid pathway, furosemide via renal tubular effects.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'licorice-root'),
  'Digoxin',
  NULL,
  'severe',
  'Licorice-induced hypokalemia can increase sensitivity to digoxin toxicity, potentially causing dangerous cardiac arrhythmias.',
  'Glycyrrhizin causes potassium depletion, and low potassium increases myocardial sensitivity to digoxin toxicity.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'licorice-root'),
  'Spironolactone',
  NULL,
  'severe',
  'Licorice may counteract the effects of spironolactone, reducing its blood pressure-lowering and potassium-sparing effects.',
  'Licorice''s mineralocorticoid effects directly oppose spironolactone''s aldosterone antagonism.',
  'well-documented',
  'WHO Monographs'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'licorice-root'),
  'Antihypertensive medications (general)',
  NULL,
  'moderate',
  'Licorice root can cause sodium retention and potassium loss, raising blood pressure and counteracting antihypertensive medication effects.',
  'Glycyrrhizin''s pseudo-aldosteronism effect causes sodium retention and water retention, elevating blood pressure.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'licorice-root'),
  'Prednisolone',
  NULL,
  'moderate',
  'Licorice may increase prednisolone levels by inhibiting its metabolism, enhancing both therapeutic effects and side effects.',
  'Glycyrrhizin inhibits 11-beta-hydroxysteroid dehydrogenase, slowing the conversion of prednisolone to inactive prednisone.',
  'moderate-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- GREEN TEA INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'green-tea'),
  'Warfarin (Coumadin)',
  NULL,
  'severe',
  'Green tea contains vitamin K which can reduce warfarin effectiveness. Large or inconsistent intake may cause significant INR fluctuations.',
  'Vitamin K in green tea antagonizes warfarin''s mechanism of action by providing substrate for vitamin K-dependent clotting factor synthesis.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'green-tea'),
  'Nadolol',
  NULL,
  'moderate',
  'Green tea may reduce the absorption and blood levels of nadolol, potentially reducing its blood pressure-lowering effect.',
  'EGCG in green tea may inhibit OATP1A2 transporter, reducing nadolol intestinal absorption.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'green-tea'),
  'Atorvastatin (Lipitor)',
  NULL,
  'mild',
  'Green tea catechins may increase atorvastatin blood levels, potentially increasing both effectiveness and side effects.',
  'EGCG may inhibit OATP1B1 and OATP1B3 transporters involved in hepatic statin uptake.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'green-tea'),
  'Folic Acid Supplements',
  NULL,
  'mild',
  'Green tea catechins may reduce folic acid absorption, potentially reducing effectiveness of supplementation.',
  'EGCG inhibits dihydrofolate reductase, potentially reducing folate bioavailability.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'green-tea'),
  'Iron supplements',
  NULL,
  'moderate',
  'Green tea polyphenols can reduce iron absorption by up to 64%, potentially worsening iron deficiency.',
  'Catechins and tannins chelate non-heme iron in the gut, forming insoluble complexes that cannot be absorbed.',
  'well-documented',
  'Clinical Studies'
);

-- ============================================================================
-- MILK THISTLE INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'milk-thistle'),
  'Methotrexate',
  NULL,
  'moderate',
  'Milk thistle may affect methotrexate metabolism. While it may provide liver protection, it could also alter drug levels.',
  'Silymarin inhibits CYP3A4 and CYP2C9, potentially altering methotrexate metabolism.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'milk-thistle'),
  'Diazepam (Valium)',
  NULL,
  'mild',
  'Milk thistle may slow the metabolism of diazepam, potentially increasing its sedative effects.',
  'Silymarin inhibits CYP3A4 and CYP2C19, which are involved in diazepam metabolism.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'milk-thistle'),
  'Simvastatin',
  NULL,
  'mild',
  'Milk thistle may slightly increase simvastatin levels through enzyme inhibition.',
  'Silymarin may inhibit CYP3A4 and OATP1B1 transporters involved in statin metabolism and uptake.',
  'limited-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- ASHWAGANDHA INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ashwagandha'),
  'Levothyroxine (Synthroid)',
  NULL,
  'moderate',
  'Ashwagandha may increase thyroid hormone production, potentially causing excessive thyroid levels in patients taking thyroid medication.',
  'Ashwagandha may stimulate thyroid function by increasing T3 and T4 production, adding to exogenous thyroid hormone.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ashwagandha'),
  'Immunosuppressants (general)',
  NULL,
  'moderate',
  'Ashwagandha has immune-stimulating properties that may counteract the effects of immunosuppressive medications.',
  'Ashwagandha enhances natural killer cell activity and other immune parameters, opposing immunosuppression.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ashwagandha'),
  'Benzodiazepines (general)',
  NULL,
  'moderate',
  'Ashwagandha may enhance the sedative effects of benzodiazepines, increasing drowsiness.',
  'Ashwagandha has GABAergic activity that may potentiate benzodiazepine sedation.',
  'limited-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- BERBERINE INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'berberine'),
  'Metformin',
  NULL,
  'moderate',
  'Berberine has similar blood sugar-lowering mechanisms to metformin. Combining them may cause excessive blood sugar reduction (hypoglycemia).',
  'Both activate AMP-activated protein kinase (AMPK), creating additive hypoglycemic effects.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'berberine'),
  'Cyclosporine',
  NULL,
  'severe',
  'Berberine significantly increases cyclosporine blood levels (by nearly 100% in one study), increasing risk of toxicity.',
  'Berberine inhibits CYP3A4 and P-glycoprotein, dramatically reducing cyclosporine metabolism and efflux.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'berberine'),
  'Losartan',
  NULL,
  'moderate',
  'Berberine may increase losartan levels and its active metabolite, potentially enhancing blood pressure effects.',
  'Berberine inhibits CYP2C9 and CYP3A4 involved in losartan metabolism.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'berberine'),
  'Dextromethorphan',
  NULL,
  'moderate',
  'Berberine may increase dextromethorphan blood levels by inhibiting its metabolism.',
  'Berberine inhibits CYP2D6, which is the primary enzyme responsible for dextromethorphan metabolism.',
  'moderate-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- GINGER INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginger'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'High-dose ginger supplements may increase bleeding risk when combined with warfarin.',
  'Gingerols inhibit thromboxane synthase, reducing platelet aggregation. This adds to warfarin''s anticoagulant effect.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginger'),
  'Nifedipine',
  NULL,
  'mild',
  'Ginger may enhance the antiplatelet and blood pressure-lowering effects of nifedipine.',
  'Ginger has calcium channel blocking properties that may be additive with nifedipine.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'ginger'),
  'Metformin',
  NULL,
  'mild',
  'Ginger may modestly enhance the blood sugar-lowering effect of metformin.',
  'Ginger may improve insulin sensitivity and reduce insulin resistance, adding to metformin''s effects.',
  'limited-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- SAW PALMETTO INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'saw-palmetto'),
  'Finasteride (Proscar/Propecia)',
  NULL,
  'moderate',
  'Saw palmetto may have additive effects with finasteride for BPH, potentially increasing both benefits and side effects.',
  'Both saw palmetto and finasteride inhibit 5-alpha-reductase, creating additive anti-androgenic effects.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'saw-palmetto'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Saw palmetto may have mild antiplatelet effects that could increase bleeding risk with warfarin.',
  'Possible inhibition of cyclooxygenase and antiplatelet activity that adds to warfarin''s anticoagulant effect.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'saw-palmetto'),
  'Oral Contraceptives',
  NULL,
  'moderate',
  'Saw palmetto has anti-androgenic effects that could theoretically interact with hormonal contraceptives.',
  'Inhibition of 5-alpha-reductase and androgen receptor activity may affect hormonal balance.',
  'limited-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- CRANBERRY INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'cranberry'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Cranberry products may increase the anticoagulant effect of warfarin. Several cases of increased INR and bleeding have been reported, including one fatality.',
  'Cranberry flavonoids may inhibit CYP2C9, slowing warfarin metabolism. The interaction appears dose-dependent and more significant with cranberry juice concentrate.',
  'well-documented',
  'Natural Medicines Database'
);

-- ============================================================================
-- EVENING PRIMROSE OIL INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'evening-primrose'),
  'Phenothiazines (Chlorpromazine)',
  NULL,
  'severe',
  'Evening primrose oil may lower the seizure threshold, increasing seizure risk in patients taking phenothiazines.',
  'GLA in evening primrose oil may reduce seizure threshold, and phenothiazines also lower seizure threshold, creating additive risk.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'evening-primrose'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Evening primrose oil may have mild anticoagulant properties that add to warfarin''s effect.',
  'GLA and its metabolites may inhibit platelet aggregation.',
  'limited-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- DONG QUAI INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'dong-quai'),
  'Warfarin (Coumadin)',
  NULL,
  'severe',
  'Dong quai may significantly enhance anticoagulant effects of warfarin. Cases of markedly elevated INR have been documented.',
  'Coumarins in dong quai have inherent anticoagulant activity, and the herb may also inhibit platelet aggregation.',
  'well-documented',
  'Clinical Studies'
);

-- ============================================================================
-- REISHI MUSHROOM INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'reishi'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Reishi may have antiplatelet effects that increase bleeding risk when combined with warfarin.',
  'Ganoderic acids have been shown to inhibit platelet aggregation, adding to warfarin''s anticoagulant effect.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'reishi'),
  'Immunosuppressants',
  NULL,
  'moderate',
  'Reishi''s immune-modulating properties may interfere with immunosuppressive medications.',
  'Reishi polysaccharides and triterpenes modulate immune cell activity, potentially opposing pharmacological immunosuppression.',
  'moderate-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- CHAMOMILE INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'chamomile'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Chamomile contains coumarin compounds that may enhance warfarin''s anticoagulant effect. Cases of bleeding have been reported.',
  'Coumarin constituents in chamomile may have mild anticoagulant activity and inhibit platelet aggregation.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'chamomile'),
  'Cyclosporine',
  NULL,
  'moderate',
  'Chamomile may increase cyclosporine levels through enzyme inhibition.',
  'Chamomile constituents may inhibit CYP3A4, reducing cyclosporine metabolism.',
  'limited-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- PEPPERMINT INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'peppermint'),
  'Cyclosporine',
  NULL,
  'moderate',
  'Peppermint oil may increase cyclosporine absorption and blood levels.',
  'Menthol may inhibit CYP3A4 and P-glycoprotein in the intestine, increasing cyclosporine bioavailability.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'peppermint'),
  'Felodipine',
  NULL,
  'mild',
  'Peppermint oil may increase felodipine blood levels when taken concurrently.',
  'Menthol may inhibit CYP3A4 in the intestinal wall, reducing first-pass metabolism of felodipine.',
  'limited-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- BLACK COHOSH INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'black-cohosh'),
  'Hepatotoxic medications (general)',
  NULL,
  'moderate',
  'Black cohosh has been associated with rare cases of liver damage. Combining with other hepatotoxic drugs may increase liver injury risk.',
  'Potential additive hepatotoxicity when combined with drugs that stress liver function.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'black-cohosh'),
  'Tamoxifen',
  NULL,
  'moderate',
  'Black cohosh may interact with tamoxifen in hormone-sensitive conditions. The nature of interaction is uncertain.',
  'Unclear mechanism; black cohosh may have selective estrogen receptor modulator-like activity.',
  'limited-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- HAWTHORN INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'hawthorn'),
  'Digoxin',
  NULL,
  'moderate',
  'Hawthorn may enhance the effects of digoxin on the heart, potentially increasing both benefits and toxicity risk.',
  'Hawthorn contains cardioactive flavonoids that may have additive positive inotropic effects with digoxin.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'hawthorn'),
  'Beta-blockers (Metoprolol)',
  NULL,
  'moderate',
  'Hawthorn may enhance the blood pressure-lowering effects of beta-blockers, potentially causing hypotension.',
  'Additive negative chronotropic and vasodilatory effects from hawthorn procyanidins combined with beta-blockade.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'hawthorn'),
  'Phosphodiesterase-5 inhibitors (Sildenafil)',
  NULL,
  'moderate',
  'Hawthorn combined with PDE5 inhibitors may cause additive blood pressure lowering and increased hypotension risk.',
  'Both hawthorn and PDE5 inhibitors promote vasodilation, creating additive hypotensive effects.',
  'limited-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- ELDERBERRY INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'elderberry'),
  'Immunosuppressants (general)',
  NULL,
  'moderate',
  'Elderberry stimulates the immune system and may counteract immunosuppressive medications used after organ transplant or for autoimmune conditions.',
  'Elderberry increases cytokine production (IL-1 beta, TNF-alpha, IL-6, IL-8) and activates immune cells, opposing pharmacological immunosuppression.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'elderberry'),
  'Diabetes medications',
  NULL,
  'mild',
  'Elderberry may have mild blood sugar-lowering effects that could add to diabetes medication effects.',
  'Anthocyanins may improve insulin sensitivity and glucose uptake.',
  'limited-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- FEVERFEW INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'feverfew'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Feverfew may increase bleeding risk when combined with warfarin due to antiplatelet effects.',
  'Parthenolide inhibits platelet aggregation and may affect prostaglandin synthesis, adding to warfarin''s anticoagulant activity.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'feverfew'),
  'NSAIDs (Ibuprofen)',
  NULL,
  'mild',
  'Feverfew may have additive antiplatelet effects with NSAIDs, potentially increasing bleeding risk.',
  'Both feverfew and NSAIDs inhibit prostaglandin synthesis, creating additive antiplatelet effects.',
  'limited-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- LAVENDER INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'lavender'),
  'Sedatives and CNS depressants',
  NULL,
  'moderate',
  'Lavender (especially oral preparations like Silexan) may enhance the sedative effects of CNS depressants.',
  'Linalool has GABAergic and sedative properties that may be additive with other CNS depressants.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'lavender'),
  'Chloral Hydrate',
  NULL,
  'moderate',
  'Lavender may enhance and prolong the sedative effects of chloral hydrate.',
  'Additive CNS depressant effects through GABAergic mechanisms.',
  'limited-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- PASSIONFLOWER INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'passionflower'),
  'Sedatives and Benzodiazepines',
  NULL,
  'moderate',
  'Passionflower may enhance sedative effects of benzodiazepines and other CNS depressants.',
  'Chrysin and other flavonoids bind to GABA-A receptors, creating additive sedation with benzodiazepines.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'passionflower'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Passionflower contains coumarin derivatives that may enhance warfarin''s anticoagulant effect.',
  'Coumarin constituents may have additive anticoagulant activity with warfarin.',
  'limited-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- BOSWELLIA INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'boswellia'),
  'Ibuprofen and NSAIDs',
  NULL,
  'mild',
  'Boswellia may have additive anti-inflammatory effects with NSAIDs, potentially allowing NSAID dose reduction.',
  'Boswellic acids inhibit 5-lipoxygenase while NSAIDs inhibit cyclooxygenase, providing complementary anti-inflammatory pathways.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'boswellia'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Boswellia may have mild antiplatelet effects that increase bleeding risk with warfarin.',
  'Boswellic acids may inhibit platelet aggregation, adding to warfarin''s anticoagulant activity.',
  'limited-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- RHODIOLA INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'rhodiola'),
  'Antidepressants (SSRIs)',
  NULL,
  'moderate',
  'Rhodiola may have mild serotonergic and monoamine effects that could interact with antidepressants.',
  'Rhodiola may inhibit MAO-A and MAO-B and affect serotonin transport, potentially creating additive serotonergic effects.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'rhodiola'),
  'Antihypertensives',
  NULL,
  'mild',
  'Rhodiola may have mild blood pressure-lowering effects that add to antihypertensive medications.',
  'Rhodiola may cause vasodilation and reduce sympathetic nervous system activity.',
  'limited-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- FENUGREEK INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'fenugreek'),
  'Insulin',
  NULL,
  'moderate',
  'Fenugreek may enhance the blood sugar-lowering effect of insulin, increasing hypoglycemia risk.',
  '4-Hydroxyisoleucine in fenugreek directly stimulates insulin secretion and improves insulin sensitivity.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'fenugreek'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Fenugreek contains coumarin compounds that may enhance warfarin''s anticoagulant effect.',
  'Coumarin derivatives in fenugreek may have additive anticoagulant activity.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'fenugreek'),
  'Glipizide',
  NULL,
  'moderate',
  'Fenugreek may enhance blood sugar-lowering effects of sulfonylureas, increasing hypoglycemia risk.',
  'Additive hypoglycemic effects through insulin secretion stimulation and improved insulin sensitivity.',
  'moderate-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- CINNAMON INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'cinnamon'),
  'Metformin',
  NULL,
  'mild',
  'Cinnamon may enhance blood sugar-lowering effects of metformin. Beneficial but requires monitoring.',
  'Cinnamon polyphenols improve insulin sensitivity through GLUT4 transporter activation, complementing metformin''s AMPK activation.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'cinnamon'),
  'Hepatotoxic medications',
  NULL,
  'moderate',
  'Cassia cinnamon (high coumarin) combined with hepatotoxic medications may increase liver damage risk.',
  'Coumarin in cassia cinnamon is hepatotoxic in susceptible individuals, creating additive risk with hepatotoxic drugs.',
  'moderate-evidence',
  'Natural Medicines Database'
);

-- ============================================================================
-- HOLY BASIL (TULSI) INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'holy-basil'),
  'Anticoagulants (Warfarin)',
  NULL,
  'moderate',
  'Holy basil may have antiplatelet effects that increase bleeding risk with anticoagulant medications.',
  'Eugenol and other compounds in holy basil may inhibit platelet aggregation and thromboxane synthesis.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'holy-basil'),
  'Pentobarbital',
  NULL,
  'moderate',
  'Holy basil may enhance and prolong the sedative effects of barbiturates.',
  'Holy basil''s sedative compounds may create additive CNS depression with barbiturates.',
  'limited-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- MORINGA INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'moringa'),
  'Levothyroxine (Synthroid)',
  NULL,
  'moderate',
  'Moringa may affect thyroid function and interfere with levothyroxine therapy.',
  'Isothiocyanates in moringa may have goitrogenic effects and interfere with thyroid hormone synthesis.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'moringa'),
  'Diabetes medications (general)',
  NULL,
  'moderate',
  'Moringa may enhance blood sugar-lowering effects of diabetes medications, increasing hypoglycemia risk.',
  'Moringa leaf contains compounds that improve insulin sensitivity and may stimulate insulin secretion.',
  'moderate-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- ADDITIONAL COMMON INTERACTIONS
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'cats-claw'),
  'Immunosuppressants',
  NULL,
  'moderate',
  'Cat''s claw stimulates immune function and may counteract immunosuppressive medications.',
  'Oxindole alkaloids in cat''s claw enhance phagocytosis and stimulate T-cell and B-cell proliferation.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'cats-claw'),
  'Antihypertensives',
  NULL,
  'mild',
  'Cat''s claw may have mild blood pressure-lowering effects that are additive with antihypertensives.',
  'Hirsutine and other alkaloids have calcium channel blocking properties.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'devils-claw'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Devil''s claw may affect blood clotting and interact with warfarin therapy.',
  'Harpagoside may have antiplatelet activity and potentially affect warfarin metabolism.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'red-clover'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Red clover contains coumarin compounds that may enhance warfarin''s anticoagulant effect.',
  'Isoflavones and coumarins in red clover may have additive anticoagulant and antiplatelet activity.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'red-clover'),
  'Tamoxifen',
  NULL,
  'moderate',
  'Red clover isoflavones may interact with tamoxifen in estrogen-dependent conditions. The clinical significance is debated.',
  'Red clover isoflavones bind estrogen receptors and may compete with or complement tamoxifen''s SERM activity.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'nettle'),
  'Lithium',
  NULL,
  'moderate',
  'Nettle''s diuretic effect may increase lithium concentration by reducing lithium excretion, risking toxicity.',
  'Increased renal sodium excretion from nettle''s diuretic effect may reduce lithium clearance, elevating serum levels.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'nettle'),
  'Antihypertensives',
  NULL,
  'mild',
  'Nettle may have mild blood pressure-lowering effects that add to antihypertensive medications.',
  'Nettle has diuretic and possible vasodilatory effects contributing to blood pressure reduction.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'dandelion'),
  'Lithium',
  NULL,
  'moderate',
  'Dandelion''s diuretic properties may decrease lithium excretion, increasing blood levels and risk of lithium toxicity.',
  'Diuretic effect reduces renal lithium clearance, elevating serum lithium concentrations.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'dandelion'),
  'Ciprofloxacin',
  NULL,
  'moderate',
  'Dandelion may reduce ciprofloxacin absorption, potentially decreasing antibiotic effectiveness.',
  'Mineral content and fiber in dandelion may chelate ciprofloxacin and reduce gastrointestinal absorption.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'astragalus'),
  'Immunosuppressants (Cyclophosphamide)',
  NULL,
  'moderate',
  'Astragalus may counteract the immunosuppressive effects of cyclophosphamide while potentially reducing its side effects.',
  'Astragalus polysaccharides stimulate immune cell proliferation and activity, opposing pharmacological immunosuppression.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'astragalus'),
  'Lithium',
  NULL,
  'mild',
  'Astragalus may have mild diuretic effects that could affect lithium levels.',
  'Diuretic activity may reduce renal lithium clearance.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'lemon-balm'),
  'Thyroid medications (Levothyroxine)',
  NULL,
  'moderate',
  'Lemon balm may interfere with thyroid hormone production and activity, potentially reducing thyroid medication effectiveness.',
  'Rosmarinic acid in lemon balm may inhibit TSH binding to thyroid receptors and reduce thyroid hormone synthesis.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'lemon-balm'),
  'Sedatives and Barbiturates',
  NULL,
  'moderate',
  'Lemon balm may enhance sedative effects of barbiturates and other CNS depressants.',
  'Rosmarinic acid and other constituents have GABAergic activity that creates additive sedation.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'goldenseal'),
  'Cyclosporine',
  NULL,
  'severe',
  'Goldenseal (berberine) may significantly increase cyclosporine blood levels, increasing toxicity risk.',
  'Berberine in goldenseal inhibits CYP3A4 and P-glycoprotein, reducing cyclosporine metabolism.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'goldenseal'),
  'Metformin',
  NULL,
  'moderate',
  'Berberine in goldenseal may enhance blood sugar-lowering effects of metformin.',
  'Both activate AMPK pathway, creating additive hypoglycemic effects.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'gymnema'),
  'Insulin',
  NULL,
  'moderate',
  'Gymnema may enhance insulin''s blood sugar-lowering effect, requiring dose adjustment and monitoring.',
  'Gymnemic acids may stimulate pancreatic beta cells and enhance insulin secretion, adding to exogenous insulin effects.',
  'well-documented',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'gymnema'),
  'Glipizide',
  NULL,
  'moderate',
  'Gymnema combined with sulfonylureas may cause excessive blood sugar reduction.',
  'Additive hypoglycemic effects through different but complementary insulin-sensitizing mechanisms.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'horse-chestnut'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Horse chestnut may have mild anticoagulant properties that increase bleeding risk with warfarin.',
  'Aescin and coumarins in horse chestnut may have antiplatelet and anticoagulant activity.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'horse-chestnut'),
  'Lithium',
  NULL,
  'moderate',
  'Horse chestnut''s diuretic effects may reduce lithium excretion and increase serum levels.',
  'Diuretic activity may reduce renal lithium clearance, elevating plasma concentrations.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'black-seed'),
  'Cyclosporine',
  NULL,
  'moderate',
  'Black seed may interact with cyclosporine levels. Some studies suggest it may be protective, but monitoring is essential.',
  'Thymoquinone affects multiple CYP enzymes and may alter cyclosporine metabolism.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'black-seed'),
  'Metformin',
  NULL,
  'moderate',
  'Black seed has blood sugar-lowering properties that may be additive with metformin.',
  'Thymoquinone improves insulin sensitivity and may enhance pancreatic beta-cell function.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'schisandra'),
  'Tacrolimus',
  NULL,
  'moderate',
  'Schisandra may increase tacrolimus blood levels through enzyme inhibition.',
  'Schisandrin inhibits CYP3A4 and P-glycoprotein, reducing tacrolimus metabolism.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'schisandra'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Schisandra may affect warfarin metabolism and anticoagulant effectiveness.',
  'Schisandrin may inhibit CYP3A4 and CYP2C9, affecting warfarin metabolism.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'vitex'),
  'Dopamine agonists (Bromocriptine)',
  NULL,
  'moderate',
  'Vitex has dopaminergic activity and may interact with dopamine-related medications.',
  'Vitex acts on dopamine D2 receptors, potentially creating additive effects with dopamine agonists.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'vitex'),
  'Oral Contraceptives',
  NULL,
  'moderate',
  'Vitex''s hormonal effects may theoretically interfere with hormonal contraceptive effectiveness.',
  'Vitex modulates prolactin and progesterone through dopaminergic action on the pituitary, potentially affecting contraceptive hormonal balance.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'olive-leaf'),
  'Antihypertensives (general)',
  NULL,
  'moderate',
  'Olive leaf extract has blood pressure-lowering properties that may be additive with antihypertensive medications.',
  'Oleuropein causes vasodilation and may have ACE-inhibitory activity, creating additive hypotensive effects.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'olive-leaf'),
  'Diabetes medications',
  NULL,
  'moderate',
  'Olive leaf extract may enhance blood sugar-lowering effects of diabetes medications.',
  'Oleuropein may improve insulin sensitivity and glucose uptake, adding to pharmacological hypoglycemic effects.',
  'moderate-evidence',
  'Clinical Studies'
);

-- ============================================================================
-- ADDITIONAL INTERACTIONS (to reach 150+)
-- ============================================================================
INSERT INTO public.drug_interactions (
  id, herb_id, drug_name, rxcui, severity, description, mechanism, evidence_level, source
) VALUES
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'aloe-vera'),
  'Digoxin',
  NULL,
  'moderate',
  'Aloe vera latex (laxative) can cause potassium loss that increases sensitivity to digoxin toxicity.',
  'Anthraquinone-induced diarrhea and potassium wasting increase myocardial sensitivity to digoxin.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'aloe-vera'),
  'Diuretics (Thiazide)',
  NULL,
  'moderate',
  'Aloe vera latex combined with thiazide diuretics may cause excessive potassium loss and hypokalemia.',
  'Additive potassium-wasting effects from stimulant laxative action and diuretic renal potassium excretion.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'aloe-vera'),
  'Sevoflurane (anesthesia)',
  NULL,
  'moderate',
  'A case of excessive intraoperative bleeding was reported in a patient taking aloe vera before surgery with sevoflurane anesthesia.',
  'Aloe vera may have antiplatelet effects that interact with anesthetic agents affecting coagulation.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'cordyceps'),
  'Immunosuppressants',
  NULL,
  'moderate',
  'Cordyceps has immune-modulating properties that may interfere with immunosuppressive medications.',
  'Cordyceps polysaccharides stimulate natural killer cells and macrophages, potentially opposing immunosuppression.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'cordyceps'),
  'Anticoagulants (general)',
  NULL,
  'moderate',
  'Cordyceps may have mild antiplatelet effects that increase bleeding risk with anticoagulant medications.',
  'Cordycepin and adenosine may inhibit platelet aggregation.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'bacopa'),
  'Thyroid medications (Levothyroxine)',
  NULL,
  'moderate',
  'Bacopa may increase thyroid hormone levels, potentially causing excess thyroid activity in medicated patients.',
  'Bacosides may stimulate thyroid function by increasing T3 and T4 production.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'bacopa'),
  'Calcium channel blockers',
  NULL,
  'mild',
  'Bacopa may have mild calcium channel blocking effects that add to antihypertensive medications.',
  'Bacoside A has demonstrated vasodilatory properties through calcium channel modulation.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'eleuthero'),
  'Digoxin',
  NULL,
  'moderate',
  'Eleuthero may interfere with digoxin level monitoring, causing falsely elevated readings on some assays.',
  'Eleutherosides may cross-react with digoxin immunoassay, leading to falsely elevated serum digoxin levels.',
  'moderate-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'eleuthero'),
  'Warfarin (Coumadin)',
  NULL,
  'mild',
  'Eleuthero may have mild effects on platelet function that warrant monitoring with warfarin.',
  'Some eleutherosides may affect platelet aggregation pathways.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'maca'),
  'Hormone replacement therapy',
  NULL,
  'moderate',
  'Maca may modulate hormonal levels and potentially interact with hormone replacement therapy.',
  'Maca contains plant sterols and alkaloids that may affect hypothalamic-pituitary-gonadal axis signaling.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'andrographis'),
  'Warfarin (Coumadin)',
  NULL,
  'moderate',
  'Andrographis may have antiplatelet effects that increase bleeding risk with warfarin.',
  'Andrographolide inhibits PAF-induced platelet aggregation, adding to warfarin''s anticoagulant effect.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'andrographis'),
  'Antihypertensives',
  NULL,
  'mild',
  'Andrographis may have mild blood pressure-lowering effects that add to antihypertensive medications.',
  'Andrographolide has vasodilatory properties and may lower blood pressure through multiple mechanisms.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'wormwood'),
  'Anticonvulsants (Phenobarbital)',
  NULL,
  'severe',
  'Wormwood contains thujone which may lower the seizure threshold and counteract anticonvulsant medications.',
  'Thujone is a GABA-A receptor antagonist that may reduce seizure threshold and oppose anticonvulsant drug effects.',
  'well-documented',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'hops'),
  'Sedatives and Benzodiazepines',
  NULL,
  'moderate',
  'Hops may enhance the sedative effects of benzodiazepines and other CNS depressants.',
  '2-Methyl-3-buten-2-ol (hop degradation product) activates GABA-A receptors, creating additive sedation.',
  'moderate-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'skullcap'),
  'Sedatives and Benzodiazepines',
  NULL,
  'moderate',
  'Skullcap may enhance sedative effects of CNS depressant medications.',
  'Baicalin and other flavonoids bind GABA-A receptors, potentially creating additive sedation with benzodiazepines.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'butterbur'),
  'CYP3A4 substrates',
  NULL,
  'mild',
  'Butterbur may inhibit CYP3A4 enzyme, potentially increasing blood levels of drugs metabolized by this pathway.',
  'Petasin and isopetasin have demonstrated CYP3A4 inhibitory activity in vitro.',
  'limited-evidence',
  'Clinical Studies'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'gotu-kola'),
  'Sedatives and CNS depressants',
  NULL,
  'moderate',
  'Gotu kola may enhance sedative effects of CNS depressant medications.',
  'Brahmoside and other saponins have demonstrated sedative and anxiolytic properties that may be additive with CNS depressants.',
  'limited-evidence',
  'Natural Medicines Database'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.herbs WHERE slug = 'gotu-kola'),
  'Hepatotoxic medications',
  NULL,
  'moderate',
  'Gotu kola has been associated with rare cases of hepatotoxicity. Combination with hepatotoxic drugs may increase risk.',
  'Possible additive hepatotoxic effects when combined with drugs that cause liver stress.',
  'limited-evidence',
  'Clinical Studies'
);
