"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MessageCircle,
  Trash2,
  Loader2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  deleteChatSession,
  type ChatSession,
} from "@/lib/actions/chat-sessions";
import { toast } from "sonner";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return d.toLocaleDateString();
}

function getMessageCount(messages: unknown): number {
  if (Array.isArray(messages)) return messages.length;
  return 0;
}

function getPreview(messages: unknown): string {
  if (!Array.isArray(messages) || messages.length === 0) return "Empty chat";
  // Find the first user message
  const userMsg = messages.find(
    (m: { role?: string; content?: string }) => m.role === "user"
  );
  if (userMsg && typeof userMsg.content === "string") {
    return userMsg.content.length > 100
      ? userMsg.content.slice(0, 100) + "..."
      : userMsg.content;
  }
  return "Chat session";
}

export function ChatSessionsList({
  initialSessions,
}: {
  initialSessions: ChatSession[];
}) {
  const router = useRouter();
  const [sessions, setSessions] = useState(initialSessions);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    const result = await deleteChatSession(id);
    if (result.success) {
      setSessions((prev) => prev.filter((s) => s.id !== id));
      toast.success("Chat deleted");
    } else {
      toast.error(result.error ?? "Failed to delete");
    }
    setDeletingId(null);
  }

  if (sessions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <MessageCircle className="size-10 text-muted-foreground/40 mb-3" />
          <p className="font-medium text-muted-foreground">
            No chat sessions yet
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Start a conversation with the virtual herbalist to see your history
            here.
          </p>
          <Button
            size="sm"
            className="mt-4"
            render={<Link href="/pharmacist" />}
          >
            <MessageCircle className="size-4" />
            Start Chat
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => {
        const msgCount = getMessageCount(session.messages);
        const preview = getPreview(session.messages);

        return (
          <Card
            key={session.id}
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => router.push(`/pharmacist?session=${session.id}`)}
          >
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <MessageCircle className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {session.title || "Untitled Chat"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {preview}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {formatDate(session.updated_at)}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {msgCount} message{msgCount !== 1 ? "s" : ""}
                    </Badge>
                    {session.herb_context && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      >
                        Herb context
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                  aria-label="Delete chat session"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(session.id);
                  }}
                  disabled={deletingId === session.id}
                >
                  {deletingId === session.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                </Button>
                <ArrowRight className="size-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
