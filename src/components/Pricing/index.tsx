'use client';

import { useState } from 'react';
import { PricingCard, PricingPlan } from './PricingCard';
import { BillingToggle } from './BillingToggle';

interface PricingGridProps {
  plans: PricingPlan[];
}

export const PricingGrid = ({ plans }: PricingGridProps) => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="w-full">
      <BillingToggle billing={billing} onChange={setBilling} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} billing={billing} savings={20} />
        ))}
      </div>
    </div>
  );
};
