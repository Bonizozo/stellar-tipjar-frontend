export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  milestone: number;
  rewardPoints: number;
  unlocked?: boolean;
  progress?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'social' | 'trading' | 'contribution' | 'loyalty';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface UserStats {
  level: number;
  experience: number;
  totalTips: number;
  tipsReceived: number;
  daysActive: number;
  unlockedAchievements: string[];
  badges: string[];
}

export const XP_PER_LEVEL = 1000;

export const calculateLevel = (experience: number): number => {
  return Math.floor(experience / XP_PER_LEVEL) + 1;
};

export const calculateProgressToNextLevel = (experience: number): number => {
  return (experience % XP_PER_LEVEL) / XP_PER_LEVEL * 100;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_tip',
    title: 'First Tip',
    description: 'Send your first tip to a creator',
    icon: '💝',
    milestone: 1,
    rewardPoints: 100,
  },
  {
    id: 'generous_supporter',
    title: 'Generous Supporter',
    description: 'Send a total of 10 tips',
    icon: '🌟',
    milestone: 10,
    rewardPoints: 500,
  },
  {
    id: 'loyal_fan',
    title: 'Loyal Fan',
    description: 'Active for 7 consecutive days',
    icon: '🔥',
    milestone: 7,
    rewardPoints: 300,
  },
  {
    id: 'rising_star',
    title: 'Rising Star',
    description: 'Receive your first tip',
    icon: '🚀',
    milestone: 1,
    rewardPoints: 200,
  },
];

export const BADGES: Badge[] = [
  {
    id: 'early_adopter',
    name: 'Early Adopter',
    description: 'Joined during the beta phase',
    image: '/badges/early_adopter.png',
    category: 'loyalty',
    tier: 'gold',
  },
  {
    id: 'top_tipper_monthly',
    name: 'Top Tipper',
    description: 'Ranked in the top 10 tippers this month',
    image: '/badges/top_tipper.png',
    category: 'social',
    tier: 'platinum',
  },
  {
    id: 'certified_creator',
    name: 'Certified Creator',
    description: 'Verified creator status achieved',
    image: '/badges/verified.png',
    category: 'contribution',
    tier: 'gold',
  },
];
