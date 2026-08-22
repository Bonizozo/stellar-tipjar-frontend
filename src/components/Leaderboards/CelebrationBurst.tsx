"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

const COLORS = ["#ff785a", "#0f6c7b", "#5f7f41", "#f59e0b", "#8b5cf6", "#ec4899"];

function generatePieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[i % COLORS.length],
    delay: Math.random() * 0.6,
    size: Math.random() * 8 + 6,
  }));
}

interface CelebrationBurstProps {
  active: boolean;
  /** Number of confetti pieces */
  count?: number;
}

export function CelebrationBurst({ active, count = 24 }: CelebrationBurstProps) {
  const pieces = useRef<ConfettiPiece[]>(generatePieces(count));

  // Regenerate pieces each time it activates so positions vary
  useEffect(() => {
    if (active) {
      pieces.current = generatePieces(count);
    }
  }, [active, count]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="burst"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.8 }}
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
          aria-hidden="true"
        >
          {pieces.current.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ y: "110%", x: `${piece.x}vw`, opacity: 1, rotate: 0 }}
              animate={{
                y: "-20%",
                opacity: [1, 1, 0],
                rotate: 720,
              }}
              transition={{
                duration: 1.6,
                delay: piece.delay,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                bottom: 0,
                left: `${piece.x}%`,
                width: piece.size,
                height: piece.size,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                backgroundColor: piece.color,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
