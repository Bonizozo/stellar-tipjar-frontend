interface Supporter {
  name: string;
  tips: number;
}

interface TopSupportersProps {
  data: Supporter[];
  loading?: boolean;
}

export function TopSupporters({ data, loading = false }: TopSupportersProps) {
  if (loading) {
    return (
      <ul className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="h-10 animate-pulse rounded-lg bg-ink/5" />
        ))}
      </ul>
    );
  }

  const max = Math.max(...data.map((s) => s.tips), 1);

  return (
    <ol className="space-y-3">
      {data.map((supporter, i) => (
        <li key={supporter.name} className="flex items-center gap-3">
          <span className="w-5 text-center text-sm font-semibold text-ink/40">
            {i + 1}
          </span>
          <div className="flex-1">
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-ink">{supporter.name}</span>
              <span className="text-ink/60">{supporter.tips} XLM</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-ink/10">
              <div
                className="h-1.5 rounded-full bg-wave"
                style={{ width: `${(supporter.tips / max) * 100}%` }}
              />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
