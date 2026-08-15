import { describe, it, expect } from "vitest";
import { config } from "../middleware";
import { routing } from "../i18n/routing";

describe("Middleware Routing Configuration (#576)", () => {
  it("imports and shares centralized routing options", () => {
    expect(routing.locales).toEqual(["en", "es", "fr", "zh", "ar"]);
    expect(routing.defaultLocale).toBe("en");
    expect(routing.localePrefix).toBe("as-needed");
  });

  it("configures comprehensive route matcher excluding api and static files", () => {
    expect(config.matcher).toBeDefined();
    expect(Array.isArray(config.matcher)).toBe(true);
    expect(config.matcher[0]).toBe("/((?!api|_next|_vercel|.*\\..*).*)");
  });
});
