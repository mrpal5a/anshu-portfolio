/**
 * Centralised business/site facts + JSON-LD builders for SEO.
 * Update the values here whenever contact details or service areas change.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://anshu-builds.vercel.app';

export const BUSINESS = {
  name: 'Anshu — Web Developer & Automation Engineer',
  shortName: 'Anshu',
  email: 'anshupal320@gmail.com',
  phone: '+91-9664738054',
  linkedin: 'https://linkedin.com/in/anshu--pal',
  whatsapp: 'https://wa.me/919664738054',
  city: 'Ankleshwar',
  region: 'Gujarat',
  postalCode: '393001',
  country: 'IN',
  // Ankleshwar, Gujarat
  geo: { lat: 21.6266, lng: 73.0017 },
  description:
    'Professional website development and Google Sheets / Apps Script automation for businesses in Ankleshwar, Bharuch and across Gujarat. Fast, SEO-optimized websites and time-saving automation systems.',
};

export const SERVICE_AREAS = [
  'Ankleshwar',
  'Bharuch',
  'Surat',
  'Vadodara',
  'Gujarat',
  'India',
];

const knowsAbout = [
  'Web Development',
  'Website Design',
  'Google Apps Script',
  'Google Sheets Automation',
  'Business Process Automation',
  'Next.js',
  'React',
  'SEO',
  'Inventory Management Systems',
];

const services = [
  {
    name: 'Professional Website Development',
    description:
      'Fast, mobile-first, SEO-optimized websites built with modern frameworks and deployed live.',
  },
  {
    name: 'Google Sheets & Apps Script Automation',
    description:
      'Custom spreadsheet automation: scheduled email reports, auto-calculations, dashboards and triggers.',
  },
  {
    name: 'Inventory & Stock Management Systems',
    description:
      'Digital inventory registers with expiry tracking, status indicators and automated email alerts.',
  },
];

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/opengraph-image`,
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    priceRange: '₹₹',
    description: BUSINESS.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'Place', name })),
    knowsAbout,
    sameAs: [BUSINESS.linkedin],
    founder: { '@id': `${SITE_URL}/#anshu` },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
          areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'Place', name })),
        },
      })),
    },
  };
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#anshu`,
    name: 'Anshu',
    jobTitle: 'Web Developer & Automation Engineer',
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    worksFor: { '@id': `${SITE_URL}/#business` },
    knowsAbout,
    sameAs: [BUSINESS.linkedin],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS.name,
    description: BUSINESS.description,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE_URL}/#business` },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
