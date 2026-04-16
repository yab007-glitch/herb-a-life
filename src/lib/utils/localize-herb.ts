import type { Herb, DrugInteraction, HerbCategory } from "@/lib/types";

interface HerbFr {
  name?: string;
  common_names?: string[];
  description?: string;
  traditional_uses?: string[];
  modern_uses?: string[];
  dosage_adult?: string;
  dosage_child?: string;
  preparation_notes?: string;
  contraindications?: string[];
  side_effects?: string[];
}

interface InteractionFr {
  description?: string;
  mechanism?: string;
}

function fr<T>(translations: unknown): T | null {
  if (!translations || typeof translations !== "object") return null;
  return ((translations as Record<string, unknown>).fr as T) ?? null;
}

/** Overlay French translations onto an herb when locale is "fr". Falls back to English fields when a translation is missing. */
export function localizeHerb<T extends Herb>(herb: T, locale: string): T {
  if (locale !== "fr") return herb;
  const t = fr<HerbFr>(herb.translations);
  if (!t) return herb;
  return {
    ...herb,
    name: t.name || herb.name,
    common_names: t.common_names?.length ? t.common_names : herb.common_names,
    description: t.description || herb.description,
    traditional_uses: t.traditional_uses?.length ? t.traditional_uses : herb.traditional_uses,
    modern_uses: t.modern_uses?.length ? t.modern_uses : herb.modern_uses,
    dosage_adult: t.dosage_adult || herb.dosage_adult,
    dosage_child: t.dosage_child || herb.dosage_child,
    preparation_notes: t.preparation_notes || herb.preparation_notes,
    contraindications: t.contraindications?.length ? t.contraindications : herb.contraindications,
    side_effects: t.side_effects?.length ? t.side_effects : herb.side_effects,
  };
}

/** Overlay French translation onto a drug interaction. */
export function localizeInteraction(ix: DrugInteraction, locale: string): DrugInteraction {
  if (locale !== "fr") return ix;
  const t = fr<InteractionFr>(ix.translations);
  if (!t) return ix;
  return {
    ...ix,
    description: t.description || ix.description,
    mechanism: t.mechanism !== undefined ? t.mechanism : ix.mechanism,
  };
}

/** Return French category name when available. */
export function localizeCategoryName(cat: HerbCategory & { name_fr?: string | null }, locale: string): string {
  if (locale !== "fr") return cat.name;
  return cat.name_fr || cat.name;
}
