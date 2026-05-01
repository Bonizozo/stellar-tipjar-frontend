"use client";

import { useState } from "react";
import { AudioWaveformPlayer } from "@/components/audio/AudioWaveformPlayer";
import type { WaveformRegion } from "@/types/audio";

// Demo tracks — replace with real URLs or dynamic data
const DEMO_TRACKS = [
  {
    id: "1",
    title: "Demo Track — Ambient Loop",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:42",
  },
  {
    id: "2",
    title: "Demo Track — Electronic Beat",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "4:15",
  },
];

export default function AudioPage() {
  const [activeTrack, setActiveTrack] = useState(DEMO_TRACKS[0]);
  const [regions, setRegions] = useState<WaveformRegion[]>([]);

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Audio Waveform</h1>
        <p className="mt-1 text-ink/60">
          Interactive waveform visualisation with zoom, region selection, and playback controls.
        </p>
      </div>

      {/* Track selector */}
      <div className="flex gap-2 flex-wrap">
        {DEMO_TRACKS.map((track) => (
          <button
            key={track.id}
            type="button"
            onClick={() => setActiveTrack(track)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
              activeTrack.id === track.id
                ? "border-wave/50 bg-wave/10 text-wave"
                : "border-ink/10 text-ink/60 hover:border-ink/20 hover:text-ink"
            }`}
          >
            {track.title}
          </button>
        ))}
      </div>

      {/* Player */}
      <AudioWaveformPlayer
        key={activeTrack.id}
        url={activeTrack.url}
        title={activeTrack.title}
        peaks={250}
        showRegions
        showStylePicker
        onRegionCreate={(r: WaveformRegion) => setRegions((prev: WaveformRegion[]) => [...prev, r])}
      />

      {/* Feature callouts */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: "🎵", title: "Waveform Generation", desc: "Decoded via Web Audio API with synthetic fallback" },
          { icon: "🔍", title: "Zoom Controls", desc: "Up to 10× zoom with horizontal scroll" },
          { icon: "✂️", title: "Region Selection", desc: "Drag on the waveform to mark regions" },
          { icon: "🎨", title: "Waveform Styling", desc: "4 colour presets, customisable per instance" },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4">
            <span className="text-2xl" aria-hidden="true">{icon}</span>
            <p className="mt-2 font-semibold text-ink text-sm">{title}</p>
            <p className="mt-0.5 text-xs text-ink/50">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
