import type { Metadata } from "next";
import { CreatorComparison } from "@/components/comparison/CreatorComparison";

export const metadata: Metadata = {
  title: "Compare Creators - Stellar TipJar",
  description: "Compare multiple creators side-by-side with detailed stats and metrics.",
};

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ink mb-2">Creator Comparison</h1>
        <p className="text-ink/70">
          Compare multiple creators side-by-side to analyze their performance and metrics.
        </p>
      </div>
      <CreatorComparison />
    </div>
  );
}