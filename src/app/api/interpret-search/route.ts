import { NextResponse, type NextRequest } from "next/server";
import { openai, MODEL } from "@/lib/ai/openai-client";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const { success } = await rateLimit(ip, 20, 60_000);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  let originalQuery = "";
  try {
    const { query } = await request.json();
    originalQuery = query ?? "";

    if (!query || typeof query !== "string" || query.length < 2) {
      return NextResponse.json({ keywords: [query || ""] });
    }

    const words = query.trim().split(/\s+/);
    if (words.length <= 2 && /^[a-zA-Z\s]+$/.test(query)) {
      return NextResponse.json({ keywords: [query.trim().toLowerCase()] });
    }

    const response = await openai.chat.completions.create({
      model: MODEL,
      stream: false,
      messages: [
        {
          role: "system",
          content: `Extract 1-3 medical search keywords from the user's description. Return ONLY a JSON array of lowercase strings like ["keyword1","keyword2"]. No other text.`,
        },
        {
          role: "user",
          content: `Extract search keywords: "${query}"
Examples:
"my stomach hurts after eating" → ["digestive","bloating","stomach pain"]
"I can't sleep and feel anxious" → ["insomnia","anxiety"]
"joints are swollen" → ["arthritis","inflammation"]`,
        },
      ],
      max_tokens: 50,
      temperature: 0,
    });

    const text = response.choices[0]?.message?.content?.trim() ?? "";

    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return NextResponse.json({
          keywords: parsed
            .slice(0, 3)
            .map((k: string) => String(k).toLowerCase()),
        });
      }
    } catch {
      // If AI response isn't valid JSON, extract words manually
    }

    return NextResponse.json({ keywords: [query.trim().toLowerCase()] });
  } catch {
    return NextResponse.json({
      keywords: [originalQuery.toLowerCase() || ""],
    });
  }
}
