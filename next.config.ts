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
  // Headers for performance and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/(.*\\.(js|css|svg|png|jpg|jpeg|gif|webp|avif|woff|woff2|ttf|otf|ico))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
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

export default nextConfig;
