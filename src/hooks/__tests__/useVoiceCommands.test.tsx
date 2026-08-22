import { renderHook, act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// ── Router mock ──────────────────────────────────────────────────────────────
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// ── Speech Synthesis mock ────────────────────────────────────────────────────
const mockSpeak = vi.fn();
const mockCancel = vi.fn();
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: { speak: mockSpeak, cancel: mockCancel },
});
(global as any).SpeechSynthesisUtterance = function (text: string) {
  (this as any).text = text;
  (this as any).lang = '';
};

// ── Helpers ──────────────────────────────────────────────────────────────────

interface RecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: any) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
  abort: ReturnType<typeof vi.fn>;
}

/** Build a minimal SpeechRecognition mock and install it on window. */
function makeSpeechRecognitionMock(): RecognitionInstance {
  const instance: RecognitionInstance = {
    lang: '',
    continuous: false,
    interimResults: false,
    onresult: null,
    onend: null,
    onerror: null,
    start: vi.fn(),
    stop: vi.fn(),
    abort: vi.fn(),
  };

  // Must be a real constructor function (not an arrow fn) for `new` to work
  function SpeechRecognitionMock(this: any) {
    Object.assign(this, instance);
    // Keep instance in sync so tests can inspect it
    instance.start = this.start;
    instance.stop = this.stop;
    instance.abort = this.abort;
    // Proxy property writes back to instance
    const self = this;
    Object.defineProperties(instance, {
      onresult: {
        get: () => self.onresult,
        set: (v) => { self.onresult = v; },
        configurable: true,
      },
      onend: {
        get: () => self.onend,
        set: (v) => { self.onend = v; },
        configurable: true,
      },
      onerror: {
        get: () => self.onerror,
        set: (v) => { self.onerror = v; },
        configurable: true,
      },
    });
  }

  (window as any).SpeechRecognition = SpeechRecognitionMock;
  delete (window as any).webkitSpeechRecognition;
  return instance;
}

/** Fire a fake speech result on the recognition instance. */
function fireResult(instance: RecognitionInstance, transcript: string) {
  const event = {
    results: [
      Object.assign([{ transcript, confidence: 0.9 }], { isFinal: true }),
    ],
    resultIndex: 0,
  };
  instance.onresult!(event);
}

// ── Import after mocks are set up ────────────────────────────────────────────
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { VoiceCommandButton } from '@/components/VoiceCommandButton';

// ── Tests ────────────────────────────────────────────────────────────────────

describe('useVoiceCommands', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns isSupported: false when SpeechRecognition API is unavailable', () => {
    delete (window as any).SpeechRecognition;
    delete (window as any).webkitSpeechRecognition;

    const { result } = renderHook(() => useVoiceCommands());
    expect(result.current.isSupported).toBe(false);
  });

  it('returns isSupported: true when SpeechRecognition API is available', () => {
    makeSpeechRecognitionMock();
    const { result } = renderHook(() => useVoiceCommands());
    expect(result.current.isSupported).toBe(true);
  });

  it('navigates to / for "go home" command', () => {
    const recognition = makeSpeechRecognitionMock();
    const { result } = renderHook(() => useVoiceCommands());

    act(() => result.current.startListening());
    act(() => fireResult(recognition, 'go home'));

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('navigates to / for "navigate home" command', () => {
    const recognition = makeSpeechRecognitionMock();
    const { result } = renderHook(() => useVoiceCommands());

    act(() => result.current.startListening());
    act(() => fireResult(recognition, 'navigate home'));

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('parses amount correctly from "tip 10" transcript', () => {
    const recognition = makeSpeechRecognitionMock();
    const onTip = vi.fn();
    const { result } = renderHook(() => useVoiceCommands({ onTip }));

    act(() => result.current.startListening());
    act(() => fireResult(recognition, 'tip 10'));

    expect(onTip).toHaveBeenCalledWith(10);
  });

  it('calls onTip without amount for "send tip" transcript', () => {
    const recognition = makeSpeechRecognitionMock();
    const onTip = vi.fn();
    const { result } = renderHook(() => useVoiceCommands({ onTip }));

    act(() => result.current.startListening());
    act(() => fireResult(recognition, 'send tip'));

    expect(onTip).toHaveBeenCalledWith(undefined);
  });

  it('navigates to /tips when no onTip callback provided and "send tip" heard', () => {
    const recognition = makeSpeechRecognitionMock();
    const { result } = renderHook(() => useVoiceCommands());

    act(() => result.current.startListening());
    act(() => fireResult(recognition, 'send tip'));

    expect(mockPush).toHaveBeenCalledWith('/tips');
  });

  it('does not throw or navigate for unrecognized command', () => {
    const recognition = makeSpeechRecognitionMock();
    const { result } = renderHook(() => useVoiceCommands());

    act(() => result.current.startListening());
    expect(() => act(() => fireResult(recognition, 'do something random'))).not.toThrow();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('speaks "Command not recognized" for unrecognized command', () => {
    const recognition = makeSpeechRecognitionMock();
    const { result } = renderHook(() => useVoiceCommands());

    act(() => result.current.startListening());
    act(() => fireResult(recognition, 'do something random'));

    const utteranceArg = (mockSpeak.mock.calls.at(-1)?.[0] as any)?.text;
    expect(utteranceArg).toBe('Command not recognized');
  });

  it('aborts recognition on unmount', () => {
    const recognition = makeSpeechRecognitionMock();
    const { result, unmount } = renderHook(() => useVoiceCommands());

    act(() => result.current.startListening());
    unmount();

    expect(recognition.abort).toHaveBeenCalled();
  });
});

describe('VoiceCommandButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders enabled button when API is supported', () => {
    makeSpeechRecognitionMock();
    render(<VoiceCommandButton />);

    const btn = screen.getByRole('button', { name: 'Start voice commands' });
    expect(btn).not.toBeDisabled();
  });

  it('renders disabled button when API is unsupported', () => {
    delete (window as any).SpeechRecognition;
    delete (window as any).webkitSpeechRecognition;

    render(<VoiceCommandButton />);

    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('shows tooltip text when unsupported', () => {
    delete (window as any).SpeechRecognition;
    delete (window as any).webkitSpeechRecognition;

    render(<VoiceCommandButton />);

    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('title', 'Voice commands not supported in this browser');
  });

  it('changes aria-label to "Stop voice commands" while listening', async () => {
    const recognition = makeSpeechRecognitionMock();
    render(<VoiceCommandButton />);

    const btn = screen.getByRole('button', { name: 'Start voice commands' });
    act(() => btn.click());

    expect(recognition.start).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Stop voice commands' })).toBeTruthy();
  });
});
