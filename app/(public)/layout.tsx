import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import JsonLd from '@/components/seo/JsonLd';
import { businessJsonLd, personJsonLd, websiteJsonLd } from '@/lib/structured-data';
import { Toaster } from 'react-hot-toast';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[businessJsonLd(), personJsonLd(), websiteJsonLd()]} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: '#16140f', color: '#f4f1ea', border: '1px solid rgba(244,241,234,0.1)' },
        }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat phone="919664738054" />
    </>
  );
}
