import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "HerbAlly terms of service and conditions of use.",
  alternates: { canonical: "https://herbally.app/terms" },
  openGraph: {
    title: "Terms of Service",
    description: "HerbAlly terms of service and conditions of use.",
    url: "https://herbally.app/terms",
    type: "website",
    siteName: "HerbAlly",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        Terms of Service
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Last updated: April 2026
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using HerbAlly, you agree to be bound by these Terms
            of Service and all applicable laws and regulations. If you do not
            agree with any of these terms, you are prohibited from using this
            platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            2. Use of Service
          </h2>
          <p>
            HerbAlly provides educational information about medicinal herbs,
            dosage calculations, and AI-powered herbalist guidance. No account
            or registration is required — the service is freely available to
            everyone. You agree to use the service only for lawful purposes and
            in accordance with these Terms.
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>You must be at least 18 years old to use this service</li>
            <li>You must not misuse or attempt to exploit the platform</li>
            <li>
              You must not use the service for commercial purposes without
              permission
            </li>
            <li>You must not attempt to overload or disrupt the service</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            3. Medical Disclaimer
          </h2>
          <p>
            The information provided on HerbAlly is for educational purposes
            only. It is not intended to diagnose, treat, cure, or prevent any
            disease. Always consult a qualified healthcare professional before
            making any health-related decisions based on information found on
            this platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            4. AI-Generated Content Limitations
          </h2>
          <p>
            HerbAlly uses artificial intelligence to generate responses in the
            Virtual Herbalist. You acknowledge and agree that:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              AI-generated responses are for informational and educational
              purposes only and do not constitute medical advice
            </li>
            <li>
              AI responses may contain inaccuracies, omissions, or outdated
              information despite our best efforts
            </li>
            <li>
              The AI does not have access to your personal medical history and
              cannot provide personalized medical recommendations
            </li>
            <li>
              You should always verify AI-generated information with a qualified
              healthcare professional before acting on it
            </li>
            <li>
              HerbAlly is not liable for any decisions made based on AI-generated
              content
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            5. Intellectual Property
          </h2>
          <p>
            All content on HerbAlly, including text, graphics, logos, and
            software, is the property of HerbAlly or its content suppliers and
            is protected by intellectual property laws. You may not reproduce,
            distribute, or create derivative works without our express written
            permission.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            6. Limitation of Liability
          </h2>
          <p>
            HerbAlly shall not be liable for any direct, indirect, incidental,
            special, or consequential damages resulting from the use or
            inability to use our service, including but not limited to damages
            for loss of profits, data, or other intangible losses.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            7. User Content
          </h2>
          <p>
            Any content you submit through the platform (such as chat messages to
            the Virtual Herbalist) may be processed by our AI systems to generate
            responses. We do not claim ownership of your content, but you grant
            us a license to use it for the purpose of providing and improving our
            services. Chat messages are not stored on our servers after the
            session ends.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            8. Service Availability
          </h2>
          <p>
            HerbAlly is provided "as is" and "as available." We do not guarantee
            uninterrupted access to the service. We reserve the right to modify,
            suspend, or discontinue any part of the service at any time without
            notice.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            9. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will
            be effective immediately upon posting. Your continued use of the
            service after changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            10. Contact Us
          </h2>
          <p>
            If you have questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@herbally.app" className="text-primary underline">
              legal@herbally.app
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}