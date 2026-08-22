"use client";

import { ProfileLayout, profileLayoutOptions } from "@/schemas/profileCustomization";

interface LayoutSelectorProps {
  value: ProfileLayout;
  onChange: (layout: ProfileLayout) => void;
}

export function LayoutSelector({ value, onChange }: LayoutSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-ink">Layout</label>
      <div className="grid grid-cols-3 gap-3">
        {profileLayoutOptions.map((layout) => (
          <button
            key={layout.value}
            type="button"
            onClick={() => onChange(layout.value)}
            className={`flex flex-col items-center rounded-xl border-2 p-4 transition-all ${
              value === layout.value
                ? "border-wave bg-wave/5"
                : "border-ink/10 hover:border-ink/30"
            }`}
            aria-pressed={value === layout.value}
          >
            <div className="mb-2 flex h-8 w-full gap-1">
              <div
                className={`h-full rounded-md bg-ink/20 ${
                  layout.value === "centered"
                    ? "w-8"
                    : layout.value === "left"
                    ? "w-4"
                    : "w-6"
                }`}
                style={{
                  marginLeft: layout.value === "centered" ? "calc(50% - 16px)" : layout.value === "left" ? "0" : "4px",
                }}
              />
            </div>
            <span className="text-sm font-medium text-ink">{layout.label}</span>
            <span className="text-xs text-ink/50">{layout.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}