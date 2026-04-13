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
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self' https://pnvltmyixympgammxvoo.supabase.co https://api.openrouter.com https://ollama.com; font-src 'self'; frame-ancestors 'none';",
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
