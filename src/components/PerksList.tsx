interface PerksListProps {
  perks: string[];
}

export function PerksList({ perks }: PerksListProps) {
  return (
    <ul className="mt-3 space-y-1.5" aria-label="Tier perks">
      {perks.map((perk) => (
        <li key={perk} className="flex items-start gap-2 text-sm text-ink/70">
          <span className="mt-0.5 text-success" aria-hidden="true">✓</span>
          {perk}
        </li>
      ))}
    </ul>
  );
}
