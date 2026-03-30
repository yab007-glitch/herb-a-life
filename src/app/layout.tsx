import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
    process.env.NEXT_PUBLIC_APP_URL ?? "https://herbwise.app"
  ),
  title: {
    default: "HerbWise - Your Trusted Guide to Medicinal Herbs",
    template: "%s | HerbWise",
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
    siteName: "HerbWise",
    title: "HerbWise - Your Trusted Guide to Medicinal Herbs",
    description:
      "Explore 2,700+ medicinal herbs, calculate dosages, and check drug interactions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HerbWise - Medicinal Herbs Database",
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
        <TooltipProvider>
          {children}
          <Toaster position="top-right" richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
