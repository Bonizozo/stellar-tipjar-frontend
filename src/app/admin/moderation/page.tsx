import type { Metadata } from "next";
import ModerationDashboard from "@/components/ModerationDashboard";

export const metadata: Metadata = {
  title: "AI Content Moderation - Stellar TipJar",
  description: "AI-powered content moderation dashboard for scanning and reviewing flagged content.",
};

export default function ModerationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ModerationDashboard />
    </div>
  );
}
