'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';

const words = ['Automation', '&', 'Web', 'Systems', 'that', 'work.'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-6 md:px-12 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]">
          <defs>
            <pattern id="dotgrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotgrid)" style={{ color: 'var(--accent)' }} />
        </svg>

        {/* Glow blobs */}
        <motion.div
          className="absolute left-[-8%] top-16 w-96 h-96 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.35, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(184,134,11,0.25), transparent 60%)' }}
        />
        <motion.div
          className="absolute right-[-5%] top-32 w-72 h-72 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ background: 'radial-gradient(circle, rgba(212,168,75,0.2), transparent 65%)' }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(184,134,11,0.4)] to-transparent" />
      </div>

      {/* Decorative large letter with parallax */}
      <motion.span
        className="absolute bottom-[-2rem] left-[-1rem] font-display leading-none select-none pointer-events-none"
        style={{ fontSize: '20rem', color: 'var(--bg-3)', zIndex: 0, opacity: 0.7 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >A</motion.span>

      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-10 max-w-[1100px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* Left */}
        <div>
          {/* Badge */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <motion.span
              className="w-8 h-px"
              style={{ background: 'var(--accent)' }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            />
            <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
              Available for new projects
            </span>
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--accent)' }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </motion.div>

          {/* Word-by-word headline */}
          <h1
            className="font-display text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.08] tracking-tight mb-7"
            style={{ color: 'var(--text)' }}
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0 align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.75,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 1.9 + i * 0.1,
                  }}
                  style={(word === 'work.' || word === 'Systems') ? { color: 'var(--accent)' } : {}}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="text-base leading-relaxed mb-9 max-w-[420px]"
            style={{ color: 'var(--muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.55, duration: 0.7 }}
          >
            I build Google Sheets automation, Apps Script workflows, and professional websites
            for businesses that want to save time, reduce errors, and look credible online.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link href="#projects" className="btn-primary">View My Work</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link href="#contact" className="btn-outline">Let&apos;s Talk</Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right — floating card */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 2.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ perspective: '900px' }}
        >
          <motion.div
            className="rounded-[1.75rem] border p-8"
            style={{
              background: 'var(--bg-2)',
              borderColor: 'var(--border)',
              boxShadow: '0 32px 100px rgba(0,0,0,0.1), 0 0 0 1px rgba(184,134,11,0.06)',
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3.2 }}
          >
            <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
              Launch in weeks, not months
            </span>
            <h2 className="font-display text-3xl md:text-4xl mt-4 mb-5" style={{ color: 'var(--text)' }}>
              Premium websites with real automation built in.
            </h2>
            <ul className="space-y-3 text-sm leading-6 mb-6" style={{ color: 'var(--muted)' }}>
              {[
                'Live-ready project links and professional site design.',
                'Google Sheets workflows that save time every day.',
                'Fast, secure sites that look polished on every device.',
              ].map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.5 + i * 0.12, duration: 0.5 }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                  {point}
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="#contact" className="btn-primary">Start Your Project</Link>
              <Link href="#projects" className="btn-outline">See Work</Link>
            </div>
            <div className="flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>
              {['Manufacturing', 'Inventory', 'Logistics', 'Live Websites'].map((tag) => (
                <motion.span
                  key={tag}
                  className="rounded-full border px-3 py-1.5 cursor-default"
                  style={{ borderColor: 'var(--border)' }}
                  whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <div className="w-px h-12 animate-scroll-line" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
        <ArrowDown size={12} style={{ color: 'var(--subtle)' }} />
      </motion.div>
    </section>
  );
}
