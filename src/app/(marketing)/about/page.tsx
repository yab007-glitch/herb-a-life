import type { Metadata } from "next";
import {
  Leaf,
  Search,
  Calculator,
  MessageCircle,
  Heart,
  Shield,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About HerbWise",
  description:
    "Learn about HerbWise, our mission, and how we help you make informed decisions about medicinal herbs.",
};

const howItWorks = [
  {
    step: 1,
    icon: Search,
    title: "Search Our Database",
    description:
      "Browse over 500 medicinal herbs with detailed profiles including active compounds, traditional uses, and modern research.",
  },
  {
    step: 2,
    icon: Calculator,
    title: "Calculate Safe Doses",
    description:
      "Use our dose calculator with medically recognized formulas to determine appropriate dosages for different ages and weights.",
  },
  {
    step: 3,
    icon: MessageCircle,
    title: "Consult the Virtual Herbalist",
    description:
      "Ask our AI-powered herbalist about herb safety, drug interactions, and get personalized guidance for your situation.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Leaf className="size-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          About HerbWise
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Your trusted, evidence-based resource for medicinal herbs and natural
          remedies.
        </p>
      </div>

      {/* What is HerbWise */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          What is HerbWise?
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            HerbWise is a comprehensive digital platform designed to provide
            reliable, evidence-based information about medicinal herbs and
            natural remedies. We combine a vast herb database, scientifically
            grounded dosage calculators, and AI-powered guidance to help
            individuals make informed decisions about herbal supplements and
            their potential interactions with medications.
          </p>
          <p>
            Whether you are a healthcare professional looking for quick
            reference material, a herbalist seeking interaction data, or an
            individual exploring natural wellness options, HerbWise provides the
            tools and information you need in one accessible platform.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Our Mission</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-2 text-center">
              <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <BookOpen className="size-5" />
              </div>
              <h3 className="font-semibold text-foreground">Educate</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Provide accessible, evidence-based information about medicinal
                herbs and their uses.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-2 text-center">
              <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                <Shield className="size-5" />
              </div>
              <h3 className="font-semibold text-foreground">Protect</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Help users identify potential drug-herb interactions and make
                safer supplement choices.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-2 text-center">
              <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                <Heart className="size-5" />
              </div>
              <h3 className="font-semibold text-foreground">Empower</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Give individuals and practitioners the tools to make informed
                herbal wellness decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
          How It Works
        </h2>
        <div className="space-y-8">
          {howItWorks.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="flex gap-6">
                <div className="flex shrink-0 flex-col items-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  {item.step < howItWorks.length && (
                    <div className="mt-2 h-full w-px bg-border" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-2">
                    <Icon className="size-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Free & Donation-Supported */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          Free Forever, Powered by Donations
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            HerbWise is completely free to use with no limits, no paywalls, and
            no advertising. We believe access to herbal medicine knowledge is a
            right, not a privilege.
          </p>
          <p>
            We sustain our operations entirely through voluntary donations from
            our community. Your contributions cover server hosting, database
            costs, AI API usage, and ongoing development.
          </p>
          <p>
            If HerbWise has been helpful to you, please consider{" "}
            <a
              href="/donate"
              className="font-medium text-primary underline hover:no-underline"
            >
              making a donation
            </a>{" "}
            to help us keep this resource available for everyone.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Our Team</h2>
        <p className="text-muted-foreground">
          HerbWise is developed by a dedicated team of software engineers,
          herbalists, and healthcare professionals passionate about making
          herbal medicine information accessible and safe. Our content is
          reviewed by qualified practitioners to ensure accuracy and
          reliability.
        </p>
      </section>
    </div>
  );
}
