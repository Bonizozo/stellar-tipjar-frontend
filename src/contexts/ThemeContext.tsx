'use client';

import { createContext, useContext, ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeContextType {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeContextType) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="stellar-tipjar-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
