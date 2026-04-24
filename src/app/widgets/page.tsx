import type { Metadata } from "next";
import { WidgetCustomizer } from "@/components/widgets/WidgetCustomizer";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tip Widget Generator",
  description: "Create embeddable tip widgets for your website, blog, or social profile.",
  path: "/widgets",
});

export default function WidgetsPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-8 shadow-card sm:p-10">
        <span className="inline-flex rounded-full bg-wave/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-wave">
          Embeddable Widgets
        </span>
        <h1 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">Tip Widget Generator</h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Customize a tip button or card, then copy the embed code to add it to your website, blog,
          or any page that supports HTML.
        </p>
      </div>

      <WidgetCustomizer />
    </div>
  );
}
