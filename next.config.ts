import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip TS check on Render (free tier memory limit) — checked in CI
  typescript: {
    ignoreBuildErrors: !!process.env.RENDER,
  },
  eslint: {
    ignoreDuringBuilds: !!process.env.RENDER,
  },
};

export default nextConfig;
