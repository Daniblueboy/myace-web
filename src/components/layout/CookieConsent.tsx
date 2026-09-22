'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'aceroyal-cookie-consent';

// The Privacy Policy's cookie section promises "an appropriate choice"
// before using non-essential cookies/tracking — this is that choice. No
// non-essential cookies are actually set anywhere in the app yet (nothing
// analytics/marketing-related), so this doesn't gate anything today; it
// exists so the promise is kept the moment it does, and the choice is
// remembered per-browser via localStorage rather than shown on every visit.
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable (private browsing, blocked storage) — skip
      // the banner rather than show it on every load with no way to persist
      // the choice.
    }
  }, []);

  const respond = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Nothing to persist to — the banner just won't be dismissable
      // permanently in this browser, which is fine.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      // bottom-[var(--bottom-nav-h)] keeps this above the fixed mobile tab
      // bar instead of overlapping it; lg:bottom-4 overrides it on desktop,
      // where MobileBottomNav doesn't render.
      className="fixed inset-x-0 bottom-[var(--bottom-nav-h)] z-[70] border-t bg-white/95 p-4 shadow-lg backdrop-blur-lg dark:border-slate-800 dark:bg-black/95 lg:bottom-4 lg:left-4 lg:right-auto lg:max-w-md lg:rounded-xl lg:border"
    >
      <p className="text-sm text-slate-700 dark:text-slate-300">
        We use cookies to keep this site working properly and to understand how it&apos;s used. See our{' '}
        <Link href="/privacy#cookies" className="text-primary hover:underline">
          Cookie Policy
        </Link>{' '}
        for details.
      </p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={() => respond('accepted')}>
          Accept
        </Button>
        <Button size="sm" variant="outline" onClick={() => respond('declined')}>
          Decline
        </Button>
      </div>
    </div>
  );
}
