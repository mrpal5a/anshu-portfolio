import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--bg)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
        },
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--muted)',
          subtle: 'var(--subtle)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-l)',
          dim: 'var(--accent-dim)',
        },
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-h)',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
      },
      animation: {
        'fade-up':     'fadeUp 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        'scroll-line': 'scrollLine 1.8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollLine: {
          '0%,100%': { transform: 'scaleY(1)', opacity: '1' },
          '50%':     { transform: 'scaleY(0.4)', opacity: '0.4' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--muted)',
            maxWidth: 'none',
            a:          { color: 'var(--accent)', '&:hover': { color: 'var(--accent-l)' } },
            h1:         { color: 'var(--text)', fontFamily: 'var(--font-playfair)' },
            h2:         { color: 'var(--text)', fontFamily: 'var(--font-playfair)' },
            h3:         { color: 'var(--text)', fontFamily: 'var(--font-playfair)' },
            strong:     { color: 'var(--text)' },
            blockquote: { borderLeftColor: 'var(--accent)', color: 'var(--text)' },
            hr:         { borderColor: 'var(--border)' },
            code:       { color: 'var(--accent)', backgroundColor: 'var(--accent-dim)', padding: '2px 6px', borderRadius: '3px' },
            pre:        { backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
