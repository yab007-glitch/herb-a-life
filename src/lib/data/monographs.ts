// Top herb monographs with hand-written deep clinical content
// All other herbs get auto-generated monographs via generate-monograph.ts

export interface Monograph {
  summary: string;
  mechanism: string;
  claims: { claim: string; evidence: "A" | "B" | "C" | "D" | "trad"; note?: string }[];
  safetyNotes: string[];
  pregnancyCategory: "safe" | "caution" | "unsafe" | "insufficient";
}

export const monographs: Record<string, Monograph> = {
  turmeric: {
    summary: "Turmeric (Curcuma longa) is one of the most extensively studied medicinal herbs, with over 12,000 peer-reviewed publications. Its active compound curcumin demonstrates potent anti-inflammatory and antioxidant effects comparable to some NSAIDs in clinical trials, though bioavailability remains a significant challenge without formulation enhancements.",
    mechanism: "Curcumin modulates NF-κB, COX-2, and LOX inflammatory pathways while activating Nrf2 antioxidant response. It also influences epigenetic markers and gut microbiome composition. Bioavailability is enhanced 2,000% with piperine (black pepper extract) and further improved by liposomal or nanoparticle formulations.",
    claims: [
      { claim: "Osteoarthritis pain reduction", evidence: "A", note: "Multiple RCTs show 500mg BCM-95 formulation comparable to ibuprofen" },
      { claim: "Anti-inflammatory effect", evidence: "A", note: "NF-κB inhibition demonstrated in vivo and in clinical trials" },
      { claim: "Metabolic syndrome improvement", evidence: "B", note: "Meta-analysis shows significant reduction in triglycerides and BMI" },
      { claim: "Depression symptom improvement", evidence: "B", note: "Small RCTs comparable to fluoxetine; larger trials needed" },
      { claim: "Cancer prevention", evidence: "C", note: "Promising preclinical data but insufficient human RCTs" },
      { claim: "Alzheimer's prevention", evidence: "C", note: "Epidemiological support from Indian populations; clinical trials ongoing" },
    ],
    safetyNotes: [
      "GI upset common at doses >1,000mg/day",
      "Piperine-enhanced formulations may increase drug levels of many medications",
      "May increase bleeding risk; discontinue 2 weeks before surgery",
      "Gallbladder contraction — avoid with gallstones",
    ],
    pregnancyCategory: "caution",
  },
  ashwagandha: {
    summary: "Ashwagandha (Withania somnifera) is the flagship adaptogen in Ayurvedic medicine, with strong clinical evidence for stress reduction and anxiolysis. KSM-66® and Sensoril® extracts have the most robust trial data, showing cortisol reduction of 14.5-30% and significant improvements in perceived stress scales.",
    mechanism: "Withanolides (particularly withaferin A and withanolide D) modulate GABA-A receptors, reduce cortisol via HPA axis regulation, and activate Nrf2 antioxidant pathways. Root extracts (KSM-66) favor anxiolytic effects while leaf extracts (Sensoril) favor stress/adaptogenic effects.",
    claims: [
      { claim: "Stress and anxiety reduction", evidence: "A", note: "Multiple RCTs with KSM-66 showing significant cortisol reduction" },
      { claim: "Sleep quality improvement", evidence: "B", note: "RCTs show improved sleep onset latency and quality" },
      { claim: "Testosterone and fertility in men", evidence: "B", note: "RCTs show 10-17% increase in testosterone in healthy men" },
      { claim: "Athletic performance", evidence: "B", note: "RCTs show improved VO2 max and strength; some studies conflict" },
      { claim: "Thyroid function support", evidence: "C", note: "Small studies suggest T3/T4 normalization in subclinical hypothyroidism" },
      { claim: "Cognitive enhancement", evidence: "C", note: "Preliminary evidence for memory; more trials needed" },
    ],
    safetyNotes: [
      "Generally well-tolerated at standard doses (300-600mg root extract)",
      "May cause GI upset in 5-10% of users",
      "Nightshade family — avoid with nightshade sensitivity",
      "Can overstimulate thyroid in hyperthyroid patients",
    ],
    pregnancyCategory: "unsafe",
  },
  ginger: {
    summary: "Ginger (Zingiber officinale) has Level A evidence for nausea and vomiting, making it one of the most clinically validated herbs. Over 100 RCTs support its antiemetic efficacy, particularly for pregnancy-associated nausea and post-operative nausea. Its anti-inflammatory effects are also well-documented.",
    mechanism: "Gingerols and shogaols inhibit COX-2 and 5-LOX inflammatory pathways, activate serotonin 5-HT3 receptors in the gut (antiemetic), and accelerate gastric emptying. Fresh ginger has higher gingerol content; dried ginger has more shogaols.",
    claims: [
      { claim: "Pregnancy nausea reduction", evidence: "A", note: "Multiple systematic reviews confirm efficacy at 1-1.5g/day" },
      { claim: "Post-operative nausea prevention", evidence: "A", note: "Cochrane review supports 1g pre-operative dose" },
      { claim: "Osteoarthritis pain relief", evidence: "B", note: "Meta-analysis shows modest benefit comparable to ibuprofen" },
      { claim: "Dysmenorrhea reduction", evidence: "B", note: "RCTs show efficacy comparable to mefenamic acid" },
      { claim: "Blood sugar control", evidence: "C", note: "Small trials show improved fasting glucose; more evidence needed" },
    ],
    safetyNotes: [
      "Generally recognized as safe (GRAS) by FDA",
      "May cause heartburn at doses >4g/day",
      "Theoretical bleeding risk; discontinue before surgery",
      "Safe in pregnancy at recommended doses (≤1.5g/day)",
    ],
    pregnancyCategory: "safe",
  },
  chamomile: {
    summary: "Chamomile (Matricaria chamomilla) is one of the most widely consumed herbal teas globally, with Level A evidence for anxiety and sleep. Its essential oil contains apigenin, which binds benzodiazepine receptors, explaining its calming effects. Also has strong evidence for wound healing and GI soothing.",
    mechanism: "Apigenin binds GABA-A receptors (similar mechanism to benzodiazepines but weaker), bisabolol reduces inflammation via COX inhibition, and chamazulene provides antioxidant effects. Flavonoids contribute to spasmolytic effects on smooth muscle.",
    claims: [
      { claim: "Anxiety and calming effect", evidence: "A", note: "RCTs show significant reduction in GAD-7 scores with 1500mg extract" },
      { claim: "Sleep quality improvement", evidence: "A", note: "RCTs demonstrate improved sleep quality and reduced sleep latency" },
      { claim: "Wound healing", evidence: "B", note: "Topical chamomile extract accelerates wound healing in RCTs" },
      { claim: "GI discomfort relief", evidence: "B", note: "Systematic reviews support traditional use for dyspepsia and colic" },
      { claim: "Eczema and dermatitis", evidence: "C", note: "Small trials support topical use; more evidence needed" },
    ],
    safetyNotes: [
      "Generally very safe as a tea or standard dose extract",
      "Rare allergic reactions in people with asteraceae family allergy (ragweed, daisies)",
      "Contact dermatitis possible with concentrated essential oil",
    ],
    pregnancyCategory: "safe",
  },
  echinacea: {
    summary: "Echinacea (Echinacea purpurea/angustifolia) remains one of the most popular cold remedies globally, though clinical evidence is mixed. Meta-analyses suggest a modest 10-20% reduction in cold incidence and ~1.5 day reduction in duration when started early. Alkylamides in the root are the most immunologically active compounds.",
    mechanism: "Alkylamides activate CB2 cannabinoid receptors, chicoric acid stimulates phagocyte activity, and polysaccharides enhance NK cell function. Immune stimulation peaks at 7-10 days then downregulates — continuous use beyond 2 weeks not recommended.",
    claims: [
      { claim: "Cold duration reduction", evidence: "B", note: "Meta-analyses show ~1.5 day reduction when taken within 24h of symptom onset" },
      { claim: "Cold prevention", evidence: "B", note: "~10-20% reduction in cold incidence; effect modest" },
      { claim: "Upper respiratory infection support", evidence: "B", note: "Mixed results across trials; fresh pressed juice shows best effect" },
      { claim: "Wound healing (topical)", evidence: "C", note: "Traditional use supported; limited clinical data" },
    ],
    safetyNotes: [
      "Not recommended for continuous use beyond 8 weeks",
      "Risk of allergic reaction in asteraceae-sensitive individuals",
      "Autoimmune caution — stimulates immune system",
      "Taste tingling/numbing on tongue is normal (alkylamides)",
    ],
    pregnancyCategory: "caution",
  },
  "valerian-root": {
    summary: "Valerian (Valeriana officinalis) has Level A evidence for sleep improvement and is one of the most studied herbal sedatives. Its valepotriates and valerenic acid modulate GABA neurotransmission, though onset of effect may take 2-4 weeks of consistent use. Unlike benzodiazepines, it shows no next-day impairment in most studies.",
    mechanism: "Valerenic acid binds GABA-A receptors and inhibits GABA transaminase (increasing available GABA). Valepotriates provide sedative and anxiolytic effects. Hesperidin and linarin contribute additional sedative activity. Effects are cumulative over 2-4 weeks.",
    claims: [
      { claim: "Sleep quality improvement", evidence: "A", note: "Systematic reviews confirm improved sleep quality; effect takes 2-4 weeks" },
      { claim: "Sleep onset latency reduction", evidence: "B", note: "Reduces time to fall asleep by 15-20 minutes on average" },
      { claim: "Anxiety reduction", evidence: "B", note: "RCTs show efficacy comparable to low-dose benzodiazepines" },
      { claim: "Menopausal sleep disturbance", evidence: "C", note: "Small trials show benefit; more evidence needed" },
    ],
    safetyNotes: [
      "Generally safe; no significant next-day drowsiness in studies",
      "May cause vivid dreams in some users",
      "Start with low dose; increase gradually",
      "Withdrawal syndrome not documented but gradual taper recommended",
    ],
    pregnancyCategory: "unsafe",
  },
  "milk-thistle": {
    summary: "Milk Thistle (Silybum marianum) is the most researched hepatoprotective herb, with silymarin extract showing Level A evidence for liver protection against toxins. While popular for liver detoxification, clinical evidence for chronic liver disease is mixed, with best results in toxin-induced liver injury and fatty liver disease.",
    mechanism: "Silymarin (a mix of silibinin, silidianin, and silicristin) stabilizes hepatocyte membranes, stimulates protein synthesis and hepatocyte regeneration, inhibits NF-κB inflammatory pathway, and acts as a potent antioxidant (10x more potent than vitamin E). Phosphatidylcholine complexes (silipide) improve bioavailability 3-5x.",
    claims: [
      { claim: "Toxin-induced liver injury protection", evidence: "A", note: "Strong evidence for Amanita mushroom poisoning and occupational toxin exposure" },
      { claim: "Non-alcoholic fatty liver disease (NAFLD)", evidence: "B", note: "Meta-analyses show reduced ALT/AST and liver fat" },
      { claim: "Alcoholic liver disease", evidence: "B", note: "Cochrane review shows reduced mortality; heterogenous evidence" },
      { claim: "Hepatitis C support", evidence: "C", note: "Some improvement in ALT levels; no clear effect on viral load" },
      { claim: "Diabetes management", evidence: "C", note: "Small RCTs show improved HbA1c and insulin sensitivity" },
    ],
    safetyNotes: [
      "Generally very safe; GI upset most common side effect",
      "Rare allergic reactions in asteraceae-sensitive individuals",
      "May have estrogenic effects — caution in hormone-sensitive conditions",
      "Low oral bioavailability (23-47%); use standardized extract",
    ],
    pregnancyCategory: "caution",
  },
};

export function getMonograph(slug: string): Monograph | null {
  return monographs[slug] || null;
}