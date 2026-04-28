import { useCallback, useRef } from 'react';
import { useSwipe, type UseSwipeOptions } from './useSwipe';
import { usePinchZoom, type UsePinchZoomOptions } from './usePinchZoom';
import { useLongPress, type UseLongPressOptions } from './useLongPress';

export interface UseGesturesOptions {
  swipe?: UseSwipeOptions;
  pinch?: UsePinchZoomOptions;
  /** Omit to disable long-press. onLongPress is required when provided. */
  longPress?: UseLongPressOptions;
}

/**
 * Composes useSwipe, usePinchZoom, and useLongPress onto a single element.
 *
 * - `ref`         — callback ref for the target element (swipe + pinch)
 * - `handlers`    — event props to spread onto the element (long-press)
 * - `commitScale` — persist the current scale after a pinch ends
 *
 * @example
 * const { ref, handlers } = useGestures({
 *   swipe: { onSwipeLeft: goNext, onSwipeRight: goPrev },
 *   longPress: { onLongPress: openMenu },
 * });
 * return <div ref={ref} {...handlers}>…</div>
 */
export function useGestures<T extends HTMLElement = HTMLElement>(
  options: UseGesturesOptions = {}
) {
  const swipeRef = useSwipe<T>(options.swipe ?? {});
  const { ref: pinchRef, commitScale } = usePinchZoom<T>(options.pinch ?? {});
  // Always call — pass a no-op when longPress is not needed (rules of hooks)
  const longPressHandlers = useLongPress(
    options.longPress ?? { onLongPress: () => {} }
  );

  const nodeRef = useRef<T | null>(null);

  const ref = useCallback((node: T | null) => {
    nodeRef.current = node;
    swipeRef(node);
    pinchRef(node);
  }, [swipeRef, pinchRef]);

  return {
    ref,
    handlers: options.longPress ? longPressHandlers : {},
    commitScale,
  };
}
