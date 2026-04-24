const stats = [
  { label: "Creators Supported", value: "2,400+" },
  { label: "Tips Sent", value: "18,000+" },
  { label: "XLM Distributed", value: "500K+" },
];

export function HeroStats() {
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-12">
      {stats.map(({ label, value }) => (
        <div key={label} className="text-center">
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sunrise to-wave">
            {value}
          </p>
          <p className="mt-1 text-sm text-ink/60 dark:text-ink/50">{label}</p>
        </div>
      ))}
    </div>
  );
}
