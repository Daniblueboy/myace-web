import type { Metadata } from 'next';

const TITLE = 'Terms & Conditions | Aceroyal Estates';
const DESCRIPTION = 'Terms and conditions governing your access to and use of the Aceroyal Estates website and services.';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: DESCRIPTION,
  alternates: { canonical: '/terms' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/terms' },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-black">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: September 16, 2026</p>

            <p>
              These Terms & Conditions govern your access to and use of the Aceroyal Estates website, digital
              platforms, property information, enquiry services, inspection-booking services and other services
              made available by Aceroyal Estates.
            </p>
            <p>
              By accessing or using our website or services, you acknowledge that you have read and understood
              these Terms & Conditions and agree to be bound by them.
            </p>
            <p className="mb-6">
              If you do not agree with these Terms & Conditions, please discontinue use of our website and
              services.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. About Aceroyal Estates</h2>
              <p className="mb-4">
                Aceroyal Estates provides real estate-related services, including the marketing and sale of land
                and properties, property information, property inspections, investment enquiries and related
                services.
              </p>
              <p className="mb-4">
                Information presented on this website is intended to provide general information about our
                properties, developments and services.
              </p>
              <p className="mb-4">
                Where you enter into a property transaction with Aceroyal Estates, the specific terms contained in
                your allocation documents, offer letter, purchase agreement, deed, payment plan or other
                transaction documents will also apply.
              </p>
              <p>
                Where there is any conflict between these website Terms & Conditions and a specific written
                property transaction agreement, the terms of the applicable transaction agreement shall prevail to
                the extent permitted by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Eligibility and Use of Our Services</h2>
              <p className="mb-4">
                By using our website or submitting an enquiry, you confirm that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>you have the legal capacity to enter into agreements;</li>
                <li>information you provide to us is accurate and complete to the best of your knowledge;</li>
                <li>you will not use our website or services for fraudulent, unlawful or abusive purposes; and</li>
                <li>you will not attempt to interfere with the security, functionality or availability of our website or digital systems.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Property Listings and Information</h2>
              <p className="mb-4">
                Aceroyal Estates takes reasonable steps to ensure that property information displayed on this
                website is accurate and current.
              </p>
              <p className="mb-2">However, property information may change from time to time, including:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>prices;</li>
                <li>availability;</li>
                <li>plot or unit sizes;</li>
                <li>payment plans;</li>
                <li>development specifications;</li>
                <li>promotional offers;</li>
                <li>construction or infrastructure timelines; and</li>
                <li>other property-related details.</li>
              </ul>
              <p className="mb-2">Unless expressly stated otherwise in a written agreement:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>displayed prices may change without prior notice;</li>
                <li>a property shown on the website is not guaranteed to remain available;</li>
                <li>photographs, videos, maps, renders, floor plans and illustrations may be provided for presentation purposes and may not always represent the final completed development exactly; and</li>
                <li>online information does not constitute a binding offer to sell.</li>
              </ul>
              <p>
                A property transaction becomes binding only upon completion of the applicable documentation and
                satisfaction of the payment and acceptance requirements specified by Aceroyal Estates.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Property Inspections and Due Diligence</h2>
              <p className="mb-4">
                Prospective buyers are encouraged to inspect properties and developments before completing a
                purchase where reasonably possible.
              </p>
              <p className="mb-4">
                Customers are also encouraged to review the relevant property documentation and obtain independent
                legal, financial or professional advice where appropriate.
              </p>
              <p>
                Aceroyal Estates will provide or facilitate access to relevant documentation in accordance with the
                applicable transaction and legal requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Payments</h2>
              <p className="mb-4">
                Property prices, deposits, instalment arrangements, payment deadlines and other financial terms
                vary by property and transaction.
              </p>
              <p className="mb-4">
                The applicable payment terms will be communicated through official Aceroyal Estates documentation,
                invoices, offer letters or purchase agreements.
              </p>
              <p className="mb-4">
                Customers must make payments only through officially authorised Aceroyal Estates payment channels.
              </p>
              <p className="mb-4">
                Aceroyal Estates will not be responsible for payments made to unauthorised persons, accounts or
                channels where the customer knew or reasonably ought to have known that the payment instruction was
                not authorised.
              </p>
              <p className="mb-4">
                Customers are encouraged to verify payment details through an official Aceroyal Estates
                communication channel before making payment.
              </p>
              <p>
                Where instalment plans apply, late payments may attract charges, affect promotional pricing or
                result in other consequences as specified in the applicable transaction agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Reservation and Property Availability</h2>
              <p className="mb-4">
                Submitting an enquiry, booking an inspection or expressing interest in a property does not by
                itself reserve or secure that property.
              </p>
              <p className="mb-4">
                Where a reservation arrangement is available, the applicable reservation requirements will be
                communicated to the customer.
              </p>
              <p>
                Property availability will be subject to confirmation by Aceroyal Estates and the terms applicable
                to the relevant development.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Documentation, Allocation and Government Processes</h2>
              <p className="mb-4">
                The nature and timing of documentation provided in connection with a property transaction will
                depend on the relevant property and applicable transaction terms.
              </p>
              <p className="mb-4">
                Aceroyal Estates will take reasonable steps to process documentation and other obligations within
                applicable timelines.
              </p>
              <p className="mb-4">
                Certain processes may depend on government agencies, registries, regulatory authorities,
                third-party professionals or other organisations outside Aceroyal Estates&apos; direct control.
              </p>
              <p>
                Where such third-party processes cause unavoidable delays, Aceroyal Estates will take reasonable
                steps to keep affected customers informed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Refunds and Cancellations</h2>
              <p className="mb-4">
                Refund and cancellation rights depend on the circumstances of the transaction, applicable law and
                the specific terms contained in the customer&apos;s purchase or reservation agreement.
              </p>
              <p className="mb-4">
                Any applicable administrative charges, deductions or processing timelines will be clearly
                communicated in accordance with the relevant agreement and applicable consumer protection laws.
              </p>
              <p>
                Nothing in these Terms is intended to exclude or restrict any refund, cancellation or other
                consumer right that cannot lawfully be excluded under Nigerian law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Promotions and Special Offers</h2>
              <p className="mb-2">
                From time to time, Aceroyal Estates may offer discounts, promotions, bonuses or special payment
                arrangements. Such promotions may:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>apply only to selected properties;</li>
                <li>be available for a limited period;</li>
                <li>be subject to availability;</li>
                <li>require payment within a specified timeframe; and</li>
                <li>be governed by additional terms communicated with the promotion.</li>
              </ul>
              <p>
                Aceroyal Estates may withdraw or amend a promotion where permitted by law, but any rights already
                acquired under a confirmed transaction will remain subject to the applicable agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Third-Party Services and Links</h2>
              <p className="mb-4">
                Our website may contain links to third-party websites, platforms or services. These may include
                maps, payment services, social media platforms, property-related service providers or other
                external services.
              </p>
              <p className="mb-4">
                Aceroyal Estates does not control third-party websites and is not responsible for their content,
                availability, security or privacy practices.
              </p>
              <p>Accessing third-party services is subject to the terms and policies of the applicable third party.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Intellectual Property</h2>
              <p className="mb-2">Unless otherwise stated, the content available through this website, including:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>text;</li>
                <li>photographs;</li>
                <li>videos;</li>
                <li>graphics;</li>
                <li>property renders;</li>
                <li>logos;</li>
                <li>trademarks;</li>
                <li>designs;</li>
                <li>downloadable materials; and</li>
                <li>website software and layout,</li>
              </ul>
              <p className="mb-4">
                is owned by or licensed to Aceroyal Estates and is protected by applicable intellectual property
                laws.
              </p>
              <p className="mb-4">You may view or download materials for personal and legitimate property-enquiry purposes.</p>
              <p>
                You may not reproduce, distribute, modify, commercially exploit or publicly republish our content
                without prior written permission, except where permitted by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Accuracy and Availability of the Website</h2>
              <p className="mb-4">We aim to keep our website available and operating correctly.</p>
              <p className="mb-2">
                However, we do not guarantee that the website will always be uninterrupted, error-free or
                available at all times. Access may occasionally be limited due to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>maintenance;</li>
                <li>technical failures;</li>
                <li>network outages;</li>
                <li>cybersecurity incidents;</li>
                <li>upgrades; or</li>
                <li>circumstances outside our reasonable control.</li>
              </ul>
              <p>Where practicable, we will take reasonable steps to restore affected services promptly.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Limitation of Liability</h2>
              <p className="mb-4">
                To the fullest extent permitted by applicable law, Aceroyal Estates will not be liable for
                indirect, incidental, special or consequential losses arising solely from the use or temporary
                inability to use this website.
              </p>
              <p className="mb-4">
                Nothing in these Terms excludes or limits any liability or consumer right that cannot lawfully be
                excluded or limited under Nigerian law, including liability arising from fraud, fraudulent
                misrepresentation, negligence or other matters for which liability cannot legally be excluded.
              </p>
              <p>
                Any liability relating directly to a property transaction will also be subject to the applicable
                transaction documents and relevant laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Privacy and Personal Information</h2>
              <p className="mb-4">
                When you submit an enquiry, book an inspection, subscribe for updates, create an account or
                otherwise provide personal information through our services, we may collect and process your
                personal information in accordance with our Privacy Policy and applicable Nigerian data protection
                laws.
              </p>
              <p>
                Please review our{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>{' '}
                for information about how we collect, use, store and protect personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">15. Electronic Communications</h2>
              <p className="mb-4">
                By providing your contact information and contacting us through our website or digital channels,
                you agree that Aceroyal Estates may communicate with you electronically regarding your enquiry,
                inspection, transaction or requested service.
              </p>
              <p>
                Marketing communications will be managed in accordance with applicable law and your communication
                preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">16. Prohibited Conduct</h2>
              <p className="mb-2">You must not:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>submit false or misleading information;</li>
                <li>impersonate another person;</li>
                <li>attempt unauthorised access to our systems;</li>
                <li>introduce viruses, malicious software or harmful code;</li>
                <li>scrape or systematically extract website information without permission;</li>
                <li>misuse forms, enquiry channels or communication systems;</li>
                <li>infringe Aceroyal Estates&apos; intellectual property rights; or</li>
                <li>use the website for any unlawful activity.</li>
              </ul>
              <p>
                We may restrict access to our website or services where we reasonably believe these Terms have
                been violated.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">17. Changes to These Terms</h2>
              <p className="mb-4">
                We may update these Terms & Conditions periodically to reflect changes to our services, business
                practices or legal requirements.
              </p>
              <p className="mb-4">
                Where material changes are made, the updated version will be published on this website together
                with a revised &quot;Last updated&quot; date.
              </p>
              <p className="mb-4">
                Your continued use of the website after an update constitutes acceptance of the revised Terms,
                subject to applicable law.
              </p>
              <p>
                Changes to these website Terms will not retrospectively alter the terms of an already executed
                property transaction agreement unless expressly agreed by the parties or required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">18. Governing Law</h2>
              <p>
                These Terms & Conditions are governed by and interpreted in accordance with the laws of the Federal
                Republic of Nigeria. Any dispute relating to these Terms or the use of our website will be handled
                in accordance with applicable Nigerian law and any dispute-resolution provisions contained in the
                relevant transaction agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">19. Severability</h2>
              <p>
                If any provision of these Terms is found to be invalid, unlawful or unenforceable, the remaining
                provisions will continue to apply to the extent permitted by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">20. Contact Us</h2>
              <p className="mb-4">
                If you have any questions, complaints or enquiries regarding these Terms & Conditions, please
                contact:
              </p>
              <p className="mb-4">
                Aceroyal Estates
                <br />
                Email:{' '}
                <a href="mailto:legal@aceroyalestates.com" className="text-primary hover:underline">
                  legal@aceroyalestates.com
                </a>
              </p>
              <p>
                For general customer enquiries, you may also contact us through the official contact channels
                displayed on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
