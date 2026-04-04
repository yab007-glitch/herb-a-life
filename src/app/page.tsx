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

const features = [
  {
    icon: Database,
    title: "2,700+ Medicinal Herbs",
    description:
      "The most comprehensive herbal database available. Detailed profiles with active compounds, traditional uses, and modern applications.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Calculator,
    title: "Precision Dosage Calculator",
    description:
      "Calculate safe dosages using Clark's Rule, Young's Rule, BSA, and Fried's Rule. Get personalized recommendations based on age and weight.",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    icon: Shield,
    title: "Drug Interaction Checker",
    description:
      "Cross-reference your medications with our database. Identify mild, moderate, severe, and contraindicated combinations.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: MessageCircle,
    title: "AI Virtual Herbalist",
    description:
      "Ask questions about herbs, dosages, and safety. Powered by evidence-based sources including WHO monographs and PubMed research.",
    gradient: "from-blue-500 to-indigo-600",
  },
];

const stats = [
  { value: "2,700+", label: "Herbs Documented", icon: Leaf },
  { value: "500+", label: "Drug Interactions", icon: Shield },
  { value: "100%", label: "Free to Use", icon: TrendingUp },
];

const trustBadges = [
  "WHO Monographs",
  "German Commission E",
  "PubMed Research",
  "FDA Compliant",
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <FDADisclaimerBanner />
      <MarketingNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] overflow-hidden hero-gradient">
          {/* Decorative elements */}
          <div className="absolute inset-0 dot-pattern opacity-50" />
          <div className="absolute -top-40 right-0 size-[600px] rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-20 left-0 size-[500px] rounded-full bg-cyan-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
          
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="size-4" />
                <span>Evidence-Based Herbal Medicine Platform</span>
              </div>

              {/* Headline */}
              <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Your Complete Guide to{" "}
                <span className="gradient-text">Medicinal Herbs</span>
              </h1>

              {/* Subheadline */}
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Explore 2,700+ herbs, calculate precise dosages, check drug interactions, 
                and consult our AI herbalist — all in one place.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="gap-2 px-8 py-6 text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30" render={<Link href="/herbs" />}>
                  <Leaf className="size-5" />
                  Explore Herbs
                  <ArrowRight className="size-4" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2 px-8 py-6 text-base" render={<Link href="/pharmacist" />}>
                  <MessageCircle className="size-5" />
                  Ask AI Herbalist
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="font-medium">Powered by:</span>
                {trustBadges.map((badge) => (
                  <span key={badge} className="rounded-full border bg-muted/50 px-3 py-1">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center justify-center gap-4 sm:flex-col sm:text-center">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground sm:text-3xl">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything You Need for Herbal Wellness
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Professional-grade tools built on scientific research and traditional knowledge.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={feature.title}
                    className="feature-card group border-border/50 bg-card/50 backdrop-blur-sm"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className={`inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                          <Icon className="size-6" />
                        </div>
                        <ArrowRight className="size-5 text-muted-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Get started in seconds with our intuitive platform
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { step: "1", title: "Search", desc: "Find herbs by name, symptom, or active compound" },
                { step: "2", title: "Learn", desc: "Read detailed profiles, dosages, and safety info" },
                { step: "3", title: "Ask", desc: "Consult the AI herbalist for personalized guidance" },
              ].map((item) => (
                <div key={item.step} className="relative text-center">
                  <div className="mb-4 inline-flex size-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="relative overflow-hidden border-primary/20">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
              <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-cyan-500/10 blur-3xl" />
              
              <CardContent className="relative p-8 text-center sm:p-12">
                <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Leaf className="size-8" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
                  Start Your Herbal Journey Today
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                  Create a free account to save your medications, track interactions, 
                  and get personalized recommendations from our virtual herbalist.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="gap-2 px-8" render={<Link href="/register" />}>
                    Get Started Free
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button variant="outline" size="lg" render={<Link href="/herbs" />}>
                    Browse Without Account
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