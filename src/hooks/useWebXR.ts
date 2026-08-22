"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export type XRSessionState = "idle" | "requesting" | "active" | "ended" | "unsupported";

export interface UseWebXRReturn {
  sessionState: XRSessionState;
  isSupported: boolean;
  session: XRSession | null;
  referenceSpace: XRReferenceSpace | null;
  startAR: () => Promise<void>;
  endAR: () => Promise<void>;
  error: string | null;
}

export function useWebXR(): UseWebXRReturn {
  const [sessionState, setSessionState] = useState<XRSessionState>("idle");
  const [isSupported, setIsSupported] = useState(false);
  const [session, setSession] = useState<XRSession | null>(null);
  const [referenceSpace, setReferenceSpace] = useState<XRReferenceSpace | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sessionRef = useRef<XRSession | null>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined" && "xr" in navigator) {
      navigator.xr!.isSessionSupported("immersive-ar").then((supported) => {
        setIsSupported(supported);
        if (!supported) setSessionState("unsupported");
      }).catch(() => {
        setIsSupported(false);
        setSessionState("unsupported");
      });
    } else {
      setIsSupported(false);
      setSessionState("unsupported");
    }
  }, []);

  const startAR = useCallback(async () => {
    if (!isSupported || sessionRef.current) return;
    setError(null);
    setSessionState("requesting");
    try {
      const xrSession = await navigator.xr!.requestSession("immersive-ar", {
        requiredFeatures: ["hit-test"],
        optionalFeatures: ["dom-overlay", "light-estimation"],
      });
      sessionRef.current = xrSession;
      setSession(xrSession);

      const refSpace = await xrSession.requestReferenceSpace("local");
      setReferenceSpace(refSpace);
      setSessionState("active");

      xrSession.addEventListener("end", () => {
        sessionRef.current = null;
        setSession(null);
        setReferenceSpace(null);
        setSessionState("ended");
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start AR session");
      setSessionState("idle");
    }
  }, [isSupported]);

  const endAR = useCallback(async () => {
    if (sessionRef.current) {
      await sessionRef.current.end();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      sessionRef.current?.end().catch(() => {});
    };
  }, []);

  return { sessionState, isSupported, session, referenceSpace, startAR, endAR, error };
}
