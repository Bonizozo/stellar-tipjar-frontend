"use client";

import { 
  InformationCircleIcon,
  ChartBarIcon,
  ClockIcon,
  CpuChipIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import type { Timeframe } from "./TipPredictions";

interface ModelExplanationProps {
  timeframe: Timeframe;
}

export function ModelExplanation({ timeframe }: ModelExplanationProps) {
  const modelDetails = {
    "7d": {
      model: "ARIMA + Random Forest",
      accuracy: "87%",
      features: ["Recent tip patterns", "Day of week effects", "Creator activity"],
      updateFrequency: "Every 6 hours",
      dataPoints: "Last 90 days"
    },
    "30d": {
      model: "LSTM Neural Network",
      accuracy: "82%", 
      features: ["Historical trends", "Seasonal patterns", "Creator engagement", "Market conditions"],
      updateFrequency: "Daily",
      dataPoints: "Last 365 days"
    },
    "90d": {
      model: "Ensemble (LSTM + XGBoost)",
      accuracy: "78%",
      features: ["Long-term trends", "Creator growth", "Platform metrics", "External factors"],
      updateFrequency: "Weekly",
      dataPoints: "All historical data"
    },
    "1y": {
      model: "Prophet + Regression",
      accuracy: "71%",
      features: ["Yearly cycles", "Growth trajectories", "Platform evolution", "Market trends"],
      updateFrequency: "Monthly", 
      dataPoints: "All historical data"
    }
  };

  const details = modelDetails[timeframe];

  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6">
      <div className="flex items-start gap-3">
        <InformationCircleIcon className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            AI Model Information - {timeframe.toUpperCase()} Predictions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CpuChipIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Model Architecture</h4>
                  <p className="text-sm text-blue-700">{details.model}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Accuracy: {details.accuracy} (validated on historical data)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ChartBarIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Key Features</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {details.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ClockIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Model Updates</h4>
                  <p className="text-sm text-blue-700">
                    Frequency: {details.updateFrequency}
                  </p>
                  <p className="text-sm text-blue-700">
                    Training Data: {details.dataPoints}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900">Important Notes</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Predictions are estimates based on historical patterns</li>
                    <li>• Accuracy decreases for longer time horizons</li>
                    <li>• External events may impact actual results</li>
                    <li>• New creators have lower prediction confidence</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">How It Works</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              Our AI models analyze historical tip patterns, creator behavior, and platform trends to generate predictions. 
              The system uses ensemble methods combining multiple algorithms to improve accuracy. Confidence intervals 
              represent the uncertainty in predictions, with wider intervals indicating higher uncertainty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}