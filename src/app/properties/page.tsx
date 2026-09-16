import type { Metadata } from 'next';
import { Suspense } from 'react';
import PropertiesClient from './PropertiesClient';

const TITLE = 'Properties | Aceroyal Estates';
const DESCRIPTION = 'Browse available land and apartment listings from Aceroyal Estates across Lagos, Abuja, Oyo, Enugu and Edo.';

export const metadata: Metadata = {
  title: 'Properties',
  description: DESCRIPTION,
  alternates: { canonical: '/properties' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/properties' },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="container py-12">Loading properties...</div>}>
      <PropertiesClient />
    </Suspense>
  );
}
