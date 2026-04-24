import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { notificationService } from "@/services/notificationService";

describe("Notification Service", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("getNotificationSettings", () => {
    it("should return settings from localStorage if available", async () => {
      const testSettings = {
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

      localStorage.setItem("notificationSettings", JSON.stringify(testSettings));

      const result = await notificationService.getNotificationSettings();
      expect(result).toEqual(testSettings);
    });

    it("should return default settings if localStorage is empty", async () => {
      const result = await notificationService.getNotificationSettings();

      expect(result).toBeDefined();
      expect(result.categories).toBeDefined();
      expect(result.frequency).toBeDefined();
      expect(result.unsubscribeToken).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });

    it("should have all 6 categories in default settings", async () => {
      const result = await notificationService.getNotificationSettings();

      const categories = Object.keys(result.categories);
      expect(categories).toContain("tips");
      expect(categories).toContain("comments");
      expect(categories).toContain("followers");
      expect(categories).toContain("messages");
      expect(categories).toContain("updates");
      expect(categories).toContain("promotions");
    });

    it("should have correct default preferences", async () => {
      const result = await notificationService.getNotificationSettings();

      // Tips should be fully enabled
      expect(result.categories.tips.email).toBe(true);
      expect(result.categories.tips.push).toBe(true);
      expect(result.categories.tips.inApp).toBe(true);

      // Promotions should have email only by default
      expect(result.categories.promotions.email).toBe(true);
      expect(result.categories.promotions.push).toBe(false);
      expect(result.categories.promotions.inApp).toBe(false);
    });

    it("should handle corrupted localStorage gracefully", async () => {
      localStorage.setItem("notificationSettings", "invalid json");

      const result = await notificationService.getNotificationSettings();

      expect(result).toBeDefined();
      expect(result.categories).toBeDefined();
    });
  });

  describe("updateNotificationSettings", () => {
    it("should save settings to localStorage", async () => {
      const settings = {
        categories: {
          tips: { email: false, push: false, inApp: false },
          comments: { email: true, push: true, inApp: true },
          followers: { email: true, push: true, inApp: true },
          messages: { email: true, push: true, inApp: true },
          updates: { email: true, push: false, inApp: false },
          promotions: { email: true, push: false, inApp: false },
        },
        frequency: {
          email: "weekly",
          push: "daily",
          inApp: "instant",
        },
        unsubscribeToken: "test-token",
        updatedAt: new Date().toISOString(),
      };

      await notificationService.updateNotificationSettings(settings);

      const stored = localStorage.getItem("notificationSettings");
      expect(stored).toBeDefined();

      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.categories.tips.email).toBe(false);
      }
    });

    it("should return the updated settings", async () => {
      const settings = {
        categories: {
          tips: { email: false, push: false, inApp: false },
          comments: { email: true, push: true, inApp: true },
          followers: { email: true, push: true, inApp: true },
          messages: { email: true, push: true, inApp: true },
          updates: { email: true, push: false, inApp: false },
          promotions: { email: true, push: false, inApp: false },
        },
        frequency: {
          email: "weekly",
          push: "daily",
          inApp: "instant",
        },
        unsubscribeToken: "test-token",
        updatedAt: new Date().toISOString(),
      };

      const result = await notificationService.updateNotificationSettings(settings);
      expect(result).toEqual(settings);
    });

    it("should validate settings before saving", async () => {
      const invalidSettings = {
        categories: {
          // incomplete
        },
        frequency: {},
      };

      await expect(
        notificationService.updateNotificationSettings(invalidSettings as any)
      ).rejects.toThrow();
    });

    it("should reject invalid schema", async () => {
      const invalidSettings = {
        categories: {
          tips: { email: true, push: "invalid", inApp: true }, // push should be boolean
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

      await expect(
        notificationService.updateNotificationSettings(invalidSettings as any)
      ).rejects.toThrow();
    });
  });

  describe("generateUnsubscribeLink", () => {
    it("should generate a valid unsubscribe URL", () => {
      const link = notificationService.generateUnsubscribeLink("tips", "email");

      expect(link).toContain("/notifications/unsubscribe");
      expect(link).toContain("token=");
      expect(link).toContain("category=tips");
      expect(link).toContain("channel=email");
    });

    it("should work with different categories", () => {
      const categories = ["tips", "comments", "followers", "messages", "updates", "promotions"];

      categories.forEach((category) => {
        const link = notificationService.generateUnsubscribeLink(category, "email");
        expect(link).toContain(`category=${category}`);
      });
    });

    it("should work with different channels", () => {
      const channels = ["email", "push", "inApp"];

      channels.forEach((channel) => {
        const link = notificationService.generateUnsubscribeLink("tips", channel);
        expect(link).toContain(`channel=${channel}`);
      });
    });

    it("should include a token parameter", () => {
      const link = notificationService.generateUnsubscribeLink("tips", "email");
      const tokenMatch = link.match(/token=([a-zA-Z0-9_-]+)/);

      expect(tokenMatch).toBeDefined();
      if (tokenMatch) {
        expect(tokenMatch[1].length).toBeGreaterThan(0);
      }
    });
  });

  describe("applyUnsubscribe", () => {
    it("should unsubscribe from all when no category specified", async () => {
      await notificationService.getNotificationSettings();

      const result = await notificationService.applyUnsubscribe("test-token");

      Object.values(result.categories).forEach((category) => {
        expect(category.email).toBe(false);
        expect(category.push).toBe(false);
        expect(category.inApp).toBe(false);
      });
    });

    it("should unsubscribe from specific category and channel", async () => {
      const oldSettings = await notificationService.getNotificationSettings();

      const result = await notificationService.applyUnsubscribe(
        "test-token",
        "tips",
        "email"
      );

      expect(result.categories.tips.email).toBe(false);
      // Other channels should remain unchanged
      expect(result.categories.tips.push).toBe(oldSettings.categories.tips.push);
      expect(result.categories.tips.inApp).toBe(oldSettings.categories.tips.inApp);
    });

    it("should update the timestamp", async () => {
      const result = await notificationService.applyUnsubscribe("test-token");

      const isoDate = new Date(result.updatedAt);
      expect(isoDate.getTime()).toBeLessThanOrEqual(Date.now());
      expect(isoDate.getTime()).toBeGreaterThan(Date.now() - 5000); // within 5 seconds
    });

    it("should persist changes to localStorage", async () => {
      await notificationService.applyUnsubscribe("test-token", "tips", "email");

      const stored = localStorage.getItem("notificationSettings");
      expect(stored).toBeDefined();

      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.categories.tips.email).toBe(false);
      }
    });
  });

  describe("getNotificationHistory", () => {
    it("should return an array", async () => {
      const history = await notificationService.getNotificationHistory();
      expect(Array.isArray(history)).toBe(true);
    });

    it("should accept limit parameter", async () => {
      const history = await notificationService.getNotificationHistory(10);
      expect(Array.isArray(history)).toBe(true);
    });

    it("should return empty array initially", async () => {
      const history = await notificationService.getNotificationHistory();
      expect(history).toHaveLength(0);
    });
  });

  describe("sendTestNotification", () => {
    it("should not throw an error", async () => {
      await expect(
        notificationService.sendTestNotification("tips", "email")
      ).resolves.toBeUndefined();
    });

    it("should work with all categories", async () => {
      const categories = ["tips", "comments", "followers", "messages", "updates", "promotions"];

      for (const category of categories) {
        await expect(
          notificationService.sendTestNotification(category, "email")
        ).resolves.toBeUndefined();
      }
    });

    it("should work with all channels", async () => {
      const channels = ["email", "push", "inApp"];

      for (const channel of channels) {
        await expect(
          notificationService.sendTestNotification("tips", channel)
        ).resolves.toBeUndefined();
      }
    });
  });

  describe("getCategories", () => {
    it("should return all 6 categories", async () => {
      const categories = await notificationService.getCategories();
      expect(categories).toHaveLength(6);
    });

    it("should have required properties", async () => {
      const categories = await notificationService.getCategories();

      categories.forEach((category) => {
        expect(category).toHaveProperty("id");
        expect(category).toHaveProperty("name");
        expect(category).toHaveProperty("description");
      });
    });

    it("should include correct category IDs", async () => {
      const categories = await notificationService.getCategories();
      const ids = categories.map((c) => c.id);

      expect(ids).toContain("tips");
      expect(ids).toContain("comments");
      expect(ids).toContain("followers");
      expect(ids).toContain("messages");
      expect(ids).toContain("updates");
      expect(ids).toContain("promotions");
    });

    it("should include descriptions for each category", async () => {
      const categories = await notificationService.getCategories();

      categories.forEach((category) => {
        expect(category.description.length).toBeGreaterThan(0);
      });
    });

    it("should include emoji icons", async () => {
      const categories = await notificationService.getCategories();

      categories.forEach((category) => {
        expect(category.icon).toBeDefined();
        expect(category.icon?.length).toBeGreaterThan(0);
      });
    });
  });

  describe("resetToDefaults", () => {
    it("should reset to default settings", async () => {
      // First modify settings
      const modified = {
        categories: {
          tips: { email: false, push: false, inApp: false },
          comments: { email: false, push: false, inApp: false },
          followers: { email: false, push: false, inApp: false },
          messages: { email: false, push: false, inApp: false },
          updates: { email: false, push: false, inApp: false },
          promotions: { email: false, push: false, inApp: false },
        },
        frequency: {
          email: "never" as const,
          push: "never" as const,
          inApp: "never" as const,
        },
        unsubscribeToken: "test-token",
        updatedAt: new Date().toISOString(),
      };

      await notificationService.updateNotificationSettings(modified);

      // Then reset
      const reset = await notificationService.resetToDefaults();

      expect(reset.categories.tips.email).toBe(true);
      expect(reset.categories.tips.push).toBe(true);
      expect(reset.categories.tips.inApp).toBe(true);
    });

    it("should generate new unsubscribe token", async () => {
      const settings = await notificationService.getNotificationSettings();
      const originalToken = settings.unsubscribeToken;

      const reset = await notificationService.resetToDefaults();

      expect(reset.unsubscribeToken).not.toBe(originalToken);
    });

    it("should update timestamp", async () => {
      const reset = await notificationService.resetToDefaults();

      const isoDate = new Date(reset.updatedAt);
      expect(isoDate.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it("should persist to localStorage", async () => {
      await notificationService.resetToDefaults();

      const stored = localStorage.getItem("notificationSettings");
      expect(stored).toBeDefined();

      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.categories.tips.email).toBe(true);
      }
    });
  });

  describe("Service Integration", () => {
    it("should maintain consistency across operations", async () => {
      // Get initial settings
      const initial = await notificationService.getNotificationSettings();

      // Update a setting
      initial.categories.tips.email = false;
      await notificationService.updateNotificationSettings(initial);

      // Retrieve and verify
      const updated = await notificationService.getNotificationSettings();
      expect(updated.categories.tips.email).toBe(false);

      // Reset and verify
      const reset = await notificationService.resetToDefaults();
      expect(reset.categories.tips.email).toBe(true);
    });

    it("should handle concurrent operations safely", async () => {
      const promises = [
        notificationService.getNotificationSettings(),
        notificationService.getCategories(),
        notificationService.getNotificationHistory(),
      ];

      const results = await Promise.all(promises);

      expect(results[0].categories).toBeDefined();
      expect(results[1]).toHaveLength(6);
      expect(Array.isArray(results[2])).toBe(true);
    });
  });
});
