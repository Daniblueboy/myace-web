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
  // Favicon/apple-icon and the Open Graph/Twitter share image are generated
  // by src/app/icon.tsx, apple-icon.tsx, opengraph-image.tsx and
  // twitter-image.tsx (Next.js file conventions) — no need to declare them
  // here, and doing so would override those generated images.
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
        {/* InitialPreloader shows the real logo once it loads, with an "AR"
            monogram as a placeholder until then. It's a client component, so
            its own `priority` prop on next/image can't inject a preload hint
            into the server-rendered <head> early enough to avoid a visible
            flash of the monogram — this does, from the very first byte. */}
        <link rel="preload" as="image" href="/images/cropped-cropped-logo-jpeg.jpg" fetchPriority="high" />
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
