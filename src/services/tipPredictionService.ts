import type { Timeframe } from "@/components/predictions/TipPredictions";
import type { TipPrediction } from "@/hooks/queries/useTipPredictions";

export interface ScenarioResult {
  label: string;
  multiplier: number;
  predictedAmount: number;
  predictedCount: number;
}

/** Generate optimistic / base / pessimistic scenarios from a prediction. */
export function buildScenarios(prediction: TipPrediction): ScenarioResult[] {
  return [
    { label: "Pessimistic", multiplier: 0.7, predictedAmount: prediction.predictedAmount * 0.7, predictedCount: Math.round(prediction.predictedCount * 0.7) },
    { label: "Base",        multiplier: 1.0, predictedAmount: prediction.predictedAmount,       predictedCount: prediction.predictedCount },
    { label: "Optimistic",  multiplier: 1.3, predictedAmount: prediction.predictedAmount * 1.3, predictedCount: Math.round(prediction.predictedCount * 1.3) },
  ];
}

/** Summarise trend direction from a numeric trend value (-1 to 1). */
export function trendLabel(trend: number): string {
  if (trend > 0.1) return "↑ Growing";
  if (trend < -0.1) return "↓ Declining";
  return "→ Stable";
}

/** Fetch predictions from the backend (falls back to the hook's mock). */
export async function fetchPredictions(username: string, timeframe: Timeframe): Promise<TipPrediction> {
  const res = await fetch(`/api/predictions?username=${encodeURIComponent(username)}&timeframe=${timeframe}`);
  if (!res.ok) throw new Error("Failed to fetch predictions");
  return res.json() as Promise<TipPrediction>;
}
