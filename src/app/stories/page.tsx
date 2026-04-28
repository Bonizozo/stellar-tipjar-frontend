"use client";

import { useEffect } from "react";
import { StoriesFeed } from "@/components/stories/StoriesFeed";
import { useStoryGroups } from "@/hooks/useStories";
import { useCurrentUser } from "@/store/userStore";

export default function StoriesPage() {
  const { groups, loading, fetchGroups } = useStoryGroups();
  const user = useCurrentUser();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-ink dark:text-white mb-6">Stories</h1>
      {loading ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0 animate-pulse">
              <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="w-10 h-2 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          ))}
        </div>
      ) : (
        <StoriesFeed
          groups={groups}
          currentUsername={user?.username}
          onRefresh={fetchGroups}
        />
      )}
    </main>
  );
}
