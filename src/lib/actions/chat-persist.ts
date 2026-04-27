"use server";

import { createAdminClient } from "@/lib/supabase/admin";

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

export async function createGuestSession(
  guestId: string,
  herbContext?: string | null
): Promise<PersistedChatSession | null> {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase.rpc("create_guest_chat_session", {
      p_guest_id: guestId,
      p_herb_context: herbContext || undefined,
    });

    if (error || !data) {
      console.error("[chat-persist] Create guest session error:", error);
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
  } catch (error) {
    console.error("[chat-persist] Create guest session error:", error);
    return null;
  }
}

export async function getGuestSessions(
  guestId: string
): Promise<PersistedChatSession[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.rpc("get_guest_chat_sessions", {
      p_guest_id: guestId,
    });

    if (error || !data) return [];
    return data.map((s: Record<string, unknown>) => ({
      id: s.id as string,
      title: s.title as string,
      herbContext: (s.herb_context as string) || null,
      createdAt: s.created_at as string,
      updatedAt: s.updated_at as string,
      messages: [],
    }));
  } catch {
    return [];
  }
}

export async function getGuestSession(
  sessionId: string,
  guestId: string
): Promise<PersistedChatSession | null> {
  try {
    const supabase = createAdminClient();
    const { data: session, error: sessionError } = await supabase
      .from("chat_sessions")
      .select("id, title, herb_context, created_at, updated_at, guest_id")
      .eq("id", sessionId)
      .eq("guest_id", guestId)
      .single();

    if (sessionError || !session) return null;
    const { data: messages, error: messagesError } = await supabase.rpc(
      "get_guest_chat_messages",
      { p_session_id: sessionId }
    );
    if (messagesError) return null;

    return {
      id: session.id,
      title: session.title,
      herbContext: session.herb_context,
      createdAt: session.created_at,
      updatedAt: session.updated_at,
      messages: (messages || []).map((m: Record<string, unknown>) => ({
        id: m.id as string,
        role: m.role as "user" | "assistant" | "system",
        content: m.content as string,
        createdAt: m.created_at as string,
      })),
    };
  } catch {
    return null;
  }
}

export async function addGuestMessage(
  sessionId: string,
  role: "user" | "assistant" | "system",
  content: string,
  guestId: string
): Promise<PersistedChatMessage | null> {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase.rpc("add_guest_chat_message", {
      p_session_id: sessionId,
      p_role: role,
      p_content: content,
      p_guest_id: guestId,
    });

    if (error) {
      console.error("[chat-persist] Add guest message error:", error);
      return null;
    }

    return {
      id: data.id,
      role: data.role as "user" | "assistant" | "system",
      content: data.content,
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error("[chat-persist] Add guest message error:", error);
    return null;
  }
}

export async function deleteGuestSession(
  sessionId: string,
  guestId: string
): Promise<boolean> {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase.rpc("delete_guest_chat_session", {
      p_session_id: sessionId,
      p_guest_id: guestId,
    });
    return !error && !!data;
  } catch {
    return false;
  }
}
