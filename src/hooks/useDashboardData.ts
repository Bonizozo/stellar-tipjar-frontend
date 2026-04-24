import { useState, useEffect } from "react";

export interface DashboardData {
  totalTips: number;
  supporters: number;
  avgTip: number;
  monthlyTips: number;
  trendData: Array<{ date: string; amount: number }>;
  supportersData: Array<{ name: string; tips: number }>;
  distributionData: Array<{ name: string; value: number }>;
}

export function useDashboardData(dateRange?: { start: Date; end: Date }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Mock data - replace with actual API call
        const mockData: DashboardData = {
          totalTips: 12450,
          supporters: 342,
          avgTip: 36.4,
          monthlyTips: 2890,
          trendData: [
            { date: "Jan", amount: 1200 },
            { date: "Feb", amount: 1900 },
            { date: "Mar", amount: 1500 },
            { date: "Apr", amount: 2200 },
            { date: "May", amount: 2800 },
            { date: "Jun", amount: 2390 },
          ],
          supportersData: [
            { name: "Alice", tips: 450 },
            { name: "Bob", tips: 380 },
            { name: "Charlie", tips: 320 },
            { name: "Diana", tips: 290 },
            { name: "Eve", tips: 250 },
          ],
          distributionData: [
            { name: "Direct Tips", value: 45 },
            { name: "Widget Tips", value: 30 },
            { name: "Scheduled Tips", value: 15 },
            { name: "Other", value: 10 },
          ],
        };
        setData(mockData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  return { data, loading, error };
}
