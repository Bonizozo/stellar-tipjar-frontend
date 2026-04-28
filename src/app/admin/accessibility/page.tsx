"use client";

import { useEffect } from "react";
import { RefreshCw, TrendingUp } from "lucide-react";
import { useAccessibilityAudit } from "@/hooks/useAccessibilityAudit";
import { AccessibilityScoreCard } from "@/components/accessibility/AccessibilityScoreCard";
import { ViolationList } from "@/components/accessibility/ViolationList";
import { AccessibilityTrendChart } from "@/components/accessibility/AccessibilityTrendChart";
import { Button } from "@/components/Button";

export default function AccessibilityAuditPage() {
  const { score, violations, trends, loading, running, fetchAuditData, runAudit } =
    useAccessibilityAudit();

  useEffect(() => {
    fetchAuditData();
  }, [fetchAuditData]);

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-ink dark:text-white">Accessibility Audit</h1>
        <Button
          variant="primary"
          size="sm"
          icon={<RefreshCw size={14} className={running ? "animate-spin" : ""} />}
          onClick={runAudit}
          loading={running}
          disabled={running}
        >
          Run Audit
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-48 rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-32 rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>
      ) : (
        <div className="space-y-6">
          {score && <AccessibilityScoreCard score={score} />}

          {trends.length > 0 && (
            <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-[color:var(--surface)] p-6">
              <h2 className="text-base font-bold text-ink dark:text-white flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-moss" />
                Score Over Time
              </h2>
              <AccessibilityTrendChart trends={trends} />
            </div>
          )}

          <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-[color:var(--surface)] p-6">
            <h2 className="text-base font-bold text-ink dark:text-white mb-4">
              Violations ({violations.length})
            </h2>
            <ViolationList violations={violations} />
          </div>
        </div>
      )}
    </main>
  );
}
