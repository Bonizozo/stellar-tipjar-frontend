/**
 * Google Analytics 4 utilities (#228).
 *
 * All calls are guarded so they silently no-op when:
 * - Running on the server (SSR)
 * - GA_TRACKING_ID is not configured
 * - The user has declined cookie consent
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Track a page view. Call on route changes. */
export function pageview(url: string): void {
  if (typeof window === "undefined" || !window.gtag || !GA_TRACKING_ID) return;
  window.gtag("config", GA_TRACKING_ID, { page_path: url });
}

/** Track a custom GA4 event. */
export function gtagEvent({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}): void {
  if (typeof window === "undefined" || !window.gtag || !GA_TRACKING_ID) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

/** Grant or deny analytics storage consent (GDPR). */
export function updateConsent(granted: boolean): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}
