import Link from "next/link";
import {
  Leaf,
  Calculator,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MarketingNavbar } from "@/components/layout/marketing-navbar";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { FDADisclaimerBanner } from "@/components/layout/fda-disclaimer-banner";

const features = [
  {
    icon: Leaf,
    title: "Herb Database",
    description:
      "Browse our comprehensive database of 500+ medicinal herbs with detailed profiles, active compounds, traditional and modern uses.",
  },
  {
    icon: Calculator,
    title: "Dose Calculator",
    description:
      "Calculate safe dosages for children and infants using medically recognized formulas like Clark's Rule, Young's Rule, BSA, and Fried's Rule.",
  },
  {
    icon: MessageCircle,
    title: "Virtual Herbalist",
    description:
      "Chat with our AI-powered virtual herbalist to get instant answers about herb safety, drug interactions, and usage guidelines.",
  },
];

const stats = [
  { value: "500+", label: "Herbs" },
  { value: "200+", label: "Interactions" },
  { value: "Free", label: "To Use" },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <FDADisclaimerBanner />
      <MarketingNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-background px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 dark:from-green-950/20">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 right-0 size-[500px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-20 left-0 size-[400px] rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
              <Leaf className="size-4 text-primary" />
              Evidence-based herbal medicine resource
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Your Trusted Guide to{" "}
              <span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent dark:to-green-400">
                Medicinal Herbs
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Explore a comprehensive database of medicinal herbs. Calculate safe
              dosages, check drug interactions, and consult our AI-powered
              virtual herbalist.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" render={<Link href="/herbs" />}>
                <Leaf className="size-4" />
                Browse Herbs
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                render={<Link href="/calculator" />}
              >
                <Calculator className="size-4" />
                Try Calculator
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything You Need for Herbal Wellness
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Comprehensive tools to help you make informed decisions about
                medicinal herbs and natural remedies.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={feature.title}
                    className="relative overflow-hidden transition-shadow hover:shadow-lg"
                  >
                    <CardContent className="pt-2">
                      <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-primary sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-green-50 dark:to-green-950/20">
              <CardContent className="pt-2 text-center">
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Leaf className="size-7" />
                </div>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Start Your Herbal Journey Today
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                  Create a free account to save your medications, track
                  interactions, and get personalized recommendations from our
                  virtual herbalist.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button size="lg" render={<Link href="/register" />}>
                    Get Started Free
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    render={<Link href="/herbs" />}
                  >
                    Explore Herbs First
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
