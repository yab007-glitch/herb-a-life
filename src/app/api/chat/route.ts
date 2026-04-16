import { NextResponse, type NextRequest } from "next/server";
import { getSystemPrompt } from "@/lib/ai/system-prompt";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    const baseUrl = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
    const model = process.env.OPENROUTER_MODEL || "openrouter/free";

    console.log("API config:", {
      hasKey: !!apiKey,
      baseUrl,
      model,
    });

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

    const body = await request.json();
    const { messages, herbContext, medications, locale } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const systemPrompt = getSystemPrompt(herbContext, medications, locale);

    // Format messages for OpenRouter (OpenAI-compatible) API
    const chatMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    console.log("Calling OpenRouter API:", {
      model,
      baseUrl,
      messageCount: chatMessages.length,
    });

    // Call OpenRouter API (OpenAI-compatible chat completions)
    console.log("About to call OpenRouter at:", `${baseUrl}/chat/completions`);
    
    let response: Response;
    try {
      response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://herbally.app",
          "X-Title": "HerbAlly",
        },
        body: JSON.stringify({
          model,
          messages: chatMessages,
          stream: true,
        }),
      });
      console.log("OpenRouter response status:", response.status, response.statusText);
    } catch (fetchError) {
      console.error("Fetch to OpenRouter failed:", fetchError);
      return NextResponse.json(
        { error: `Fetch failed: ${fetchError instanceof Error ? fetchError.message : "Unknown"}` },
        { status: 500 }
      );
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("OpenRouter API error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText.substring(0, 500),
      });
      
      // Provide user-friendly message for common errors
      let userMessage = "AI service is temporarily unavailable.";
      if (response.status === 401) {
        userMessage = "AI service is not configured. Please set a valid OPENROUTER_API_KEY.";
      } else if (response.status === 429) {
        userMessage = "AI service is busy. Please try again in a moment.";
      }
      
      return NextResponse.json(
        { 
          error: userMessage,
          debug: {
            status: response.status,
            statusText: response.statusText,
            body: errorText.substring(0, 300),
          }
        },
        { status: response.status === 429 ? 429 : 500 }
      );
    }

    // Stream the response (OpenAI SSE format)
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const reader = response.body?.getReader();
          if (!reader) {
            controller.close();
            return;
          }

          const decoder = new TextDecoder();
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed) continue;
              if (trimmed === "data: [DONE]") {
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
          }
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: `Chat error: ${message}` },
      { status: 500 }
    );
  }
}