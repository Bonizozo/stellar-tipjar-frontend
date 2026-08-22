"use client";

import { useLiveStream } from "@/hooks/useLiveStream";
import { StreamControls } from "@/components/StreamControls";
import { LiveChat } from "@/components/LiveChat";
import { LiveTipFeed } from "@/components/LiveTipFeed";
import { useVideoStream } from "@/hooks/useVideoStream";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ViewerCountBadge } from "@/components/ViewerCountBadge";

export default function LiveStreamPage() {
  const stream = useLiveStream();
  const { source } = useVideoStream("https://www.twitch.tv/stellartipjar");

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">Live Stream</h1>
          <p className="mt-1 text-sm text-ink/60">Stream to your audience and receive real-time tips.</p>
          <div className="mt-2">
            <ViewerCountBadge count={stream.viewerCount} isLive={stream.isLive} />
          </div>
        </div>
        <StreamControls
          isLive={stream.isLive}
          isRecording={stream.isRecording}
          viewerCount={stream.viewerCount}
          onStart={stream.startStream}
          onStop={stream.stopStream}
          onToggleRecording={stream.toggleRecording}
          onSimulateTip={stream.simulateTip}
        />
      </div>

      {/* Main layout: video + chat */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left: video + tip feed */}
        <div className="space-y-4">
          {/* Video player */}
          <div className="relative">
            {source ? (
              <VideoPlayer source={source} title="Live stream" />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-2xl border border-ink/10 bg-ink/5">
                {stream.isLive ? (
                  <div className="text-center space-y-2">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-wave/20 border-t-wave mx-auto" />
                    <p className="text-sm text-ink/50">Stream starting…</p>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <svg className="h-16 w-16 text-ink/20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-ink/40">Press <strong>Go Live</strong> to start streaming</p>
                  </div>
                )}
              </div>
            )}

            {/* Live overlay badge */}
            {stream.isLive && (
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
                LIVE
              </div>
            )}
          </div>

          {/* Live tip feed */}
          {stream.liveTips.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-semibold text-ink/60 uppercase tracking-wide">Recent Tips</h2>
              <LiveTipFeed tips={stream.liveTips} />
            </div>
          )}

          {/* Stream stats */}
          {stream.isLive && (
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Viewers", value: stream.viewerCount.toLocaleString() },
                { label: "Tips Received", value: stream.liveTips.length },
                { label: "Recording", value: stream.isRecording ? "On 🔴" : "Off" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 text-center">
                  <p className="text-xs text-ink/50">{label}</p>
                  <p className="mt-1 text-lg font-bold text-ink">{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: chat */}
        <div className="h-[520px] lg:h-auto lg:min-h-[520px]">
          <LiveChat
            messages={stream.chatMessages}
            onSend={stream.sendChat}
            disabled={!stream.isLive}
          />
        </div>
      </div>
    </section>
  );
}
