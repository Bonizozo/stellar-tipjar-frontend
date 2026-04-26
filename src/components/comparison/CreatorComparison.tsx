"use client";

import { useState } from "react";
import { CreatorSelector } from "./CreatorSelector";
import { ComparisonTable } from "./ComparisonTable";
import { ComparisonCharts } from "./ComparisonCharts";
import { ExportButton } from "./ExportButton";
import { Button } from "@/components/Button";
import { TrashIcon } from "@heroicons/react/24/outline";

export interface SelectedCreator {
  username: string;
  displayName: string;
}

export function CreatorComparison() {
  const [selectedCreators, setSelectedCreators] = useState<SelectedCreator[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "charts">("table");

  const addCreator = (creator: SelectedCreator) => {
    if (selectedCreators.length >= 4) return; // Limit to 4 creators
    if (selectedCreators.some(c => c.username === creator.username)) return;
    setSelectedCreators([...selectedCreators, creator]);
  };

  const removeCreator = (username: string) => {
    setSelectedCreators(selectedCreators.filter(c => c.username !== username));
  };

  const clearAll = () => {
    setSelectedCreators([]);
  };

  return (
    <div className="space-y-6">
      {/* Creator Selection */}
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-ink">Select Creators to Compare</h2>
          {selectedCreators.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-red-600 hover:text-red-700"
            >
              <TrashIcon className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
        
        <CreatorSelector 
          onCreatorSelect={addCreator}
          selectedCreators={selectedCreators}
          maxSelections={4}
        />

        {/* Selected Creators */}
        {selectedCreators.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-ink/70 mb-2">
              Selected ({selectedCreators.length}/4):
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedCreators.map((creator) => (
                <div
                  key={creator.username}
                  className="flex items-center gap-2 px-3 py-1 bg-wave/10 text-wave rounded-full text-sm"
                >
                  <span>{creator.displayName}</span>
                  <button
                    onClick={() => removeCreator(creator.username)}
                    className="text-wave/60 hover:text-wave"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comparison Results */}
      {selectedCreators.length >= 2 && (
        <div className="space-y-6">
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                Table View
              </Button>
              <Button
                variant={viewMode === "charts" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("charts")}
              >
                Charts View
              </Button>
            </div>
            <ExportButton creators={selectedCreators} />
          </div>

          {/* Comparison Content */}
          {viewMode === "table" ? (
            <ComparisonTable creators={selectedCreators} />
          ) : (
            <ComparisonCharts creators={selectedCreators} />
          )}
        </div>
      )}

      {/* Empty State */}
      {selectedCreators.length < 2 && (
        <div className="text-center py-12 rounded-2xl border border-dashed border-ink/20">
          <p className="text-ink/50 mb-2">Select at least 2 creators to start comparing</p>
          <p className="text-sm text-ink/40">
            You can compare up to 4 creators at once
          </p>
        </div>
      )}
    </div>
  );
}