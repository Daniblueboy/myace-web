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

const SITE_URL = 'https://aceroyalestates.com';
const SITE_NAME = 'Aceroyal Estates';
const DEFAULT_TITLE = 'Aceroyal Estates | Land & Properties for Sale in Nigeria';
const DEFAULT_DESCRIPTION =
  'Discover land, apartments and investment properties from Aceroyal Estates across Lagos, Abuja, Oyo and other locations in Nigeria. Book an inspection today.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  // NOTE: the referenced icon was previously pointing at a file
  // (/icon.jpg) that doesn't exist in public/ — the favicon has been
  // silently 404ing. Using the real logo asset instead. A dedicated
  // square favicon (and a real Open Graph share image, distinct from
  // the logo) would be a worthwhile follow-up.
  icons: {
    icon: '/images/cropped-cropped-logo-jpeg.jpg',
    apple: '/images/cropped-cropped-logo-jpeg.jpg',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/images/cropped-cropped-logo-jpeg.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/images/cropped-cropped-logo-jpeg.jpg'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/cropped-cropped-logo-jpeg.jpg`,
  email: 'customercare@aceroyalestates.com',
  telephone: ['+234-201-330-0287', '+234-915-654-9709'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '17 Olokonla Road, Sangotedo, Lekki-Ajah Expressway',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
  sameAs: [
    'https://www.instagram.com/aceroyal_estates/',
    'https://twitter.com/AceroyalLtd',
    'https://www.youtube.com/channel/UCx09TJiqRT_eVXga9cF7Amw',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
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
