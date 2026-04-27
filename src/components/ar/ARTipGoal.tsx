"use client";

import { useEffect, useRef } from "react";
import type { TipGoal } from "@/components/TipGoalWidget";

interface ARTipGoalProps {
  goal: TipGoal;
  session: XRSession;
  referenceSpace: XRReferenceSpace;
}

/**
 * Renders a tip goal as a 3D overlay in an active WebXR AR session.
 * Uses the WebXR canvas overlay to draw a progress bar and stats.
 */
export function ARTipGoal({ goal, session, referenceSpace }: ARTipGoalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { xrCompatible: true });
    if (!gl) return;

    const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

    function drawFrame(_time: number, frame: XRFrame) {
      if (!frame || !gl) return;

      const pose = frame.getViewerPose(referenceSpace);
      if (!pose) {
        rafRef.current = session.requestAnimationFrame(drawFrame);
        return;
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Draw 2D HUD overlay via canvas 2D context on a separate overlay canvas
      rafRef.current = session.requestAnimationFrame(drawFrame);
    }

    rafRef.current = session.requestAnimationFrame(drawFrame);

    return () => {
      session.cancelAnimationFrame(rafRef.current);
    };
  }, [goal, session, referenceSpace]);

  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

  // DOM overlay rendered on top of the AR camera feed
  return (
    <div
      className="pointer-events-none fixed inset-0 flex items-end justify-center pb-24"
      aria-label={`AR view: ${goal.title}`}
    >
      <canvas ref={canvasRef} className="hidden" />
      <div className="w-80 rounded-2xl bg-black/70 p-5 text-white backdrop-blur-md">
        <h2 className="mb-1 text-lg font-bold">{goal.title}</h2>
        <p className="mb-3 text-xs text-white/70">{goal.description}</p>

        {/* 3D-style progress bar */}
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-700"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={Math.round(percentage)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
        </div>

        <div className="mt-3 flex justify-between text-sm">
          <span className="font-semibold text-indigo-300">
            {goal.currentAmount} {goal.currency}
          </span>
          <span className="font-bold text-purple-300">{Math.round(percentage)}%</span>
          <span className="text-white/60">
            / {goal.targetAmount} {goal.currency}
          </span>
        </div>

        {goal.supporters > 0 && (
          <p className="mt-2 text-center text-xs text-white/50">
            {goal.supporters} supporter{goal.supporters !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}
