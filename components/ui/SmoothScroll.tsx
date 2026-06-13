'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect reduced-motion: let the browser handle scrolling natively.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const handleNative = (e: Event) => {
        const anchor = (e.target as HTMLElement)?.closest?.('a');
        const href = anchor?.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
        }
      };
      document.addEventListener('click', handleNative);
      return () => document.removeEventListener('click', handleNative);
    }

    const lenis = new Lenis({
      lerp: 0.075,           // smooth, continuous catch-up
      wheelMultiplier: 1.6,  // one firm scroll travels much further
      smoothWheel: true,
      syncTouch: false,      // keep native momentum on mobile
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync anchor links — resolve the closest <a> so clicks on inner
    // elements (icons, spans) still scroll smoothly.
    const handleAnchor = (e: Event) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a');
      const href = anchor?.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -86 });
        }
      }
    };
    document.addEventListener('click', handleAnchor);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchor);
    };
  }, []);

  return <>{children}</>;
}
