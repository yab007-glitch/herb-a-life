import { NextResponse, type NextRequest } from "next/server";
import { openai } from "@/lib/ai/openai-client";

export async function POST(request: NextRequest) {
  let originalQuery = "";
  try {
    const { query } = await request.json();
    originalQuery = query ?? "";

    if (!query || typeof query !== "string" || query.length < 2) {
      return NextResponse.json({ keywords: [query || ""] });
    }

    // If query is already a simple keyword (1-2 words, no complex phrasing), skip AI
    const words = query.trim().split(/\s+/);
    if (words.length <= 2 && /^[a-zA-Z\s]+$/.test(query)) {
      return NextResponse.json({ keywords: [query.trim().toLowerCase()] });
    }

    const response = await openai.chat.completions.create({
      model: (process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini").trim(),
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

    // Parse the JSON array from the response
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

    // Fallback: use the original query
    return NextResponse.json({ keywords: [query.trim().toLowerCase()] });
  } catch {
    return NextResponse.json({ keywords: [originalQuery.toLowerCase() || ""] });
  }
}
