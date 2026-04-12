import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Core Web Vitals endpoint for real user monitoring
// Stores metrics in Supabase for analysis

interface WebVitalsPayload {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
  pathname: string;
  effectiveType?: string;
  deviceMemory?: number;
  timestamp: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: WebVitalsPayload = await request.json();

    // Validate required fields
    if (!body.name || typeof body.value !== "number" || !body.pathname) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Store in Supabase if configured
    const supabaseUrl = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? process.env.NEXT_PUBLIC_SUPABASE_URL
      : null;

    if (supabaseUrl) {
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.from("web_vitals").insert({
        metric_name: body.name,
        value: body.value,
        rating: body.rating,
        pathname: body.pathname,
        device_type: body.effectiveType || "unknown",
        device_memory: body.deviceMemory,
        recorded_at: new Date(body.timestamp).toISOString(),
      });

      if (error) {
        console.error("Failed to store web vital:", error);
      }
    }

    // Log to console for now (until DB table created)
    console.log("[Web Vitals]", {
      name: body.name,
      value: body.value,
      rating: body.rating,
      pathname: body.pathname,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Web vitals endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
