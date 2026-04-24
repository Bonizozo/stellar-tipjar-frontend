"use client";

import { type Tier } from '@/hooks/useTiers';
import { PerksList } from '@/components/PerksList';
import { SupporterBadge } from '@/components/SupporterBadge';

interface TierCardProps {
  tier: Tier;
  selected?: boolean;
  onSelect?: (tier: Tier) => void;
}

export function TierCard({ tier, selected = false, onSelect }: TierCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(tier)}
      aria-pressed={selected}
      className={`w-full text-left rounded-2xl border p-5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 ${
        selected
          ? 'border-wave bg-wave/5 shadow-card'
          : 'border-ink/10 bg-[color:var(--surface)] hover:border-wave/40'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <SupporterBadge badge={tier.badge} tierName={tier.name} />
        <span className="text-sm font-bold text-ink">
          {tier.minAmount}+ XLM
        </span>
      </div>
      <div className={`h-1 rounded-full bg-gradient-to-r ${tier.color} mb-3`} aria-hidden="true" />
      <PerksList perks={tier.perks} />
    </button>
  );
}
