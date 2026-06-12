'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedHeading from '@/components/ui/AnimatedHeading';

const tools = [
  'Google Sheets & Apps Script',
  'HTML5 / CSS3 / JavaScript',
  'Next.js & React',
  'SEO & Performance Optimization',
  'Email Automation & Triggers',
  'Inventory & Stock Systems',
  'Supabase & PostgreSQL',
  'Web Hosting & Deployment',
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="about"
      className="py-24 px-6 md:px-12"
      style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="section-label">
          <span className="section-num">01</span>
          <div className="section-line" />
          <span className="section-tag">About Me</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <AnimatedHeading
              className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-6"
              style={{ color: 'var(--text)' }}
            >
              A builder who understands your business
            </AnimatedHeading>

            <motion.div
              className="space-y-4 leading-relaxed"
              style={{ color: 'var(--muted)' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <p>
                I&apos;m Anshu, an automation engineer and web developer based in{' '}
                <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Ankleshwar, Gujarat</strong>.
                I work with small and medium businesses to eliminate repetitive manual work and
                build professional online presences.
              </p>
              <p>
                My background is in hands-on operations — I&apos;ve built inventory management systems,
                automated stock registers with scheduled email alerts, interactive SOPs for client
                presentations, and websites that actually rank and convert.
              </p>
            </motion.div>

            <motion.blockquote
              className="my-8 pl-6 font-display text-xl leading-snug italic"
              style={{ borderLeft: '2px solid var(--accent)', color: 'var(--text)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              &ldquo;I don&apos;t just write code. I solve operational problems that cost businesses
              hours every week.&rdquo;
            </motion.blockquote>

            <motion.p
              className="leading-relaxed"
              style={{ color: 'var(--muted)' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              Whether you need your Google Sheets talking to your email automatically, or a website
              that makes a powerful first impression — I build it properly, the first time.
            </motion.p>
          </motion.div>

          {/* Right — tools list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h4 className="font-mono text-xs tracking-[0.18em] uppercase mb-4" style={{ color: 'var(--muted)' }}>
              Tools &amp; Technologies
            </h4>
            <ul className="space-y-2">
              {tools.map((t, i) => (
                <motion.li
                  key={t}
                  className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm cursor-default"
                  style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                  whileHover={{ borderColor: 'var(--accent)', color: 'var(--text)', x: 4 }}
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                    whileHover={{ scale: 1.5 }}
                  />
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
