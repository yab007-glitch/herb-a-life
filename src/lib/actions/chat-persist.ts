"use server";

import { createClient } from "@/lib/supabase/server";

export type PersistedChatSession = {
  id: string;
  title: string | null;
  herbContext: string | null;
  createdAt: string;
  updatedAt: string;
  messages: PersistedChatMessage[];
};

export type PersistedChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
};

/**
 * Create a new chat session in the database
 */
export async function createPersistedSession(herbContext?: string | null): Promise<PersistedChatSession | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null; // Not authenticated — fall back to localStorage

  const { data, error } = await supabase
    .from("chat_sessions")
    .insert({
      user_id: user.id,
      title: "New Chat",
      herb_context: herbContext || null,
    })
    .select()
    .single();

  if (error || !data) {
    console.error("[chat-persist] Create session error:", error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    herbContext: data.herb_context,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    messages: [],
  };
}

/**
 * Get all chat sessions for the current user
 */
export async function getPersistedSessions(): Promise<PersistedChatSession[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("chat_sessions")
    .select("id, title, herb_context, created_at, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(20);

  if (error || !data) return [];

  return data.map((s) => ({
    id: s.id,
    title: s.title,
    herbContext: s.herb_context,
    createdAt: s.created_at,
    updatedAt: s.updated_at,
    messages: [], // Load messages on demand
  }));
}

/**
 * Get a chat session with all its messages
 */
export async function getPersistedSession(sessionId: string): Promise<PersistedChatSession | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: session, error: sessionError } = await supabase
    .from("chat_sessions")
    .select("id, title, herb_context, created_at, updated_at")
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .single();

  if (sessionError || !session) return null;

  const { data: messages, error: messagesError } = await supabase
    .from("chat_messages")
    .select("id, role, content, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (messagesError) return null;

  return {
    id: session.id,
    title: session.title,
    herbContext: session.herb_context,
    createdAt: session.created_at,
    updatedAt: session.updated_at,
    messages: (messages || []).map((m) => ({
      id: m.id,
      role: m.role as "user" | "assistant" | "system",
      content: m.content,
      createdAt: m.created_at,
    })),
  };
}

/**
 * Add a message to a chat session
 */
export async function addPersistedMessage(
  sessionId: string,
  role: "user" | "assistant" | "system",
  content: string
): Promise<PersistedChatMessage | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Verify session belongs to user
  const { data: session } = await supabase
    .from("chat_sessions")
    .select("id, title")
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .single();

  if (!session) return null;

  const { data, error } = await supabase
    .from("chat_messages")
    .insert({
      session_id: sessionId,
      role,
      content,
    })
    .select()
    .single();

  if (error) {
    console.error("[chat-persist] Add message error:", error);
    return null;
  }

  // Update session title from first user message
  if (role === "user" && session.title === "New Chat") {
    const title = content.slice(0, 50) + (content.length > 50 ? "..." : "");
    await supabase
      .from("chat_sessions")
      .update({ title, updated_at: new Date().toISOString() })
      .eq("id", sessionId);
  } else {
    // Just update timestamp
    await supabase
      .from("chat_sessions")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", sessionId);
  }

  return {
    id: data.id,
    role: data.role as "user" | "assistant" | "system",
    content: data.content,
    createdAt: data.created_at,
  };
}

/**
 * Delete a chat session and all its messages
 */
export async function deletePersistedSession(sessionId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from("chat_sessions")
    .delete()
    .eq("id", sessionId)
    .eq("user_id", user.id);

  return !error;
}