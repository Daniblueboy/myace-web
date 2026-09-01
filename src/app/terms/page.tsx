import type { Metadata } from 'next';

const TITLE = 'Terms & Conditions | Aceroyal Estates';
const DESCRIPTION = 'Terms and conditions for using the Aceroyal Estates website and services.';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: DESCRIPTION,
  alternates: { canonical: '/terms' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/terms' },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Aceroyal Estates' services, you agree to be bound by these Terms and Conditions.
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Property Listings</h2>
              <p className="mb-4">
                All property information is provided in good faith and is believed to be accurate. However, Aceroyal Estates
                makes no warranties regarding the accuracy or completeness of property information.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All property prices are subject to change without prior notice</li>
                <li>Property availability is not guaranteed until payment is confirmed</li>
                <li>Property inspections are recommended before purchase</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Payment Terms</h2>
              <p>
                Payment plans and terms vary by property. All payments must be made according to the agreed schedule.
                Late payments may incur additional charges as specified in individual agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Documentation</h2>
              <p>
                Buyers are responsible for verifying all property documentation. Aceroyal Estates assists with documentation
                but is not liable for delays in government processes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Refund Policy</h2>
              <p>
                Refunds are subject to the specific terms outlined in individual purchase agreements. Processing fees may apply.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
              <p>
                Aceroyal Estates shall not be liable for any indirect, incidental, or consequential damages arising from
                the use of our services or property transactions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
              <p>
                These terms are governed by the laws of the Federal Republic of Nigeria.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
              <p>
                For questions about these Terms & Conditions, please contact us at{' '}
                <a href="mailto:legal@aceroyalestates.com" className="text-blue-600 hover:underline">
                  legal@aceroyalestates.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
