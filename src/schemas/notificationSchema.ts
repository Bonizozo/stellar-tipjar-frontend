import { z } from "zod";

// Channel types
export const notificationChannelSchema = z.enum(["email", "push", "inApp"]);
export type NotificationChannel = z.infer<typeof notificationChannelSchema>;

// Category types
export const notificationCategorySchema = z.enum([
  "tips",
  "comments",
  "followers",
  "messages",
  "updates",
  "promotions",
]);
export type NotificationCategory = z.infer<typeof notificationCategorySchema>;

// Frequency types
export const notificationFrequencySchema = z.enum(["instant", "daily", "weekly", "never"]);
export type NotificationFrequency = z.infer<typeof notificationFrequencySchema>;

// Channel preferences schema
export const channelPreferencesSchema = z.object({
  email: z.boolean(),
  push: z.boolean(),
  inApp: z.boolean(),
});
export type ChannelPreferences = z.infer<typeof channelPreferencesSchema>;

// Category preferences schema
export const categoryPreferencesSchema = z.object({
  tips: channelPreferencesSchema,
  comments: channelPreferencesSchema,
  followers: channelPreferencesSchema,
  messages: channelPreferencesSchema,
  updates: channelPreferencesSchema,
  promotions: channelPreferencesSchema,
});
export type CategoryPreferences = z.infer<typeof categoryPreferencesSchema>;

// Full notification settings schema
export const notificationSettingsSchema = z.object({
  categories: categoryPreferencesSchema,
  frequency: z.object({
    email: notificationFrequencySchema,
    push: notificationFrequencySchema,
    inApp: notificationFrequencySchema,
  }),
  unsubscribeToken: z.string().optional(),
  updatedAt: z.string().datetime(),
});
export type NotificationSettings = z.infer<typeof notificationSettingsSchema>;

// Update preferences request schema
export const updateCategoryChannelSchema = z.object({
  category: notificationCategorySchema,
  channel: notificationChannelSchema,
  value: z.boolean(),
});
export type UpdateCategoryChannelRequest = z.infer<typeof updateCategoryChannelSchema>;

// Update frequency request schema
export const updateFrequencySchema = z.object({
  channel: z.enum(["email", "push"]),
  frequency: notificationFrequencySchema,
});
export type UpdateFrequencyRequest = z.infer<typeof updateFrequencySchema>;

// Notification template schema
export const notificationTemplateSchema = z.object({
  id: z.string(),
  category: notificationCategorySchema,
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});
export type NotificationTemplate = z.infer<typeof notificationTemplateSchema>;

// API response schema
export const notificationAPIResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  settings: notificationSettingsSchema.optional(),
  error: z.string().optional(),
});
export type NotificationAPIResponse = z.infer<typeof notificationAPIResponseSchema>;

// Unsubscribe link schema
export const unsubscribeLinkSchema = z.object({
  token: z.string(),
  channel: notificationChannelSchema,
  category: notificationCategorySchema.optional(),
  allCategories: z.boolean().optional(),
});
export type UnsubscribeLink = z.infer<typeof unsubscribeLinkSchema>;

// Email template schema
export const emailNotificationSchema = z.object({
  to: z.string().email(),
  category: notificationCategorySchema,
  subject: z.string(),
  template: z.string(),
  data: z.record(z.any()),
  includeUnsubscribeLink: z.boolean().optional().default(true),
});
export type EmailNotification = z.infer<typeof emailNotificationSchema>;

// Notification history schema
export const notificationHistorySchema = z.object({
  id: z.string(),
  category: notificationCategorySchema,
  channel: notificationChannelSchema,
  timestamp: z.string().datetime(),
  read: z.boolean(),
  title: z.string(),
  description: z.string(),
});
export type NotificationHistory = z.infer<typeof notificationHistorySchema>;

// Category info schema
export const categoryInfoSchema = z.object({
  id: notificationCategorySchema,
  label: z.string(),
  description: z.string(),
  icon: z.string(),
  defaultEnabled: z.boolean(),
});
export type CategoryInfo = z.infer<typeof categoryInfoSchema>;

// Notification preferences validation helper
export const validateNotificationSettings = (data: unknown) => {
  return notificationSettingsSchema.safeParse(data);
};

// Generate unsubscribe token
export const generateUnsubscribeToken = (): string => {
  const part1 = Math.random().toString(36).slice(2, 11);
  const part2 = Math.random().toString(36).slice(2, 11);
  const part3 = Math.random().toString(36).slice(2, 11);
  return `token_${Date.now()}_${part1}${part2}${part3}`;
};
