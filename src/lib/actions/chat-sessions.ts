"use server";

import { createClient } from "@/lib/supabase/server";
import type { ActionResponse } from "@/lib/types";
import type { Json } from "@/lib/types/database";

export type ChatSession = {
  id: string;
  user_id: string | null;
  title: string;
  messages: Json;
  herb_context: string | null;
  created_at: string;
  updated_at: string;
};

export async function getChatSessions(): Promise<
  ActionResponse<ChatSession[]>
> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const { data, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: (data ?? []) as ChatSession[] };
  } catch {
    return { success: false, error: "Failed to fetch chat sessions" };
  }
}

export async function saveChatSession(params: {
  title: string;
  messages: { role: string; content: string }[];
  herbContext?: string | null;
}): Promise<ActionResponse<{ id: string }>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const { data, error } = await supabase
      .from("chat_sessions")
      .insert({
        user_id: user.id,
        title: params.title,
        messages: params.messages as unknown as Json,
        herb_context: params.herbContext ?? null,
      })
      .select("id")
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: { id: data.id } };
  } catch {
    return { success: false, error: "Failed to save chat session" };
  }
}

export async function updateChatSession(
  id: string,
  messages: { role: string; content: string }[]
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const { error } = await supabase
      .from("chat_sessions")
      .update({
        messages: messages as unknown as Json,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to update chat session" };
  }
}

export async function deleteChatSession(id: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const { error } = await supabase
      .from("chat_sessions")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete chat session" };
  }
}
