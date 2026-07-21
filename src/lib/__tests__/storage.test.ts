import { describe, it, expect, beforeEach } from "vitest";
import { z } from "zod";
import {
  createNamespacedStorage,
  createZustandStorage,
  clearAllNamespaced,
} from "@/lib/storage";

describe("createNamespacedStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores and retrieves a value under a namespaced key", () => {
    const s = createNamespacedStorage("test");
    s.set("foo", "bar");
    expect(s.get<string>("foo")).toBe("bar");
    expect(localStorage.getItem("stj:test:foo")).toBe(
      JSON.stringify({ __v: 1, d: "bar" })
    );
  });

  it("returns null for a missing key", () => {
    const s = createNamespacedStorage("test");
    expect(s.get("missing")).toBeNull();
  });

  it("removes a key", () => {
    const s = createNamespacedStorage("test");
    s.set("k", 42);
    s.remove("k");
    expect(s.get("k")).toBeNull();
  });

  it("supports versioned envelopes", () => {
    const s = createNamespacedStorage("test");
    s.set("v", "old", 1);
    expect(localStorage.getItem("stj:test:v")).toBe(
      JSON.stringify({ __v: 1, d: "old" })
    );
    s.set("v", "new", 2);
    expect(s.get<string>("v")).toBe("new");
  });

  it("runs migration functions when version differs", () => {
    const s = createNamespacedStorage("test");
    s.set("p", { name: "Alice" } as any, 1);

    const raw = s.get<{ name: string; age: number }>("p", {
      version: 2,
      migrations: {
        2: (old: any) => ({ ...old, age: old.age ?? 30 }),
      },
    });
    expect(raw).toEqual({ name: "Alice", age: 30 });
  });

  it("runs a migration chain across multiple versions", () => {
    const s = createNamespacedStorage("test");
    s.set("x", { value: 0 }, 1);

    const result = s.get("x", {
      version: 4,
      migrations: {
        2: (d: any) => ({ ...d, doubled: d.value * 2 }),
        3: (d: any) => ({ ...d, tripled: d.value * 3 }),
        4: (d: any) => ({ ...d, label: `v${d.value}` }),
      },
    });
    expect(result).toEqual({ value: 0, doubled: 0, tripled: 0, label: "v0" });
  });

  describe("schema validation", () => {
    const schema = z.object({ name: z.string(), count: z.number() });

    it("returns parsed data when schema passes", () => {
      const s = createNamespacedStorage("test");
      s.set("item", { name: "hello", count: 5 });
      const result = s.get("item", { schema });
      expect(result).toEqual({ name: "hello", count: 5 });
    });

    it("returns null when schema fails", () => {
      const s = createNamespacedStorage("test");
      localStorage.setItem(
        "stj:test:bad",
        JSON.stringify({ __v: 1, d: { name: 123, count: "nope" } })
      );
      const result = s.get("bad", { schema });
      expect(result).toBeNull();
    });
  });

  describe("legacy key migration", () => {
    it("migrates from legacy key to namespaced key on first read", () => {
      const s = createNamespacedStorage("test");
      localStorage.setItem("old_key", JSON.stringify({ value: 42 }));

      const result = s.get<{ value: number }>("mykey", {
        legacyKey: "old_key",
      });
      expect(result).toEqual({ value: 42 });
      expect(localStorage.getItem("old_key")).toBeNull();
      const raw = localStorage.getItem("stj:test:mykey");
      expect(raw).toBeTruthy();
    });

    it("prefers namespaced key over legacy key", () => {
      const s = createNamespacedStorage("test");
      localStorage.setItem("old_key", JSON.stringify({ value: 1 }));
      localStorage.setItem(
        "stj:test:mykey",
        JSON.stringify({ __v: 1, d: { value: 2 } })
      );

      const result = s.get<{ value: number }>("mykey", {
        legacyKey: "old_key",
      });
      expect(result).toEqual({ value: 2 });
    });

    it("getString also migrates legacy keys", () => {
      const s = createNamespacedStorage("test");
      localStorage.setItem("legacy_lang", "en");

      const result = s.getString("lang", { legacyKey: "legacy_lang" });
      expect(result).toBe("en");
      expect(localStorage.getItem("legacy_lang")).toBeNull();
      expect(localStorage.getItem("stj:test:lang")).toBeTruthy();
    });
  });

  describe("unwrap edge cases", () => {
    it("treats non-JSON strings as v1 data (getString)", () => {
      const s = createNamespacedStorage("test");
      localStorage.setItem("stj:test:raw", "en");
      expect(s.getString("raw")).toBe("en");
    });

    it("treats unversioned JSON objects as v1 data", () => {
      const s = createNamespacedStorage("test");
      localStorage.setItem(
        "stj:test:obj",
        JSON.stringify({ foo: "bar" })
      );
      const result = s.get("obj");
      expect(result).toEqual({ foo: "bar" });
    });
  });

  describe("corrupt data", () => {
    it("non-JSON strings are treated as v1 data", () => {
      const s = createNamespacedStorage("test");
      localStorage.setItem("stj:test:corrupt", "}{invalid{json");
      const result = s.get("corrupt");
      expect(result).toBe("}{invalid{json");
    });

    it("handles corrupt envelope (missing d key) gracefully", () => {
      const s = createNamespacedStorage("test");
      localStorage.setItem(
        "stj:test:badenv",
        JSON.stringify({ __v: 1 })
      );
      const result = s.get("badenv");
      expect(result).toEqual({ __v: 1 });
    });
  });
});

describe("createZustandStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reads and writes under the namespaced key", () => {
    const zs = createZustandStorage("store");
    zs.setItem("token", "abc123");
    expect(zs.getItem("token")).toBe("abc123");
    expect(localStorage.getItem("stj:store:token")).toBe("abc123");
  });

  it("returns null for missing keys", () => {
    const zs = createZustandStorage("store");
    expect(zs.getItem("nope")).toBeNull();
  });

  it("removes items", () => {
    const zs = createZustandStorage("store");
    zs.setItem("x", "1");
    zs.removeItem("x");
    expect(zs.getItem("x")).toBeNull();
  });

  it("migrates from legacy key on first read", () => {
    const zs = createZustandStorage("store", "legacy_token");
    localStorage.setItem("legacy_token", "mytoken");
    expect(zs.getItem("token")).toBe("mytoken");
    expect(localStorage.getItem("legacy_token")).toBeNull();
    expect(localStorage.getItem("stj:store:token")).toBe("mytoken");
  });

  it("passes through raw JSON strings without envelope wrapping", () => {
    const zs = createZustandStorage("store");
    zs.setItem("settings", JSON.stringify({ theme: "dark" }));
    const raw = localStorage.getItem("stj:store:settings");
    expect(raw).toBe(JSON.stringify({ theme: "dark" }));
    const parsed = JSON.parse(zs.getItem("settings")!);
    expect(parsed).toEqual({ theme: "dark" });
  });
});

describe("clearAllNamespaced", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("removes all stj: prefixed keys from localStorage", () => {
    localStorage.setItem("stj:a:1", "x");
    localStorage.setItem("stj:b:2", "y");
    localStorage.setItem("other_key", "z");
    localStorage.setItem("regular", "keep");

    clearAllNamespaced("local");

    expect(localStorage.getItem("stj:a:1")).toBeNull();
    expect(localStorage.getItem("stj:b:2")).toBeNull();
    expect(localStorage.getItem("other_key")).toBe("z");
    expect(localStorage.getItem("regular")).toBe("keep");
  });

  it("does not touch sessionStorage when type is 'local'", () => {
    sessionStorage.setItem("stj:sess:key", "val");
    localStorage.setItem("stj:local:key", "val");

    clearAllNamespaced("local");

    expect(sessionStorage.getItem("stj:sess:key")).toBe("val");
    expect(localStorage.getItem("stj:local:key")).toBeNull();

    sessionStorage.clear();
  });

  it("clears both storages when type is 'both'", () => {
    localStorage.setItem("stj:l:1", "a");
    sessionStorage.setItem("stj:s:1", "b");

    clearAllNamespaced("both");

    expect(localStorage.getItem("stj:l:1")).toBeNull();
    expect(sessionStorage.getItem("stj:s:1")).toBeNull();
  });
});

describe("session storage variant", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("stores and retrieves from sessionStorage", () => {
    const s = createNamespacedStorage("sess", "session");
    s.set("theme", "dark");
    expect(s.get<string>("theme")).toBe("dark");
    expect(sessionStorage.getItem("stj:sess:theme")).toBeTruthy();
    expect(localStorage.getItem("stj:sess:theme")).toBeNull();
  });
});
