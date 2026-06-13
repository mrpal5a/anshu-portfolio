'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

const testimonials = [
  {
    initials: 'NL',
    quote: 'The automated stock register completely changed how we manage inventory. What used to take 2 hours every week now runs on its own — and the email alerts mean we never let inks expire without knowing.',
    name: 'Operations Manager',
    role: 'Novelty Labels & Supplies, Ankleshwar',
  },
  {
    initials: 'BM',
    quote: 'The SOP presentation looked genuinely professional — exactly the kind of document that makes management and customers take you seriously. Clean design, clear content, delivered quickly.',
    name: 'Business Manager',
    role: 'Label Industry, Gujarat',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const current = testimonials[activeIndex];

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % testimonials.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="testimonials" className="py-24 px-6 md:px-12" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="section-label">
          <span className="section-num">05</span>
          <div className="section-line" />
          <span className="section-tag">Client Feedback</span>
        </div>

        <FadeIn>
          <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-12" style={{ color: 'var(--text)' }}>
            What people{' '}
            <em className="not-italic" style={{ color: 'var(--accent)' }}>say about the work</em>
          </h2>
        </FadeIn>

        <FadeIn>
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.25,0.46,0.45,0.94] }}
                className="relative rounded-[1.75rem] border border-border p-8 shadow-[0_20px_70px_rgba(0,0,0,0.08)]"
                style={{ background: 'var(--bg)' }}
              >
                <span
                  className="absolute top-6 left-6 font-display text-8xl leading-none pointer-events-none select-none"
                  style={{ color: 'var(--bg-3)' }}
                  aria-hidden
                >&ldquo;</span>

                <p className="relative text-lg md:text-xl leading-relaxed italic mb-8 z-10" style={{ color: 'var(--muted)' }}>
                  &ldquo;{current.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-display text-sm font-bold flex-shrink-0"
                style={{ background: 'var(--accent-dim)', border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)', color: 'var(--accent)' }}
              >
                {current.initials}
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{current.name}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>{current.role}</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${index === activeIndex ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}
                  className="rounded-full border border-border bg-[var(--bg-2)] p-2 transition-colors hover:border-accent"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
                  className="rounded-full border border-border bg-[var(--bg-2)] p-2 transition-colors hover:border-accent"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
