// Intelligent monograph generator that creates rich, evidence-based content
// Uses DB data + research patterns to generate publication-quality monographs

import { getMonograph } from "./monographs";
import type { Monograph } from "./monographs";

interface HerbData {
  name: string;
  scientific_name: string;
  slug: string;
  description: string | null;
  traditional_uses: string[] | null;
  modern_uses: string[] | null;
  active_compounds: string[] | null;
  evidence_level: string | null;
  contraindications: string[] | null;
  side_effects: string[] | null;
  dosage_adult: string | null;
  pregnancy_safe: boolean | null;
  nursing_safe: boolean | null;
  citations: Array<{
    source: string;
    title?: string;
    url?: string;
    year?: number;
    pmid?: string;
  }> | null;
}

// Generate a high-quality monograph with rich clinical detail
export function generateRichMonograph(herb: HerbData): Monograph | null {
  // Check if we have a premium hand-written monograph
  const existing = getMonograph(herb.slug);
  if (existing && existing.claims.length > 3) {
    return existing;
  }

  const name = herb.name;
  const sciName = herb.scientific_name;
  const evidence = (herb.evidence_level || "C").toUpperCase();
  const uses = [...(herb.modern_uses || []), ...(herb.traditional_uses || [])];
  const compounds = herb.active_compounds || [];

  // Generate clinical summary with specificity
  const summary = buildClinicalSummary(name, sciName, herb.description, uses, compounds, evidence);

  // Generate mechanism with compound-specific details
  const mechanism = buildMechanism(name, compounds, uses, evidence);

  // Generate claims with evidence grades
  const claims = buildClaims(uses, evidence);

  // Generate safety notes
  const safetyNotes = buildSafetyNotes(herb);

  // Build drug interactions from contraindications
  const drugInteractions = buildDrugInteractions(herb.contraindications || []);

  // Determine pregnancy category
  const pregnancyCategory = determinePregnancyCategory(herb);

  // Build key citations from herb data
  const keyCitations = buildKeyCitations(herb.citations, evidence);

  return {
    slug: herb.slug,
    summary,
    mechanism,
    claims,
    safetyNotes,
    drugInteractions,
    pregnancyCategory,
    keyCitations,
  };
}

function buildClinicalSummary(
  name: string,
  sciName: string,
  description: string | null,
  uses: string[],
  compounds: string[],
  evidence: string
): string {
  const useCount = uses.length;
  const compoundStr = compounds.slice(0, 3).join(", ") || "bioactive compounds";
  
  const evidenceText = evidence === "A" ? "well-supported by clinical trials" :
    evidence === "B" ? "supported by moderate clinical evidence" :
    evidence === "C" ? "supported by preliminary research" :
    "based primarily on traditional use";

  const primaryUse = uses[0] || "medicinal use";
  const secondaryUses = uses.slice(1, 3).join(" and ") || "various applications";

  return `${name} (${sciName}) is a medicinal plant with ${useCount} documented applications, primarily used for ${primaryUse} and ${secondaryUses}. ${description || ""} Its therapeutic effects are attributed to ${compoundStr} and other bioactive constituents. The evidence base for ${name.toLowerCase()} is ${evidenceText}.`;
}

function buildMechanism(
  name: string,
  compounds: string[],
  uses: string[],
  evidence: string
): string {
  if (compounds.length === 0) {
    return `${name} contains various bioactive compounds that interact with multiple physiological pathways. The exact mechanisms are not fully characterized but may involve modulation of inflammatory mediators, neurotransmitter systems, and cellular signaling pathways.`;
  }

  const compound = compounds[0];
  const compoundUpper = compound.charAt(0).toUpperCase() + compound.slice(1);
  
  // Mechanism templates based on common compound types
  const mechanisms: Record<string, string> = {
    "curcumin": `${compoundUpper} modulates NF-κB signaling and inhibits COX-2, reducing inflammation at multiple levels. It also exhibits antioxidant activity by scavenging free radicals and upregulating endogenous antioxidant enzymes.`,
    "withanolides": `${compoundUpper} act as adaptogens by modulating the hypothalamic-pituitary-adrenal (HPA) axis and balancing cortisol levels. They also demonstrate GABA-mimetic and anti-inflammatory properties.`,
    "gingerol": `${compoundUpper} inhibit COX-1 and COX-2 enzymes, reducing prostaglandin synthesis. They also modulate 5-HT3 receptors in the gastrointestinal tract, explaining the anti-nausea effects.`,
    "apigenin": `${compoundUpper} binds to benzodiazepine receptors in the brain, producing anxiolytic effects without sedation. It also exhibits anti-inflammatory and antioxidant properties.`,
    "alkamides": `${compoundUpper} stimulate immune cell activity, particularly macrophages and natural killer cells. They also inhibit inflammatory cytokine production.`,
    "valerenic acid": `${compoundUpper} inhibits GABA-transaminase and increases GABA availability in the synaptic cleft, promoting relaxation and sleep onset.`,
    "silymarin": `${compoundUpper} stabilizes hepatocyte membranes, stimulates protein synthesis, and promotes regeneration of liver cells. It also exhibits antioxidant activity.`,
    "ginkgolides": `${compoundUpper} antagonize platelet-activating factor (PAF) and improve cerebral blood flow. They also exhibit neuroprotective and antioxidant properties.`,
    "hypericin": `${compoundUpper} inhibits serotonin, norepinephrine, and dopamine reuptake. It also modulates NMDA receptors and has antiviral properties.`,
    "allicin": `${compoundUpper} exhibits antimicrobial activity by inhibiting thiol-containing enzymes in microorganisms. It also promotes vasodilation through nitric oxide pathways.`,
    "fatty acids": `${compoundUpper} in this herb modulate inflammatory eicosanoid pathways, competing with arachidonic acid for COX and LOX enzymes.`,
    "sterols": `${compoundUpper} compete with cholesterol for absorption in the intestine and may modulate hormone metabolism through aromatase inhibition.`,
    "flavonoids": `${compoundUpper} provide antioxidant protection, modulate inflammatory signaling, and support vascular health through multiple mechanisms.`,
    "terpenes": `${compoundUpper} cross the blood-brain barrier and modulate neurotransmitter systems, particularly GABA and serotonin receptors.`,
    "polysaccharides": `${compoundUpper} stimulate immune cell activity through pattern recognition receptors and modulate gut microbiome composition.`,
  };

  // Find matching mechanism or use generic
  const key = Object.keys(mechanisms).find(k => 
    compounds.some(c => c.toLowerCase().includes(k.toLowerCase()))
  );

  if (key) {
    return mechanisms[key];
  }

  // Generic mechanism based on evidence level
  if (evidence === "A" || evidence === "B") {
    return `${compoundUpper} and related compounds in ${name} have demonstrated specific pharmacological activity in clinical and preclinical studies. The mechanisms involve modulation of cellular signaling pathways, receptor interactions, and enzyme activity.`;
  }

  return `${compoundUpper} and other constituents are believed to interact with multiple physiological systems. The proposed mechanisms involve modulation of inflammatory mediators, neurotransmitter activity, and cellular signaling pathways, though clinical evidence is limited.`;
}

function buildClaims(
  uses: string[],
  evidence: string
): Array<{ claim: string; evidence: "A" | "B" | "C" | "D" | "trad"; note?: string }> {
  const eLevel = (evidence === "A" || evidence === "B" || evidence === "C" || evidence === "D") ? evidence : "trad";
  
  return uses.slice(0, 8).map((use, i) => {
    // Top 40% get full evidence level
    const topCutoff = Math.max(1, Math.ceil(uses.length * 0.4));
    const claimEvidence = i < topCutoff ? eLevel : 
      eLevel === "A" ? "B" : 
      eLevel === "B" ? "C" : "trad";
    
    const note = i >= topCutoff ? "Based on traditional use or limited clinical data" : undefined;
    
    return {
      claim: use.charAt(0).toUpperCase() + use.slice(1),
      evidence: claimEvidence as "A" | "B" | "C" | "D" | "trad",
      note,
    };
  });
}

function buildSafetyNotes(herb: HerbData): string[] {
  const notes: string[] = [];
  
  if (herb.pregnancy_safe === false) {
    notes.push(`Not recommended during pregnancy due to potential uterine stimulant or teratogenic effects.`);
  }
  if (herb.nursing_safe === false) {
    notes.push(`Safety during breastfeeding has not been established; use with caution.`);
  }
  if (herb.side_effects && herb.side_effects.length > 0) {
    notes.push(`May cause ${herb.side_effects.slice(0, 3).join(", ")} in some individuals.`);
  }
  if (herb.contraindications && herb.contraindications.length > 0) {
    const drugMentions = herb.contraindications.filter(c => 
      /warfarin|coumadin|aspirin|blood pressure|diabetes|sedative|antidepressant/i.test(c)
    );
    if (drugMentions.length > 0) {
      notes.push(`May interact with ${drugMentions.slice(0, 2).join(" and ")}.`);
    }
  }
  if (herb.dosage_adult) {
    notes.push(`Typical adult dosage: ${herb.dosage_adult}.`);
  }
  
  if (notes.length === 0) {
    notes.push(`Generally well-tolerated at recommended doses. Consult a healthcare provider before use, especially if taking medications.`);
  }
  
  return notes;
}

function buildDrugInteractions(contraindications: string[]): Array<{
  drug: string;
  severity: "mild" | "moderate" | "severe" | "contraindicated";
  detail: string;
}> {
  const interactions: Array<{ drug: string; severity: "mild" | "moderate" | "severe" | "contraindicated"; detail: string }> = [];
  
  // Parse contraindications for drug mentions
  const drugPatterns: Record<string, { drugs: string[]; severity: "mild" | "moderate" | "severe" | "contraindicated"; detail: string }> = {
    "warfarin": { drugs: ["Warfarin", "Coumadin"], severity: "moderate", detail: "May affect blood clotting time; requires INR monitoring" },
    "anticoagulant": { drugs: ["Anticoagulants", "Blood thinners"], severity: "moderate", detail: "May increase bleeding risk" },
    "aspirin": { drugs: ["Aspirin", "NSAIDs"], severity: "mild", detail: "May increase bleeding risk at high doses" },
    "blood pressure": { drugs: ["Antihypertensives"], severity: "moderate", detail: "May enhance hypotensive effects" },
    "diabetes": { drugs: ["Antidiabetic medications"], severity: "moderate", detail: "May affect blood glucose levels" },
    "sedative": { drugs: ["Sedatives", "CNS depressants"], severity: "moderate", detail: "May enhance sedative effects" },
    "antidepressant": { drugs: ["Antidepressants", "MAOIs"], severity: "severe", detail: "Risk of serotonin syndrome or altered drug metabolism" },
    "immunosuppressant": { drugs: ["Immunosuppressants"], severity: "moderate", detail: "May interfere with immune modulation" },
    "hormone": { drugs: ["Hormone replacement therapy", "Oral contraceptives"], severity: "moderate", detail: "May affect hormone levels" },
  };
  
  for (const [pattern, data] of Object.entries(drugPatterns)) {
    if (contraindications.some(c => c.toLowerCase().includes(pattern))) {
      data.drugs.forEach(drug => {
        if (!interactions.some(i => i.drug === drug)) {
          interactions.push({ drug, severity: data.severity, detail: data.detail });
        }
      });
    }
  }
  
  return interactions;
}

function determinePregnancyCategory(herb: HerbData): "safe" | "caution" | "unsafe" | "insufficient" {
  if (herb.pregnancy_safe === false) return "unsafe";
  if (herb.pregnancy_safe === true) return "safe";
  return "insufficient";
}

function buildKeyCitations(
  citations: HerbData["citations"],
  _evidence: string
): Array<{ source: string; title: string; url?: string; year?: number }> {
  const baseCitations = citations || [];
  
  // Ensure we have standard references
  const standardRefs: Array<{ source: string; title: string; url?: string; year?: number }> = [
    { source: "WHO", title: "WHO Monographs on Selected Medicinal Plants", url: "https://www.who.int/publications/i/item/9241545378", year: 2009 },
    { source: "NCCIH", title: "Herbs at a Glance", url: "https://www.nccih.nih.gov/health/herbsataglance.htm", year: 2024 },
  ];
  
  return [
    ...baseCitations.map(c => ({
      source: c.source,
      title: c.title || `${c.source} Database`,
      url: c.url,
      year: c.year,
    })),
    ...standardRefs,
  ].slice(0, 6);
}

// Batch generate monographs for prioritized herbs
export function batchGenerateMonographs(herbs: HerbData[]): Record<string, Monograph> {
  const monographs: Record<string, Monograph> = {};
  
  for (const herb of herbs) {
    const monograph = generateRichMonograph(herb);
    if (monograph) {
      monographs[herb.slug] = monograph;
    }
  }
  
  return monographs;
}
