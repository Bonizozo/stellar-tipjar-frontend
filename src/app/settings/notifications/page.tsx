"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BellIcon,
  LockClosedIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useNotificationPrefs } from "@/hooks/useNotificationPrefs";
import { NotificationCategory } from "@/components/NotificationCategory";
import { NotificationFrequency } from "@/components/NotificationFrequency";
import { NotificationStats } from "@/components/NotificationStats";
import { Button } from "@/components/Button";
import { notificationService } from "@/services/notificationService";
import { useState, useEffect } from "react";

type NotificationChannel = "email" | "push" | "inApp";
type NotificationFrequency = "instant" | "daily" | "weekly" | "never";

interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export default function NotificationSettingsPage() {
  const {
    settings,
    updateCategoryChannel,
    updateAllChannelsForCategory,
    updateFrequency,
    subscribeAll,
    unsubscribeAll,
    stats,
    isLoading,
    error,
  } = useNotificationPrefs();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<NotificationChannel>("email");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Load categories
    notificationService.getCategories().then(setCategories);
  }, []);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await notificationService.updateNotificationSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (confirm("Are you sure? This will reset all notifications to default settings.")) {
      setIsSaving(true);
      try {
        await notificationService.resetToDefaults();
        window.location.reload();
      } catch (err) {
        setSaveError(
          err instanceof Error ? err.message : "Failed to reset settings"
        );
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <BellIcon className="h-8 w-8 text-wave" />
        </div>
      </div>
    );
  }

  const enabledChannels = (["email", "push", "inApp"] as const).filter(
    (ch) =>
      Object.values(settings.categories).some(
        (cat) => cat[ch]
      )
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink/5 to-transparent">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/settings" className="inline-flex items-center gap-2 text-wave hover:text-wave/80 mb-4">
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Settings</span>
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-ink flex items-center gap-3">
                <BellIcon className="h-10 w-10 text-wave" />
                Notification Preferences
              </h1>
              <p className="text-ink/60 mt-2">
                Manage how and when you receive notifications across all channels
              </p>
            </div>
          </div>
        </motion.div>

        {/* Status Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}
        {saveError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
          >
            {saveError}
          </motion.div>
        )}
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm"
          >
            ✓ Settings saved successfully
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <NotificationStats
            totalSettings={stats.totalSettings}
            enabledSettings={stats.enabledSettings}
            disabledSettings={stats.disabledSettings}
            categoriesEnabled={
              Object.values(settings.categories).filter((cat) =>
                Object.values(cat).some((v) => v)
              ).length
            }
            totalCategories={6}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex gap-3 flex-wrap"
        >
          <Button
            onClick={subscribeAll}
            variant="primary"
            disabled={isSaving}
          >
            Enable All
          </Button>
          <Button
            onClick={unsubscribeAll}
            variant="secondary"
            disabled={isSaving}
          >
            Disable All
          </Button>
          <Button
            onClick={handleResetDefaults}
            variant="tertiary"
            disabled={isSaving}
          >
            Reset to Defaults
          </Button>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* Categories Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-wave" />
              Notification Categories
            </h2>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <NotificationCategory
                    id={category.id}
                    title={category.name}
                    description={category.description}
                    icon={category.icon}
                    preferences={settings.categories[category.id as keyof typeof settings.categories]}
                    onUpdate={(channel, value) =>
                      updateCategoryChannel(
                        category.id as keyof typeof settings.categories,
                        channel,
                        value
                      )
                    }
                    onToggleAll={(value) =>
                      updateAllChannelsForCategory(
                        category.id as keyof typeof settings.categories,
                        value
                      )
                    }
                    isEnabled={Object.values(
                      settings.categories[category.id as keyof typeof settings.categories]
                    ).some((v) => v)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Frequency Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <NotificationFrequency
              channel="email"
              frequency={settings.frequency.email as NotificationFrequency}
              onChange={(freq) => updateFrequency("email", freq)}
            />
            <NotificationFrequency
              channel="push"
              frequency={settings.frequency.push as NotificationFrequency}
              onChange={(freq) => updateFrequency("push", freq)}
            />
            <NotificationFrequency
              channel="inApp"
              frequency={settings.frequency.inApp as NotificationFrequency}
              onChange={(freq) => updateFrequency("inApp", freq)}
            />
          </motion.div>
        </div>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <LockClosedIcon className="h-5 w-5 text-wave flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-ink mb-2">Your Privacy Matters</h3>
              <p className="text-sm text-ink/70">
                Your notification preferences are stored encrypted and never shared with third parties.
                Each notification includes an unsubscribe link for immediate control.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Save Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3 flex-wrap sticky bottom-4 bg-gradient-to-t from-[color:var(--surface)] to-transparent pt-4"
        >
          <Button
            onClick={handleSaveSettings}
            variant="primary"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Link href="/settings">
            <Button variant="ghost">Cancel</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
