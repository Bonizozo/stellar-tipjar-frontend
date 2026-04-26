"use client";

interface SupporterInsightsTableProps {
  rows: Array<{
    name: string;
    totalTips: number;
    tipCount: number;
    avgTip: number;
    lastTipDate: string;
  }>;
}

export function SupporterInsightsTable({ rows }: SupporterInsightsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink/10">
      <table className="min-w-full text-sm">
        <thead className="bg-ink/5 text-left text-ink/70">
          <tr>
            <th className="px-4 py-3">Supporter</th>
            <th className="px-4 py-3">Total Revenue (XLM)</th>
            <th className="px-4 py-3">Tips</th>
            <th className="px-4 py-3">Avg Tip (XLM)</th>
            <th className="px-4 py-3">Last Tip</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-ink/10 text-ink/90">
              <td className="px-4 py-3 font-medium">{row.name}</td>
              <td className="px-4 py-3">{row.totalTips.toLocaleString()}</td>
              <td className="px-4 py-3">{row.tipCount}</td>
              <td className="px-4 py-3">{row.avgTip.toFixed(1)}</td>
              <td className="px-4 py-3">{row.lastTipDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
