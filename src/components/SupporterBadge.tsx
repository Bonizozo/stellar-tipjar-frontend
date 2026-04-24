interface SupporterBadgeProps {
  badge: string;
  tierName: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-base px-2 py-0.5 text-xs',
  md: 'text-xl px-3 py-1 text-sm',
  lg: 'text-3xl px-4 py-2 text-base',
};

export function SupporterBadge({ badge, tierName, size = 'md' }: SupporterBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-wave/10 font-semibold text-wave ${sizeClasses[size]}`}
      aria-label={`${tierName} supporter badge`}
    >
      <span aria-hidden="true">{badge}</span>
      {tierName}
    </span>
  );
}
