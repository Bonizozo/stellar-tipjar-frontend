"use client";

import { useState, useRef, useCallback } from "react";

export interface UseScreenRecordingOptions {
  /** Max recording duration in seconds. Default: 300 (5 min) */
  maxDurationSeconds?: number;
  /** Include system/tab audio. Default: true */
  audio?: boolean;
}

export type RecordingState = "idle" | "recording" | "paused" | "stopped";

export interface UseScreenRecordingReturn {
  state: RecordingState;
  elapsed: number; // seconds
  videoUrl: string | null;
  error: string | null;
  start: () => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  download: (filename?: string) => void;
  discard: () => void;
  isSupported: boolean;
}

export function useScreenRecording({
  maxDurationSeconds = 300,
  audio = true,
}: UseScreenRecordingOptions = {}): UseScreenRecordingReturn {
  const isSupported =
    typeof window !== "undefined" &&
    !!navigator.mediaDevices?.getDisplayMedia &&
    typeof MediaRecorder !== "undefined";

  const [state, setState] = useState<RecordingState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const start = useCallback(async () => {
    if (!isSupported) {
      setError("Screen recording is not supported in this browser.");
      return;
    }
    setError(null);
    chunksRef.current = [];
    elapsedRef.current = 0;
    setElapsed(0);

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Permission denied.");
      return;
    }

    streamRef.current = stream;

    // Pick a supported MIME type
    const mimeType = ["video/webm;codecs=vp9", "video/webm", "video/mp4"].find(
      (m) => MediaRecorder.isTypeSupported(m)
    );

    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      clearTimer();
      stopStream();
      const blob = new Blob(chunksRef.current, {
        type: recorder.mimeType || "video/webm",
      });
      setVideoUrl(URL.createObjectURL(blob));
      setState("stopped");
    };

    recorder.start(1000); // collect chunks every second
    setState("recording");

    timerRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsed(elapsedRef.current);
      if (elapsedRef.current >= maxDurationSeconds) {
        recorder.stop();
      }
    }, 1000);

    // Stop if user ends share via browser UI
    stream.getVideoTracks()[0].onended = () => {
      if (recorder.state !== "inactive") recorder.stop();
    };
  }, [isSupported, audio, maxDurationSeconds]);

  const pause = useCallback(() => {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.pause();
      clearTimer();
      setState("paused");
    }
  }, []);

  const resume = useCallback(() => {
    if (recorderRef.current?.state === "paused") {
      recorderRef.current.resume();
      setState("recording");
      timerRef.current = setInterval(() => {
        elapsedRef.current += 1;
        setElapsed(elapsedRef.current);
        if (elapsedRef.current >= maxDurationSeconds) {
          recorderRef.current?.stop();
        }
      }, 1000);
    }
  }, [maxDurationSeconds]);

  const stop = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
  }, []);

  const download = useCallback(
    (filename = "recording.webm") => {
      if (!videoUrl) return;
      const a = document.createElement("a");
      a.href = videoUrl;
      a.download = filename;
      a.click();
    },
    [videoUrl]
  );

  const discard = useCallback(() => {
    stop();
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
    setElapsed(0);
    elapsedRef.current = 0;
    setState("idle");
    setError(null);
  }, [stop, videoUrl]);

  return {
    state,
    elapsed,
    videoUrl,
    error,
    start,
    pause,
    resume,
    stop,
    download,
    discard,
    isSupported,
  };
}
