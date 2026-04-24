"use client";

import React, { useMemo, useState } from "react";
import useBreadcrumbs, { Crumb } from "../../hooks/useBreadcrumbs";
import BreadcrumbItem from "./BreadcrumbItem";
import Link from "next/link";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

type Props = {
  maxItems?: number; // maximum visible items before collapsing
  separator?: React.ReactNode;
  labelMap?: Record<string, string>;
  iconMap?: Record<string, React.ReactNode>;
};

export default function Breadcrumb({
  maxItems = 4,
  separator,
  labelMap,
  iconMap,
}: Props) {
  const breadcrumbs = useBreadcrumbs(labelMap, iconMap);
  const [open, setOpen] = useState(false);

  const shouldCollapse = breadcrumbs.length > maxItems;

  const first = breadcrumbs[0];
  const last = breadcrumbs[breadcrumbs.length - 1];

  // items to show collapsed (middle)
  const middle = useMemo(() => {
    if (!shouldCollapse) return breadcrumbs.slice(1, breadcrumbs.length - 1);
    // keep first and last and show one before last as visible
    const keepBeforeLast = 1;
    const middleStart = 1;
    const middleEnd = breadcrumbs.length - 1 - keepBeforeLast;
    return breadcrumbs.slice(middleStart, middleEnd);
  }, [breadcrumbs, shouldCollapse]);

  // JSON-LD structured data
  const jsonLd = useMemo(() => {
    const itemList = breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      item: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}${b.path}`,
    }));

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: itemList,
    };
  }, [breadcrumbs]);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center">
      <ol className="flex items-center gap-0">
        {/* first item */}
        <BreadcrumbItem
          href={first.path}
          label={first.label}
          icon={first.icon}
          separator={
            breadcrumbs.length > 1
              ? (separator ?? (
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                ))
              : null
          }
        />

        {/* collapsed middle */}
        {shouldCollapse ? (
          <li className="inline-flex items-center relative">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-controls="breadcrumb-menu"
              className="ml-2 mr-2 inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ...
              </span>
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            </button>

            {/* dropdown */}
            {open && (
              <ul
                id="breadcrumb-menu"
                role="menu"
                className="absolute left-0 top-full mt-2 bg-white dark:bg-zinc-900 shadow-lg rounded-md py-1 min-w-[180px] z-50 animate-scale-in"
              >
                {middle.map((m) => (
                  <li key={m.path} role="none">
                    <Link
                      href={m.path as any}
                      role="menuitem"
                      className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        {m.icon && <span className="w-4 h-4">{m.icon}</span>}
                        <span>{m.label}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {separator ?? (
              <ChevronRightIcon className="w-4 h-4 text-gray-400 ml-2" />
            )}
          </li>
        ) : (
          // not collapsed: show normal middle items
          breadcrumbs
            .slice(1, breadcrumbs.length - 1)
            .map((b) => (
              <BreadcrumbItem
                key={b.path}
                href={b.path}
                label={b.label}
                icon={b.icon}
                separator={
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                }
              />
            ))
        )}

        {/* one before last (when collapsed we keep one before last visible) */}
        {shouldCollapse && breadcrumbs.length > 2 && (
          <BreadcrumbItem
            href={breadcrumbs[breadcrumbs.length - 2].path}
            label={breadcrumbs[breadcrumbs.length - 2].label}
            icon={breadcrumbs[breadcrumbs.length - 2].icon}
            separator={<ChevronRightIcon className="w-4 h-4 text-gray-400" />}
          />
        )}

        {/* last item */}
        {breadcrumbs.length > 1 && (
          <BreadcrumbItem label={last.label} icon={last.icon} isCurrent />
        )}
      </ol>

      {/* structured data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <style jsx>{`
        /* small animation for dropdown */
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 140ms ease-out both;
        }
      `}</style>
    </nav>
  );
}
