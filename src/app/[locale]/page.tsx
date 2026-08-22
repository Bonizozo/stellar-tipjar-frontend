import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { buildMetadata, websiteJsonLd } from "@/utils/seo";
import { SocialProofStrip } from "@/components/landing/SocialProofStrip";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturedCreators } from "@/components/landing/FeaturedCreators";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";

export const metadata: Metadata = buildMetadata({
  title: "Stellar Tip Jar — Support Creators with Instant Blockchain Tips",
  description:
    "Send borderless, near-zero-fee tips to your favourite creators using the Stellar network. Connect your wallet and start supporting in seconds.",
});

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />

      {/* ─── Hero ─── */}
      <section
        aria-labelledby="hero-heading"
        className="relative min-h-[88vh] flex items-center justify-center overflow-hidden rounded-3xl border border-ink/10 bg-[color:var(--surface)] shadow-card"
      >
        {/* Animated gradient blob */}
        <div
          className="absolute inset-0 opacity-10 animate-gradient rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, #ff785a, #0f6c7b, #5f7f41, #ff785a)",
          }}
          aria-hidden="true"
        />
        {/* Soft grid overlay */}
        <div
          className="absolute inset-0 soft-grid rounded-3xl opacity-40"
          aria-hidden="true"
        />

        {/* Decorative blobs */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sunrise/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-wave/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-wave/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-wave mb-8">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-wave animate-pulse" aria-hidden="true" />
            Open Source · Powered by Stellar
          </span>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] pb-3"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sunrise via-wave to-moss">
              Support Creators
            </span>
            <br className="hidden sm:block" />
            <span className="text-ink">with Stellar</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-ink/65 leading-relaxed">
            Fast, borderless, and fee-friendly tipping powered by the Stellar
            blockchain. Send direct support to your favourite creators in
            seconds — no banks, no borders.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link href="/explore">
              <Button size="lg" className="px-8 shadow-lg">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Explore Creators
              </Button>
            </Link>
            <Link href="/tips">
              <Button variant="outline" size="lg" className="px-8">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Connect Wallet
              </Button>
            </Link>
          </div>

          {/* Trust micro-copy */}
          <p className="mt-5 text-xs text-ink/40 tracking-wide">
            Non-custodial · Your keys, your funds · Free to use
          </p>

          {/* Floating Stellar logo mark */}
          <div className="mt-16 animate-float inline-flex" aria-hidden="true">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-sunrise/20 to-wave/20 border border-wave/20 shadow-card">
              <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="url(#heroGrad)"
                  opacity="0.15"
                />
                <path d="M20 32 L32 20 L44 32 L32 44 Z" fill="url(#heroGrad)" />
                <defs>
                  <linearGradient
                    id="heroGrad"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ff785a" />
                    <stop offset="100%" stopColor="#0f6c7b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof Strip ─── */}
      <SocialProofStrip />

      {/* ─── How It Works ─── */}
      <HowItWorks />

      {/* ─── Featured Creators ─── */}
      <FeaturedCreators />

      {/* ─── Testimonials ─── */}
      <TestimonialsSection />

      {/* ─── Final CTA Band ─── */}
      <section
        aria-label="Get started with Stellar TipJar"
        className="relative overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-wave/10 via-accent/5 to-sunrise/10 px-8 py-16 text-center"
      >
        <div
          className="absolute inset-0 soft-grid opacity-20 rounded-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">
            Ready to start tipping?
          </h2>
          <p className="text-ink/60 text-base md:text-lg leading-relaxed mb-8">
            Join thousands of creators and supporters already using Stellar
            TipJar. Connect your Freighter wallet and send your first tip in
            under 60 seconds.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/explore">
              <Button size="lg" className="px-10 shadow-lg">
                Explore Creators
              </Button>
            </Link>
            <Link href="/tips">
              <Button variant="ghost" size="lg" className="px-10">
                Learn more
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
