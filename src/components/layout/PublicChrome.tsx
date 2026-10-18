'use client';

import { ViewTransition } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { ChatFab } from '@/components/layout/ChatFab';
import { ScrollManager } from '@/components/layout/ScrollManager';
import { AmbientBackdrop } from '@/components/layout/AmbientBackdrop';
import { ImageFadeIn } from '@/components/motion/ImageFadeIn';

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
      <AmbientBackdrop />
      <ScrollManager />
      <ImageFadeIn />
      <Navbar />
      <main id="main-content" className="grow">
        {/* Keyed by path so each navigation is an exit/enter pair: the page
            crossfades (.page-fade in globals.css) while the nav, bottom bar
            and chat button outside this boundary stay put. */}
        <ViewTransition key={pathname} enter="page-fade" exit="page-fade" default="none">
          <div>{children}</div>
        </ViewTransition>
      </main>

      <ChatFab />
      <MobileBottomNav />
      <Footer />
    </div>
  );
}
