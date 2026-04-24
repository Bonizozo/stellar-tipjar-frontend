"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from \"lucide-react\";  // Note: if not available, replace with SVG

interface CelebrationAnimationProps {
  isActive: boolean;
  onAnimationEnd?: () => void;
}

export function CelebrationAnimation({ isActive, onAnimationEnd }: CelebrationAnimationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShow(true);
      const timeout1 = setTimeout(() => {
        // Burst confetti
      }, 500);
      const timeout2 = setTimeout(() => {
        setShow(false);
        onAnimationEnd?.();
      }, 4000);
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [isActive, onAnimationEnd]);

  if (!show) return null;

  return (
    <div className=\"absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm\">
      {/* Central Icon */}
      <div className=\"relative\">
        <CheckCircle className=\"h-20 w-20 text-emerald-400 drop-shadow-2xl animate-bounce [animation-duration:1.5s]\" />
        <div className=\"absolute -inset-2 rounded-full bg-emerald-400/30 blur-xl animate-ping [animation-delay:0.5s]\" />
      </div>

      {/* CSS Confetti Particles */}
      <div className=\"confetti-container absolute inset-0 pointer-events-none\">
        {Array.from({ length: 20 }).map((_, i) => (
          <ConfettiParticle
            key={i}
            delay={i * 50}
            x={Math.random() * 100}
            rotation={Math.random() * 360}
          />
        ))}
      </div>

      {/* Floating Stars */}
      <div className=\"stars absolute inset-0\">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className=\"star absolute text-yellow-300 text-xl animate-float [animation-delay:var(--delay)] opacity-75\"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              '--delay': `${i * 200}ms`
            } as React.CSSProperties
          }
          >
            ⭐
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfettiParticle({ delay, x, rotation }: { delay: number; x: number; rotation: number }) {
  return (
    <div
      className=\"absolute text-lg [animation:confetti-fall 3s ease-out forwards] [animation-delay:var(--delay)ms]\"
      style={{
        left: `${x}%`,
        '--delay': `${delay}ms` as any,
        transform: `rotate(${rotation}deg)`
      }}
    >
      <span>🎉</span><span>✨</span><span>🎊</span>[Math.random() > 0.5 ? '🎉' : '⭐']
    </div>
  );
}

const styles = `
@keyframes confetti-fall {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-20vh) rotate(1080deg);
    opacity: 0;
  }
}
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}
.stars .star:nth-child(even) { animation-direction: reverse; }
`;

// Inline styles for simplicity
<style jsx global>{styles}</style>

