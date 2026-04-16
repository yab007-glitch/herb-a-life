import OpenAI from "openai";

// OpenRouter API (OpenAI-compatible)
// Base URL: https://openrouter.ai/api/v1
// Model: openrouter/free (free tier)

const getApiKey = () =>
  process.env.OPENROUTER_API_KEY?.trim();

if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
  const key = getApiKey();
  if (!key) {
    console.error(
      "OPENROUTER_API_KEY is required in production"
    );
  }
}

export const openai = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  apiKey: getApiKey() || "sk-dummy-key-for-build",
  defaultHeaders: {
    "HTTP-Referer": (process.env.NEXT_PUBLIC_APP_URL ?? "").trim(),
    "X-Title": "HerbAlly",
  },
  dangerouslyAllowBrowser: false,
});

export const MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";

export const isOpenAIConfigured = () => !!getApiKey();