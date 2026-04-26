"use client";

import { ProfileTheme, profileThemeOptions } from "@/schemas/profileCustomization";

interface ThemeSelectorProps {
  value: ProfileTheme;
  onChange: (theme: ProfileTheme) => void;
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-ink">Theme</label>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
        {profileThemeOptions.map((theme) => (
          <button
            key={theme.value}
            type="button"
            onClick={() => onChange(theme.value)}
            className={`group relative flex flex-col items-center gap-1 rounded-xl p-2 transition-all ${
              value === theme.value
                ? "ring-2 ring-offset-2 ring-wave bg-ink/5"
                : "hover:bg-ink/5"
            }`}
            aria-pressed={value === theme.value}
          >
            <div
              className="h-10 w-full rounded-lg shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${theme.colors[0]} 0%, ${theme.colors[1]} 100%)`,
              }}
            />
            <span className="text-xs font-medium text-ink">{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}