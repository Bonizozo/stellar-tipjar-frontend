#!/usr/bin/env node

/**
 * Standalone environment validation script.
 *
 * Runs fail-fast validation against process.env before build, start, or container deployment.
 * Fails loudly with exit code 1 if any environment variable is missing or invalid.
 *
 * Usage: node scripts/validate-env.js
 */

const { z } = require("zod");

const stellarNetworkEnum = z.enum(["testnet", "public", "TESTNET", "PUBLIC"]);

const AppConfigSchema = z.object({
  apiUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_API_URL must be a valid URL" })
    .default("http://localhost:8000"),

  wsUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_WS_URL must be a valid URL" })
    .default("ws://localhost:8000/ws"),

  stellarNetwork: stellarNetworkEnum
    .default("testnet")
    .transform((v) => v.toUpperCase()),

  stellarHorizonUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_STELLAR_HORIZON_URL must be a valid URL" })
    .optional(),

  siteUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_SITE_URL must be a valid URL" })
    .default("https://stellar-tipjar.app"),

  appUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_APP_URL must be a valid URL" })
    .optional(),

  gaId: z.string().optional(),
  sentryDsn: z.string().url().optional(),
  vapidPublicKey: z.string().optional(),

  nodeEnv: z
    .enum(["development", "production", "test"])
    .default("production"),
});

function main() {
  const raw = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    wsUrl: process.env.NEXT_PUBLIC_WS_URL,
    stellarNetwork: process.env.NEXT_PUBLIC_STELLAR_NETWORK,
    stellarHorizonUrl: process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    gaId: process.env.NEXT_PUBLIC_GA_ID,
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    vapidPublicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    nodeEnv: process.env.NODE_ENV,
  };

  const result = AppConfigSchema.safeParse(raw);

  if (!result.success) {
    const lines = result.error.issues.map(
      (issue) => `  • ${issue.path.join(".") || "config"}: ${issue.message}`
    );
    console.error(
      "\n[AppConfig] Environment configuration validation FAILED:\n" +
        lines.join("\n") +
        "\n\nFix the above configuration errors before starting the application.\n"
    );
    process.exit(1);
  }

  console.log("\n[AppConfig] Environment configuration validation PASSED.");
  console.log(`  • Stellar Network: ${result.data.stellarNetwork}`);
  console.log(`  • API URL:         ${result.data.apiUrl}`);
  console.log(`  • WS URL:          ${result.data.wsUrl}`);
  console.log(`  • Site URL:        ${result.data.siteUrl}`);
  console.log(`  • Node Env:        ${result.data.nodeEnv}\n`);
}

main();
