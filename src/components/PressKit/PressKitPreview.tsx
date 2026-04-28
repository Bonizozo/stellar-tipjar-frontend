"use client";

import type { PressKit } from "@/services/pressKitService";

interface Props {
  kit: PressKit;
}

export function PressKitPreview({ kit }: Props) {
  const borderStyle = { borderColor: kit.accentColor };
  const accentStyle = { color: kit.accentColor };

  return (
    <article
      className="rounded-2xl border-2 bg-white p-6 shadow-sm dark:bg-zinc-900 space-y-5"
      style={borderStyle}
      aria-label="Press kit preview"
    >
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-ink">{kit.displayName}</h2>
        <p className="text-sm text-ink/60">@{kit.username}</p>
        <span
          className="inline-block rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wide"
          style={{ backgroundColor: kit.accentColor + "22", ...accentStyle }}
        >
          {kit.template}
        </span>
      </div>

      {/* Bio */}
      {kit.bio && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-1">About</h3>
          <p className="text-sm text-ink/80">{kit.bio}</p>
        </div>
      )}

      {/* Stats */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-2">Statistics</h3>
        <dl className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Tips", value: kit.stats.totalTips },
            { label: "Earnings (XLM)", value: kit.stats.totalEarningsXLM.toFixed(2) },
            { label: "Supporters", value: kit.stats.supporterCount },
            { label: "Member Since", value: new Date(kit.stats.joinedAt).getFullYear() },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg bg-ink/5 p-3">
              <dt className="text-xs text-ink/50">{label}</dt>
              <dd className="text-lg font-bold" style={accentStyle}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Categories & Tags */}
      {(kit.categories.length > 0 || kit.tags.length > 0) && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-2">Categories & Tags</h3>
          <div className="flex flex-wrap gap-1.5">
            {kit.categories.map((c) => (
              <span key={c} className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: kit.accentColor + "22", ...accentStyle }}>
                {c}
              </span>
            ))}
            {kit.tags.map((t) => (
              <span key={t} className="rounded-full bg-ink/10 px-2.5 py-0.5 text-xs text-ink/70">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {kit.socialLinks.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-2">Social Links</h3>
          <ul className="space-y-1">
            {kit.socialLinks.map(({ platform, url }) => (
              <li key={platform} className="flex items-center gap-2 text-sm">
                <span className="font-medium text-ink/70 w-20">{platform}</span>
                <a href={url} target="_blank" rel="noopener noreferrer" className="truncate hover:underline" style={accentStyle}>
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Custom Message */}
      {kit.customMessage && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-1">Message to Press</h3>
          <p className="text-sm italic text-ink/70">"{kit.customMessage}"</p>
        </div>
      )}
    </article>
  );
}
