import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookInspectionForm from './BookInspectionForm';

export const metadata: Metadata = {
  title: 'Book an Inspection',
  description: 'Schedule a site visit with the Aceroyal Estates team and we will confirm your preferred time.',
  alternates: { canonical: '/book-inspection' },
  openGraph: {
    title: 'Book an Inspection | Aceroyal Estates',
    description: 'Schedule a site visit with the Aceroyal Estates team and we will confirm your preferred time.',
    url: '/book-inspection',
  },
  twitter: {
    title: 'Book an Inspection | Aceroyal Estates',
    description: 'Schedule a site visit with the Aceroyal Estates team and we will confirm your preferred time.',
  },
};

export default function BookInspectionPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Loading...</div>}>
      <BookInspectionForm />
    </Suspense>
  );
}
