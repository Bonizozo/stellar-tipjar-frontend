import { useRef, useCallback } from 'react';

export interface UsePinchZoomOptions {
  onPinchStart?: (scale: number) => void;
  onPinchChange?: (scale: number, delta: number) => void;
  onPinchEnd?: (scale: number) => void;
  /** Minimum scale clamp. Default: 0.5 */
  minScale?: number;
  /** Maximum scale clamp. Default: 4 */
  maxScale?: number;
}

function getTouchDistance(a: Touch, b: Touch): number {
  const dx = a.clientX - b.clientX;
  const dy = a.clientY - b.clientY;
  return Math.hypot(dx, dy);
}

/**
 * Returns a callback ref that tracks two-finger pinch gestures.
 * Reports a normalised scale value (1 = original size).
 *
 * @example
 * const [scale, setScale] = useState(1);
 * const pinchRef = usePinchZoom({ onPinchChange: (s) => setScale(s) });
 * return <div ref={pinchRef} style={{ transform: `scale(${scale})` }}>…</div>
 */
export function usePinchZoom<T extends HTMLElement = HTMLElement>(
  options: UsePinchZoomOptions = {}
) {
  const { onPinchStart, onPinchChange, onPinchEnd, minScale = 0.5, maxScale = 4 } = options;

  const initialDistRef = useRef<number | null>(null);
  const currentScaleRef = useRef(1);
  const nodeRef = useRef<T | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 2) return;
    initialDistRef.current = getTouchDistance(e.touches[0], e.touches[1]);
    onPinchStart?.(currentScaleRef.current);
  }, [onPinchStart]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 2 || initialDistRef.current === null) return;
    e.preventDefault(); // prevent browser zoom

    const dist = getTouchDistance(e.touches[0], e.touches[1]);
    const rawScale = currentScaleRef.current * (dist / initialDistRef.current);
    const scale = Math.min(maxScale, Math.max(minScale, rawScale));
    const delta = scale - currentScaleRef.current;

    onPinchChange?.(scale, delta);
  }, [onPinchChange, minScale, maxScale]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (e.touches.length >= 2 || initialDistRef.current === null) return;
    onPinchEnd?.(currentScaleRef.current);
    initialDistRef.current = null;
  }, [onPinchEnd]);

  const ref = useCallback((node: T | null) => {
    if (nodeRef.current) {
      nodeRef.current.removeEventListener('touchstart', handleTouchStart);
      nodeRef.current.removeEventListener('touchmove', handleTouchMove);
      nodeRef.current.removeEventListener('touchend', handleTouchEnd);
    }
    nodeRef.current = node;
    if (node) {
      node.addEventListener('touchstart', handleTouchStart, { passive: true });
      // touchmove must be non-passive to call preventDefault
      node.addEventListener('touchmove', handleTouchMove, { passive: false });
      node.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  /** Call this to commit the current scale (e.g. on pinch end) */
  const commitScale = useCallback((scale: number) => {
    currentScaleRef.current = scale;
  }, []);

  return { ref, commitScale };
}
