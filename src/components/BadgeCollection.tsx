'use client';

import React from 'react';
import { BADGES } from '@/utils/gamification';

const BadgeCollection: React.FC = () => {
    return (
      <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl space-y-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tight">
            Viper Badges
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Collect exclusive badges by participating in the TipJar community.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BADGES.map((badge) => (
            <div key={badge.id} className="relative group perspective-1000">
              <div className="relative p-6 bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-gray-800 flex flex-col items-center justify-center space-y-4 transform-gpu transition-all duration-500 hover:rotate-y-12 hover:scale-110 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <img src={badge.image} alt={badge.name} className="w-12 h-12 object-contain filter drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {badge.name}
                  </h3>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    badge.tier === 'platinum' ? 'bg-gradient-to-r from-slate-300 to-slate-500 text-black' :
                    badge.tier === 'gold' ? 'bg-gradient-to-r from-yellow-300 to-yellow-600 text-black' :
                    badge.tier === 'silver' ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-black' :
                    'bg-gradient-to-r from-amber-700 to-amber-900 text-white'
                  }`}>
                    {badge.tier}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default BadgeCollection;
