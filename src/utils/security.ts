/**
 * Security utility helpers.
 *
 * Centralises the full set of HTTP security headers so they can be reused
 * in both next.config.ts (static headers) and src/middleware.ts (dynamic headers).
 */

import { buildCspHeader } from "../lib/csp";

export interface SecurityHeader {
  key: string;
  value: string;
}

/**
 * Returns the complete list of security headers to apply to every response.
 * Call this at build-time (next.config.ts) or at request-time (middleware).
 */
export function getSecurityHeaders(): SecurityHeader[] {
  return [
    {
      key: "Content-Security-Policy",
      value: buildCspHeader(),
    },
    {
      // 2-year max-age; includeSubDomains + preload for HSTS preload list eligibility
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
    {
      // Opt out of Google's FLoC / Topics API
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "X-XSS-Protection",
      value: "1; mode=block",
    },
    {
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin",
    },
    {
      key: "Cross-Origin-Resource-Policy",
      value: "same-origin",
    },
  ];
}
