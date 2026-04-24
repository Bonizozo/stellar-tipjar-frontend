"use client";

import Link from \"next/link\";
import { OptimizedImage } from \"../OptimizedImage\";
import { generateAvatarUrl } from \"../../utils/imageUtils\";
import { TrendingUp, TrendingDown, Crown } from \"lucide-react\";

interface LeaderboardEntry {
  rank: number;
  name: string;
  metric: number;
  change24h: number;
  avatarUrl?: string;
}

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  type: 'tippers' | 'creators' | 'biggest';
}

const METRIC_LABELS = {
  tippers: 'Total Tipped',
  creators: 'Total Received',
  biggest: 'Amount',
} as const;

export function LeaderboardTable({ data, type }: LeaderboardTableProps) {
  const label = METRIC_LABELS[type];

  return (
    <div className=\"rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-card overflow-x-auto\">
      <table className=\"w-full\">
        <thead>
          <tr className=\"border-b border-ink/10\">
            <th className=\"pb-4 text-left text-sm font-semibold text-ink/70\">#</th>
            <th className=\"pb-4 text-left text-sm font-semibold text-ink/70\">Tipper/Creator</th>
            <th className=\"pb-4 text-right text-sm font-semibold text-ink/70\">{label}</th>
            <th className=\"pb-4 text-right text-sm font-semibold text-ink/70\">24h Change</th>
          </tr>
        </thead>
        <tbody className=\"divide-y divide-ink/5\">
          {data.slice(0, 10).map((entry, index) => (
            <tr key={entry.rank} className=\"hover:bg-ink/5 transition-colors\">
              <td className=\"py-4 pr-4 w-12\">
                <div className=\"flex items-center justify-center\">
                  {entry.rank === 1 && (
                    <Crown className=\"h-6 w-6 text-yellow-500 flex-shrink-0\" />
                  )}
                  {entry.rank === 2 && (
                    <div className=\"h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700\">
                      2
                    </div>
                  )}
                  {entry.rank === 3 && (
                    <div className=\"h-6 w-6 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-white\">
                      3
                    </div>
                  )}
                  {entry.rank > 3 && (
                    <span className=\"text-lg font-bold text-ink\">{entry.rank}</span>
                  )}
                </div>
              </td>
              <td className=\"py-4\">
                <Link href={entry.rank <= 3 ? `/creator/${entry.name}` : '#'} className=\"group flex items-center gap-3\">
                  <div className=\"h-10 w-10 rounded-full bg-gradient-to-br from-wave to-blue-500 ring-2 ring-white/20 group-hover:scale-105 transition-all\">
                    <OptimizedImage
                      src={entry.avatarUrl || generateAvatarUrl(entry.name)}
                      alt={entry.name}
                      fill
                      className=\"rounded-full object-cover\"
                    />
                  </div>
                  <span className=\"font-semibold text-ink truncate group-hover:underline\">{entry.name}</span>
                </Link>
              </td>
              <td className=\"py-4 text-right\">
                <div className=\"text-lg font-bold text-wave\">
                  {entry.metric.toLocaleString()} <span className=\"text-sm text-ink/60\">XLM</span>
                </div>
              </td>
              <td className=\"py-4 text-right\">
                <span className={`inline-flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
                  entry.change24h >= 0 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {entry.change24h >= 0 ? <TrendingUp className=\"h-3 w-3\" /> : <TrendingDown className=\"h-3 w-3\" />}
                  {Math.abs(entry.change24h).toFixed(1)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > 10 && (
        <div className=\"mt-4 pt-4 border-t border-ink/10 text-center\">
          <button className=\"text-wave hover:underline text-sm font-medium\">
            Show top 50 →
          </button>
        </div>
      )}
    </div>
  );
}

