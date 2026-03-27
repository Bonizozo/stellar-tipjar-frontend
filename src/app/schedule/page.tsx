import type { Metadata } from "next";
import { ScheduledTipForm } from "@/components/forms/ScheduledTipForm";
import { ScheduledTipList } from "@/components/ScheduledTipList";

export const metadata: Metadata = {
  title: "Schedule a Tip | Stellar Tip Jar",
  description: "Schedule one-time or recurring tips for birthdays, anniversaries, and more.",
};

interface Props {
  searchParams: Promise<{ username?: string }>;
}

export default async function SchedulePage({ searchParams }: Props) {
  const { username } = await searchParams;

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold text-ink">Schedule a Tip</h1>
      <p className="mt-1 text-sm text-ink/60">
        Send a tip on a future date — perfect for birthdays, anniversaries, or recurring support.
      </p>

      <ScheduledTipForm username={username ?? ""} />

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold text-ink">Your Scheduled Tips</h2>
        <ScheduledTipList username={username} />
      </section>
    </main>
  );
}
