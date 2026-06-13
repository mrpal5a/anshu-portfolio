import type { Metadata } from 'next';
import { Fraunces, Manrope, DM_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import Preloader from '@/components/ui/Preloader';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { SITE_URL } from '@/lib/structured-data';
import './globals.css';

// Display — Fraunces: a soft, high-contrast editorial serif for a premium feel.
const playfair = Fraunces({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});
// Body — Manrope: a clean, modern geometric sans with substantial weights.
const dmSans = Manrope({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});
const dmMono = DM_Mono({
  subsets: ['latin'], variable: '--font-dm-mono', display: 'swap', weight: ['400','500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Anshu — Website Developer & Automation Engineer in Ankleshwar, Gujarat',
    template: '%s | Anshu — Web Developer & Automation Engineer',
  },
  description:
    'Anshu is a website developer and automation engineer in Ankleshwar, Gujarat, building fast SEO-friendly websites and Google Sheets / Apps Script automation for businesses in Bharuch and across Gujarat.',
  keywords: [
    'website developer Ankleshwar',
    'web developer Ankleshwar',
    'website developer Bharuch',
    'automation engineer Ankleshwar',
    'automation engineer Gujarat',
    'web developer Gujarat',
    'website designer Bharuch',
    'Google Apps Script developer',
    'Google Sheets automation',
    'business automation Gujarat',
    'freelance web developer India',
    'Next.js developer India',
    'SEO website Ankleshwar',
    'Anshu',
  ],
  authors: [{ name: 'Anshu' }],
  creator: 'Anshu',
  publisher: 'Anshu',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Anshu — Web Developer & Automation Engineer',
    title: 'Anshu — Website Developer & Automation Engineer in Ankleshwar, Gujarat',
    description:
      'Fast, SEO-friendly websites and Google Sheets automation for businesses in Ankleshwar, Bharuch and across Gujarat.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anshu — Website Developer & Automation Engineer',
    description:
      'Fast, SEO-friendly websites and business automation for clients in Ankleshwar, Bharuch and across Gujarat.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    'geo.region': 'IN-GJ',
    'geo.placename': 'Ankleshwar, Gujarat',
    'geo.position': '21.6266;73.0017',
    ICBM: '21.6266, 73.0017',
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
