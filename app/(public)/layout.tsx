import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import { Toaster } from 'react-hot-toast';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: '#161614', color: '#f0ede6', border: '1px solid rgba(240,237,230,0.08)' },
        }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat phone="919664738054" />
    </>
  );
}
