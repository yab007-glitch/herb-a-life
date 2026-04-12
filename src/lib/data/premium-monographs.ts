// Premium hand-written monographs (Batch 1: Critical 20)
// These are high-quality, research-backed monographs with rich clinical detail

import type { Monograph } from "./monographs";

export const premiumMonographs: Record<string, Monograph> = {
  // Already have: turmeric, ashwagandha, ginger, chamomile, echinacea, valerian-root, milk-thistle
  // Adding 13 more critical herbs

  ginkgo: {
    slug: "ginkgo",
    summary: "Ginkgo (Ginkgo biloba) is the oldest living tree species with documented medicinal use spanning over 5,000 years. Standardized extracts containing 24% flavone glycosides and 6% terpene lactones are among the most studied botanicals for cognitive health. Clinical evidence supports modest benefits for age-related cognitive decline, while evidence for dementia and intermittent claudication shows mixed results. The flavonoids provide antioxidant protection, while ginkgolides antagonize platelet-activating factor (PAF), improving cerebral blood flow.",
    mechanism: "Ginkgo biloba extract (GBE) contains two primary active fractions: flavonoid glycosides (quercetin, kaempferol, isorhamnetin) and terpene lactones (ginkgolides A-C, bilobalide). Ginkgolides are potent PAF antagonists, reducing platelet aggregation and improving microcirculation. Bilobalide protects mitochondrial function and reduces oxidative stress. Flavonoids scavenge free radicals and chelate transition metals. GBE also modulates neurotransmitter systems (acetylcholine, norepinephrine, serotonin) and increases brain-derived neurotrophic factor (BDNF) expression.",
    claims: [
      { claim: "Age-related cognitive decline", evidence: "B", note: "Modest effect; standardized EGb761 extract shows 2.5-point improvement on ADAS-Cog" },
      { claim: "Dementia (Alzheimer's/vascular)", evidence: "B", note: "Systematic reviews show inconsistent results; may stabilize symptoms" },
      { claim: "Intermittent claudication", evidence: "B", note: "Modest increase in pain-free walking distance" },
      { claim: "Tinnitus", evidence: "C", note: "Limited evidence; may help when associated with circulatory issues" },
      { claim: "Macular degeneration", evidence: "C", note: "Preliminary evidence for antioxidant effects" },
      { claim: "Antioxidant support", evidence: "B", note: "Well-documented free radical scavenging" },
      { claim: "Glaucoma (open-angle)", evidence: "C", note: "May modestly improve ocular blood flow" },
    ],
    safetyNotes: [
      "Contraindicated with anticoagulants/antiplatelets due to bleeding risk",
      "Discontinue 7 days before surgery",
      "May increase seizure risk in susceptible individuals",
      "Standardized extract: 120-240mg daily (EGb761 or LI1370)",
      "Generally well-tolerated; most common side effect is mild GI upset",
    ],
    drugInteractions: [
      { drug: "Warfarin/Coumadin", severity: "moderate", detail: "Increased bleeding risk; avoid or monitor INR closely" },
      { drug: "Aspirin/NSAIDs", severity: "moderate", detail: "Additive antiplatelet effects" },
      { drug: "Antidepressants (SSRIs/MAOIs)", severity: "moderate", detail: "Theoretical serotonin syndrome risk" },
      { drug: "Anticonvulsants", severity: "mild", detail: "May lower seizure threshold" },
    ],
    pregnancyCategory: "unsafe",
    keyCitations: [
      { source: "Cochrane", title: "Ginkgo biloba for cognitive impairment and dementia", url: "https://www.cochranelibrary.com", year: 2022 },
      { source: "JAMA", title: "Ginkgo biloba and risk of dementia", url: "https://jamanetwork.com", year: 2009 },
      { source: "Pharmacopsychiatry", title: "EGb761 in dementia", url: "https://www.thieme-connect.de", year: 2021 },
      { source: "Commission E", title: "Ginkgo biloba leaf extract monograph", year: 1994 },
    ],
  },

  "st-johns-wort": {
    slug: "st-johns-wort",
    summary: "St. John's Wort (Hypericum perforatum) is the most extensively studied botanical antidepressant, with Level A evidence for mild to moderate depression. Standardized extracts (0.3% hypericin, 2-4% hyperforin) demonstrate efficacy comparable to SSRIs in mild-moderate cases, though not severe depression. Its mechanism involves serotonin, norepinephrine, and dopamine reuptake inhibition, plus NMDA receptor modulation. The herb contains over 150 constituents including hypericin, hyperforin, and flavonoids.",
    mechanism: "Hyperforin is the primary antidepressant constituent, inhibiting serotonin, norepinephrine, and dopamine reuptake non-competitively. It also binds to sigma receptors and modulates NMDA receptor activity. Hypericin has antiviral and phototoxic properties but may contribute less to antidepressant effects. Pseudohypericin, flavonoids (quercetin, rutin), and amentoflavone provide additional activity. Chronic administration downregulates beta-adrenergic receptors similar to conventional antidepressants. St. John's Wort is a potent CYP3A4 and P-glycoprotein inducer, explaining its many drug interactions.",
    claims: [
      { claim: "Mild to moderate depression", evidence: "A", note: "Cochrane review: superior to placebo, equivalent to SSRIs for mild-moderate" },
      { claim: "Severe major depression", evidence: "D", note: "Not effective; insufficient evidence" },
      { claim: "Anxiety disorders", evidence: "C", note: "Limited supporting evidence" },
      { claim: "Somatoform disorders", evidence: "B", note: "Some positive trials" },
      { claim: "Menopausal mood symptoms", evidence: "C", note: "Preliminary evidence" },
      { claim: "Topical antimicrobial", evidence: "B", note: "Hypericin has antiviral properties" },
    ],
    safetyNotes: [
      "Extensive drug interactions via CYP3A4 and P-gp induction",
      "Photosensitivity with high doses",
      "May trigger mania in bipolar disorder",
      "Standardized extract: 300mg TID (0.3% hypericin)",
      "4-6 weeks required for antidepressant effects",
    ],
    drugInteractions: [
      { drug: "Oral contraceptives", severity: "contraindicated", detail: "Reduced efficacy; use alternative contraception" },
      { drug: "Antidepressants (SSRIs/MAOIs/TCAs)", severity: "contraindicated", detail: "Serotonin syndrome risk" },
      { drug: "Warfarin", severity: "contraindicated", detail: "Reduced anticoagulant effect" },
      { drug: "HIV medications (protease inhibitors)", severity: "contraindicated", detail: "Reduced drug levels via CYP3A4 induction" },
      { drug: "Cyclosporine", severity: "contraindicated", detail: "Reduced immunosuppression; organ rejection risk" },
      { drug: "Digoxin", severity: "severe", detail: "Reduced digoxin levels via P-gp induction" },
      { drug: "Statins", severity: "moderate", detail: "Reduced statin efficacy" },
      { drug: "Calcium channel blockers", severity: "moderate", detail: "Reduced antihypertensive effect" },
    ],
    pregnancyCategory: "unsafe",
    keyCitations: [
      { source: "Cochrane", title: "St John's wort for major depression", url: "https://www.cochranelibrary.com", year: 2008 },
      { source: "JAMA", title: "Effect of Hypericum perforatum vs sertraline", url: "https://jamanetwork.com", year: 2001 },
      { source: "Lancet", title: "Drug interactions with St. John's Wort", year: 2000 },
      { source: "Commission E", title: "Hyperici herba monograph", year: 1984 },
    ],
  },

  garlic: {
    slug: "garlic",
    summary: "Garlic (Allium sativum) is one of the most researched botanicals for cardiovascular health. Aged garlic extract (AGE) and standardized powders demonstrate consistent effects on cholesterol and blood pressure. Allicin and S-allyl cysteine (SAC) are the primary bioactive compounds. Meta-analyses show modest but significant reductions in total cholesterol (15-25 mg/dL), LDL (10-20 mg/dL), and blood pressure (8-10 mmHg systolic). It also demonstrates antiplatelet and antimicrobial properties.",
    mechanism: "Allicin, formed when alliin contacts alliinase (enzyme), is the primary active compound but is unstable. Aged garlic extract contains S-allyl cysteine (SAC) and S-allyl mercaptocysteine, which are more bioavailable. Garlic inhibits HMG-CoA reductase (statin-like effect), reduces cholesterol synthesis, and enhances bile acid excretion. It activates nitric oxide synthase, improving endothelial function and vasodilation. Antiplatelet effects inhibit thromboxane A2 synthesis. Antimicrobial activity involves thiol modification in pathogens.",
    claims: [
      { claim: "Hyperlipidemia", evidence: "A", note: "Meta-analyses: 15-25 mg/dL total cholesterol reduction" },
      { claim: "Hypertension", evidence: "A", note: "8-10 mmHg systolic, 5-6 mmHg diastolic reduction" },
      { claim: "Atherosclerosis progression", evidence: "B", note: "AGE shows reduced plaque progression" },
      { claim: "Antimicrobial (topical)", evidence: "B", note: "Documented antibacterial, antifungal activity" },
      { claim: "Common cold prevention", evidence: "C", note: "Limited evidence; may modestly reduce incidence" },
      { claim: "Platelet aggregation inhibition", evidence: "B", note: "Well-documented antiplatelet effects" },
    ],
    safetyNotes: [
      "Discontinue 7-14 days before surgery due to bleeding risk",
      "Aged garlic extract (AGE) preferred for cardiovascular studies",
      "Raw garlic may cause GI upset, body odor",
      "Typical dose: 600-1200mg AGE daily (Kyolic)",
      "Enteric-coated tablets reduce garlic breath",
    ],
    drugInteractions: [
      { drug: "Warfarin/Anticoagulants", severity: "moderate", detail: "Increased bleeding risk" },
      { drug: "Antiplatelets (aspirin, clopidogrel)", severity: "moderate", detail: "Additive antiplatelet effects" },
      { drug: "Protease inhibitors", severity: "moderate", detail: "Reduced drug levels" },
    ],
    pregnancyCategory: "safe",
    keyCitations: [
      { source: "J Nutr", title: "Garlic and cardiovascular disease", url: "https://academic.oup.com/jn", year: 2016 },
      { source: "Cochrane", title: "Garlic for hypertension", url: "https://www.cochranelibrary.com", year: 2016 },
      { source: "J Am Coll Nutr", title: "Garlic and lipids meta-analysis", year: 2000 },
      { source: "Commission E", title: "Allii sativi bulbus monograph", year: 1988 },
    ],
  },

  "saw-palmetto": {
    slug: "saw-palmetto",
    summary: "Saw Palmetto (Serenoa repens) is the leading herbal treatment for benign prostatic hyperplasia (BPH), with over 2 million men in the U.S. using it for urinary symptoms. Liposterolic extracts (85-95% fatty acids and sterols) are the standardized form. While widely used, evidence is mixed: early trials showed benefit comparable to finasteride, but recent high-quality trials (including the STEP trial) have been negative. The discrepancy may relate to extract quality and baseline symptom severity.",
    mechanism: "Liposterolic extract inhibits 5-alpha-reductase (types I and II), reducing conversion of testosterone to dihydrotestosterone (DHT). It also has anti-inflammatory effects via COX and LOX inhibition, and anti-edematous properties. Beta-sitosterol and campesterol are key sterols. Saw palmetto demonstrates anti-androgenic effects at the prostate receptor level. Unlike finasteride, it doesn't significantly lower PSA levels, making it useful for men undergoing prostate cancer screening.",
    claims: [
      { claim: "BPH symptoms (LUTS)", evidence: "B", note: "Mixed evidence; earlier positive trials vs. recent negative ones" },
      { claim: "Nocturia", evidence: "C", note: "May reduce nighttime urination frequency" },
      { claim: "Sexual function preservation", evidence: "B", note: "Unlike finasteride, no negative sexual side effects" },
      { claim: "Prostate cancer prevention", evidence: "D", note: "Insufficient evidence" },
    ],
    safetyNotes: [
      "Does not significantly affect PSA levels (unlike finasteride)",
      "Generally well-tolerated; rare GI upset, headache",
      "Typical dose: 160mg BID or 320mg daily of liposterolic extract",
      "May take 4-6 weeks for symptomatic improvement",
      "Not for prevention; for symptomatic men only",
    ],
    drugInteractions: [
      { drug: "Finasteride/dutasteride", severity: "mild", detail: "May have additive effects; avoid concurrent use" },
      { drug: "Anticoagulants", severity: "mild", detail: "Theoretical antiplatelet effect" },
      { drug: "Hormone replacement therapy", severity: "mild", detail: "Possible additive hormonal effects" },
    ],
    pregnancyCategory: "unsafe",
    keyCitations: [
      { source: "N Engl J Med", title: "STEP trial: Saw palmetto for BPH", url: "https://www.nejm.org", year: 2006 },
      { source: "Cochrane", title: "Serenoa repens for benign prostatic hyperplasia", year: 2012 },
      { source: "Urology", title: "Saw palmetto extracts for BPH", year: 2015 },
      { source: "Commission E", title: "Sabal fructus monograph", year: 1984 },
    ],
  },

  cranberry: {
    slug: "cranberry",
    summary: "Cranberry (Vaccinium macrocarpon) is the only herb with Level A evidence for urinary tract infection (UTI) prevention. Proanthocyanidins (PACs), particularly A-type dimers and trimers, prevent bacterial adhesion to uroepithelial cells. The minimum effective dose is 36mg PACs daily, which requires concentrated extracts (not juice). Evidence is strongest for recurrent UTIs in women; it's not effective for treatment of active UTIs. Cranberry also has antioxidant and anti-adhesion properties in other systems.",
    mechanism: "A-type proanthocyanidins (PACs) are the active constituents, distinct from B-type PACs in other berries. They inhibit P-fimbriae adhesion of uropathogenic E. coli (UPEC) to uroepithelial cells by binding to bacterial adhesins. This anti-adhesion effect is dose-dependent and requires minimum 36mg PACs daily. Cranberry also acidifies urine slightly and may have quorum-sensing inhibition. The effect is bacterial-specific and doesn't significantly alter vaginal or gut microbiome. Antioxidant effects come from flavonols, anthocyanins, and phenolic acids.",
    claims: [
      { claim: "UTI prevention (recurrent)", evidence: "A", note: "Cochrane: reduces UTI recurrence by 30-35% in women" },
      { claim: "UTI treatment", evidence: "D", note: "Not effective for active infection" },
      { claim: "Bacterial anti-adhesion", evidence: "A", note: "Well-documented mechanism" },
      { claim: "Cardiovascular (antioxidant)", evidence: "C", note: "Preliminary evidence for vascular function" },
      { claim: "Dental plaque prevention", evidence: "C", note: "May reduce bacterial adhesion in oral cavity" },
    ],
    safetyNotes: [
      "Requires minimum 36mg PACs daily for UTI prevention",
      "Not for treatment of active UTIs—see physician",
      "High oxalate content—caution with kidney stones",
      "May increase bleeding risk with warfarin (rare)",
      "Well-tolerated; some GI upset at high doses",
    ],
    drugInteractions: [
      { drug: "Warfarin", severity: "moderate", detail: "Rare case reports of increased INR; monitor" },
      { drug: "H2 blockers/PPIs", severity: "mild", detail: "May reduce PAC absorption" },
    ],
    pregnancyCategory: "safe",
    keyCitations: [
      { source: "Cochrane", title: "Cranberries for preventing urinary tract infections", url: "https://www.cochranelibrary.com", year: 2023 },
      { source: "JAMA", title: "Cranberry for UTI prevention in elderly", year: 2016 },
      { source: "Am J Clin Nutr", title: "Cranberry PACs and bacterial anti-adhesion", year: 2010 },
      { source: "NCCIH", title: "Cranberry Fact Sheet", year: 2024 },
    ],
  },

  rhodiola: {
    slug: "rhodiola",
    summary: "Rhodiola (Rhodiola rosea) is an adaptogen with over 2000 years of traditional use in Arctic regions. Standardized extracts (3% rosavins, 1% salidroside) demonstrate benefits for stress, fatigue, and mood. Level B evidence supports its use for physical and mental fatigue in stressful situations, with rapid onset (3-7 days). Unlike many adaptogens, it has stimulating properties and should be taken in the morning. The dual rosavin/salidroside ratio is critical for efficacy.",
    mechanism: "Rhodiola contains rosavins (rosavin, rosin, rosarin—unique to R. rosea) and salidroside (rhodioloside). Rosavins predominate in the root; salidroside is more concentrated in the rhizome. The mechanism involves modulation of the hypothalamic-pituitary-adrenal (HPA) axis, reducing cortisol response to stress. It increases beta-endorphins and monoamines (serotonin, dopamine, norepinephrine). Rhodiola also enhances mitochondrial function and ATP production. MAO-A inhibition may contribute to mood effects. The adaptogenic effect is bidirectional—normalizing both high and low cortisol states.",
    claims: [
      { claim: "Stress-related fatigue", evidence: "B", note: "Improves physical/cognitive fatigue under stress" },
      { claim: "Physical performance", evidence: "B", note: "May enhance endurance; mixed evidence for strength" },
      { claim: "Mild depression", evidence: "B", note: "Small positive trials; faster onset than SSRIs" },
      { claim: "Cognitive fatigue", evidence: "B", note: "Improves mental performance under stress" },
      { claim: "Anxiety", evidence: "C", note: "Limited evidence" },
      { claim: "Burnout", evidence: "B", note: "Improves burnout symptoms in healthcare workers" },
    ],
    safetyNotes: [
      "Stimulating—take in morning to avoid insomnia",
      "Standardized to 3% rosavins, 1% salidroside",
      "Typical dose: 200-400mg daily",
      "Avoid in bipolar disorder (may trigger mania)",
      "Generally well-tolerated; rare anxiety, insomnia",
    ],
    drugInteractions: [
      { drug: "Antidepressants (SSRIs/MAOIs)", severity: "moderate", detail: "Theoretical serotonin syndrome risk" },
      { drug: "Stimulants", severity: "mild", detail: "Possible additive CNS stimulation" },
      { drug: "Hypoglycemics", severity: "mild", detail: "May lower blood glucose" },
    ],
    pregnancyCategory: "unsafe",
    keyCitations: [
      { source: "Phytomedicine", title: "Rhodiola rosea in stress-induced fatigue", url: "https://www.sciencedirect.com", year: 2009 },
      { source: "BMC Complement Med Ther", title: "Rhodiola for physical performance", year: 2019 },
      { source: "Nord J Psychiatry", title: "Rhodiola for mild to moderate depression", year: 2015 },
      { source: "NCCIH", title: "Rhodiola rosea Fact Sheet", year: 2024 },
    ],
  },

  "green-tea": {
    slug: "green-tea",
    summary: "Green Tea (Camellia sinensis) is the least processed tea variety, retaining high concentrations of catechins, particularly epigallocatechin gallate (EGCG). It is one of the most studied beverages for health effects. Level A evidence supports cognitive benefits and cardiovascular risk reduction. EGCG demonstrates antioxidant, anti-inflammatory, and metabolic effects. The caffeine-theanine combination provides unique cognitive benefits. For therapeutic effects, standardized extracts (EGCG 200-400mg) are more practical than drinking tea.",
    mechanism: "Catechins, especially EGCG (50-75% of total catechins), are the primary actives. EGCG is a potent antioxidant (100x more potent than vitamin C), inhibits COMT (catechol-O-methyltransferase), and modulates cell signaling pathways (PI3K/Akt, MAPK). It inhibits angiogenesis and tumor cell proliferation (preclinical). The caffeine-theanine combination (25-50mg theanine per cup) enhances alpha brain wave activity, improving focus without jitters. Green tea extract reduces carbohydrate absorption (alpha-amylase inhibition) and enhances fat oxidation. Catechins are poorly absorbed; piperine may enhance bioavailability.",
    claims: [
      { claim: "Cognitive function", evidence: "A", note: "Improves attention, memory, executive function" },
      { claim: "Cardiovascular risk", evidence: "A", note: "2-3 cups daily reduces CVD risk by 20-30%" },
      { claim: "Weight management", evidence: "B", note: "Modest effect; increases fat oxidation" },
      { claim: "Type 2 diabetes prevention", evidence: "B", note: "May improve insulin sensitivity" },
      { claim: "Cancer prevention", evidence: "C", note: "Promising preclinical; mixed clinical evidence" },
      { claim: "Dental health", evidence: "B", note: "Antibacterial effects reduce caries and gingivitis" },
      { claim: "Liver protection", evidence: "C", note: "Preliminary evidence for NAFLD" },
    ],
    safetyNotes: [
      "High-dose extracts (EGCG >800mg) linked to rare hepatotoxicity",
      "Consume with food to reduce GI upset",
      "Caffeine content: ~25-35mg per cup (vs 95mg coffee)",
      "Decaf green tea loses ~60% of catechins",
      "Add lemon (vitamin C) to enhance catechin absorption",
    ],
    drugInteractions: [
      { drug: "Warfarin", severity: "moderate", detail: "High amounts of vitamin K in tea leaves" },
      { drug: "Hepatotoxic drugs", severity: "moderate", detail: "High-dose extract may add to liver burden" },
      { drug: "Stimulants", severity: "mild", detail: "Additive caffeine effects" },
      { drug: "Iron supplements", severity: "mild", detail: "Tannins reduce iron absorption" },
    ],
    pregnancyCategory: "caution",
    keyCitations: [
      { source: "Am J Clin Nutr", title: "Green tea and cardiovascular disease", url: "https://academic.oup.com/ajcn", year: 2020 },
      { source: "Cochrane", title: "Green tea for weight loss", year: 2012 },
      { source: "NCCIH", title: "Green Tea Fact Sheet", year: 2024 },
      { source: "J Nutr", title: "Tea catechins and cognitive function", year: 2014 },
    ],
  },

  peppermint: {
    slug: "peppermint",
    summary: "Peppermint (Mentha × piperita) is a hybrid of water mint and spearmint with well-established use for digestive complaints. Enteric-coated peppermint oil (ECPO) is the pharmaceutical-grade preparation with Level A evidence for irritable bowel syndrome (IBS). Menthol (40-50% of oil) is the primary active compound. It works via calcium channel blockade, relaxing gastrointestinal smooth muscle. Peppermint is also used for tension headaches, colds, and topical analgesia.",
    mechanism: "Menthol (monoterpene) and menthone are the primary constituents (50-80% combined). Menthol is a calcium channel antagonist, relaxing smooth muscle in the GI tract by blocking Ca2+ influx. This reduces gut spasms, bloating, and pain in IBS. Menthol also stimulates cold receptors (TRPM8) in the skin and mucous membranes, producing a cooling sensation. This underlies its use for congestion and topical pain relief. Inhaled menthol may improve alertness and cognitive performance. Pepperment oil increases bile flow (choleretic) and reduces lower esophageal sphincter pressure.",
    claims: [
      { claim: "IBS symptoms", evidence: "A", note: "Enteric-coated oil: 50-80% symptom improvement" },
      { claim: "Abdominal pain/spasms", evidence: "B", note: "Antispasmodic effects well-documented" },
      { claim: "Tension headaches", evidence: "B", note: "10% topical oil as effective as acetaminophen" },
      { claim: "Nasal congestion", evidence: "C", note: "Temporary relief via TRPM8 activation" },
      { claim: "Nausea", evidence: "C", note: "Modest effect; weaker than ginger" },
      { claim: "Indigestion", evidence: "B", note: "Improves gastric emptying" },
    ],
    safetyNotes: [
      "Must be enteric-coated for IBS (otherwise causes heartburn)",
      "Typical dose: 180-200mg ECPO, 2-3x daily before meals",
      "Contraindicated with hiatal hernia/reflux (relaxes LES)",
      "Avoid breaking/chewing enteric-coated capsules",
      "Generally well-tolerated; heartburn if not enteric-coated",
    ],
    drugInteractions: [
      { drug: "Antacids/PPIs", severity: "mild", detail: "May break enteric coating prematurely" },
      { drug: "Cyclosporine", severity: "moderate", detail: "May increase levels via CYP inhibition" },
      { drug: "Iron supplements", severity: "mild", detail: "May reduce iron absorption" },
    ],
    pregnancyCategory: "caution",
    keyCitations: [
      { source: "Cochrane", title: "Peppermint oil for irritable bowel syndrome", url: "https://www.cochranelibrary.com", year: 2008 },
      { source: "Cephalalgia", title: "Peppermint oil for tension headache", year: 1996 },
      { source: "J Clin Gastroenterol", title: "Meta-analysis: peppermint oil for IBS", year: 2014 },
      { source: "Commission E", title: "Menthae piperitae aetheroleum monograph", year: 1984 },
    ],
  },

  lavender: {
    slug: "lavender",
    summary: "Lavender (Lavandula angustifolia) is widely used for anxiety and sleep disorders. Oral standardized lavender oil (Silexan, 80mg) has Level A evidence for generalized anxiety disorder (GAD), with efficacy comparable to lorazepam in some trials. Unlike many botanicals, oral lavender has robust clinical trial data. The anxiolytic effect is mediated by S-lesquel and other constituents interacting with GABA and NMDA receptors. Lavender also has antimicrobial, anti-inflammatory, and analgesic properties.",
    mechanism: "Essential oil contains linalool (25-38%) and linalyl acetate (25-45%) as primary actives. Silexan (oral preparation) is standardized to these constituents. Linalool is a competitive NMDA receptor antagonist and potentiates GABAergic transmission, explaining anxiolytic effects. It also inhibits voltage-gated calcium channels. Inhalation of lavender oil activates the limbic system via olfactory pathways, affecting autonomic nervous system tone. Topically, it has antimicrobial and anti-inflammatory effects. Linalool and linalyl acetate are rapidly absorbed through skin and mucous membranes.",
    claims: [
      { claim: "Generalized anxiety disorder", evidence: "A", note: "Silexan: comparable to lorazepam in RCTs" },
      { claim: "Sleep quality", evidence: "B", note: "Improves sleep latency and quality" },
      { claim: "Depression (mild)", evidence: "C", note: "Preliminary positive trials" },
      { claim: "Wound healing", evidence: "B", note: "Antimicrobial, promotes tissue repair" },
      { claim: "Alopecia areata", evidence: "C", note: "Topical oil with massage showed hair regrowth" },
      { claim: "Pain (topical)", evidence: "C", note: "Analgesic effects via TRPA1 modulation" },
    ],
    safetyNotes: [
      "Silexan (80mg oral) is the evidence-based preparation",
      "Oral: generally well-tolerated; rare GI upset",
      "Topical: may cause contact dermatitis in sensitive individuals",
      "Avoid oral ingestion of essential oil (not Silexan)",
      "Sedating—may enhance effects of other CNS depressants",
    ],
    drugInteractions: [
      { drug: "Sedatives (benzodiazepines, etc.)", severity: "moderate", detail: "Additive CNS depression" },
      { drug: "Antihypertensives", severity: "mild", detail: "May enhance hypotensive effects" },
    ],
    pregnancyCategory: "caution",
    keyCitations: [
      { source: "Int Clin Psychopharmacol", title: "Silexan for GAD", url: "https://journals.lww.com", year: 2010 },
      { source: "Eur Neuropsychopharmacol", title: "Lavender oil vs lorazepam", year: 2010 },
      { source: "Phytomedicine", title: "Meta-analysis: lavender for anxiety", year: 2019 },
      { source: "Commission E", title: "Lavandulae flos monograph", year: 1984 },
    ],
  },

  elderberry: {
    slug: "elderberry",
    summary: "Elderberry (Sambucus nigra) has gained significant attention for immune support, particularly for respiratory infections. Standardized extracts (Sambucol) demonstrate antiviral effects against influenza A and B, with clinical trials showing symptom reduction by 3-4 days when started within 48 hours of onset. The mechanism involves hemagglutinin inhibition, preventing viral entry into host cells. Elderberry is rich in anthocyanins, providing antioxidant and anti-inflammatory effects.",
    mechanism: "Standardized extracts contain flavonoids (quercetin, rutin), anthocyanins (cyanidin-3-glucoside), and lectins. The antiviral effect is primarily due to inhibition of viral hemagglutinin, preventing attachment and entry into host cells. This has been demonstrated for influenza A, B, and some herpes viruses. Elderberry also stimulates cytokine production (IL-1, IL-6, TNF-α, IFN-β), enhancing immune response. The high anthocyanin content provides potent antioxidant activity (ORAC value 14,000+). Lectins have immunomodulatory effects. Berry extracts also demonstrate anti-inflammatory activity via COX inhibition.",
    claims: [
      { claim: "Influenza symptom reduction", evidence: "A", note: "3-4 day reduction when started early" },
      { claim: "Common cold duration", evidence: "B", note: "Modest reduction in symptom duration" },
      { claim: "Immune support", evidence: "B", note: "Increases cytokine production" },
      { claim: "Upper respiratory infections", evidence: "B", note: "Reduces symptoms in air travelers" },
      { claim: "Antioxidant", evidence: "B", note: "High anthocyanin content" },
      { claim: "COVID-19", evidence: "D", note: "No clinical evidence; theoretical only" },
    ],
    safetyNotes: [
      "Only use commercial preparations—raw berries/seeds toxic",
      "Unripe fruit and seeds contain cyanogenic glycosides",
      "Sambucol/Esberecz are evidence-based preparations",
      "Typical dose: 15ml syrup 4x daily (acute), 1-2x daily (prevention)",
      "Generally well-tolerated; rare GI upset",
    ],
    drugInteractions: [
      { drug: "Immunosuppressants", severity: "moderate", detail: "May counteract immunosuppressive effects" },
      { drug: "Diuretics", severity: "mild", detail: "May enhance diuretic effects" },
      { drug: "Laxatives", severity: "mild", detail: "May enhance laxative effects" },
    ],
    pregnancyCategory: "insufficient",
    keyCitations: [
      { source: "J Int Med Res", title: "Elderberry for influenza treatment", url: "https://journals.sagepub.com", year: 2004 },
      { source: "Nutrients", title: "Elderberry supplementation reduces cold duration", year: 2016 },
      { source: "Phytochemistry", title: "Antiviral activity of elderberry extract", year: 2019 },
      { source: "NCCIH", title: "Elderberry Fact Sheet", year: 2024 },
    ],
  },

  "siberian-ginseng": {
    slug: "siberian-ginseng",
    summary: "Siberian Ginseng (Eleutherococcus senticosus), also called Eleuthero, is an adaptogen distinct from true ginseng (Panax). It has extensive traditional use and Russian research supporting stress adaptation and physical performance. Level B evidence exists for reducing stress-related fatigue and improving athletic performance. Eleutherosides are the marker compounds. Unlike Panax ginseng, it doesn't contain ginsenosides and has fewer stimulant effects.",
    mechanism: "Eleutherosides (lignans, particularly eleutheroside B and E) are the characteristic constituents. Other actives include polysaccharides, triterpene saponins, and flavonoids. The mechanism involves HPA axis modulation, reducing cortisol response to stress. Eleutherococcus enhances immune function (increases T-cell and NK cell activity) and improves mitochondrial ATP production. It has antioxidant and anti-inflammatory effects. Unlike Panax ginseng, it has minimal effect on blood sugar and less stimulant activity. Some studies suggest it improves oxygen utilization during exercise.",
    claims: [
      { claim: "Stress-related fatigue", evidence: "B", note: "Reduces fatigue in stressful conditions" },
      { claim: "Physical performance", evidence: "B", note: "Improves endurance in athletes" },
      { claim: "Immune support", evidence: "B", note: "Enhances T-cell and NK cell activity" },
      { claim: "Cognitive function", evidence: "C", note: "Limited evidence" },
      { claim: "Menopause symptoms", evidence: "C", note: "Preliminary evidence" },
      { claim: "Cancer adjunct", evidence: "C", note: "Immunomodulatory in cancer patients" },
    ],
    safetyNotes: [
      "Less stimulating than Panax ginseng",
      "Typical dose: 300-1200mg extract daily",
      "Standardized to 0.8% eleutherosides",
      "Avoid in hypertension (may raise BP in some)",
      "Generally well-tolerated; rare insomnia, anxiety",
    ],
    drugInteractions: [
      { drug: "Digoxin", severity: "moderate", detail: "May falsely elevate digoxin levels" },
      { drug: "Anticoagulants", severity: "mild", detail: "Theoretical bleeding risk" },
      { drug: "Hypoglycemics", severity: "mild", detail: "May affect blood glucose" },
      { drug: "Stimulants", severity: "mild", detail: "Possible additive effects" },
    ],
    pregnancyCategory: "unsafe",
    keyCitations: [
      { source: "Phytomedicine", title: "Eleutherococcus for stress adaptation", url: "https://www.sciencedirect.com", year: 2005 },
      { source: "J Ethnopharmacol", title: "Immunomodulatory effects of eleutherococcus", year: 2009 },
      { source: "Chin J Integr Med", title: "Eleutherococcus and fatigue", year: 2011 },
      { source: "NCCIH", title: "Siberian Ginseng Fact Sheet", year: 2024 },
    ],
  },

  hawthorn: {
    slug: "hawthorn",
    summary: "Hawthorn (Crataegus spp., primarily C. laevigata and C. monogyna) has Level A evidence for chronic heart failure (NYHA I-II). Standardized leaf/flower extracts (WS 1442, LI 132) improve cardiac function, exercise tolerance, and reduce symptoms. The mechanism involves multiple cardiac effects: mild positive inotropic, coronary vasodilation, and antioxidant protection. Hawthorn is the most studied botanical for cardiovascular disease in Europe, with over 7,000 patients in clinical trials.",
    mechanism: "Flavonoids (hyperoside, vitexin, rutin), oligomeric procyanidins (OPC), and triterpenes are the primary actives. Multiple cardiac mechanisms: (1) Inhibition of phosphodiesterase-3 (PDE3), increasing cAMP and calcium availability (mild positive inotropy); (2) Coronary vasodilation via NO release; (3) ACE inhibition, reducing afterload; (4) Antioxidant protection of myocardial cells; (5) Antiarrhythmic effects. Unlike digoxin, hawthorn's effects are modest and not associated with toxicity. The multi-component nature creates synergistic cardiac benefits.",
    claims: [
      { claim: "Chronic heart failure (NYHA I-II)", evidence: "A", note: "Improves symptoms, exercise tolerance, quality of life" },
      { claim: "Angina pectoris", evidence: "B", note: "Improves coronary blood flow" },
      { claim: "Hypertension (mild)", evidence: "B", note: "Modest blood pressure reduction" },
      { claim: "Anxiety", evidence: "C", note: "Mild anxiolytic effects" },
      { claim: "Dyslipidemia", evidence: "C", note: "Preliminary lipid-lowering effects" },
    ],
    safetyNotes: [
      "Do NOT use in NYHA III-IV or without physician supervision",
      "Typical dose: 900mg daily of standardized extract (WS 1442)",
      "Requires 4-8 weeks for maximal benefit",
      "Monitor BP and heart rate when initiating",
      "Generally well-tolerated; rare GI upset, dizziness",
    ],
    drugInteractions: [
      { drug: "Digoxin", severity: "contraindicated", detail: "May potentiate cardiac effects; requires monitoring" },
      { drug: "Antihypertensives", severity: "moderate", detail: "May enhance hypotensive effects" },
      { drug: "Phosphodiesterase-5 inhibitors", severity: "severe", detail: "Additive vasodilation; hypotension risk" },
      { drug: "Nitrates", severity: "moderate", detail: "Additive vasodilation" },
    ],
    pregnancyCategory: "unsafe",
    keyCitations: [
      { source: "Cochrane", title: "Hawthorn for chronic heart failure", url: "https://www.cochranelibrary.com", year: 2008 },
      { source: "JAMA", title: "SPICE trial: Hawthorn in heart failure", year: 2008 },
      { source: "Eur J Heart Fail", title: "Hawthorn in NYHA II heart failure", year: 2001 },
      { source: "Commission E", title: "Crataegi folium cum flore monograph", year: 1994 },
    ],
  },

  dandelion: {
    slug: "dandelion",
    summary: "Dandelion (Taraxacum officinale) is a ubiquitous plant with traditional use for liver support, digestion, and as a diuretic. The root and leaf have different profiles: root is cholagogue and hepatoprotective; leaf is diuretic. While widely used, clinical evidence is limited (Level C). The diuretic effect is comparable to furosemide in animal studies but human data is sparse. It is nutrient-dense (vitamins A, C, K; minerals) and generally very safe.",
    mechanism: "Root contains sesquiterpene lactones (taraxacin), triterpenes (taraxasterol), inulin (prebiotic), and phenolic acids. Leaf contains high potassium and flavonoids. Cholagogue effects stimulate bile flow (choleretic and cholagogue). Hepatoprotective effects may involve antioxidant and anti-inflammatory activity. Diuretic effects are via kidney Na+/K+ pump inhibition. Inulin supports gut microbiome. The high potassium content distinguishes it from conventional diuretics (which cause K+ loss). Some constituents demonstrate anti-inflammatory and antimicrobial properties.",
    claims: [
      { claim: "Liver support", evidence: "C", note: "Traditional use; limited clinical evidence" },
      { claim: "Digestive aid", evidence: "C", note: "Bitter stimulant; increases bile flow" },
      { claim: "Diuretic", evidence: "C", note: "Animal data suggests furosemide-like effect" },
      { claim: "Detoxification", evidence: "D", note: "Marketing term; no scientific basis" },
      { claim: "Nutritional support", evidence: "B", note: "High in vitamins A, C, K; minerals" },
    ],
    safetyNotes: [
      "Leaf: high potassium (may interact with potassium-sparing diuretics)",
      "Root: contains inulin (FODMAP—may cause GI symptoms)",
      "Avoid with bile duct obstruction, gallbladder disease",
      "Generally regarded as safe (GRAS) as food",
      "Leaf as tea: 4-10g dried leaf daily",
    ],
    drugInteractions: [
      { drug: "Diuretics", severity: "moderate", detail: "Additive diuretic effects" },
      { drug: "Lithium", severity: "moderate", detail: "May reduce lithium clearance" },
      { drug: "Anticoagulants", severity: "mild", detail: "High vitamin K in leaves" },
      { drug: "Quinolone antibiotics", severity: "mild", detail: "May reduce absorption" },
    ],
    pregnancyCategory: "insufficient",
    keyCitations: [
      { source: "J Ethnopharmacol", title: "Diuretic activity of dandelion", url: "https://www.sciencedirect.com", year: 2009 },
      { source: "Int J Mol Sci", title: "Hepatoprotective effects of dandelion", year: 2010 },
      { source: "NCCIH", title: "Dandelion Fact Sheet", year: 2024 },
    ],
  },
};

// Combine with existing premium monographs
import { monographs as existingMonographs } from "./monographs";

export const combinedMonographs: Record<string, Monograph> = {
  ...existingMonographs,
  ...premiumMonographs,
};
