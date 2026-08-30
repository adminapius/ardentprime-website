import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Generates a fresh per-request nonce and builds a strict CSP that no longer
// relies on 'unsafe-inline' / 'unsafe-eval'. The nonce is forwarded to the
// app via the `x-nonce` request header so Server Components can read it
// (see app/layout.tsx) and attach it to the inline <script> tags that need
// to keep running (Google Analytics bootstrap, JSON-LD structured data).
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https: blob:;
    font-src 'self' data:;
    connect-src 'self' https://*.supabase.co https://va.vercel-scripts.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://www.google.com;
    frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
    frame-ancestors 'self';
    base-uri 'self';
    form-action 'self';
    object-src 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  response.headers.set("Content-Security-Policy", cspHeader)
  return response
}

export const config = {
  matcher: [
    // Run on everything except static assets and image optimization files,
    // which don't render HTML and don't need a per-request nonce.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
