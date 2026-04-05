import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const startTime = Date.now();
  const checks: Record<string, { status: string; latency?: number; error?: string }> = {};

  // Check database connection
  try {
    const supabase = await createClient();
    const dbStart = Date.now();
    const { error } = await supabase.from("herbs").select("id").limit(1);
    const dbLatency = Date.now() - dbStart;
    
    if (error) {
      checks.database = { status: "unhealthy", error: error.message };
    } else {
      checks.database = { status: "healthy", latency: dbLatency };
    }
  } catch (err) {
    checks.database = { 
      status: "unhealthy", 
      error: err instanceof Error ? err.message : "Unknown error" 
    };
  }

  // Check environment variables
  const requiredEnvVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "OPENROUTER_API_KEY",
  ];

  const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
  
  checks.environment = {
    status: missingEnvVars.length === 0 ? "healthy" : "degraded",
    error: missingEnvVars.length > 0 ? `Missing: ${missingEnvVars.join(", ")}` : undefined,
  };

  // Check OpenRouter API key configuration
  checks.openai = {
    status: process.env.OPENROUTER_API_KEY ? "healthy" : "unconfigured",
    error: !process.env.OPENROUTER_API_KEY ? "OPENROUTER_API_KEY not set" : undefined,
  };

  // Overall status
  const allHealthy = Object.values(checks).every(
    (c) => c.status === "healthy" || c.status === "unconfigured"
  );
  const anyUnhealthy = Object.values(checks).some((c) => c.status === "unhealthy");

  const status = anyUnhealthy ? "unhealthy" : allHealthy ? "healthy" : "degraded";
  const totalLatency = Date.now() - startTime;

  return NextResponse.json(
    {
      status,
      version: process.env.npm_package_version || "0.1.0",
      timestamp: new Date().toISOString(),
      latency: totalLatency,
      checks,
    },
    { status: status === "unhealthy" ? 503 : 200 }
  );
}