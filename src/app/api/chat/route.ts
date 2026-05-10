import { NextResponse, type NextRequest } from "next/server";
import { getSystemPrompt } from "@/lib/ai/system-prompt";
import { rateLimit } from "@/lib/rate-limit";

// Max request body size: 50KB (prevents memory exhaustion and excessive token usage)
const MAX_BODY_SIZE = 50 * 1024;

/**
 * Extract the real client IP from request headers.
 * Handles Vercel (x-vercel-forwarded-for), Render (rightmost x-forwarded-for),
 * and Cloudflare (cf-connecting-ip).
 */
function getClientIP(request: NextRequest): string {
  // Vercel: trusted forwarded-for
  const vercelIP = request.headers.get("x-vercel-forwarded-for");
  if (vercelIP) return vercelIP.trim();

  // Cloudflare
  const cfIP = request.headers.get("cf-connecting-ip");
  if (cfIP) return cfIP.trim();

  // Render / generic proxy: rightmost IP in x-forwarded-for
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map((s) => s.trim());
    return ips[ips.length - 1] || "unknown";
  }

  return "unknown";
}

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

  // Body size guard
  const contentLength = parseInt(
    request.headers.get("content-length") || "0",
    10
  );
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json(
      { error: "Request body too large" },
      { status: 413 }
    );
  }

  // Rate limit using platform-aware IP extraction
  const ip = getClientIP(request);
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

  let body: {
    messages?: unknown;
    herbContext?: string;
    medications?: string[];
    locale?: string;
  };
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
      { error: "AI service is temporarily unavailable. Please try again." },
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
