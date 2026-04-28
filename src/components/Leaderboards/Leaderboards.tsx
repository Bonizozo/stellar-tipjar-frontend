"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeaderboardTable } from "./LeaderboardTable";
import { TimeFilter } from "./TimeFilter";
import { useLeaderboards } from "@/hooks/useLeaderboards";

interface Tab {
  value: "tippers" | "creators" | "biggest";
  label: string;
}

const tabs: Tab[] = [
  { value: "tippers", label: "Top Tippers" },
  { value: "creators", label: "Top Creators" },
  { value: "biggest", label: "Biggest Tips" },
];

export function Leaderboards() {
  const [activeTab, setActiveTab] = useState<Tab["value"]>("tippers");
  const [period, setPeriod] = useState<"24h" | "7d" | "30d" | "all">("30d");

  const { data: leaderboards = {}, isLoading } = useLeaderboards({ period });

  const currentData = (leaderboards[activeTab] as any[]) || [];

  return (
    <section className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-ink to-ink/80 bg-clip-text text-transparent">
          Leaderboards
        </h2>
        <TimeFilter value={period} onChange={setPeriod} />
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {tabs.map((tab) => {
          const entries = (leaderboards[tab.value] as any[]) || [];
          const isActive = activeTab === tab.value;

          return (
            <motion.div
              key={tab.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.value)}
              className={`cursor-pointer rounded-3xl border-2 bg-[color:var(--surface)] p-6 transition-all ${
                isActive
                  ? "border-wave/50 ring-4 ring-wave/20 shadow-2xl"
                  : "border-ink/10 hover:border-wave/30 hover:shadow-2xl"
              }`}
            >
              <h3
                className={`font-bold text-xl mb-4 transition-colors ${
                  isActive ? "text-wave" : "text-ink"
                }`}
              >
                {tab.label}
              </h3>

              <div className="space-y-2">
                {isLoading ? (
                  <div className="h-32 flex items-center justify-center">
                    <div className="h-6 w-6 border-2 border-wave/30 border-t-wave rounded-full animate-spin" />
                  </div>
                ) : entries.length ? (
                  <AnimatePresence mode="popLayout">
                    {entries.slice(0, 5).map((entry: any, i: number) => (
                      <motion.div
                        key={entry.name ?? i}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ delay: i * 0.05, duration: 0.25 }}
                        className="flex items-center justify-between py-1"
                      >
                        <span className="font-mono text-sm font-bold text-ink/70">
                          #{i + 1}
                        </span>
                        <span className="font-semibold text-wave">
                          {entry.metric?.toLocaleString()} XLM
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="h-32 flex flex-col items-center justify-center text-ink/40">
                    <div className="w-16 h-16 rounded-2xl bg-ink/10 flex items-center justify-center mb-2">
                      🏆
                    </div>
                    <p className="text-sm text-center">No data yet</p>
                  </div>
                )}

                {entries.length > 0 && (
                  <div className="pt-2 mt-4 border-t border-ink/20">
                    <button className="w-full text-wave hover:text-wave/80 text-sm font-medium transition-colors">
                      View full list
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full table for active tab */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 border-4 border-wave/20 border-t-wave rounded-full animate-spin" />
            </div>
          ) : currentData.length > 0 ? (
            <LeaderboardTable data={currentData} type={activeTab} />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
