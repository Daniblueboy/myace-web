import type { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import { FAQList } from '@/components/faq/FAQList';

export const dynamic = 'force-dynamic';

const TITLE = 'Frequently Asked Questions | Aceroyal Estates';
const DESCRIPTION = 'Answers to common questions about buying property, payment plans and inspections with Aceroyal Estates.';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: DESCRIPTION,
  alternates: { canonical: '/faq' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/faq' },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default async function FAQPage() {
  const faqs = await fetchAPI('/faqs').catch(() => []);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      {faqs.length > 0 && (
        <script
          id="faq-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">Answers to common questions about buying property with us.</p>
      </div>

      <FAQList faqs={faqs} />
    </div>
  );
}
