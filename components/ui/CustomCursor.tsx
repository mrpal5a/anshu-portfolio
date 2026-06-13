'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const sx = useSpring(mx, { stiffness: 500, damping: 28, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 500, damping: 28, mass: 0.5 });

  const rx = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.8 });
  const ry = useSpring(my, { stiffness: 120, damping: 22, mass: 0.8 });

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // Only enable the custom cursor on fine-pointer devices that don't
  // request reduced motion (skips touch screens & accessibility users).
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const enter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a,button,[data-cursor]')) setHovered(true);
    };
    const leave = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('a,button,[data-cursor]')) setHovered(false);
    };
    const down = () => setClicked(true);
    const up   = () => setClicked(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', enter);
    window.addEventListener('mouseout', leave);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', enter);
      window.removeEventListener('mouseout', leave);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [mx, my, enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'var(--accent)', x: sx, y: sy }}
        animate={{ scale: clicked ? 0.5 : hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ border: '1px solid var(--accent)', x: rx, y: ry }}
        animate={{ scale: clicked ? 0.7 : hovered ? 2.2 : 1, opacity: hovered ? 0.5 : 1 }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
