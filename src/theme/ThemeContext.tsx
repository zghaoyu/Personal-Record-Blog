import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { programs, type Program } from '../data/programs';

interface ThemeContextValue {
  index: number;
  setIndex: (i: number) => void;
  next: () => void;
  prev: () => void;
  current: Program;
  programs: Program[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [index, setIndexRaw] = useState(0);
  const current = programs[index];

  const setIndex = (i: number) => {
    const len = programs.length;
    setIndexRaw(((i % len) + len) % len);
  };
  const next = () => setIndex(index + 1);
  const prev = () => setIndex(index - 1);

  // Sync theme to CSS variables on :root whenever the slide changes
  useEffect(() => {
    const root = document.documentElement;
    const t = current.theme;
    root.style.setProperty('--bg', t.bg);
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--triangle', t.triangle);
    root.style.setProperty('--text-on-bg', t.textOnBg);
    root.style.setProperty('--card-bg', t.cardBg);
    root.style.setProperty('--card-text', t.cardText);
  }, [current]);

  const value = useMemo(
    () => ({ index, setIndex, next, prev, current, programs }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, current],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
