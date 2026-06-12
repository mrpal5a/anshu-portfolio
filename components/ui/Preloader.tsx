'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9990] flex items-center justify-center"
          style={{ background: 'var(--bg)' }}
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* Animated logo letters */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="font-display text-6xl tracking-tight block"
                style={{ color: 'var(--text)' }}
              >
                Anshu<span style={{ color: 'var(--accent)' }}>.</span>
              </motion.span>
            </div>

            {/* Progress bar */}
            <div className="w-32 h-px overflow-hidden" style={{ background: 'var(--border)' }}>
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                className="h-full"
                style={{ background: 'var(--accent)' }}
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              Loading
            </motion.span>
          </div>

          {/* Wipe curtain exit */}
          <motion.div
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1, originY: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
            className="absolute inset-0"
            style={{ background: 'var(--accent)', transformOrigin: 'bottom' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
