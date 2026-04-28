/**
 * Sentry error reporting helpers (#228).
 *
 * Wraps @sentry/nextjs so callers don't import from Sentry directly and
 * the module can be swapped or stubbed easily in tests.
 *
 * All helpers are no-ops when NEXT_PUBLIC_SENTRY_DSN is not set.
 */

let sentry: typeof import("@sentry/nextjs") | null = null;

async function getSentry() {
  if (sentry) return sentry;
  try {
    sentry = await import("@sentry/nextjs");
  } catch {
    // @sentry/nextjs is an optional peer dep — no-op if absent.
    sentry = null;
  }
  return sentry;
}

const isEnabled = () =>
  typeof process !== "undefined" &&
  Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN);

/**
 * Report an unexpected error to Sentry.
 * Extra context is merged into the Sentry scope for this event only.
 */
export async function captureException(
  error: unknown,
  extra?: Record<string, unknown>,
): Promise<void> {
  if (!isEnabled()) {
    console.error("[sentry:captureException]", error, extra);
    return;
  }
  const s = await getSentry();
  if (!s) return;
  s.withScope((scope) => {
    if (extra) scope.setExtras(extra);
    s.captureException(error);
  });
}

/**
 * Report a non-fatal message to Sentry (e.g. a degraded-mode warning).
 */
export async function captureMessage(
  message: string,
  level: "info" | "warning" | "error" = "info",
): Promise<void> {
  if (!isEnabled()) {
    console.warn("[sentry:captureMessage]", level, message);
    return;
  }
  const s = await getSentry();
  s?.captureMessage(message, level);
}

/**
 * Tag subsequent events with user identity.
 * Call after a successful wallet connection.
 * Only the first 8 characters of the public key are used — not PII.
 */
export async function setSentryUser(publicKey: string): Promise<void> {
  if (!isEnabled()) return;
  const s = await getSentry();
  s?.setUser({ id: publicKey.slice(0, 8) });
}

/** Clear the Sentry user tag (call on disconnect). */
export async function clearSentryUser(): Promise<void> {
  if (!isEnabled()) return;
  const s = await getSentry();
  s?.setUser(null);
}
