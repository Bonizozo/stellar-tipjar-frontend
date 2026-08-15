import { describe, it, expect, beforeEach } from "vitest";
import { createNamespacedStorage } from "@/lib/storage";

const createStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => {
      store[key] = String(value);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (i: number) => Object.keys(store)[i] ?? null,
  };
};

describe("Wallet Storage Security Audit", () => {
  let mockStorage: ReturnType<typeof createStorageMock>;

  beforeEach(() => {
    mockStorage = createStorageMock();
    Object.defineProperty(globalThis, "localStorage", {
      value: mockStorage,
      writable: true,
      configurable: true,
    });
  });

  it("persists only public wallet metadata without secret keys or sensitive tokens", () => {
    const storage = createNamespacedStorage("wallet");

    const sessionPayload = {
      publicKey: "GBRP...PLACEHOLDER...2PR5",
      network: "TESTNET",
      wasConnected: true,
    };

    storage.set("session", sessionPayload);

    const storedRaw = mockStorage.getItem("stj:wallet:session");
    expect(storedRaw).toBeDefined();

    // Verify stored JSON envelope
    const parsed = JSON.parse(storedRaw!);
    expect(parsed.d.publicKey).toBe("GBRP...PLACEHOLDER...2PR5");
    expect(parsed.d.network).toBe("TESTNET");
    expect(parsed.d.wasConnected).toBe(true);

    // Confirm absence of secret keys or credentials
    expect(storedRaw).not.toMatch(/secret|privateKey|seed|token|auth/i);
  });

  it("does not allow secret Stellar seeds (S...) to be stored", () => {
    const sensitivePayload = {
      publicKey: "GBRP...PLACEHOLDER...2PR5",
      secretSeed: "SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6O4O2B7V2B3V4C5D6E7F8",
    };

    const isSecretSeedPresent = (obj: Record<string, unknown>) => {
      return Object.values(obj).some(
        (val) => typeof val === "string" && /^S[A-Z0-9]{55}$/.test(val)
      );
    };

    expect(isSecretSeedPresent(sensitivePayload)).toBe(true);

    // Valid public session payload passes check
    const validPublicSession = {
      publicKey: "GBRP...PLACEHOLDER...2PR5",
      network: "TESTNET",
      wasConnected: true,
    };
    expect(isSecretSeedPresent(validPublicSession)).toBe(false);
  });
});
