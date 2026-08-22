"use client";

import { useScreenRecording } from "@/hooks/useScreenRecording";
import { Button } from "@/components/Button";

const MAX_SECONDS = 300; // 5 minutes

function fmt(s: number) {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export function ScreenRecorder() {
  const { state, elapsed, videoUrl, error, start, pause, resume, stop, download, discard, isSupported } =
    useScreenRecording({ maxDurationSeconds: MAX_SECONDS, audio: true });

  if (!isSupported) {
    return (
      <p className="text-sm text-red-500">
        Screen recording is not supported in this browser.
      </p>
    );
  }

  const pct = Math.min(100, (elapsed / MAX_SECONDS) * 100);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Screen Recording
        </h2>
        {state === "recording" && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-red-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" aria-hidden />
            REC
          </span>
        )}
        {state === "paused" && (
          <span className="text-sm font-medium text-yellow-500">Paused</span>
        )}
      </div>

      {/* Timer + progress */}
      {(state === "recording" || state === "paused") && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{fmt(elapsed)}</span>
            <span>{fmt(MAX_SECONDS)}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-purple-600 transition-all"
              style={{ width: `${pct}%` }}
              role="progressbar"
              aria-valuenow={elapsed}
              aria-valuemax={MAX_SECONDS}
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        {state === "idle" && (
          <Button onClick={start} size="sm">
            Start Recording
          </Button>
        )}
        {state === "recording" && (
          <>
            <Button onClick={pause} variant="secondary" size="sm">
              Pause
            </Button>
            <Button onClick={stop} variant="danger" size="sm">
              Stop
            </Button>
          </>
        )}
        {state === "paused" && (
          <>
            <Button onClick={resume} size="sm">
              Resume
            </Button>
            <Button onClick={stop} variant="danger" size="sm">
              Stop
            </Button>
          </>
        )}
        {state === "stopped" && videoUrl && (
          <>
            <Button onClick={() => download()} size="sm">
              Download
            </Button>
            <Button onClick={discard} variant="secondary" size="sm">
              Discard
            </Button>
          </>
        )}
      </div>

      {/* Preview */}
      {state === "stopped" && videoUrl && (
        <video
          src={videoUrl}
          controls
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700"
          aria-label="Recording preview"
        />
      )}

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
