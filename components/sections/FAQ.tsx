'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import { faqs } from '@/lib/faq-data';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 px-6 md:px-12"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-[820px] mx-auto">
        <div className="section-label">
          <span className="section-num">07</span>
          <div className="section-line" />
          <span className="section-tag">FAQ</span>
        </div>

        <FadeIn>
          <h2
            className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-12"
            style={{ color: 'var(--text)' }}
          >
            Questions clients{' '}
            <em className="not-italic" style={{ color: 'var(--accent)' }}>
              usually ask
            </em>
          </h2>
        </FadeIn>

        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={item.q} delay={i * 40}>
                <div style={{ borderTop: i === 0 ? '1px solid var(--border)' : undefined, borderBottom: '1px solid var(--border)' }}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-display text-lg md:text-xl"
                      style={{ color: isOpen ? 'var(--accent)' : 'var(--text)' }}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0"
                      style={{ color: 'var(--accent)' }}
                    >
                      <Plus size={20} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="pb-6 pr-10 text-sm md:text-base leading-relaxed"
                          style={{ color: 'var(--muted)' }}
                        >
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
