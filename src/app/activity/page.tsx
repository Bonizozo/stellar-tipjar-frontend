"use client";

import { useActivityFeed } from "@/hooks/useActivityFeed";
import { VirtualActivityFeed } from "@/components/VirtualList/VirtualActivityFeed";

export default function ActivityPage() {
  const { items, filter, setFilter, loading, connectionStatus, refresh } =
    useActivityFeed();

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Activity Feed
        </h1>
        <button
          onClick={refresh}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          aria-label="Refresh activity feed"
        >
          Refresh
        </button>
      </div>
      <VirtualActivityFeed
        items={items}
        filter={filter}
        onFilterChange={setFilter}
        loading={loading}
        connectionStatus={connectionStatus}
        scrollRestorationKey="activity-feed"
      />
    </main>
  );
}
