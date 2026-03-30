import Link from "next/link";
import { Leaf } from "lucide-react";
import { FDA_DISCLAIMER } from "@/lib/constants";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function MarketingFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Leaf className="size-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Herb-a-Life
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Herb-a-Life. All rights reserved.
        </div>

        {/* FDA Disclaimer */}
        <div className="mt-4 rounded-lg bg-muted/50 px-4 py-3">
          <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
            {FDA_DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}
