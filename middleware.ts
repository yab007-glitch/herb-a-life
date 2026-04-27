import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const publicRoutes = [
  "/",
  "/about",
  "/disclaimer",
  "/privacy",
  "/terms",
  "/herbs",
  "/symptoms",
  "/faq",
  "/compare",
  "/methodology",
  "/calculator",
  "/herbalist",
  "/donate",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
];

const adminRoutes = ["/admin"];

const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-DNS-Prefetch-Control": "on",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.stripe.com",
    "connect-src 'self' *.supabase.co *.openrouter.ai *.stripe.com",
    "img-src 'self' data: blob: https:",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "frame-src *.stripe.com",
  ].join("; "),
};

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }
  return response;
}

/**
 * Parse Accept-Language header and detect if French is the preferred language.
 * Returns "fr" if French is preferred, null otherwise.
 */
function detectLocaleFromAcceptLanguage(acceptLanguage: string | null): string | null {
  if (!acceptLanguage) return null;

  // Parse "fr-FR,fr;q=0.9,en;q=0.8" -> extract language tags in order of preference
  const entries = acceptLanguage.split(",").map((entry) => {
    const [tag] = entry.trim().split(";");
    const lang = tag.split("-")[0].toLowerCase();
    const q = parseFloat(entry.split("q=")[1]) || 1.0;
    return { lang, q };
  });

  // Return "fr" if it appears before "en" (or if en is absent)
  for (const entry of entries.sort((a, b) => b.q - a.q)) {
    if (entry.lang === "fr") return "fr";
    if (entry.lang === "en") return null; // en is default, no cookie needed
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user, supabase } = await updateSession(request);
  const path = request.nextUrl.pathname;

  // Detect locale from Accept-Language header on first visit (no cookie yet)
  // This prevents the flash-of-wrong-language for French visitors
  if (!request.cookies.has("herbally-locale")) {
    const detected = detectLocaleFromAcceptLanguage(
      request.headers.get("Accept-Language")
    );
    if (detected) {
      supabaseResponse.cookies.set("herbally-locale", detected, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }
  }

  // Allow public routes and herb detail pages
  const isPublic =
    publicRoutes.some((route) => path === route) ||
    path.startsWith("/auth/") ||
    path.startsWith("/herbs/") ||
    path.startsWith("/symptoms/") ||
    path.startsWith("/compare/") ||
    path.startsWith("/api/");

  // For unknown public paths that aren't matched, let Next.js handle 404
  // instead of redirecting to login
  if (!isPublic && !user) {
    // Check if this is a likely static/public path that should 404, not redirect
    const likelyPublicPath =
      path.endsWith(".webmanifest") ||
      path.endsWith(".xml") ||
      path.endsWith(".txt") ||
      path.endsWith(".json");
    
    if (likelyPublicPath) {
      return applySecurityHeaders(supabaseResponse);
    }
  }

  if (isPublic) {
    return applySecurityHeaders(supabaseResponse);
  }

  // All non-public routes require authentication (admin only)
  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin routes
  if (adminRoutes.some((route) => path.startsWith(route))) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return applySecurityHeaders(supabaseResponse);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
