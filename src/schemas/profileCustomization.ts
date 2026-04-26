import { z } from "zod";

export type ProfileTheme = "default" | "dark" | "light" | "ocean" | "sunset" | "forest" | "midnight";

export type ProfileLayout = "centered" | "left" | "compact";

export const profileThemeOptions: { value: ProfileTheme; label: string; colors: [string, string, string] }[] = [
  { value: "default", label: "Default", colors: ["#8b5cf6", "#0ea5e9", "#151515"] },
  { value: "dark", label: "Dark", colors: ["#1e1e2e", "#89b4fa", "#cdd6f4"] },
  { value: "light", label: "Light", colors: ["#ffffff", "#0ea5e9", "#151515"] },
  { value: "ocean", label: "Ocean", colors: ["#0ea5e9", "#06b6d4", "#164e63"] },
  { value: "sunset", label: "Sunset", colors: ["#f97316", "#ec4899", "#831843"] },
  { value: "forest", label: "Forest", colors: ["#22c55e", "#84cc16", "#365314"] },
  { value: "midnight", label: "Midnight", colors: ["#1e3a8a", "#6366f1", "#0f172a"] },
];

export const profileLayoutOptions: { value: ProfileLayout; label: string; description: string }[] = [
  { value: "centered", label: "Centered", description: "Avatar and info centered" },
  { value: "left", label: "Left aligned", description: "Traditional left-aligned layout" },
  { value: "compact", label: "Compact", description: "Minimal space, stacked info" },
];

export const profileCustomizationSchema = z.object({
  theme: z.nativeEnum(ProfileTheme).default("default"),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color").default("#8b5cf6"),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color").default("#0ea5e9"),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color").default("#ffffff"),
  bannerUrl: z.string().url().optional().default(""),
  layout: z.nativeEnum(ProfileLayout).default("centered"),
});

export type ProfileCustomizationValues = z.infer<typeof profileCustomizationSchema>;

export const defaultProfileCustomization: ProfileCustomizationValues = {
  theme: "default",
  accentColor: "#8b5cf6",
  secondaryColor: "#0ea5e9",
  backgroundColor: "#ffffff",
  bannerUrl: "",
  layout: "centered",
};