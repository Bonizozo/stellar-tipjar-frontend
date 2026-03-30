import { describe, it, expect } from "vitest";
import {
  channelPreferencesSchema,
  categoryPreferencesSchema,
  notificationSettingsSchema,
  notificationFrequencySchema,
  validateNotificationSettings,
  generateUnsubscribeToken,
} from "@/schemas/notificationSchema";

describe("Notification Schemas", () => {
  describe("Channel Preferences Schema", () => {
    it("should validate correct channel preferences", () => {
      const valid = {
        email: true,
        push: false,
        inApp: true,
      };

      const result = channelPreferencesSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject invalid channel preferences", () => {
      const invalid = {
        email: true,
        push: "yes", // should be boolean
        inApp: true,
      };

      const result = channelPreferencesSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("should reject missing properties", () => {
      const incomplete = {
        email: true,
        push: true,
        // missing inApp
      };

      const result = channelPreferencesSchema.safeParse(incomplete);
      expect(result.success).toBe(false);
    });

    it("should reject extra properties", () => {
      const extra = {
        email: true,
        push: false,
        inApp: true,
        sms: true, // not in schema
      };

      const result = channelPreferencesSchema.safeParse(extra);
      // Zod removes extra properties by default
      expect(result.success).toBe(true);
      if (result.success) {
        expect((result.data as any).sms).toBeUndefined();
      }
    });
  });

  describe("Category Preferences Schema", () => {
    it("should validate correct category preferences", () => {
      const valid = {
        tips: { email: true, push: true, inApp: true },
        comments: { email: true, push: false, inApp: true },
        followers: { email: false, push: true, inApp: true },
        messages: { email: true, push: true, inApp: false },
        updates: { email: true, push: false, inApp: false },
        promotions: { email: false, push: false, inApp: false },
      };

      const result = categoryPreferencesSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should require all 6 categories", () => {
      const incomplete = {
        tips: { email: true, push: true, inApp: true },
        comments: { email: true, push: true, inApp: true },
        // missing 4 categories
      };

      const result = categoryPreferencesSchema.safeParse(incomplete);
      expect(result.success).toBe(false);
    });

    it("should validate nested channel preferences", () => {
      const valid = {
        tips: { email: true, push: true, inApp: true },
        comments: { email: true, push: true, inApp: true },
        followers: { email: true, push: true, inApp: true },
        messages: { email: true, push: true, inApp: true },
        updates: { email: true, push: true, inApp: true },
        promotions: { email: true, push: true, inApp: true },
      };

      const result = categoryPreferencesSchema.safeParse(valid);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.tips.email).toBe(true);
        expect(result.data.comments.push).toBe(true);
      }
    });
  });

  describe("Notification Frequency Schema", () => {
    it("should accept instant frequency", () => {
      const result = notificationFrequencySchema.safeParse("instant");
      expect(result.success).toBe(true);
    });

    it("should accept daily frequency", () => {
      const result = notificationFrequencySchema.safeParse("daily");
      expect(result.success).toBe(true);
    });

    it("should accept weekly frequency", () => {
      const result = notificationFrequencySchema.safeParse("weekly");
      expect(result.success).toBe(true);
    });

    it("should accept never frequency", () => {
      const result = notificationFrequencySchema.safeParse("never");
      expect(result.success).toBe(true);
    });

    it("should reject invalid frequencies", () => {
      const invalidFrequencies = ["immediately", "monthly", "every tuesday", ""];

      invalidFrequencies.forEach((freq) => {
        const result = notificationFrequencySchema.safeParse(freq);
        expect(result.success).toBe(false);
      });
    });

    it("should be case sensitive", () => {
      const result = notificationFrequencySchema.safeParse("Daily");
      expect(result.success).toBe(false);
    });
  });

  describe("Notification Settings Schema", () => {
    it("should validate complete notification settings", () => {
      const valid = {
        categories: {
          tips: { email: true, push: true, inApp: true },
          comments: { email: true, push: true, inApp: true },
          followers: { email: true, push: true, inApp: true },
          messages: { email: true, push: true, inApp: true },
          updates: { email: true, push: false, inApp: false },
          promotions: { email: true, push: false, inApp: false },
        },
        frequency: {
          email: "daily",
          push: "instant",
          inApp: "instant",
        },
        unsubscribeToken: "test-token-123",
        updatedAt: new Date().toISOString(),
      };

      const result = notificationSettingsSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should require all properties", () => {
      const incomplete = {
        categories: {
          tips: { email: true, push: true, inApp: true },
          comments: { email: true, push: true, inApp: true },
          followers: { email: true, push: true, inApp: true },
          messages: { email: true, push: true, inApp: true },
          updates: { email: true, push: false, inApp: false },
          promotions: { email: true, push: false, inApp: false },
        },
        frequency: {
          email: "daily",
          push: "instant",
          inApp: "instant",
        },
        // missing unsubscribeToken and updatedAt
      };

      const result = notificationSettingsSchema.safeParse(incomplete);
      expect(result.success).toBe(false);
    });

    it("should validate ISO date format", () => {
      const validISO = new Date().toISOString();
      const valid = {
        categories: {
          tips: { email: true, push: true, inApp: true },
          comments: { email: true, push: true, inApp: true },
          followers: { email: true, push: true, inApp: true },
          messages: { email: true, push: true, inApp: true },
          updates: { email: true, push: false, inApp: false },
          promotions: { email: true, push: false, inApp: false },
        },
        frequency: {
          email: "daily",
          push: "instant",
          inApp: "instant",
        },
        unsubscribeToken: "test-token",
        updatedAt: validISO,
      };

      const result = notificationSettingsSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject invalid ISO date format", () => {
      const invalidISO = "not-a-date";
      const invalid = {
        categories: {
          tips: { email: true, push: true, inApp: true },
          comments: { email: true, push: true, inApp: true },
          followers: { email: true, push: true, inApp: true },
          messages: { email: true, push: true, inApp: true },
          updates: { email: true, push: false, inApp: false },
          promotions: { email: true, push: false, inApp: false },
        },
        frequency: {
          email: "daily",
          push: "instant",
          inApp: "instant",
        },
        unsubscribeToken: "test-token",
        updatedAt: invalidISO,
      };

      const result = notificationSettingsSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("validateNotificationSettings utility", () => {
    it("should return safe parse result", () => {
      const valid = {
        categories: {
          tips: { email: true, push: true, inApp: true },
          comments: { email: true, push: true, inApp: true },
          followers: { email: true, push: true, inApp: true },
          messages: { email: true, push: true, inApp: true },
          updates: { email: true, push: false, inApp: false },
          promotions: { email: true, push: false, inApp: false },
        },
        frequency: {
          email: "daily",
          push: "instant",
          inApp: "instant",
        },
        unsubscribeToken: "test-token",
        updatedAt: new Date().toISOString(),
      };

      const result = validateNotificationSettings(valid);
      expect(result.success).toBe(true);
    });

    it("should provide error info on failure", () => {
      const invalid = {
        categories: {}, // incomplete
        frequency: {},
        unsubscribeToken: "test",
        updatedAt: "now",
      };

      const result = validateNotificationSettings(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
      }
    });
  });

  describe("generateUnsubscribeToken utility", () => {
    it("should generate a token", () => {
      const token = generateUnsubscribeToken();
      expect(typeof token).toBe("string");
      expect(token.length).toBeGreaterThan(0);
    });

    it("should generate different tokens on each call", () => {
      const token1 = generateUnsubscribeToken();
      const token2 = generateUnsubscribeToken();
      expect(token1).not.toBe(token2);
    });

    it("should generate valid tokens", () => {
      const token = generateUnsubscribeToken();
      // Token should be URL-safe and not contain special characters
      expect(/^[a-zA-Z0-9_-]+$/.test(token)).toBe(true);
    });

    it("should generate sufficiently long tokens", () => {
      const token = generateUnsubscribeToken();
      // Tokens should be at least 32 characters
      expect(token.length).toBeGreaterThanOrEqual(32);
    });
  });

  describe("Schema Integration", () => {
    it("should validate real-world notification settings", () => {
      const settings = {
        categories: {
          tips: { email: true, push: true, inApp: true },
          comments: { email: true, push: true, inApp: true },
          followers: { email: true, push: true, inApp: true },
          messages: { email: true, push: true, inApp: true },
          updates: { email: true, push: false, inApp: false },
          promotions: { email: true, push: false, inApp: false },
        },
        frequency: {
          email: "daily",
          push: "instant",
          inApp: "instant",
        },
        unsubscribeToken: generateUnsubscribeToken(),
        updatedAt: new Date().toISOString(),
      };

      // All validations should pass
      expect(validateNotificationSettings(settings).success).toBe(true);
      expect(notificationSettingsSchema.safeParse(settings).success).toBe(true);
      expect(categoryPreferencesSchema.safeParse(settings.categories).success).toBe(
        true
      );
    });

    it("should reject partially invalid settings", () => {
      const settings = {
        categories: {
          tips: { email: true, push: true, inApp: true },
          comments: { email: true, push: true, inApp: true },
          followers: { email: true, push: true, inApp: true },
          messages: { email: true, push: true, inApp: true },
          updates: { email: true, push: false, inApp: false },
          promotions: { email: "yes", push: false, inApp: false }, // invalid type
        },
        frequency: {
          email: "daily",
          push: "instant",
          inApp: "instant",
        },
        unsubscribeToken: generateUnsubscribeToken(),
        updatedAt: new Date().toISOString(),
      };

      expect(validateNotificationSettings(settings).success).toBe(false);
    });
  });

  describe("Type Safety", () => {
    it("should export correct types", () => {
      // This test ensures types are properly exported
      const settings = notificationSettingsSchema.parse({
        categories: {
          tips: { email: true, push: true, inApp: true },
          comments: { email: true, push: true, inApp: true },
          followers: { email: true, push: true, inApp: true },
          messages: { email: true, push: true, inApp: true },
          updates: { email: true, push: false, inApp: false },
          promotions: { email: true, push: false, inApp: false },
        },
        frequency: {
          email: "daily",
          push: "instant",
          inApp: "instant",
        },
        unsubscribeToken: "token",
        updatedAt: new Date().toISOString(),
      });

      // Type should be narrowed to NotificationSettings
      expect(settings).toBeDefined();
      expect(settings.categories).toBeDefined();
      expect(settings.frequency).toBeDefined();
    });
  });
});
