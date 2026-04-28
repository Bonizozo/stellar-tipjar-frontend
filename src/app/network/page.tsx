import type { Metadata } from "next";
import CreatorNetworkGraph from "@/components/CreatorNetworkGraph";

export const metadata: Metadata = {
  title: "Creator Network | Stellar Tip Jar",
  description:
    "Visualize creator relationships and collaboration networks with an interactive graph.",
};

export default function NetworkPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-ink dark:text-white">
          Creator Network
        </h1>
        <p className="mt-1 text-ink/60 dark:text-white/60">
          Explore collaboration and supporter relationships between creators.
        </p>
      </div>
      <CreatorNetworkGraph />
    </main>
  );
}
