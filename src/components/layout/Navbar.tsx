'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Moon, Sun, ChevronDown, ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { fetchAPI } from '@/lib/api';
import { BrandLogo } from '@/components/layout/BrandLogo';

const NAV_LINKS_BEFORE_ESTATES = [{ href: '/', label: 'Home' }];

const NAV_LINKS_AFTER_ESTATES = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
];

const RESOURCES_LINKS = [
  { href: '/blog', label: 'Insights / Blog' },
  { href: '/faq', label: 'FAQs' },
  { href: '/careers', label: 'Careers' },
  { href: '/resources', label: 'Downloads' },
];

const NAV_LINKS_TAIL = [{ href: '/contact', label: 'Contact' }];

const ALL_NAV_LINKS = [
  ...NAV_LINKS_BEFORE_ESTATES,
  { href: '/estates', label: 'Estates' },
  ...NAV_LINKS_AFTER_ESTATES,
  ...RESOURCES_LINKS,
  ...NAV_LINKS_TAIL,
];

const CUSTOMER_PORTAL_URL = 'https://app.myaceroyal.com';

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

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

  const { data } = useQuery({
    queryKey: ['nav-estates'],
    queryFn: () => fetchAPI('/estates?take=8').then((res) => res.items || res || []),
    staleTime: 5 * 60 * 1000,
  });
  const estates = Array.isArray(data) ? data : [];

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
        <div className="rounded-2xl border bg-popover text-popover-foreground shadow-xl p-4">
          <div className="grid grid-cols-2 gap-2">
            {estates.length === 0
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
                ))
              : estates.slice(0, 6).map((estate: any) => (
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
        <div className="rounded-2xl border bg-popover text-popover-foreground shadow-xl p-2">
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
    <nav className="premium-navigation sticky top-0 z-50 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo className="h-10" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
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
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button variant="ghost" asChild>
            <a href={CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">
              Customer Login
            </a>
          </Button>
          <Button asChild><Link href="/book-inspection">Book Inspection</Link></Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon"><Menu className="h-5 w-5"/></Button>
                </SheetTrigger>
                <SheetContent className="px-6">
                    <div className="flex items-center justify-between mt-8">
                      <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Menu</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label="Toggle theme"
                      >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-5 mt-4">
                        {ALL_NAV_LINKS.map((link) => {
                          const active = isActivePath(pathname, link.href);
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              aria-current={active ? 'page' : undefined}
                              className={`text-lg font-medium ${active ? 'text-primary' : ''}`}
                            >
                              {link.label}
                            </Link>
                          );
                        })}
                        <Button variant="outline" className="w-full mt-2" asChild>
                          <a href={CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                            Customer Login
                          </a>
                        </Button>
                        <Button className="w-full" asChild><Link href="/book-inspection">Book Inspection</Link></Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </nav>
  );
}
