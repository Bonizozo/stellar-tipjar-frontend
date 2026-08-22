"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import type { AccessibilityViolation, ViolationImpact } from "@/types/accessibility";

const impactConfig: Record<ViolationImpact, { label: string; className: string }> = {
  critical: { label: "Critical", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  serious: { label: "Serious", className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
  moderate: { label: "Moderate", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
  minor: { label: "Minor", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
};

interface ViolationItemProps {
  violation: AccessibilityViolation;
}

function ViolationItem({ violation }: ViolationItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { label, className } = impactConfig[violation.impact];

  return (
    <div className="border border-ink/10 dark:border-white/10 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        onClick={() => setExpanded((e: boolean) => !e)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
            {label}
          </span>
          <span className="text-sm font-medium text-ink dark:text-white truncate">{violation.description}</span>
        </div>
        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          <span className="text-xs text-ink/40 dark:text-white/40">WCAG {violation.wcagCriteria}</span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-2 border-t border-ink/10 dark:border-white/10 pt-3">
          <div className="flex items-center gap-2 text-xs text-ink/60 dark:text-white/60">
            <ExternalLink size={12} />
            <span>{violation.url}</span>
            <span>·</span>
            <span>{violation.affectedElements} element{violation.affectedElements !== 1 ? "s" : ""} affected</span>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">Suggested Fix</p>
            <p className="text-xs text-blue-700 dark:text-blue-400">{violation.suggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface ViolationListProps {
  violations: AccessibilityViolation[];
}

export function ViolationList({ violations }: ViolationListProps) {
  const [filter, setFilter] = useState<ViolationImpact | "all">("all");

  const filtered = filter === "all" ? violations : violations.filter((v) => v.impact === filter);
  const impacts: Array<ViolationImpact | "all"> = ["all", "critical", "serious", "moderate", "minor"];

  return (
    <div>
      <div className="flex gap-2 mb-3 flex-wrap">
        {impacts.map((impact) => (
          <button
            key={impact}
            onClick={() => setFilter(impact)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === impact
                ? "bg-wave text-white"
                : "bg-gray-100 dark:bg-gray-800 text-ink/60 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            aria-pressed={filter === impact}
          >
            {impact === "all" ? `All (${violations.length})` : `${impactConfig[impact].label} (${violations.filter((v) => v.impact === impact).length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink/50 dark:text-white/50 text-center py-6">No violations found</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((v) => (
            <ViolationItem violation={v} key={v.id} />
          ))}
        </div>
      )}
    </div>
  );
}
