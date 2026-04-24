"use client";

import { useState, useCallback } from 'react';

export interface Tier {
  id: string;
  name: string;
  minAmount: number;
  perks: string[];
  badge: string;
  color: string;
}

const DEFAULT_TIERS: Tier[] = [
  { id: 'bronze', name: 'Bronze', minAmount: 5, perks: ['Shoutout in stream', 'Discord role'], badge: '🥉', color: 'from-amber-700 to-amber-500' },
  { id: 'silver', name: 'Silver', minAmount: 25, perks: ['All Bronze perks', 'Exclusive content', 'Monthly Q&A'], badge: '🥈', color: 'from-slate-400 to-slate-300' },
  { id: 'gold', name: 'Gold', minAmount: 100, perks: ['All Silver perks', '1-on-1 session', 'Name in credits'], badge: '🥇', color: 'from-yellow-500 to-yellow-300' },
];

export function useTiers(tiers: Tier[] = DEFAULT_TIERS) {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);

  const selectTier = useCallback((tier: Tier) => {
    setSelectedTier((prev) => (prev?.id === tier.id ? null : tier));
  }, []);

  const getTierForAmount = useCallback(
    (amount: number): Tier | null =>
      [...tiers].reverse().find((t) => amount >= t.minAmount) ?? null,
    [tiers]
  );

  return { tiers, selectedTier, selectTier, getTierForAmount };
}
