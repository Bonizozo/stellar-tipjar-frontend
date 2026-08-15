import { describe, it, expect } from "vitest";
import { AppConfigSchema, loadConfig, appConfig } from "@/config/env";

describe("AppConfig and Environment Validation", () => {
  it("loads valid default configuration", () => {
    expect(appConfig).toBeDefined();
    expect(appConfig.apiUrl).toMatch(/^https?:\/\//);
    expect(appConfig.wsUrl).toMatch(/^wss?:\/\//);
    expect(["TESTNET", "PUBLIC"]).toContain(appConfig.stellarNetwork);
  });

  it("successfully parses valid custom environment variables", () => {
    const valid = {
      NEXT_PUBLIC_API_URL: "https://api.example.com",
      NEXT_PUBLIC_WS_URL: "wss://ws.example.com",
      NEXT_PUBLIC_STELLAR_NETWORK: "public",
      NEXT_PUBLIC_SITE_URL: "https://example.com",
      NODE_ENV: "production",
    };

    const parsed = loadConfig(valid);
    expect(parsed.apiUrl).toBe("https://api.example.com");
    expect(parsed.wsUrl).toBe("wss://ws.example.com");
    expect(parsed.stellarNetwork).toBe("PUBLIC");
  });

  it("throws fail-fast descriptive error on invalid URLs", () => {
    const invalid = {
      NEXT_PUBLIC_API_URL: "not-a-valid-url",
      NEXT_PUBLIC_WS_URL: "not-a-valid-ws",
      NEXT_PUBLIC_STELLAR_NETWORK: "invalid_net",
      NODE_ENV: "production",
    };

    expect(() => loadConfig(invalid)).toThrowError(/\[AppConfig\] Application configuration is invalid/);
  });

  it("transforms lowercase stellar network to uppercase", () => {
    const parsed = AppConfigSchema.parse({
      stellarNetwork: "testnet",
    });
    expect(parsed.stellarNetwork).toBe("TESTNET");
  });
});
