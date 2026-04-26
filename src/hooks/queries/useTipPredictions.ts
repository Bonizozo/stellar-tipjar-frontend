import { useQuery } from "@tanstack/react-query";
import type { Timeframe } from "@/components/predictions/TipPredictions";

export interface TipPrediction {
  predictedAmount: number;
  predictedCount: number;
  predictedNewSupporters: number;
  confidence: number;
  amountTrend: number;
  countTrend: number;
  supportersTrend: number;
  confidenceInterval: {
    amount: { lower: number; upper: number };
    count: { lower: number; upper: number };
  };
  timeline: Array<{
    date: string;
    predicted: number;
    confidenceUpper: number;
    confidenceLower: number;
  }>;
  trendAnalysis: Array<{
    period: string;
    baseline: number;
    trend: number;
    seasonal: number;
  }>;
  featureImportance: Array<{
    name: string;
    importance: number;
  }>;
}

// Mock prediction function - replace with actual API call
async function getTipPredictions(username: string, timeframe: Timeframe): Promise<TipPrediction> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock predictions based on timeframe
  const baseAmount = Math.random() * 500 + 100;
  const confidence = Math.max(0.6, 1 - (timeframe === "1y" ? 0.3 : timeframe === "90d" ? 0.2 : 0.1));
  
  const timeframeDays = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "1y": 365
  };
  
  const days = timeframeDays[timeframe];
  
  // Generate timeline data
  const timeline = [];
  for (let i = 0; i < Math.min(days, 30); i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    const predicted = baseAmount * (1 + Math.sin(i * 0.2) * 0.1) * (1 + i * 0.01);
    const variance = predicted * (1 - confidence) * 0.5;
    
    timeline.push({
      date: date.toISOString().split('T')[0],
      predicted: predicted,
      confidenceUpper: predicted + variance,
      confidenceLower: Math.max(0, predicted - variance)
    });
  }
  
  // Generate trend analysis
  const periods = timeframe === "7d" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] :
                 timeframe === "30d" ? ["Week 1", "Week 2", "Week 3", "Week 4"] :
                 timeframe === "90d" ? ["Month 1", "Month 2", "Month 3"] :
                 ["Q1", "Q2", "Q3", "Q4"];
  
  const trendAnalysis = periods.map((period, index) => ({
    period,
    baseline: baseAmount * 0.8,
    trend: baseAmount * (1 + index * 0.1),
    seasonal: baseAmount * (1 + Math.sin(index) * 0.2)
  }));
  
  // Feature importance
  const features = [
    { name: "Historical Patterns", importance: 0.35 },
    { name: "Creator Activity", importance: 0.25 },
    { name: "Day of Week", importance: 0.15 },
    { name: "Seasonal Trends", importance: 0.12 },
    { name: "Platform Growth", importance: 0.08 },
    { name: "External Factors", importance: 0.05 }
  ];
  
  return {
    predictedAmount: baseAmount,
    predictedCount: Math.round(baseAmount / 10),
    predictedNewSupporters: Math.round(baseAmount / 50),
    confidence,
    amountTrend: (Math.random() - 0.5) * 0.4, // -20% to +20%
    countTrend: (Math.random() - 0.5) * 0.3,
    supportersTrend: (Math.random() - 0.5) * 0.2,
    confidenceInterval: {
      amount: {
        lower: baseAmount * (1 - (1 - confidence) * 0.5),
        upper: baseAmount * (1 + (1 - confidence) * 0.5)
      },
      count: {
        lower: Math.round(baseAmount / 10 * 0.8),
        upper: Math.round(baseAmount / 10 * 1.2)
      }
    },
    timeline,
    trendAnalysis,
    featureImportance: features
  };
}

export const tipPredictionKeys = {
  predictions: (username: string, timeframe: Timeframe) => 
    ["tipPredictions", username, timeframe] as const,
};

export function useTipPredictions(username: string, timeframe: Timeframe) {
  return useQuery({
    queryKey: tipPredictionKeys.predictions(username, timeframe),
    queryFn: () => getTipPredictions(username, timeframe),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    enabled: !!username,
  });
}