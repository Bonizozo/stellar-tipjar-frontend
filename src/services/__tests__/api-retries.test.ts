import { describe, it, expect } from "vitest";
import { DEFAULT_RETRIES, getApiRateLimitStatus } from "../api";

describe("API Service Retries (#594)", () => {
  it("exports a defined DEFAULT_RETRIES constant equal to 3", () => {
    expect(DEFAULT_RETRIES).toBe(3);
    expect(typeof DEFAULT_RETRIES).toBe("number");
  });

  it("provides active rate limit and queue status", () => {
    const status = getApiRateLimitStatus();
    expect(status).toHaveProperty("isLimited");
    expect(status).toHaveProperty("retryAfterMs");
    expect(status).toHaveProperty("remainingRequests");
    expect(status).toHaveProperty("queuedRequests");
    expect(status).toHaveProperty("limit");
    expect(status).toHaveProperty("windowMs");
  });
});
