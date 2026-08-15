import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useTooltip } from "@/hooks/useTooltip";

describe("useTooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("opens tooltip after delay and closes immediately on hide", () => {
    const { result } = renderHook(() => useTooltip({ delayDuration: 300 }));
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.show();
    });
    expect(result.current.isOpen).toBe(false);

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.hide();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("cancels pending timer on unmount before firing", () => {
    const { result, unmount } = renderHook(() => useTooltip({ delayDuration: 300 }));

    act(() => {
      result.current.show();
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.isOpen).toBe(false);
  });
});
