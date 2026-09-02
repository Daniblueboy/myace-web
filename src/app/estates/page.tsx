import type { Metadata } from 'next';
import { Suspense } from 'react';
import EstatesClient from './EstatesClient';

const TITLE = 'Our Estates | Aceroyal Estates';
const DESCRIPTION = 'Browse active Aceroyal Estates developments across Lagos, Abuja, Oyo, Enugu and Edo — land and homes with transparent pricing.';

export const metadata: Metadata = {
  title: 'Our Estates',
  description: DESCRIPTION,
  alternates: { canonical: '/estates' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/estates' },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function EstatesPage() {
  return (
    <Suspense fallback={<div className="container py-12">Loading estates...</div>}>
      <EstatesClient />
    </Suspense>
  );
}
