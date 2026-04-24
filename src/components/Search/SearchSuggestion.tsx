"use client";

import React from "react";
import { SearchSuggestion as SuggestionType } from "@/hooks/useSearch";

interface HighlightTextProps {
  text: string;
  query: string;
}

function HighlightText({ text, query }: HighlightTextProps) {
  if (!query) return <>{text}</>;
  
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  
  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          className={part.toLowerCase() === query.toLowerCase() ? "text-wave font-bold" : ""}
        >
          {part}
        </span>
      ))}
    </>
  );
}

interface SearchSuggestionProps {
  suggestion: SuggestionType;
  isActive: boolean;
  query: string;
  onMouseEnter: () => void;
  onClick: () => void;
}

export function SearchSuggestion({
  suggestion,
  isActive,
  query,
  onMouseEnter,
  onClick,
}: SearchSuggestionProps) {
  const getIcon = () => {
    switch (suggestion.type) {
      case "creator":
        return (
          <div className="h-2 w-2 rounded-full bg-green-500" title="Creator" />
        );
      case "category":
        return (
          <div className="h-2 w-2 rounded-full bg-blue-500" title="Category" />
        );
      case "tag":
        return (
          <div className="h-2 w-2 rounded-full bg-purple-500" title="Tag" />
        );
      default:
        return null;
    }
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
        isActive ? "bg-wave/10" : "hover:bg-ink/5"
      }`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-ink/5 text-ink/40">
        {suggestion.type === "creator" ? (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        ) : suggestion.type === "category" ? (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-ink">
          <HighlightText text={suggestion.name} query={query} />
        </p>
        <p className="text-xs text-ink/40">{suggestion.description}</p>
      </div>

      <div className="ml-auto">
        {getIcon()}
      </div>
    </div>
  );
}
