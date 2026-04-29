import type { Meta, StoryObj } from '@storybook/react';
import { CustomVideoPlayer } from '@/components/video';
import type { Chapter, VideoQuality, TimestampTip } from '@/types/video';
import { useState } from 'react';

const meta: Meta<typeof CustomVideoPlayer> = {
  title: 'Components/Video/CustomVideoPlayer',
  component: CustomVideoPlayer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomVideoPlayer>;

const demoChapters: Chapter[] = [
  { id: '1', title: 'Introduction', startTime: 0, endTime: 30 },
  { id: '2', title: 'Getting Started', startTime: 30, endTime: 90 },
  { id: '3', title: 'Advanced Features', startTime: 90, endTime: 150 },
  { id: '4', title: 'Conclusion', startTime: 150, endTime: 180 },
];

const demoQualities: VideoQuality[] = [
  { label: '1080p', height: 1080, bitrate: 5000000 },
  { label: '720p', height: 720, bitrate: 2500000 },
  { label: '480p', height: 480, bitrate: 1000000 },
  { label: '360p', height: 360, bitrate: 500000 },
];

const demoTips: TimestampTip[] = [
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
    message: 'This helped me so much!',
    username: 'bob',
    createdAt: new Date().toISOString(),
  },
];

export const Basic: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    creatorUsername: 'demo_creator',
  },
};

export const WithChapters: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    chapters: demoChapters,
    creatorUsername: 'demo_creator',
  },
};

export const WithQualitySelection: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    qualities: demoQualities,
    creatorUsername: 'demo_creator',
  },
};

export const WithTips: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    timestampTips: demoTips,
    creatorUsername: 'demo_creator',
    onTipSubmit: async (amount, message, timestamp) => {
      console.log('Tip submitted:', { amount, message, timestamp });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const FullFeatured: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    chapters: demoChapters,
    qualities: demoQualities,
    timestampTips: demoTips,
    creatorUsername: 'demo_creator',
    onTipSubmit: async (amount, message, timestamp) => {
      console.log('Tip submitted:', { amount, message, timestamp });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const AutoPlay: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    creatorUsername: 'demo_creator',
    autoPlay: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [tips, setTips] = useState<TimestampTip[]>(demoTips);

    const handleTipSubmit = async (
      amount: string,
      message: string,
      timestamp: number
    ) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newTip: TimestampTip = {
        id: Date.now().toString(),
        timestamp,
        amount,
        message,
        username: 'you',
        createdAt: new Date().toISOString(),
      };

      setTips([...tips, newTip]);
    };

    return (
      <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <CustomVideoPlayer
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          chapters={demoChapters}
          qualities={demoQualities}
          timestampTips={tips}
          creatorUsername="demo_creator"
          onTipSubmit={handleTipSubmit}
        />
      </div>
    );
  },
};
