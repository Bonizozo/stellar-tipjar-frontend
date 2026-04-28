import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { getSecurityHeaders } from "./src/utils/security";

const withNextIntl = createNextIntlPlugin();

// i18n is handled via next-intl with locale routing
// Supported locales: en, es, fr, zh, ar, he — preference persisted in localStorage
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // Empty turbopack config to silence the warning
  turbopack: {},

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**",
      },
      // CDN integration — add your CDN hostname here
      {
        protocol: "https",
        hostname: "cdn.stellartipjar.app",
        port: "",
        pathname: "/**",
      },
      // Allow common avatar/image CDNs used in development
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/:path*",
        headers: getSecurityHeaders(),
      },
      {
        // iOS Universal Links — must be served as application/json
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        // Android App Links — must be served as application/json
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        // Service worker — must be served from root scope
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
