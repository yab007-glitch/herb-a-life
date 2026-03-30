import type { Metadata } from "next";
import { ChatInterface } from "@/components/pharmacist/chat-interface";

export const metadata: Metadata = {
  title: "Virtual Herbalist",
  description:
    "Chat with our AI-powered virtual herbalist for guidance on herb safety, drug interactions, and usage.",
};

export default function PharmacistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Virtual Herbalist
        </h1>
        <p className="mt-2 text-muted-foreground">
          Ask our AI-powered virtual herbalist about herb safety, drug
          interactions, dosage guidance, and more. Remember, this does not
          replace professional medical advice.
        </p>
      </div>
      <ChatInterface />
    </div>
  );
}
