'use client';

import React from 'react';
import { Trash2, Clock, AlertCircle } from 'lucide-react';
import Button from './Button';

interface SearchHistoryItem {
  query: string;
  timestamp: Date;
  results: Array<any>;
}

interface SearchHistoryProps {
  items: SearchHistoryItem[];
  maxItems?: number;
  onSelectHistory: (query: string) => void;
  onClearHistory: () => void;
  isLoading?: boolean;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  items,
  maxItems = 10,
  onSelectHistory,
  onClearHistory,
  isLoading = false,
}) => {
  const recentItems = items.slice(0, maxItems);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Date(date).toLocaleDateString();
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          No search history yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Recent Searches
        </h3>
        <Button
          onClick={onClearHistory}
          disabled={isLoading || items.length === 0}
          className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-200"
        >
          Clear All
        </Button>
      </div>

      {/* History Items */}
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {recentItems.map((item, index) => (
          <button
            key={`${item.query}-${index}`}
            onClick={() => onSelectHistory(item.query)}
            disabled={isLoading}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 group"
            title={item.query}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.query}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.results.length} results · {formatTime(item.timestamp)}
                </p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">
                {item.results.length}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Truncation Notice */}
      {items.length > maxItems && (
        <div className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <AlertCircle className="w-3 h-3" />
          <span>Showing {maxItems} of {items.length} searches. Clear history to save space.</span>
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
