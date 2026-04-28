import type { Metadata } from "next";
import { CampaignList } from "@/components/CampaignList";

export const metadata: Metadata = {
  title: "Active Tip Matching Campaigns",
  description: "Browse active tip matching campaigns and get your tips matched by sponsors.",
};

export default function CampaignsPage() {
  return (
    <section className="mx-auto max-w-2xl space-y-8 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Matching Campaigns</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Tip during an active campaign and sponsors will match your contribution.
        </p>
      </div>
      <CampaignList />
    </section>
  );
}
