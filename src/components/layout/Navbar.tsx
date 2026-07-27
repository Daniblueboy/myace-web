'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="glass-navigation sticky top-0 z-50 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/cropped-cropped-logo-jpeg.jpg" alt="AceRoyal Estates" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
          <Link href="/estates" className="text-sm font-medium hover:text-primary transition-colors">Estates</Link>
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
                        <Link href="/estates" className="text-lg font-medium">Estates</Link>
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
