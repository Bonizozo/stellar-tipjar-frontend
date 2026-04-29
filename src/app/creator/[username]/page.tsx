import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/Button";
import { ShareButton } from "@/components/ShareButton";
import { ReportButton } from "@/components/ReportButton";
import { TipForm } from "@/components/forms/TipForm";
import { CreatorStatsDashboard } from "@/components/stats/CreatorStatsDashboard";
import { TipComments } from "@/components/TipComments";
import { CreatorPageRecommendations } from "@/components/CreatorPageRecommendations";
import { EventCalendar } from "@/components/EventCalendar";
import { TipTiers } from "@/components/TipTiers";
import { creatorUsernameSchema } from "@/schemas/creatorSchema";
import { getCreatorProfile } from "@/services/api";
import { formatUsername } from "@/utils/format";
import { generateAvatarUrl } from "@/utils/imageUtils";
import { buildMetadata, creatorProfileJsonLd } from "@/utils/seo";
import { TagBadge } from "@/components/TagBadge";
import { TagCloud } from "@/components/TagCloud";
import { generateTagCloud } from "@/utils/categories";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { ProfileCard } from "@/components/ProfileCard";
import { CreatorShare } from "@/components/CreatorShare";
import { useTipNotifications } from "@/hooks/useTipNotifications";
import { CampaignList } from "@/components/CampaignList";
import { WalletConnectionStatus, WebSocketConnectionStatus } from "@/components/ConnectionStatus";
import { VirtualTipTable } from "@/components/VirtualList/VirtualTipTable";
import { useTipHistory } from "@/hooks/useTipHistory";


interface CreatorPageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const parsed = creatorUsernameSchema.safeParse(params.username);
  if (!parsed.success) return {};
  try {
    const profile = await getCreatorProfile(parsed.data);
    return buildMetadata({
      title: profile.displayName,
      description: profile.bio || `Support ${profile.displayName} with Stellar tips.`,
      path: `/creator/${parsed.data}`,
    });
  } catch {
    return {};
  }
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const parsedUsername = creatorUsernameSchema.safeParse(params.username);
  if (!parsedUsername.success) {
    notFound();
  }

  const profile = await getCreatorProfile(parsedUsername.data);

  return (
    <CreatorPageClient username={parsedUsername.data} profile={profile} />
  );
}

function CreatorPageClient({ username, profile }: { username: string; profile: any }) {
  useTipNotifications(username);
  const { tips, isLoading: tipsLoading, sortField, sortOrder, handleSort } = useTipHistory();

  return (
    <section className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            creatorProfileJsonLd({
              username: profile.username,
              displayName: profile.displayName,
              bio: profile.bio,
              categories: profile.categories,
              tags: profile.tags,
            })
          ),
        }}
      />
      {/* Connection status indicators (#218 wallet, #219 websocket) */}
      <div className="flex flex-wrap items-center gap-2">
        <WalletConnectionStatus />
        <WebSocketConnectionStatus />
      </div>
      <ProfileCard
        username={profile.username}
        displayName={profile.displayName}
        bio={profile.bio}
        avatarUrl={generateAvatarUrl(profile.username)}
        isVerified={profile.isVerified}
      />

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tips">
            <Button>Tip This Creator</Button>
          </Link>
          <Link href={`/creator/${profile.username}/qr`}>
            <Button variant="outline">QR Code</Button>
          </Link>
          <Link href="/explore">
            <Button variant="ghost">Back to Explore</Button>
          </Link>
          <ReportButton targetUser={profile.username} />
          <Link
            href={`/ar?mode=profile&username=${profile.username}`}
            className="inline-flex items-center gap-2 rounded-lg border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900"
          >
            <Glasses className="h-4 w-4" />
            View in AR
          </Link>
        </div>
      <CreatorShare username={profile.username} displayName={profile.displayName} />

      {(profile.categories?.length || profile.tags?.length) > 0 && (
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-wave">Categories & Tags</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.categories?.map((cat) => (
              <TagBadge key={cat} tag={cat} size="md" className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-400/30 text-indigo-700 dark:text-indigo-300" />
            ))}
            {profile.tags?.slice(0, 6).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
            {profile.tags && profile.tags.length > 6 && (
              <span className="px-3 py-1 text-xs font-medium text-ink/60 bg-ink/10 rounded-full">
                +{profile.tags.length - 6} more
              </span>
            )}
          </div>
          <TagCloud tags={generateTagCloud(profile.tags || [])} className="max-w-lg" />
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href="/tips">
          <Button>Tip This Creator</Button>
        </Link>
        <Link href={`/creator/${profile.username}/qr`}>
          <Button variant="outline">QR Code</Button>
        </Link>
        <Link href="/explore">
          <Button variant="ghost">Back to Explore</Button>
        </Link>
        <ReportButton targetUser={profile.username} />
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-ink">Send a Tip</h2>
        <p className="mt-2 text-sm text-ink/70">
          Amount and asset values are validated on blur and submit before calling the API.
        </p>
        <TipForm username={profile.username} defaultAssetCode={profile.preferredAsset} />
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-ink mb-1">Matching Campaigns</h2>
        <p className="text-sm text-ink/60 mb-4">Active campaigns that match tips for this creator.</p>
        <CampaignList creatorUsername={profile.username} />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-ink">Statistics</h2>
        <CreatorStatsDashboard username={profile.username} />
      </div>

      <PortfolioSection username={profile.username} />

      {/* Tip history with virtual scrolling (#362) */}
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 sm:p-6">
        <h2 className="mb-4 text-xl font-semibold text-ink">Tip History</h2>
        {tipsLoading ? (
          <div className="h-32 animate-pulse rounded-xl bg-ink/5" />
        ) : (
          <VirtualTipTable
            tips={tips}
            sortBy={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            scrollRestorationKey={`creator-tips-${username}`}
          />
        )}
      </div>

      <TipComments creatorUsername={profile.username} />

      <EventCalendar creatorUsername={profile.username} />

      <CreatorPageRecommendations username={profile.username} />
    </section>
  );
}
