"use client";

import { useState } from "react";

interface Scenario {
  label: string;
  postFrequency: number; // posts per week
  avgTipAmount: number;  // XLM
  supporterGrowth: number; // % per month
}

const PRESETS: Scenario[] = [
  { label: "Conservative", postFrequency: 1, avgTipAmount: 5, supporterGrowth: 2 },
  { label: "Moderate", postFrequency: 3, avgTipAmount: 10, supporterGrowth: 5 },
  { label: "Aggressive", postFrequency: 7, avgTipAmount: 20, supporterGrowth: 10 },
];

function project(scenario: Scenario, months: number): number[] {
  const results: number[] = [];
  let supporters = 50;
  for (let m = 1; m <= months; m++) {
    supporters = supporters * (1 + scenario.supporterGrowth / 100);
    const monthlyTips = scenario.postFrequency * 4 * supporters * (scenario.avgTipAmount / 100);
    results.push(Math.round(monthlyTips));
  }
  return results;
}

export function ScenarioPlanner() {
  const [scenario, setScenario] = useState<Scenario>(PRESETS[1]);
  const [months] = useState(6);
  const projections = project(scenario, months);

  return (
    <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-ink">Scenario Planning</h2>

      {/* Preset buttons */}
      <div className="flex gap-2 flex-wrap">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => setScenario(p)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              scenario.label === p.label
                ? "bg-wave text-white"
                : "bg-ink/5 text-ink hover:bg-ink/10"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Posts / week", key: "postFrequency" as const, min: 1, max: 14, unit: "" },
          { label: "Avg tip (XLM)", key: "avgTipAmount" as const, min: 1, max: 100, unit: " XLM" },
          { label: "Supporter growth", key: "supporterGrowth" as const, min: 1, max: 20, unit: "%" },
        ].map(({ label, key, min, max, unit }) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm text-ink/60">
              <span>{label}</span>
              <span className="font-medium text-ink">{scenario[key]}{unit}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={scenario[key]}
              onChange={(e) =>
                setScenario((s) => ({ ...s, label: "Custom", [key]: Number(e.target.value) }))
              }
              className="w-full accent-wave"
            />
          </div>
        ))}
      </div>

      {/* Projection bars */}
      <div>
        <p className="text-sm font-medium text-ink/60 mb-3">Projected monthly earnings (XLM)</p>
        <div className="flex items-end gap-2 h-32">
          {projections.map((val, i) => {
            const max = Math.max(...projections, 1);
            const pct = (val / max) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-ink/50">{val}</span>
                <div
                  className="w-full rounded-t-md bg-wave/70 transition-all duration-300"
                  style={{ height: `${pct}%` }}
                />
                <span className="text-xs text-ink/40">M{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
