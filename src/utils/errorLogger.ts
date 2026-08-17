/**
 * Centralized error logging utility.
 * In dev: logs to console with full details.
 * In prod: structured log + hook for external services (e.g. Sentry).
 */

import { appConfig } from "@/config/env";

export interface ErrorInfo {
  componentStack?: string;
  digest?: string;
}

/**
 * Initialize error logger with validated configuration.
 * Logs a warning if Sentry DSN is not configured (optional behavior).
 */
function initializeErrorLogger(): void {
  if (!appConfig.sentryDsn) {
    console.warn(
      "[errorLogger] NEXT_PUBLIC_SENTRY_DSN not configured — error reporting disabled"
    );
  }
}

// Initialize on module load
initializeErrorLogger();

export function logError(error: Error, info?: ErrorInfo): void {
  if (appConfig.nodeEnv === "development") {
    console.group("[ErrorBoundary]");
    console.error("Error:", error);
    if (info?.componentStack) {
      console.error("Component stack:", info.componentStack);
    }
    if (info?.digest) {
      console.error("Digest:", info.digest);
    }
    console.groupEnd();
    return;
  }

  // Production: structured log
  console.error(
    JSON.stringify({
      message: error.message,
      name: error.name,
      digest: info?.digest,
      timestamp: new Date().toISOString(),
    })
  );

  // TODO: forward to error reporting service using validated DSN
  // if (appConfig.sentryDsn) {
  //   Sentry.captureException(error, { extra: info });
  // }
}
