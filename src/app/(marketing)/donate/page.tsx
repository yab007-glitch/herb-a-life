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
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DonationButtons } from "@/components/donations/donation-buttons";

export const metadata: Metadata = {
  title: "Support Us - Keep Herbal Medicine Free",
  description:
    "Help us keep HerbAlly 100% free. Your donation supports hosting, AI costs, and free access for everyone.",
  alternates: {
    canonical: "https://herbally.app/donate",
  },
  openGraph: {
    title: "Support Us - Keep Herbal Medicine Free",
    description:
      "Help us keep HerbAlly 100% free. Your donation supports hosting, AI costs, and free access for everyone.",
    url: "https://herbally.app/donate",
    type: "website",
    siteName: "HerbAlly",
  },
};

const costs = [
  {
    icon: Server,
    label: "Hosting & Infrastructure",
    description:
      "Servers, CDN, and deployment to keep the app fast and reliable",
    monthly: "$20",
  },
  {
    icon: Database,
    label: "Database & Storage",
    description: "Supabase database hosting for 2,700+ herbs and user data",
    monthly: "$25",
  },
  {
    icon: Bot,
    label: "AI Herbalist",
    description: "OpenRouter API costs for the virtual herbalist chatbot",
    monthly: "$50+",
  },
  {
    icon: Globe,
    label: "Domain & SSL",
    description: "Domain registration and secure HTTPS certificates",
    monthly: "$5",
  },
];

const testimonials = [
  {
    quote: "Finally, a free resource for herbal information!",
    author: "Sarah M.",
    location: "Portland, OR",
  },
  {
    quote: "The AI herbalist helped me understand herb-drug interactions.",
    author: "James K.",
    location: "Austin, TX",
  },
  {
    quote: "I use this weekly for my herbal tea recommendations.",
    author: "Maria L.",
    location: "Denver, CO",
  },
];

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-4xl space-y-12 py-8">
      {/* Success/Canceled Messages */}
      {params.success === "true" && (
        <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20">
          <CardContent className="flex items-center gap-4 py-6">
            <CheckCircle className="size-8 text-emerald-600" />
            <div>
              <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                Thank you for your donation! 💚
              </h2>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Your support helps keep HerbAlly free for everyone. You&#39;re
                amazing!
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
      <div className="text-center space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 shadow-xl shadow-pink-500/20">
          <Heart className="h-10 w-10 text-white fill-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Keep HerbAlly <span className="text-pink-600">100% Free</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          No ads. No paywalls. No premium tiers. Just free herbal knowledge for
          everyone — powered by people like you.
        </p>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-6 pt-4">
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
            <Leaf className="size-4 text-primary" />
            <span>
              <strong>2,700+</strong> herbs
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
            <Sparkles className="size-4 text-primary" />
            <span>Free AI herbalist</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
            <Heart className="size-4 text-pink-500 fill-pink-500" />
            <span>100% free forever</span>
          </div>
        </div>
      </div>

      {/* Donation Buttons */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Choose Your Impact</h2>
          <p className="text-muted-foreground mt-1">
            Every donation helps keep us running
          </p>
        </div>
        <DonationButtons />
      </div>

      {/* Monthly Costs Breakdown */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="size-5 text-primary" />
            Where Your Money Goes
          </CardTitle>
          <CardDescription>
            Full transparency on our monthly operating costs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {costs.map((cost) => {
              const Icon = cost.icon;
              return (
                <div
                  key={cost.label}
                  className="flex items-start gap-3 rounded-lg border border-border/50 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">
                        {cost.label}
                      </p>
                      <span className="text-sm font-semibold text-primary">
                        {cost.monthly}/mo
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {cost.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-muted px-4 py-3 text-sm">
            <span className="font-medium">Estimated monthly costs</span>
            <span className="font-bold text-lg text-primary">$100+/month</span>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">
          Why People Love HerbAlly
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="pt-6">
                <p className="text-sm italic text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-3 text-sm font-medium">— {t.author}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How We Operate */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="size-5 text-pink-500 fill-pink-500" />
            Our Promise to You
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <CheckCircle className="size-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong className="text-foreground">No ads ever.</strong> We
              don&apos;t sell your attention to advertisers.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="size-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong className="text-foreground">No premium tiers.</strong>{" "}
              Every feature is free for everyone.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="size-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong className="text-foreground">No data selling.</strong> Your
              data stays yours.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="size-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong className="text-foreground">Open about costs.</strong> We
              show you exactly where donations go.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bottom CTA */}
      <div className="text-center space-y-4 pb-8">
        <p className="text-sm text-muted-foreground">
          Questions?{" "}
          <Link href="/about" className="underline hover:text-foreground">
            Learn more about HerbAlly
          </Link>
        </p>
      </div>
    </div>
  );
}
