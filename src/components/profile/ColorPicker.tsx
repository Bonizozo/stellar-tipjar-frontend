"use client";

import { useState, useCallback } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const PRESET_COLORS = [
  "#8b5cf6", "#7c3aed", "#6d28d9",
  "#0ea5e9", "#0284c7", "#0369a1",
  "#10b981", "#059669", "#047857",
  "#f97316", "#ea580c", "#c2410c",
  "#ef4444", "#dc2626", "#b91c1c",
  "#ec4899", "#db2777", "#be185d",
  "#6366f1", "#4f46e5", "#4338ca",
  "#84cc16", "#65a30d", "#4d7c0f",
  "#151515", "#374151", "#6b7280",
  "#ffffff", "#f3f4f6", "#e5e7eb",
];

function HexInput({ value, onChange }: { value: string; onChange: (color: string) => void }) {
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = useCallback(() => {
    const hex = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex.toLowerCase());
    } else {
      setInputValue(value);
    }
  }, [inputValue, onChange, value]);

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={(e) => e.key === "Enter" && handleBlur()}
        maxLength={7}
        className="w-24 rounded-lg border border-ink/20 px-2 py-1.5 text-sm font-mono uppercase text-ink focus:border-wave focus:outline-none focus:ring-1 focus:ring-wave"
        placeholder="#000000"
      />
    </div>
  );
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-ink">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-10 cursor-pointer rounded-lg border border-ink/20 p-1"
          />
          <CheckIcon className="pointer-events-none absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white" />
        </div>
        <HexInput value={value} onChange={onChange} />
      </div>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`h-6 w-6 rounded-md transition-transform hover:scale-110 ${
              value.toLowerCase() === color.toLowerCase() ? "ring-2 ring-offset-2 ring-wave" : ""
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select ${color}`}
          />
        ))}
      </div>
    </div>
  );
}