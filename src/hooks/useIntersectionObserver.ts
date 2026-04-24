"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  onIntersect?: () => void;
  enabled?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = "0px",
  onIntersect,
  enabled = true,
}: UseIntersectionObserverProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && onIntersect) {
          onIntersect();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [enabled, onIntersect, root, rootMargin, threshold]);

  return { targetRef, isIntersecting };
}
