'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [estates, setEstates] = useState<any[]>([]);

  useEffect(() => {
    fetchAPI('/estates?take=50')
      .then((data) => setEstates(data?.items || data || []))
      .catch(() => setEstates([]));
  }, []);

  const groupedEstates = useMemo(() => {
    return estates.reduce((acc: Record<string, any[]>, estate) => {
      const key = estate.state || 'Other';
      acc[key] = acc[key] || [];
      acc[key].push(estate);
      return acc;
    }, {});
  }, [estates]);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/cropped-cropped-logo-jpeg.jpg" alt="AceRoyal Estates" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium hover:text-primary transition-colors">
              Estates
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 max-h-80 overflow-y-auto">
              {Object.keys(groupedEstates).length === 0 ? (
                <DropdownMenuItem>
                  <Link href="/estates" className="w-full">View Estates</Link>
                </DropdownMenuItem>
              ) : (
                Object.entries(groupedEstates).map(([state, items], index) => (
                  <div key={state}>
                    <DropdownMenuLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {state}
                    </DropdownMenuLabel>
                    {items.map((estate) => (
                      <DropdownMenuItem key={estate.id}>
                        <Link href={`/estates/${estate.slug}`} className="w-full">
                          {estate.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    {index < Object.keys(groupedEstates).length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/estates" className="w-full font-bold text-primary">View All Estates</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</Link>
          <Link href="/careers" className="text-sm font-medium hover:text-primary transition-colors">Careers</Link>
          <Link href="/faq" className="text-sm font-medium hover:text-primary transition-colors">FAQs</Link>
          <Link href="/resources" className="text-sm font-medium hover:text-primary transition-colors">Resources</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button asChild><Link href="/book-inspection">Book Inspection</Link></Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon"><Menu className="h-5 w-5"/></Button>
                </SheetTrigger>
                <SheetContent>
                    <div className="flex flex-col gap-4 mt-8">
                        <Link href="/" className="text-lg font-medium">Home</Link>
                        <Link href="/about" className="text-lg font-medium">About</Link>
                        <Link href="/services" className="text-lg font-medium">Services</Link>
                        <div className="space-y-2">
                          <Link href="/estates" className="text-lg font-medium">Estates</Link>
                          {Object.entries(groupedEstates).map(([state, items]) => (
                            <div key={state} className="pl-3">
                              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{state}</p>
                              <div className="mt-2 space-y-1">
                                {items.map((estate) => (
                                  <Link key={estate.id} href={`/estates/${estate.slug}`} className="block text-sm">
                                    {estate.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <Link href="/blog" className="text-lg font-medium">Blog</Link>
                        <Link href="/careers" className="text-lg font-medium">Careers</Link>
                        <Link href="/faq" className="text-lg font-medium">FAQs</Link>
                        <Link href="/resources" className="text-lg font-medium">Resources</Link>
                        <Link href="/contact" className="text-lg font-medium">Contact</Link>
                        <Button className="w-full" asChild><Link href="/book-inspection">Book Inspection</Link></Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </nav>
  );
}
