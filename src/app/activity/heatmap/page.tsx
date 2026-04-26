"use client";

import { useState } from "react";
import { TipHeatmapCalendar } from "@/components/TipHeatmapCalendar";
import { useHeatmapData } from "@/hooks/queries/useHeatmapData";
import { exportToCSV } from "@/utils/exportCSV";

export default function HeatmapPage() {
  const [years, setYears] = useState<1 | 2 | 3>(1);
  // "me" resolves to the authenticated user — swap for a real username prop when auth is wired
  const { data: tips = [], isPending } = useHeatmapData("me", years);

  const handleExport = () => {
    exportToCSV(
      tips.map((t) => ({ date: t.date, amount: t.amount })),
      [
        { key: "date", label: "Date" },
        { key: "amount", label: "Amount (XLM)" },
      ],
      "tip-heatmap-export.csv",
    );
  };

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-ink">Tip Activity Calendar</h1>
        <p className="mt-2 text-ink/60">
          A GitHub-style heatmap of your tipping activity over time.
        </p>
      </div>

      <TipHeatmapCalendar
        tips={tips}
        loading={isPending}
        title="Your Tip Activity"
        showStats
        onExport={handleExport}
      />
    </main>
  );
}
