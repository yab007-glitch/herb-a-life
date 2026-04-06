const RXNORM_BASE =
  process.env.RXNORM_BASE_URL || "https://rxnav.nlm.nih.gov/REST";

export type RxNormDrug = {
  rxcui: string;
  name: string;
  synonym: string;
};

export async function searchDrugs(term: string): Promise<RxNormDrug[]> {
  try {
    const res = await fetch(
      `${RXNORM_BASE}/approximateTerm.json?term=${encodeURIComponent(term)}&maxEntries=10`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) return [];

    const data = await res.json();
    const candidates = data?.approximateGroup?.candidate || [];

    return candidates.map(
      (c: { rxcui: string; name: string; score: string }) => ({
        rxcui: c.rxcui,
        name: c.name,
        synonym: c.name,
      })
    );
  } catch {
    return [];
  }
}

export async function getDrugByRxcui(rxcui: string): Promise<string | null> {
  try {
    const res = await fetch(`${RXNORM_BASE}/rxcui/${rxcui}/properties.json`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.properties?.name || null;
  } catch {
    return null;
  }
}

export async function getDrugInteractions(rxcui: string) {
  try {
    const res = await fetch(
      `${RXNORM_BASE}/interaction/interaction.json?rxcui=${rxcui}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data?.interactionTypeGroup || [];
  } catch {
    return [];
  }
}
