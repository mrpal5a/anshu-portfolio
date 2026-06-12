'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync anchor links
    const handleAnchor = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target?.getAttribute?.('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) lenis.scrollTo(el as HTMLElement, { offset: -86 });
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
