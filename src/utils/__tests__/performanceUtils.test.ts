import { describe, it, expect } from "vitest";
import {
  getMetricRating,
  formatMetricValue,
  measureAsync,
} from "../performanceUtils";

describe("performanceUtils utility (#587)", () => {
  it("computes correct metric ratings against budgets", () => {
    expect(getMetricRating("LCP", 2000)).toBe("good");
    expect(getMetricRating("LCP", 3500)).toBe("needs-improvement");
    expect(getMetricRating("LCP", 5000)).toBe("poor");
  });

  it("formats metric values correctly for time and layout shift", () => {
    expect(formatMetricValue("CLS", 0.0512)).toBe("0.051");
    expect(formatMetricValue("FCP", 1450.6)).toBe("1451ms");
  });

  it("measures async execution without throwing", async () => {
    const result = await measureAsync("test-task", async () => {
      return 42;
    });
    expect(result).toBe(42);
  });
});
