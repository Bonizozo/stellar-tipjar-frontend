interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

type XRSessionMode = "immersive-ar";
type XRReferenceSpaceType = "local" | "viewer";
interface XRReferenceSpace {}
interface XRHitTestSource { cancel(): void; }
interface XRFrame { getHitTestResults(source: XRHitTestSource): unknown[]; }
interface XRSession extends EventTarget {
  requestReferenceSpace(type: XRReferenceSpaceType): Promise<XRReferenceSpace>;
  end(): Promise<void>;
  requestHitTestSource(options: { space: XRReferenceSpace }): Promise<XRHitTestSource>;
  requestAnimationFrame(callback: (time: DOMHighResTimeStamp, frame: XRFrame) => void): number;
  cancelAnimationFrame(handle: number): void;
}
interface XRSystem {
  isSessionSupported(mode: XRSessionMode): Promise<boolean>;
  requestSession(mode: XRSessionMode, options?: { requiredFeatures?: string[]; optionalFeatures?: string[] }): Promise<XRSession>;
}
interface Navigator { xr?: XRSystem; }
interface ServiceWorkerRegistration { sync?: { register(tag: string): Promise<void> }; }
