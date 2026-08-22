"use client";

import { useState } from "react";
import type { FilterPreset, SavedFilter } from "@/hooks/useFilterBuilder";

interface FilterPresetsProps {
  presets: FilterPreset[];
  savedFilters: SavedFilter[];
  onApplyPreset: (preset: FilterPreset) => void;
  onLoadSaved: (saved: SavedFilter) => void;
  onDeleteSaved: (id: string) => void;
  onSaveCurrent: (name: string) => void;
  hasActiveCriteria: boolean;
}

export function FilterPresets({
  presets,
  savedFilters,
  onApplyPreset,
  onLoadSaved,
  onDeleteSaved,
  onSaveCurrent,
  hasActiveCriteria,
}: FilterPresetsProps) {
  const [saveName, setSaveName] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);

  const handleSave = () => {
    if (!saveName.trim()) return;
    onSaveCurrent(saveName);
    setSaveName("");
    setShowSaveInput(false);
  };

  return (
    <div className="space-y-3">
      {/* Built-in presets */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/40">Presets</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className="rounded-full border border-ink/10 bg-[color:var(--surface)] px-3 py-1 text-sm text-ink hover:border-wave hover:text-wave transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Saved filters */}
      {savedFilters.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/40">Saved</p>
          <div className="flex flex-wrap gap-2">
            {savedFilters.map((saved) => (
              <span key={saved.id} className="inline-flex items-center gap-1 rounded-full border border-wave/30 bg-wave/5 px-3 py-1 text-sm">
                <button
                  type="button"
                  onClick={() => onLoadSaved(saved)}
                  className="text-wave hover:text-wave/80 transition-colors"
                >
                  {saved.name}
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteSaved(saved.id)}
                  className="ml-0.5 rounded-full p-0.5 text-ink/30 hover:text-red-500 transition-colors"
                  aria-label={`Delete saved filter "${saved.name}"`}
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Save current */}
      {hasActiveCriteria && (
        <div>
          {showSaveInput ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") setShowSaveInput(false); }}
                placeholder="Filter name…"
                autoFocus
                className="rounded-lg border border-ink/10 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
              />
              <button
                type="button"
                onClick={handleSave}
                disabled={!saveName.trim()}
                className="rounded-lg bg-wave px-3 py-1.5 text-sm font-medium text-white hover:bg-wave/90 disabled:opacity-50 transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowSaveInput(false)}
                className="text-sm text-ink/50 hover:text-ink transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowSaveInput(true)}
              className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-wave transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save current filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}
