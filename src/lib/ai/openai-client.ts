import OpenAI from "openai";

const apiKey = process.env.OPENROUTER_API_KEY?.trim();

if (!apiKey && process.env.NODE_ENV === "production") {
  console.error("OPENROUTER_API_KEY is required in production");
}

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apiKey || "sk-dummy-key-for-build",
  defaultHeaders: {
    "HTTP-Referer": (process.env.NEXT_PUBLIC_APP_URL ?? "").trim(),
    "X-Title": "1Herb",
  },
});

export const isOpenAIConfigured = () => !!apiKey;
