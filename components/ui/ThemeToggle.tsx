'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="w-10 h-10 flex items-center justify-center rounded-sm transition-all duration-200 group"
      style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
        (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
      }}
    >
      {theme === 'light'
        ? <Moon size={16} className="transition-transform group-hover:scale-110" />
        : <Sun  size={16} className="transition-transform group-hover:scale-110" />
      }
    </button>
  );
}
