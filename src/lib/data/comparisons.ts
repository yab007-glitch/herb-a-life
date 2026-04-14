/**
 * Curated herb comparisons — only suggest pairings that are genuinely useful.
 * 
 * These are herbs that people actually compare in real life (same condition, 
 * different mechanisms, common alternatives).
 * 
 * Key: slug → array of good comparison partners (ordered by relevance)
 */
export const CURATED_COMPARISONS: Record<string, string[]> = {
  // Adaptogens
  ashwagandha: ["rhodiola", "ginseng", "holy-basil"],
  rhodiola: ["ashwagandha", "ginseng", "maca"],
  ginseng: ["ashwagandha", "rhodiola", "eleuthero"],
  holy_basil: ["ashwagandha", "rhodiola", "tulsi"],
  
  // Anti-inflammatories
  turmeric: ["ginger", "boswellia", "devil-s-claw"],
  ginger: ["turmeric", "garlic", "cinnamon"],
  boswellia: ["turmeric", "devils-claw", "white-willow"],
  
  // Calming/Sleep
  chamomile: ["valerian", "lavender", "passionflower"],
  valerian: ["chamomile", "passionflower", "hops"],
  lavender: ["chamomile", "valerian", "lemon-balm"],
  passionflower: ["valerian", "chamomile", "kava"],
  
  // Digestive
  peppermint: ["fennel", "ginger", "chamomile"],
  fennel: ["peppermint", "ginger", "chamomile"],
  
  // Immune
  echinacea: ["elderberry", "astragalus", "garlic"],
  elderberry: ["echinacea", "astragalus", "garlic"],
  astragalus: ["echinacea", "elderberry", "reishi"],
  
  // Cognitive
  ginkgo: ["ginseng", "bacopa", "gotu-kola"],
  bacopa: ["ginkgo", "gotu-kola", "lion-s-mane"],
  
  // Heart/Circulatory
  hawthorn: ["garlic", "ginkgo", "cayenne"],
  garlic: ["hawthorn", "ginger", "turmeric"],
  
  // Liver
  milk_thistle: ["dandelion", "artichoke", "turmeric"],
  dandelion: ["milk-thistle", "burdock", "artichoke"],
  
  // Pain
  white_willow: ["turmeric", "boswellia", "devils-claw"],
  devils_claw: ["boswellia", "turmeric", "white-willow"],
  
  // Women's health
  black_cohosh: ["dong-quai", "red-clover", "vitex"],
  red_clover: ["black-cohosh", "dong-quai", "vitex"],
  
  // Men's health  
  saw_palmetto: ["nettle", "pumpkin-seed", "pygeum"],
  
  // Mood
  st_johns_wort: ["kava", "valerian", "rhodiola"],
  kava: ["valerian", "passionflower", "st-johns-wort"],
  
  // Skin
  aloe_vera: ["calendula", "tea-tree", "chamomile"],
  tea_tree: ["aloe-vera", "calendula", "eucalyptus"],
};

/**
 * Normalize a slug for lookup (handle common slug formats)
 */
function normalizeSlug(slug: string): string {
  return slug
    .replace(/[-_]/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .toLowerCase();
}

/**
 * Get good comparison herbs for a given herb slug.
 * Returns curated pairs first, then falls back to symptom-keyword overlap.
 */
export function getComparisonHerbs(
  slug: string,
  allHerbs: Array<{ name: string; slug: string; scientific_name: string; symptom_keywords?: string[] | null; traditional_uses?: string[] | null }>,
  limit: number = 3
): Array<{ name: string; slug: string; scientific_name: string }> {
  const normalized = normalizeSlug(slug);
  
  // 1. Check curated list first
  const curated = CURATED_COMPARISONS[normalized];
  if (curated && curated.length > 0) {
    const curatedMatches = curated
      .map((partnerSlug) => allHerbs.find((h) => normalizeSlug(h.slug) === normalizeSlug(partnerSlug)))
      .filter(Boolean) as Array<{ name: string; slug: string; scientific_name: string }>;
    
    if (curatedMatches.length > 0) {
      return curatedMatches.slice(0, limit);
    }
  }
  
  // 2. Fallback: Find herbs with overlapping symptom keywords or uses
  const currentHerb = allHerbs.find((h) => h.slug === slug);
  if (!currentHerb) return [];

  const currentKeywords = new Set([
    ...(currentHerb.symptom_keywords || []),
    ...(currentHerb.traditional_uses || []),
  ].map((k) => k.toLowerCase()));

  if (currentKeywords.size === 0) return [];

  // Score each herb by keyword overlap
  const scored = allHerbs
    .filter((h) => h.slug !== slug)
    .map((herb) => {
      const herbKeywords = [
        ...(herb.symptom_keywords || []),
        ...(herb.traditional_uses || []),
      ].map((k) => k.toLowerCase());
      
      const overlap = herbKeywords.filter((k) => currentKeywords.has(k)).length;
      return { herb, score: overlap };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.herb);
}