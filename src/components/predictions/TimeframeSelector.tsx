"use client";

import { Button } from "@/components/Button";
import type { Timeframe } from "./TipPredictions";

interface TimeframeSelectorProps {
  timeframe: Timeframe;
  onChange: (timeframe: Timeframe) => void;
}

const timeframeOptions = [
  { value: "7d" as Timeframe, label: "7 Days", description: "Short-term predictions" },
  { value: "30d" as Timeframe, label: "30 Days", description: "Monthly forecast" },
  { value: "90d" as Timeframe, label: "90 Days", description: "Quarterly outlook" },
  { value: "1y" as Timeframe, label: "1 Year", description: "Long-term trends" },
];

export function TimeframeSelector({ timeframe, onChange }: TimeframeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-ink/70 mr-2">Prediction Period:</span>
      {timeframeOptions.map((option) => (
        <Button
          key={option.value}
          variant={timeframe === option.value ? "default" : "ghost"}
          size="sm"
          onClick={() => onChange(option.value)}
          className="relative group"
        >
          {option.label}
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-ink text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {option.description}
          </div>
        </Button>
      ))}
    </div>
  );
}