"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerContainerVariants, staggerItemVariants } from "@/utils/animations";

const steps = [
  {
    step: "01",
    title: "Connect Your Wallet",
    description:
      "Install Freighter and connect your Stellar wallet in one click. No sign-ups, no KYC — just your keys.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    color: "from-sunrise/20 to-sunrise/5",
    accent: "text-sunrise",
    border: "border-sunrise/20",
  },
  {
    step: "02",
    title: "Discover Creators",
    description:
      "Browse verified creators across art, tech, music, and education. Filter by category, location, or popularity.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    color: "from-wave/20 to-wave/5",
    accent: "text-wave",
    border: "border-wave/20",
  },
  {
    step: "03",
    title: "Send a Tip",
    description:
      "Choose an amount in XLM or your local currency. Tips arrive in seconds with near-zero fees on Stellar.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    color: "from-accent-alt/20 to-accent-alt/5",
    accent: "text-accent-alt",
    border: "border-accent-alt/20",
  },
];

export function HowItWorks() {
  const prefersReduced = useReducedMotion();

  return (
    <section aria-labelledby="how-it-works-heading" className="py-4">
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, margin: "-60px" }}
        className="text-center mb-12"
      >
        <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
          Simple as 1-2-3
        </span>
        <h2
          id="how-it-works-heading"
          className="text-3xl md:text-4xl font-bold text-ink tracking-tight"
        >
          How Stellar TipJar Works
        </h2>
        <p className="mt-4 text-ink/60 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          No middlemen. No delays. Just direct, borderless support for the creators you love.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-6 sm:grid-cols-3"
        variants={prefersReduced ? undefined : staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {steps.map(({ step, title, description, icon, color, accent, border }) => (
          <motion.div
            key={step}
            variants={prefersReduced ? undefined : staggerItemVariants}
            className={`relative flex flex-col gap-5 rounded-3xl border ${border} bg-gradient-to-b ${color} p-8 overflow-hidden`}
          >
            {/* Large step number watermark */}
            <span
              className="absolute -top-3 -right-2 text-[7rem] font-black leading-none text-ink/5 select-none pointer-events-none"
              aria-hidden="true"
            >
              {step}
            </span>

            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[color:var(--surface)] shadow-sm ${accent}`}>
              {icon}
            </div>

            <div>
              <p className={`text-xs font-bold uppercase tracking-widest ${accent} mb-2`}>
                Step {step}
              </p>
              <h3 className="text-xl font-bold text-ink mb-3">{title}</h3>
              <p className="text-sm text-ink/65 leading-relaxed">{description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
