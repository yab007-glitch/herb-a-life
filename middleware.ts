import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const publicRoutes = [
  "/",
  "/about",
  "/disclaimer",
  "/privacy",
  "/terms",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/auth/callback",
  "/herbs",
  "/symptoms",
  "/faq",
  "/compare",
  "/methodology",
  "/calculator",
  "/pharmacist",
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
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-DNS-Prefetch-Control": "on",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.stripe.com",
    "connect-src 'self' *.supabase.co *.openrouter.ai *.stripe.com https://ollama.com",
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

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user, supabase } = await updateSession(request);
  const path = request.nextUrl.pathname;

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
    if (user && (path === "/login" || path === "/register")) {
      return NextResponse.redirect(new URL("/herbs", request.url));
    }
    return applySecurityHeaders(supabaseResponse);
  }

  // All routes below require authentication
  if (!user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(redirectUrl);
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
