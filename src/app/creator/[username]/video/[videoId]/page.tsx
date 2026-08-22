"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CustomVideoPlayer } from '@/components/video';
import type { Chapter, VideoQuality, TimestampTip } from '@/types/video';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface VideoData {
  id: string;
  title: string;
  description: string;
  src: string;
  poster?: string;
  chapters: Chapter[];
  qualities: VideoQuality[];
  creatorUsername: string;
}

export default function VideoPage() {
  const params = useParams();
  const username = params.username as string;
  const videoId = params.videoId as string;

  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [timestampTips, setTimestampTips] = useState<TimestampTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        
        // Fetch video metadata
        const videoResponse = await fetch(`/api/videos/${videoId}`);
        if (!videoResponse.ok) throw new Error('Failed to fetch video');
        const video = await videoResponse.json();

        // Fetch chapters
        const chaptersResponse = await fetch(`/api/videos/${videoId}/chapters`);
        const chapters = chaptersResponse.ok ? await chaptersResponse.json() : [];

        // Fetch quality options
        const qualitiesResponse = await fetch(`/api/videos/${videoId}/qualities`);
        const qualities = qualitiesResponse.ok ? await qualitiesResponse.json() : [];

        // Fetch timestamp tips
        const tipsResponse = await fetch(`/api/videos/${videoId}/tips`);
        const tips = tipsResponse.ok ? await tipsResponse.json() : [];

        setVideoData({
          ...video,
          chapters,
          qualities,
          creatorUsername: username,
        });
        setTimestampTips(tips);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId, username]);

  const handleTipSubmit = async (
    amount: string,
    message: string,
    timestamp: number
  ) => {
    try {
      const response = await fetch('/api/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId,
          creatorUsername: username,
          amount,
          message,
          timestamp,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit tip');

      const newTip = await response.json();
      setTimestampTips((prev) => [...prev, newTip]);
      toast.success('Tip sent successfully!');
    } catch (err) {
      toast.error('Failed to send tip');
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error || !videoData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error || 'Video not found'}
          </p>
          <a
            href={`/creator/${username}`}
            className="text-purple-600 hover:text-purple-700 underline"
          >
            Back to creator page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Video Title and Description */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {videoData.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            by{' '}
            <a
              href={`/creator/${username}`}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              @{username}
            </a>
          </p>
        </div>

        {/* Video Player */}
        <CustomVideoPlayer
          src={videoData.src}
          poster={videoData.poster}
          chapters={videoData.chapters}
          qualities={videoData.qualities}
          creatorUsername={videoData.creatorUsername}
          timestampTips={timestampTips}
          onTipSubmit={handleTipSubmit}
          className="mb-8"
        />

        {/* Video Description */}
        {videoData.description && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              About this video
            </h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {videoData.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
