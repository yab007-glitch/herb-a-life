import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Server,
  Database,
  Bot,
  Globe,
  Coffee,
  ArrowRight,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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

const PAYPAL_LINK = "https://www.paypal.com/paypalme/yab007";

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12 py-8">
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

      {/* Donate Button */}
      <div className="text-center">
        <Button
          size="lg"
          className="h-14 px-8 text-lg bg-[#0070ba] hover:bg-[#005ea6]"
          render={
            <a
              href={PAYPAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <Heart className="size-5" />
          Donate via PayPal
          <ArrowRight className="size-5" />
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          Any amount helps. Even a coffee keeps us going.
        </p>
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
            We have <strong>no premium tiers</strong>,{" "}
            <strong>no subscription fees</strong>, and{" "}
            <strong>no advertising</strong>. Every feature — the herb database,
            the dosage calculator, and the AI herbalist chatbot — is completely
            free to use with no limits.
          </p>
          <p>
            Running this platform costs money. Hosting, database storage, AI API
            calls, and domain registration all have real costs. We cover these
            entirely through voluntary donations from our community.
          </p>
          <p>
            Your donation directly funds the infrastructure that keeps
            Herb-a-Life running and helps us continue adding new herbs,
            improving the AI herbalist, and maintaining the platform for
            everyone.
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

      {/* Suggested Amounts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">
          Every Bit Helps
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              amount: "$5",
              icon: Coffee,
              label: "Buy us a coffee",
              description: "Covers a day of API costs",
            },
            {
              amount: "$15",
              icon: Database,
              label: "Feed the database",
              description: "A week of hosting costs",
            },
            {
              amount: "$50",
              icon: Heart,
              label: "Champion supporter",
              description: "A month of full operations",
            },
          ].map((tier) => {
            const Icon = tier.icon;
            return (
              <a
                key={tier.amount}
                href={PAYPAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardContent className="flex flex-col items-center py-6 text-center">
                    <Icon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-2xl font-bold text-foreground">
                      {tier.amount}
                    </p>
                    <p className="font-medium text-foreground mt-1">
                      {tier.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tier.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-4 pb-8">
        <Button
          size="lg"
          className="bg-[#0070ba] hover:bg-[#005ea6]"
          render={
            <a
              href={PAYPAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <Heart className="size-4" />
          Donate Now
        </Button>
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
