"use client";

import { useState } from "react";
import type { PressKit, SocialLink } from "@/services/pressKitService";
import { Button } from "@/components/Button";

interface Props {
  kit: PressKit;
  onChange: (updates: Partial<PressKit>) => void;
}

const TEMPLATES: PressKit["template"][] = ["minimal", "professional", "creative"];
const ACCENT_COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export function PressKitCustomizer({ kit, onChange }: Props) {
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");

  function addSocialLink() {
    if (!newPlatform.trim() || !newUrl.trim()) return;
    onChange({ socialLinks: [...kit.socialLinks, { platform: newPlatform.trim(), url: newUrl.trim() }] });
    setNewPlatform("");
    setNewUrl("");
  }

  function removeSocialLink(index: number) {
    onChange({ socialLinks: kit.socialLinks.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-6">
      {/* Template */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-2">Template</label>
        <div className="flex gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t}
              onClick={() => onChange({ template: t })}
              className={`rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                kit.template === t
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                  : "border-ink/20 text-ink/70 hover:border-ink/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-2">Accent Color</label>
        <div className="flex gap-2 flex-wrap">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => onChange({ accentColor: color })}
              className={`h-8 w-8 rounded-full border-2 transition-transform ${
                kit.accentColor === color ? "scale-110 border-ink" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
          <input
            type="color"
            value={kit.accentColor}
            onChange={(e) => onChange({ accentColor: e.target.value })}
            className="h-8 w-8 cursor-pointer rounded-full border border-ink/20"
            aria-label="Custom color"
          />
        </div>
      </div>

      {/* Custom Message */}
      <div>
        <label htmlFor="custom-message" className="block text-sm font-semibold text-ink mb-2">
          Message to Press
        </label>
        <textarea
          id="custom-message"
          rows={3}
          value={kit.customMessage}
          onChange={(e) => onChange({ customMessage: e.target.value })}
          placeholder="Add a personal note for press and media..."
          className="w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900"
        />
      </div>

      {/* Social Links */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-2">Social Links</label>
        <ul className="space-y-2 mb-3">
          {kit.socialLinks.map(({ platform, url }, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="w-24 font-medium text-ink/70">{platform}</span>
              <span className="flex-1 truncate text-ink/60">{url}</span>
              <button
                onClick={() => removeSocialLink(i)}
                className="text-red-500 hover:text-red-700 text-xs"
                aria-label={`Remove ${platform}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value)}
            placeholder="Platform"
            className="w-28 rounded-lg border border-ink/20 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900"
          />
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1 rounded-lg border border-ink/20 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900"
          />
          <Button onClick={addSocialLink} variant="ghost">Add</Button>
        </div>
      </div>
    </div>
  );
}
