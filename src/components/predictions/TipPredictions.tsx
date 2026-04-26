"use client";

import { useState } from "react";
import { CreatorSelector } from "./CreatorSelector";
import { PredictionCharts } from "./PredictionCharts";
import { PredictionSummary } from "./PredictionSummary";
import { TimeframeSelector } from "./TimeframeSelector";
import { ModelExplanation } from "./ModelExplanation";
import { Button } from "@/components/Button";
import { ChartBarIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export type Timeframe = "7d" | "30d" | "90d" | "1y";

export interface SelectedCreator {
  username: string;
  displayName: string;
}

export function TipPredictions() {
  const [selectedCreator, setSelectedCreator] = useState<SelectedCreator | null>(null);
  const [timeframe, setTimeframe] = useState<Timeframe>("30d");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCreatorSelect = (creator: SelectedCreator) => {
    setSelectedCreator(creator);
  };

  const clearCreator = () => {
    setSelectedCreator(null);
  };

  return (
    <div className="space-y-6">
      {/* Creator Selection */}
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-ink">Select Creator for Predictions</h2>
          {selectedCreator && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCreator}
              className="text-red-600 hover:text-red-700"
            >
              Clear Selection
            </Button>
          )}
        </div>
        
        <CreatorSelector 
          onCreatorSelect={handleCreatorSelect}
          selectedCreator={selectedCreator}
        />

        {/* Selected Creator Display */}
        {selectedCreator && (
          <div className="mt-4 p-4 bg-wave/5 rounded-xl border border-wave/20">
            <div className="flex items-center gap-3">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCreator.username}`}
                alt={selectedCreator.displayName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-ink">{selectedCreator.displayName}</p>
                <p className="text-sm text-ink/60">@{selectedCreator.username}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Predictions Dashboard */}
      {selectedCreator && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <TimeframeSelector 
              timeframe={timeframe}
              onChange={setTimeframe}
            />
            <div className="flex items-center gap-2">
              <Button
                variant={showExplanation ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowExplanation(!showExplanation)}
              >
                <InformationCircleIcon className="w-4 h-4 mr-1" />
                Model Info
              </Button>
            </div>
          </div>

          {/* Model Explanation */}
          {showExplanation && (
            <ModelExplanation timeframe={timeframe} />
          )}

          {/* Prediction Summary */}
          <PredictionSummary 
            creator={selectedCreator}
            timeframe={timeframe}
          />

          {/* Prediction Charts */}
          <PredictionCharts 
            creator={selectedCreator}
            timeframe={timeframe}
          />
        </div>
      )}

      {/* Empty State */}
      {!selectedCreator && (
        <div className="text-center py-12 rounded-2xl border border-dashed border-ink/20">
          <ChartBarIcon className="w-12 h-12 mx-auto text-ink/20 mb-3" />
          <p className="text-ink/50 mb-2">Select a creator to view tip predictions</p>
          <p className="text-sm text-ink/40">
            AI-powered predictions with confidence intervals and trend analysis
          </p>
        </div>
      )}
    </div>
  );
}