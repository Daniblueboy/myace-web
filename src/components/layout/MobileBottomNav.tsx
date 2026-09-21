'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Home, Building2, Search, MessageCircle, Menu as MenuIcon, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { isActivePath } from '@/components/layout/nav-utils';
import { WHATSAPP_NUMBER, ENQUIRY_OPTIONS, estateLabelFromPath } from '@/components/layout/whatsapp-enquiry';
import {
  NAV_LINKS_BEFORE_ESTATES,
  NAV_LINKS_AFTER_ESTATES,
  NAV_LINKS_TAIL,
  RESOURCES_LINKS,
} from '@/components/layout/nav-links';

// Shared layoutId: only one of these ever renders at a time (whichever tab
// is currently active/open), so Framer Motion sees it "move" between tabs
// on every switch and animates the FLIP with a spring — the liquid bubble
// sliding/settling feel, matching WhatsApp's tab bar.
const TAB_BUBBLE_LAYOUT_ID = 'bottom-tab-bubble';

function TabBubble() {
  return (
    <motion.span
      layoutId={TAB_BUBBLE_LAYOUT_ID}
      className="absolute inset-x-1.5 inset-y-1 rounded-2xl bg-primary/15"
      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
    />
  );
}

function TabButton({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className="relative flex flex-1 flex-col items-center justify-center py-1.5"
    >
      {active && <TabBubble />}
      <motion.span
        whileTap={{ scale: 0.82 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
        className={`relative z-10 flex flex-col items-center gap-1 text-[11px] font-medium ${
          active ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 2} />
        {label}
      </motion.span>
    </Link>
  );
}

// The mobile "app" chrome: a fixed bottom tab bar (Home / Estates / Search /
// Chat / Menu) that replaces the old top-right hamburger on small screens.
// "Menu" opens the same drawer the hamburger used to — same links, same
// theme toggle — just triggered from the bottom bar instead. Desktop is
// untouched; this whole component renders nothing at md and up.
export function MobileBottomNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const estateLabel = estateLabelFromPath(pathname);
  const context = estateLabel ? ` regarding ${estateLabel}` : '';

  return (
    <nav
      className="premium-navigation backdrop-blur-xl backdrop-saturate-150 fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t lg:hidden"
      style={{ height: 'var(--bottom-nav-h)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Primary"
    >
      <TabButton href="/" label="Home" icon={Home} active={isActivePath(pathname, '/')} />
      <TabButton href="/estates" label="Estates" icon={Building2} active={isActivePath(pathname, '/estates')} />
      <TabButton href="/properties" label="Search" icon={Search} active={isActivePath(pathname, '/properties')} />

      <DropdownMenu open={chatOpen} onOpenChange={setChatOpen}>
        <DropdownMenuTrigger asChild>
          <button type="button" className="relative flex flex-1 flex-col items-center justify-center py-1.5">
            {chatOpen && <TabBubble />}
            <motion.span
              whileTap={{ scale: 0.82 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className={`relative z-10 flex flex-col items-center gap-1 text-[11px] font-medium ${
                chatOpen ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <MessageCircle className="h-5 w-5" strokeWidth={chatOpen ? 2.25 : 2} />
              Chat
            </motion.span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="top" sideOffset={12} className="glass-panel backdrop-blur-xl backdrop-saturate-150">
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

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger asChild>
          <button type="button" className="relative flex flex-1 flex-col items-center justify-center py-1.5">
            {menuOpen && <TabBubble />}
            <motion.span
              whileTap={{ scale: 0.82 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className={`relative z-10 flex flex-col items-center gap-1 text-[11px] font-medium ${
                menuOpen ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <MenuIcon className="h-5 w-5" strokeWidth={menuOpen ? 2.25 : 2} />
              Menu
            </motion.span>
          </button>
        </SheetTrigger>
        <SheetContent className="glass-panel backdrop-blur-xl backdrop-saturate-150 px-6" side="right">
          <div className="flex items-center justify-between mt-8">
            <SheetTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Menu
            </SheetTitle>
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
            {[...NAV_LINKS_BEFORE_ESTATES, { href: '/estates', label: 'Estates' }, ...NAV_LINKS_AFTER_ESTATES].map(
              (link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`text-lg font-medium ${active ? 'text-primary' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                );
              }
            )}

            <div className="pt-1 border-t dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-4 mb-3">
                Resources
              </p>
              <div className="flex flex-col gap-4 pl-2">
                {RESOURCES_LINKS.map((link) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={`text-base font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </div>

            {NAV_LINKS_TAIL.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`text-lg font-medium border-t dark:border-slate-800 pt-4 ${active ? 'text-primary' : ''}`}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              );
            })}

            {/* Login commented out per Daniel's request — customer portal
                link not ready to be surfaced yet. Re-enable by uncommenting
                and re-adding CUSTOMER_PORTAL_URL to the import above. */}
            {/* <SheetClose asChild>
              <Button variant="outline" className="w-full mt-2" asChild>
                <a href={CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                  Login
                </a>
              </Button>
            </SheetClose> */}
            <SheetClose asChild>
              <Button className="w-full" asChild>
                <Link href="/book-inspection">Book Inspection</Link>
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
