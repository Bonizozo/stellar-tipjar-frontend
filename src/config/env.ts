/**
 * Typed, validated application configuration.
 *
 * All environment variables are read and validated ONCE at module load.
 * Any missing or invalid variable produces an aggregated error that is
 * thrown immediately, so misconfiguration fails at startup rather than
 * at the first runtime call that needs the variable.
 *
 * Outside this module, direct `process.env` access for application config
 * is prohibited — import named exports from here instead.
 */
import { z } from "zod";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const stellarNetworkEnum = z.enum(["testnet", "public", "TESTNET", "PUBLIC"]);

const AppConfigSchema = z.object({
  // API
  apiUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_API_URL must be a valid URL" })
    .default("http://localhost:8000"),

  // WebSocket
  wsUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_WS_URL must be a valid URL" })
    .default("ws://localhost:8000/ws"),

  // Stellar network
  stellarNetwork: stellarNetworkEnum
    .default("testnet")
    .transform((v) => v.toUpperCase() as "TESTNET" | "PUBLIC"),

  stellarHorizonUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_STELLAR_HORIZON_URL must be a valid URL" })
    .optional(),

  // Site
  siteUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_SITE_URL must be a valid URL" })
    .default("https://stellar-tipjar.app"),

  appUrl: z
    .string()
    .url({ message: "NEXT_PUBLIC_APP_URL must be a valid URL" })
    .optional(),

  // Analytics (optional — no validation failure if absent)
  gaId: z.string().optional(),
  sentryDsn: z.string().url().optional(),

  // Push notifications (optional)
  vapidPublicKey: z.string().optional(),

  // Runtime
  nodeEnv: z
    .enum(["development", "production", "test"])
    .default("production"),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

// ---------------------------------------------------------------------------
// Loader — runs once at module load
// ---------------------------------------------------------------------------

function loadConfig(): AppConfig {
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
    // Aggregate ALL validation errors into a single human-readable message.
    const lines = result.error.issues.map(
      (issue) => `  • ${issue.path.join(".") || "config"}: ${issue.message}`
    );
    const message = [
      "[AppConfig] Application configuration is invalid. Fix the following before starting:",
      ...lines,
    ].join("\n");

    // In production we throw to abort boot; in test/CI we allow the error
    // to propagate so the startup-failure test can assert it.
    throw new Error(message);
  }

  return result.data;
}

/**
 * Validated, typed application configuration.
 * Throws at module load if any required variable is missing or invalid.
 */
export const appConfig: AppConfig = loadConfig();

// ---------------------------------------------------------------------------
// Convenience re-exports (mirrors the old scattered constants)
// ---------------------------------------------------------------------------

/** Backend REST API base URL */
export const API_BASE_URL = appConfig.apiUrl;

/** WebSocket server URL */
export const WS_BASE_URL = appConfig.wsUrl;

/** Stellar network: "TESTNET" | "PUBLIC" */
export const STELLAR_NETWORK = appConfig.stellarNetwork;

/** Horizon server URL derived from network if not explicitly set */
export const STELLAR_HORIZON_URL =
  appConfig.stellarHorizonUrl ??
  (appConfig.stellarNetwork === "PUBLIC"
    ? "https://horizon.stellar.org"
    : "https://horizon-testnet.stellar.org");

/** Public site URL */
export const SITE_BASE_URL = appConfig.siteUrl;

/** Public app URL (may differ from site URL when using sub-domains) */
export const APP_BASE_URL = appConfig.appUrl ?? appConfig.siteUrl;

/** True when running in development mode */
export const IS_DEV = appConfig.nodeEnv === "development";

/** True when running in test mode */
export const IS_TEST = appConfig.nodeEnv === "test";
