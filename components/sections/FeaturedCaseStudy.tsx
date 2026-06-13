'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import type { Project } from '@/types/database';

export default function FeaturedCaseStudy({ project }: { project: Project }) {
  const summary = (project.content || project.description || '').split('. ').slice(0, 2).join('. ').trim();

  return (
    <section id="case-study" className="py-24 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="section-label">
          <span className="section-num">02</span>
          <div className="section-line" />
          <span className="section-tag">Featured Case Study</span>
        </div>

        <div className="grid gap-10 xl:grid-cols-[1.15fr_0.85fr] items-center">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25,0.46,0.45,0.94] }}
              className="rounded-[1.75rem] overflow-hidden border border-border bg-[var(--bg-2)] shadow-[0_24px_90px_rgba(0,0,0,0.08)]"
            >
              {project.image_url ? (
                <div className="relative">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-[380px] object-cover"
                  />
                  <div className="absolute top-6 left-6 rounded-full border border-border bg-[var(--bg-2)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)] shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
                    Featured project
                  </div>
                </div>
              ) : (
                <div className="h-[380px] bg-[var(--bg-3)] flex items-center justify-center text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
                  Project preview
                </div>
              )}
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech_stack?.map((tag) => (
                    <span key={tag} className="skill-pill">{tag}</span>
                  ))}
                </div>
                <h2 className="font-display text-4xl md:text-5xl mb-5 text-gradient">
                  {project.title}
                </h2>
                <p className="text-base leading-relaxed text-[var(--muted)] mb-6">{summary}</p>
                <div className="flex flex-wrap gap-3">
                  {project.live_url ? (
                    <Link href={project.live_url} target="_blank" rel="noreferrer" className="btn-primary">
                      View Live Site
                    </Link>
                  ) : null}
                  <Link href="#contact" className="btn-outline">
                    Talk About Similar Work
                  </Link>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="rounded-[1.5rem] border border-border bg-[var(--bg-2)] p-8 shadow-[0_22px_80px_rgba(0,0,0,0.08)]">
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
                Project highlight
              </span>
              <h3 className="font-display text-3xl mt-4 mb-6" style={{ color: 'var(--text)' }}>
                Why this project stood out
              </h3>
              <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
                <p>Delivered a polished experience with a clear business outcome — faster operations and stronger credibility online.</p>
                <p>Included a live-ready implementation, data-driven workflows, and a professional interface designed for user confidence.</p>
                <p>Built to be maintainable, scalable, and easy for clients to update as their business grows.</p>
              </div>
              <div className="mt-8 grid gap-3">
                <div className="rounded-[0.85rem] border border-border bg-[var(--bg)] p-4">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-[var(--muted)]">Primary result</p>
                  <p className="mt-2 font-display text-xl" style={{ color: 'var(--accent)' }}>
                    Better automation, fewer manual errors, faster delivery.
                  </p>
                </div>
                <div className="rounded-[0.85rem] border border-border bg-[var(--bg)] p-4">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-[var(--muted)]">Why it matters</p>
                  <p className="mt-2">A professional site plus automation builds trust, showcases work, and helps clients feel confident in next steps.</p>
                </div>
                <div className="rounded-[0.85rem] border border-border bg-gradient-to-br from-[rgba(184,134,11,0.08)] to-[var(--bg)] p-4">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-[var(--muted)]">What makes this premium</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                    <li>• Live-ready website styling with clear business messaging.</li>
                    <li>• Automation that removes busywork and saves daily time.</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
