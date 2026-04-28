"use client";

import { useCurrentUser } from "@/store/userStore";
import { CollaborationPanel } from "@/components/collaboration/CollaborationPanel";

export default function CollaborationPage() {
  const user = useCurrentUser();

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <p className="text-center text-ink/60 dark:text-white/60 py-16">
          Sign in to manage collaborations.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <CollaborationPanel username={user.username} />
    </main>
  );
}
