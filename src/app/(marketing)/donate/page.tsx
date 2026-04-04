import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Server,
  Database,
  Bot,
  Globe,
  Leaf,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DonationButtons } from "@/components/donations/donation-buttons";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Herb-a-Life with a donation. Help us keep this free herbal medicine resource available for everyone.",
};

const costs = [
  {
    icon: Server,
    label: "Hosting & Infrastructure",
    description: "Servers, CDN, and deployment to keep the app fast and reliable",
  },
  {
    icon: Database,
    label: "Database & Storage",
    description: "Supabase database hosting for 2,700+ herbs and user data",
  },
  {
    icon: Bot,
    label: "AI Herbalist",
    description: "OpenRouter API costs for the virtual herbalist chatbot",
  },
  {
    icon: Globe,
    label: "Domain & SSL",
    description: "Domain registration and secure HTTPS certificates",
  },
];

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
  const params = await searchParams;
  
  return (
    <div className="mx-auto max-w-3xl space-y-12 py-8">
      {/* Success/Canceled Messages */}
      {params.success === "true" && (
        <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20">
          <CardContent className="flex items-center gap-4 py-6">
            <CheckCircle className="size-8 text-emerald-600" />
            <div>
              <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                Thank you for your donation!
              </h2>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Your support helps keep Herb-a-Life free for everyone.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {params.canceled === "true" && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
          <CardContent className="flex items-center gap-4 py-6">
            <XCircle className="size-8 text-amber-600" />
            <div>
              <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                Donation canceled
              </h2>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                No worries! Feel free to try again whenever you&apos;re ready.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
          <Heart className="h-8 w-8 text-pink-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Support Herb-a-Life
        </h1>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
          Herb-a-Life is 100% free with no limits, no paywalls, and no ads. We
          keep it that way through the generosity of people like you.
        </p>
      </div>

      {/* Donation Buttons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">
          Choose an Amount
        </h2>
        <DonationButtons />
      </div>

      {/* How We Operate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="size-5 text-primary" />
            How We Operate
          </CardTitle>
          <CardDescription>
            Transparency about where your donations go
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            Herb-a-Life was built with one mission: to make reliable herbal
            medicine information accessible to everyone, regardless of their
            ability to pay. We believe health knowledge should be free.
          </p>
          <p>
            We have <strong className="text-foreground">no premium tiers</strong>,{" "}
            <strong className="text-foreground">no subscription fees</strong>, and{" "}
            <strong className="text-foreground">no advertising</strong>. Every feature — the herb database,
            the dosage calculator, and the AI herbalist chatbot — is completely
            free to use with no limits.
          </p>
          <p>
            Running this platform costs money. Hosting, database storage, AI API
            calls, and domain registration all have real costs. We cover these
            entirely through voluntary donations from our community.
          </p>
        </CardContent>
      </Card>

      {/* What Your Donation Covers */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">
          What Your Donation Covers
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {costs.map((cost) => {
            const Icon = cost.icon;
            return (
              <Card key={cost.label}>
                <CardContent className="flex items-start gap-3 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{cost.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {cost.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center space-y-4 pb-8">
        <p className="text-sm text-muted-foreground">
          Thank you for supporting free herbal medicine education.
        </p>
        <p className="text-xs text-muted-foreground">
          <Link href="/about" className="underline hover:text-foreground">
            Learn more about Herb-a-Life
          </Link>
        </p>
      </div>
    </div>
  );
}