interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

type XRSessionMode = "immersive-ar";
type XRReferenceSpaceType = "local" | "viewer";
type XRReferenceSpace = EventTarget;
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

// Web Speech API Declarations
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResultItem {
  readonly [index: number]: SpeechRecognitionAlternative;
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly [index: number]: SpeechRecognitionResultItem;
  readonly length: number;
  item(index: number): SpeechRecognitionResultItem;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  language?: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

interface Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}
