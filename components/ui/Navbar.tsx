'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'About',   href: '/#about',   id: 'about' },
  { label: 'Services', href: '/#services', id: 'services' },
  { label: 'Work',    href: '/#projects', id: 'projects' },
  { label: 'Blog',    href: '/blog' },
  { label: 'Process', href: '/#process', id: 'process' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [progress, setProgress]       = useState(0);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Throttle with rAF so we do at most one DOM read per frame — removes
    // scroll-jank caused by getBoundingClientRect running on every event.
    let ticking = false;

    const read = () => {
      ticking = false;
      setScrolled(window.scrollY > 50);

      const scrollable = document.body.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(pct, 100));

      const sectionIds = ['about', 'services', 'projects', 'process', 'contact'];
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      const visibleSection = sections
        .map((section) => ({ id: section.id, top: section.getBoundingClientRect().top }))
        .filter((section) => section.top <= 120)
        .sort((a, b) => b.top - a.top)[0];

      if (visibleSection?.id) {
        setActiveSection(visibleSection.id);
      } else if (window.scrollY < 120 && sections[0]) {
        setActiveSection(sections[0].id);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(read);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    read();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close the menu with the Escape key.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[9990]"
        style={{ width: `${progress}%`, background: 'var(--accent)' }}
      />

      {/* Navbar */}
      <nav
        className={cn(
          'navbar-surface fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300',
          scrolled && 'shadow-none'
        )}
      >
        {/* Logo */}
        <Link href="/" className="font-display text-xl tracking-tight" style={{ color: 'var(--text)' }}>
          Anshu<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className={cn('nav-link', l.id && activeSection === l.id ? 'active' : '')}
                aria-current={l.id && activeSection === l.id ? 'page' : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side — theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="#contact" className="btn-outline !py-2 !px-5 !text-xs">
            Hire Me
          </Link>
        </div>

        {/* Mobile — theme toggle + animated toggle (opens AND closes) */}
        <div className="flex md:hidden items-center gap-2 relative z-[960]">
          <ThemeToggle />
          <button
            type="button"
            className="relative w-10 h-10 flex items-center justify-center rounded-sm"
            style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className="relative block w-5 h-[14px]">
              <motion.span
                className="absolute left-0 top-0 block h-[1.5px] w-full rounded-full"
                style={{ background: 'currentColor' }}
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <motion.span
                className="absolute left-0 top-[6px] block h-[1.5px] w-full rounded-full"
                style={{ background: 'currentColor' }}
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.18 }}
              />
              <motion.span
                className="absolute left-0 top-[12px] block h-[1.5px] w-full rounded-full"
                style={{ background: 'currentColor' }}
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[890] md:hidden flex flex-col pt-20"
            style={{ background: 'var(--bg)' }}
            role="dialog"
            aria-modal="true"
            onClick={() => setMobileOpen(false)}
          >
            <nav
              className="flex-1 flex flex-col items-center justify-center gap-7"
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    href={l.href}
                    className="font-display text-4xl"
                    style={{ color: activeSection === l.id ? 'var(--accent)' : 'var(--text)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + links.length * 0.05, duration: 0.4 }}
                className="mt-4"
              >
                <Link href="#contact" className="btn-primary" onClick={() => setMobileOpen(false)}>
                  Start Your Project
                </Link>
              </motion.div>
            </nav>

            <p
              className="pb-10 text-center font-mono text-[0.7rem] tracking-[0.2em] uppercase"
              style={{ color: 'var(--subtle)' }}
            >
              Tap anywhere to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
