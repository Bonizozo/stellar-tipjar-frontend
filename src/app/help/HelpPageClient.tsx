"use client";

import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/Accordion";

// ─── FAQ DATA ────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  items: FaqItem[];
}

export const FAQ_DATA: FaqCategory[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: "🚀",
    color: "wave",
    items: [
      {
        id: "gs-1",
        question: "What is Stellar Tip Jar?",
        answer:
          "Stellar Tip Jar is a decentralised tipping platform built on the Stellar blockchain. It lets supporters send cryptocurrency tips to creators instantly and securely, with no intermediaries. Creators can receive tips for music, art, content, software, or any creative work.",
      },
      {
        id: "gs-2",
        question: "How does it work?",
        answer:
          "1. Creators set up a profile and share their link. 2. Supporters visit the profile and connect their wallet. 3. Supporters send tips in XLM (Stellar Lumens). 4. Tips appear in the creator's account in real time. 5. Creators can withdraw tips to their wallet at any time.",
      },
      {
        id: "gs-3",
        question: "Is it free to use?",
        answer:
          "Stellar Tip Jar is mostly free. There are no fees for supporters or account creation fees for creators. A small platform fee (typically 2–5%) is taken on each tip, plus a negligible Stellar network fee of ~0.00001 XLM. Your total cost = Tip Amount + Platform Fee + Network Fee.",
      },
      {
        id: "gs-4",
        question: "What cryptocurrencies are supported?",
        answer:
          "Currently Stellar Tip Jar supports XLM (Stellar Lumens) exclusively. XLM is the native currency of the Stellar network and enables fast, cheap transactions. Support for additional Stellar-based assets may be added in future.",
      },
      {
        id: "gs-5",
        question: "Is Stellar Tip Jar safe?",
        answer:
          "Yes. Stellar Tip Jar relies on blockchain security from the Stellar network. Transactions are decentralised, no central server stores your private keys, and only you control your wallet. The codebase is open source.",
      },
      {
        id: "gs-6",
        question: "What is the Stellar network?",
        answer:
          "Stellar is a blockchain designed for fast, secure payments. It offers 5-second transaction finality, fees of fractions of a cent, decentralised architecture (no single point of failure), and has been operational since 2014. Learn more at stellar.org.",
      },
    ],
  },
  {
    id: "wallet-payments",
    label: "Wallet & Payments",
    icon: "💳",
    color: "sunrise",
    items: [
      {
        id: "wp-1",
        question: "How do I connect my wallet?",
        answer:
          "Click the 'Connect Wallet' button in the top navigation. Stellar Tip Jar supports Freighter (recommended), Albedo, and xBull. Make sure your chosen wallet extension is installed and unlocked before connecting.",
      },
      {
        id: "wp-2",
        question: "Which wallets are supported?",
        answer:
          "Freighter is the recommended wallet — it's easy to set up and works seamlessly. Albedo and xBull are also fully supported. Any Stellar-compatible wallet that exposes a standard signing API should work.",
      },
      {
        id: "wp-3",
        question: "How do I send a tip?",
        answer:
          "1. Connect your wallet. 2. Navigate to a creator's profile. 3. Enter the tip amount in XLM. 4. Optionally add a message. 5. Click 'Send Tip'. 6. Approve the transaction in your wallet popup. The tip appears in the creator's account within seconds.",
      },
      {
        id: "wp-4",
        question: "What are the fees for sending a tip?",
        answer:
          "Fees are minimal: the Stellar network fee is ~0.00001 XLM (negligible), plus a platform fee of roughly 2–5% of the tip amount. For example, a 10 XLM tip costs approximately 10.50 XLM in total. The exact breakdown is shown on the confirmation screen before you approve.",
      },
      {
        id: "wp-5",
        question: "Can I get a refund?",
        answer:
          "Blockchain transactions are final and irreversible once confirmed. Always double-check the recipient address and amount before approving in your wallet. If you send to the wrong person, you would need to ask them to return it.",
      },
      {
        id: "wp-6",
        question: "Is my tip anonymous?",
        answer:
          "Tips are semi-anonymous. Creators see your wallet address and any message you attach. Your display name may also be visible if your wallet profile has one set. On-chain transaction history is publicly visible.",
      },
      {
        id: "wp-7",
        question: "What if my transaction fails?",
        answer:
          "If a tip fails, your balance won't change — the transaction is simply rejected. Common causes are: insufficient XLM balance (you need a small reserve plus the tip amount), wallet not unlocked, or network congestion. Check your wallet for the specific error message and try again.",
      },
    ],
  },
  {
    id: "creator-tips",
    label: "Creator Tips",
    icon: "🎨",
    color: "moss",
    items: [
      {
        id: "ct-1",
        question: "How do I set up my creator profile?",
        answer:
          "Connect your wallet, then navigate to your Profile page. Fill in your display name, bio, avatar, and social links. Your public tip link is automatically generated from your wallet address. Share this link with your audience to start receiving tips.",
      },
      {
        id: "ct-2",
        question: "How do I withdraw my earnings?",
        answer:
          "Tips are sent directly to your connected wallet address on the Stellar network — there is no separate withdrawal step. Your XLM balance updates in real time as tips arrive. You can then transfer XLM from your wallet to an exchange to convert to fiat.",
      },
      {
        id: "ct-3",
        question: "Can I customise my tip page?",
        answer:
          "Yes. In your creator settings you can set a profile photo, banner image, bio, suggested tip amounts, and a custom thank-you message that supporters see after tipping.",
      },
      {
        id: "ct-4",
        question: "Can I embed a tip widget on my own site?",
        answer:
          "Yes — visit the Widgets page to generate an embeddable tip button or card. Copy the provided code snippet and paste it into your website or blog. The widget opens a tip modal without the supporter needing to leave your site.",
      },
      {
        id: "ct-5",
        question: "How do I view my tip history?",
        answer:
          "Navigate to the Tips page in your dashboard. You can see all incoming tips, the sender's address, amount, date, and any messages attached. You can also export this data for your records.",
      },
    ],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    icon: "🔧",
    color: "primary",
    items: [
      {
        id: "ts-1",
        question: "My wallet won't connect — what should I do?",
        answer:
          "First, make sure your wallet extension (e.g. Freighter) is installed and that you're on the correct network (Stellar mainnet, not testnet). Try refreshing the page, unlocking your wallet, and clicking Connect again. If the issue persists, disable other browser extensions that might conflict, or try a different browser.",
      },
      {
        id: "ts-2",
        question: "I sent a tip but the creator didn't receive it.",
        answer:
          "Stellar transactions settle in ~5 seconds. If the tip doesn't appear after a minute, look up your transaction hash on stellar.expert or stellarchain.io to confirm it was broadcast. If the transaction shows as successful on-chain but the creator dashboard hasn't updated, please contact support with the transaction hash.",
      },
      {
        id: "ts-3",
        question: "I'm getting a 'minimum balance' error.",
        answer:
          "The Stellar network requires every account to maintain a minimum XLM balance (currently 1 XLM base reserve, plus 0.5 XLM per trustline). Make sure your wallet holds enough XLM above this minimum to cover the tip plus fees. Top up your wallet via an exchange and try again.",
      },
      {
        id: "ts-4",
        question: "The page is loading slowly or not at all.",
        answer:
          "Try a hard refresh (Ctrl+Shift+R / Cmd+Shift+R). Clear your browser cache and cookies. Disable browser extensions temporarily. If the problem continues, check our status page or social channels for any ongoing service disruptions.",
      },
      {
        id: "ts-5",
        question: "How do I report a bug or contact support?",
        answer:
          "You can open an issue on our GitHub repository, reach out via the community Discord server, or email support@stellar-tipjar.app. Please include as much detail as possible: browser version, wallet extension version, steps to reproduce, and any error messages you see.",
      },
      {
        id: "ts-6",
        question: "I lost access to my wallet — can I recover my tips?",
        answer:
          "Tips are sent to your Stellar wallet address. Recovery depends entirely on your wallet's seed phrase/secret key — Stellar Tip Jar never holds your funds. If you have your 12/24-word seed phrase, you can restore your wallet using Freighter or any compatible Stellar wallet. Without the seed phrase, access cannot be recovered.",
      },
    ],
  },
];

// ─── FEEDBACK BUTTON ─────────────────────────────────────────────────────────

function FeedbackButtons({ itemId }: { itemId: string }) {
  const [voted, setVoted] = useState<"yes" | "no" | null>(null);

  return (
    <div className="mt-4 flex items-center gap-3 border-t border-ink/5 pt-4 dark:border-canvas/5">
      <span className="text-xs text-ink/40 dark:text-canvas/40 select-none">
        Was this helpful?
      </span>
      <button
        type="button"
        aria-label="Yes, this was helpful"
        onClick={() => setVoted("yes")}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 ${
          voted === "yes"
            ? "bg-semantic-success/15 text-semantic-success ring-1 ring-semantic-success/30"
            : "bg-ink/5 text-ink/50 hover:bg-semantic-success/10 hover:text-semantic-success dark:bg-canvas/5 dark:text-canvas/50"
        }`}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
        {voted === "yes" ? "Thanks!" : "Yes"}
      </button>
      <button
        type="button"
        aria-label="No, this was not helpful"
        onClick={() => setVoted("no")}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 ${
          voted === "no"
            ? "bg-semantic-error/15 text-semantic-error ring-1 ring-semantic-error/30"
            : "bg-ink/5 text-ink/50 hover:bg-semantic-error/10 hover:text-semantic-error dark:bg-canvas/5 dark:text-canvas/50"
        }`}
      >
        <svg className="h-3.5 w-3.5 rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
        {voted === "no" ? "Got it" : "No"}
      </button>
    </div>
  );
}

// ─── CATEGORY TAB ─────────────────────────────────────────────────────────────

const COLOR_MAP: Record<string, string> = {
  wave: "border-wave/40 bg-wave/10 text-wave hover:bg-wave/20 data-[active=true]:bg-wave data-[active=true]:text-white data-[active=true]:border-wave",
  sunrise: "border-sunrise/40 bg-sunrise/10 text-sunrise hover:bg-sunrise/20 data-[active=true]:bg-sunrise data-[active=true]:text-white data-[active=true]:border-sunrise",
  moss: "border-moss/40 bg-moss/10 text-moss hover:bg-moss/20 data-[active=true]:bg-moss data-[active=true]:text-white data-[active=true]:border-moss",
  primary: "border-primary-500/40 bg-primary-500/10 text-primary-600 hover:bg-primary-500/20 data-[active=true]:bg-primary-600 data-[active=true]:text-white data-[active=true]:border-primary-600",
};

function CategoryTab({
  category,
  isActive,
  onClick,
  resultCount,
}: {
  category: FaqCategory;
  isActive: boolean;
  onClick: () => void;
  resultCount: number;
}) {
  const colorClass = COLOR_MAP[category.color] ?? COLOR_MAP["primary"];
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={isActive}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 ${colorClass}`}
    >
      <span aria-hidden="true">{category.icon}</span>
      {category.label}
      <span className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${isActive ? "bg-white/20" : "bg-ink/10 dark:bg-canvas/10"}`}>
        {resultCount}
      </span>
    </button>
  );
}

// ─── SEARCH BAR ──────────────────────────────────────────────────────────────

function HelpSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <label htmlFor="faq-search" className="sr-only">
        Search help articles
      </label>
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40 dark:text-canvas/40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        id="faq-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search questions…"
        className="w-full rounded-2xl border border-ink/10 bg-white/60 py-3.5 pl-12 pr-4 text-base text-ink placeholder:text-ink/40 shadow-soft backdrop-blur-sm transition focus:border-wave/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-wave/30 dark:border-canvas/10 dark:bg-ink/30 dark:text-canvas dark:placeholder:text-canvas/40 dark:focus:border-wave/50 dark:focus:bg-ink/50"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink/40 hover:bg-ink/10 hover:text-ink dark:text-canvas/40 dark:hover:bg-canvas/10 dark:hover:text-canvas"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── HIGHLIGHT MATCH ─────────────────────────────────────────────────────────

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="rounded bg-wave/25 text-wave dark:bg-wave/30 dark:text-wave px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ─── MAIN PAGE CLIENT ────────────────────────────────────────────────────────

export function HelpPageClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const q = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return FAQ_DATA.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [q]);

  const visibleCategories =
    activeCategory === "all"
      ? filteredCategories
      : filteredCategories.filter((c) => c.id === activeCategory);

  const totalResults = filteredCategories.reduce((n, c) => n + c.items.length, 0);

  const activeCategoryExists = filteredCategories.some((c) => c.id === activeCategory);
  if (activeCategory !== "all" && !activeCategoryExists && filteredCategories.length > 0) {
    setActiveCategory("all");
  }

  return (
    <div className="space-y-12">
      {/* ── Hero ── */}
      <section
        aria-labelledby="help-heading"
        className="relative overflow-hidden rounded-3xl border border-ink/10 bg-[color:var(--surface)] px-6 py-14 text-center shadow-card"
      >
        <div className="absolute inset-0 soft-grid rounded-3xl opacity-30" aria-hidden="true" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-wave/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sunrise/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-wave/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-wave">
            <span className="h-1.5 w-1.5 rounded-full bg-wave animate-pulse" aria-hidden="true" />
            Help Centre
          </span>
          <h1
            id="help-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-canvas"
          >
            How can we{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-wave to-primary-500">
              help you?
            </span>
          </h1>
          <p className="text-base md:text-lg text-ink/60 dark:text-canvas/60 leading-relaxed">
            Browse answers to common questions about wallets, tips, XLM, and more.
          </p>
          <HelpSearchBar value={query} onChange={setQuery} />
        </div>
      </section>

      {/* ── Category tabs ── */}
      <nav aria-label="FAQ categories" className="flex flex-wrap gap-2">
        <button
          type="button"
          data-active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/5 px-4 py-2 text-sm font-medium text-ink/70 transition-all duration-200 hover:bg-ink/10 data-[active=true]:border-ink/30 data-[active=true]:bg-ink data-[active=true]:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 dark:border-canvas/15 dark:bg-canvas/5 dark:text-canvas/70 dark:hover:bg-canvas/10 dark:data-[active=true]:bg-canvas dark:data-[active=true]:text-ink"
        >
          All topics
          <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-xs font-semibold">
            {totalResults}
          </span>
        </button>
        {FAQ_DATA.map((cat) => {
          const count = filteredCategories.find((c) => c.id === cat.id)?.items.length ?? 0;
          return (
            <CategoryTab
              key={cat.id}
              category={cat}
              isActive={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              resultCount={count}
            />
          );
        })}
      </nav>

      {/* ── No results ── */}
      {q && totalResults === 0 && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-dashed border-ink/15 px-8 py-16 text-center dark:border-canvas/15"
        >
          <p className="text-3xl mb-3" aria-hidden="true">🔍</p>
          <p className="text-lg font-semibold text-ink/60 dark:text-canvas/60">
            No results for &ldquo;{query}&rdquo;
          </p>
          <p className="mt-1 text-sm text-ink/40 dark:text-canvas/40">
            Try different keywords, or browse all categories.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-4 rounded-full bg-wave/10 px-5 py-2 text-sm font-medium text-wave hover:bg-wave/20 transition"
          >
            Clear search
          </button>
        </div>
      )}

      {/* ── FAQ sections ── */}
      {visibleCategories.map((category) => (
        <section key={category.id} aria-labelledby={`cat-${category.id}`}>
          <div className="mb-5 flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-wave/10 text-xl"
              aria-hidden="true"
            >
              {category.icon}
            </span>
            <h2
              id={`cat-${category.id}`}
              className="text-xl font-bold text-ink dark:text-canvas"
            >
              {category.label}
            </h2>
            <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-xs font-semibold text-ink/50 dark:bg-canvas/5 dark:text-canvas/50">
              {category.items.length}
            </span>
          </div>

          <Accordion type="single">
            {category.items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>
                  <HighlightMatch text={item.question} query={q} />
                </AccordionTrigger>
                <AccordionContent>
                  <p className="whitespace-pre-line">
                    <HighlightMatch text={item.answer} query={q} />
                  </p>
                  <FeedbackButtons itemId={item.id} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ))}

      {/* ── Contact CTA ── */}
      <section
        aria-label="Still need help?"
        className="rounded-3xl border border-ink/10 bg-gradient-to-br from-wave/5 via-transparent to-primary-500/5 px-8 py-10 text-center"
      >
        <p className="text-2xl font-bold text-ink dark:text-canvas mb-2">
          Still need help?
        </p>
        <p className="text-sm text-ink/55 dark:text-canvas/55 mb-6">
          Can&apos;t find the answer? Reach out and we&apos;ll get back to you.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="mailto:support@stellar-tipjar.app"
            className="inline-flex items-center gap-2 rounded-full bg-wave px-6 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-wave/90 transition"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Support
          </a>
          <a
            href="https://github.com/stellar-tipjar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-6 py-2.5 text-sm font-semibold text-ink/70 shadow-soft hover:bg-white hover:text-ink transition dark:border-canvas/15 dark:bg-canvas/5 dark:text-canvas/70 dark:hover:bg-canvas/10 dark:hover:text-canvas"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Open an Issue
          </a>
        </div>
      </section>
    </div>
  );
}
