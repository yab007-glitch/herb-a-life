import Link from "next/link";
import { Leaf } from "lucide-react";

const footerLinks = {
  product: [
    { href: "/herbs", label: "Herb Database" },
    { href: "/calculator", label: "Dose Calculator" },
    { href: "/pharmacist", label: "Virtual Herbalist" },
    { href: "/dashboard", label: "Dashboard" },
  ],
  resources: [
    { href: "/about", label: "About Us" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-teal-600 text-white">
                <Leaf className="size-5" />
              </div>
              <span className="text-lg font-bold text-foreground">
                <span className="gradient-text">1</span>Herb
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Your trusted guide to medicinal herbs. Evidence-based information 
              powered by WHO monographs, German Commission E, and PubMed research.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Product</h3>
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
            <h3 className="mb-3 text-sm font-semibold text-foreground">Resources</h3>
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
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HerbWise. Educational purposes only. Not medical advice.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Supabase, and OpenRouter
          </p>
        </div>
      </div>
    </footer>
  );
}