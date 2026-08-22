"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { SearchBar } from "@/components/SearchBar";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useWallet } from "@/hooks/useWallet";

export interface MobileNavItem {
  href: string;
  label: string;
  icon?: ReactNode;
}

export interface MobileNavSection {
  heading: string;
  items: MobileNavItem[];
}

interface MobileMenuProps {
  sections: MobileNavSection[];
  isOpen: boolean;
  onClose: () => void;
}

/** Compact wallet status block shown at the top of the drawer. */
function WalletStatus({ onClose }: { onClose: () => void }) {
  const {
    isConnected,
    isInstalled,
    shortAddress,
    network,
    balance,
    isConnecting,
    connect,
    disconnect,
  } = useWallet();

  if (!isInstalled) {
    return (
      <button
        type="button"
        onClick={() =>
          window.open("https://freighter.app", "_blank", "noopener,noreferrer")
        }
        className="flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-[color:var(--surface)] px-4 py-3 text-sm font-medium text-ink transition hover:border-wave/40"
      >
        <span>Install Freighter wallet</span>
        <svg className="h-4 w-4 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </button>
    );
  }

  if (isConnected) {
    return (
      <div className="rounded-2xl border border-wave/25 bg-gradient-to-br from-wave/10 to-accent/5 p-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-wave/70">
              Connected · {network}
            </p>
            <p className="truncate font-mono text-sm text-ink/80">{shortAddress}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-ink/50">Balance</p>
            <p className="font-mono text-sm font-semibold text-ink">{balance} XLM</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => void disconnect()}
          className="mt-3 w-full rounded-xl border border-error/20 bg-error/5 py-2 text-xs font-semibold text-error transition hover:bg-error/10"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        void connect();
        onClose();
      }}
      disabled={isConnecting}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-wave to-accent px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M21 12h-8m0 0l3-3m-3 3l3 3" />
      </svg>
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}

export function MobileMenu({ sections, isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const drawerRef = useFocusTrap<HTMLDivElement>(isOpen);

  // Close on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) onClose();
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Scroll lock while open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Reset search whenever the drawer closes
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.label.toLowerCase().includes(q),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [sections, query]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Full-screen drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[color:var(--surface)] shadow-2xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <span className="text-base font-bold text-ink">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-lg p-1.5 text-ink/60 transition hover:bg-ink/5"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Wallet + search */}
            <div className="space-y-3 border-b border-ink/10 px-5 py-4">
              <WalletStatus onClose={onClose} />
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search menu..."
                label="Search navigation"
              />
            </div>

            {/* Grouped nav */}
            <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Mobile sections">
              {filteredSections.length === 0 ? (
                <p className="py-8 text-center text-sm text-ink/50">
                  No results for &ldquo;{query}&rdquo;
                </p>
              ) : (
                filteredSections.map((section) => (
                  <div key={section.heading} className="mb-6 last:mb-0">
                    <h2 className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-ink/40">
                      {section.heading}
                    </h2>
                    <ul className="space-y-1">
                      {section.items.map((item) => {
                        const active = isActive(item.href);
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href as any}
                              onClick={onClose}
                              aria-current={active ? "page" : undefined}
                              className={[
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                                active
                                  ? "bg-wave/10 text-wave"
                                  : "text-ink/80 hover:bg-ink/5 hover:text-wave",
                              ].join(" ")}
                            >
                              {item.icon && (
                                <span className={active ? "text-wave" : "text-ink/50"}>
                                  {item.icon}
                                </span>
                              )}
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
