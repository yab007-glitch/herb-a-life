import OpenAI from "openai";

// Ollama Cloud API (OpenAI-compatible)
// Base URL: https://ollama.com/api for cloud models
// Local: http://localhost:11434/api for local Ollama

const getApiKey = () => process.env.OLLAMA_API_KEY || process.env.OPENROUTER_API_KEY?.trim();

if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
  // Only log in production server-side
  const key = getApiKey();
  if (!key) {
    console.error("OLLAMA_API_KEY or OPENROUTER_API_KEY is required in production");
  }
}

export const openai = new OpenAI({
  baseURL: process.env.OLLAMA_BASE_URL || "https://ollama.com/api",
  apiKey: getApiKey() || "sk-dummy-key-for-build",
  defaultHeaders: {
    "HTTP-Referer": (process.env.NEXT_PUBLIC_APP_URL ?? "").trim(),
    "X-Title": "1Herb",
  },
  dangerouslyAllowBrowser: false,
});

export const isOpenAIConfigured = () => !!getApiKey();
