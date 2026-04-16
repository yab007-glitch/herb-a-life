#!/usr/bin/env npx tsx
/**
 * HerbAlly — French Translation Script
 *
 * Translates all herb content, drug interactions, and categories into French
 * using the OpenRouter API, then stores results in the Supabase database.
 *
 * Prerequisites:
 *   Add SUPABASE_SERVICE_ROLE_KEY to your .env.local file.
 *   (Find it in: Supabase dashboard → Project Settings → API → service_role key)
 *
 * Run:
 *   npx tsx scripts/translate-herbs-fr.ts
 *
 * The script is resumable — herbs already translated are skipped automatically.
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

// Load .env.local — dotenv handles quoting, multi-value, and all edge cases
dotenv.config({ path: path.join(process.cwd(), ".env.local"), override: false });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const OPENROUTER_KEY = (process.env.OPENROUTER_API_KEY ?? "").trim();
const BASE_URL = (process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1").trim();
const MODEL = (process.env.OPENROUTER_MODEL ?? "openrouter/auto").trim();

const HERB_BATCH = 3;   // herbs per API call
const HERB_DELAY = 4000; // ms between herb calls (respect 20 req/min limit)
const IX_BATCH = 5;     // interactions per API call
const IX_DELAY = 4000;  // ms between interaction calls
const CAT_DELAY = 4000; // ms between category calls
const MAX_RETRIES = 3;  // retries on 429
const RETRY_WAIT = 65000; // ms to wait on rate limit (1 min + buffer)

// ── Validation ───────────────────────────────────────────────────────────────

if (!SUPABASE_URL) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
  process.exit(1);
}
if (!SERVICE_KEY) {
  console.error("❌ Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
  console.error("   Get it from: Supabase dashboard → Project Settings → API → service_role");
  process.exit(1);
}
if (!OPENROUTER_KEY) {
  console.error("❌ Missing OPENROUTER_API_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

// ── AI translation ────────────────────────────────────────────────────────────

async function translateJSON(input: object, attempt = 1): Promise<object> {
  const prompt = [
    "You are a professional medical translator specialising in herbal medicine.",
    "Translate the JSON below from English to French.",
    "Rules:",
    "- Return ONLY valid JSON — no markdown, no code fences, no explanation.",
    "- Keep scientific/Latin names, chemical compound names, and drug names in English.",
    "- Keep dosage numbers and units unchanged (mg, g, ml, drops, etc.).",
    "- Translate all other text naturally into professional French.",
    "- Preserve the exact JSON structure (same keys, same array lengths).",
    "",
    `JSON to translate:\n${JSON.stringify(input, null, 2)}`,
  ].join("\n");

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://herbally.app",
      "X-Title": "HerbAlly Translation",
    },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (response.status === 429 && attempt <= MAX_RETRIES) {
    console.log(`    ⏳ Rate limited — waiting ${RETRY_WAIT / 1000}s before retry ${attempt}/${MAX_RETRIES}…`);
    await sleep(RETRY_WAIT);
    return translateJSON(input, attempt + 1);
  }

  if (!response.ok) {
    const err = await response.text().catch(() => "");
    throw new Error(`OpenRouter ${response.status}: ${err.slice(0, 200)}`);
  }

  const result = await response.json();
  const raw = (result.choices?.[0]?.message?.content ?? "").trim();
  const clean = raw.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();

  try {
    return JSON.parse(clean);
  } catch {
    throw new Error(`AI returned invalid JSON: ${clean.slice(0, 300)}`);
  }
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

// ── 1. Categories ─────────────────────────────────────────────────────────────

async function translateCategories() {
  console.log("\n📂 Translating herb categories…");

  const { data: cats, error } = await supabase
    .from("herb_categories")
    .select("id, name, description")
    .is("name_fr", null);

  if (error) { console.error("  ❌", error.message); return; }
  if (!cats?.length) { console.log("  ✓ All categories already translated"); return; }

  console.log(`  Found ${cats.length} untranslated categories`);

  for (const cat of cats) {
    try {
      const translated = await translateJSON({
        name: cat.name,
        description: cat.description ?? "",
      }) as { name: string; description: string };

      const { error: upErr } = await supabase
        .from("herb_categories")
        .update({ name_fr: translated.name, description_fr: translated.description })
        .eq("id", cat.id);

      if (upErr) {
        console.error(`  ❌ "${cat.name}": ${upErr.message}`);
      } else {
        console.log(`  ✓ ${cat.name} → ${translated.name}`);
      }
      await sleep(CAT_DELAY);
    } catch (e) {
      console.error(`  ❌ "${cat.name}":`, (e as Error).message);
      await sleep(CAT_DELAY);
    }
  }
}

// ── 2. Herbs ──────────────────────────────────────────────────────────────────

async function translateHerbs() {
  console.log("\n🌿 Translating herbs…");

  const { count } = await supabase
    .from("herbs")
    .select("id", { count: "exact", head: true })
    .eq("is_published", true);

  console.log(`  Total published herbs: ${count ?? 0}`);

  let offset = 0;
  let translated = 0;
  let skipped = 0;
  let errors = 0;

  while (true) {
    const { data: herbs, error } = await supabase
      .from("herbs")
      .select(
        "id, name, common_names, description, traditional_uses, modern_uses, dosage_adult, dosage_child, preparation_notes, contraindications, side_effects, translations"
      )
      .eq("is_published", true)
      .order("name")
      .range(offset, offset + HERB_BATCH - 1);

    if (error) { console.error("  ❌ Fetch:", error.message); break; }
    if (!herbs?.length) break;

    for (const herb of herbs) {
      const existing = herb.translations as Record<string, unknown> | null;
      if (existing?.fr) { skipped++; continue; }

      try {
        const input = {
          name: herb.name,
          common_names: herb.common_names ?? [],
          description: herb.description,
          traditional_uses: herb.traditional_uses ?? [],
          modern_uses: herb.modern_uses ?? [],
          dosage_adult: herb.dosage_adult ?? "",
          dosage_child: herb.dosage_child ?? "",
          preparation_notes: herb.preparation_notes ?? "",
          contraindications: herb.contraindications ?? [],
          side_effects: herb.side_effects ?? [],
        };

        const fr = await translateJSON(input);
        const newTranslations = { ...(existing ?? {}), fr };

        const { error: upErr } = await supabase
          .from("herbs")
          .update({ translations: newTranslations })
          .eq("id", herb.id);

        if (upErr) {
          console.error(`  ❌ ${herb.name}: ${upErr.message}`);
          errors++;
        } else {
          translated++;
          const total = count ?? 0;
          const pct = total ? Math.round((translated / (total - skipped)) * 100) : 0;
          console.log(`  ✓ [${translated} done, ${skipped} skipped, ${pct}%] ${herb.name}`);
        }
        await sleep(HERB_DELAY);
      } catch (e) {
        console.error(`  ❌ ${herb.name}:`, (e as Error).message);
        errors++;
        await sleep(HERB_DELAY);
      }
    }

    offset += HERB_BATCH;
    if (herbs.length < HERB_BATCH) break;
  }

  console.log(`  Herbs done: ${translated} translated, ${skipped} skipped, ${errors} errors`);
}

// ── 3. Drug interactions ──────────────────────────────────────────────────────

async function translateInteractions() {
  console.log("\n💊 Translating drug interactions…");

  const { count } = await supabase
    .from("drug_interactions")
    .select("id", { count: "exact", head: true });

  console.log(`  Total interactions: ${count ?? 0}`);

  let offset = 0;
  let translated = 0;
  let skipped = 0;
  let errors = 0;

  while (true) {
    const { data: ixs, error } = await supabase
      .from("drug_interactions")
      .select("id, drug_name, description, mechanism, translations")
      .order("drug_name")
      .range(offset, offset + IX_BATCH - 1);

    if (error) { console.error("  ❌ Fetch:", error.message); break; }
    if (!ixs?.length) break;

    for (const ix of ixs) {
      const existing = ix.translations as Record<string, unknown> | null;
      if (existing?.fr) { skipped++; continue; }

      try {
        const fr = await translateJSON({
          description: ix.description,
          mechanism: ix.mechanism ?? "",
        });

        const newTranslations = { ...(existing ?? {}), fr };

        const { error: upErr } = await supabase
          .from("drug_interactions")
          .update({ translations: newTranslations })
          .eq("id", ix.id);

        if (upErr) {
          console.error(`  ❌ ${ix.drug_name}: ${upErr.message}`);
          errors++;
        } else {
          translated++;
          if (translated % 20 === 0) {
            console.log(`  ✓ ${translated} interactions translated…`);
          }
        }
        await sleep(IX_DELAY);
      } catch (e) {
        console.error(`  ❌ ${ix.drug_name}:`, (e as Error).message);
        errors++;
        await sleep(IX_DELAY);
      }
    }

    offset += IX_BATCH;
    if (ixs.length < IX_BATCH) break;
  }

  console.log(`  Interactions done: ${translated} translated, ${skipped} skipped, ${errors} errors`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌿 HerbAlly — French Translation Script");
  console.log(`   Model  : ${MODEL}`);
  console.log(`   Supabase: ${SUPABASE_URL}`);

  await translateCategories();
  await translateHerbs();
  await translateInteractions();

  console.log("\n✅ All done! Run the script again anytime to translate newly added content.");
}

main().catch((e) => {
  console.error("\nFatal:", e);
  process.exit(1);
});
