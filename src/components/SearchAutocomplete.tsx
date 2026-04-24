'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, X, Clock } from 'lucide-react';

interface SearchAutocompleteProps {
  suggestions: string[];
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  suggestions,
  value,
  onChange,
  onSelect,
  isLoading = false,
  placeholder = 'Search...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          selectSuggestion(suggestions[highlightedIndex]);
        } else if (value.trim()) {
          onSelect(value);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        if (highlightedIndex >= 0) {
          selectSuggestion(suggestions[highlightedIndex]);
        }
        setIsOpen(false);
        break;
    }
  };

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    onSelect(suggestion);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(suggestions.length > 0)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          aria-label="Search autocomplete input"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="autocomplete-list"
        />

        {/* Clear Button */}
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul
          id="autocomplete-list"
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion}-${index}`}
              role="option"
              aria-selected={highlightedIndex === index}
            >
              <button
                onClick={() => selectSuggestion(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors flex items-center gap-2 ${
                  highlightedIndex === index
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : ''
                }`}
              >
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {suggestion}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchAutocomplete;
