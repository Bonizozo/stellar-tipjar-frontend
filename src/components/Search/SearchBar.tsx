"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search creators, categories, tags…" }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-4 h-5 w-5 text-ink/40 pointer-events-none" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
        className="w-full rounded-2xl border border-ink/20 bg-[color:var(--surface)] py-3.5 pl-12 pr-10 text-sm text-ink placeholder-ink/40 focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 transition-all"
        aria-label="Search"
      />
      {value && (
        <button
          type="button"
          onClick={() => { onChange(""); inputRef.current?.focus(); }}
          className="absolute right-3 rounded-full p-1 text-ink/40 hover:text-ink transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
