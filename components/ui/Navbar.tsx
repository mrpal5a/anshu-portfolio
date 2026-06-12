'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';
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
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
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

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[9990] transition-all duration-100"
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

        {/* Mobile — theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-1 transition-colors"
            style={{ color: 'var(--muted)' }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[850] flex flex-col items-center justify-center gap-8"
            style={{ background: 'var(--bg)' }}
          >
            <button
              className="absolute top-6 right-6 transition-colors"
              style={{ color: 'var(--muted)' }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {links.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={l.href}
                  className="font-display text-4xl transition-colors"
                  style={{ color: 'var(--text)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
