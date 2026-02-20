'use client';

import * as React from 'react';

type Theme = 'dark' | 'light';

export type AccentColor = 'violet' | 'blue' | 'green' | 'orange' | 'pink';

const accentColorMap: Record<AccentColor, string> = {
  violet: '242 85% 64%',
  blue: '214 95% 60%',
  green: '142 71% 45%',
  orange: '24 95% 53%',
  pink: '330 81% 60%',
};

interface ThemeProviderState {
  theme: Theme;
  accentColor: AccentColor;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = React.createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('light');
  const [accentColor, setAccentColor] = React.useState<AccentColor>('violet');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('voice-theme') as Theme | null;
    const savedAccent = localStorage.getItem('voice-accent') as AccentColor | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }

    if (savedAccent && accentColorMap[savedAccent]) {
      setAccentColor(savedAccent);
    }
    
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    
    // Apply Theme
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('voice-theme', theme);

    // Apply Accent Color
    root.style.setProperty('--primary', accentColorMap[accentColor]);
    localStorage.setItem('voice-accent', accentColor);
    
  }, [theme, accentColor, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setThemeExplicit = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const setAccentColorExplicit = (color: AccentColor) => {
    setAccentColor(color);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      accentColor, 
      toggleTheme, 
      setTheme: setThemeExplicit,
      setAccentColor: setAccentColorExplicit 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
