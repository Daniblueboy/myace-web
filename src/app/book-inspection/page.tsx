import type { Metadata } from 'next';
import BookInspectionForm from './BookInspectionForm';

export const metadata: Metadata = {
  title: 'Book an Inspection',
  description: 'Schedule a site visit with the Aceroyal Estates team and we will confirm your preferred time.',
  alternates: { canonical: '/book-inspection' },
};

export default function BookInspectionPage() {
  return <BookInspectionForm />;
}
