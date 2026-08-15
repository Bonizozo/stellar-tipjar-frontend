import { describe, it, expect } from "vitest";
import en from "../../../messages/en.json";
import es from "../../../messages/es.json";
import fr from "../../../messages/fr.json";
import zh from "../../../messages/zh.json";
import ar from "../../../messages/ar.json";

function extractKeys(obj: Record<string, any>, prefix = ""): string[] {
  let keys: string[] = [];
  for (const k of Object.keys(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === "object" && obj[k] !== null && !Array.isArray(obj[k])) {
      keys.push(...extractKeys(obj[k], full));
    } else {
      keys.push(full);
    }
  }
  return keys;
}

describe("i18n Locale Catalogs Parity", () => {
  const enKeys = extractKeys(en).sort();
  const locales = [
    { name: "es", catalog: es },
    { name: "fr", catalog: fr },
    { name: "zh", catalog: zh },
    { name: "ar", catalog: ar },
  ];

  it("English source of truth has valid keys", () => {
    expect(enKeys.length).toBeGreaterThan(0);
  });

  locales.forEach(({ name, catalog }) => {
    it(`locale '${name}' has 100% key parity with English catalog`, () => {
      const localeKeys = extractKeys(catalog);
      const missingKeys = enKeys.filter((k) => !localeKeys.includes(k));
      const extraKeys = localeKeys.filter((k) => !enKeys.includes(k));

      expect(missingKeys, `Missing keys in ${name}.json`).toEqual([]);
      expect(extraKeys, `Unexpected extra keys in ${name}.json`).toEqual([]);
    });
  });
});
