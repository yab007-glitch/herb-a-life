import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { getChatSessions } from "@/lib/actions/chat-sessions";
import { ChatSessionsList } from "@/components/chats/chat-sessions-list";

export const metadata: Metadata = {
  title: "Chat Sessions",
  description: "Access your past conversations with the virtual herbalist.",
};

export default async function ChatsPage() {
  const result = await getChatSessions();
  const sessions = result.success ? result.data ?? [] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" render={<Link href="/dashboard" />}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Chat Sessions
          </h1>
          <p className="text-sm text-muted-foreground">
            Your past conversations with the virtual herbalist. Click to
            continue any chat.
          </p>
        </div>
      </div>

      {sessions.length > 0 ? (
        <ChatSessionsList initialSessions={sessions} />
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <MessageCircle className="size-10 text-muted-foreground/40 mb-3" />
            <p className="font-medium text-muted-foreground">
              No chat sessions yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Start a conversation with the virtual herbalist to see your
              history here.
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
      )}
    </div>
  );
}
