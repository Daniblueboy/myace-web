'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Moon, Sun, ChevronDown, ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { fallbackEstates } from '@/lib/fallback-data';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { isActivePath } from '@/components/layout/nav-utils';
import { NAV_LINKS_BEFORE_ESTATES, NAV_LINKS_AFTER_ESTATES, RESOURCES_LINKS, NAV_LINKS_TAIL } from '@/components/layout/nav-links';

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`relative text-sm font-medium transition-colors py-1 ${active ? 'text-primary' : 'hover:text-primary'}`}
    >
      {label}
      <span
        className={`absolute -bottom-[1px] left-0 h-[2px] w-full origin-left rounded-full bg-primary transition-transform duration-200 ease-out ${
          active ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </Link>
  );
}

function EstatesMegaMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sold-out estates shouldn't take one of the 8 preview slots ahead of
  // estates you can still actually buy into, and the newest/featured
  // estates (e.g. Villa Nova) shouldn't get buried behind older ones just
  // because of insertion order in fallback-data.ts — filter, then sort
  // featured-first and newest-first, before slicing to 8.
  const estates = fallbackEstates
    .filter((estate) => estate.status !== 'SOLD_OUT')
    .sort((a, b) => {
      if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 8);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`relative flex items-center gap-1 text-sm font-medium transition-colors py-1 ${
          active ? 'text-primary' : 'hover:text-primary'
        }`}
      >
        Estates
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        <span
          className={`absolute -bottom-[1px] left-0 h-[2px] w-full origin-left rounded-full bg-primary transition-transform duration-200 ease-out ${
            active ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 mt-3 w-[36rem] -translate-x-1/2 origin-top transition-all duration-200 ease-out ${
          open ? 'pointer-events-auto translate-y-0 opacity-100 scale-100' : 'pointer-events-none -translate-y-1 opacity-0 scale-95'
        }`}
      >
        <div className="glass-panel backdrop-blur-xl backdrop-saturate-150 rounded-2xl border text-popover-foreground shadow-xl p-4">
          <div className="grid grid-cols-2 gap-2">
            {estates.map((estate) => (
                  <Link
                    key={estate.id}
                    href={`/estates/${estate.slug}`}
                    className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {estate.coverImage && (
                        <img
                          src={estate.coverImage}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{estate.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {[estate.city, estate.state].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </Link>
                ))}
          </div>
          <Link
            href="/estates"
            className="mt-3 flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            View all estates
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResourcesMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`relative flex items-center gap-1 text-sm font-medium transition-colors py-1 ${
          active ? 'text-primary' : 'hover:text-primary'
        }`}
      >
        Resources
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        <span
          className={`absolute -bottom-[1px] left-0 h-[2px] w-full origin-left rounded-full bg-primary transition-transform duration-200 ease-out ${
            active ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 origin-top transition-all duration-200 ease-out ${
          open ? 'pointer-events-auto translate-y-0 opacity-100 scale-100' : 'pointer-events-none -translate-y-1 opacity-0 scale-95'
        }`}
      >
        <div className="glass-panel backdrop-blur-xl backdrop-saturate-150 rounded-2xl border text-popover-foreground shadow-xl p-2">
          {RESOURCES_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <nav className="premium-navigation backdrop-blur-xl backdrop-saturate-150 sticky top-0 z-50 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo size="sm" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 items-center">
          {NAV_LINKS_BEFORE_ESTATES.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} active={isActivePath(pathname, link.href)} />
          ))}

          <EstatesMegaMenu active={isActivePath(pathname, '/estates')} />

          {NAV_LINKS_AFTER_ESTATES.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} active={isActivePath(pathname, link.href)} />
          ))}

          <ResourcesMenu active={RESOURCES_LINKS.some((link) => isActivePath(pathname, link.href))} />

          {NAV_LINKS_TAIL.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} active={isActivePath(pathname, link.href)} />
          ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          {/* Login commented out per Daniel's request — customer portal
              link not ready to be surfaced yet. Re-enable by uncommenting
              and re-adding CUSTOMER_PORTAL_URL to the import above. */}
          {/* <Button variant="ghost" asChild>
            <a href={CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">
              Login
            </a>
          </Button> */}
          <Button asChild><Link href="/book-inspection">Book Inspection</Link></Button>
        </div>
      </div>
    </nav>
  );
}
