"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type ConfettiPattern = "burst" | "rain" | "sides";

export interface MilestoneConfettiProps {
  /** Set to true to trigger the confetti */
  active: boolean;
  pattern?: ConfettiPattern;
  /** Number of particles */
  count?: number;
  /** Duration in ms before particles fade */
  duration?: number;
  colors?: string[];
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  opacity: number;
  shape: "rect" | "circle";
}

const DEFAULT_COLORS = [
  "#7c3aed", // primary-600
  "#06b6d4", // accent-cyan
  "#ec4899", // accent-pink
  "#10b981", // semantic-success
  "#f59e0b", // semantic-warning
  "#a855f7", // accent-purple
];

function createParticles(
  count: number,
  pattern: ConfettiPattern,
  colors: string[],
  canvasWidth: number,
  canvasHeight: number,
): Particle[] {
  return Array.from({ length: count }, () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape: Particle["shape"] = Math.random() > 0.5 ? "rect" : "circle";

    let x: number;
    let vx: number;
    let vy: number;

    if (pattern === "rain") {
      x = Math.random() * canvasWidth;
      vx = (Math.random() - 0.5) * 2;
      vy = Math.random() * 3 + 1;
    } else if (pattern === "sides") {
      const fromLeft = Math.random() > 0.5;
      x = fromLeft ? 0 : canvasWidth;
      vx = fromLeft ? Math.random() * 6 + 2 : -(Math.random() * 6 + 2);
      vy = -(Math.random() * 8 + 4);
    } else {
      // burst — from center
      x = canvasWidth / 2;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      vx = Math.cos(angle) * speed;
      vy = Math.sin(angle) * speed - 4;
    }

    return {
      x,
      y: pattern === "rain" ? -10 : canvasHeight * 0.6,
      vx,
      vy,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      color,
      size: Math.random() * 8 + 4,
      opacity: 1,
      shape,
    };
  });
}

export function MilestoneConfetti({
  active,
  pattern = "burst",
  count = 120,
  duration = 3000,
  colors = DEFAULT_COLORS,
  className = "",
}: MilestoneConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();

  const stopAnimation = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    particlesRef.current = [];
    startTimeRef.current = null;
  }, []);

  useEffect(() => {
    if (!active || prefersReduced) {
      stopAnimation();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    particlesRef.current = createParticles(count, pattern, colors, canvas.width, canvas.height);
    startTimeRef.current = performance.now();

    function draw(now: number) {
      if (!canvas || !ctx || !startTimeRef.current) return;

      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18; // gravity
        p.vx *= 0.99; // air resistance
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - progress * 1.2);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }

        ctx.restore();
      });

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        stopAnimation();
      }
    }

    rafRef.current = requestAnimationFrame(draw);

    return stopAnimation;
  }, [active, pattern, count, duration, colors, prefersReduced, stopAnimation]);

  // Resize handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
