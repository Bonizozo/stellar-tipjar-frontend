'use client';

import { Mic, MicOff } from 'lucide-react';
import { useVoiceCommands, UseVoiceCommandsOptions } from '@/hooks/useVoiceCommands';

interface VoiceCommandButtonProps extends UseVoiceCommandsOptions {
  className?: string;
}

export function VoiceCommandButton({ className = '', ...hookOptions }: VoiceCommandButtonProps) {
  const { isListening, isSupported, startListening, stopListening } =
    useVoiceCommands(hookOptions);

  const label = isListening ? 'Stop voice commands' : 'Start voice commands';

  return (
    <div className={`relative inline-flex ${className}`}>
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        disabled={!isSupported}
        aria-label={label}
        title={isSupported ? label : 'Voice commands not supported in this browser'}
        className={[
          'inline-flex items-center justify-center rounded-full p-2',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50',
          'transition-colors',
          isSupported
            ? isListening
              ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            : 'cursor-not-allowed opacity-50 bg-gray-100 text-gray-400 dark:bg-gray-800',
        ].join(' ')}
      >
        {isListening ? (
          <>
            {/* Pulsing ring indicator */}
            <span
              className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-30"
              aria-hidden="true"
            />
            <MicOff className="h-5 w-5 relative" aria-hidden="true" />
          </>
        ) : (
          <Mic className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
