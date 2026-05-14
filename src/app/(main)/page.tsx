export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Leaf, Database, Shield, TrendingUp, Info } from "lucide-react";
import { ChatInterface } from "@/components/pharmacist/chat-interface";
import { getHerbBySlug } from "@/lib/actions/herbs";
import { getServerTranslation, type Locale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "HerbAlly — Virtual Herbalist | Medicinal Herbs & Drug Interactions",
  description:
    "Ask our AI herbalist about herb safety, drug interactions, and dosage. Explore 2,700+ medicinal herbs. Evidence-based answers from WHO, NCCIH, and PubMed. Free, no account required.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://herbally.app"}`,
  },
};

const stats = [
  { value: "2,700+", labelKey: "home.stats.herbs", icon: Database },
  { value: "500+", labelKey: "home.stats.interactions", icon: Shield },
  { value: "100%", labelKey: "home.stats.free", icon: TrendingUp },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ herb?: string; medications?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("herbally-locale");
  const locale: Locale = (localeCookie?.value as Locale) || "en";
  const t = (key: string, p?: Record<string, string | number>) =>
    getServerTranslation(locale, key, p);

  let herbContext: string | null = null;
  let autoQuery: string | null = null;
  let herbName: string | null = null;

  if (params.medications) {
    const meds = decodeURIComponent(params.medications);
    herbContext = `The user is currently taking these medications: ${meds}`;
    autoQuery = t("herbalistPage.medsAutoQuery", { meds });
  } else if (params.herb) {
    const result = await getHerbBySlug(params.herb);
    if (result.success && result.data) {
      const h = result.data;
      herbName = h.name;
      herbContext = `${h.name} (${h.scientific_name}): ${h.description}. Traditional uses: ${h.traditional_uses?.join(", ")}. Contraindications: ${h.contraindications?.join(", ")}. Side effects: ${h.side_effects?.join(", ")}.`;
      autoQuery = t("herbalistPage.herbAutoQuery", {
        name: h.name,
        scientific: h.scientific_name,
      });
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
          <Leaf className="size-4" />
          <span>{t("homeAI.badge")}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("homeAI.title")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          {t("homeAI.subtitle")}
        </p>
      </div>

      {/* Context-specific banner when coming from herb page */}
      {herbName && (
        <div className="mb-6 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <Info className="size-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">
                {t("herbalistPage.askingAbout", { name: herbName })}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("herbalistPage.askingAboutDesc")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div className="flex-1">
        <ChatInterface
          herbContext={herbContext}
          autoQuery={autoQuery}
          locale={locale}
        />
      </div>

      {/* Stats Ribbon */}
      <div className="mt-8 border-t pt-6">
        <div className="mx-auto max-w-2xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.labelKey}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t(stat.labelKey)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trust signals footer */}
      <div className="mt-6 rounded-lg border p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">
          {t("herbalistPage.aboutTitle")}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
          <li>• {t("herbalistPage.aboutProvider")}</li>
          <li>• {t("herbalistPage.aboutSources")}</li>
          <li>• {t("herbalistPage.aboutUpdated")}</li>
          <li>• {t("herbalistPage.aboutNotFDA")}</li>
        </ul>
      </div>
    </div>
  );
}
