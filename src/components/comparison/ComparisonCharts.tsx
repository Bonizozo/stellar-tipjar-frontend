"use client";

import { useMemo } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useCreatorStats } from "@/hooks/queries/useCreatorStats";
import type { SelectedCreator } from "./CreatorComparison";

interface ComparisonChartsProps {
  creators: SelectedCreator[];
}

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export function ComparisonCharts({ creators }: ComparisonChartsProps) {
  // Fetch stats for all creators
  const statsQueries = creators.map(creator => 
    useCreatorStats(creator.username)
  );

  const isLoading = statsQueries.some(query => query.isPending);
  const hasError = statsQueries.some(query => query.isError);

  const chartData = useMemo(() => {
    const statsData = statsQueries.map(query => query.data).filter(Boolean);
    
    // Overview comparison data
    const overviewData = creators.map((creator, index) => {
      const stats = statsData[index];
      return {
        name: creator.displayName,
        username: creator.username,
        totalTips: stats?.totalAmountXlm || 0,
        tipCount: stats?.tipCount || 0,
        supporters: stats?.uniqueSupporters || 0,
        avgTip: stats && stats.tipCount > 0 ? stats.totalAmountXlm / stats.tipCount : 0
      };
    });

    // Tip history comparison (last 30 days)
    const historyData = [];
    if (statsData.length > 0 && statsData[0]?.tipHistory) {
      const maxLength = Math.max(...statsData.map(stats => stats?.tipHistory?.length || 0));
      
      for (let i = Math.max(0, maxLength - 30); i < maxLength; i++) {
        const dataPoint: any = { date: statsData[0]?.tipHistory[i]?.date || `Day ${i + 1}` };
        
        creators.forEach((creator, creatorIndex) => {
          const stats = statsData[creatorIndex];
          dataPoint[creator.displayName] = stats?.tipHistory?.[i]?.amount || 0;
        });
        
        historyData.push(dataPoint);
      }
    }

    // Supporter distribution
    const supporterData = creators.map((creator, index) => {
      const stats = statsData[index];
      return {
        name: creator.displayName,
        value: stats?.uniqueSupporters || 0,
        color: COLORS[index % COLORS.length]
      };
    });

    return { overviewData, historyData, supporterData };
  }, [creators, statsQueries]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-ink/10 bg-white/70 p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-ink/10 rounded w-1/4 mb-4"></div>
              <div className="h-64 bg-ink/10 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 text-center">
        <p className="text-ink/50">Error loading chart data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Bar Chart */}
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
        <h3 className="text-lg font-semibold text-ink mb-4">Total Tips Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.overviewData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
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
              formatter={(value: number) => [`${value.toFixed(2)} XLM`, 'Total Tips']}
            />
            <Bar 
              dataKey="totalTips" 
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tip History Line Chart */}
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
        <h3 className="text-lg font-semibold text-ink mb-4">Tip History (Last 30 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData.historyData}>
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
            />
            {creators.map((creator, index) => (
              <Line
                key={creator.username}
                type="monotone"
                dataKey={creator.displayName}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supporters Pie Chart */}
        <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
          <h3 className="text-lg font-semibold text-ink mb-4">Supporter Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData.supporterData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {chartData.supporterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Average Tip Comparison */}
        <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
          <h3 className="text-lg font-semibold text-ink mb-4">Average Tip Amount</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData.overviewData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                type="number"
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                type="category"
                dataKey="name"
                stroke="#6b7280"
                fontSize={12}
                width={80}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [`${value.toFixed(2)} XLM`, 'Avg Tip']}
              />
              <Bar 
                dataKey="avgTip" 
                fill="#06b6d4"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}