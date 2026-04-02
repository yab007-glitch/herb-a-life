import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip TS check on Render (free tier memory limit) — checked in CI
  typescript: {
    ignoreBuildErrors: !!process.env.RENDER,
  },
  // eslint ignore is handled via eslint config, not NextConfig in Next.js 16
};

// Cast to bypass NextConfig type restriction for eslint option
if (process.env.RENDER) {
  (nextConfig as Record<string, unknown>).eslint = {
    ignoreDuringBuilds: true,
  };
}

export default nextConfig;
