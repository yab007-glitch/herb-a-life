import OpenAI from "openai";

const apiKey = process.env.OLLAMA_API_KEY || process.env.OPENROUTER_API_KEY?.trim();

if (!apiKey && process.env.NODE_ENV === "production") {
  console.error("OLLAMA_API_KEY or OPENROUTER_API_KEY is required in production");
}

// Ollama Cloud API (OpenAI-compatible)
// Base URL: https://ollama.com/api for cloud models
// Local: http://localhost:11434/api for local Ollama
export const openai = new OpenAI({
  baseURL: process.env.OLLAMA_BASE_URL || "https://ollama.com/api",
  apiKey: apiKey || "sk-dummy-key-for-build",
  defaultHeaders: {
    "HTTP-Referer": (process.env.NEXT_PUBLIC_APP_URL ?? "").trim(),
    "X-Title": "1Herb",
  },
});

export const isOpenAIConfigured = () => !!apiKey;
