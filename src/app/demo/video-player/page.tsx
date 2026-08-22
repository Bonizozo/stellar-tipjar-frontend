"use client";

import { useState } from 'react';
import { CustomVideoPlayer } from '@/components/video';
import type { Chapter, VideoQuality, TimestampTip } from '@/types/video';
import toast from 'react-hot-toast';

// Demo data
const DEMO_CHAPTERS: Chapter[] = [
  {
    id: '1',
    title: 'Introduction',
    startTime: 0,
    endTime: 30,
  },
  {
    id: '2',
    title: 'Getting Started',
    startTime: 30,
    endTime: 90,
  },
  {
    id: '3',
    title: 'Advanced Features',
    startTime: 90,
    endTime: 150,
  },
  {
    id: '4',
    title: 'Conclusion',
    startTime: 150,
    endTime: 180,
  },
];

const DEMO_QUALITIES: VideoQuality[] = [
  { label: '1080p', height: 1080, bitrate: 5000000 },
  { label: '720p', height: 720, bitrate: 2500000 },
  { label: '480p', height: 480, bitrate: 1000000 },
  { label: '360p', height: 360, bitrate: 500000 },
];

export default function VideoPlayerDemoPage() {
  const [timestampTips, setTimestampTips] = useState<TimestampTip[]>([
    {
      id: '1',
      timestamp: 45,
      amount: '10',
      message: 'Great explanation!',
      username: 'alice',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      timestamp: 120,
      amount: '25',
      message: 'This helped me so much, thank you!',
      username: 'bob',
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleTipSubmit = async (amount: string, message: string, timestamp: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newTip: TimestampTip = {
      id: Date.now().toString(),
      timestamp,
      amount,
      message,
      username: 'demo_user',
      createdAt: new Date().toISOString(),
    };

    setTimestampTips((prev) => [...prev, newTip]);
    toast.success('Tip sent successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Custom Video Player Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Full-featured video player with chapters, quality selection, and tip integration
          </p>
        </div>

        <CustomVideoPlayer
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          chapters={DEMO_CHAPTERS}
          qualities={DEMO_QUALITIES}
          creatorUsername="demo_creator"
          timestampTips={timestampTips}
          onTipSubmit={handleTipSubmit}
          className="mb-8"
        />

        {/* Feature List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Custom playback controls
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Chapter navigation with markers
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Quality selection (1080p, 720p, 480p, 360p)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Playback speed control (0.25x - 2x)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Volume control with mute
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Fullscreen support
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Skip forward/backward (10s)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Tip at specific timestamps
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Timeline tips visualization
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Auto-hide controls
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Keyboard shortcuts
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span>
              Responsive design
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
