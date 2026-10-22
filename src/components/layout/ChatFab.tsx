'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight, MessageCircle, Phone } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { WHATSAPP_NUMBER, ENQUIRY_OPTIONS, estateLabelFromPath } from '@/components/layout/whatsapp-enquiry';

const PHONE_DISPLAY = '+234 915 654 9709';
const PHONE_HREF = 'tel:+2349156549709';

const rowClass =
  'flex min-h-14 items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none';
const iconWrapClass = 'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary';

/**
 * Floating chat button on every screen size. Opens a bottom sheet with the
 * WhatsApp enquiry options (pre-filled with the current estate when on an
 * estate page) and a call option. On mobile it floats just above the
 * bottom tab bar; on desktop the sheet docks to the bottom-right corner
 * instead of spanning the full width.
 */
export function ChatFab() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const estateLabel = estateLabelFromPath(pathname);
  const context = estateLabel ? ` regarding ${estateLabel}` : '';

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Chat with us"
          className="animate-fab-enter fixed right-4 bottom-[calc(var(--bottom-nav-h)+1rem)] z-40 flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-primary text-white shadow-lg shadow-black/30 transition hover:brightness-110 active:scale-95 lg:right-6 lg:bottom-6 lg:h-auto lg:w-auto lg:px-5 lg:py-3"
        >
          <MessageCircle className="h-6 w-6 lg:h-5 lg:w-5" />
          <span className="hidden text-sm font-semibold lg:inline">Chat with us</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[85dvh] gap-0 overflow-y-auto rounded-t-3xl px-4 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] lg:inset-x-auto lg:right-6 lg:bottom-6 lg:w-[400px] lg:rounded-3xl lg:border lg:pb-5"
      >
        {/* Drag-handle affordance, matching native bottom sheets. */}
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-muted-foreground/30 lg:hidden" aria-hidden="true" />
        <div className="px-3 pb-3">
          <SheetTitle className="text-lg">Chat with us</SheetTitle>
          <SheetDescription>
            {estateLabel
              ? `Message our team on WhatsApp about ${estateLabel}.`
              : 'Message our team on WhatsApp. Pick what you need help with.'}
          </SheetDescription>
        </div>

        <ul className="flex flex-col">
          {ENQUIRY_OPTIONS.map((option) => (
            <li key={option.label}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(option.message(context))}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={rowClass}
              >
                <span className={iconWrapClass}>
                  <option.icon className="h-5 w-5" />
                </span>
                <span className="flex-1 font-medium">{option.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-2 border-t pt-2">
          <a href={PHONE_HREF} onClick={() => setOpen(false)} className={rowClass}>
            <span className={iconWrapClass}>
              <Phone className="h-5 w-5" />
            </span>
            <span className="flex-1">
              <span className="block font-medium">Prefer to call?</span>
              <span className="block text-sm text-muted-foreground">{PHONE_DISPLAY}</span>
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
