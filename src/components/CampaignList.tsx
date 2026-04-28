"use client";

import { useEffect, useState } from "react";
import { Clock, ChevronRight } from "lucide-react";
import { Campaign, useMatchingCampaign } from "@/hooks/useMatchingCampaign";
import { MatchBadge } from "@/components/MatchBadge";
import { MatchProgress } from "@/components/MatchProgress";
import { CampaignDetailsModal } from "@/components/CampaignDetailsModal";

function LiveCountdown({ endDate }: { endDate: Date }) {
  const calc = () => {
    const diff = endDate.getTime() - Date.now();
    if (diff <= 0) return "Ended";
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const [label, setLabel] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setLabel(calc()), 1000);
    return () => clearInterval(id);
  });

  return (
    <span className="inline-flex items-center gap-1 text-sm font-mono font-semibold text-purple-600 dark:text-purple-400">
      <Clock className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

interface CampaignCardProps {
  campaign: Campaign;
  onDetails: (c: Campaign) => void;
}

function CampaignCard({ campaign, onDetails }: CampaignCardProps) {
  return (
    <div className="rounded-2xl border border-blue-100 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 dark:text-white truncate">{campaign.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
            {campaign.description}
          </p>
        </div>
        <MatchBadge matchPercentage={campaign.matchPercentage} sponsorName={campaign.sponsorName} size="sm" />
      </div>

      <MatchProgress campaign={campaign} showLabel={false} showPercentage height="sm" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              ${campaign.currentMatched.toFixed(0)}
            </span>{" "}
            / ${campaign.matchLimit.toFixed(0)} matched
          </span>
          <LiveCountdown endDate={campaign.endDate} />
        </div>
        <button
          onClick={() => onDetails(campaign)}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Details <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface CampaignListProps {
  creatorUsername?: string;
  className?: string;
}

export function CampaignList({ creatorUsername, className }: CampaignListProps) {
  const { getActiveCampaigns, isLoadingCampaigns } = useMatchingCampaign(creatorUsername);
  const [selected, setSelected] = useState<Campaign | null>(null);

  const campaigns = getActiveCampaigns();

  if (isLoadingCampaigns) {
    return <div className="text-sm text-gray-500 dark:text-gray-400 py-4">Loading campaigns…</div>;
  }

  if (campaigns.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
        No active matching campaigns right now.
      </p>
    );
  }

  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      {campaigns.map((c) => (
        <CampaignCard key={c.id} campaign={c} onDetails={setSelected} />
      ))}
      {selected && (
        <CampaignDetailsModal campaign={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
