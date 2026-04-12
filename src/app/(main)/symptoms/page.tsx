import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Brain, Flame, Heart, Leaf, Moon, Shield, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Herbs by Symptom | HerbAlly",
  description:
    "Find the right herbs for your symptoms. Browse evidence-based herbal recommendations for anxiety, sleep, inflammation, digestion, and more.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://herbally.app"}/symptoms`,
  },
};

const symptomCategories = [
  {
    title: "Mental & Emotional",
    icon: Brain,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    symptoms: [
      { name: "Anxiety & Stress", query: "anxiety", description: "Herbs traditionally used for anxiety and stress relief" },
      { name: "Depression & Mood", query: "depression", description: "Herbs that may support mood and emotional wellbeing" },
      { name: "Sleep & Insomnia", query: "sleep", description: "Herbs traditionally used to promote sleep" },
      { name: "Focus & Memory", query: "focus", description: "Herbs that may support cognitive function" },
    ],
  },
  {
    title: "Pain & Inflammation",
    icon: Flame,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    symptoms: [
      { name: "Inflammation", query: "inflammation", description: "Herbs with anti-inflammatory properties" },
      { name: "Joint & Muscle Pain", query: "joint", description: "Herbs for musculoskeletal discomfort" },
      { name: "Headaches & Migraines", query: "headache", description: "Herbs traditionally used for headache relief" },
      { name: "Nerve Pain", query: "nerve", description: "Herbs that may support nerve health" },
    ],
  },
  {
    title: "Digestive Health",
    icon: Leaf,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    symptoms: [
      { name: "Indigestion & Bloating", query: "digestion", description: "Herbs for digestive comfort" },
      { name: "Nausea", query: "nausea", description: "Herbs traditionally used for nausea relief" },
      { name: "Constipation", query: "constipation", description: "Herbs that support regularity" },
      { name: "Liver Support", query: "liver", description: "Herbs that support liver health" },
    ],
  },
  {
    title: "Heart & Circulation",
    icon: Heart,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
    symptoms: [
      { name: "Blood Pressure", query: "blood-pressure", description: "Herbs that may support cardiovascular health" },
      { name: "Cholesterol", query: "cholesterol", description: "Herbs traditionally used for lipid management" },
      { name: "Circulation", query: "circulation", description: "Herbs that may improve circulation" },
    ],
  },
  {
    title: "Immune & Respiratory",
    icon: Shield,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    symptoms: [
      { name: "Cold & Flu", query: "cold", description: "Herbs for immune support during illness" },
      { name: "Cough & Sore Throat", query: "cough", description: "Herbs traditionally used for respiratory relief" },
      { name: "Allergies", query: "allergy", description: "Herbs that may help with allergic responses" },
      { name: "Immune Support", query: "immune", description: "Herbs for general immune support" },
    ],
  },
  {
    title: "Women's Health",
    icon: Moon,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    symptoms: [
      { name: "Menstrual Cramps", query: "menstrual", description: "Herbs for menstrual comfort" },
      { name: "Menopause", query: "menopause", description: "Herbs traditionally used during menopause" },
      { name: "Hormonal Balance", query: "hormonal", description: "Herbs that may support hormonal health" },
    ],
  },
  {
    title: "Skin & Wound Care",
    icon: Stethoscope,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    symptoms: [
      { name: "Eczema & Psoriasis", query: "skin", description: "Herbs for inflammatory skin conditions" },
      { name: "Wound Healing", query: "wound", description: "Herbs traditionally used for wound care" },
      { name: "Acne", query: "acne", description: "Herbs that may support clear skin" },
    ],
  },
];

export default function SymptomsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Find Herbs for Your Symptoms
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Don&apos;t know which herb you need? Start here. Select a symptom or condition 
          and we&apos;ll show you evidence-based herbs that may help.
        </p>
      </div>

      {/* Safety Notice */}
      <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
        <div className="flex gap-3">
          <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="text-sm text-amber-800 dark:text-amber-200">
            <p className="font-semibold">Medical Disclaimer</p>
            <p className="mt-1">
              This information is for educational purposes only. Herbs can interact with medications 
              and may not be safe for everyone. Always consult your healthcare provider before starting 
              any herbal supplement, especially if you are pregnant, nursing, or taking prescription drugs.
            </p>
          </div>
        </div>
      </div>

      {/* Symptom Categories */}
      <div className="space-y-10">
        {symptomCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <section key={category.title}>
              <div className="mb-4 flex items-center gap-3">
                <div className={`inline-flex size-10 items-center justify-center rounded-lg ${category.bgColor}`}>
                  <CategoryIcon className={`size-5 ${category.color}`} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {category.symptoms.map((symptom) => (
                  <Link
                    key={symptom.name}
                    href={`/symptoms/${encodeURIComponent(symptom.query)}`}
                    className="group"
                  >
                    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {symptom.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {symptom.description}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                          Browse herbs →
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-lg border bg-muted/50 p-6 text-center">
        <h2 className="text-xl font-bold text-foreground">Not Sure Where to Start?</h2>
        <p className="mt-2 text-muted-foreground">
          Try our AI Virtual Herbalist for personalized guidance.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/pharmacist"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Stethoscope className="size-4" />
            Ask the Virtual Herbalist
          </Link>
          <Link
            href="/herbs"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Leaf className="size-4" />
            Browse All Herbs
          </Link>
        </div>
      </div>
    </div>
  );
}