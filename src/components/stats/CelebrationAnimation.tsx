"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface CelebrationAnimationProps {
  isActive: boolean;
  onAnimationEnd?: () => void;
}

const CONFETTI_EMOJIS = ["🎉", "✨", "🎊", "⭐", "🌟", "💫"];

function ConfettiParticle({ delay, x, rotation }: { delay: number; x: number; rotation: number }) {
  const emoji = CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)];
  return (
    <div
      className="absolute text-lg pointer-events-none"
      style={{
        left: `${x}%`,
        top: "100%",
        animationName: "confetti-fall",
        animationDuration: "3s",
        animationTimingFunction: "ease-out",
        animationFillMode: "forwards",
        animationDelay: `${delay}ms`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {emoji}
    </div>
  );
}

export function CelebrationAnimation({ isActive, onAnimationEnd }: CelebrationAnimationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      onAnimationEnd?.();
    }, 4000);
    return () => clearTimeout(timer);
  }, [isActive, onAnimationEnd]);

  if (!show) return null;

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(0) rotate(0deg);      opacity: 1; }
          100% { transform: translateY(-120vh) rotate(1080deg); opacity: 0; }
        }
        @keyframes cel-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-20px) rotate(180deg); }
        }
        .cel-star { animation: cel-float 2s ease-in-out infinite; }
        .cel-star:nth-child(even) { animation-direction: reverse; }
      `}</style>

      <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm">
        {/* Central icon */}
        <div className="relative">
          <CheckCircle className="h-20 w-20 text-emerald-400 drop-shadow-2xl animate-bounce [animation-duration:1.5s]" />
          <div className="absolute -inset-2 rounded-full bg-emerald-400/30 blur-xl animate-ping [animation-delay:0.5s]" />
        </div>

        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <ConfettiParticle
              key={i}
              delay={i * 50}
              x={Math.random() * 100}
              rotation={Math.random() * 360}
            />
          ))}
        </div>

        {/* Floating stars */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="cel-star absolute text-yellow-300 text-xl opacity-75"
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 200}ms`,
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      </div>
    </>
  );
}