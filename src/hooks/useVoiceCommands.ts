import { useEffect, useState, useCallback, useRef } from 'react';
import { speechRecognition, SpeechRecognitionResult } from '@/utils/speechRecognition';
import { keyboardShortcutsManager } from '@/utils/keyboardShortcuts';

export interface VoiceCommandConfig {
  enabled?: boolean;
  language?: string;
  commands?: Map<string, () => void>;
}

export interface VoiceCommandState {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  confidence: number;
  error: string | null;
}

export const useVoiceCommands = (config: VoiceCommandConfig = {}) => {
  const [state, setState] = useState<VoiceCommandState>({
    isListening: false,
    isSpeaking: false,
    transcript: '',
    confidence: 0,
    error: null,
  });

  const commandsRef = useRef<Map<string, () => void>>(config.commands || new Map());
  const isListeningRef = useRef(false);

  const handleVoiceResult = useCallback((result: SpeechRecognitionResult) => {
    setState((prev) => ({
      ...prev,
      transcript: result.transcript,
      confidence: result.confidence,
      error: null,
    }));

    if (result.isFinal) {
      // Check if the transcript matches any registered commands
      commandsRef.current.forEach((callback, command) => {
        if (
          result.transcript.includes(command.toLowerCase()) ||
          result.transcript.startsWith(command.toLowerCase())
        ) {
          callback();
        }
      });
    }
  }, []);

  const handleVoiceError = useCallback((error: string) => {
    setState((prev) => ({
      ...prev,
      error,
      isListening: false,
    }));
    isListeningRef.current = false;
  }, []);

  const startListening = useCallback(() => {
    if (!speechRecognition.isSupported()) {
      setState((prev) => ({
        ...prev,
        error: 'Voice commands not supported in your browser',
      }));
      return;
    }

    isListeningRef.current = true;
    setState((prev) => ({
      ...prev,
      isListening: true,
      error: null,
      transcript: '',
    }));

    speechRecognition.startListening(
      handleVoiceResult,
      handleVoiceError,
      {
        language: config.language || 'en-US',
        continuous: true,
        interimResults: true,
      }
    );
  }, [config.language, handleVoiceResult, handleVoiceError]);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    speechRecognition.stopListening();
    setState((prev) => ({
      ...prev,
      isListening: false,
    }));
  }, []);

  const speak = useCallback((text: string, onComplete?: () => void) => {
    setState((prev) => ({
      ...prev,
      isSpeaking: true,
    }));

    speechRecognition.speak(text, () => {
      setState((prev) => ({
        ...prev,
        isSpeaking: false,
      }));
      onComplete?.();
    });
  }, []);

  const registerCommand = useCallback((command: string, callback: () => void) => {
    commandsRef.current.set(command.toLowerCase(), callback);
  }, []);

  const unregisterCommand = useCallback((command: string) => {
    commandsRef.current.delete(command.toLowerCase());
  }, []);

  // Set up keyboard shortcut for voice toggle
  useEffect(() => {
    if (config.enabled !== false) {
      keyboardShortcutsManager.register({
        key: 'v',
        ctrl: true,
        callback: () => {
          if (isListeningRef.current) {
            stopListening();
          } else {
            startListening();
          }
        },
      });
    }

    return () => {
      keyboardShortcutsManager.unregister({
        key: 'v',
        ctrl: true,
      });
    };
  }, [startListening, stopListening, config.enabled]);

  return {
    ...state,
    startListening,
    stopListening,
    speak,
    registerCommand,
    unregisterCommand,
    isSupported: speechRecognition.isSupported(),
  };
};
