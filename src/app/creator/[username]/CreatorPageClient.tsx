"use client";

import Link from "next/link";
import { Glasses, CheckCircle2, Share2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/Button";
import { ReportButton } from "@/components/ReportButton";
import { TipForm } from "@/components/forms/TipForm";
import { CreatorStatsDashboard } from "@/components/stats/CreatorStatsDashboard";
import TipComments from "@/components/TipComments";
import { CreatorPageRecommendations } from "@/components/CreatorPageRecommendations";
import { EventCalendar } from "@/components/EventCalendar";
import { generateAvatarUrl } from "@/utils/imageUtils";
import { TagBadge } from "@/components/TagBadge";
import { TagCloud } from "@/components/TagCloud";
import { generateTagCloud } from "@/utils/categories";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { CreatorShare } from "@/components/CreatorShare";
import { useTipNotifications } from "@/hooks/useTipNotifications";
import { CampaignList } from "@/components/CampaignList";
import { WalletConnectionStatus, WebSocketConnectionStatus } from "@/components/ConnectionStatus";
import { VirtualTipTable } from "@/components/VirtualList/VirtualTipTable";
import { useTipHistory } from "@/hooks/useTipHistory";
import { MilestoneProgressSection } from "@/components/MilestoneProgressSection";

// Import required providers for standalone route context
import { ToastProvider } from "@/contexts/ToastContext";
import { ToastContainer } from "@/components/Toast";
import { WalletProvider } from "@/contexts/WalletContext";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

interface CreatorPageClientProps {
  username: string;
  profile: any;
}

function CreatorPageContent({ username, profile }: CreatorPageClientProps) {
  useTipNotifications(username);
  const { tips, isLoading: tipsLoading, sortField, sortOrder, handleSort } = useTipHistory();

  return (
    <section className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Connection status indicators */}
      <div className="flex flex-wrap items-center gap-2">
        <WalletConnectionStatus />
        <WebSocketConnectionStatus />
      </div>

      {/* Redesigned Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl">
        {/* Banner with a rich gradient and background element */}
        <div className="h-44 sm:h-56 w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 relative">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
          <div className="absolute top-4 left-4 z-20">
            <Link href="/explore">
              <button className="flex items-center gap-2 rounded-full bg-black/20 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-black/40 cursor-pointer">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Explore
              </button>
            </Link>
          </div>
        </div>

        {/* Profile Info Area */}
        <div className="px-6 pb-6 pt-0 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full border-4 border-white dark:border-slate-900 shadow-2xl overflow-hidden bg-slate-100 z-10">
                <img
                  src={generateAvatarUrl(profile.username)}
                  alt={`${profile.displayName}'s avatar`}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Name and Username */}
              <div className="pt-2 sm:pb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {profile.displayName}
                  </h1>
                  {profile.isVerified && (
                    <CheckCircle2 className="h-6 w-6 text-indigo-500 fill-indigo-500/10" />
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  @{profile.username}
                </p>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center gap-2.5 mt-4 sm:mt-0">
              <Link href={`/creator/${profile.username}/qr`}>
                <Button variant="outline" className="text-xs sm:text-sm font-semibold shadow-sm">
                  QR Code
                </Button>
              </Link>
              <Link
                href={`/ar?mode=profile&username=${profile.username}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200/80 bg-indigo-50/50 hover:bg-indigo-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-indigo-700 transition-all shadow-sm dark:border-indigo-800/80 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/80"
              >
                <Glasses className="h-4 w-4" />
                View in AR
              </Link>
              <ReportButton targetUser={profile.username} />
            </div>
          </div>

          {/* Bio & Details */}
          <div className="border-t border-slate-100 dark:border-slate-800/60 pt-6">
            <p className="text-base text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
              {profile.bio || "No bio description provided."}
            </p>

            {/* Categories & Tags block inside Hero for nice layout */}
            {(profile.categories?.length || profile.tags?.length) > 0 && (
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                  Categories & Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.categories?.map((cat: string) => (
                    <div key={cat} data-testid="tag-badge">
                      <TagBadge
                        tag={cat}
                        size="sm"
                        className="bg-indigo-50/60 border-indigo-200/60 text-indigo-700 dark:bg-indigo-950/30 dark:border-indigo-800/50 dark:text-indigo-300 font-semibold"
                      />
                    </div>
                  ))}
                  {profile.tags?.slice(0, 10).map((tag: string) => (
                    <div key={tag} data-testid="tag-badge">
                      <TagBadge
                        tag={tag}
                        size="sm"
                        className="bg-slate-50 border-slate-200/60 text-slate-600 dark:bg-slate-800/40 dark:border-slate-700/50 dark:text-slate-300"
                      />
                    </div>
                  ))}
                  {profile.tags && profile.tags.length > 10 && (
                    <span className="px-2.5 py-1 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800/60 dark:text-slate-400 rounded-full">
                      +{profile.tags.length - 10} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid Layout: Main Content + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Area (Spans 2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Matching Campaigns (Above the fold for awareness) */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-md">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-1">
              Matching Campaigns
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Active matching campaigns that boost tips for this creator.
            </p>
            <CampaignList creatorUsername={profile.username} />
          </div>

          {/* Statistics Section (Below the fold) */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-slate-950 dark:text-white">
              Creator Statistics
            </h2>
            <CreatorStatsDashboard username={profile.username} />
          </div>

          {/* Portfolio Section */}
          <PortfolioSection username={profile.username} />

          {/* Milestones Progress */}
          <MilestoneProgressSection totalTips={profile.totalTips ?? 0} />

          {/* Tip History with Virtual Scrolling */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-slate-950 dark:text-white">
              Tip History
            </h2>
            {tipsLoading ? (
              <div className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800/50" />
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

          {/* Comments and Feedback */}
          <TipComments tipId={profile.username} />

          {/* Events Calendar */}
          <EventCalendar creatorUsername={profile.username} />

          {/* Recommendations */}
          <CreatorPageRecommendations username={profile.username} />
        </div>

        {/* Sticky Sidebar Area (Spans 1/3) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
          {/* Send a Tip Form Container */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-lg relative overflow-hidden">
            {/* Preferred Asset Badge */}
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                Preferred asset: {profile.preferredAsset}
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
              Send a Tip
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 mb-5">
              Support this creator directly using Stellar assets.
            </p>
            <TipForm username={profile.username} defaultAssetCode={profile.preferredAsset} />
          </div>

          {/* Sharing Container */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-md">
            <h3 className="text-md font-bold text-slate-950 dark:text-white mb-3 flex items-center gap-2">
              <Share2 className="h-4 w-4 text-indigo-500" />
              Share Creator
            </h3>
            <CreatorShare username={profile.username} displayName={profile.displayName} />
          </div>

          {/* Tag Cloud helper panel if there are tags */}
          {profile.tags && profile.tags.length > 0 && (
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/30 p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                Creator Tag Cloud
              </h3>
              <TagCloud tags={generateTagCloud(profile.tags || [])} className="w-full" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function CreatorPageClient({ username, profile }: CreatorPageClientProps) {
  return (
    <CurrencyProvider>
      <WalletProvider>
        <ReactQueryProvider>
          <ToastProvider>
            <WebSocketProvider>
              <CreatorPageContent username={username} profile={profile} />
              <ToastContainer />
            </WebSocketProvider>
          </ToastProvider>
        </ReactQueryProvider>
      </WalletProvider>
    </CurrencyProvider>
  );
}
