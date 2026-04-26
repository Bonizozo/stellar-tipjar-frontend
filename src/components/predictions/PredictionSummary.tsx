"use client";

import { 
  TrendingUpIcon, 
  TrendingDownIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { StatCard } from "@/components/StatCard";
import { useTipPredictions } from "@/hooks/queries/useTipPredictions";
import type { SelectedCreator, Timeframe } from "./TipPredictions";

interface PredictionSummaryProps {
  creator: SelectedCreator;
  timeframe: Timeframe;
}

function TrendIndicator({ trend, confidence }: { trend: number; confidence: number }) {
  const isPositive = trend > 0;
  const isNeutral = Math.abs(trend) < 0.05;
  
  if (isNeutral) {
    return (
      <div className="flex items-center gap-1 text-ink/60">
        <ArrowRightIcon className="w-4 h-4" />
        <span className="text-sm font-medium">Stable</span>
        <span className="text-xs">({(confidence * 100).toFixed(0)}% confidence)</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {isPositive ? (
        <TrendingUpIcon className="w-4 h-4" />
      ) : (
        <TrendingDownIcon className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">
        {isPositive ? 'Increasing' : 'Decreasing'} ({Math.abs(trend * 100).toFixed(1)}%)
      </span>
      <span className="text-xs opacity-70">
        ({(confidence * 100).toFixed(0)}% confidence)
      </span>
    </div>
  );
}

export function PredictionSummary({ creator, timeframe }: PredictionSummaryProps) {
  const { data: predictions, isPending, isError } = useTipPredictions(creator.username, timeframe);

  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <StatCard key={i} label="" value={0} icon={null} loading />
        ))}
      </div>
    );
  }

  if (isError || !predictions) {
    return (
      <div className="p-6 text-center rounded-2xl border border-dashed border-red-200 bg-red-50">
        <ExclamationTriangleIcon className="w-8 h-8 mx-auto text-red-400 mb-2" />
        <p className="text-red-600 font-medium">Unable to generate predictions</p>
        <p className="text-sm text-red-500 mt-1">
          Insufficient historical data or model unavailable
        </p>
      </div>
    );
  }

  const timeframeLabels = {
    "7d": "week",
    "30d": "month", 
    "90d": "quarter",
    "1y": "year"
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label={`Predicted Tips (${timeframeLabels[timeframe]})`}
          value={predictions.predictedAmount}
          suffix=" XLM"
          decimals={1}
          icon={<TrendingUpIcon className="w-6 h-6" />}
          trend={predictions.amountTrend}
          confidence={predictions.confidence}
        />
        <StatCard
          label={`Expected Tip Count`}
          value={predictions.predictedCount}
          icon={<ArrowRightIcon className="w-6 h-6" />}
          trend={predictions.countTrend}
          confidence={predictions.confidence}
        />
        <StatCard
          label={`New Supporters`}
          value={predictions.predictedNewSupporters}
          icon={<TrendingUpIcon className="w-6 h-6" />}
          trend={predictions.supportersTrend}
          confidence={predictions.confidence}
        />
      </div>

      {/* Confidence & Trends */}
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
        <h3 className="text-lg font-semibold text-ink mb-4">Prediction Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-ink mb-2">Trend Indicators</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink/70">Tip Amount:</span>
                <TrendIndicator trend={predictions.amountTrend} confidence={predictions.confidence} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink/70">Tip Frequency:</span>
                <TrendIndicator trend={predictions.countTrend} confidence={predictions.confidence} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink/70">Supporter Growth:</span>
                <TrendIndicator trend={predictions.supportersTrend} confidence={predictions.confidence} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-ink mb-2">Confidence Intervals</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink/70">Amount Range:</span>
                <span className="text-sm font-medium text-ink">
                  {predictions.confidenceInterval.amount.lower.toFixed(1)} - {predictions.confidenceInterval.amount.upper.toFixed(1)} XLM
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink/70">Count Range:</span>
                <span className="text-sm font-medium text-ink">
                  {predictions.confidenceInterval.count.lower} - {predictions.confidenceInterval.count.upper} tips
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink/70">Model Accuracy:</span>
                <span className="text-sm font-medium text-wave">
                  {(predictions.confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}