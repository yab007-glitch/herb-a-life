import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const term = searchParams.get("q");

  if (!term || term.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // First try symptom_keywords match (for symptom-first search)
    const { data: symptomResults, error: symptomError } = await supabase
      .from("herbs")
      .select("id, name, slug, scientific_name, symptom_keywords, evidence_level")
      .eq("is_published", true)
      .contains("symptom_keywords", [term.toLowerCase()])
      .limit(20);

    // Also try text search on name, scientific_name, description
    const { data: textResults, error: textError } = await supabase
      .from("herbs")
      .select("id, name, slug, scientific_name, evidence_level")
      .eq("is_published", true)
      .or(
        `name.ilike.%${term}%,scientific_name.ilike.%${term}%,description.ilike.%${term}%`
      )
      .limit(20);

    if (symptomError && textError) {
      return NextResponse.json([]);
    }

    // Merge results, deduplicate by id
    const seen = new Set<string>();
    const results: any[] = [];

    for (const herb of (symptomResults || [])) {
      if (!seen.has(herb.id)) {
        seen.add(herb.id);
        results.push({
          ...herb,
          matchedBy: "symptom",
        });
      }
    }

    for (const herb of (textResults || [])) {
      if (!seen.has(herb.id)) {
        seen.add(herb.id);
        results.push({
          ...herb,
          matchedBy: "name",
        });
      }
    }

    return NextResponse.json(results);
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json([]);
  }
}
