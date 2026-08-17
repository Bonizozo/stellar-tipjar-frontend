import { IS_DEV } from "@/config/env";
import { PERFORMANCE_BUDGETS, type MetricName } from "@/lib/webVitals";

export type MetricRating = "good" | "needs-improvement" | "poor";

/**
 * Returns the rating for a given metric value against its budget.
 */
export function getMetricRating(name: MetricName, value: number): MetricRating {
  const budget = PERFORMANCE_BUDGETS[name];
  if (value <= budget.good) return "good";
  if (value <= budget.poor) return "needs-improvement";
  return "poor";
}

/**
 * Formats a metric value for display.
 * CLS is unitless; all others are in ms.
 */
export function formatMetricValue(name: MetricName, value: number): string {
  if (name === "CLS") return value.toFixed(3);
  return `${Math.round(value)}ms`;
}

/**
 * Measures the duration of an async operation using the Performance API.
 */
export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  try {
    return await fn();
  } finally {
    const duration = performance.now() - start;
    if (IS_DEV) {
      console.debug(`[Perf] ${name}: ${duration.toFixed(2)}ms`);
    }
    // Mark for DevTools Performance panel
    performance.measure(name, { start, duration });
  }
}

/**
 * Returns a snapshot of navigation timing metrics from the browser.
 */
export function getNavigationTiming(): Record<string, number> | null {
  if (typeof window === "undefined") return null;

  const [entry] = performance.getEntriesByType(
    "navigation"
  ) as PerformanceNavigationTiming[];
  if (!entry) return null;

  return {
    dns: entry.domainLookupEnd - entry.domainLookupStart,
    tcp: entry.connectEnd - entry.connectStart,
    ttfb: entry.responseStart - entry.requestStart,
    download: entry.responseEnd - entry.responseStart,
    domInteractive: entry.domInteractive,
    domComplete: entry.domComplete,
    loadEvent: entry.loadEventEnd - entry.loadEventStart,
  };
}
