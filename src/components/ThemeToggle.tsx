'use client';

import { useTheme } from '@/hooks/useTheme';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  const getIcon = () => {
    if (resolvedTheme === 'dark') {
      return <MoonIcon className="w-5 h-5" />;
    }
    if (resolvedTheme === 'light') {
      return <SunIcon className="w-5 h-5" />;
    }
    return <ComputerDesktopIcon className="w-5 h-5" />;
  };

  const getAriaLabel = () => {
    if (resolvedTheme === 'dark') {
      return 'Switch to light mode';
    }
    if (resolvedTheme === 'light') {
      return 'Switch to dark mode';
    }
    return 'Switch to system theme';
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label={getAriaLabel()}
      title={getAriaLabel()}
    >
      {getIcon()}
    </button>
  );
}
