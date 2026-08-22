"use client";

import { useEffect, useId, useState } from "react";
import { useAnnouncer } from "@/hooks/useAnnouncer";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  /** When provided, announces the result count to screen readers after debounce */
  resultCount?: number;
  /** Label for the input — defaults to "Search" */
  label?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  resultCount,
  label = "Search",
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const announce = useAnnouncer();
  const inputId = useId();

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Announce result count when it changes
  useEffect(() => {
    if (resultCount === undefined) return;
    const msg =
      resultCount === 0
        ? "No results found."
        : `${resultCount} result${resultCount === 1 ? "" : "s"} found.`;
    announce(msg);
  }, [resultCount, announce]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <div role="search" className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          className="h-5 w-5 text-ink/40"
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
      </div>
      <input
        id={inputId}
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-xl border border-ink/10 bg-[color:var(--surface)] py-3 pl-11 pr-10 text-ink placeholder:text-ink/40 focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-ink/40 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 rounded"
          aria-label="Clear search"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
