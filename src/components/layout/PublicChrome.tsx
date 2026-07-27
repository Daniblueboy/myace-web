'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MessageCircle } from 'lucide-react';

export function PublicChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">{children}</main>
        <a
          href="https://wa.me/2348012345678?text=Hello%20Aceroyal%20Estates%2C%20I%27d%20like%20to%20book%20an%20inspection."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
          Chat with us
        </a>
      <Footer />
    </div>
  );
}
