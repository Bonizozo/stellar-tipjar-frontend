'use client';

import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import Button from './Button';

interface VoiceControlProps {
  onCommandDetected?: (command: string) => void;
  enabled?: boolean;
  className?: string;
  showTranscript?: boolean;
}

export const VoiceControl: React.FC<VoiceControlProps> = ({
  onCommandDetected,
  enabled = true,
  className = '',
  showTranscript = true,
}) => {
  const {
    isListening,
    isSpeaking,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    speak,
    isSupported,
  } = useVoiceCommands({ enabled });

  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (!isSupported) {
      console.warn('Voice commands not supported in this browser');
    }
  }, [isSupported]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className={`voice-control ${className}`}>
      {/* Main Voice Control Button */}
      <div className="flex items-center gap-2">
        <Button
          onClick={toggleListening}
          disabled={isSpeaking}
          className={`flex items-center gap-2 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Start voice command'}
          title="Voice Commands (Ctrl+V)"
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              Start Voice
            </>
          )}
        </Button>

        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          aria-label="Voice command help"
        >
          <span className="text-sm">?</span>
        </button>
      </div>

      {/* Listening State Indicator */}
      {isListening && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-2 animate-pulse">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Listening...
            </span>
          </div>

          {showTranscript && transcript && (
            <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">{transcript}</p>
              {confidence > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Confidence: {(confidence * 100).toFixed(0)}%
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Speaking State Indicator */}
      {isSpeaking && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2 animate-pulse">
            <Volume2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-900 dark:text-green-100">
              Speaking...
            </span>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-700 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900 dark:text-red-100">
              Voice Command Error
            </p>
            <p className="text-sm text-red-800 dark:text-red-200 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Help Panel */}
      {showHelp && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Voice Commands
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• Say "send tip" to open the tip form</li>
            <li>• Say "search" to focus the search bar</li>
            <li>• Say "menu" to open navigation menu</li>
            <li>• Say "close" to close dialogs</li>
            <li>• Use Ctrl+V to toggle voice on/off</li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Supports: en-US, es-ES, fr-FR, de-DE
          </p>
        </div>
      )}

      {/* Accessibility Announcement */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isListening && 'Voice control is listening'}
        {isSpeaking && 'Voice control is speaking'}
        {transcript && `Transcript: ${transcript}`}
        {error && `Error: ${error}`}
      </div>
    </div>
  );
};

export default VoiceControl;
