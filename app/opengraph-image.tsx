import { ImageResponse } from 'next/og';

export const alt = 'Anshu — Website Developer & Automation Engineer in Ankleshwar, Gujarat';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0e0e0d',
          backgroundImage:
            'radial-gradient(circle at 18% 18%, rgba(212,168,75,0.18), transparent 42%), radial-gradient(circle at 88% 12%, rgba(212,168,75,0.12), transparent 40%)',
          padding: '72px 80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', fontSize: 34, color: '#f0ede6', letterSpacing: -1 }}>
            <span>Anshu</span>
            <span style={{ color: '#d4a84b' }}>.</span>
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#d4a84b',
              border: '1px solid rgba(212,168,75,0.4)',
              borderRadius: 999,
              padding: '6px 18px',
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}
          >
            Available for new projects
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 72,
              color: '#f0ede6',
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            <span>Premium websites with real&nbsp;</span>
            <span style={{ color: '#d4a84b' }}>automation&nbsp;</span>
            <span>built in.</span>
          </div>
          <div style={{ fontSize: 30, color: '#9c9a93', maxWidth: 900, lineHeight: 1.3 }}>
            Website Developer &amp; Automation Engineer — Ankleshwar, Bharuch &amp; across Gujarat.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {['Web Development', 'Google Sheets Automation', 'SEO', 'Next.js'].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 20,
                color: '#d4a84b',
                background: 'rgba(212,168,75,0.12)',
                border: '1px solid rgba(212,168,75,0.3)',
                borderRadius: 8,
                padding: '8px 20px',
                fontFamily: 'monospace',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
