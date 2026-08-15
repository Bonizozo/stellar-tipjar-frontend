import { describe, it, expect } from "vitest";
import { buildCspHeader } from "@/lib/csp";
import { getSecurityHeaders } from "../security";

describe("Security Headers & CSP Verification", () => {
  describe("buildCspHeader", () => {
    it("enforces strict production CSP directives without unsafe-eval", () => {
      const csp = buildCspHeader({ isDev: false });

      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("script-src 'self' 'wasm-unsafe-eval'");
      expect(csp).not.toContain("'unsafe-eval'");
      expect(csp).toContain("object-src 'none'");
      expect(csp).toContain("base-uri 'self'");
      expect(csp).toContain("frame-ancestors 'none'");
      expect(csp).toContain("upgrade-insecure-requests");
      expect(csp).toContain("block-all-mixed-content");
    });

    it("supports nonce injection for inline scripts", () => {
      const csp = buildCspHeader({ nonce: "rAnd0mN0nc3", isDev: false });
      expect(csp).toContain("'nonce-rAnd0mN0nc3'");
    });

    it("allows dev-specific evaluation only when isDev is true", () => {
      const devCsp = buildCspHeader({ isDev: true });
      expect(devCsp).toContain("'unsafe-eval'");
      expect(devCsp).not.toContain("upgrade-insecure-requests");
    });
  });

  describe("getSecurityHeaders", () => {
    it("returns complete hardened HTTP security header suite", () => {
      const headers = getSecurityHeaders({ isDev: false });
      const map = Object.fromEntries(headers.map((h) => [h.key, h.value]));

      expect(map["Content-Security-Policy"]).toBeDefined();
      expect(map["Strict-Transport-Security"]).toBe("max-age=63072000; includeSubDomains; preload");
      expect(map["X-Frame-Options"]).toBe("DENY");
      expect(map["X-Content-Type-Options"]).toBe("nosniff");
      expect(map["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
      expect(map["Permissions-Policy"]).toContain("camera=(), microphone=()");
    });
  });
});
