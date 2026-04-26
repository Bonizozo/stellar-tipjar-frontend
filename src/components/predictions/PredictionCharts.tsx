"use client";

import { useMemo } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  ComposedChart,
  Bar,
  ReferenceLine
} from "recharts";
import { useTipPredictions } from "@/hooks/queries/useTipPredictions";
import { useCreatorStats } from "@/hooks/queries/useCreatorStats";
import type { SelectedCreator, Timeframe } from "./TipPredictions";

interface PredictionChartsProps {
  creator: SelectedCreator;
  timeframe: Timeframe;
}

export function PredictionCharts({ creator, timeframe }: PredictionChartsProps) {
  const { data: predictions, isPending: predictionsPending } = useTipPredictions(creator.username, timeframe);
  const { data: historicalStats } = useCreatorStats(creator.username);

  const chartData = useMemo(() => {
    if (!predictions || !historicalStats) return [];

    // Combine historical and predicted data
    const historical = historicalStats.tipHistory.slice(-30).map((item, index) => ({
      date: item.date,
      historical: item.amount,
      predicted: null,
      confidenceUpper: null,
      confidenceLower: null,
      isHistorical: true,
      dayIndex: index - 30
    }));

    const predicted = predictions.timeline.map((item, index) => ({
      date: item.date,
      historical: null,
      predicted: item.predicted,
      confidenceUpper: item.confidenceUpper,
      confidenceLower: item.confidenceLower,
      isHistorical: false,
      dayIndex: index
    }));

    return [...historical, ...predicted];
  }, [predictions, historicalStats]);

  if (predictionsPending) {
    return (
      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-ink/10 bg-white/70 p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-ink/10 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-ink/10 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!predictions) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 text-center">
        <p className="text-ink/50">Unable to load prediction charts</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Prediction Chart */}
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
        <h3 className="text-lg font-semibold text-ink mb-4">
          Tip Amount Predictions with Confidence Intervals
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              formatter={(value: number, name: string) => {
                if (name === 'historical') return [`${value?.toFixed(2)} XLM`, 'Historical'];
                if (name === 'predicted') return [`${value?.toFixed(2)} XLM`, 'Predicted'];
                if (name === 'confidenceUpper') return [`${value?.toFixed(2)} XLM`, 'Upper Bound'];
                if (name === 'confidenceLower') return [`${value?.toFixed(2)} XLM`, 'Lower Bound'];
                return [value, name];
              }}
            />
            
            {/* Confidence Interval Area */}
            <Area
              type="monotone"
              dataKey="confidenceUpper"
              stroke="none"
              fill="#8b5cf6"
              fillOpacity={0.1}
            />
            <Area
              type="monotone"
              dataKey="confidenceLower"
              stroke="none"
              fill="#8b5cf6"
              fillOpacity={0.1}
            />
            
            {/* Historical Data Line */}
            <Line
              type="monotone"
              dataKey="historical"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls={false}
            />
            
            {/* Predicted Data Line */}
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              connectNulls={false}
            />
            
            {/* Reference line to separate historical from predicted */}
            <ReferenceLine x={new Date().toISOString().split('T')[0]} stroke="#ef4444" strokeDasharray="2 2" />
          </ComposedChart>
        </ResponsiveContainer>
        
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded"></div>
            <span>Historical Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>Predictions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-200 rounded"></div>
            <span>Confidence Interval</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-red-500"></div>
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Trend Analysis Chart */}
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
        <h3 className="text-lg font-semibold text-ink mb-4">
          Trend Analysis & Seasonality
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={predictions.trendAnalysis}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="period" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            
            <Bar dataKey="baseline" fill="#e5e7eb" name="Baseline" />
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#10b981"
              strokeWidth={3}
              name="Trend"
            />
            <Line
              type="monotone"
              dataKey="seasonal"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="3 3"
              name="Seasonal Pattern"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Feature Importance */}
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
        <h3 className="text-lg font-semibold text-ink mb-4">
          Prediction Factors (Feature Importance)
        </h3>
        <div className="space-y-3">
          {predictions.featureImportance.map((feature, index) => (
            <div key={feature.name} className="flex items-center gap-3">
              <div className="w-32 text-sm text-ink/70 font-medium">
                {feature.name}
              </div>
              <div className="flex-1 bg-ink/10 rounded-full h-2">
                <div 
                  className="bg-wave h-2 rounded-full transition-all duration-500"
                  style={{ width: `${feature.importance * 100}%` }}
                />
              </div>
              <div className="w-12 text-sm font-medium text-ink text-right">
                {(feature.importance * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}