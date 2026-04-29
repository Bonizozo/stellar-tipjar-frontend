import type { Metadata } from "next";
import { TipPredictions } from "@/components/predictions/TipPredictions";
import { ScenarioPlanner } from "@/components/predictions/ScenarioPlanner";

export const metadata: Metadata = {
  title: "Tip Prediction Analytics - Stellar TipJar",
  description: "Predictive analytics with trend analysis, forecast charts, confidence intervals, and scenario planning.",
};

export default function PredictionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ink mb-2">Tip Prediction Analytics</h1>
        <p className="text-ink/70">
          AI-powered predictions with trend analysis, confidence intervals, and scenario planning.
        </p>
      </div>
      <TipPredictions />
      <ScenarioPlanner />
    </div>
  );
}
