import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from '@/components/query-provider';
import { PublicChrome } from '@/components/layout/PublicChrome';
import { NavigationProgress } from '@/components/layout/NavigationProgress';
import { InitialPreloader } from '@/components/layout/InitialPreloader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AceRoyal Estates',
  description: 'Premium Real Estate Solutions in Nigeria',
  icons: {
    icon: '/icon.jpg',
    apple: '/icon.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <InitialPreloader />
            <Suspense fallback={null}>
              <NavigationProgress />
            </Suspense>
            <PublicChrome>{children}</PublicChrome>
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
