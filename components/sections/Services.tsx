'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Workflow, Globe, PackageSearch } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';
import AnimatedHeading from '@/components/ui/AnimatedHeading';

const services = [
  {
    Icon: Workflow,
    num: '01',
    title: 'Spreadsheet Automation',
    description: 'Custom Google Apps Script automation for your Sheets: auto-calculations, scheduled email reports, dynamic dashboards, form triggers, and data validation — all without manual input.',
    price: 'Starting from ₹2,000',
    features: ['Email triggers & alerts', 'Auto-calculations', 'Custom menus', 'Data validation'],
  },
  {
    Icon: Globe,
    num: '02',
    title: 'Professional Websites',
    description: 'Fast, SEO-optimized, mobile-first websites that look premium and load in under 2 seconds. Built with modern frameworks — hosted, deployed, and handed to you fully live.',
    price: 'Starting from ₹5,000',
    features: ['Mobile responsive', 'SEO optimized', 'Contact forms', 'Fast loading'],
  },
  {
    Icon: PackageSearch,
    num: '03',
    title: 'Inventory & Stock Systems',
    description: 'Digital inventory registers with auto-expiry tracking, status indicators, location mapping, and scheduled alerts — replacing paper-based or static Excel systems entirely.',
    price: 'Starting from ₹3,000',
    features: ['Expiry tracking', 'Status indicators', 'Email alerts', 'Location mapping'],
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="services" className="py-24 px-6 md:px-12" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="section-label">
          <span className="section-num">02</span>
          <div className="section-line" />
          <span className="section-tag">What I Do</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end mb-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <AnimatedHeading
              className="font-display text-4xl md:text-5xl leading-tight tracking-tight"
              style={{ color: 'var(--text)' }}
            >
              Services built for real businesses
            </AnimatedHeading>
          </motion.div>
          <motion.p
            className="leading-relaxed"
            style={{ color: 'var(--muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            I focus on two things: automating the work that wastes your time, and making your
            business look credible online. Everything is built to last, not to demo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <TiltCard
                className="group relative flex flex-col h-full rounded-[1.25rem] p-7 overflow-hidden"
                style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}
                intensity={6}
              >
                {/* Soft accent glow that appears on hover */}
                <div
                  className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle, var(--accent-dim), transparent 70%)' }}
                  aria-hidden
                />
                {/* Hover bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{ background: 'var(--accent)' }}
                  initial={{ scaleX: 0, originX: '0%' }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute top-6 right-6 font-mono text-xs tracking-[0.1em] opacity-30" style={{ color: 'var(--accent)' }}>
                  {s.num}
                </span>

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
                  style={{
                    background: 'var(--accent-dim)',
                    border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                  }}
                >
                  <s.Icon size={24} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-display text-xl mb-3" style={{ color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--muted)' }}>{s.description}</p>

                <ul className="space-y-1.5 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 font-mono text-xs tracking-[0.1em]" style={{ borderTop: '1px solid var(--border)', color: 'var(--accent)' }}>
                  → {s.price}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
