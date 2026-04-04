import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "1Herb terms of service and conditions of use.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        Terms of Service
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Last updated: March 2026
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using 1Herb, you agree to be bound by these Terms
            of Service and all applicable laws and regulations. If you do not
            agree with any of these terms, you are prohibited from using this
            platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            2. Use of Service
          </h2>
          <p>1Herb provides educational information about medicinal herbs,
            dosage calculations, and AI-powered herbalist guidance. You agree
            to use the service only for lawful purposes and in accordance with
            these Terms.</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>You must be at least 18 years old to create an account</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must not misuse or attempt to exploit the platform</li>
            <li>You must not use the service for commercial purposes without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            3. Medical Disclaimer
          </h2>
          <p>
            The information provided on 1Herb is for educational purposes
            only. It is not intended to diagnose, treat, cure, or prevent any
            disease. Always consult a qualified healthcare professional before
            making any health-related decisions based on information found on
            this platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            4. Intellectual Property
          </h2>
          <p>
            All content on 1Herb, including text, graphics, logos, and
            software, is the property of 1Herb or its content suppliers and
            is protected by intellectual property laws. You may not reproduce,
            distribute, or create derivative works without our express written
            permission.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            5. Limitation of Liability
          </h2>
          <p>
            1Herb shall not be liable for any direct, indirect, incidental,
            special, or consequential damages resulting from the use or inability
            to use our service, including but not limited to damages for loss of
            profits, data, or other intangible losses.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            6. User Content
          </h2>
          <p>
            Any content you submit through the platform (such as chat messages)
            may be processed by our AI systems to generate responses. We do not
            claim ownership of your content, but you grant us a license to use
            it for the purpose of providing and improving our services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            7. Termination
          </h2>
          <p>
            We reserve the right to terminate or suspend your account and access
            to the service at our sole discretion, without notice, for conduct
            that we believe violates these Terms or is harmful to other users,
            us, or third parties.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            8. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will
            be effective immediately upon posting. Your continued use of the
            service after changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            9. Contact Us
          </h2>
          <p>
            If you have questions about these Terms, please contact us at
            legal@1herb.app.
          </p>
        </section>
      </div>
    </div>
  );
}
