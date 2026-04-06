import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const term = searchParams.get("q");

  if (!term || term.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("herbs")
      .select("id, name, slug, scientific_name")
      .eq("is_published", true)
      .or(
        `name.ilike.%${term}%,scientific_name.ilike.%${term}%,description.ilike.%${term}%`
      )
      .limit(10);

    if (error) {
      console.error("Search error:", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json([]);
  }
}
