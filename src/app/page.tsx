"use client";

import Link from "next/link";
import {
  Leaf,
  Calculator,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Database,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MarketingNavbar } from "@/components/layout/marketing-navbar";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { FDADisclaimerBanner } from "@/components/layout/fda-disclaimer-banner";
import { FloatingHerbs } from "@/components/shared/floating-herbs";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { useI18n } from "@/components/i18n/i18n-provider";

export default function LandingPage() {
  const { t } = useI18n();

  const features = [
    {
      icon: Database,
      titleKey: "home.features.herbs.title",
      titleFallback: "2,700+ Medicinal Herbs",
      descriptionKey: "home.features.herbs.description",
      descriptionFallback:
        "The most comprehensive herbal database available. Detailed profiles with active compounds, traditional uses, and modern applications.",
      gradient: "from-emerald-500 to-teal-600",
      href: "/herbs",
    },
    {
      icon: Calculator,
      titleKey: "home.features.calculator.title",
      titleFallback: "Precision Dosage Calculator",
      descriptionKey: "home.features.calculator.description",
      descriptionFallback:
        "Calculate safe dosages using Clark's Rule, Young's Rule, BSA, and Fried's Rule. Get personalized recommendations based on age and weight.",
      gradient: "from-teal-500 to-cyan-600",
      href: "/calculator",
    },
    {
      icon: Shield,
      titleKey: "home.features.interactions.title",
      titleFallback: "Drug Interaction Checker",
      descriptionKey: "home.features.interactions.description",
      descriptionFallback:
        "Cross-reference your medications with our database. Identify mild, moderate, severe, and contraindicated combinations.",
      gradient: "from-cyan-500 to-blue-600",
      href: "/herbs",
    },
    {
      icon: MessageCircle,
      titleKey: "home.features.ai.title",
      titleFallback: "AI Virtual Herbalist",
      descriptionKey: "home.features.ai.description",
      descriptionFallback:
        "Ask questions about herbs, dosages, and safety. Powered by evidence-based sources including WHO monographs and PubMed research.",
      gradient: "from-blue-500 to-indigo-600",
      href: "/pharmacist",
    },
  ];

  const stats = [
    { value: "2,700+", labelKey: "home.stats.herbs", icon: Leaf },
    { value: "500+", labelKey: "home.stats.interactions", icon: Shield },
    { value: "100%", labelKey: "home.stats.free", icon: TrendingUp },
  ];

  const trustBadges = [
    "WHO Monographs",
    "German Commission E",
    "PubMed Research",
    "FDA Compliant",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <FDADisclaimerBanner />
      <MarketingNavbar />

      {/* CRITICAL-2: skip link target */}
      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" className="relative min-h-[90vh] overflow-hidden hero-gradient">
          {/* HIGH-3: decorative divs get aria-hidden */}
          <div className="absolute inset-0 dot-pattern opacity-50" aria-hidden="true" />
          <div className="absolute -top-40 right-0 size-[600px] rounded-full bg-primary/10 blur-3xl motion-safe:animate-pulse-glow" aria-hidden="true" />
          <div
            className="absolute -bottom-20 left-0 size-[500px] rounded-full bg-cyan-500/10 blur-3xl motion-safe:animate-pulse-glow"
            style={{ animationDelay: "2s" }}
            aria-hidden="true"
          />
          <FloatingHerbs />

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="text-center">
              {/* MED-5: evidence badge with semantic role */}
              <div
                role="note"
                aria-label="Platform type: Evidence-Based Herbal Medicine"
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm"
              >
                <Sparkles className="size-4" />
                <span>{t("home.hero.badge")}</span>
              </div>

              <h1 id="hero-heading" className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                {t("home.hero.title")}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                {t("home.hero.subtitle")}
              </p>

              {/* MED-1: differentiated CTAs */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="gap-2 px-8 py-6 text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                  render={<Link href="/herbs" />}
                >
                  <Leaf className="size-5" />
                  {t("home.hero.searchButton")}
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 px-8 py-6 text-base"
                  render={<Link href="/pharmacist" />}
                >
                  <MessageCircle className="size-5" />
                  {t("home.features.ai.title")}
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="font-medium">{t("home.trustBadges")}:</span>
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border bg-muted/50 px-3 py-1"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section aria-labelledby="stats-heading" className="border-y bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            {/* LOW-1: sr-only heading for stats */}
            <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.labelKey}
                    className="flex items-center justify-center gap-4 sm:flex-col sm:text-center"
                  >
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground sm:text-3xl">
                        <AnimatedCounter value={stat.value} />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t(stat.labelKey)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section aria-labelledby="features-heading" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("home.features.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                {t("home.features.subtitle")}
              </p>
            </div>

            {/* HIGH-5 & LOW-8: feature cards as linked articles */}
            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.titleKey}>
                    <Link href={feature.href} className="block">
                      <Card className="feature-card group border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="mb-4 flex items-start justify-between">
                            <div
                              className={`inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
                            >
                              <Icon className="size-6" />
                            </div>
                            <ArrowRight className="size-5 text-muted-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                          </div>
                          <h3 className="mb-2 text-xl font-semibold text-foreground">
                            {t(feature.titleKey)}
                          </h3>
                          <p className="leading-relaxed text-muted-foreground">
                            {t(feature.descriptionKey)}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section aria-labelledby="cta-heading" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="relative overflow-hidden border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" aria-hidden="true" />
              <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
              <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden="true" />

              <CardContent className="relative p-8 text-center sm:p-12">
                <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Leaf className="size-8" />
                </div>
                <h2 id="cta-heading" className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
                  {t("home.cta.title")}
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                  {t("home.cta.subtitle")}
                </p>
                {/* MED-1: differentiated CTAs */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="gap-2 px-8"
                    render={<Link href="/herbs" />}
                  >
                    <Leaf className="size-5" />
                    {t("home.hero.searchButton")}
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 px-8"
                    render={<Link href="/pharmacist" />}
                  >
                    <MessageCircle className="size-5" />
                    {t("home.features.ai.title")}
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
