import { NextResponse, type NextRequest } from "next/server";
import { isOpenAIConfigured } from "@/lib/ai/openai-client";
import { getSystemPrompt } from "@/lib/ai/system-prompt";
import { rateLimit } from "@/lib/rate-limit";

// Ollama Cloud API configuration
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "https://ollama.com/api";
const DEFAULT_MODEL = "glm5:cloud";

export async function POST(request: NextRequest) {
  try {
    // Get API key at runtime (not at module load time)
    const apiKey = process.env.OLLAMA_API_KEY || process.env.OPENROUTER_API_KEY;

    // Check if API key is configured
    if (!apiKey) {
      console.error("AI API key not configured");
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
    const { messages, herbContext, medications } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const systemPrompt = getSystemPrompt(herbContext, medications);
    const model = process.env.OLLAMA_MODEL || DEFAULT_MODEL;

    // Format messages for Ollama API
    const ollamaMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    console.log("Calling Ollama API:", {
      model,
      baseUrl: OLLAMA_BASE_URL,
      messageCount: ollamaMessages.length,
    });

    // Call Ollama Cloud API
    const response = await fetch(`${OLLAMA_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: ollamaMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("Ollama API error:", response.status, errorText);
      return NextResponse.json(
        { error: `AI service error: ${response.status}` },
        { status: response.status === 429 ? 429 : 500 }
      );
    }

    // Stream the response
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
              if (!line.trim()) continue;
              try {
                const data = JSON.parse(line);
                if (data.message?.content) {
                  controller.enqueue(encoder.encode(data.message.content));
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
