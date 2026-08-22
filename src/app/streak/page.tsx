"use client";

import { useCurrentUser } from "@/store/userStore";
import { StreakDashboard } from "@/components/streak/StreakDashboard";

export default function StreakPage() {
  const user = useCurrentUser();

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-lg">
        <p className="text-center text-ink/60 dark:text-white/60 py-16">
          Sign in to view your tip streak.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold text-ink dark:text-white mb-6">Tip Streak</h1>
      <StreakDashboard username={user.username} />
    </main>
  );
}
