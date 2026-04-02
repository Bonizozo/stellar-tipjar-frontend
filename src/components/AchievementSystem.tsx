'use client';

import React from 'react';
import useAchievements from '@/hooks/useAchievements';
import { Achievement } from '@/utils/gamification';

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  const isUnlocked = achievement.unlocked;
  const progressPercent = achievement.progress !== undefined ? (achievement.progress / achievement.milestone) * 100 : 0;

  return (
    <div className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 shadow-sm ${isUnlocked ? 'bg-white border-yellow-400' : 'bg-gray-100 border-gray-200 grayscale opacity-60'}`}>
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{achievement.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
          <div className="mt-2 w-full bg-gray-300 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${isUnlocked ? 'bg-yellow-500' : 'bg-gray-500'}`} 
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            ></div>
          </div>
          <p className="text-xs text-right mt-1 font-semibold text-gray-500">
            {isUnlocked ? '🏆 Unlocked' : `${Math.min(achievement.milestone, achievement.progress)} / ${achievement.milestone}`}
          </p>
        </div>
      </div>
      {isUnlocked && (
        <div className="mt-2 text-xs font-bold text-yellow-600 uppercase tracking-widest text-center">
          Bonus: +{achievement.rewardPoints} XP
        </div>
      )}
    </div>
  );
};

const AchievementSystem: React.FC = () => {
    const { achievements } = useAchievements();
  
    return (
      <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl space-y-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Milestone Achievements
          </h2>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-bold rounded-full text-sm">
            {achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <AchievementCard key={ach.id} achievement={ach} />
          ))}
        </div>
      </div>
    );
  };
  
  export default AchievementSystem;
