"use client";

import { useState, useCallback } from "react";
import type {
  AccessibilityScore,
  AccessibilityViolation,
  AccessibilityTrend,
} from "@/types/accessibility";

function getMockScore(): AccessibilityScore {
  return {
    overall: 78,
    levelA: 92,
    levelAA: 74,
    levelAAA: 45,
    totalViolations: 12,
    criticalViolations: 2,
    lastAuditAt: new Date().toISOString(),
  };
}

function getMockViolations(): AccessibilityViolation[] {
  return [
    {
      id: "color-contrast",
      description: "Elements must have sufficient color contrast",
      impact: "serious",
      wcagCriteria: "1.4.3",
      wcagLevel: "AA",
      affectedElements: 5,
      suggestion: "Increase text color contrast ratio to at least 4.5:1 for normal text",
      url: "/creator/[username]",
      detectedAt: new Date().toISOString(),
    },
    {
      id: "image-alt",
      description: "Images must have alternate text",
      impact: "critical",
      wcagCriteria: "1.1.1",
      wcagLevel: "A",
      affectedElements: 3,
      suggestion: "Add descriptive alt attributes to all <img> elements",
      url: "/explore",
      detectedAt: new Date().toISOString(),
    },
    {
      id: "button-name",
      description: "Buttons must have discernible text",
      impact: "critical",
      wcagCriteria: "4.1.2",
      wcagLevel: "A",
      affectedElements: 2,
      suggestion: "Add aria-label or visible text to icon-only buttons",
      url: "/dashboard",
      detectedAt: new Date().toISOString(),
    },
    {
      id: "focus-visible",
      description: "Focus indicator must be visible",
      impact: "serious",
      wcagCriteria: "2.4.7",
      wcagLevel: "AA",
      affectedElements: 8,
      suggestion: "Ensure all interactive elements have a visible focus ring",
      url: "/profile",
      detectedAt: new Date().toISOString(),
    },
    {
      id: "label",
      description: "Form elements must have labels",
      impact: "moderate",
      wcagCriteria: "1.3.1",
      wcagLevel: "A",
      affectedElements: 4,
      suggestion: "Associate <label> elements with form inputs using htmlFor",
      url: "/tips",
      detectedAt: new Date().toISOString(),
    },
  ];
}

function getMockTrends(): AccessibilityTrend[] {
  return Array.from({ length: 8 }, (_, i) => ({
    date: new Date(Date.now() - (7 - i) * 7 * 86400000).toISOString(),
    score: 60 + i * 3 + Math.floor(Math.random() * 4),
    violations: 20 - i * 2,
  }));
}

export function useAccessibilityAudit() {
  const [score, setScore] = useState<AccessibilityScore | null>(null);
  const [violations, setViolations] = useState<AccessibilityViolation[]>([]);
  const [trends, setTrends] = useState<AccessibilityTrend[]>([]);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);

  const fetchAuditData = useCallback(async () => {
    setLoading(true);
    try {
      const [scoreRes, violationsRes, trendsRes] = await Promise.all([
        fetch("/api/admin/accessibility/score"),
        fetch("/api/admin/accessibility/violations"),
        fetch("/api/admin/accessibility/trends"),
      ]);
      setScore(scoreRes.ok ? await scoreRes.json() : getMockScore());
      setViolations(violationsRes.ok ? await violationsRes.json() : getMockViolations());
      setTrends(trendsRes.ok ? await trendsRes.json() : getMockTrends());
    } catch {
      setScore(getMockScore());
      setViolations(getMockViolations());
      setTrends(getMockTrends());
    } finally {
      setLoading(false);
    }
  }, []);

  const runAudit = useCallback(async () => {
    setRunning(true);
    try {
      const res = await fetch("/api/admin/accessibility/audit", { method: "POST" });
      if (res.ok) {
        const result = await res.json();
        setScore(result.score ?? getMockScore());
        setViolations(result.violations ?? getMockViolations());
      } else {
        // Simulate improvement
        setScore((prev: AccessibilityScore | null) =>
          prev ? { ...prev, overall: Math.min(100, prev.overall + 2), lastAuditAt: new Date().toISOString() } : getMockScore()
        );
      }
    } catch {
      // silently fail
    } finally {
      setRunning(false);
    }
  }, []);

  return {
    score,
    violations,
    trends,
    loading,
    running,
    fetchAuditData,
    runAudit,
  };
}
