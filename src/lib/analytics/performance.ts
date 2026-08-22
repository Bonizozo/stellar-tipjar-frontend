/**
 * Performance monitoring utilities for tracking API response times,
 * page load times, and other performance metrics.
 */

export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

class PerformanceTracker {
  private metrics: PerformanceMetric[] = [];
  private marks: Map<string, number> = new Map();

  /**
   * Start measuring a performance metric
   */
  mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  /**
   * End measuring and record the metric
   */
  measure(name: string, metadata?: Record<string, unknown>): PerformanceMetric | null {
    const startTime = this.marks.get(name);
    if (!startTime) {
      console.warn(`[Performance] No mark found for: ${name}`);
      return null;
    }

    const duration = performance.now() - startTime;
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      metadata,
    };

    this.metrics.push(metric);
    this.marks.delete(name);

    // Send to analytics if duration exceeds threshold
    if (duration > 1000) {
      this.sendToAnalytics(metric);
    }

    return metric;
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics = [];
    this.marks.clear();
  }

  /**
   * Send metric to analytics endpoint
   */
  private sendToAnalytics(metric: PerformanceMetric): void {
    const body = JSON.stringify(metric);
    const url = "/api/analytics/performance";

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, {
        body,
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
      }).catch(() => {
        // Silently fail
      });
    }
  }
}

export const performanceTracker = new PerformanceTracker();

/**
 * Decorator for measuring function execution time
 */
export function measurePerformance(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const metricName = `${target.constructor.name}.${propertyKey}`;
    performanceTracker.mark(metricName);

    try {
      const result = await originalMethod.apply(this, args);
      performanceTracker.measure(metricName);
      return result;
    } catch (error) {
      performanceTracker.measure(metricName, { error: true });
      throw error;
    }
  };

  return descriptor;
}
