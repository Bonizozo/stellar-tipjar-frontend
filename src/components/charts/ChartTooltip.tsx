"use client";

import { motion } from "framer-motion";

export interface TooltipPayloadItem {
  name: string;
  value: number | string;
  color?: string;
  unit?: string;
  dataKey?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  formatter?: (value: number | string, name: string) => [string, string];
  labelFormatter?: (label: string) => string;
  unit?: string;
}

/**
 * Shared custom tooltip used across all chart components.
 * Renders a polished card with animated entrance, matching the design system.
 */
export function ChartTooltip({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  unit = "XLM",
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const displayLabel = labelFormatter ? labelFormatter(label ?? "") : label;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.12 }}
      className="rounded-xl border border-ink/10 bg-[color:var(--surface)] px-4 py-3 shadow-xl"
      role="tooltip"
    >
      {displayLabel && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
          {displayLabel}
        </p>
      )}
      <div className="space-y-1.5">
        {payload.map((entry, i) => {
          const [formattedValue, formattedName] = formatter
            ? formatter(entry.value, entry.name)
            : [
                typeof entry.value === "number"
                  ? `${entry.value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unit}`
                  : String(entry.value),
                entry.name,
              ];

          return (
            <div key={i} className="flex items-center gap-2">
              {entry.color && (
                <span
                  className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
              )}
              <span className="text-xs text-ink/60">{formattedName}:</span>
              <span className="text-xs font-semibold text-ink">
                {formattedValue}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
