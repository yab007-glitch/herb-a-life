import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, Stethoscope, Calculator, AlertTriangle, Shield, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about medicinal herbs, drug interactions, dosage safety, and how HerbAlly works. Evidence-based answers reviewed by healthcare professionals.",
  alternates: {
    canonical: "https://herbally.app/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions",
    description:
      "Common questions about medicinal herbs, drug interactions, dosage safety, and how HerbAlly works.",
    url: "https://herbally.app/faq",
    type: "website",
    siteName: "HerbAlly",
  },
};

const faqCategories = [
  {
    title: "About HerbAlly",
    icon: Leaf,
    questions: [
      {
        q: "Is HerbAlly free to use?",
        a: "Yes, HerbAlly is completely free forever. No ads, no account required, no premium tier. We believe safe herbal information should be accessible to everyone.",
      },
      {
        q: "How many herbs does HerbAlly cover?",
        a: "HerbAlly covers 2,700+ medicinal herbs with detailed profiles including active compounds, traditional uses, modern applications, dosage guidance, and drug interactions.",
      },
      {
        q: "Is the information on HerbAlly medically reviewed?",
        a: "Every herb profile is reviewed by our editorial team of medical herbalists and healthcare professionals. Evidence levels (A through D) indicate the strength of scientific support, and we cite sources from WHO monographs, NCCIH, PubMed, and Commission E.",
      },
      {
        q: "Can I trust the AI Virtual Herbalist?",
        a: "The AI herbalist provides educational information based on our herb database and authoritative sources. However, it is NOT a substitute for professional medical advice. Always verify with your healthcare provider, especially for serious conditions or drug interactions.",
      },
    ],
  },
  {
    title: "Herb Safety",
    icon: Shield,
    questions: [
      {
        q: "Are herbs safe to take with prescription medications?",
        a: "Some herbs can interact dangerously with prescription drugs. For example, St. John's Wort can reduce the effectiveness of antidepressants and birth control pills. Always check our interaction database and consult your healthcare provider before combining herbs with medications.",
      },
      {
        q: "Which herbs should I avoid during pregnancy?",
        a: "Many herbs are contraindicated during pregnancy. Herbs like black cohosh, dong quai, and high doses of garlic can stimulate uterine contractions or affect hormones. HerbAlly marks pregnancy safety on every herb page — look for the pregnancy safety badge.",
      },
      {
        q: "Can children take herbal supplements?",
        a: "Children's dosages differ significantly from adult dosages. Use our dosage calculator with Clark's Rule (weight-based), Young's Rule (age-based), or BSA method. Always consult a pediatrician before giving herbs to children.",
      },
      {
        q: "What does the evidence grade (A/B/C/D) mean?",
        a: "Evidence grades indicate the strength of scientific support: A = Strong evidence from multiple RCTs and systematic reviews. B = Moderate evidence from clinical studies. C = Limited evidence from traditional use or preclinical research. D = Anecdotal or historical use only. Traditional use (trad) = Well-established traditional use with limited clinical validation.",
      },
    ],
  },
  {
    title: "Drug Interactions",
    icon: AlertTriangle,
    questions: [
      {
        q: "What are the most dangerous herb-drug interactions?",
        a: "The most serious interactions include: St. John's Wort with antidepressants (serotonin syndrome risk), Warfarin with many herbs (bleeding risk), garlic and ginkgo with blood thinners, and kava with sedatives. Our interaction checker rates severity as Contraindicated, Severe, Moderate, or Mild.",
      },
      {
        q: "How accurate is the interaction data?",
        a: "Our interaction data is sourced from WHO monographs, PubMed clinical studies, Commission E monographs, and the NCCIH database. Evidence levels are provided for each interaction. However, no database is complete — always verify with a pharmacist.",
      },
    ],
  },
  {
    title: "Dosage & Usage",
    icon: Calculator,
    questions: [
      {
        q: "How does the dosage calculator work?",
        a: "HerbAlly supports four dosage calculation methods: Clark's Rule (weight-based for children), Young's Rule (age-based for children), Body Surface Area (BSA) method, and Fried's Rule (for infants). Select the method appropriate for your situation and input the relevant measurements.",
      },
      {
        q: "Can I take multiple herbs at the same time?",
        a: "Some herbs work well together (combinations), while others can compound effects or interact. Always research each herb individually and consult with a qualified herbalist or healthcare provider before combining herbs, especially if you take medications.",
      },
    ],
  },
  {
    title: "Virtual Herbalist",
    icon: MessageCircle,
    questions: [
      {
        q: "How does the AI Virtual Herbalist work?",
        a: "The Virtual Herbalist uses AI to provide evidence-based guidance about herbs, including safety information, potential interactions, and traditional uses. It draws from our database of 2,700+ herbs, WHO monographs, PubMed, NCCIH, and Commission E sources. Each response includes evidence levels and source citations.",
      },
      {
        q: "What should I NOT ask the Virtual Herbalist?",
        a: "Do not use it for medical diagnosis, prescription recommendations, or emergency situations. The AI cannot replace professional medical advice. If you're experiencing a medical emergency, call 911 or your local emergency number. For poison control, call 1-800-222-1222.",
      },
    ],
  },
  {
    title: "Sources & Evidence",
    icon: Stethoscope,
    questions: [
      {
        q: "What sources does HerbAlly use?",
        a: "We reference: WHO Monographs on Selected Medicinal Plants (Volumes 1-4), German Commission E monographs, European Medicines Agency (EMA) herbal monographs, NCCIH Herbs at a Glance database, and PubMed peer-reviewed research. Each herb page shows specific citations with source type and evidence level.",
      },
      {
        q: "How often is the information updated?",
        a: "Herb profiles are reviewed regularly by our editorial team. Each herb page shows a 'Last reviewed' date and reviewer credentials. We update interaction data as new research becomes available.",
      },
    ],
  },
];

// Build FAQ schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap(cat =>
    cat.questions.map(q => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.a,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Evidence-based answers about medicinal herbs, safety, drug interactions, and how HerbAlly works.
        </p>
      </div>

      <div className="space-y-10">
        {faqCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <section key={category.title}>
              <div className="mb-4 flex items-center gap-3">
                <CategoryIcon className="size-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
              </div>
              <div className="space-y-4">
                {category.questions.map((faq) => (
                  <Card key={faq.q}>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground">{faq.q}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12 rounded-lg border bg-muted/50 p-6 text-center">
        <h2 className="text-xl font-bold text-foreground">Still have questions?</h2>
        <p className="mt-2 text-muted-foreground">
          Ask our AI-powered Virtual Herbalist for personalized guidance.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/herbalist"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="size-4" />
            Ask the Virtual Herbalist
          </Link>
          <Link
            href="/symptoms"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Stethoscope className="size-4" />
            Find Herbs by Symptom
          </Link>
        </div>
      </div>
    </div>
  );
}