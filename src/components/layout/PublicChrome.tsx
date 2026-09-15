'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { WHATSAPP_NUMBER, ENQUIRY_OPTIONS, estateLabelFromPath } from '@/components/layout/whatsapp-enquiry';

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const estateLabel = estateLabelFromPath(pathname);
  const context = estateLabel ? ` regarding ${estateLabel}` : '';

  return (
    // Bottom tab bar is fixed on mobile, so the page needs matching bottom
    // padding here (after the Footer, not just after <main>) or the fixed
    // bar would sit on top of the Footer's own bottom edge.
    <div className="flex flex-col min-h-screen pb-[var(--bottom-nav-h)] lg:pb-0">
      <Navbar />
      <main className="grow">{children}</main>

      {/* Desktop-only floating WhatsApp button — mobile reaches the same
          enquiry options via the bottom nav's "Chat" tab instead. */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 lg:flex"
            aria-label="Chat with us on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
            Chat with us
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="glass-panel backdrop-blur-xl backdrop-saturate-150">
          {ENQUIRY_OPTIONS.map((option) => (
            <DropdownMenuItem key={option.label} asChild className="gap-2 cursor-pointer">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(option.message(context))}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <option.icon className="h-4 w-4" /> {option.label}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <MobileBottomNav />
      <Footer />
    </div>
  );
}
