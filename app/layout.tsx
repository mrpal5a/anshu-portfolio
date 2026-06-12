import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import Preloader from '@/components/ui/Preloader';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'], variable: '--font-playfair', display: 'swap',
});
const dmSans = DM_Sans({
  subsets: ['latin'], variable: '--font-dm-sans', display: 'swap', weight: ['300','400','500'],
});
const dmMono = DM_Mono({
  subsets: ['latin'], variable: '--font-dm-mono', display: 'swap', weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  title: { default: 'Anshu — Automation & Web Developer', template: '%s | Anshu' },
  description: 'I build Google Sheets automation, Apps Script workflows, and professional websites for businesses. Based in Ankleshwar, Gujarat.',
  keywords: ['automation developer','Google Apps Script','Google Sheets automation','web developer','Ankleshwar','Gujarat','India'],
  authors: [{ name: 'Anshu' }],
  openGraph: {
    type: 'website', locale: 'en_IN',
    siteName: 'Anshu',
    title: 'Anshu — Automation & Web Developer',
    description: 'I build automation systems and professional websites for businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anshu — Automation & Web Developer',
    description: 'I build automation systems and professional websites for businesses.',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Blocking script — runs before paint, prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved === 'dark' ? 'dark' : 'light';
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Preloader />
          <CustomCursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
