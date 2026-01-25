'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building,
  PenTool,
  LogOut,
  Menu,
  HelpCircle,
  MapPin,
  FileText,
  Shield,
  Users,
  Megaphone,
  Layers,
  Inbox,
  Sun,
  Moon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { fetchAPI } from '@/lib/api';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AdminModalProvider } from '@/components/admin/AdminModalProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const authNoticeShown = useRef(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Estates', href: '/admin/estates', icon: Building },
    { name: 'Offerings', href: '/admin/properties', icon: Building },
    { name: 'Blog Posts', href: '/admin/blog', icon: PenTool },
    { name: 'Promotions', href: '/admin/promos', icon: Megaphone },
    { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Offices', href: '/admin/offices', icon: MapPin },
    { name: 'Resources', href: '/admin/resources', icon: FileText },
    { name: 'Compliance', href: '/admin/compliance', icon: Shield },
    { name: 'Partners', href: '/admin/partners', icon: Users },
    { name: 'Team', href: '/admin/team', icon: Users },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Users },
    { name: 'Content Blocks', href: '/admin/content-blocks', icon: Layers },
    { name: 'Leads', href: '/admin/leads', icon: Inbox },
    { name: 'Newsletter', href: '/admin/newsletter', icon: Inbox },
  ];

  useEffect(() => {
    if (pathname === '/admin/login') return;
    let active = true;
    const token = localStorage.getItem('token');

    const handleUnauthorized = () => {
      if (!authNoticeShown.current) {
        setAuthModalOpen(true);
        authNoticeShown.current = true;
      }
      setAuthChecked(false);
      const timer = setTimeout(() => {
        router.replace('/admin/login');
      }, 1500);
      return () => clearTimeout(timer);
    };

    if (!token) {
      return handleUnauthorized();
    }

    const savedTheme = localStorage.getItem('adminTheme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    fetchAPI('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        if (!active) return;
        setAuthChecked(true);
      })
      .catch(() => {
        if (!active) return;
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        handleUnauthorized();
      });

    return () => {
      active = false;
    };
  }, [pathname, router, setTheme]);

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Dialog open={authModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unauthorized access</DialogTitle>
              <DialogDescription>Please sign in to continue.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setAuthModalOpen(false);
                  router.replace('/admin/login');
                }}
              >
                Go to Login
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <AdminModalProvider>
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-wider">ACEROYAL<span className="text-primary text-xs ml-1">ADMIN</span></h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
           <Button
             variant="ghost"
             className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10 gap-3"
             onClick={() => {
               fetchAPI('/auth/logout', {
                 method: 'POST',
                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
               }).catch(() => undefined);
               localStorage.removeItem('token');
               localStorage.removeItem('refresh_token');
               router.push('/admin/login');
             }}
           >
             <LogOut className="w-5 h-5" />
             Logout
           </Button>
        </div>
      </aside>

      {/* Mobile Sidebar & Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b h-16 flex items-center justify-between px-6 sticky top-0 z-30">
           <div className="md:hidden">
             <Sheet open={open} onOpenChange={setOpen}>
               <SheetTrigger asChild>
                 <Button variant="ghost" size="icon"><Menu className="w-6 h-6"/></Button>
               </SheetTrigger>
               <SheetContent side="left" className="bg-slate-900 text-white border-slate-800 p-0">
                  <div className="p-6">
                    <h1 className="text-xl font-bold tracking-wider">ACEROYAL</h1>
                  </div>
                  <nav className="flex-1 px-4 space-y-2 mt-6">
                    {navigation.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          pathname === item.href 
                            ? 'bg-primary text-white' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
               </SheetContent>
             </Sheet>
           </div>
           <div className="flex items-center gap-4 ml-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const nextTheme = theme === 'dark' ? 'light' : 'dark';
                  setTheme(nextTheme);
                  localStorage.setItem('adminTheme', nextTheme);
                  fetchAPI('/auth/theme', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ themePreference: nextTheme }),
                  }).catch(() => undefined);
                }}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <span className="text-sm text-slate-500 hidden sm:block">Admin</span>
              <div className="w-8 h-8 rounded-full bg-slate-200" />
           </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    </AdminModalProvider>
  );
}
