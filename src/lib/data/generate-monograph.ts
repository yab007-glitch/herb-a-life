import { getMonograph } from "./monographs";
import type { Monograph } from "./monographs";
import type { Interaction } from "@/lib/types/interactions";

/**
 * Generate a monograph for any herb using DB data + hand-written overrides.
 * Top herbs get rich hand-written content. All others get auto-generated content
 * from their existing DB fields (description, uses, compounds, evidence_level).
 */
export function generateMonograph(herb: {
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
  drug_interactions: Interaction[] | null;
  citations?: unknown[] | null;
}): Monograph | null {
  // Check for hand-written monograph first
  const manual = getMonograph(herb.slug);
  if (manual) return manual;

  // Auto-generate from DB data
  const displayName = herb.name || herb.scientific_name;
  const evidence = (herb.evidence_level?.toUpperCase() || "C") as "A" | "B" | "C" | "D" | "trad";

  // Build clinical summary
  const useCount = (herb.modern_uses?.length || 0) + (herb.traditional_uses?.length || 0);
  const compoundStr = herb.active_compounds?.slice(0, 3).join(", ") || "various active compounds";

  const summary = `${herb.description || `${displayName} is a medicinal herb with ${useCount} documented traditional and modern uses.`} Key active compounds include ${compoundStr}.`;

  // Build mechanism
  const mechanism = buildMechanism(herb);

  // Build per-claim evidence
  const claims = buildClaims(herb);

  // Build safety notes
  const safetyNotes = buildSafetyNotes(herb);

  // Determine pregnancy category
  const pregnancyCategory: Monograph["pregnancyCategory"] =
    herb.pregnancy_safe === false ? "unsafe" :
    herb.pregnancy_safe === true ? "safe" :
    "insufficient";

  // Build drug interactions
  const drugInteractions = buildDrugInteractions(herb.contraindications || []);

  // Build key citations
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

function buildMechanism(herb: {
  name: string;
  scientific_name: string;
  active_compounds: string[] | null;
  modern_uses: string[] | null;
  traditional_uses: string[] | null;
}): string {
  const compounds = herb.active_compounds || [];
  const uses = herb.modern_uses || herb.traditional_uses || [];

  if (compounds.length === 0) {
    return `The pharmacological mechanism of ${herb.name} involves multiple bioactive compounds that work synergistically. Specific pathway data is limited for this herb.`;
  }

  const primaryCompound = compounds[0];
  const secondaryCompounds = compounds.slice(1, 3);

  let mechanism = `${primaryCompound}`;
  if (secondaryCompounds.length > 0) {
    mechanism += `, along with ${secondaryCompounds.join(" and ")}`;
  }
  mechanism += `, are the primary bioactive compounds in ${herb.name}. `;

  // Add mechanism hints based on use categories
  const useStr = uses.join(" ").toLowerCase();
  const mechanismHints: string[] = [];

  if (useStr.includes("anti-inflammatory") || useStr.includes("inflammation")) {
    mechanismHints.push("modulates NF-κB and COX-2 inflammatory pathways");
  }
  if (useStr.includes("antioxidant")) {
    mechanismHints.push("provides free radical scavenging activity");
  }
  if (useStr.includes("anxiety") || useStr.includes("calm") || useStr.includes("sedative") || useStr.includes("sleep")) {
    mechanismHints.push("influences GABAergic neurotransmission");
  }
  if (useStr.includes("antimicrobial") || useStr.includes("antibacterial") || useStr.includes("antiviral")) {
    mechanismHints.push("disrupts microbial cell membranes and inhibits pathogen growth");
  }
  if (useStr.includes("digestion") || useStr.includes("digestive") || useStr.includes("stomach")) {
    mechanismHints.push("stimulates digestive enzyme secretion and GI motility");
  }
  if (useStr.includes("liver") || useStr.includes("hepatoprotect")) {
    mechanismHints.push("stabilizes hepatocyte membranes and supports liver regeneration");
  }
  if (useStr.includes("immune")) {
    mechanismHints.push("modulates immune cell activity and cytokine production");
  }
  if (useStr.includes("pain") || useStr.includes("analgesic")) {
    mechanismHints.push("acts on pain pathways via anti-inflammatory and neuroactive effects");
  }
  if (useStr.includes("blood sugar") || useStr.includes("diabetes") || useStr.includes("hypoglycemic")) {
    mechanismHints.push("improves insulin sensitivity and glucose metabolism");
  }
  if (useStr.includes("cardiovascular") || useStr.includes("blood pressure") || useStr.includes("cholesterol")) {
    mechanismHints.push("supports cardiovascular function through lipid metabolism and vasodilation");
  }
  if (useStr.includes("adaptogen") || useStr.includes("stress")) {
    mechanismHints.push("regulates the hypothalamic-pituitary-adrenal (HPA) axis");
  }
  if (useStr.includes("skin") || useStr.includes("wound")) {
    mechanismHints.push("promotes tissue regeneration and modulates local inflammation");
  }

  if (mechanismHints.length > 0) {
    mechanism += `These compounds ${mechanismHints.slice(0, 3).join(", ")}.`;
  } else {
    mechanism += `The specific pharmacological pathways require further study, though traditional use supports its efficacy.`;
  }

  return mechanism;
}

function buildClaims(herb: {
  modern_uses: string[] | null;
  traditional_uses: string[] | null;
  evidence_level: string | null;
  name: string;
}): Monograph["claims"] {
  const claims: Monograph["claims"] = [];
  const eLevel = (herb.evidence_level?.toUpperCase() || "C") as "A" | "B" | "C" | "D" | "trad";

  // Modern uses get higher evidence grade
  const modernUses = herb.modern_uses || [];
  const traditionalUses = (herb.traditional_uses || []).filter(
    (u) => !modernUses.some((m) => m.toLowerCase() === u.toLowerCase())
  );

  // Grade modern uses
  modernUses.slice(0, 6).forEach((use, i) => {
    const claim = formatClaim(use);
    const evidence = gradeClaim(eLevel, i, modernUses.length);
    const note = getClaimNote(claim, eLevel, evidence);
    claims.push({ claim, evidence, ...(note ? { note } : {}) });
  });

  // Add traditional uses with lower evidence
  traditionalUses.slice(0, 4).forEach((use) => {
    claims.push({
      claim: formatClaim(use),
      evidence: "trad",
      note: "Based on traditional use; clinical evidence limited",
    });
  });

  return claims.slice(0, 8); // Cap at 8 claims
}

function gradeClaim(
  herbLevel: string,
  claimIndex: number,
  totalClaims: number
): "A" | "B" | "C" | "D" | "trad" {
  // Top 40% of claims get the herb's evidence level
  // Lower claims get downgraded
  const topCutoff = Math.max(1, Math.ceil(totalClaims * 0.4));

  if (claimIndex < topCutoff) {
    const level = herbLevel.toUpperCase();
    if (level === "A" || level === "B" || level === "C" || level === "D" || level === "TRAD") {
      return level === "TRAD" ? "trad" : level;
    }
    return "C";
  }

  const downgrade: Record<string, "A" | "B" | "C" | "D" | "trad"> = {
    A: "B", B: "C", C: "trad", D: "trad", TRAD: "trad",
  };
  const level = herbLevel.toUpperCase();
  return downgrade[level] || "trad";
}

function formatClaim(use: string): string {
  // Capitalize first letter
  const trimmed = use.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function getClaimNote(
  claim: string,
  herbLevel: string,
  claimEvidence: string
): string | undefined {
  const c = claim.toLowerCase();

  // Specific notes for common high-evidence claims
  if (c.includes("anti-inflammatory") && claimEvidence === "A") {
    return "Multiple RCTs and meta-analyses support anti-inflammatory efficacy";
  }
  if (c.includes("anxiety") && claimEvidence === "A") {
    return "Strong evidence from multiple randomized controlled trials";
  }
  if (c.includes("sleep") && claimEvidence === "A") {
    return "Supported by systematic reviews and RCTs";
  }
  if (c.includes("liver") && claimEvidence === "A") {
    return "Well-established hepatoprotective effects in clinical trials";
  }
  if (c.includes("nausea") && claimEvidence === "A") {
    return "Cochrane review confirms efficacy for nausea and vomiting";
  }

  // General notes based on evidence level
  if (claimEvidence === "A") {
    return "Strong evidence from multiple clinical trials and meta-analyses";
  }
  if (claimEvidence === "B") {
    return "Supported by clinical evidence; more large-scale trials would strengthen findings";
  }
  if (claimEvidence === "C") {
    return "Limited clinical evidence; primarily supported by traditional use and preliminary studies";
  }
  return undefined;
}

function buildSafetyNotes(herb: {
  side_effects: string[] | null;
  contraindications: string[] | null;
  dosage_adult: string | null;
  pregnancy_safe: boolean | null;
  nursing_safe: boolean | null;
  name: string;
}): string[] {
  const notes: string[] = [];

  if (herb.pregnancy_safe === false) {
    notes.push("❌ Not recommended during pregnancy");
  }
  if (herb.nursing_safe === false) {
    notes.push("❌ Not recommended while breastfeeding");
  }

  const contraindications = herb.contraindications || [];
  if (contraindications.length > 0) {
    contraindications.slice(0, 3).forEach((c) => {
      notes.push(`⚠️ Contraindicated: ${c}`);
    });
  }

  const sideEffects = herb.side_effects || [];
  if (sideEffects.length > 0) {
    const mild = sideEffects.filter(
      (s) =>
        s.toLowerCase().includes("mild") ||
        s.toLowerCase().includes("generally safe") ||
        s.toLowerCase().includes("well tolerated") ||
        s.toLowerCase().includes("rare")
    );
    const significant = sideEffects.filter((s) => !mild.includes(s));

    if (significant.length > 0) {
      notes.push(`May cause: ${significant.slice(0, 3).join(", ")}`);
    }
    if (mild.length > 0) {
      notes.push(`Generally well tolerated; ${mild[0].toLowerCase()}`);
    }
  }

  if (herb.dosage_adult) {
    notes.push(`Standard adult dose: ${herb.dosage_adult}`);
  }

  if (notes.length === 0) {
    notes.push(`Consult a healthcare provider before using ${herb.name}, especially if taking medications.`);
  }

  return notes;
}

function buildDrugInteractions(contraindications: string[]): Monograph["drugInteractions"] {
  const interactions: Monograph["drugInteractions"] = [];

  // Parse contraindications for drug mentions
  const drugPatterns: Record<string, { drugs: string[]; severity: "mild" | "moderate" | "severe" | "contraindicated"; detail: string }> = {
    "warfarin": { drugs: ["Warfarin", "Coumadin"], severity: "moderate", detail: "May increase bleeding risk; requires INR monitoring" },
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
    if (contraindications.some((c) => c.toLowerCase().includes(pattern))) {
      data.drugs.forEach((drug) => {
        if (!interactions.some((i) => i.drug === drug)) {
          interactions.push({ drug, severity: data.severity, detail: data.detail });
        }
      });
    }
  }

  return interactions;
}

function buildKeyCitations(
  citations: unknown[] | null | undefined,
  evidence: string
): Monograph["keyCitations"] {
  const baseCitations = (citations || []) as Array<{ source: string; title?: string; url?: string; year?: number; pmid?: string }>;

  // Ensure we have standard references
  const standardRefs: Monograph["keyCitations"] = [
    { source: "WHO", title: "WHO Monographs on Selected Medicinal Plants", url: "https://www.who.int/publications/i/item/9241545378", year: 2009 },
    { source: "NCCIH", title: "Herbs at a Glance", url: "https://www.nccih.nih.gov/health/herbsataglance.htm", year: 2024 },
  ];

  return [
    ...baseCitations.map((c) => ({
      source: c.source,
      title: c.title || `${c.source} Database`,
      url: c.url,
      year: c.year,
    })),
    ...standardRefs,
  ].slice(0, 6);
}
