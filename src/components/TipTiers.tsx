"use client";

import { useTiers, type Tier } from '@/hooks/useTiers';
import { TierCard } from '@/components/TierCard';

interface TipTiersProps {
  tiers?: Tier[];
  onTierSelect?: (tier: Tier | null) => void;
}

export function TipTiers({ tiers, onTierSelect }: TipTiersProps) {
  const { tiers: resolvedTiers, selectedTier, selectTier } = useTiers(tiers);

  const handleSelect = (tier: Tier) => {
    selectTier(tier);
    onTierSelect?.(selectedTier?.id === tier.id ? null : tier);
  };

  return (
    <section aria-labelledby="tiers-heading">
      <h2 id="tiers-heading" className="text-xl font-semibold text-ink mb-4">
        Support Tiers
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {resolvedTiers.map((tier) => (
          <TierCard
            key={tier.id}
            tier={tier}
            selected={selectedTier?.id === tier.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </section>
  );
}
