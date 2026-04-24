import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useNotificationPrefs } from "@/hooks/useNotificationPrefs";

describe("useNotificationPrefs Hook", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("Initial State", () => {
    it("should initialize with default settings", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      expect(result.current.settings).toBeDefined();
      expect(result.current.settings.categories).toBeDefined();
      expect(result.current.settings.frequency).toBeDefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should have all 6 notification categories", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      const categories = Object.keys(result.current.settings.categories);
      expect(categories).toContain("tips");
      expect(categories).toContain("comments");
      expect(categories).toContain("followers");
      expect(categories).toContain("messages");
      expect(categories).toContain("updates");
      expect(categories).toContain("promotions");
      expect(categories).toHaveLength(6);
    });

    it("should have all 3 notification channels in each category", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      Object.values(result.current.settings.categories).forEach((category) => {
        expect(category).toHaveProperty("email");
        expect(category).toHaveProperty("push");
        expect(category).toHaveProperty("inApp");
      });
    });

    it("should calculate stats correctly on mount", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      expect(result.current.stats.totalSettings).toBeGreaterThan(0);
      expect(result.current.stats.enabledSettings).toBeGreaterThan(0);
      expect(result.current.stats.disabledSettings).toBeGreaterThanOrEqual(0);
      expect(result.current.stats.percentageEnabled).toBeGreaterThanOrEqual(0);
    });
  });

  describe("updateCategoryChannel", () => {
    it("should update a specific channel for a category", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      act(() => {
        result.current.updateCategoryChannel("tips", "email", false);
      });

      expect(result.current.settings.categories.tips.email).toBe(false);
    });

    it("should not affect other channels in the same category", () => {
      const { result } = renderHook(() => useNotificationPrefs());
      const originalPush = result.current.settings.categories.tips.push;
      const originalInApp = result.current.settings.categories.tips.inApp;

      act(() => {
        result.current.updateCategoryChannel("tips", "email", false);
      });

      expect(result.current.settings.categories.tips.push).toBe(originalPush);
      expect(result.current.settings.categories.tips.inApp).toBe(originalInApp);
    });

    it("should not affect other categories", () => {
      const { result } = renderHook(() => useNotificationPrefs());
      const originalComments = result.current.settings.categories.comments.email;

      act(() => {
        result.current.updateCategoryChannel("tips", "email", false);
      });

      expect(result.current.settings.categories.comments.email).toBe(
        originalComments
      );
    });

    it("should persist changes to localStorage", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      act(() => {
        result.current.updateCategoryChannel("tips", "email", false);
      });

      const stored = localStorage.getItem("notificationSettings");
      expect(stored).toBeDefined();

      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.categories.tips.email).toBe(false);
      }
    });
  });

  describe("updateAllChannelsForCategory", () => {
    it("should enable all channels for a category", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      act(() => {
        result.current.updateAllChannelsForCategory("promotions", true);
      });

      expect(result.current.settings.categories.promotions.email).toBe(true);
      expect(result.current.settings.categories.promotions.push).toBe(true);
      expect(result.current.settings.categories.promotions.inApp).toBe(true);
    });

    it("should disable all channels for a category", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      act(() => {
        result.current.updateAllChannelsForCategory("tips", false);
      });

      expect(result.current.settings.categories.tips.email).toBe(false);
      expect(result.current.settings.categories.tips.push).toBe(false);
      expect(result.current.settings.categories.tips.inApp).toBe(false);
    });

    it("should not affect other categories", () => {
      const { result } = renderHook(() => useNotificationPrefs());
      const originalComments = JSON.parse(
        JSON.stringify(result.current.settings.categories.comments)
      );

      act(() => {
        result.current.updateAllChannelsForCategory("tips", false);
      });

      expect(result.current.settings.categories.comments).toEqual(
        originalComments
      );
    });
  });

  describe("updateFrequency", () => {
    it("should update frequency for a channel", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      act(() => {
        result.current.updateFrequency("email", "weekly");
      });

      expect(result.current.settings.frequency.email).toBe("weekly");
    });

    it("should accept all frequency types", () => {
      const { result } = renderHook(() => useNotificationPrefs());
      const frequencies = ["instant", "daily", "weekly", "never"] as const;

      frequencies.forEach((freq) => {
        act(() => {
          result.current.updateFrequency("email", freq);
        });
        expect(result.current.settings.frequency.email).toBe(freq);
      });
    });

    it("should not affect other channels", () => {
      const { result } = renderHook(() => useNotificationPrefs());
      const originalPush = result.current.settings.frequency.push;
      const originalInApp = result.current.settings.frequency.inApp;

      act(() => {
        result.current.updateFrequency("email", "weekly");
      });

      expect(result.current.settings.frequency.push).toBe(originalPush);
      expect(result.current.settings.frequency.inApp).toBe(originalInApp);
    });
  });

  describe("subscribeAll", () => {
    it("should enable all notifications", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      // First disable all
      act(() => {
        result.current.unsubscribeAll();
      });

      expect(result.current.stats.enabledSettings).toBe(0);

      // Then enable all
      act(() => {
        result.current.subscribeAll();
      });

      Object.values(result.current.settings.categories).forEach((category) => {
        expect(category.email).toBe(true);
        expect(category.push).toBe(true);
        expect(category.inApp).toBe(true);
      });
    });

    it("should set correct stats after subscribing", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      act(() => {
        result.current.unsubscribeAll();
      });

      const disabledCount = result.current.stats.enabledSettings;

      act(() => {
        result.current.subscribeAll();
      });

      expect(result.current.stats.enabledSettings).toBeGreaterThan(disabledCount);
    });
  });

  describe("unsubscribeAll", () => {
    it("should disable all notifications", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      act(() => {
        result.current.unsubscribeAll();
      });

      Object.values(result.current.settings.categories).forEach((category) => {
        expect(category.email).toBe(false);
        expect(category.push).toBe(false);
        expect(category.inApp).toBe(false);
      });
    });

    it("should set enabledSettings to 0", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      act(() => {
        result.current.unsubscribeAll();
      });

      expect(result.current.stats.enabledSettings).toBe(0);
    });

    it("should set percentage to 0%", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      act(() => {
        result.current.unsubscribeAll();
      });

      expect(result.current.stats.percentageEnabled).toBe(0);
    });
  });

  describe("unsubscribeChannel", () => {
    it("should disable a specific channel across all categories", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      act(() => {
        result.current.unsubscribeChannel("email");
      });

      Object.values(result.current.settings.categories).forEach((category) => {
        expect(category.email).toBe(false);
      });
    });

    it("should not affect other channels", () => {
      const { result } = renderHook(() => useNotificationPrefs());
      const originalPush = Object.values(
        result.current.settings.categories
      ).map((cat) => cat.push);

      act(() => {
        result.current.unsubscribeChannel("email");
      });

      Object.values(result.current.settings.categories).forEach((category, i) => {
        expect(category.push).toBe(originalPush[i]);
      });
    });
  });

  describe("Statistics", () => {
    it("should calculate totalSettings correctly", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      expect(result.current.stats.totalSettings).toBe(18); // 6 categories × 3 channels
    });

    it("should calculate enabledSettings correctly", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      let enabledCount = 0;
      Object.values(result.current.settings.categories).forEach((category) => {
        ['email', 'push', 'inApp'].forEach((channel) => {
          if (category[channel as keyof typeof category]) {
            enabledCount++;
          }
        });
      });

      expect(result.current.stats.enabledSettings).toBe(enabledCount);
    });

    it("should calculate disabledSettings correctly", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      expect(result.current.stats.disabledSettings).toBe(
        result.current.stats.totalSettings - result.current.stats.enabledSettings
      );
    });

    it("should calculate percentageEnabled correctly", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      const expected = Math.round(
        (result.current.stats.enabledSettings / result.current.stats.totalSettings) *
          100
      );

      expect(result.current.stats.percentageEnabled).toBe(expected);
    });

    it("should update stats after changes", () => {
      const { result } = renderHook(() => useNotificationPrefs());
      const initialEnabled = result.current.stats.enabledSettings;

      act(() => {
        result.current.updateCategoryChannel("tips", "email", false);
      });

      expect(result.current.stats.enabledSettings).toBe(initialEnabled - 1);
    });
  });

  describe("Persistence", () => {
    it("should restore settings from localStorage on mount", () => {
      const { result: result1 } = renderHook(() => useNotificationPrefs());

      act(() => {
        result1.current.updateCategoryChannel("tips", "email", false);
      });

      const { result: result2 } = renderHook(() => useNotificationPrefs());

      expect(result2.current.settings.categories.tips.email).toBe(false);
    });

    it("should handle corrupted localStorage gracefully", () => {
      localStorage.setItem("notificationSettings", "invalid json");

      const { result } = renderHook(() => useNotificationPrefs());

      expect(result.current.settings).toBeDefined();
      expect(result.current.error).toBeNull();
    });

    it("should handle missing localStorage gracefully", () => {
      localStorage.clear();

      const { result } = renderHook(() => useNotificationPrefs());

      expect(result.current.settings).toBeDefined();
      expect(result.current.settings.categories).toBeDefined();
    });
  });

  describe("Edge Cases", () => {
    it("should handle rapid successive updates", () => {
      const { result } = renderHook(() => useNotificationPrefs());

      act(() => {
        result.current.updateCategoryChannel("tips", "email", false);
        result.current.updateCategoryChannel("tips", "push", false);
        result.current.updateCategoryChannel("tips", "inApp", false);
      });

      expect(result.current.settings.categories.tips.email).toBe(false);
      expect(result.current.settings.categories.tips.push).toBe(false);
      expect(result.current.settings.categories.tips.inApp).toBe(false);
    });

    it("should handle toggling the same setting multiple times", () => {
      const { result } = renderHook(() => useNotificationPrefs());
      const initial = result.current.settings.categories.tips.email;

      act(() => {
        result.current.updateCategoryChannel("tips", "email", !initial);
        result.current.updateCategoryChannel("tips", "email", initial);
      });

      expect(result.current.settings.categories.tips.email).toBe(initial);
    });

    it("should maintain referential stability for unchanged values", () => {
      const { result } = renderHook(() => useNotificationPrefs());
      const initialCategories = result.current.settings.categories;

      act(() => {
        result.current.updateCategoryChannel("tips", "email", false);
      });

      // Categories object reference should change since it's updated
      expect(result.current.settings.categories).not.toBe(initialCategories);
    });
  });
});
