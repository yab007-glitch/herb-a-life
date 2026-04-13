import type { Metadata } from "next";
import { ShieldCheck, Award, BookOpen, Stethoscope, GraduationCap, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medical Review Team — HerbAlly",
  description:
    "HerbAlly's medical review team ensures clinical accuracy and safety of our herbal medicine content. Meet our reviewers.",
  openGraph: {
    title: "Medical Review Team — HerbAlly",
    description: "Meet the medical professionals who review HerbAlly's herbal content for clinical accuracy.",
  },
};

interface Reviewer {
  name: string;
  credentials: string;
  title: string;
  specialty: string;
  bio: string;
  link?: { label: string; url: string };
  reviewedHerbs: number;
  joinedDate: string;
}

const reviewers: Reviewer[] = [
  {
    name: "Your Name Here",
    credentials: "MD, PhD, or other credentials",
    title: "Medical Reviewer",
    specialty: "Integrative Medicine / Herbal Medicine",
    bio: "We are actively seeking qualified medical professionals to review our content. If you are an MD, ND, or PhD with expertise in botanical medicine, we would love to hear from you.",
    link: { label: "Apply to Review", url: "mailto:founder@herbally.app?subject=Medical%20Reviewer%20Application" },
    reviewedHerbs: 0,
    joinedDate: "",
  },
];

export default function ReviewersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            Clinical Accuracy Matters
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Medical Review Team
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Every herb monograph on HerbAlly is reviewed for clinical accuracy
            and safety by qualified medical professionals.
          </p>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border bg-card p-6 text-center">
            <Award className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Evidence-Based</h3>
            <p className="text-sm text-muted-foreground">
              Every claim is graded A–D or Traditional, with citations from
              PubMed, WHO, EMA, and Commission E.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 text-center">
            <Stethoscope className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Clinically Reviewed</h3>
            <p className="text-sm text-muted-foreground">
              Safety alerts, drug interactions, and pregnancy categories are
              verified by licensed practitioners.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 text-center">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Transparent Process</h3>
            <p className="text-sm text-muted-foreground">
              Reviewer names and credentials are displayed on every page they
              review. No anonymous approval.
            </p>
          </div>
        </div>
      </section>

      {/* Reviewers */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-8">Our Reviewers</h2>
        <div className="space-y-6">
          {reviewers.map((reviewer) => (
            <div
              key={reviewer.name}
              className="rounded-xl border bg-card p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-10 h-10 text-primary/60" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold">{reviewer.name}</h3>
                  <p className="text-primary font-medium">
                    {reviewer.credentials}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {reviewer.title}
                    {reviewer.specialty && ` · ${reviewer.specialty}`}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed">
                    {reviewer.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    {reviewer.reviewedHerbs > 0 && (
                      <span className="inline-flex items-center gap-1 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {reviewer.reviewedHerbs} herbs reviewed
                      </span>
                    )}
                    {reviewer.joinedDate && (
                      <span className="text-xs text-muted-foreground">
                        Reviewing since {reviewer.joinedDate}
                      </span>
                    )}
                    {reviewer.link && (
                      <a
                        href={reviewer.link.url}
                        target={reviewer.link.url.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
                      >
                        {reviewer.link.label}
                        {!reviewer.link.url.startsWith("mailto:") && (
                          <ExternalLink className="w-3.5 h-3.5" />
                        )}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the Team */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 p-8 text-center">
          <GraduationCap className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">
            Join Our Medical Review Team
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            We&apos;re looking for licensed MDs, NDs, and PhDs with expertise in
            herbal medicine, pharmacognosy, or integrative medicine. As a
            reviewer, you&apos;ll receive:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-xl mx-auto text-left mb-8">
            <div className="text-sm">
              <strong className="text-foreground">Full Credit</strong>
              <p className="text-muted-foreground">
                Name, credentials, and link on every page you review
              </p>
            </div>
            <div className="text-sm">
              <strong className="text-foreground">Dedicated Page</strong>
              <p className="text-muted-foreground">
                Your own reviewer profile with bio and links
              </p>
            </div>
            <div className="text-sm">
              <strong className="text-foreground">Free Access</strong>
              <p className="text-muted-foreground">
                Your expertise reaches 2,700+ herbs and thousands of visitors
              </p>
            </div>
          </div>
          <a
            href="mailto:founder@herbally.app?subject=Medical%20Reviewer%20Application"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Apply to Review <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to HerbAlly
        </Link>
      </div>
    </div>
  );
}