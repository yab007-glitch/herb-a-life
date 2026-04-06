import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "HerbWise privacy policy - how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Last updated: March 2026
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            1. Information We Collect
          </h2>
          <p>
            When you create an account, we collect your name, email address, and
            password (stored securely via hashing). When you use the platform, we
            may collect usage data such as herbs viewed, dosage calculations
            performed, and chat session data to improve our services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            2. How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Provide and maintain our services</li>
            <li>Personalize your experience (saved medications, history)</li>
            <li>Improve our herb database and AI responses</li>
            <li>Communicate with you about updates or changes</li>
            <li>Ensure the security and integrity of our platform</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            3. Data Security
          </h2>
          <p>
            We implement industry-standard security measures to protect your
            personal information. Your data is stored on secure servers provided
            by Supabase, and all communications are encrypted using TLS/SSL
            protocols. However, no method of internet transmission is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            4. Data Sharing
          </h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally
            identifiable information to third parties. We may share anonymized,
            aggregated data for research or analytical purposes. We may disclose
            information when required by law or to protect our rights.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            5. Cookies and Tracking
          </h2>
          <p>
            We use essential cookies to maintain your session and remember your
            preferences. We may use analytics tools to understand how our
            platform is used. You can control cookie settings through your
            browser preferences.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            6. Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Access and download your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and data</li>
            <li>Opt out of non-essential communications</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            7. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@herbwise.app.
          </p>
        </section>
      </div>
    </div>
  );
}
