// Top 120 herbs prioritized for hand-written monographs
// Based on: evidence level (A/B), use count, citations, and popularity
// This list should cover ~90% of user searches

export interface MonographTemplate {
  slug: string;
  name: string;
  scientificName: string;
  priority: "critical" | "high" | "medium" | "low";
  category: string;
  estimatedHours: number; // Time to write quality monograph
}

// Batch 1: Critical (Top 20) - Most searched, highest evidence
export const CRITICAL_HERBS: MonographTemplate[] = [
  { slug: "turmeric", name: "Turmeric", scientificName: "Curcuma longa", priority: "critical", category: "anti-inflammatory", estimatedHours: 4 },
  { slug: "ashwagandha", name: "Ashwagandha", scientificName: "Withania somnifera", priority: "critical", category: "adaptogen", estimatedHours: 4 },
  { slug: "ginger", name: "Ginger", scientificName: "Zingiber officinale", priority: "critical", category: "digestive", estimatedHours: 4 },
  { slug: "chamomile", name: "Chamomile", scientificName: "Matricaria chamomilla", priority: "critical", category: "relaxant", estimatedHours: 3 },
  { slug: "echinacea", name: "Echinacea", scientificName: "Echinacea purpurea", priority: "critical", category: "immune", estimatedHours: 3 },
  { slug: "valerian-root", name: "Valerian Root", scientificName: "Valeriana officinalis", priority: "critical", category: "sleep", estimatedHours: 3 },
  { slug: "milk-thistle", name: "Milk Thistle", scientificName: "Silybum marianum", priority: "critical", category: "liver", estimatedHours: 3 },
  { slug: "ginkgo", name: "Ginkgo", scientificName: "Ginkgo biloba", priority: "critical", category: "cognitive", estimatedHours: 4 },
  { slug: "st-johns-wort", name: "St. John's Wort", scientificName: "Hypericum perforatum", priority: "critical", category: "mood", estimatedHours: 4 },
  { slug: "garlic", name: "Garlic", scientificName: "Allium sativum", priority: "critical", category: "cardiovascular", estimatedHours: 3 },
  { slug: "saw-palmetto", name: "Saw Palmetto", scientificName: "Serenoa repens", priority: "critical", category: "mens-health", estimatedHours: 3 },
  { slug: "cranberry", name: "Cranberry", scientificName: "Vaccinium macrocarpon", priority: "critical", category: "urinary", estimatedHours: 3 },
  { slug: "rhodiola", name: "Rhodiola", scientificName: "Rhodiola rosea", priority: "critical", category: "adaptogen", estimatedHours: 3 },
  { slug: "green-tea", name: "Green Tea", scientificName: "Camellia sinensis", priority: "critical", category: "antioxidant", estimatedHours: 3 },
  { slug: "peppermint", name: "Peppermint", scientificName: "Mentha × piperita", priority: "critical", category: "digestive", estimatedHours: 3 },
  { slug: "lavender", name: "Lavender", scientificName: "Lavandula angustifolia", priority: "critical", category: "relaxant", estimatedHours: 3 },
  { slug: "elderberry", name: "Elderberry", scientificName: "Sambucus nigra", priority: "critical", category: "immune", estimatedHours: 3 },
  { slug: "siberian-ginseng", name: "Siberian Ginseng", scientificName: "Eleutherococcus senticosus", priority: "critical", category: "adaptogen", estimatedHours: 3 },
  { slug: "hawthorn", name: "Hawthorn", scientificName: "Crataegus laevigata", priority: "critical", category: "cardiovascular", estimatedHours: 3 },
  { slug: "dandelion", name: "Dandelion", scientificName: "Taraxacum officinale", priority: "critical", category: "diuretic", estimatedHours: 2 },
];

// Batch 2: High Priority (21-50) - Popular herbs with good evidence
export const HIGH_PRIORITY_HERBS: MonographTemplate[] = [
  { slug: "black-cohosh", name: "Black Cohosh", scientificName: "Actaea racemosa", priority: "high", category: "womens-health", estimatedHours: 3 },
  { slug: "evening-primrose", name: "Evening Primrose", scientificName: "Oenothera biennis", priority: "high", category: "womens-health", estimatedHours: 3 },
  { slug: "dong-quai", name: "Dong Quai", scientificName: "Angelica sinensis", priority: "high", category: "womens-health", estimatedHours: 3 },
  { slug: "red-clover", name: "Red Clover", scientificName: "Trifolium pratense", priority: "high", category: "womens-health", estimatedHours: 3 },
  { slug: "chasteberry", name: "Chasteberry", scientificName: "Vitex agnus-castus", priority: "high", category: "womens-health", estimatedHours: 3 },
  { slug: "maca", name: "Maca", scientificName: "Lepidium meyenii", priority: "high", category: "energy", estimatedHours: 3 },
  { slug: "tribulus", name: "Tribulus", scientificName: "Tribulus terrestris", priority: "high", category: "mens-health", estimatedHours: 3 },
  { slug: "fenugreek", name: "Fenugreek", scientificName: "Trigonella foenum-graecum", priority: "high", category: "metabolic", estimatedHours: 3 },
  { slug: "cinnamon", name: "Cinnamon", scientificName: "Cinnamomum verum", priority: "high", category: "metabolic", estimatedHours: 3 },
  { slug: "bitter-melon", name: "Bitter Melon", scientificName: "Momordica charantia", priority: "high", category: "metabolic", estimatedHours: 3 },
  { slug: "gymnema", name: "Gymnema", scientificName: "Gymnema sylvestre", priority: "high", category: "metabolic", estimatedHours: 3 },
  { slug: "aloe-vera", name: "Aloe Vera", scientificName: "Aloe barbadensis", priority: "high", category: "skin", estimatedHours: 3 },
  { slug: "tea-tree", name: "Tea Tree", scientificName: "Melaleuca alternifolia", priority: "high", category: "skin", estimatedHours: 3 },
  { slug: "calendula", name: "Calendula", scientificName: "Calendula officinalis", priority: "high", category: "skin", estimatedHours: 3 },
  { slug: "arnica", name: "Arnica", scientificName: "Arnica montana", priority: "high", category: "topical", estimatedHours: 3 },
  { slug: "boswellia", name: "Boswellia", scientificName: "Boswellia serrata", priority: "high", category: "anti-inflammatory", estimatedHours: 3 },
  { slug: "devils-claw", name: "Devil's Claw", scientificName: "Harpagophytum procumbens", priority: "high", category: "joint", estimatedHours: 3 },
  { slug: "glucosamine", name: "Glucosamine", scientificName: "Glucosamine sulfate", priority: "high", category: "joint", estimatedHours: 3 },
  { slug: "chondroitin", name: "Chondroitin", scientificName: "Chondroitin sulfate", priority: "high", category: "joint", estimatedHours: 3 },
  { slug: "collagen", name: "Collagen", scientificName: "Collagen peptides", priority: "high", category: "joint", estimatedHours: 2 },
  { slug: "hyaluronic-acid", name: "Hyaluronic Acid", scientificName: "Hyaluronan", priority: "high", category: "joint", estimatedHours: 2 },
  { slug: "omega-3", name: "Omega-3", scientificName: "EPA/DHA", priority: "high", category: "cardiovascular", estimatedHours: 3 },
  { slug: "coq10", name: "CoQ10", scientificName: "Ubiquinone", priority: "high", category: "cardiovascular", estimatedHours: 3 },
  { slug: "red-yeast-rice", name: "Red Yeast Rice", scientificName: "Monascus purpureus", priority: "high", category: "cardiovascular", estimatedHours: 3 },
  { slug: "psyllium", name: "Psyllium", scientificName: "Plantago ovata", priority: "high", category: "digestive", estimatedHours: 3 },
  { slug: "slippery-elm", name: "Slippery Elm", scientificName: "Ulmus rubra", priority: "high", category: "digestive", estimatedHours: 3 },
  { slug: "marshmallow-root", name: "Marshmallow Root", scientificName: "Althaea officinalis", priority: "high", category: "digestive", estimatedHours: 3 },
  { slug: "licorice", name: "Licorice", scientificName: "Glycyrrhiza glabra", priority: "high", category: "digestive", estimatedHours: 3 },
  { slug: "artichoke", name: "Artichoke", scientificName: "Cynara scolymus", priority: "high", category: "liver", estimatedHours: 3 },
  { slug: "dandelion-root", name: "Dandelion Root", scientificName: "Taraxacum officinale", priority: "high", category: "liver", estimatedHours: 2 },
];

// Batch 3: Medium Priority (51-80) - Popular with moderate evidence
export const MEDIUM_PRIORITY_HERBS: MonographTemplate[] = [
  { slug: "lemon-balm", name: "Lemon Balm", scientificName: "Melissa officinalis", priority: "medium", category: "relaxant", estimatedHours: 2 },
  { slug: "passionflower", name: "Passionflower", scientificName: "Passiflora incarnata", priority: "medium", category: "sleep", estimatedHours: 2 },
  { slug: "kava", name: "Kava", scientificName: "Piper methysticum", priority: "medium", category: "anxiety", estimatedHours: 3 },
  { slug: "l-theanine", name: "L-Theanine", scientificName: "L-Theanine", priority: "medium", category: "focus", estimatedHours: 2 },
  { slug: "bacopa", name: "Bacopa", scientificName: "Bacopa monnieri", priority: "medium", category: "cognitive", estimatedHours: 3 },
  { slug: "gotu-kola", name: "Gotu Kola", scientificName: "Centella asiatica", priority: "medium", category: "cognitive", estimatedHours: 2 },
  { slug: "lion-mane", name: "Lion's Mane", scientificName: "Hericium erinaceus", priority: "medium", category: "cognitive", estimatedHours: 3 },
  { slug: "reishi", name: "Reishi", scientificName: "Ganoderma lucidum", priority: "medium", category: "immune", estimatedHours: 3 },
  { slug: "cordyceps", name: "Cordyceps", scientificName: "Cordyceps sinensis", priority: "medium", category: "energy", estimatedHours: 3 },
  { slug: "turkey-tail", name: "Turkey Tail", scientificName: "Trametes versicolor", priority: "medium", category: "immune", estimatedHours: 3 },
  { slug: "maitake", name: "Maitake", scientificName: "Grifola frondosa", priority: "medium", category: "immune", estimatedHours: 3 },
  { slug: "shiitake", name: "Shiitake", scientificName: "Lentinula edodes", priority: "medium", category: "immune", estimatedHours: 2 },
  { slug: "astragalus", name: "Astragalus", scientificName: "Astragalus membranaceus", priority: "medium", category: "immune", estimatedHours: 3 },
  { slug: "andrographis", name: "Andrographis", scientificName: "Andrographis paniculata", priority: "medium", category: "immune", estimatedHours: 3 },
  { slug: "goldenseal", name: "Goldenseal", scientificName: "Hydrastis canadensis", priority: "medium", category: "immune", estimatedHours: 3 },
  { slug: "oregano", name: "Oregano", scientificName: "Origanum vulgare", priority: "medium", category: "immune", estimatedHours: 2 },
  { slug: "thyme", name: "Thyme", scientificName: "Thymus vulgaris", priority: "medium", category: "respiratory", estimatedHours: 2 },
  { slug: "rosemary", name: "Rosemary", scientificName: "Rosmarinus officinalis", priority: "medium", category: "cognitive", estimatedHours: 2 },
  { slug: "sage", name: "Sage", scientificName: "Salvia officinalis", priority: "medium", category: "cognitive", estimatedHours: 2 },
  { slug: "lemon-verbena", name: "Lemon Verbena", scientificName: "Aloysia citrodora", priority: "medium", category: "digestive", estimatedHours: 2 },
  { slug: "yarrow", name: "Yarrow", scientificName: "Achillea millefolium", priority: "medium", category: "womens-health", estimatedHours: 2 },
  { slug: "vitex", name: "Vitex", scientificName: "Vitex agnus-castus", priority: "medium", category: "womens-health", estimatedHours: 3 },
  { slug: "false-unicorn", name: "False Unicorn", scientificName: "Chamaelirium luteum", priority: "medium", category: "womens-health", estimatedHours: 2 },
  { slug: "cramp-bark", name: "Cramp Bark", scientificName: "Viburnum opulus", priority: "medium", category: "womens-health", estimatedHours: 2 },
  { slug: "blue-cohosh", name: "Blue Cohosh", scientificName: "Caulophyllum thalictroides", priority: "medium", category: "womens-health", estimatedHours: 2 },
  { slug: "raspberry-leaf", name: "Raspberry Leaf", scientificName: "Rubus idaeus", priority: "medium", category: "womens-health", estimatedHours: 2 },
  { slug: "nettle", name: "Nettle", scientificName: "Urtica dioica", priority: "medium", category: "prostate", estimatedHours: 2 },
  { slug: "pygeum", name: "Pygeum", scientificName: "Prunus africana", priority: "medium", category: "prostate", estimatedHours: 3 },
  { slug: "beta-sitosterol", name: "Beta-Sitosterol", scientificName: "Beta-sitosterol", priority: "medium", category: "prostate", estimatedHours: 2 },
  { slug: "pumpkin-seed", name: "Pumpkin Seed", scientificName: "Cucurbita pepo", priority: "medium", category: "prostate", estimatedHours: 2 },
];

// Batch 4: Lower Priority (81-120) - Popular/interesting but lower evidence
export const LOWER_PRIORITY_HERBS: MonographTemplate[] = [
  { slug: "ashitaba", name: "Ashitaba", scientificName: "Angelica keiskei", priority: "low", category: "longevity", estimatedHours: 2 },
  { slug: "moringa", name: "Moringa", scientificName: "Moringa oleifera", priority: "low", category: "nutritive", estimatedHours: 2 },
  { slug: "spirulina", name: "Spirulina", scientificName: "Arthrospira platensis", priority: "low", category: "nutritive", estimatedHours: 2 },
  { slug: "chlorella", name: "Chlorella", scientificName: "Chlorella vulgaris", priority: "low", category: "detox", estimatedHours: 2 },
  { slug: "wheatgrass", name: "Wheatgrass", scientificName: "Triticum aestivum", priority: "low", category: "detox", estimatedHours: 2 },
  { slug: "barley-grass", name: "Barley Grass", scientificName: "Hordeum vulgare", priority: "low", category: "detox", estimatedHours: 2 },
  { slug: "alfalfa", name: "Alfalfa", scientificName: "Medicago sativa", priority: "low", category: "nutritive", estimatedHours: 2 },
  { slug: "kelp", name: "Kelp", scientificName: "Laminaria spp.", priority: "low", category: "thyroid", estimatedHours: 2 },
  { slug: "bladderwrack", name: "Bladderwrack", scientificName: "Fucus vesiculosus", priority: "low", category: "thyroid", estimatedHours: 2 },
  { slug: "irish-moss", name: "Irish Moss", scientificName: "Chondrus crispus", priority: "low", category: "respiratory", estimatedHours: 2 },
  { slug: "mullein", name: "Mullein", scientificName: "Verbascum thapsus", priority: "low", category: "respiratory", estimatedHours: 2 },
  { slug: "elecampane", name: "Elecampane", scientificName: "Inula helenium", priority: "low", category: "respiratory", estimatedHours: 2 },
  { slug: "lobelia", name: "Lobelia", scientificName: "Lobelia inflata", priority: "low", category: "respiratory", estimatedHours: 2 },
  { slug: "wild-cherry", name: "Wild Cherry", scientificName: "Prunus serotina", priority: "low", category: "respiratory", estimatedHours: 2 },
  { slug: "plantain", name: "Plantain", scientificName: "Plantago major", priority: "low", category: "respiratory", estimatedHours: 2 },
  { slug: "coltsfoot", name: "Coltsfoot", scientificName: "Tussilago farfara", priority: "low", category: "respiratory", estimatedHours: 2 },
  { slug: "horehound", name: "Horehound", scientificName: "Marrubium vulgare", priority: "low", category: "respiratory", estimatedHours: 2 },
  { slug: "comfrey", name: "Comfrey", scientificName: "Symphytum officinale", priority: "low", category: "topical", estimatedHours: 2 },
  { slug: "plantain-leaf", name: "Plantain Leaf", scientificName: "Plantago lanceolata", priority: "low", category: "topical", estimatedHours: 2 },
  { slug: "chickweed", name: "Chickweed", scientificName: "Stellaria media", priority: "low", category: "topical", estimatedHours: 2 },
  { slug: "jewelweed", name: "Jewelweed", scientificName: "Impatiens capensis", priority: "low", category: "topical", estimatedHours: 2 },
  { slug: "witch-hazel", name: "Witch Hazel", scientificName: "Hamamelis virginiana", priority: "low", category: "topical", estimatedHours: 2 },
  { slug: "aloe", name: "Aloe", scientificName: "Aloe vera", priority: "low", category: "topical", estimatedHours: 2 },
  { slug: "hops", name: "Hops", scientificName: "Humulus lupulus", priority: "low", category: "sleep", estimatedHours: 2 },
  { slug: "catnip", name: "Catnip", scientificName: "Nepeta cataria", priority: "low", category: "relaxant", estimatedHours: 2 },
  { slug: "skullcap", name: "Skullcap", scientificName: "Scutellaria lateriflora", priority: "low", category: "anxiety", estimatedHours: 2 },
  { slug: "blue-vervain", name: "Blue Vervain", scientificName: "Verbena hastata", priority: "low", category: "anxiety", estimatedHours: 2 },
  { slug: "stevia", name: "Stevia", scientificName: "Stevia rebaudiana", priority: "low", category: "sweetener", estimatedHours: 2 },
  { slug: "monk-fruit", name: "Monk Fruit", scientificName: "Siraitia grosvenorii", priority: "low", category: "sweetener", estimatedHours: 2 },
  { slug: "xylitol", name: "Xylitol", scientificName: "Xylitol", priority: "low", category: "sweetener", estimatedHours: 2 },
  { slug: "erythritol", name: "Erythritol", scientificName: "Erythritol", priority: "low", category: "sweetener", estimatedHours: 2 },
];

// Combined list
export const TOP_120_HERBS = [
  ...CRITICAL_HERBS,
  ...HIGH_PRIORITY_HERBS,
  ...MEDIUM_PRIORITY_HERBS,
  ...LOWER_PRIORITY_HERBS,
];

// Total estimated hours: ~260 hours of writing
export const TOTAL_ESTIMATED_HOURS = TOP_120_HERBS.reduce((sum, h) => sum + h.estimatedHours, 0);
