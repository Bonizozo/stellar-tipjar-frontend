'use client';

import React from 'react';
import useAchievements from '@/hooks/useAchievements';

const ProgressTracker: React.FC = () => {
    const { level, progressToNextLevel, stats } = useAchievements();
  
    return (
      <div className="p-8 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl shadow-2xl space-y-8 max-w-2xl mx-auto overflow-hidden relative">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20 -ml-32 -mb-32"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
          <div className="relative w-40 h-40 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 rounded-full animate-spin-slow blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative w-full h-full bg-slate-900 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <span className="text-sm font-black text-blue-400 uppercase tracking-widest">Level</span>
              <span className="text-6xl font-black text-white filter drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                {level}
              </span>
            </div>
          </div>
          
          <div className="w-full space-y-2">
            <div className="flex justify-between items-end mb-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-black rounded uppercase tracking-tighter shadow-lg shadow-blue-500/30">Next Level</span>
                <span className="text-xs font-bold text-slate-400">{(stats.experience % 1000).toLocaleString()} / 1,000 XP</span>
              </div>
              <span className="text-lg font-black text-white italic">
                {Math.floor(progressToNextLevel)}%
              </span>
            </div>
            <div className="h-4 w-full bg-slate-800 rounded-full p-1 shadow-inner overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(34,211,238,0.6)]" 
                style={{ width: `${progressToNextLevel}%` }}
              >
                <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 w-full py-4 border-t border-white/10">
            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Tips Sent</span>
              <span className="text-xl font-black text-white">{stats.totalTips}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Received</span>
              <span className="text-xl font-black text-white">{stats.tipsReceived}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Active Days</span>
              <span className="text-xl font-black text-white">{stats.daysActive}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProgressTracker;
