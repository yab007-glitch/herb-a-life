import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/components/i18n/i18n-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://herbally.app"
  ),
  title: {
    default: "HerbAlly - Your Trusted Guide to Medicinal Herbs",
    template: "%s | HerbAlly",
  },
  description:
    "Explore the world's largest medicinal herb database with 2,700+ herbs. Calculate safe dosages and check drug interactions with our AI-powered virtual herbalist.",
  keywords: [
    "medicinal herbs",
    "herbal medicine",
    "drug interactions",
    "dosage calculator",
    "herbal remedies",
    "natural medicine",
    "herb database",
    "virtual herbalist",
  ],
  openGraph: {
    type: "website",
    siteName: "HerbAlly",
    title: "HerbAlly - Your Trusted Guide to Medicinal Herbs",
    description:
      "Explore 2,700+ medicinal herbs, calculate dosages, and check drug interactions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HerbAlly - Medicinal Herbs Database",
    description:
      "Explore 2,700+ medicinal herbs, calculate dosages, and check drug interactions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <I18nProvider>
          <TooltipProvider>
            {children}
            <Toaster position="top-right" richColors />
          </TooltipProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
