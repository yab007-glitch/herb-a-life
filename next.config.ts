import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // Skip TS check on Render (free tier memory limit) — checked in CI
  typescript: {
    ignoreBuildErrors: !!process.env.RENDER,
  },
  // Enable standalone output for Docker deployment
  output: "standalone",
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ["lucide-react", "react-markdown", "date-fns"],
  },
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  // Compression
  compress: true,
  // Trailing slash for SEO consistency
  trailingSlash: false,
  // Redirects for legacy routes
  async redirects() {
    return [
      {
        source: "/pharmacist",
        destination: "/herbalist",
        permanent: true,
      },
    ];
  },
};

// Cast to bypass NextConfig type restriction for eslint option
if (process.env.RENDER) {
  (nextConfig as Record<string, unknown>).eslint = {
    ignoreDuringBuilds: true,
  };
}

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || "",
  project: process.env.SENTRY_PROJECT || "",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.SENTRY_DSN,
});
