import { describe, it, expect } from "vitest";
import { isRTL, locales, defaultLocale, localeNames } from "../config";

describe("i18n Config & RTL Resolution (#575)", () => {
  it("identifies Arabic (ar) as RTL", () => {
    expect(isRTL("ar")).toBe(true);
  });

  it("identifies non-Arabic locales as LTR", () => {
    expect(isRTL("en")).toBe(false);
    expect(isRTL("es")).toBe(false);
    expect(isRTL("fr")).toBe(false);
    expect(isRTL("zh")).toBe(false);
  });

  it("has valid defaultLocale and localeNames", () => {
    expect(defaultLocale).toBe("en");
    expect(locales).toContain("en");
    expect(locales).toContain("ar");
    expect(localeNames.ar).toBe("العربية");
  });
});
