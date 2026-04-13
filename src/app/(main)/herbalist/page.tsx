/**
 * This route is intentionally PUBLIC and does not require authentication.
 * The AI chatbot (Virtual Herbalist) should be accessible to all visitors
 * without requiring a login, as per the public-only nature of the app.
 */
export const config = {
  dynamic = 'force-dynamic'
};

import type { Metadata } from "next";
import { Info } from "lucide-react";
import { ChatInterface } from "@/components/pharmacist/chat-interface";
import { SafetyAlert } from "@/components/herbs/safety-alert";
import { getHerbBySlug } from "@/lib/actions/herbs";

export const metadata: Metadata = {
  title: "Virtual Herbalist",
  description:
    "Ask our AI herbalist about herb safety, drug interactions, and dosage. Evidence-based answers from WHO, NCCIH, and PubMed sources. Free, no account required.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://herbally.app"}/herbalist`,
  },
};

export default async function PharmacistPage({
  searchParams,
}: {
  searchParams: Promise<{ herb?: string; medications?: string }>;
}) {
  const params = await searchParams;
  let herbContext: string | null = null;
  let autoQuery: string | null = null;
  let herbName: string | null = null;

  if (params.medications) {
    const meds = decodeURIComponent(params.medications);
    herbContext = `The user is currently taking these medications: ${meds}`;
    autoQuery = `I'm taking: ${meds}. Check for any known interactions between these medications and common herbal supplements. Flag any dangerous combinations.`;
  } else if (params.herb) {
    const result = await getHerbBySlug(params.herb);
    if (result.success && result.data) {
      const h = result.data;
      herbName = h.name;
      herbContext = `${h.name} (${h.scientific_name}): ${h.description}. Traditional uses: ${h.traditional_uses?.join(", ")}. Contraindications: ${h.contraindications?.join(", ")}. Side effects: ${h.side_effects?.join(", ")}.`;
      autoQuery = `What are the key drug interactions and safety concerns for ${h.name} (${h.scientific_name})? List the most important interactions, severity, and who should avoid it.`;
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Virtual Herbalist
        </h1>
        <p className="mt-2 text-muted-foreground">
          Ask our AI-powered herbalist about herb safety, drug interactions, and usage guidance.
          Get evidence-based information from trusted sources.
        </p>
      </div>

      {/* Critical AI Limitations Notice */}
      <SafetyAlert severity="critical" title="Important: AI-Generated Information Limitations">
        <div className="space-y-2">
          <p>
            <strong>This AI provides educational information only, not medical advice.</strong> Responses are generated 
            from herb databases and may not reflect the most current research or your specific health situation.
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Always consult a healthcare provider before using herbs, especially if pregnant, nursing, or taking medications</li>
            <li>Drug interactions listed may not be complete — verify with a pharmacist</li>
            <li>AI cannot diagnose conditions or prescribe treatments</li>
            <li>Evidence levels vary — some herbs have limited clinical research</li>
          </ul>
          <p className="font-medium mt-2">
            In case of emergency or adverse reaction, contact poison control (1-800-222-1222) or call 911.
          </p>
        </div>
      </SafetyAlert>

      {/* Context-specific information */}
      {herbName && (
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <Info className="size-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Asking about {herbName}</p>
              <p className="text-sm text-muted-foreground">
                The AI has been provided with detailed information about this herb from our database, 
                including active compounds, traditional uses, and known safety concerns.
              </p>
            </div>
          </div>
        </div>
      )}

      <ChatInterface herbContext={herbContext} autoQuery={autoQuery} />

      {/* Trust signals footer */}
      <div className="rounded-lg border p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">About our AI Herbalist</p>
        <ul className="space-y-1">
          <li>• Powered by Ollama Cloud AI (glm-5:cloud model)</li>
          <li>• Information sourced from WHO monographs, NCCIH, PubMed, and Commission E</li>
          <li>• Regularly updated as new research becomes available</li>
          <li>• Not reviewed or approved by FDA</li>
        </ul>
      </div>
    </div>
  );
}
