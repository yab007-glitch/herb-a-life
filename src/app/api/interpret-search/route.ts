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
      messages: [
        {
          role: "system",
          content: `You extract search keywords from natural language health queries. Given a user's description of symptoms or conditions, return 1-3 simple medical/herbal search terms that would match herbs in a database.

Rules:
- Return ONLY a JSON array of lowercase strings, nothing else
- Use standard medical/herbal terminology
- Max 3 keywords
- Each keyword should be 1-2 words

Examples:
"my stomach hurts after eating" → ["digestive","stomach pain","bloating"]
"I can't sleep at night and feel anxious" → ["insomnia","anxiety","sleep"]
"my joints are swollen and painful" → ["arthritis","inflammation","joint pain"]
"I have a cold with runny nose" → ["cold","respiratory","congestion"]
"sugar levels are high" → ["diabetes","blood sugar","metabolic"]`,
        },
        { role: "user", content: query },
      ],
      max_tokens: 60,
      temperature: 0,
    });

    const text = response.choices[0]?.message?.content?.trim() ?? "";

    // Parse the JSON array from the response
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return NextResponse.json({
          keywords: parsed.slice(0, 3).map((k: string) => String(k).toLowerCase()),
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
