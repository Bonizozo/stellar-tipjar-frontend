'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface UseVoiceCommandsOptions {
  lang?: string;
  onTip?: (amount?: number) => void;
}

export interface UseVoiceCommandsResult {
  isListening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
}

function speak(text: string, lang: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}

export function useVoiceCommands({
  lang,
  onTip,
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
  const recognitionRef = useRef<any>(null);

  const handleResult = useCallback(
    (event: any) => {
      const transcript: string =
        event.results[event.results.length - 1][0].transcript
          .toLowerCase()
          .trim();

      if (transcript.includes('go home') || transcript.includes('navigate home')) {
        speak('Navigating home', resolvedLang);
        router.push('/');
      } else if (transcript.startsWith('tip') || transcript.includes('send tip')) {
        const match = transcript.match(/tip\s+(\d+(?:\.\d+)?)/);
        const amount = match ? parseFloat(match[1]) : undefined;
        const feedback = amount != null ? `Sending tip of ${amount}` : 'Sending tip';
        speak(feedback, resolvedLang);
        if (onTip) {
          onTip(amount);
        } else {
          router.push('/tips');
        }
      } else if (transcript.startsWith('go to ')) {
        const page = transcript.replace('go to ', '').trim();
        speak(`Navigating to ${page}`, resolvedLang);
        router.push(`/${page}`);
      } else if (transcript.includes('stop listening')) {
        speak('Stopping', resolvedLang);
        recognitionRef.current?.stop();
      } else {
        speak('Command not recognized', resolvedLang);
      }
    },
    [resolvedLang, router, onTip],
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.abort();
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported || !SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = resolvedLang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = handleResult;
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isSupported, SpeechRecognitionCtor, resolvedLang, handleResult]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  return { isListening, isSupported, startListening, stopListening };
}
