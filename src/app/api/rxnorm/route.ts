import { NextResponse, type NextRequest } from "next/server";
import { searchDrugs } from "@/lib/utils/rxnorm-client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get("term");

    if (!term || term.trim().length < 2) {
      return NextResponse.json(
        { error: "Search term must be at least 2 characters" },
        { status: 400 }
      );
    }

    const results = await searchDrugs(term.trim());

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json(
      { error: "Failed to search drugs" },
      { status: 500 }
    );
  }
}
