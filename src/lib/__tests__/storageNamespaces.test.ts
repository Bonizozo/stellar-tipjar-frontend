import { describe, it, expect, beforeEach } from "vitest";
import {
  createNamespacedStorage,
  createZustandStorage,
  migrateLegacyKeys,
  getAllNamespacedKeys,
  clearAllNamespaced,
} from "../storage";

class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

describe("Namespaced Storage & Legacy Migration", () => {
  let local: MemoryStorage;
  let session: MemoryStorage;

  beforeEach(() => {
    local = new MemoryStorage();
    session = new MemoryStorage();
    Object.defineProperty(window, "localStorage", { value: local, writable: true, configurable: true });
    Object.defineProperty(window, "sessionStorage", { value: session, writable: true, configurable: true });
  });

  it("prefixes keys with stj:domain: to isolate data across modules", () => {
    const userStore = createNamespacedStorage("user");
    const tipStore = createNamespacedStorage("tips");

    userStore.setString("theme", "dark");
    tipStore.setString("theme", "retro");

    expect(localStorage.getItem("stj:user:theme")).toContain("dark");
    expect(localStorage.getItem("stj:tips:theme")).toContain("retro");
    expect(userStore.getString("theme")).toBe("dark");
    expect(tipStore.getString("theme")).toBe("retro");
  });

  it("migrates legacy unnamespaced keys on read when legacyKey is provided", () => {
    localStorage.setItem("user-fiat-preference", "eur");

    const currencyStore = createNamespacedStorage("currency");
    const val = currencyStore.getString("currency", { legacyKey: "user-fiat-preference" });

    expect(val).toBe("eur");
    expect(localStorage.getItem("stj:currency:currency")).toContain("eur");
    // Old unnamespaced key is cleaned up to prevent duplicate drift
    expect(localStorage.getItem("user-fiat-preference")).toBeNull();
  });

  it("migrates multiple legacy keys in batch via migrateLegacyKeys", () => {
    localStorage.setItem("old_draft_key", "draft content");
    localStorage.setItem("old_wallet_network", "testnet");

    const migratedCount = migrateLegacyKeys([
      { legacyKey: "old_draft_key", domain: "drafts", newKey: "current" },
      { legacyKey: "old_wallet_network", domain: "wallet", newKey: "network" },
      { legacyKey: "nonexistent_key", domain: "misc", newKey: "val" },
    ]);

    expect(migratedCount).toBe(2);
    expect(localStorage.getItem("old_draft_key")).toBeNull();
    expect(localStorage.getItem("stj:drafts:current")).toBe("draft content");
    expect(localStorage.getItem("stj:wallet:network")).toBe("testnet");
  });

  it("enumerates only matching namespaced keys using getAllNamespacedKeys", () => {
    const s1 = createNamespacedStorage("mod1");
    const s2 = createNamespacedStorage("mod2");

    s1.setString("k1", "v1");
    s1.setString("k2", "v2");
    s2.setString("k3", "v3");

    const allMod1Keys = getAllNamespacedKeys("mod1");
    expect(allMod1Keys).toEqual(["stj:mod1:k1", "stj:mod1:k2"]);

    const allKeys = getAllNamespacedKeys();
    expect(allKeys).toHaveLength(3);
  });

  it("clears all stj:* keys without wiping third-party keys", () => {
    localStorage.setItem("third_party_key", "keep_me");
    const s = createNamespacedStorage("auth");
    s.setString("token", "xyz");

    clearAllNamespaced("local");

    expect(localStorage.getItem("stj:auth:token")).toBeNull();
    expect(localStorage.getItem("third_party_key")).toBe("keep_me");
  });
});
