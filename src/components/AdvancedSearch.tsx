'use client';

import React, { useState } from 'react';
import { Search, Heart, Trash2, Save, Filter as FilterIcon } from 'lucide-react';
import SearchAutocomplete from './SearchAutocomplete';
import SearchHistory from './SearchHistory';
import Button from './Button';
import { useSearch } from '@/hooks/useSearch';

interface AdvancedSearchProps {
  onSearch?: (results: any[]) => void;
  showFilters?: boolean;
  showHistory?: boolean;
  showSavedSearches?: boolean;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  showFilters = true,
  showHistory = true,
  showSavedSearches = true,
}) => {
  const {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    isLoading,
    searchHistory,
    addToHistory,
    clearHistory,
    savedSearches,
    saveSearch,
    deleteSavedSearch,
    loadSavedSearch,
    getAutocompleteSuggestions,
  } = useSearch();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState('');
  const [activeTab, setActiveTab] = useState<'history' | 'saved'>('history');

  const suggestions = getAutocompleteSuggestions(query);

  const handleSearch = () => {
    if (query.trim()) {
      addToHistory(results);
      onSearch?.(results);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch();
    setShowDropdown(false);
  };

  const handleSaveSearch = () => {
    if (saveSearchName.trim()) {
      saveSearch(saveSearchName);
      setSaveSearchName('');
      setShowSaveModal(false);
    }
  };

  const handleSelectHistory = (historyQuery: string) => {
    setQuery(historyQuery);
    setShowDropdown(false);
    handleSearch();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
      {/* Search Bar */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Search
        </label>
        <div className="flex gap-2">
          <SearchAutocomplete
            suggestions={suggestions}
            value={query}
            onChange={setQuery}
            onSelect={handleSelectSuggestion}
            isLoading={isLoading}
            placeholder="Search creators, tips, campaigns..."
          />
          <Button
            onClick={handleSearch}
            disabled={!query.trim() || isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4"
          >
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FilterIcon className="w-4 h-4" />
            Filters
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Category
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
              >
                <option value="">All Categories</option>
                <option value="creators">Creators</option>
                <option value="campaigns">Campaigns</option>
                <option value="tips">Tips</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Sort By
              </label>
              <select
                value={filters.sort || 'relevance'}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
              >
                <option value="relevance">Relevance</option>
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Save Search */}
      <div className="flex gap-2">
        <Button
          onClick={() => setShowSaveModal(true)}
          disabled={!query.trim()}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Save Search
        </Button>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg space-y-3">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Save this search for quick access later
          </p>
          <input
            type="text"
            placeholder="Enter search name..."
            value={saveSearchName}
            onChange={(e) => setSaveSearchName(e.target.value)}
            className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg dark:bg-blue-800 dark:text-white"
            onKeyDown={(e) => e.key === 'Enter' && handleSaveSearch()}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSaveSearch}
              disabled={!saveSearchName.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              Save
            </Button>
            <Button
              onClick={() => setShowSaveModal(false)}
              className="flex-1 bg-gray-400 hover:bg-gray-500"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* History & Saved Searches */}
      {(showHistory || showSavedSearches) && (query.trim() || searchHistory.length > 0 || savedSearches.length > 0) && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
            {showHistory && (
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                History
              </button>
            )}
            {showSavedSearches && (
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'saved'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                Saved ({savedSearches.length})
              </button>
            )}
          </div>

          {/* Content */}
          {activeTab === 'history' && showHistory && (
            <SearchHistory
              items={searchHistory}
              onSelectHistory={handleSelectHistory}
              onClearHistory={clearHistory}
              isLoading={isLoading}
            />
          )}

          {activeTab === 'saved' && showSavedSearches && (
            <div className="space-y-2">
              {savedSearches.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    No saved searches yet
                  </p>
                </div>
              ) : (
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {savedSearches.map((saved) => (
                    <div
                      key={saved.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                    >
                      <button
                        onClick={() => loadSavedSearch(saved)}
                        className="flex-1 text-left"
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {saved.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {saved.query}
                        </p>
                      </button>
                      <button
                        onClick={() => deleteSavedSearch(saved.id)}
                        className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      {results.length > 0 && (
        <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
          <p className="text-sm text-green-800 dark:text-green-100">
            Found <strong>{results.length}</strong> result{results.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
