"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

// Notification channels
export type NotificationChannel = "email" | "push" | "inApp";

// Notification categories
export type NotificationCategory = "tips" | "comments" | "followers" | "messages" | "updates" | "promotions";

// Per-channel preferences
export interface ChannelPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

// Per-category preferences
export interface CategoryPreferences {
  tips: ChannelPreferences;
  comments: ChannelPreferences;
  followers: ChannelPreferences;
  messages: ChannelPreferences;
  updates: ChannelPreferences;
  promotions: ChannelPreferences;
}

// Notification frequency options
export type NotificationFrequency = "instant" | "daily" | "weekly" | "never";

// Global notification settings
export interface NotificationSettings {
  categories: CategoryPreferences;
  frequency: {
    email: NotificationFrequency;
    push: NotificationFrequency;
    inApp: NotificationFrequency;
  };
  unsubscribeToken?: string;
  updatedAt: string;
}

const STORAGE_KEY = "stellar_tipjar_notification_settings";

const defaultChannelPrefs: ChannelPreferences = {
  email: true,
  push: true,
  inApp: true,
};

const defaultSettings: NotificationSettings = {
  categories: {
    tips: defaultChannelPrefs,
    comments: defaultChannelPrefs,
    followers: defaultChannelPrefs,
    messages: defaultChannelPrefs,
    updates: { email: true, push: true, inApp: true },
    promotions: { email: true, push: false, inApp: false },
  },
  frequency: {
    email: "instant",
    push: "instant",
    inApp: "instant",
  },
  updatedAt: new Date().toISOString(),
};

export function useNotificationPrefs() {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      setIsLoading(true);
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as NotificationSettings;
        setSettings({ ...defaultSettings, ...parsed });
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load preferences");
      setSettings(defaultSettings);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist to localStorage when settings change
  useEffect(() => {
    if (typeof window === "undefined" || isLoading) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (err) {
      console.error("Failed to save notification preferences:", err);
    }
  }, [settings, isLoading]);

  // Update a specific channel preference for a category
  const updateCategoryChannel = useCallback(
    (category: NotificationCategory, channel: NotificationChannel, value: boolean) => {
      setSettings((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [category]: {
            ...prev.categories[category],
            [channel]: value,
          },
        },
        updatedAt: new Date().toISOString(),
      }));
    },
    []
  );

  // Update all channels for a category
  const updateAllChannelsForCategory = useCallback((category: NotificationCategory, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          email: value,
          push: value,
          inApp: value,
        },
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // Update frequency for a channel
  const updateFrequency = useCallback((channel: "email" | "push" | "inApp", frequency: NotificationFrequency) => {
    setSettings((prev) => ({
      ...prev,
      frequency: {
        ...prev.frequency,
        [channel]: frequency,
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // Unsubscribe all notifications
  const unsubscribeAll = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      categories: {
        tips: { email: false, push: false, inApp: false },
        comments: { email: false, push: false, inApp: false },
        followers: { email: false, push: false, inApp: false },
        messages: { email: false, push: false, inApp: false },
        updates: { email: false, push: false, inApp: false },
        promotions: { email: false, push: false, inApp: false },
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // Subscribe to all notifications
  const subscribeAll = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      categories: {
        tips: defaultChannelPrefs,
        comments: defaultChannelPrefs,
        followers: defaultChannelPrefs,
        messages: defaultChannelPrefs,
        updates: defaultChannelPrefs,
        promotions: defaultChannelPrefs,
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // Unsubscribe from a specific channel entirely (all categories)
  const unsubscribeChannel = useCallback((channel: NotificationChannel) => {
    setSettings((prev) => ({
      ...prev,
      categories: {
        tips: { ...prev.categories.tips, [channel]: false },
        comments: { ...prev.categories.comments, [channel]: false },
        followers: { ...prev.categories.followers, [channel]: false },
        messages: { ...prev.categories.messages, [channel]: false },
        updates: { ...prev.categories.updates, [channel]: false },
        promotions: { ...prev.categories.promotions, [channel]: false },
      },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const allCategories = Object.entries(settings.categories);
    const totalSettings = allCategories.length * 3; // 3 channels per category
    const enabledSettings = allCategories.reduce((sum, [_, prefs]) => {
      return sum + Object.values(prefs).filter(Boolean).length;
    }, 0);

    return {
      totalSettings,
      enabledSettings,
      disabledSettings: totalSettings - enabledSettings,
      percentageEnabled: Math.round((enabledSettings / totalSettings) * 100),
    };
  }, [settings.categories]);

  return {
    settings,
    stats,
    isLoading,
    error,
    updateCategoryChannel,
    updateAllChannelsForCategory,
    updateFrequency,
    unsubscribeAll,
    subscribeAll,
    unsubscribeChannel,
  };
}
