"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerContainerVariants, staggerItemVariants } from "@/utils/animations";

interface Testimonial {
  quote: string;
  name: string;
  handle: string;
  role: string;
  rating: number;
  avatarBg: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Stellar TipJar changed how I earn. I got a tip from a fan in Japan within 3 seconds — something PayPal could never do.",
    name: "Alice Chen",
    handle: "@alice",
    role: "Digital Artist · Berlin",
    rating: 5,
    avatarBg: "from-sunrise to-wave",
    initials: "AC",
  },
  {
    quote:
      "As someone building open-source Stellar tools, getting tips directly in XLM is incredibly motivating. The UX is seamless.",
    name: "Marcus Webb",
    handle: "@stellar-dev",
    role: "Blockchain Developer · San Francisco",
    rating: 5,
    avatarBg: "from-wave to-accent",
    initials: "MW",
  },
  {
    quote:
      "I've tried other platforms but nothing matches the fee structure here. I keep nearly 100% of every tip. That's game-changing.",
    name: "Yuki Tanaka",
    handle: "@pixelmaker",
    role: "Pixel Artist · Tokyo",
    rating: 5,
    avatarBg: "from-accent to-accent-alt",
    initials: "YT",
  },
  {
    quote:
      "My community is spread across 40 countries. Stellar TipJar is the only tool where everyone can participate equally.",
    name: "Priya Nair",
    handle: "@community-lab",
    role: "Community Organizer · London",
    rating: 5,
    avatarBg: "from-accent-alt to-sunrise",
    initials: "PN",
  },
  {
    quote:
      "The wallet integration with Freighter took me 2 minutes to set up. Now I earn tips while I sleep. Literally.",
    name: "Jordan Blake",
    handle: "@blockchain-edu",
    role: "Crypto Educator · New York",
    rating: 5,
    avatarBg: "from-sunrise to-accent-alt",
    initials: "JB",
  },
  {
    quote:
      "Borderless, instant, and beautifully designed. This is what creator monetization should have always looked like.",
    name: "Sofia Torres",
    handle: "@crypto-artist",
    role: "Crypto Artist · Paris",
    rating: 5,
    avatarBg: "from-wave to-sunrise",
    initials: "ST",
  },
];

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < value ? "text-sunrise" : "text-ink/15"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section aria-labelledby="testimonials-heading" className="py-4">
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, margin: "-60px" }}
        className="text-center mb-12"
      >
        <span className="inline-flex rounded-full bg-accent-alt/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-alt mb-4">
          Creator Stories
        </span>
        <h2
          id="testimonials-heading"
          className="text-3xl md:text-4xl font-bold text-ink tracking-tight"
        >
          Loved by Creators Worldwide
        </h2>
        <p className="mt-4 text-ink/60 max-w-xl mx-auto text-base leading-relaxed">
          From indie artists to open-source developers — here's what they say about tipping on Stellar.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={prefersReduced ? undefined : staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.handle}
            variants={prefersReduced ? undefined : staggerItemVariants}
            className="flex flex-col gap-4 rounded-3xl border border-ink/8 bg-[color:var(--surface)] p-6 hover:border-accent-alt/20 hover:shadow-lg hover:shadow-accent-alt/5 transition-all duration-300"
          >
            <StarRating value={t.rating} />

            <blockquote className="text-sm text-ink/75 leading-relaxed flex-1">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3 pt-2 border-t border-ink/5">
              {/* Avatar with gradient initials */}
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg} text-white text-xs font-bold shrink-0`}
                aria-hidden="true"
              >
                {t.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{t.name}</p>
                <p className="text-xs text-ink/45 truncate">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
