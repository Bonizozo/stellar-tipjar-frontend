"use client";

import { useState, useCallback } from "react";
import { CREATOR_EXAMPLES } from "@/utils/creatorData";
import { buildPressKit } from "@/services/pressKitService";
import type { PressKit } from "@/services/pressKitService";
import { PressKitPreview } from "@/components/PressKit/PressKitPreview";
import { PressKitCustomizer } from "@/components/PressKit/PressKitCustomizer";
import { Button } from "@/components/Button";
import { generatePressKitPDF } from "@/utils/pressKitPdf";

export default function PressKitPage() {
  const [selectedUsername, setSelectedUsername] = useState(CREATOR_EXAMPLES[0].username);
  const [kit, setKit] = useState<PressKit>(() =>
    buildPressKit(CREATOR_EXAMPLES[0])
  );
  const [isExporting, setIsExporting] = useState(false);

  const handleCreatorChange = useCallback((username: string) => {
    const creator = CREATOR_EXAMPLES.find((c) => c.username === username);
    if (!creator) return;
    setSelectedUsername(username);
    setKit(buildPressKit(creator, {
      socialLinks: kit.socialLinks,
      customMessage: kit.customMessage,
      template: kit.template,
      accentColor: kit.accentColor,
    }));
  }, [kit]);

  const handleKitChange = useCallback((updates: Partial<PressKit>) => {
    setKit((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      await generatePressKitPDF(kit);
    } finally {
      setIsExporting(false);
    }
  }, [kit]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Press Kit Generator</h1>
        <p className="mt-1 text-sm text-ink/60">
          Create a professional media kit with stats, assets, and customization options.
        </p>
      </div>

      {/* Creator selector */}
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="creator-select" className="text-sm font-semibold text-ink">
          Creator:
        </label>
        <select
          id="creator-select"
          value={selectedUsername}
          onChange={(e) => handleCreatorChange(e.target.value)}
          className="rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900"
        >
          {CREATOR_EXAMPLES.map((c) => (
            <option key={c.username} value={c.username}>
              {c.displayName ?? c.username} (@{c.username})
            </option>
          ))}
        </select>
        <Button
          onClick={handleExport}
          disabled={isExporting}
          aria-busy={isExporting}
        >
          {isExporting ? "Exporting…" : "Export PDF"}
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Customizer */}
        <section aria-label="Customization options">
          <h2 className="mb-4 text-lg font-semibold text-ink">Customize</h2>
          <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 dark:bg-zinc-900/70">
            <PressKitCustomizer kit={kit} onChange={handleKitChange} />
          </div>
        </section>

        {/* Preview */}
        <section aria-label="Press kit preview">
          <h2 className="mb-4 text-lg font-semibold text-ink">Preview</h2>
          <PressKitPreview kit={kit} />
        </section>
      </div>
    </main>
  );
}
