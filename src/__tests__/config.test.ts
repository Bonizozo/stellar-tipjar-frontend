import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

/**
 * Startup-failure integration tests for AppConfig.
 *
 * These tests verify that:
 * 1. The config module throws an aggregated error when env vars are invalid,
 *    not a panic/crash with no context.
 * 2. Valid configuration loads cleanly.
 * 3. The error message lists ALL invalid variables, not just the first.
 */
describe("AppConfig — startup validation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset module registry before each test so we can re-import the module
    // with a different process.env state.
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.resetModules();
  });

  it("loads cleanly with valid (default) configuration", async () => {
    // With all defaults the module should load without throwing.
    const { appConfig } = await import("@/config/env");
    expect(appConfig).toBeDefined();
    expect(appConfig.stellarNetwork).toMatch(/^(TESTNET|PUBLIC)$/);
    expect(appConfig.apiUrl).toMatch(/^https?:\/\//);
  });

  it("throws an aggregated error when NEXT_PUBLIC_API_URL is an invalid URL", async () => {
    process.env.NEXT_PUBLIC_API_URL = "not-a-url";

    await expect(import("@/config/env")).rejects.toThrow(
      /NEXT_PUBLIC_API_URL must be a valid URL/
    );
  });

  it("error message lists all invalid variables, not just the first", async () => {
    process.env.NEXT_PUBLIC_API_URL = "bad-url";
    process.env.NEXT_PUBLIC_WS_URL = "also-bad";

    let caughtError: Error | null = null;
    try {
      await import("@/config/env");
    } catch (err) {
      caughtError = err as Error;
    }

    expect(caughtError).not.toBeNull();
    // The message must mention BOTH invalid fields — aggregated, not just first.
    expect(caughtError!.message).toMatch(/apiUrl/);
    expect(caughtError!.message).toMatch(/wsUrl/);
    expect(caughtError!.message).toMatch(
      /\[AppConfig\] Application configuration is invalid/
    );
  });

  it("produces a human-readable error (no panic backtrace, no partial boot)", async () => {
    process.env.NEXT_PUBLIC_API_URL = "___INVALID___";

    let caughtError: Error | null = null;
    try {
      await import("@/config/env");
    } catch (err) {
      caughtError = err as Error;
    }

    expect(caughtError).not.toBeNull();
    // Human-readable bullet points
    expect(caughtError!.message).toMatch(/•/);
    // No raw panic / TypeError stack frame in the message itself
    expect(caughtError!.message).not.toMatch(/TypeError/);
    expect(caughtError!.message).not.toMatch(/at Object/);
  });

  it("derives correct Horizon URL for PUBLIC network", async () => {
    process.env.NEXT_PUBLIC_STELLAR_NETWORK = "public";
    delete process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL;

    const { STELLAR_HORIZON_URL } = await import("@/config/env");
    expect(STELLAR_HORIZON_URL).toBe("https://horizon.stellar.org");
  });

  it("derives correct Horizon URL for TESTNET network", async () => {
    process.env.NEXT_PUBLIC_STELLAR_NETWORK = "testnet";
    delete process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL;

    const { STELLAR_HORIZON_URL } = await import("@/config/env");
    expect(STELLAR_HORIZON_URL).toBe("https://horizon-testnet.stellar.org");
  });
});
