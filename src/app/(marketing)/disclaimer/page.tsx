import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { FDA_DISCLAIMER_FULL } from "@/lib/constants/fda-disclaimer";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description: "Read the full medical and FDA disclaimer for HerbAlly.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex size-14 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          <AlertTriangle className="size-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Medical Disclaimer
        </h1>
        <p className="mt-2 text-muted-foreground">
          Please read this disclaimer carefully before using HerbAlly.
        </p>
      </div>

      <div className="prose prose-sm max-w-none dark:prose-invert">
        {FDA_DISCLAIMER_FULL.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}

        <h2 className="mt-8 text-lg font-semibold text-foreground">
          Limitation of Liability
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          HerbAlly, its owners, operators, and contributors shall not be held
          liable for any damages, injuries, or health complications arising from
          the use or misuse of information provided on this platform. Users
          acknowledge that they use this platform at their own risk and accept
          full responsibility for any decisions made based on the content
          provided.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-foreground">
          Information Accuracy
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          While we strive to provide accurate and up-to-date information, we
          make no warranties or representations regarding the completeness,
          accuracy, reliability, or suitability of the information contained on
          this platform. The herbal and supplement industry is continually
          evolving, and new research may change current understanding of herb
          safety and efficacy.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-foreground">
          AI-Generated Content
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          The Virtual Herbalist feature uses artificial intelligence to generate
          responses. While designed to provide helpful information, AI-generated
          content may contain errors or omissions. AI responses should never be
          used as a substitute for professional medical advice, diagnosis, or
          treatment.
        </p>
      </div>
    </div>
  );
}
