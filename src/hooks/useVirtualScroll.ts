"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VirtualScrollOptions {
  /** Total number of items in the list */
  count: number;
  /**
   * Fixed item height in px.
   * When provided, layout is O(1) — no measurement needed.
   * Omit to enable dynamic/measured heights.
   */
  estimatedItemHeight?: number;
  /** Number of extra items rendered above and below the visible window */
  overscan?: number;
  /** Scroll container ref — defaults to the window when not provided */
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  /** Restore scroll position to this item index on mount */
  initialScrollIndex?: number;
  /** Called when the user scrolls near the bottom (within `threshold` items) */
  onEndReached?: () => void;
  /** How many items from the bottom triggers onEndReached (default 3) */
  endReachedThreshold?: number;
  /** Scroll direction — vertical (default) or horizontal */
  direction?: "vertical" | "horizontal";
}

export interface VirtualItem {
  index: number;
  start: number;
  size: number;
  /** Ref callback — attach to the rendered DOM node for dynamic measurement */
  measureRef: (node: HTMLElement | null) => void;
}

export interface VirtualScrollReturn {
  /** Slice of items to render */
  virtualItems: VirtualItem[];
  /** Total scrollable size (height for vertical, width for horizontal) */
  totalSize: number;
  /** Offset of the first rendered item from the list start */
  paddingStart: number;
  /** Offset after the last rendered item to the list end */
  paddingEnd: number;
  /** Scroll to a specific item index */
  scrollToIndex: (index: number, options?: ScrollToIndexOptions) => void;
  /** Scroll to a specific pixel offset */
  scrollToOffset: (offset: number) => void;
  /** Force re-measure a specific item (useful after content changes) */
  measureItem: (index: number) => void;
  /** Whether the list is currently scrolling */
  isScrolling: boolean;
}

export interface ScrollToIndexOptions {
  align?: "start" | "center" | "end" | "auto";
  behavior?: ScrollBehavior;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_ESTIMATED_HEIGHT = 60;
const DEFAULT_OVERSCAN = 3;
const DEFAULT_END_THRESHOLD = 3;

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Binary search: find the first index whose cumulative offset >= scrollOffset */
function findStartIndex(offsets: number[], scrollOffset: number): number {
  let lo = 0;
  let hi = offsets.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (offsets[mid]! < scrollOffset) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useVirtualScroll({
  count,
  estimatedItemHeight = DEFAULT_ESTIMATED_HEIGHT,
  overscan = DEFAULT_OVERSCAN,
  scrollContainerRef,
  initialScrollIndex,
  onEndReached,
  endReachedThreshold = DEFAULT_END_THRESHOLD,
  direction = "vertical",
}: VirtualScrollOptions): VirtualScrollReturn {
  // Measured sizes for each item (undefined = not yet measured, use estimate)
  const measuredSizes = useRef<Map<number, number>>(new Map());
  // ResizeObserver instances per item
  const resizeObservers = useRef<Map<number, ResizeObserver>>(new Map());
  // Trigger re-render when measurements change
  const [measureVersion, setMeasureVersion] = useState(0);

  const [scrollOffset, setScrollOffset] = useState(0);
  const [containerSize, setContainerSize] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endReachedFired = useRef(false);
  const containerResizeObserver = useRef<ResizeObserver | null>(null);

  // ── Compute cumulative offsets ──────────────────────────────────────────────
  const { offsets, totalSize } = useMemo(() => {
    const offs: number[] = new Array(count + 1);
    offs[0] = 0;
    for (let i = 0; i < count; i++) {
      const size = measuredSizes.current.get(i) ?? estimatedItemHeight;
      offs[i + 1] = offs[i]! + size;
    }
    return { offsets: offs, totalSize: offs[count] ?? 0 };
    // measureVersion is intentionally included to recompute after measurements
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, estimatedItemHeight, measureVersion]);

  // ── Visible range ───────────────────────────────────────────────────────────
  const { startIndex, endIndex } = useMemo(() => {
    if (count === 0) return { startIndex: 0, endIndex: -1 };

    const start = Math.max(0, findStartIndex(offsets, scrollOffset) - overscan);

    let end = start;
    while (end < count && offsets[end]! < scrollOffset + containerSize) {
      end++;
    }
    end = Math.min(count - 1, end + overscan);

    return { startIndex: start, endIndex: end };
  }, [offsets, scrollOffset, containerSize, count, overscan]);

  // ── Virtual items ───────────────────────────────────────────────────────────
  const virtualItems = useMemo<VirtualItem[]>(() => {
    const items: VirtualItem[] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const index = i;
      items.push({
        index,
        start: offsets[index]!,
        size: measuredSizes.current.get(index) ?? estimatedItemHeight,
        measureRef: (node: HTMLElement | null) => {
          // Clean up previous observer for this index
          resizeObservers.current.get(index)?.disconnect();
          resizeObservers.current.delete(index);

          if (!node) return;

          const measure = () => {
            const size =
              direction === "vertical"
                ? node.getBoundingClientRect().height
                : node.getBoundingClientRect().width;

            if (size > 0 && measuredSizes.current.get(index) !== size) {
              measuredSizes.current.set(index, size);
              setMeasureVersion((v) => v + 1);
            }
          };

          measure();

          const ro = new ResizeObserver(measure);
          ro.observe(node);
          resizeObservers.current.set(index, ro);
        },
      });
    }
    return items;
  }, [startIndex, endIndex, offsets, estimatedItemHeight, direction]);

  // ── Padding ─────────────────────────────────────────────────────────────────
  const paddingStart = offsets[startIndex] ?? 0;
  const paddingEnd = Math.max(
    0,
    totalSize - (offsets[endIndex + 1] ?? totalSize),
  );

  // ── Scroll handler ──────────────────────────────────────────────────────────
  const getScrollEl = useCallback((): HTMLElement | Window => {
    return scrollContainerRef?.current ?? window;
  }, [scrollContainerRef]);

  const getScrollOffset = useCallback((): number => {
    const el = getScrollEl();
    if (el instanceof Window) {
      return direction === "vertical" ? window.scrollY : window.scrollX;
    }
    return direction === "vertical" ? el.scrollTop : el.scrollLeft;
  }, [getScrollEl, direction]);

  const getContainerSize = useCallback((): number => {
    const el = getScrollEl();
    if (el instanceof Window) {
      return direction === "vertical" ? window.innerHeight : window.innerWidth;
    }
    return direction === "vertical" ? el.clientHeight : el.clientWidth;
  }, [getScrollEl, direction]);

  useEffect(() => {
    const el = getScrollEl();

    const onScroll = () => {
      setScrollOffset(getScrollOffset());
      setIsScrolling(true);
      if (scrollingTimer.current) clearTimeout(scrollingTimer.current);
      scrollingTimer.current = setTimeout(() => setIsScrolling(false), 150);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    setScrollOffset(getScrollOffset());
    setContainerSize(getContainerSize());

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (scrollingTimer.current) clearTimeout(scrollingTimer.current);
    };
  }, [getScrollEl, getScrollOffset, getContainerSize]);

  // ── Container resize observer ───────────────────────────────────────────────
  useEffect(() => {
    const el = getScrollEl();
    if (el instanceof Window) {
      const onResize = () => setContainerSize(getContainerSize());
      window.addEventListener("resize", onResize, { passive: true });
      return () => window.removeEventListener("resize", onResize);
    }

    containerResizeObserver.current?.disconnect();
    const ro = new ResizeObserver(() => setContainerSize(getContainerSize()));
    ro.observe(el as HTMLElement);
    containerResizeObserver.current = ro;
    return () => ro.disconnect();
  }, [getScrollEl, getContainerSize]);

  // ── End-reached callback ────────────────────────────────────────────────────
  useEffect(() => {
    if (!onEndReached || count === 0) return;
    const nearEnd = endIndex >= count - 1 - endReachedThreshold;
    if (nearEnd && !endReachedFired.current) {
      endReachedFired.current = true;
      onEndReached();
    } else if (!nearEnd) {
      endReachedFired.current = false;
    }
  }, [endIndex, count, onEndReached, endReachedThreshold]);

  // ── Cleanup ResizeObservers on unmount ──────────────────────────────────────
  useEffect(() => {
    return () => {
      resizeObservers.current.forEach((ro) => ro.disconnect());
      resizeObservers.current.clear();
      containerResizeObserver.current?.disconnect();
    };
  }, []);

  // ── scrollToIndex ───────────────────────────────────────────────────────────
  const scrollToIndex = useCallback(
    (index: number, options: ScrollToIndexOptions = {}) => {
      const { align = "start", behavior = "smooth" } = options;
      const clampedIndex = Math.max(0, Math.min(count - 1, index));
      const itemStart = offsets[clampedIndex] ?? 0;
      const itemSize =
        measuredSizes.current.get(clampedIndex) ?? estimatedItemHeight;

      let offset: number;
      switch (align) {
        case "center":
          offset = itemStart - containerSize / 2 + itemSize / 2;
          break;
        case "end":
          offset = itemStart - containerSize + itemSize;
          break;
        case "auto": {
          const visibleEnd = scrollOffset + containerSize;
          if (itemStart < scrollOffset) {
            offset = itemStart;
          } else if (itemStart + itemSize > visibleEnd) {
            offset = itemStart + itemSize - containerSize;
          } else {
            return; // already visible
          }
          break;
        }
        default:
          offset = itemStart;
      }

      const el = getScrollEl();
      const scrollOptions: ScrollToOptions = {
        behavior,
        [direction === "vertical" ? "top" : "left"]: Math.max(0, offset),
      };
      el.scrollTo(scrollOptions);
    },
    [
      offsets,
      count,
      containerSize,
      scrollOffset,
      estimatedItemHeight,
      getScrollEl,
      direction,
    ],
  );

  // ── scrollToOffset ──────────────────────────────────────────────────────────
  const scrollToOffset = useCallback(
    (offset: number) => {
      const el = getScrollEl();
      el.scrollTo({
        [direction === "vertical" ? "top" : "left"]: Math.max(0, offset),
        behavior: "smooth",
      });
    },
    [getScrollEl, direction],
  );

  // ── measureItem ─────────────────────────────────────────────────────────────
  const measureItem = useCallback((index: number) => {
    measuredSizes.current.delete(index);
    setMeasureVersion((v) => v + 1);
  }, []);

  // ── Initial scroll restoration ──────────────────────────────────────────────
  const didInitialScroll = useRef(false);
  useLayoutEffect(() => {
    if (
      initialScrollIndex !== undefined &&
      !didInitialScroll.current &&
      count > 0 &&
      offsets.length > 1
    ) {
      didInitialScroll.current = true;
      scrollToIndex(initialScrollIndex, {
        behavior: "instant" as ScrollBehavior,
      });
    }
  }, [initialScrollIndex, count, offsets, scrollToIndex]);

  return {
    virtualItems,
    totalSize,
    paddingStart,
    paddingEnd,
    scrollToIndex,
    scrollToOffset,
    measureItem,
    isScrolling,
  };
}
