import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Shield,
  Scale,
  Microscope,
  FileCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Our Methodology | HerbAlly",
  description:
    "Learn how HerbAlly grades evidence, sources citations, and ensures accuracy in our herbal medicine database.",
  alternates: {
    canonical: "https://herbally.app/methodology",
  },
};

const methodologySections = [
  {
    icon: Scale,
    title: "Evidence Grading System",
    content: `
      Every herb and claim in HerbAlly receives an evidence grade from A to Traditional Use:

      **A (Strong Evidence)**: Multiple randomized controlled trials (RCTs), systematic reviews, or meta-analyses demonstrating consistent positive results. Example: Ginger for pregnancy nausea has Level A evidence.

      **B (Moderate Evidence)**: Some RCTs or well-designed observational studies showing positive results, but evidence is limited by sample size, duration, or study quality. Example: Ashwagandha for stress reduction.

      **C (Limited Evidence)**: Preliminary clinical evidence, small pilot studies, or promising mechanistic data with insufficient human trials. Example: Many traditional herbs awaiting rigorous clinical evaluation.

      **Traditional Use**: Long history of traditional use (100+ years) with ethnographic documentation, but limited or no modern clinical trials. These herbs may still be valuable, but efficacy claims are based on historical rather than scientific evidence.

      **D (Anecdotal)**: Only anecdotal reports or theoretical plausibility without clinical data. We flag these clearly and recommend caution.
    `,
  },
  {
    icon: BookOpen,
    title: "Source Hierarchy",
    content: `
      We prioritize sources in this order:

      1. **Systematic Reviews & Meta-Analyses**: Cochrane Database, PubMed systematic reviews
      2. **Randomized Controlled Trials**: Peer-reviewed RCTs with adequate sample sizes
      3. **Authoritative Monographs**: WHO Monographs, German Commission E, EMA Assessments
      4. **Government Databases**: NCCIH (NIH), NLM (PubMed), FDA GRAS notices
      5. **Pharmacopoeias**: USP, British Pharmacopoeia, European Pharmacopoeia
      6. **Traditional Sources**: Historical pharmacopoeias, ethnographic records

      We avoid: Marketing materials, manufacturer-funded studies without peer review, and unverified online sources.
    `,
  },
  {
    icon: Shield,
    title: "Safety Assessment",
    content: `
      Safety data is evaluated separately from efficacy:

      **Contraindications**: Conditions where the herb should not be used (e.g., pregnancy, liver disease, specific medication interactions)

      **Precautions**: Conditions requiring medical supervision or dose adjustment

      **Drug Interactions**: Based on pharmacokinetic data and case reports. Severity classified as:
      - Contraindicated: Never combine
      - Severe: High risk; require monitoring
      - Moderate: Moderate risk; consult healthcare provider
      - Mild: Low risk; monitor for side effects

      **Pregnancy & Nursing**: Reviewed against FDA categories, traditional use data, and clinical safety studies. When data is insufficient, we err on the side of caution.
    `,
  },
  {
    icon: Microscope,
    title: "Monograph Creation Process",
    content: `
      Each herb monograph follows this process:

      1. **Literature Review**: Systematic search of PubMed, Cochrane, and specialized databases
      2. **Evidence Extraction**: RCTs and systematic reviews evaluated for quality and relevance
      3. **Grading**: Independent evidence grading by at least two reviewers
      4. **Safety Review**: Drug interactions, contraindications, and pregnancy data reviewed by medical herbalist
      5. **Citation**: All claims linked to primary sources with PMIDs where available
      6. **Medical Review**: Final review by MD or qualified medical herbalist
      7. **Publication**: Monograph published with "Last Reviewed" date

      **Update Cycle**: Monographs are reviewed annually and updated immediately upon significant new evidence.
    `,
  },
  {
    icon: FileCheck,
    title: "Transparency & Limitations",
    content: `
      We believe in honest communication about what we know and don't know:

      **What We Do**: Provide evidence-based summaries of herbal medicine research
      **What We Don't Do**: Make medical recommendations, replace doctor consultation, or guarantee outcomes

      **Limitations**:
      - Herb quality varies by source; we cannot verify your specific product
      - Individual responses to herbs vary significantly
      - Traditional evidence doesn't always translate to modern clinical efficacy
      - Research gaps exist for many herbs

      **Our Bias**: We are committed to evidence over tradition. If traditional use conflicts with negative clinical evidence, we highlight the clinical findings.
    `,
  },
  {
    icon: FlaskConical,
    title: "Active Compound Analysis",
    content: `
      For each herb, we identify:

      **Primary Actives**: The compounds most likely responsible for observed effects
      **Mechanism**: How these compounds interact with human physiology
      **Bioavailability**: How well compounds are absorbed and utilized
      **Standardization**: Whether commercial extracts standardize for these compounds

      This information helps users understand:
      - Why different brands may vary in effectiveness
      - What to look for on supplement labels
      - How formulation affects bioavailability (e.g., curcumin + piperine)
    `,
  },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "HerbAlly Methodology",
            description:
              "How HerbAlly grades evidence, sources citations, and ensures accuracy",
            url: "https://herbally.app/methodology",
            publisher: {
              "@type": "Organization",
              name: "HerbAlly",
              url: "https://herbally.app",
            },
          }),
        }}
      />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Our Methodology
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          How we research, grade, and present herbal medicine information
        </p>
      </div>

      <div className="space-y-8">
        {methodologySections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <section.icon className="size-6 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {section.content.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("**")) {
                    // Header
                    return (
                      <h3
                        key={i}
                        className="text-lg font-semibold mt-6 mb-3"
                      >
                        {paragraph.replace(/\*\*/g, "")}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith("1. ")) {
                    // Numbered list
                    return (
                      <ol
                        key={i}
                        className="list-decimal list-inside space-y-2 mb-4"
                      >
                        {paragraph.split("\n").map((item, j) => (
                          <li key={j} className="text-muted-foreground">
                            {item.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "")}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    // Bullet list
                    return (
                      <ul
                        key={i}
                        className="list-disc list-inside space-y-2 mb-4"
                      >
                        {paragraph.split("\n").map((item, j) => (
                          <li key={j} className="text-muted-foreground">
                            {item.replace(/^-\s*/, "").replace(/\*\*/g, "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={i} className="text-muted-foreground mb-4">
                      {paragraph.replace(/\*\*/g, "")}
                    </p>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-lg border bg-muted/50 p-8 text-center">
        <h2 className="text-xl font-bold text-foreground">
          Questions About Our Methods?
        </h2>
        <p className="mt-2 text-muted-foreground">
          We're committed to transparency. If you have questions about how we
          grade evidence or want to report an error, please reach out.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            View FAQ
          </Link>
          <a
            href="mailto:yab007@gmail.com"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
