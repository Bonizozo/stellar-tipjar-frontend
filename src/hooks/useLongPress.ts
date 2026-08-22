import { useRef, useCallback, type MouseEvent as ReactMouseEvent, type TouchEvent as ReactTouchEvent } from 'react';

export interface UseLongPressOptions {
  onLongPress: (e: ReactTouchEvent | ReactMouseEvent) => void;
  onPress?: (e: ReactTouchEvent | ReactMouseEvent) => void;
  /** Duration in ms before long-press fires. Default: 500 */
  duration?: number;
  /** Movement tolerance in px before cancelling. Default: 10 */
  moveThreshold?: number;
}

/**
 * Returns event handler props to spread onto any element.
 * Works with both touch and mouse events.
 *
 * @example
 * const handlers = useLongPress({ onLongPress: () => openContextMenu() });
 * return <div {...handlers}>…</div>
 */
export function useLongPress(options: UseLongPressOptions) {
  const { onLongPress, onPress, duration = 500, moveThreshold = 10 } = options;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const firedRef = useRef(false);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    startPosRef.current = null;
  }, []);

  const start = useCallback((e: ReactTouchEvent | ReactMouseEvent) => {
    firedRef.current = false;
    const point = 'touches' in e ? e.touches[0] : e;
    if (!point) return;
    const { clientX, clientY } = point;
    startPosRef.current = { x: clientX, y: clientY };

    timerRef.current = setTimeout(() => {
      firedRef.current = true;
      onLongPress(e);
      clear();
    }, duration);
  }, [onLongPress, duration, clear]);

  const move = useCallback((e: ReactTouchEvent | ReactMouseEvent) => {
    if (!startPosRef.current) return;
    const point = 'touches' in e ? e.touches[0] : e;
    if (!point) return;
    const { clientX, clientY } = point;
    const dx = Math.abs(clientX - startPosRef.current.x);
    const dy = Math.abs(clientY - startPosRef.current.y);
    if (dx > moveThreshold || dy > moveThreshold) clear();
  }, [moveThreshold, clear]);

  const end = useCallback((e: ReactTouchEvent | ReactMouseEvent) => {
    if (!firedRef.current) onPress?.(e);
    clear();
  }, [onPress, clear]);

  return {
    onTouchStart: start,
    onTouchMove: move,
    onTouchEnd: end,
    onMouseDown: start,
    onMouseMove: move,
    onMouseUp: end,
    onMouseLeave: clear,
  };
}
