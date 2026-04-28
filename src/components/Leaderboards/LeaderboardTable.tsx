"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Crown } from "lucide-react";
import { OptimizedImage } from "../OptimizedImage";
import { generateAvatarUrl } from "../../utils/imageUtils";
import { RankChangeIndicator } from "./RankChangeIndicator";
import { CelebrationBurst } from "./CelebrationBurst";

interface LeaderboardEntry {
  rank: number;
  name: string;
  metric: number;
  change24h: number;
  avatarUrl?: string;
}

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  type: "tippers" | "creators" | "biggest";
}

const METRIC_LABELS = {
  tippers: "Total Tipped",
  creators: "Total Received",
  biggest: "Amount",
} as const;

/** Returns rank change: positive = improved (moved up), negative = dropped */
function computeRankChanges(
  prev: LeaderboardEntry[],
  next: LeaderboardEntry[],
): Map<string, { change: number; isNew: boolean }> {
  const prevRankByName = new Map(prev.map((e) => [e.name, e.rank]));
  const result = new Map<string, { change: number; isNew: boolean }>();
  for (const entry of next) {
    const prevRank = prevRankByName.get(entry.name);
    if (prevRank === undefined) {
      result.set(entry.name, { change: 0, isNew: true });
    } else {
      result.set(entry.name, { change: prevRank - entry.rank, isNew: false });
    }
  }
  return result;
}

export function LeaderboardTable({ data, type }: LeaderboardTableProps) {
  const label = METRIC_LABELS[type];
  const prevDataRef = useRef<LeaderboardEntry[]>([]);
  const [rankChanges, setRankChanges] = useState<
    Map<string, { change: number; isNew: boolean }>
  >(new Map());
  const [celebrateTop3, setCelebrateTop3] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevDataRef.current = data;
      return;
    }

    const changes = computeRankChanges(prevDataRef.current, data);
    setRankChanges(changes);

    // Celebrate if any entry moved into top 3
    const hasTopPromotion = data.slice(0, 3).some((entry) => {
      const info = changes.get(entry.name);
      return info && (info.isNew || info.change > 0);
    });
    if (hasTopPromotion) {
      setCelebrateTop3(true);
      const t = setTimeout(() => setCelebrateTop3(false), 2200);
      return () => clearTimeout(t);
    }

    prevDataRef.current = data;
  }, [data]);

  const displayed = data.slice(0, 10);

  return (
    <div className="relative rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-card overflow-x-auto">
      <CelebrationBurst active={celebrateTop3} />

      <table className="w-full">
        <thead>
          <tr className="border-b border-ink/10">
            <th className="pb-4 text-left text-sm font-semibold text-ink/70">#</th>
            <th className="pb-4 text-left text-sm font-semibold text-ink/70">
              Tipper/Creator
            </th>
            <th className="pb-4 text-right text-sm font-semibold text-ink/70">
              {label}
            </th>
            <th className="pb-4 text-right text-sm font-semibold text-ink/70">
              24h Change
            </th>
            <th className="pb-4 text-right text-sm font-semibold text-ink/70">
              Rank
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/5">
          <AnimatePresence initial={false}>
            {displayed.map((entry) => {
              const info = rankChanges.get(entry.name);
              const improved = info && info.change > 0;

              return (
                <motion.tr
                  key={entry.name}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    backgroundColor: improved
                      ? ["rgba(16,185,129,0.12)", "rgba(0,0,0,0)"]
                      : "rgba(0,0,0,0)",
                  }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ layout: { type: "spring", stiffness: 300, damping: 30 }, duration: 0.4 }}
                  className="hover:bg-ink/5"
                >
                  {/* Rank badge */}
                  <td className="py-4 pr-4 w-12">
                    <div className="flex items-center justify-center">
                      {entry.rank === 1 && (
                        <motion.div
                          animate={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <Crown className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                        </motion.div>
                      )}
                      {entry.rank === 2 && (
                        <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">
                          2
                        </div>
                      )}
                      {entry.rank === 3 && (
                        <div className="h-6 w-6 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-white">
                          3
                        </div>
                      )}
                      {entry.rank > 3 && (
                        <span className="text-lg font-bold text-ink">
                          {entry.rank}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Name + avatar */}
                  <td className="py-4">
                    <Link
                      href={entry.rank <= 3 ? `/creator/${entry.name}` : "#"}
                      className="group flex items-center gap-3"
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-wave to-blue-500 ring-2 ring-white/20 group-hover:scale-105 transition-all">
                        <OptimizedImage
                          src={entry.avatarUrl || generateAvatarUrl(entry.name)}
                          alt={entry.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-ink truncate group-hover:underline">
                        {entry.name}
                      </span>
                    </Link>
                  </td>

                  {/* Metric */}
                  <td className="py-4 text-right">
                    <motion.div
                      key={entry.metric}
                      initial={{ scale: 1.2, color: "#0f6c7b" }}
                      animate={{ scale: 1, color: "inherit" }}
                      transition={{ duration: 0.4 }}
                      className="text-lg font-bold text-wave"
                    >
                      {entry.metric.toLocaleString()}{" "}
                      <span className="text-sm text-ink/60">XLM</span>
                    </motion.div>
                  </td>

                  {/* 24h change */}
                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
                        entry.change24h >= 0
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {entry.change24h >= 0 ? "↑" : "↓"}
                      {Math.abs(entry.change24h).toFixed(1)}%
                    </span>
                  </td>

                  {/* Rank change indicator */}
                  <td className="py-4 text-right">
                    {info && (
                      <RankChangeIndicator
                        change={info.change}
                        isNew={info.isNew}
                      />
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>

      {data.length > 10 && (
        <div className="mt-4 pt-4 border-t border-ink/10 text-center">
          <button className="text-wave hover:underline text-sm font-medium">
            Show top 50 →
          </button>
        </div>
      )}
    </div>
  );
}
