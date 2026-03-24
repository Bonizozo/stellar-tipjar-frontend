'use client';

import { useTheme as useNextThemes } from 'next-themes';
import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

export interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: ResolvedTheme | undefined;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLoading: boolean;
}

export function useTheme(): UseThemeReturn {
  const { theme, setTheme, resolvedTheme } = useNextThemes();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return {
    theme: (theme as Theme) || 'system',
    resolvedTheme: resolvedTheme as ResolvedTheme | undefined,
    setTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    isLoading: !mounted,
  };
}
