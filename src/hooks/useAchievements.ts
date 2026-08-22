import { useState, useEffect } from 'react';
import { Achievement, ACHIEVEMENTS, UserStats, XP_PER_LEVEL, calculateLevel, calculateProgressToNextLevel } from '@/utils/gamification';

// Mock user store or analytics integration
const mockUserStats: UserStats = {
  level: 1,
  experience: 0,
  totalTips: 0,
  tipsReceived: 0,
  daysActive: 1,
  unlockedAchievements: [],
  badges: [],
};

const useAchievements = () => {
  const [stats, setStats] = useState<UserStats>(mockUserStats);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [level, setLevel] = useState(1);
  const [progressToNextLevel, setProgressToNextLevel] = useState(0);

  useEffect(() => {
    // Sync with backend/localStorage in real-world scenario
    const syncStats = async () => {
      // simulate fetch
      const currentLevel = calculateLevel(stats.experience);
      const progress = calculateProgressToNextLevel(stats.experience);
      setLevel(currentLevel);
      setProgressToNextLevel(progress);
      
      const updatedAchievements = achievements.map(ach => {
        let currentProgress = 0;
        switch (ach.id) {
          case 'first_tip':
            currentProgress = stats.totalTips;
            break;
          case 'generous_supporter':
            currentProgress = stats.totalTips;
            break;
          case 'loyal_fan':
            currentProgress = stats.daysActive;
            break;
          case 'rising_star':
            currentProgress = stats.tipsReceived;
            break;
        }
        return {
          ...ach,
          unlocked: currentProgress >= ach.milestone,
          progress: currentProgress,
        };
      });
      setAchievements(updatedAchievements);
    };

    syncStats();
  }, [stats]);

  const addExperience = (amount: number) => {
    setStats(prev => ({
      ...prev,
      experience: prev.experience + amount,
    }));
  };

  const trackActivity = (activityType: 'tip_sent' | 'tip_received' | 'login') => {
    setStats(prev => {
      const nextStats = { ...prev };
      switch (activityType) {
        case 'tip_sent':
          nextStats.totalTips += 1;
          nextStats.experience += 50;
          break;
        case 'tip_received':
          nextStats.tipsReceived += 1;
          nextStats.experience += 100;
          break;
        case 'login':
          nextStats.daysActive += 1; // Simplistic tracking for demo
          nextStats.experience += 20;
          break;
      }
      return nextStats;
    });
  };

  return {
    stats,
    achievements,
    level,
    progressToNextLevel,
    addExperience,
    trackActivity,
  };
};

export default useAchievements;
