import { NextResponse } from "next/server";

const OPENFDA_BASE = process.env.OPENFDA_BASE_URL || "https://api.fda.gov";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  if (!term) {
    return NextResponse.json({ error: "Missing term parameter" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${OPENFDA_BASE}/drug/event.json?search=patient.drug.medicinalproduct:${encodeURIComponent(term)}&limit=5`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) {
      return NextResponse.json({ results: [] });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ results: [] });
  }
}
