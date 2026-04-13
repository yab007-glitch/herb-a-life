"use client";

import type { ChatMessage } from "@/lib/actions/chat";

const STORAGE_KEY = "herbally-chat-sessions";
const MAX_SESSIONS = 20;

export type ChatSession = {
  id: string;
  title: string;
  messages: ChatMessage[];
  herb_context: string | null;
  created_at: string;
  updated_at: string;
};

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function getSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: ChatSession[]) {
  if (typeof window === "undefined") return;
  try {
    // Keep only the most recent sessions
    const trimmed = sessions
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, MAX_SESSIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // localStorage might be full — try removing old sessions
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Can't help
    }
  }
}

/**
 * Get all chat sessions (from localStorage)
 */
export function getChatSessions(): ChatSession[] {
  return getSessions();
}

/**
 * Get a specific chat session by ID
 */
export function getChatSession(id: string): ChatSession | null {
  const sessions = getSessions();
  return sessions.find((s) => s.id === id) || null;
}

/**
 * Create a new chat session
 */
export function createChatSession(herbContext?: string | null): ChatSession {
  const session: ChatSession = {
    id: makeId(),
    title: "New Chat",
    messages: [],
    herb_context: herbContext || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const sessions = getSessions();
  sessions.unshift(session);
  saveSessions(sessions);
  return session;
}

/**
 * Update a chat session with new messages
 */
export function updateChatSession(
  sessionId: string,
  messages: ChatMessage[],
  title?: string
): ChatSession | null {
  const sessions = getSessions();
  const idx = sessions.findIndex((s) => s.id === sessionId);
  if (idx === -1) return null;

  // Auto-generate title from first user message
  let sessionTitle = title || sessions[idx].title;
  if (!title && messages.length > 0 && sessionTitle === "New Chat") {
    const firstUserMsg = messages.find((m) => m.role === "user");
    if (firstUserMsg) {
      sessionTitle =
        firstUserMsg.content.slice(0, 50) +
        (firstUserMsg.content.length > 50 ? "..." : "");
    }
  }

  sessions[idx] = {
    ...sessions[idx],
    messages,
    title: sessionTitle,
    updated_at: new Date().toISOString(),
  };
  saveSessions(sessions);
  return sessions[idx];
}

/**
 * Delete a chat session
 */
export function deleteChatSession(sessionId: string): boolean {
  const sessions = getSessions();
  const filtered = sessions.filter((s) => s.id !== sessionId);
  saveSessions(filtered);
  return filtered.length < sessions.length;
}