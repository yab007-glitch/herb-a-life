"use client";

import Link from "next/link";
import { Leaf, Facebook } from "lucide-react";
import { useI18n } from "@/components/i18n/i18n-provider";

export function MarketingFooter() {
  const { t } = useI18n();

  const footerLinks = {
    product: [
      { href: "/herbs", label: t("nav.herbs") },
      { href: "/calculator", label: t("nav.calculator") },
      { href: "/pharmacist", label: t("nav.herbalist") },
    ],
    resources: [
      { href: "/about", label: t("nav.about") },
      { href: "/disclaimer", label: t("footer.disclaimer") },
      { href: "/privacy", label: t("footer.privacy") },
      { href: "/terms", label: t("footer.terms") },
    ],
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Footer navigation" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5" aria-label="HerbAlly home">
              <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-teal-600 text-white">
                <Leaf className="size-5" />
              </div>
              <span className="text-lg font-bold text-foreground">
                Herb<span className="gradient-text">Ally</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {t("footer.madeWith")}
            </p>
          </div>

          {/* Product Links */}
          <div>
            {/* MED-3: use <p> instead of <h3> */}
            <p className="mb-3 text-sm font-semibold text-foreground">
              {t("footer.product")}
            </p>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            {/* MED-3: use <p> instead of <h3> */}
            <p className="mb-3 text-sm font-semibold text-foreground">
              {t("footer.resources")}
            </p>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              {t("footer.followUs")}
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com/herballyapp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Facebook className="size-4" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Bottom — MED-2: copyright with year */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HerbAlly. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
