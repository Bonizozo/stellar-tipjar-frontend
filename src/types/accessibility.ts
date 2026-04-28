export type WcagLevel = "A" | "AA" | "AAA";
export type ViolationImpact = "critical" | "serious" | "moderate" | "minor";

export interface AccessibilityViolation {
  id: string;
  description: string;
  impact: ViolationImpact;
  wcagCriteria: string;
  wcagLevel: WcagLevel;
  affectedElements: number;
  suggestion: string;
  url: string;
  detectedAt: string;
}

export interface AccessibilityScore {
  overall: number;
  levelA: number;
  levelAA: number;
  levelAAA: number;
  totalViolations: number;
  criticalViolations: number;
  lastAuditAt: string;
}

export interface AccessibilityTrend {
  date: string;
  score: number;
  violations: number;
}
