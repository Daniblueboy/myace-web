import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from '@/components/query-provider';
import { PublicChrome } from '@/components/layout/PublicChrome';
import { NavigationProgress } from '@/components/layout/NavigationProgress';
import { InitialPreloader } from '@/components/layout/InitialPreloader';

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

// viewportFit: 'cover' lets the mobile hero and bottom tab bar extend under
// the notch/home-indicator safe areas instead of leaving a hard cut there —
// needed for the full-screen "app" hero and fixed bottom nav.
export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: '#000000',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/aceroyal-symbol-colour.png`,
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
        {/* InitialPreloader is a client component, so its own `priority` prop
            on next/image can't inject a preload hint into the server-rendered
            <head> early enough to avoid a flash of no logo — this does, from
            the very first byte. Dark is the default theme, so it's the
            higher-priority fetch; light-mode visitors still get theirs early
            via the second, non-blocking preload. */}
        <link rel="preload" as="image" href="/images/aceroyal-symbol-white.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/aceroyal-symbol-colour.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
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
