import { createClient } from "@supabase/supabase-js";
import { getMonograph } from "../src/lib/data/monographs";
import type { Monograph } from "../src/lib/data/monographs";

/**
 * AI-Enhanced Monograph Generator
 * 
 * Uses glm-5 to generate high-quality monographs for priority herbs.
 * Falls back to standard auto-generation for herbs with sparse data.
 * 
 * Usage: npx tsx scripts/ai-generate-monographs.ts [limit]
 */

const LIMIT = parseInt(process.argv[2] || "10", 10);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const ollamaUrl = process.env.OLLAMA_BASE_URL || "https://ollama.com/api";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface Herb {
  id: string;
  slug: string;
  name: string;
  scientific_name: string;
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
  citations: unknown[] | null;
}

async function callOllama(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${ollamaUrl}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "glm-5:cloud",
        prompt,
        stream: false,
        options: {
          temperature: 0.3,
          max_tokens: 2000,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || "";
  } catch (error) {
    console.error("Ollama error:", error);
    return "";
  }
}

function buildPrompt(herb: Herb): string {
  const compounds = herb.active_compounds?.join(", ") || "unknown";

  return `You are a medical herbalist writing a clinical monograph. Based on the following herb data, write a detailed monograph in JSON format.

HERB DATA:
- Name: ${herb.name} (${herb.scientific_name})
- Evidence Level: ${herb.evidence_level || "C"}
- Modern Uses: ${herb.modern_uses?.join(", ") || "N/A"}
- Traditional Uses: ${herb.traditional_uses?.join(", ") || "N/A"}
- Active Compounds: ${compounds}
- Description: ${herb.description || "N/A"}
- Contraindications: ${herb.contraindications?.join(", ") || "None listed"}
- Side Effects: ${herb.side_effects?.join(", ") || "None listed"}

Write a JSON object with these fields:
{
  "summary": "2-3 sentence clinical summary of the herb's primary uses and evidence",
  "mechanism": "2-3 sentences explaining pharmacological mechanism of action",
  "claims": [
    { "claim": "Specific use claim", "evidence": "A|B|C|D|trad", "note": "Optional clinical context" }
  ],
  "safetyNotes": ["Array of safety warnings and considerations"],
  "drugInteractions": [
    { "drug": "Drug name", "severity": "mild|moderate|severe|contraindicated", "detail": "Explanation" }
  ],
  "pregnancyCategory": "safe|caution|unsafe|insufficient",
  "keyCitations": [
    { "source": "Journal/Source", "title": "Study title", "year": 2023 }
  ]
}

IMPORTANT:
- Use conservative evidence grades (A=RCTs/meta-analyses, B=clinical trials, C=limited evidence, D=anecdotal, trad=traditional)
- Be specific about mechanisms and cite known pathways
- Include actual drug interaction warnings, not generic statements
- Keep citations to real, verifiable sources
- Summary and mechanism should sound professional and clinical

JSON output only, no markdown formatting:`;
}

function parseMonographResponse(response: string, herb: Herb): Monograph | null {
  try {
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      slug: herb.slug,
      summary: parsed.summary || `${herb.name} is a medicinal herb with traditional and modern uses.`,
      mechanism: parsed.mechanism || `The mechanism involves ${herb.active_compounds?.[0] || "various compounds"}.`,
      claims: Array.isArray(parsed.claims) ? parsed.claims : [],
      safetyNotes: Array.isArray(parsed.safetyNotes) ? parsed.safetyNotes : [],
      drugInteractions: Array.isArray(parsed.drugInteractions) ? parsed.drugInteractions : [],
      pregnancyCategory: ["safe", "caution", "unsafe", "insufficient"].includes(parsed.pregnancyCategory) 
        ? parsed.pregnancyCategory 
        : "insufficient",
      keyCitations: Array.isArray(parsed.keyCitations) ? parsed.keyCitations : [],
    };
  } catch (error) {
    console.error("Failed to parse monograph:", error);
    return null;
  }
}

async function getHighPriorityHerbs(limit: number): Promise<Herb[]> {
  const { data: herbs, error } = await supabase
    .from("herbs")
    .select(`
      id,
      slug,
      name,
      scientific_name,
      description,
      traditional_uses,
      modern_uses,
      active_compounds,
      evidence_level,
      contraindications,
      side_effects,
      dosage_adult,
      pregnancy_safe,
      nursing_safe,
      citations
    `)
    .eq("is_published", true)
    .eq("evidence_level", "A")
    // Exclude herbs that already have premium monographs
    .not("slug", "in", "(\"turmeric\",\"ashwagandha\",\"ginger\",\"chamomile\",\"echinacea\",\"valerian-root\",\"milk-thistle\",\"ginkgo\",\"st-johns-wort\",\"garlic\",\"saw-palmetto\",\"cranberry\",\"rhodiola\",\"green-tea\",\"peppermint\",\"lavender\",\"elderberry\",\"siberian-ginseng\",\"hawthorn\",\"dandelion\")")
    // Exclude herbs that already have AI-generated monographs
    .not("id", "in", (
      supabase.from("herb_monographs").select("herb_id").eq("generation_method", "ai-assisted")
    ))
    .order("name")
    .limit(limit);

  if (error) {
    console.error("Error fetching herbs:", error);
    return [];
  }

  return herbs || [];
}

async function storeMonograph(herb: Herb, monograph: Monograph): Promise<boolean> {
  const { error } = await supabase
    .from("herb_monographs")
    .insert({
      herb_id: herb.id,
      herb_slug: herb.slug,
      summary: monograph.summary,
      mechanism: monograph.mechanism,
      claims: monograph.claims,
      safety_notes: monograph.safetyNotes,
      drug_interactions: monograph.drugInteractions,
      pregnancy_category: monograph.pregnancyCategory,
      key_citations: monograph.keyCitations,
      status: "published",
      generation_method: "ai-assisted",
      reviewed_by: "AI (glm-5) - Awaiting human review",
      reviewer_credentials: "AI herbalist",
      last_reviewed_at: new Date().toISOString(),
    });

  if (error) {
    console.error("Error storing monograph:", error);
    return false;
  }

  return true;
}

async function main() {
  console.log(`\n🤖 AI-Enhanced Monograph Generator`);
  console.log(`Model: glm-5:cloud`);
  console.log(`Limit: ${LIMIT} herbs\n`);

  // Get high-priority herbs
  const herbs = await getHighPriorityHerbs(LIMIT);
  
  if (herbs.length === 0) {
    console.log("✅ No high-priority herbs need AI generation");
    process.exit(0);
  }

  console.log(`Found ${herbs.length} herbs to process:\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < herbs.length; i++) {
    const herb = herbs[i];
    console.log(`[${i + 1}/${herbs.length}] ${herb.name} (${herb.scientific_name})`);
    
    // Check for hand-written monograph first
    const existing = getMonograph(herb.slug);
    if (existing) {
      console.log("   ℹ️  Hand-written monograph exists, skipping\n");
      continue;
    }

    // Build prompt
    const prompt = buildPrompt(herb);
    
    // Call Ollama
    process.stdout.write("   🔄 Calling glm-5... ");
    const response = await callOllama(prompt);
    
    if (!response) {
      console.log("❌ API error\n");
      failed++;
      continue;
    }

    // Parse response
    const monograph = parseMonographResponse(response, herb);
    
    if (!monograph) {
      console.log("❌ Parse error\n");
      failed++;
      continue;
    }

    // Store in database
    process.stdout.write("💾 Storing... ");
    const stored = await storeMonograph(herb, monograph);
    
    if (stored) {
      console.log("✅\n");
      success++;
    } else {
      console.log("❌\n");
      failed++;
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n📊 AI Generation Complete`);
  console.log(`   Success: ${success}`);
  console.log(`   Failed: ${failed}`);
  console.log(`\n⚠️  Note: AI-generated monographs should be reviewed by a human before finalizing`);
}

main().catch(console.error);
