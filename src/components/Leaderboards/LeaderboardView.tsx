"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Leaderboard, LeaderboardEntry, TimeRange } from "@/types/leaderboards";
import { leaderboardService } from "@/services/leaderboardService";
import { RankChangeIndicator } from "./RankChangeIndicator";
import { CelebrationBurst } from "./CelebrationBurst";

interface LeaderboardViewProps {
  type: "creators" | "tippers" | "trending";
}

function computeRankChanges(
  prev: LeaderboardEntry[],
  next: LeaderboardEntry[],
): Map<string, { change: number; isNew: boolean }> {
  const prevRankById = new Map(prev.map((e) => [e.id, e.rank]));
  const result = new Map<string, { change: number; isNew: boolean }>();
  for (const entry of next) {
    const prevRank = prevRankById.get(entry.id);
    if (prevRank === undefined) {
      result.set(entry.id, { change: 0, isNew: true });
    } else {
      result.set(entry.id, { change: prevRank - entry.rank, isNew: false });
    }
  }
  return result;
}

export const LeaderboardView = ({ type }: LeaderboardViewProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly");
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [rankChanges, setRankChanges] = useState<
    Map<string, { change: number; isNew: boolean }>
  >(new Map());
  const [celebrate, setCelebrate] = useState(false);
  const prevEntriesRef = useRef<LeaderboardEntry[]>([]);
  const isFirstFetch = useRef(true);

  useEffect(() => {
    let cancelled = false;

    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        let data: Leaderboard;
        if (type === "creators") {
          data = await leaderboardService.getTopCreators(timeRange);
        } else if (type === "tippers") {
          data = await leaderboardService.getTopTippers(timeRange);
        } else {
          data = await leaderboardService.getTrending(timeRange);
        }
        if (cancelled) return;

        if (!isFirstFetch.current && prevEntriesRef.current.length > 0) {
          const changes = computeRankChanges(prevEntriesRef.current, data.entries);
          setRankChanges(changes);

          const hasTopPromotion = data.entries.slice(0, 3).some((e) => {
            const info = changes.get(e.id);
            return info && (info.isNew || info.change > 0);
          });
          if (hasTopPromotion) {
            setCelebrate(true);
            setTimeout(() => setCelebrate(false), 2200);
          }
        }

        isFirstFetch.current = false;
        prevEntriesRef.current = data.entries;
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchLeaderboard();

    // Poll for real-time updates every 30 seconds
    const interval = setInterval(() => void fetchLeaderboard(), 30_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [type, timeRange]);

  if (loading && !leaderboard) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-wave/20 border-t-wave" />
      </div>
    );
  }

  if (!leaderboard) {
    return <div className="text-center py-8 text-ink/50">No data available</div>;
  }

  return (
    <div className="space-y-4">
      {/* Time range selector */}
      <div className="flex gap-2 mb-6">
        {(["daily", "weekly", "monthly"] as TimeRange[]).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              timeRange === range
                ? "bg-wave text-white"
                : "bg-ink/10 text-ink/70 hover:bg-ink/20"
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Entries list */}
      <div className="relative space-y-2">
        <CelebrationBurst active={celebrate} count={20} />

        <AnimatePresence initial={false}>
          {leaderboard.entries.map((entry) => {
            const info = rankChanges.get(entry.id);
            const improved = info && info.change > 0;

            return (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  backgroundColor: improved
                    ? ["rgba(16,185,129,0.1)", "rgba(255,255,255,0)"]
                    : "rgba(255,255,255,0)",
                }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  duration: 0.35,
                }}
                className="flex items-center gap-4 p-4 rounded-xl border border-ink/10 bg-[color:var(--surface)] hover:shadow-md transition-shadow"
              >
                {/* Rank */}
                <motion.div
                  key={entry.rank}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="text-2xl font-bold text-ink/40 w-8 text-center"
                >
                  {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : entry.rank}
                </motion.div>

                {/* Avatar */}
                {entry.avatar && (
                  <Image
                    src={entry.avatar}
                    alt={entry.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                )}

                {/* Name + tip count */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-ink truncate">{entry.name}</p>
                  <p className="text-sm text-ink/50">{entry.tipCount} tips</p>
                </div>

                {/* Amount */}
                <motion.div
                  key={entry.totalAmount}
                  initial={{ scale: 1.15, color: "#0f6c7b" }}
                  animate={{ scale: 1, color: "inherit" }}
                  transition={{ duration: 0.4 }}
                  className="text-right"
                >
                  <p className="font-bold text-ink">{entry.totalAmount}</p>
                </motion.div>

                {/* Rank change */}
                <div className="w-14 flex justify-end">
                  {info && (
                    <RankChangeIndicator change={info.change} isNew={info.isNew} />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
