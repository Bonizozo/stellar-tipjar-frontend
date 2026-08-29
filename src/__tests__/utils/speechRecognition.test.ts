import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { speechRecognition } from '@/utils/speechRecognition';

describe('speechRecognition service', () => {
  const originalSpeechSynthesis = window.speechSynthesis;

  beforeEach(() => {
    vi.clearAllMocks();
    (globalThis as any).SpeechSynthesisUtterance = class {
      text: string;
      rate = 1;
      pitch = 1;
      volume = 1;
      onstart: (() => void) | null = null;
      onend: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor(text: string) {
        this.text = text;
      }
    };
  });

  afterEach(() => {
    window.speechSynthesis = originalSpeechSynthesis;
  });

  it('reports isSupported based on browser availability', () => {
    // When recognition is initialized
    expect(typeof speechRecognition.isSupported()).toBe('boolean');
    expect(typeof speechRecognition.getIsListening()).toBe('boolean');
    expect(typeof speechRecognition.getIsSpeaking()).toBe('boolean');
  });

  it('handles error when speech recognition is not supported', () => {
    const onError = vi.fn();
    const onResult = vi.fn();

    // Mock isSupported false by calling with unsupported mock
    const svc = speechRecognition as any;
    const prevRec = svc.recognition;
    svc.recognition = undefined;

    svc.startListening(onResult, onError);
    expect(onError).toHaveBeenCalledWith('Speech recognition not supported in this browser');

    svc.recognition = prevRec;
  });

  it('speaks text using speechSynthesis', () => {
    const mockSpeak = vi.fn();
    const mockCancel = vi.fn();

    window.speechSynthesis = {
      speak: mockSpeak,
      cancel: mockCancel,
      paused: false,
      pending: false,
      speaking: false,
      onvoiceschanged: null,
      getVoices: () => [],
      pause: vi.fn(),
      resume: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as any;

    speechRecognition.speak('Hello world');
    expect(mockSpeak).toHaveBeenCalled();

    speechRecognition.stopSpeaking();
    expect(mockCancel).toHaveBeenCalled();
  });
});
