"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeftIcon, SwatchIcon } from "@heroicons/react/24/outline";
import { ThemeSelector } from "@/components/profile/ThemeSelector";
import { ColorPicker } from "@/components/profile/ColorPicker";
import { LayoutSelector } from "@/components/profile/LayoutSelector";
import { BannerUpload } from "@/components/upload/BannerUpload";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/Button";
import {
  ProfileCustomizationValues,
  ProfileTheme,
  ProfileLayout,
  defaultProfileCustomization,
} from "@/schemas/profileCustomization";

interface ProfileCustomizationProps {
  initialValues?: Partial<ProfileCustomizationValues>;
  onSave: (values: ProfileCustomizationValues) => Promise<void>;
  previewData?: {
    displayName: string;
    username: string;
    bio: string;
    avatarUrl: string;
  };
}

async function uploadBanner(file: File): Promise<string> {
  await new Promise((r) => setTimeout(r, 800));
  return URL.createObjectURL(file);
}

function ProfilePreview({
  values,
  displayName,
  username,
  bio,
  avatarUrl,
}: {
  values: ProfileCustomizationValues;
  displayName: string;
  username: string;
  bio: string;
  avatarUrl: string;
}) {
  const styles = getPreviewStyles(values);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border shadow-2xl transition-all"
      style={{
        backgroundColor: styles.background,
        borderColor: styles.border,
      }}
    >
      {values.bannerUrl && (
        <div
          className="h-32 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${values.bannerUrl})` }}
        />
      )}
      <div className={`p-6 ${values.layout === "left" ? "" : values.layout === "compact" ? "text-center" : "text-center"}`}>
        <div
          className={`mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full ring-4 ${
            values.layout === "left" ? "mx-0" : "mx-auto"
          }`}
          style={{ ringColor: styles.accent }}
        >
          <OptimizedImage src={avatarUrl} alt={displayName} fill sizes="80px" />
        </div>
        <h3 className="text-xl font-bold" style={{ color: styles.text }}>
          {displayName}
        </h3>
        <p className="text-sm" style={{ color: styles.secondary }}>
          @{username}
        </p>
        {bio && (
          <p className="mt-2 text-sm" style={{ color: styles.textMuted }}>
            {bio}
          </p>
        )}
        <div className="mt-4 flex justify-center gap-2">
          <Button size="sm" style={{ backgroundColor: styles.accent, borderColor: styles.accent }}>
            Tip this creator
          </Button>
        </div>
      </div>
    </div>
  );
}

function getPreviewStyles(values: ProfileCustomizationValues) {
  const themeColors: Record<ProfileTheme, { bg: string; border: string; text: string; secondary: string; muted: string }> = {
    default: { bg: "#ffffff", border: "#e5e7eb", text: "#151515", secondary: "#6b7280", muted: "#6b7280" },
    dark: { bg: "#1e1e2e", border: "#313244", text: "#cdd6f4", secondary: "#a6adc8", muted: "#9399b2" },
    light: { bg: "#fafafa", border: "#e5e7eb", text: "#18181b", secondary: "#71717a", muted: "#71717a" },
    ocean: { bg: "#f0f9ff", border: "#bae6fd", text: "#164e63", secondary: "#0891b2", muted: "#0e7490" },
    sunset: { bg: "#fff7ed", border: "#fed7aa", text: "#7c2d12", secondary: "#ea580c", muted: "#c2410c" },
    forest: { bg: "#f0fdf4", border: "#bbf7d0", text: "#14532d", secondary: "#16a34a", muted: "#15803d" },
    midnight: { bg: "#172554", border: "#1e3a8a", text: "#e0e7ff", secondary: "#818cf8", muted: "#6366f1" },
  };

  const theme = themeColors[values.theme] || themeColors.default;
  return {
    background: values.theme === "default" ? values.backgroundColor : theme.bg,
    border: theme.border,
    text: values.theme === "default" ? textColor(values.accentColor) : theme.text,
    secondary: theme.secondary,
    accent: values.theme === "default" ? values.accentColor : undefined,
    textMuted: theme.muted,
  };
}

function textColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 128 ? "#151515" : "#ffffff";
}

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

export function ProfileCustomization({
  initialValues,
  onSave,
  previewData = {
    displayName: "Demo Creator",
    username: "democreator",
    bio: "Welcome to my creator page!",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
  },
}: ProfileCustomizationProps) {
  const [values, setValues] = useState<ProfileCustomizationValues>({
    ...defaultProfileCustomization,
    ...initialValues,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof ProfileCustomizationValues>(
    key: K,
    value: ProfileCustomizationValues[K]
  ) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(values);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink/5 to-transparent">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <motion.div {...fadeUp} className="mb-8">
          <Link
            href="/settings"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-wave hover:text-wave/80"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Settings
          </Link>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-ink">
            <SwatchIcon className="h-8 w-8 text-wave" />
            Profile Customization
          </h1>
          <p className="mt-1 text-sm text-ink/60">Customize your public creator profile</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="space-y-6">
            <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
              <ThemeSelector
                value={values.theme}
                onChange={(theme) => update("theme", theme)}
              />
            </div>

            <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
              <ColorPicker
                label="Accent color"
                value={values.accentColor}
                onChange={(color) => update("accentColor", color)}
              />
            </div>

            <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
              <ColorPicker
                label="Secondary color"
                value={values.secondaryColor}
                onChange={(color) => update("secondaryColor", color)}
              />
            </div>

            <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
              <ColorPicker
                label="Background color"
                value={values.backgroundColor}
                onChange={(color) => update("backgroundColor", color)}
              />
            </div>

            <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
              <LayoutSelector
                value={values.layout}
                onChange={(layout) => update("layout", layout)}
              />
            </div>

            <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
              <h2 className="mb-4 text-base font-semibold text-ink">Banner image</h2>
              <BannerUpload
                currentSrc={values.bannerUrl}
                onUpload={uploadBanner}
                onRemove={() => update("bannerUrl", "")}
              />
            </div>

            <Button variant="primary" size="lg" onClick={handleSave} loading={saving}>
              Save Changes
            </Button>
            {saved && (
              <span className="text-sm text-emerald-600">✓ Changes saved successfully</span>
            )}
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <div className="sticky top-8">
              <h2 className="mb-4 text-base font-semibold text-ink">Live Preview</h2>
              <ProfilePreview
                values={values}
                displayName={previewData.displayName}
                username={previewData.username}
                bio={previewData.bio}
                avatarUrl={previewData.avatarUrl}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}