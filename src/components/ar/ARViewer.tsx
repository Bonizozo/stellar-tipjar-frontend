"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { X, Crosshair, Loader2, AlertTriangle } from "lucide-react";
import { useWebXR } from "@/hooks/useWebXR";

interface HitTestResult {
  x: number;
  y: number;
  z: number;
}

interface ARViewerProps {
  /** Content to render as DOM overlay inside the AR session */
  children: ReactNode;
  onClose?: () => void;
}

/**
 * ARViewer wraps a WebXR AR session with:
 * - Session lifecycle management
 * - Hit-test marker tracking (reticle)
 * - DOM overlay for React children
 * - Controls (close button)
 */
export function ARViewer({ children, onClose }: ARViewerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const hitTestSourceRef = useRef<XRHitTestSource | null>(null);

  const { sessionState, isSupported, session, referenceSpace, startAR, endAR, error } = useWebXR();
  const [hitResult, setHitResult] = useState<HitTestResult | null>(null);

  // Start AR when component mounts (if supported)
  useEffect(() => {
    if (isSupported && sessionState === "idle") {
      startAR();
    }
  }, [isSupported, sessionState, startAR]);

  // Set up hit-test source and render loop
  useEffect(() => {
    if (!session || !referenceSpace || sessionState !== "active") return;

    let cancelled = false;

    async function setupHitTest() {
      try {
        const viewerSpace = await session!.requestReferenceSpace("viewer");
        const hitTestSource = await session!.requestHitTestSource!({ space: viewerSpace });
        hitTestSourceRef.current = hitTestSource ?? null;
      } catch {
        // hit-test not available — continue without reticle
      }
    }

    setupHitTest();

    function onXRFrame(_time: number, frame: XRFrame) {
      if (cancelled) return;

      // Hit-test marker tracking
      if (hitTestSourceRef.current) {
        const results = frame.getHitTestResults(hitTestSourceRef.current);
        if (results.length > 0) {
          const pose = results[0].getPose(referenceSpace!);
          if (pose) {
            const { x, y, z } = pose.transform.position;
            setHitResult({ x, y, z });
          }
        } else {
          setHitResult(null);
        }
      }

      rafRef.current = session!.requestAnimationFrame(onXRFrame);
    }

    rafRef.current = session!.requestAnimationFrame(onXRFrame);

    return () => {
      cancelled = true;
      session.cancelAnimationFrame(rafRef.current);
      hitTestSourceRef.current?.cancel();
      hitTestSourceRef.current = null;
    };
  }, [session, referenceSpace, sessionState]);

  const handleClose = async () => {
    await endAR();
    onClose?.();
  };

  if (!isSupported || sessionState === "unsupported") {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-800 dark:bg-amber-950">
        <AlertTriangle className="h-10 w-10 text-amber-500" />
        <div>
          <p className="font-semibold text-amber-800 dark:text-amber-200">AR Not Supported</p>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
            Your device or browser does not support WebXR immersive-AR. Try Chrome on an
            ARCore-compatible Android device.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
          >
            Go Back
          </button>
        )}
      </div>
    );
  }

  if (sessionState === "requesting") {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-800 dark:bg-indigo-950">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Starting AR session…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-950">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <div>
          <p className="font-semibold text-red-800 dark:text-red-200">AR Error</p>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Go Back
          </button>
        )}
      </div>
    );
  }

  // Active AR session — render DOM overlay
  return (
    <div
      ref={overlayRef}
      id="ar-overlay"
      className="fixed inset-0 z-50"
      aria-label="Augmented reality view"
    >
      <canvas ref={canvasRef} className="hidden" />

      {/* AR content (children = ARTipGoal or ARCreatorProfile) */}
      {children}

      {/* Hit-test reticle */}
      {hitResult && (
        <div
          ref={reticleRef}
          className="pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <Crosshair className="h-10 w-10 text-white/80 drop-shadow-lg" />
        </div>
      )}

      {/* Close control */}
      <button
        onClick={handleClose}
        className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80"
        aria-label="Exit AR"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Marker tracking hint */}
      <p className="pointer-events-none fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-xs text-white/80 backdrop-blur-sm">
        {hitResult ? "Surface detected — tap to place" : "Move camera to detect surfaces"}
      </p>
    </div>
  );
}
