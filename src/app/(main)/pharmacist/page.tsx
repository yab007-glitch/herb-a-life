import type { Metadata } from "next";
import { ChatInterface } from "@/components/pharmacist/chat-interface";
import { getHerbBySlug } from "@/lib/actions/herbs";

export const metadata: Metadata = {
  title: "Virtual Herbalist",
  description:
    "Chat with our AI-powered virtual herbalist for guidance on herb safety, drug interactions, and usage.",
};

export default async function PharmacistPage({
  searchParams,
}: {
  searchParams: Promise<{ herb?: string; medications?: string }>;
}) {
  const params = await searchParams;
  let herbContext: string | null = null;
  let autoQuery: string | null = null;

  if (params.medications) {
    const meds = decodeURIComponent(params.medications);
    herbContext = `The user is currently taking these medications: ${meds}`;
    autoQuery = `I'm taking: ${meds}. Check for any known interactions between these medications and common herbal supplements. Flag any dangerous combinations.`;
  } else if (params.herb) {
    const result = await getHerbBySlug(params.herb);
    if (result.success && result.data) {
      const h = result.data;
      herbContext = `${h.name} (${h.scientific_name}): ${h.description}. Traditional uses: ${h.traditional_uses?.join(", ")}. Contraindications: ${h.contraindications?.join(", ")}. Side effects: ${h.side_effects?.join(", ")}.`;
      autoQuery = `What are the key drug interactions and safety concerns for ${h.name} (${h.scientific_name})? List the most important interactions, severity, and who should avoid it.`;
    }
  }

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
      <ChatInterface herbContext={herbContext} autoQuery={autoQuery} />
    </div>
  );
}
