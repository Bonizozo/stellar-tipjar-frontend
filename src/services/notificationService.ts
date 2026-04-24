import {
  notificationSettingsSchema,
  type NotificationSettings,
  generateUnsubscribeToken,
} from "@/schemas/notificationSchema";

/**
 * Comprehensive service for managing user notification preferences
 * Handles fetching, updating, and managing notification settings
 */

export const notificationService = {
  /**
   * Fetch the current user's notification settings
   * @returns Promise resolving to NotificationSettings
   */
  async getNotificationSettings(): Promise<NotificationSettings> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/notifications/settings');
      // const data = await response.json();
      // return notificationSettingsSchema.parse(data);

      // For now, return from localStorage or defaults
      const stored = localStorage.getItem("notificationSettings");
      if (stored) {
        const parsed = JSON.parse(stored);
        return notificationSettingsSchema.parse(parsed);
      }

      // Return default settings if none stored
      return notificationSettingsSchema.parse({
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
      });
    } catch (error) {
      console.error("Failed to fetch notification settings:", error);
      // Return default settings on any error (including corrupted localStorage)
      return notificationSettingsSchema.parse({
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
      });
    }
  },

  /**
   * Update user's notification settings
   * @param settings Updated notification settings
   * @returns Promise resolving to updated NotificationSettings
   */
  async updateNotificationSettings(
    settings: NotificationSettings
  ): Promise<NotificationSettings> {
    try {
      // Validate settings schema
      const validated = notificationSettingsSchema.parse(settings);

      // TODO: Replace with actual API call
      // const response = await fetch('/api/notifications/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(validated),
      // });
      // return await response.json();

      // For now, save to localStorage
      localStorage.setItem("notificationSettings", JSON.stringify(validated));

      return validated;
    } catch (error) {
      console.error("Failed to update notification settings:", error);
      throw new Error("Failed to update notification settings");
    }
  },

  /**
   * Generate an unsubscribe link for a specific category and channel
   * @param category Notification category
   * @param channel Notification channel
   * @returns Generated unsubscribe URL
   */
  generateUnsubscribeLink(category: string, channel: string): string {
    const token = generateUnsubscribeToken();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return `${baseUrl}/notifications/unsubscribe?token=${token}&category=${category}&channel=${channel}`;
  },

  /**
   * Process an unsubscribe request
   * @param token Unsubscribe token
   * @param category Optional: specific category to unsubscribe from
   * @param channel Optional: specific channel to unsubscribe from
   * @returns Promise resolving to updated settings
   */
  async applyUnsubscribe(
    token: string,
    category?: string,
    channel?: string
  ): Promise<NotificationSettings> {
    try {
      // TODO: Validate token on backend before processing

      const settings = await this.getNotificationSettings();

      if (category && channel) {
        // Unsubscribe from specific category/channel
        const catKey = category as keyof typeof settings.categories;
        const chanKey = channel as keyof typeof settings.categories.tips;

        if (settings.categories[catKey]) {
          settings.categories[catKey] = {
            ...settings.categories[catKey],
            [chanKey]: false,
          };
        }
      } else {
        // Unsubscribe from all notifications
        Object.keys(settings.categories).forEach((cat) => {
          const catKey = cat as keyof typeof settings.categories;
          settings.categories[catKey] = {
            email: false,
            push: false,
            inApp: false,
          };
        });
      }

      settings.updatedAt = new Date().toISOString();

      return this.updateNotificationSettings(settings);
    } catch (error) {
      console.error("Failed to apply unsubscribe:", error);
      throw new Error("Failed to apply unsubscribe");
    }
  },

  /**
   * Get notification history for the user
   * @param limit Maximum number of records to return
   * @returns Promise with notification history
   */
  async getNotificationHistory(
    limit: number = 50
  ): Promise<
    Array<{
      id: string;
      category: string;
      channel: string;
      timestamp: string;
      read: boolean;
    }>
  > {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/notifications/history?limit=${limit}`);
      // return await response.json();

      // For now, return empty array with example structure
      return [];
    } catch (error) {
      console.error("Failed to fetch notification history:", error);
      throw new Error("Failed to fetch notification history");
    }
  },

  /**
   * Send a test notification to verify preferences work
   * @param category Test notification category
   * @param channel Channel to test
   * @returns Promise resolving to success status
   */
  async sendTestNotification(category: string, channel: string): Promise<void> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/notifications/test', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ category, channel }),
      // });
      // if (!response.ok) throw new Error('Failed to send test notification');

      console.log(`Test notification would be sent to ${channel} for ${category}`);
    } catch (error) {
      console.error("Failed to send test notification:", error);
      throw new Error("Failed to send test notification");
    }
  },

  /**
   * Get notification categories metadata
   * @returns Array of category info with descriptions
   */
  async getCategories(): Promise<
    Array<{
      id: string;
      name: string;
      description: string;
      icon?: string;
    }>
  > {
    return [
      {
        id: "tips",
        name: "New Tips Received",
        description: "Get notified when someone sends you a tip",
        icon: "💰",
      },
      {
        id: "comments",
        name: "Comments",
        description: "Get notified when someone comments on your content",
        icon: "💬",
      },
      {
        id: "followers",
        name: "Followers",
        description: "Get notified when someone follows your profile",
        icon: "👥",
      },
      {
        id: "messages",
        name: "Messages",
        description: "Get notified when you receive a direct message",
        icon: "📧",
      },
      {
        id: "updates",
        name: "App Updates",
        description: "Get notified about new features and updates",
        icon: "🔄",
      },
      {
        id: "promotions",
        name: "Promotions",
        description: "Get notified about special offers and promotions",
        icon: "🎁",
      },
    ];
  },

  /**
   * Clear all notification settings (reset to defaults)
   * @returns Promise resolving to default settings
   */
  async resetToDefaults(): Promise<NotificationSettings> {
    const defaults: NotificationSettings = {
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

    return this.updateNotificationSettings(defaults);
  },
};
