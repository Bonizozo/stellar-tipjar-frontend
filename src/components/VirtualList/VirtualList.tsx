"use client";

import {
  CSSProperties,
  ReactNode,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  useVirtualScroll,
  ScrollToIndexOptions,
} from "@/hooks/useVirtualScroll";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

// ─── Public API ───────────────────────────────────────────────────────────────

export interface VirtualListHandle {
  scrollToIndex: (index: number, options?: ScrollToIndexOptions) => void;
  scrollToOffset: (offset: number) => void;
  measureItem: (index: number) => void;
}

export interface VirtualListProps<T> {
  /** All items in the list */
  items: T[];
  /** Render a single item. Receives the item, its index, and a measureRef */
  renderItem: (
    item: T,
    index: number,
    measureRef: (node: HTMLElement | null) => void,
  ) => ReactNode;
  /** Fixed item height — enables O(1) layout. Omit for dynamic heights. */
  itemHeight?: number;
  /** Estimated height used before measurement (dynamic mode) */
  estimatedItemHeight?: number;
  /** Extra items rendered outside the visible window */
  overscan?: number;
  /** Fixed height of the scroll container in px. Omit to use window scroll. */
  height?: number;
  /** Called when the user scrolls near the bottom */
  onEndReached?: () => void;
  /** Items from the bottom that trigger onEndReached */
  endReachedThreshold?: number;
  /** Restore scroll to this index on mount */
  initialScrollIndex?: number;
  /** Key used for scroll restoration (defaults to a stable internal key) */
  scrollRestorationKey?: string;
  /** Scroll direction */
  direction?: "vertical" | "horizontal";
  /** Extra class on the outer container */
  className?: string;
  /** Rendered when items is empty */
  emptyState?: ReactNode;
  /** Rendered at the bottom (e.g. loading spinner, end-of-list message) */
  footer?: ReactNode;
  /** aria-label for the scroll container */
  ariaLabel?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

function VirtualListInner<T>(
  {
    items,
    renderItem,
    itemHeight,
    estimatedItemHeight = 60,
    overscan = 3,
    height,
    onEndReached,
    endReachedThreshold = 3,
    initialScrollIndex,
    scrollRestorationKey,
    direction = "vertical",
    className = "",
    emptyState,
    footer,
    ariaLabel,
  }: VirtualListProps<T>,
  ref: React.Ref<VirtualListHandle>,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isWindowed = height === undefined;

  const {
    virtualItems,
    totalSize,
    paddingStart,
    paddingEnd,
    scrollToIndex,
    scrollToOffset,
    measureItem,
    isScrolling,
  } = useVirtualScroll({
    count: items.length,
    estimatedItemHeight: itemHeight ?? estimatedItemHeight,
    overscan,
    scrollContainerRef: isWindowed ? undefined : containerRef,
    initialScrollIndex,
    onEndReached,
    endReachedThreshold,
    direction,
  });

  useScrollRestoration(
    scrollRestorationKey,
    isWindowed ? undefined : containerRef,
    true,
  );

  useImperativeHandle(ref, () => ({
    scrollToIndex,
    scrollToOffset,
    measureItem,
  }));

  if (items.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  const isVertical = direction === "vertical";

  // Outer container style
  const containerStyle: CSSProperties = isWindowed
    ? {}
    : {
        height,
        overflowY: isVertical ? "auto" : "hidden",
        overflowX: isVertical ? "hidden" : "auto",
        position: "relative",
      };

  // Inner spacer style — creates the full scrollable area
  const innerStyle: CSSProperties = isVertical
    ? { height: totalSize, position: "relative" }
    : { width: totalSize, position: "relative", display: "flex" };

  // Offset wrapper — positions rendered items correctly
  const offsetStyle: CSSProperties = isVertical
    ? { transform: `translateY(${paddingStart}px)` }
    : { transform: `translateX(${paddingStart}px)`, display: "flex" };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      className={className}
      role="list"
      aria-label={ariaLabel}
      data-scrolling={isScrolling ? "true" : undefined}
    >
      <div style={innerStyle} aria-hidden="true">
        <div style={offsetStyle}>
          {virtualItems.map((virtualItem) => {
            const item = items[virtualItem.index];
            if (item === undefined) return null;

            return (
              <div
                key={virtualItem.index}
                role="listitem"
                style={
                  itemHeight
                    ? isVertical
                      ? { height: itemHeight }
                      : { width: itemHeight, flexShrink: 0 }
                    : undefined
                }
              >
                {renderItem(item, virtualItem.index, virtualItem.measureRef)}
              </div>
            );
          })}
        </div>
      </div>

      {footer && <div style={{ position: "relative" }}>{footer}</div>}
    </div>
  );
}

export const VirtualList = forwardRef(VirtualListInner) as <T>(
  props: VirtualListProps<T> & { ref?: React.Ref<VirtualListHandle> },
) => JSX.Element;
