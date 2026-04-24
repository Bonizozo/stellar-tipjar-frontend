"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TabProps } from "./Tab";

type Style = "underline" | "pills" | "enclosed";
type Orientation = "horizontal" | "vertical";

interface TabListProps {
  tabs: TabProps[];
  activeIndex: number;
  style?: Style;
  orientation?: Orientation;
  onChange: (index: number) => void;
}

export const TabList: React.FC<TabListProps> = ({
  tabs,
  activeIndex,
  style = "underline",
  orientation = "horizontal",
  onChange,
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = React.useState({ offset: 0, size: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeIndex];
    const container = containerRef.current;
    if (!el || !container) return;
    const isVertical = orientation === "vertical";
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      offset: isVertical
        ? elRect.top - containerRect.top
        : elRect.left - containerRect.left,
      size: isVertical ? elRect.height : elRect.width,
    });
  }, [activeIndex, orientation]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const enabled = tabs.map((t, i) => (!t.disabled ? i : null)).filter((i) => i !== null) as number[];
    const pos = enabled.indexOf(index);
    let next: number | undefined;

    if (orientation === "horizontal") {
      if (e.key === "ArrowRight") next = enabled[(pos + 1) % enabled.length];
      if (e.key === "ArrowLeft") next = enabled[(pos - 1 + enabled.length) % enabled.length];
    } else {
      if (e.key === "ArrowDown") next = enabled[(pos + 1) % enabled.length];
      if (e.key === "ArrowUp") next = enabled[(pos - 1 + enabled.length) % enabled.length];
    }
    if (e.key === "Home") next = enabled[0];
    if (e.key === "End") next = enabled[enabled.length - 1];

    if (next !== undefined) {
      e.preventDefault();
      onChange(next);
      tabRefs.current[next]?.focus();
    }
  };

  const isVertical = orientation === "vertical";

  const containerClass = [
    "relative",
    isVertical ? "flex flex-col" : "flex flex-row",
    style === "underline" && !isVertical ? "border-b border-gray-200 dark:border-gray-700" : "",
    style === "underline" && isVertical ? "border-r border-gray-200 dark:border-gray-700" : "",
    style === "enclosed" ? "border border-gray-200 dark:border-gray-700 rounded-lg p-1" : "",
    style === "pills" ? "gap-1" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const tabClass = (tab: TabProps, i: number) => {
    const active = i === activeIndex;
    const base = "relative flex items-center gap-2 font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-40 disabled:cursor-not-allowed";

    if (style === "underline")
      return `${base} ${isVertical ? "px-4 py-3 pr-6" : "pb-4 px-1"} ${active ? "text-purple-600 dark:text-purple-400" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`;

    if (style === "pills")
      return `${base} px-4 py-2 rounded-full ${active ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`;

    if (style === "enclosed")
      return `${base} px-4 py-2 rounded-md ${active ? "bg-white dark:bg-gray-900 shadow text-purple-600 dark:text-purple-400" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`;

    return base;
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-orientation={orientation}
      className={containerClass}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          ref={(el) => { tabRefs.current[i] = el; }}
          role="tab"
          id={`tab-${tab.id}`}
          aria-selected={i === activeIndex}
          aria-controls={`panel-${tab.id}`}
          aria-disabled={tab.disabled}
          disabled={tab.disabled}
          tabIndex={i === activeIndex ? 0 : -1}
          onClick={() => !tab.disabled && onChange(i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={tabClass(tab, i)}
        >
          {tab.icon && <span className="shrink-0">{tab.icon}</span>}
          {tab.label}
          {tab.badge !== undefined && (
            <span className="ml-1 min-w-[1.25rem] h-5 px-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs flex items-center justify-center">
              {tab.badge}
            </span>
          )}
        </button>
      ))}

      {/* Sliding indicator — only for underline style */}
      {style === "underline" && (
        <motion.div
          className={`absolute bg-purple-600 rounded-full ${isVertical ? "right-0 w-0.5" : "bottom-0 h-0.5"}`}
          animate={
            isVertical
              ? { top: indicator.offset, height: indicator.size }
              : { left: indicator.offset, width: indicator.size }
          }
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  );
};
