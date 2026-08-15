import { describe, it, expect } from "vitest";
import { routing } from "../routing";
import { locales, defaultLocale, localeNames, isRTL } from "../config";
import fs from "fs";
import path from "path";

describe("i18n Configuration Single Source of Truth", () => {
  it("synchronizes locales directly with routing.locales", () => {
    expect(locales).toEqual(routing.locales);
    expect(locales).toEqual(["en", "es", "fr", "zh", "ar"]);
  });

  it("sets defaultLocale to English (en)", () => {
    expect(defaultLocale).toBe("en");
    expect(routing.defaultLocale).toBe("en");
  });

  it("contains display names for every active locale", () => {
    for (const loc of locales) {
      expect(localeNames[loc]).toBeDefined();
      expect(typeof localeNames[loc]).toBe("string");
    }
  });

  it("correctly identifies RTL for Arabic and LTR for others", () => {
    expect(isRTL("ar")).toBe(true);
    expect(isRTL("en")).toBe(false);
    expect(isRTL("es")).toBe(false);
    expect(isRTL("fr")).toBe(false);
    expect(isRTL("zh")).toBe(false);
  });

  it("confirms JSON message catalogs exist for every configured locale", () => {
    const messagesDir = path.join(process.cwd(), "messages");
    for (const loc of locales) {
      const filePath = path.join(messagesDir, `${loc}.json`);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });
});
