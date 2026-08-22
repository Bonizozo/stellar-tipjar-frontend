/**
 * Typed, namespaced, SSR-safe client storage layer.
 *
 * Public API:
 *   createNamespacedStorage(domain, type?)  – namespaced get/set/remove
 *   createZustandStorage(domain, legacyKey?) – zustand StateStorage adapter
 *   clearAllNamespaced(type?)               – removes all stj:* keys (logout/consent)
 */

import { z } from "zod";
import type { StateStorage } from "zustand/middleware";

// ─── Constants ───────────────────────────────────────────────────────────────

const PREFIX = "stj:";

// ─── SSR / Browser Detection ─────────────────────────────────────────────────

function isServer(): boolean {
  return typeof window === "undefined";
}

function getBackend(type: "local" | "session"): Storage | null {
  if (isServer()) return null;
  try {
    return type === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

// ─── Namespace Key ───────────────────────────────────────────────────────────

function nsKey(domain: string, key: string): string {
  return `${PREFIX}${domain}:${key}`;
}

// ─── Versioned Envelope ──────────────────────────────────────────────────────

function wrap<T>(data: T, version: number): string {
  return JSON.stringify({ __v: version, d: data });
}

function unwrap(raw: string): { data: unknown; version: number } | null {
  try {
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof parsed.__v === "number" &&
      "d" in parsed
    ) {
      return { data: (parsed as { __v: number; d: unknown }).d, version: parsed.__v };
    }
    // Legacy unversioned value (already parsed successfully)
    return { data: parsed, version: 1 };
  } catch {
    // Non-JSON string (e.g. raw "en", "true", "0.5") – treat as v1 data
    return { data: raw, version: 1 };
  }
}

// ─── Migration Runner ────────────────────────────────────────────────────────

function runMigrations(
  data: unknown,
  fromVersion: number,
  toVersion: number,
  migrations?: Record<number, (old: any) => any>,
): unknown {
  if (!migrations || fromVersion >= toVersion) return data;
  let current = data;
  for (let v = fromVersion + 1; v <= toVersion; v++) {
    const migrate = migrations[v];
    if (migrate) current = migrate(current);
  }
  return current;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GetOptions<T> {
  schema?: z.ZodType<T>;
  version?: number;
  migrations?: Record<number, (old: any) => any>;
  legacyKey?: string;
}

export interface NamespacedStorage {
  get<T>(key: string, opts?: GetOptions<T>): T | null;
  set<T>(key: string, value: T, version?: number): void;
  remove(key: string): void;
  getString(key: string, opts?: { legacyKey?: string }): string | null;
  setString(key: string, value: string): void;
}

// ─── createNamespacedStorage ─────────────────────────────────────────────────

export function createNamespacedStorage(
  domain: string,
  type: "local" | "session" = "local",
): NamespacedStorage {
  const b = () => getBackend(type);

  function readWithMigration(key: string, legacyKey?: string): string | null {
    const backend = b();
    if (!backend) return null;
    try {
      const nk = nsKey(domain, key);
      let raw = backend.getItem(nk);
      if (raw === null && legacyKey) {
        const legacy = backend.getItem(legacyKey);
        if (legacy !== null) {
          backend.setItem(nk, legacy);
          backend.removeItem(legacyKey);
          raw = legacy;
        }
      }
      return raw;
    } catch {
      return null;
    }
  }

  return {
    get<T>(key: string, opts?: GetOptions<T>): T | null {
      const raw = readWithMigration(key, opts?.legacyKey);
      if (raw === null) return null;

      const env = unwrap(raw);
      if (!env) {
        // Corrupt – discard
        const backend = b();
        if (backend) {
          try {
            backend.removeItem(nsKey(domain, key));
          } catch {
            /* ignore */
          }
        }
        if (typeof console !== "undefined") {
          console.warn(`[stj:storage] Discarding corrupt value: ${domain}:${key}`);
        }
        return null;
      }

      let data = runMigrations(
        env.data,
        env.version,
        opts?.version ?? env.version,
        opts?.migrations,
      );

      if (opts?.schema) {
        const result = opts.schema.safeParse(data);
        if (!result.success) {
          if (typeof console !== "undefined") {
            console.warn(
              `[stj:storage] Schema validation failed: ${domain}:${key}`,
              result.error.message,
            );
          }
          return null;
        }
        return result.data;
      }

      return data as T;
    },

    set<T>(key: string, value: T, version?: number): void {
      const backend = b();
      if (!backend) return;
      try {
        backend.setItem(nsKey(domain, key), wrap(value, version ?? 1));
      } catch {
        if (typeof console !== "undefined") {
          console.warn(`[stj:storage] Write failed: ${domain}:${key}`);
        }
      }
    },

    remove(key: string): void {
      const backend = b();
      if (!backend) return;
      try {
        backend.removeItem(nsKey(domain, key));
      } catch {
        /* ignore */
      }
    },

    getString(key: string, opts?: { legacyKey?: string }): string | null {
      const raw = readWithMigration(key, opts?.legacyKey);
      if (raw === null) return null;

      const env = unwrap(raw);
      if (!env) return null;

      return typeof env.data === "string" ? env.data : String(env.data);
    },

    setString(key: string, value: string): void {
      const backend = b();
      if (!backend) return;
      try {
        backend.setItem(nsKey(domain, key), wrap(value, 1));
      } catch {
        /* quota exceeded – silently ignore */
      }
    },
  };
}

// ─── createZustandStorage ────────────────────────────────────────────────────

export function createZustandStorage(
  domain: string,
  legacyKey?: string,
): StateStorage {
  return {
    getItem(name: string): string | null {
      const backend = getBackend("local");
      if (!backend) return null;
      try {
        const nk = nsKey(domain, name);
        let v = backend.getItem(nk);
        if (v === null && legacyKey) {
          const old = backend.getItem(legacyKey);
          if (old !== null) {
            backend.setItem(nk, old);
            backend.removeItem(legacyKey);
            v = old;
          }
        }
        return v;
      } catch {
        return null;
      }
    },

    setItem(name: string, value: string): void {
      const backend = getBackend("local");
      if (!backend) return;
      try {
        backend.setItem(nsKey(domain, name), value);
      } catch {
        /* quota exceeded */
      }
    },

    removeItem(name: string): void {
      const backend = getBackend("local");
      if (!backend) return;
      try {
        backend.removeItem(nsKey(domain, name));
      } catch {
        /* ignore */
      }
    },
  };
}

// ─── clearAllNamespaced ──────────────────────────────────────────────────────

export function clearAllNamespaced(
  type: "local" | "session" | "both" = "both",
): void {
  if (isServer()) return;

  const clearOne = (backend: Storage) => {
    const keys: string[] = [];
    for (let i = 0; i < backend.length; i++) {
      const k = backend.key(i);
      if (k?.startsWith(PREFIX)) keys.push(k);
    }
    keys.forEach((k) => backend.removeItem(k));
  };

  try {
    if (type === "local" || type === "both") {
      const s = getBackend("local");
      if (s) clearOne(s);
    }
    if (type === "session" || type === "both") {
      const s = getBackend("session");
      if (s) clearOne(s);
    }
  } catch {
    /* ignore */
  }
}
