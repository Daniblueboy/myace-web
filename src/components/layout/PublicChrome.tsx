'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { ChatFab } from '@/components/layout/ChatFab';
import { ScrollManager } from '@/components/layout/ScrollManager';

export function PublicChrome({ children }: { children: React.ReactNode }) {
  return (
    // Bottom tab bar is fixed on mobile, so the page needs matching bottom
    // padding here (after the Footer, not just after <main>) or the fixed
    // bar would sit on top of the Footer's own bottom edge.
    <div className="flex flex-col min-h-screen pb-[var(--bottom-nav-h)] lg:pb-0">
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-white"
      >
        Skip to main content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main-content" className="grow">{children}</main>

      <ChatFab />
      <MobileBottomNav />
      <Footer />
    </div>
  );
}
