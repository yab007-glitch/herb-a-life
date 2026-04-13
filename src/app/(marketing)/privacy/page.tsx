import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "HerbAlly privacy policy - how we collect, use, and protect your data.",
  alternates: { canonical: "https://herbally.app/privacy" },
  openGraph: {
    title: "Privacy Policy",
    description:
      "HerbAlly privacy policy - how we collect, use, and protect your data.",
    url: "https://herbally.app/privacy",
    type: "website",
    siteName: "HerbAlly",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Last updated: April 2026
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            1. Overview
          </h2>
          <p>
            HerbAlly is a free, public resource — no account, registration, or
            login is required. We are committed to protecting your privacy and
            being transparent about what data we collect and how we use it.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            2. Information We Collect
          </h2>
          <p>Because HerbAlly does not require accounts, we collect minimal data:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>Chat messages:</strong> Questions you type in the Virtual
              Herbalist are sent to our AI providers to generate responses. We
              do not store these messages on our servers.
            </li>
            <li>
              <strong>Usage analytics:</strong> We collect anonymous,
              aggregate analytics (page views, popular herbs, general region) to
              improve the service. No personally identifiable information is
              collected.
            </li>
            <li>
              <strong>Cookies:</strong> A single cookie
              (<code>herbally-locale</code>) stores your language preference
              (English or French). No tracking cookies are used.
            </li>
          </ul>
          <p className="mt-3">
            We do <strong>not</strong> collect names, email addresses, or any
            other personal information. We have no accounts, passwords, or user
            profiles.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            3. How We Use Your Information
          </h2>
          <p>We use the limited data we collect to:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Provide and maintain our services</li>
            <li>Generate AI responses in the Virtual Herbalist (messages are not stored)</li>
            <li>Improve our herb database and AI responses using anonymous analytics</li>
            <li>Remember your language preference across visits</li>
            <li>Ensure the security and integrity of our platform</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            4. Data Security
          </h2>
          <p>
            We implement industry-standard security measures to protect any data
            in transit. All communications are encrypted using TLS/SSL protocols.
            Since we do not store personal data or chat messages on our servers,
            the attack surface for personal data is minimal.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            5. Third-Party Services
          </h2>
          <p>HerbAlly relies on the following third-party services:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>Supabase</strong> — Hosts our herb database. No personal
              data is stored in Supabase.
            </li>
            <li>
              <strong>OpenRouter / Ollama</strong> — Powers our AI Virtual
              Herbalist. Chat messages are sent to these providers to generate
              responses and are subject to their respective privacy policies.
            </li>
            <li>
              <strong>Vercel</strong> — Hosts the HerbAlly application. Vercel
              may collect standard web analytics as described in their privacy
              policy.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            6. Data Sharing
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
            7. Cookie Policy
          </h2>
          <p>HerbAlly uses a single essential cookie:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <strong>herbally-locale</strong> — Stores your language preference
              (en or fr). This cookie is set when you choose a language and is
              required for basic site functionality.
            </li>
          </ul>
          <p className="mt-3">
            We do not use third-party tracking cookies, advertising cookies, or
            analytics cookies that collect personal data.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            8. Your Data Rights (GDPR)
          </h2>
          <p>
            Even though we collect minimal data, we respect your rights under
            applicable data protection laws, including GDPR:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li><strong>Right to access:</strong> You can request a copy of any data we hold about you.</li>
            <li><strong>Right to rectification:</strong> You can request correction of any inaccurate data.</li>
            <li><strong>Right to erasure:</strong> You can request deletion of any data we hold about you.</li>
            <li><strong>Right to restrict processing:</strong> You can request that we limit how we use your data.</li>
            <li><strong>Right to data portability:</strong> You can request your data in a portable format.</li>
            <li><strong>Right to object:</strong> You can object to our processing of your data.</li>
          </ul>
          <p className="mt-3">
            Since we do not maintain accounts or store personal data, exercising
            these rights is straightforward. To make a request, contact us at{" "}
            <a href="mailto:privacy@herbally.app" className="text-primary underline">
              privacy@herbally.app
            </a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            9. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date. Continued use of
            the service after changes constitutes acceptance of the revised
            policy.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            10. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy or wish to
            exercise your data rights, please contact us at{" "}
            <a href="mailto:privacy@herbally.app" className="text-primary underline">
              privacy@herbally.app
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}