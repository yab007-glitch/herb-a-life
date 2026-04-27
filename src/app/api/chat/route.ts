import { NextResponse, type NextRequest } from "next/server";
import { getSystemPrompt } from "@/lib/ai/system-prompt";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  const baseUrl = (
    process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1"
  ).trim();
  const model = (process.env.OPENROUTER_MODEL || "openrouter/free").trim();

  if (!apiKey) {
    console.error("OpenRouter API key not configured");
    return NextResponse.json(
      { error: "AI service is not configured. Please contact support." },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const { success } = await rateLimit(ip, 20, 60_000);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" },
      }
    );
  }

  let body: { messages?: unknown; herbContext?: string; medications?: string[]; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { messages, herbContext, medications, locale } = body;
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json(
      { error: "Messages array is required" },
      { status: 400 }
    );
  }

  const systemPrompt = getSystemPrompt(herbContext, medications, locale);
  const chatMessages = [
    { role: "system" as const, content: systemPrompt },
    ...(messages as Array<{ role: string; content: string }>).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_APP_URL || "https://herbally.app",
        "X-Title": "HerbAlly",
      },
      body: JSON.stringify({ model, messages: chatMessages, stream: true }),
    });
  } catch (fetchError) {
    console.error("Fetch to OpenRouter failed:", fetchError);
    return NextResponse.json(
      {
        error: `Fetch failed: ${fetchError instanceof Error ? fetchError.message : "Unknown"}`,
      },
      { status: 500 }
    );
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    console.error(
      "OpenRouter API error:",
      response.status,
      errorText.substring(0, 200)
    );
    let userMessage = "AI service is temporarily unavailable.";
    if (response.status === 401) {
      userMessage =
        "AI service is not configured. Please set a valid OPENROUTER_API_KEY.";
    } else if (response.status === 429) {
      userMessage = "AI service is busy. Please try again in a moment.";
    }
    return NextResponse.json(
      { error: userMessage },
      { status: response.status === 429 ? 429 : 500 }
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const rawReader = response.body?.getReader();
      if (!rawReader) {
        controller.close();
        return;
      }
      const reader = rawReader;

      const decoder = new TextDecoder();
      let buffer = "";
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      const scheduleTimeout = () => {
        if (timeoutId !== null) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          reader.cancel();
          controller.close();
        }, 30_000);
      };
      const cancelTimeout = () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      };

      scheduleTimeout();

      function pump() {
        reader
          .read()
          .then(({ done, value }) => {
            if (done) {
              cancelTimeout();
              controller.close();
              return;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed) continue;
              if (trimmed === "data: [DONE]") {
                cancelTimeout();
                controller.close();
                return;
              }
              if (!trimmed.startsWith("data: ")) continue;
              try {
                const data = JSON.parse(trimmed.slice(6));
                const content = data.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // Skip invalid JSON lines
              }
            }
            pump();
          })
          .catch((error) => {
            cancelTimeout();
            console.error("Stream error:", error);
            controller.close();
          });
      }

      pump();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
