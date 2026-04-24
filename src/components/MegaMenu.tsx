"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavItemProps {
  label: string;
  href?: string;
  megaMenu?: ReactNode;
}

export function NavItem({ label, href, megaMenu }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  if (!megaMenu && href) {
    return (
      <Link
        href={href}
        className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded dark:text-gray-300 dark:hover:text-purple-400"
      >
        {label}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded dark:text-gray-300 dark:hover:text-purple-400"
      >
        {label}
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-2 min-w-[480px] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
          >
            {megaMenu}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Reusable mega menu link item */
export function MegaMenuLink({ href, icon, title, description }: { href: string; icon: ReactNode; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-purple-50 dark:hover:bg-purple-950/40"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
}
