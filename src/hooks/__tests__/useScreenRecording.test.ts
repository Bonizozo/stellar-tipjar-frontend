import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useScreenRecording } from "@/hooks/useScreenRecording";

// Minimal MediaRecorder mock
class MockMediaRecorder {
  state: string = "inactive";
  mimeType = "video/webm";
  ondataavailable: ((e: { data: Blob }) => void) | null = null;
  onstop: (() => void) | null = null;

  start() { this.state = "recording"; }
  pause() { this.state = "paused"; }
  resume() { this.state = "recording"; }
  stop() {
    this.state = "inactive";
    this.ondataavailable?.({ data: new Blob(["x"], { type: "video/webm" }) });
    this.onstop?.();
  }
  static isTypeSupported() { return true; }
}

const mockTrack = { stop: vi.fn(), onended: null as unknown };
const mockStream = {
  getTracks: () => [mockTrack],
  getVideoTracks: () => [mockTrack],
};

beforeEach(() => {
  vi.stubGlobal("MediaRecorder", MockMediaRecorder);
  Object.defineProperty(navigator, "mediaDevices", {
    value: { getDisplayMedia: vi.fn().mockResolvedValue(mockStream) },
    configurable: true,
  });
  vi.stubGlobal("URL", { createObjectURL: vi.fn(() => "blob:mock"), revokeObjectURL: vi.fn() });
});

afterEach(() => vi.restoreAllMocks());

describe("useScreenRecording", () => {
  it("starts in idle state", () => {
    const { result } = renderHook(() => useScreenRecording());
    expect(result.current.state).toBe("idle");
    expect(result.current.isSupported).toBe(true);
  });

  it("transitions to recording after start()", async () => {
    const { result } = renderHook(() => useScreenRecording());
    await act(() => result.current.start());
    expect(result.current.state).toBe("recording");
  });

  it("transitions to paused after pause()", async () => {
    const { result } = renderHook(() => useScreenRecording());
    await act(() => result.current.start());
    act(() => result.current.pause());
    expect(result.current.state).toBe("paused");
  });

  it("transitions back to recording after resume()", async () => {
    const { result } = renderHook(() => useScreenRecording());
    await act(() => result.current.start());
    act(() => result.current.pause());
    act(() => result.current.resume());
    expect(result.current.state).toBe("recording");
  });

  it("transitions to stopped and sets videoUrl after stop()", async () => {
    const { result } = renderHook(() => useScreenRecording());
    await act(() => result.current.start());
    act(() => result.current.stop());
    expect(result.current.state).toBe("stopped");
    expect(result.current.videoUrl).toBe("blob:mock");
  });

  it("resets to idle after discard()", async () => {
    const { result } = renderHook(() => useScreenRecording());
    await act(() => result.current.start());
    act(() => result.current.stop());
    act(() => result.current.discard());
    expect(result.current.state).toBe("idle");
    expect(result.current.videoUrl).toBeNull();
  });
});
