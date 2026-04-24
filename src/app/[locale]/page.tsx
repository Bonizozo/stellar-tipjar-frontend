import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { SectionCard } from "@/components/SectionCard";
import { HeroStats } from "@/components/HeroStats";
import { buildMetadata, websiteJsonLd } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: "Stellar Tip Jar",
  description: "Support creators globally with low-fee Stellar tips.",
});

export default function Home() {
  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl border border-ink/10 bg-[color:var(--surface)] shadow-card">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-10 animate-gradient rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, #ff785a, #0f6c7b, #5f7f41, #ff785a)",
          }}
          aria-hidden="true"
        />
        {/* Soft grid overlay */}
        <div className="absolute inset-0 soft-grid rounded-3xl opacity-50" aria-hidden="true" />

        <div className="relative z-10 container mx-auto px-6 py-16 text-center">
          <span className="inline-flex rounded-full bg-wave/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-wave mb-6">
            Open Source · Powered by Stellar
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sunrise via-wave to-moss leading-tight pb-2">
            Support Creators<br className="hidden sm:block" /> with Stellar
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-ink/70 dark:text-ink/60 leading-relaxed">
            Fast, borderless, and fee-friendly tipping powered by blockchain.
            Send direct support to your favourite creators in seconds.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link href="/explore">
              <Button className="px-8 py-3 text-base">Start Tipping</Button>
            </Link>
            <Link href="/tips">
              <Button variant="ghost" className="px-8 py-3 text-base">Become a Creator</Button>
            </Link>
          </div>

          {/* Hero illustration */}
          <div className="mt-14 animate-float" aria-hidden="true">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-sunrise/20 to-wave/20 border border-wave/20 shadow-card">
              <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" aria-hidden="true">
                <circle cx="32" cy="32" r="28" fill="url(#heroGrad)" opacity="0.15" />
                <path d="M20 32 L32 20 L44 32 L32 44 Z" fill="url(#heroGrad)" />
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff785a" />
                    <stop offset="100%" stopColor="#0f6c7b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Trust indicators */}
          <HeroStats />
        </div>
      </section>

      {/* Features */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SectionCard
          title="Creator Profiles"
          description="Dynamic profile pages like /creator/alice that can fetch data from your backend API."
          icon={<span className="text-lg">1</span>}
        />
        <SectionCard
          title="Wallet-Ready"
          description="A wallet placeholder hook and connector are included, ready for Freighter integration."
          icon={<span className="text-lg">2</span>}
        />
        <SectionCard
          title="Contributor Friendly"
          description="Simple folder boundaries (app, components, hooks, services, utils, styles)."
          icon={<span className="text-lg">3</span>}
        />
      </section>
    </div>
  );
}
