import type { NextConfig } from "next";

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
  // Image optimization domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

// Cast to bypass NextConfig type restriction for eslint option
if (process.env.RENDER) {
  (nextConfig as Record<string, unknown>).eslint = {
    ignoreDuringBuilds: true,
  };
}

export default nextConfig;
