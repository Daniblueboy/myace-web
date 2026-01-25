import { fetchAPI } from '@/lib/api';
import { FAQList } from '@/components/faq/FAQList';

export const dynamic = 'force-dynamic';

export default async function FAQPage() {
  const faqs = await fetchAPI('/faqs').catch(() => []);

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">Answers to common questions about buying property with us.</p>
      </div>

      <FAQList faqs={faqs} />
    </div>
  );
}
