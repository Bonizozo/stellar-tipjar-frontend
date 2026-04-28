import { useRef, useCallback, type MouseEvent as ReactMouseEvent, type TouchEvent as ReactTouchEvent } from 'react';

export interface UseLongPressOptions {
  onLongPress: (e: TouchEvent | MouseEvent) => void;
  onPress?: (e: TouchEvent | MouseEvent) => void;
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

  const start = useCallback((e: TouchEvent | MouseEvent) => {
    firedRef.current = false;
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    startPosRef.current = { x: clientX, y: clientY };

    timerRef.current = setTimeout(() => {
      firedRef.current = true;
      onLongPress(e);
      clear();
    }, duration);
  }, [onLongPress, duration, clear]);

  const move = useCallback((e: TouchEvent | MouseEvent) => {
    if (!startPosRef.current) return;
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    const dx = Math.abs(clientX - startPosRef.current.x);
    const dy = Math.abs(clientY - startPosRef.current.y);
    if (dx > moveThreshold || dy > moveThreshold) clear();
  }, [moveThreshold, clear]);

  const end = useCallback((e: TouchEvent | MouseEvent) => {
    if (!firedRef.current) onPress?.(e);
    clear();
  }, [onPress, clear]);

  return {
    onTouchStart: start as (e: ReactTouchEvent) => void,
    onTouchMove: move as (e: ReactTouchEvent) => void,
    onTouchEnd: end as (e: ReactTouchEvent) => void,
    onMouseDown: start as (e: ReactMouseEvent) => void,
    onMouseMove: move as (e: ReactMouseEvent) => void,
    onMouseUp: end as (e: ReactMouseEvent) => void,
    onMouseLeave: clear,
  };
}
