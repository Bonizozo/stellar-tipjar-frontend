import { useRef, useCallback } from 'react';

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

export interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  /** Minimum px distance to register as a swipe. Default: 50 */
  threshold?: number;
  /** Maximum ms allowed for the gesture. Default: 500 */
  timeout?: number;
}

/**
 * Returns a callback ref to attach to any element.
 * Fires directional callbacks on single-finger swipes.
 * Multi-touch (pinch) is ignored so it doesn't conflict with usePinchZoom.
 *
 * @example
 * const swipeRef = useSwipe({ onSwipeLeft: () => goNext() });
 * return <div ref={swipeRef}>…</div>
 */
export function useSwipe<T extends HTMLElement = HTMLElement>(
  options: UseSwipeOptions = {}
) {
  const { threshold = 50, timeout = 500, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown } = options;

  const startRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const nodeRef = useRef<T | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    startRef.current = { x: touch.clientX, y: touch.clientY, t: Date.now() };
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!startRef.current || e.changedTouches.length !== 1) return;
    const { x, y, t } = startRef.current;
    startRef.current = null;

    if (Date.now() - t > timeout) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - x;
    const dy = touch.clientY - y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) < threshold) return;

    if (absDx >= absDy) {
      dx < 0 ? onSwipeLeft?.() : onSwipeRight?.();
    } else {
      dy < 0 ? onSwipeUp?.() : onSwipeDown?.();
    }
  }, [threshold, timeout, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  const ref = useCallback((node: T | null) => {
    if (nodeRef.current) {
      nodeRef.current.removeEventListener('touchstart', handleTouchStart);
      nodeRef.current.removeEventListener('touchend', handleTouchEnd);
    }
    nodeRef.current = node;
    if (node) {
      node.addEventListener('touchstart', handleTouchStart, { passive: true });
      node.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
  }, [handleTouchStart, handleTouchEnd]);

  return ref;
}
