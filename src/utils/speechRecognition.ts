/**
 * Speech Recognition Utilities
 * Handles browser speech recognition and voice feedback
 */

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface SpeechRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

class SpeechRecognitionService {
  private recognition: any;
  private isListening = false;
  private isSpeaking = false;

  constructor() {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition);

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
    }
  }

  isSupported(): boolean {
    return this.recognition !== undefined;
  }

  startListening(
    onResult: (result: SpeechRecognitionResult) => void,
    onError?: (error: string) => void,
    options?: SpeechRecognitionOptions
  ): void {
    if (!this.isSupported()) {
      onError?.('Speech recognition not supported in this browser');
      return;
    }

    this.isListening = true;
    this.recognition.language = options?.language || 'en-US';
    this.recognition.continuous = options?.continuous || false;
    this.recognition.interimResults = options?.interimResults || true;
    this.recognition.maxAlternatives = options?.maxAlternatives || 1;

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      let confidence = 0;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        transcript += transcriptSegment;
        if (event.results[i].isFinal) {
          confidence = event.results[i][0].confidence;
        }
      }

      onResult({
        transcript: transcript.toLowerCase(),
        confidence,
        isFinal: event.results[event.results.length - 1].isFinal,
      });
    };

    this.recognition.onerror = (event: any) => {
      onError?.(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    this.recognition.start();
  }

  stopListening(): void {
    if (this.isSupported() && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text: string, onComplete?: () => void): void {
    if (typeof window === 'undefined') return;

    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      onComplete?.();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
    };

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking(): void {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }

  getIsListening(): boolean {
    return this.isListening;
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speechRecognition = new SpeechRecognitionService();
