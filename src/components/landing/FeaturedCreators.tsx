"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerContainerVariants, staggerItemVariants } from "@/utils/animations";
import { CREATOR_EXAMPLES } from "@/utils/creatorData";
import { generateAvatarUrl } from "@/utils/imageUtils";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/Button";

// Pick 6 featured creators — verified, sorted by earnings desc
const FEATURED = CREATOR_EXAMPLES.filter((c) => c.verified)
  .sort((a, b) => b.earnings - a.earnings)
  .slice(0, 6);

function TipCountBadge({ earnings }: { earnings: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-wave/10 px-2.5 py-1 text-xs font-semibold text-wave">
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {earnings.toLocaleString()} XLM
    </span>
  );
}

export function FeaturedCreators() {
  const prefersReduced = useReducedMotion();

  return (
    <section aria-labelledby="featured-creators-heading" className="py-4">
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
      >
        <div>
          <span className="inline-flex rounded-full bg-sunrise/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sunrise mb-3">
            Top Creators
          </span>
          <h2
            id="featured-creators-heading"
            className="text-3xl md:text-4xl font-bold text-ink tracking-tight"
          >
            Meet the Community
          </h2>
          <p className="mt-3 text-ink/60 max-w-lg text-base leading-relaxed">
            Thousands of creators are earning on Stellar. Here are some of the most supported ones right now.
          </p>
        </div>
        <Link href="/explore" className="shrink-0">
          <Button variant="outline" size="sm">
            View all creators
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </Link>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={prefersReduced ? undefined : staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {FEATURED.map((creator) => (
          <motion.div
            key={creator.username}
            variants={prefersReduced ? undefined : staggerItemVariants}
            whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
            className="group"
          >
            <Link
              href={`/creator/${creator.username}`}
              className="flex items-center gap-4 p-4 rounded-2xl border border-ink/8 bg-[color:var(--surface)] hover:border-wave/30 hover:shadow-lg hover:shadow-wave/5 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="relative h-14 w-14 shrink-0 rounded-full overflow-hidden ring-2 ring-ink/5 group-hover:ring-wave/20 transition-all">
                <OptimizedImage
                  src={generateAvatarUrl(creator.username)}
                  alt={creator.displayName || creator.username}
                  fill
                  sizes="56px"
                  priority={false}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-bold text-ink text-sm truncate group-hover:text-wave transition-colors">
                    {creator.displayName || creator.username}
                  </span>
                  {creator.verified && (
                    <svg className="w-3.5 h-3.5 text-wave shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-ink/50 truncate mb-2">
                  {creator.categories[0]} · {creator.location}
                </p>
                <TipCountBadge earnings={creator.earnings} />
              </div>

              {/* Arrow */}
              <svg
                className="w-4 h-4 text-ink/20 group-hover:text-wave/60 group-hover:translate-x-1 transition-all duration-200 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
