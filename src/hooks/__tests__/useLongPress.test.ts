import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useLongPress } from "@/hooks/useLongPress";

describe("useLongPress", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("fires onLongPress when held past duration", () => {
    const onLongPress = vi.fn();
    const onPress = vi.fn();

    const { result } = renderHook(() =>
      useLongPress({ onLongPress, onPress, duration: 400 })
    );

    const mockEvent = {
      clientX: 50,
      clientY: 50,
    } as any;

    act(() => {
      result.current.onMouseDown(mockEvent);
    });

    expect(onLongPress).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("cleans up timer on unmount before duration fires", () => {
    const onLongPress = vi.fn();
    const { result, unmount } = renderHook(() =>
      useLongPress({ onLongPress, duration: 400 })
    );

    const mockEvent = {
      clientX: 50,
      clientY: 50,
    } as any;

    act(() => {
      result.current.onMouseDown(mockEvent);
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(onLongPress).not.toHaveBeenCalled();
  });
});
