import type { Metadata } from "next";
import { TipPredictions } from "@/components/predictions/TipPredictions";
import { ScenarioPlanner } from "@/components/predictions/ScenarioPlanner";

export const metadata: Metadata = {
  title: "Tip Predictions - Stellar TipJar",
  description: "AI-powered tip predictions with trend analysis and confidence intervals.",
};

export default function PredictionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ink mb-2">Tip Predictions</h1>
        <p className="text-ink/70">
          AI-powered predictions for tip amounts and trends with confidence intervals and explanations.
        </p>
      </div>
      <TipPredictions />
      <ScenarioPlanner />
    </div>
  );
}