"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { useCreatorSearch } from "@/hooks/queries/useCreatorSearch";
import { generateAvatarUrl } from "@/utils/imageUtils";
import type { SelectedCreator } from "./CreatorComparison";

interface CreatorSelectorProps {
  onCreatorSelect: (creator: SelectedCreator) => void;
  selectedCreators: SelectedCreator[];
  maxSelections: number;
}

export function CreatorSelector({ 
  onCreatorSelect, 
  selectedCreators, 
  maxSelections 
}: CreatorSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  
  const { data: searchResults, isPending } = useCreatorSearch(searchQuery, {
    enabled: searchQuery.length >= 2
  });

  const handleCreatorSelect = (creator: SelectedCreator) => {
    onCreatorSelect(creator);
    setSearchQuery("");
    setShowResults(false);
  };

  const isCreatorSelected = (username: string) => {
    return selectedCreators.some(c => c.username === username);
  };

  const canAddMore = selectedCreators.length < maxSelections;

  return (
    <div className="relative">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ink/40" />
        <input
          type="text"
          placeholder={canAddMore ? "Search creators by username or name..." : `Maximum ${maxSelections} creators selected`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(e.target.value.length >= 2);
          }}
          onFocus={() => setShowResults(searchQuery.length >= 2)}
          disabled={!canAddMore}
          className="w-full pl-10 pr-4 py-3 border border-ink/20 rounded-xl bg-white/50 text-ink placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-wave/20 focus:border-wave disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Search Results */}
      {showResults && searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-ink/20 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
          {isPending ? (
            <div className="p-4 text-center text-ink/50">
              Searching...
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="p-2">
              {searchResults.map((creator) => (
                <div
                  key={creator.username}
                  className="flex items-center justify-between p-3 hover:bg-ink/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={generateAvatarUrl(creator.username)}
                      alt={creator.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-ink">{creator.displayName}</p>
                      <p className="text-sm text-ink/60">@{creator.username}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={isCreatorSelected(creator.username) ? "ghost" : "default"}
                    onClick={() => handleCreatorSelect({
                      username: creator.username,
                      displayName: creator.displayName
                    })}
                    disabled={isCreatorSelected(creator.username) || !canAddMore}
                  >
                    {isCreatorSelected(creator.username) ? "Selected" : "Add"}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-ink/50">
              No creators found
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {showResults && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
}