import { describe, it, expect } from "vitest";
import { creatorSchema, creatorUsernameSchema, categorySchema } from "../creatorSchema";

describe("creatorSchema & categorySchema (#595)", () => {
  it("validates valid usernames", () => {
    expect(creatorUsernameSchema.safeParse("alice").success).toBe(true);
    expect(creatorUsernameSchema.safeParse("bob_123").success).toBe(true);
    expect(creatorUsernameSchema.safeParse("creator-name").success).toBe(true);
  });

  it("rejects invalid usernames", () => {
    expect(creatorUsernameSchema.safeParse("a").success).toBe(false);
    expect(creatorUsernameSchema.safeParse("_invalid").success).toBe(false);
    expect(creatorUsernameSchema.safeParse("invalid space").success).toBe(false);
  });

  it("validates supported categories in creatorSchema", () => {
    const valid = {
      username: "stellar_artist",
      categories: ["art", "crypto", "defi"],
      tags: ["stellar", "nft-art"],
    };

    const parsed = creatorSchema.safeParse(valid);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.categories).toEqual(["art", "crypto", "defi"]);
    }
  });

  it("rejects unsupported categories in creatorSchema", () => {
    const invalid = {
      username: "stellar_artist",
      categories: ["unsupported_category"],
    };

    const parsed = creatorSchema.safeParse(invalid);
    expect(parsed.success).toBe(false);
  });

  it("defaults categories to empty array when omitted", () => {
    const parsed = creatorSchema.safeParse({ username: "john_doe" });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.categories).toEqual([]);
      expect(parsed.data.tags).toEqual([]);
    }
  });
});
