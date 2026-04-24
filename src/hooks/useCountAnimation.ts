"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, useTransform, animate } from "framer-motion";

/**
 * A hook that animates a numeric value from 0 to a target value.
 * @param value The target numeric value
 * @param duration Duration of the animation in milliseconds
 * @returns The animated value as a motion value that can be rendered
 */
export function useCountAnimation(value: number, duration = 1000) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: duration / 1000,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [motionValue, value, duration]);

  return springValue;
}
