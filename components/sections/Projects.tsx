'use client';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import type { Project } from '@/types/database';

function MockSpreadsheet() {
  return (
    <div className="w-[85%] p-4 rounded-sm" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
      <div className="flex gap-1.5 mb-3">
        {['#e05050','var(--accent)','#5a8a5a'].map((c,i) => (
          <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="h-5 rounded-t-sm mb-1" style={{ background: 'var(--accent)' }} />
      {[['hl','','hl',''],['','hl','','hl'],['hl','','','hl'],['','hl','hl','']].map((row, i) => (
        <div key={i} className="flex gap-1 mb-1">
          {row.map((c, j) => (
            <div key={j} className="flex-1 h-4 rounded-sm"
              style={{ background: c === 'hl' ? 'var(--accent-dim)' : 'var(--bg-3)' }} />
          ))}
        </div>
      ))}
    </div>
  );
}

function MockPresentation() {
  return (
    <div className="w-[85%] p-3 rounded-sm" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
      <div className="flex gap-1 mb-2">
        {['#e05050','var(--accent)','#5a8a5a'].map((c,i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="h-20 rounded-sm mb-2 flex flex-col justify-center px-3 gap-1"
        style={{ background: 'color-mix(in srgb, var(--accent) 15%, var(--bg-3))' }}>
        <div className="w-16 h-1.5 rounded-sm" style={{ background: 'var(--accent)' }} />
        <div className="w-24 h-1 rounded-sm" style={{ background: 'var(--border-h)' }} />
        <div className="w-20 h-1 rounded-sm" style={{ background: 'var(--border-h)' }} />
      </div>
      <div className="grid grid-cols-2 gap-1">
        {[1,2,3,4].map(i => <div key={i} className="h-6 rounded-sm" style={{ background: 'var(--bg-3)' }} />)}
      </div>
    </div>
  );
}

function MockWebsite() {
  return (
    <div className="w-[85%] p-3 rounded-sm" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
      <div className="flex gap-1 mb-2">
        {['#e05050','var(--accent)','#5a8a5a'].map((c,i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="h-8 rounded-sm mb-2 flex items-center px-2 gap-1" style={{ background: 'var(--bg-3)' }}>
        <div className="w-12 h-2 rounded-sm" style={{ background: 'color-mix(in srgb, var(--accent) 60%, transparent)' }} />
        <div className="flex-1" />
        <div className="w-8 h-2 rounded-sm" style={{ background: 'var(--accent)' }} />
      </div>
      <div className="h-16 rounded-sm mb-2" style={{ background: 'var(--bg-3)' }} />
      <div className="grid grid-cols-3 gap-1">
        {[1,2,3].map(i => <div key={i} className="h-8 rounded-sm" style={{ background: 'var(--bg-3)' }} />)}
      </div>
    </div>
  );
}

const staticProjects = [
  {
    id: 'ink-stock',
    title: 'Ink Stock Register — Novelty Labels',
    description: 'Fully automated ink inventory system with auto-expiry calculation, dynamic status tracking, bi-monthly email reports, and custom menu system. Replaced a manual paper system entirely.',
    tags: ['Google Sheets', 'Apps Script', 'Automation'],
    featured: true,
    liveUrl: '',
    visual: <MockSpreadsheet />,
  },
  {
    id: 'sop-ppt',
    title: 'Customer SOP Presentation',
    description: '10-slide professional presentation to address label peeling complaints with a 4-step application SOP. Built to impress management and educate end customers.',
    tags: ['PowerPoint', 'Design', 'SOP'],
    liveUrl: '',
    visual: <MockPresentation />,
  },
  {
    id: 'excel-register',
    title: 'Dynamic Inventory Register',
    description: 'Converted a static Excel spreadsheet into a formula-driven register with auto-calculating expiry dates, live SKU count, and status indicators.',
    tags: ['Excel', 'Dynamic Formulas'],
    liveUrl: '',
    visual: <MockWebsite />,
  },
];

export default function Projects({ projects, featuredProjectId }: { projects?: Project[]; featuredProjectId?: string }) {
  const filteredProjects = projects?.filter((project) => project.id !== featuredProjectId);
  const items = (filteredProjects && filteredProjects.length > 0)
    ? filteredProjects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description || '',
        tags: p.tech_stack || [],
        featured: p.featured,
        liveUrl: p.live_url || '',
        visual: p.image_url ? (
          <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
        ) : (
          <MockWebsite />
        ),
      }))
    : staticProjects;

  return (
    <section id="projects" className="py-24 px-6 md:px-12" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="section-label">
          <span className="section-num">03</span>
          <div className="section-line" />
          <span className="section-tag">Selected Work</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight" style={{ color: 'var(--text)' }}>
              Projects that{' '}
              <em className="not-italic" style={{ color: 'var(--accent)' }}>delivered results</em>
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <Link href="#contact" className="btn-outline whitespace-nowrap">Start a Project</Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((p, i) => (
            <FadeIn key={p.id} delay={i * 80}>
              <div
                className={`group overflow-hidden flex flex-col h-full rounded-[1.5rem] transition-all duration-300 shadow-[0_18px_60px_rgba(0,0,0,0.07)] ${p.featured ? 'md:col-span-2 md:flex-row bg-gradient-to-br from-[rgba(184,134,11,0.06)] via-transparent to-[rgba(255,255,255,0.8)]' : 'hover:-translate-y-1 hover:border-accent/30'}`}
                style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'color-mix(in srgb, var(--accent) 45%, transparent)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
              >
                {/* Visual */}
                <div
                  className={`flex items-center justify-center p-6
                    ${p.featured ? 'md:w-1/2 min-h-[200px]' : 'aspect-video'}`}
                  style={{
                    background: 'var(--bg-3)',
                    borderBottom: p.featured ? 'none' : '1px solid var(--border)',
                    borderRight: p.featured ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {p.visual}
                </div>

                {/* Body */}
                <div className={`p-6 flex flex-col justify-center ${p.featured ? 'md:w-1/2 md:p-10' : ''}`}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.featured && (
                      <span className="meta-tag" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>
                        Featured
                      </span>
                    )}
                    {p.tags.map((t: string) => <span key={t} className="meta-tag">{t}</span>)}
                  </div>
                  <h3 className={`font-display mb-3 ${p.featured ? 'text-2xl' : 'text-lg'}`} style={{ color: 'var(--text)' }}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-3 items-center">
                    {p.liveUrl && (
                      <Link
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline !py-2 !px-4 !text-[0.7rem]"
                        style={{ color: 'var(--accent)' }}
                      >
                        View Live
                      </Link>
                    )}
                    <Link
                      href="#contact"
                      className="btn-outline !py-2 !px-4 !text-[0.7rem]"
                      style={{ color: 'var(--accent)' }}
                    >
                      Request Similar
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
