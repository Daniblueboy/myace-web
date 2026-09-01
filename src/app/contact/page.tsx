import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from './ContactForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Aceroyal Estates — send an enquiry, ask a question or find our office locations.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Loading contact form...</div>}>
      <ContactForm />
    </Suspense>
  );
}
