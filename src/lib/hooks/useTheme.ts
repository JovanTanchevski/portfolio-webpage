import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type Theme = 'dark' | 'light';

// Stored preference wins; otherwise follow the OS setting
const getInitialTheme = (): Theme =>
  window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

// Theme state persisted in localStorage and mirrored as a class on <html>
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
