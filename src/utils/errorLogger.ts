/**
 * Centralized error logging utility.
 * In dev: logs to console with full details.
 * In prod: structured log + hook for external services (e.g. Sentry).
 */

export interface ErrorInfo {
  componentStack?: string;
  digest?: string;
}

export function logError(error: Error, info?: ErrorInfo): void {
  if (process.env.NODE_ENV === "development") {
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

  // TODO: forward to error reporting service
  // Sentry.captureException(error, { extra: info });
}
