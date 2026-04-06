import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getChatSessions } from "@/lib/actions/chat-sessions";
import { ChatSessionsList } from "@/components/chats/chat-sessions-list";

export const metadata: Metadata = {
  title: "Chat Sessions",
  description: "Access your past conversations with the virtual herbalist.",
};

export default async function ChatsPage() {
  const result = await getChatSessions();
  const sessions = result.success ? (result.data ?? []) : [];

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
      <ChatSessionsList initialSessions={sessions} />
    </div>
  );
}
