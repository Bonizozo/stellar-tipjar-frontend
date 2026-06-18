'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface UseVoiceCommandsOptions {
  lang?: string;
  onTip?: (amount?: number) => void;
  enabled?: boolean;
}

export interface UseVoiceCommandsResult {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  confidence: number;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  isSupported: boolean;
}

export function useVoiceCommands({
  lang,
  onTip,
  enabled = true,
}: UseVoiceCommandsOptions = {}): UseVoiceCommandsResult {
  const router = useRouter();
  const resolvedLang =
    lang ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US');

  const SpeechRecognitionCtor =
    typeof window !== 'undefined'
      ? (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
      : null;

  const isSupported = Boolean(SpeechRecognitionCtor);

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = resolvedLang;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [resolvedLang]);

  const handleResult = useCallback(
    (event: any) => {
      const resultsLen = event.results.length;
      const lastResult = event.results[resultsLen - 1];
      const text: string = lastResult[0].transcript.toLowerCase().trim();
      const conf: number = lastResult[0].confidence;
      setTranscript(text);
      setConfidence(conf);
      setError(null);

      if (text.includes('go home') || text.includes('navigate home')) {
        speak('Navigating home');
        router.push('/');
      } else if (text.startsWith('tip') || text.includes('send tip')) {
        const match = text.match(/tip\s+(\d+(?:\.\d+)?)/);
        const amount = match ? parseFloat(match[1]) : undefined;
        const feedback = amount != null ? `Sending tip of ${amount}` : 'Sending tip';
        speak(feedback);
        if (onTip) {
          onTip(amount);
        } else {
          router.push('/tips');
        }
      } else if (text.startsWith('go to ')) {
        const page = text.replace('go to ', '').trim();
        speak(`Navigating to ${page}`);
        router.push(`/${page}`);
      } else if (text.includes('stop listening')) {
        speak('Stopping');
        recognitionRef.current?.stop();
      } else {
        speak('Command not recognized');
      }
    },
    [router, onTip, speak],
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.abort();
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (!enabled || !isSupported || !SpeechRecognitionCtor) return;

    setError(null);
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = resolvedLang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = handleResult;
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
      setIsListening(false);
      setError(event.error || 'Speech recognition error');
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [enabled, isSupported, SpeechRecognitionCtor, resolvedLang, handleResult]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isListening,
    isSpeaking,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    speak,
    isSupported,
  };
}
