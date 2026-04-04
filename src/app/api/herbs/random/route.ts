import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // Get count first
  const { count } = await supabase
    .from("herbs")
    .select("*", { count: "exact", head: true });

  if (!count || count === 0) {
    return NextResponse.json({ error: "No herbs found" }, { status: 404 });
  }

  // Get a random offset
  const randomOffset = Math.floor(Math.random() * count);

  // Fetch one herb at that offset
  const { data, error } = await supabase
    .from("herbs")
    .select("slug")
    .range(randomOffset, randomOffset)
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Failed to get random herb" }, { status: 500 });
  }

  return NextResponse.json({ slug: data.slug });
}