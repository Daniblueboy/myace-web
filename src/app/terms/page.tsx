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
            <p className="text-muted-foreground mb-6">Last updated: September 22, 2026</p>

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
              <h2 className="text-2xl font-bold mb-4">1. Definitions</h2>
              <p className="mb-2">For the purposes of these Terms:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>&quot;Aceroyal Estates&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;</strong>{' '}
                  means Aceroyal Estates Homes Ltd;
                </li>
                <li>
                  <strong>&quot;Customer&quot;, &quot;you&quot; or &quot;your&quot;</strong> means any person who
                  accesses the Website, submits an enquiry, books an inspection or enters into a transaction with
                  Aceroyal Estates;
                </li>
                <li>
                  <strong>&quot;Website&quot;</strong> means the Aceroyal Estates website and official digital
                  platforms;
                </li>
                <li>
                  <strong>&quot;Property&quot;</strong> means any land, building, unit, estate or development
                  marketed or offered by Aceroyal Estates; and
                </li>
                <li>
                  <strong>&quot;Transaction Documents&quot;</strong> means any offer letter, contract of sale,
                  payment plan, allocation letter, deed, receipt or other document issued in connection with a
                  Property transaction.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Property Information and Transactions</h2>
              <p className="mb-4">
                Information displayed on the Website is provided for general information and marketing purposes and
                does not, by itself, constitute a final offer for sale. Prices, availability, plot or unit sizes,
                payment plans, development specifications, promotional offers and development timelines may change
                from time to time.
              </p>
              <p className="mb-4">
                Photographs, videos, maps, renders, floor plans and illustrations are for presentation purposes and
                may not always represent the final completed development exactly.
              </p>
              <p className="mb-4">
                Aceroyal Estates will take reasonable steps to ensure that material property information published
                on the Website is accurate and will not knowingly publish misleading or deceptive information.
              </p>
              <p>
                The rights and obligations of Aceroyal Estates and a Customer in respect of a Property shall be
                governed by the applicable Transaction Documents. Where there is any inconsistency between general
                Website information and the applicable Transaction Documents, the Transaction Documents shall
                prevail, subject to applicable law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Eligibility and Use of Our Services</h2>
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
              <h2 className="text-2xl font-bold mb-4">5. Prices and Payments</h2>
              <p className="mb-4">
                Property prices, deposits, instalment arrangements, payment deadlines and other financial terms
                shall be as stated in the applicable Transaction Documents or official payment documentation.
              </p>
              <p className="mb-4">
                Customers shall make payments only through bank accounts or payment channels officially designated
                by Aceroyal Estates. Customers are advised to verify any payment instruction or change in payment
                details through an official Aceroyal Estates communication channel before making payment.
              </p>
              <p>
                Aceroyal Estates shall not be responsible for payments made to unauthorised persons or accounts
                unless the payment was expressly authorised by Aceroyal Estates in writing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Agents, Marketers and Representatives</h2>
              <p className="mb-4">
                No employee, marketer, agent, broker, consultant or other representative has authority to alter
                Property prices or Transaction Documents, promise a refund or discount, receive payment, allocate a
                Property or otherwise bind Aceroyal Estates unless expressly authorised to do so by Aceroyal
                Estates.
              </p>
              <p>
                Any variation to a Property transaction must be confirmed through an authorised Aceroyal Estates
                communication or applicable Transaction Document.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Reservation and Allocation</h2>
              <p className="mb-4">
                Submitting an enquiry, booking an inspection or expressing interest in a Property does not reserve
                or secure the Property.
              </p>
              <p>
                Payment of a purchase price or instalment does not, by itself, constitute allocation of a specific
                plot, unit or Property. Allocation shall be subject to confirmation of payment, availability,
                completion of applicable documentation and Aceroyal Estates&apos; internal approval and allocation
                process.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Property Documentation and Government Processes</h2>
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
              <h2 className="text-2xl font-bold mb-4">9. Refunds and Cancellations</h2>
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
              <h2 className="text-2xl font-bold mb-4">10. Complaints and Customer Redress</h2>
              <p className="mb-4">
                Customers may submit complaints through Aceroyal Estates&apos; official communication channels.
                Complaints will be reviewed and, where appropriate, escalated to the relevant department or
                management for resolution.
              </p>
              <p>
                Nothing in these Terms prevents a Customer from exercising any statutory right or seeking redress
                before a competent regulatory authority or court.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Force Majeure</h2>
              <p className="mb-4">
                Aceroyal Estates shall not be liable for delay or failure in performing an obligation where such
                delay or failure results from circumstances beyond its reasonable control, including natural
                disasters, government or regulatory delays, changes in law, strikes, civil unrest, fire, flood,
                infrastructure failure, security incidents or other events of a similar nature.
              </p>
              <p>
                Where reasonably practicable, Aceroyal Estates shall notify affected Customers of material delays
                and take reasonable steps to mitigate their effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Promotions and Special Offers</h2>
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
              <h2 className="text-2xl font-bold mb-4">13. Third-Party Services and Links</h2>
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
              <h2 className="text-2xl font-bold mb-4">14. Intellectual Property</h2>
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
              <h2 className="text-2xl font-bold mb-4">15. Accuracy and Availability of the Website</h2>
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
              <h2 className="text-2xl font-bold mb-4">16. Limitation of Liability</h2>
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
              <h2 className="text-2xl font-bold mb-4">17. Privacy and Personal Information</h2>
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
              <h2 className="text-2xl font-bold mb-4">18. Electronic Communications and Acceptance</h2>
              <p className="mb-4">
                Where a Customer accepts these Terms electronically, including by ticking an acceptance box,
                submitting an online form or otherwise indicating acceptance through the Website, such acceptance
                may constitute evidence of the Customer&apos;s agreement to these Terms, subject to applicable law.
              </p>
              <p className="mb-4">
                Electronic communications, confirmations, notices, receipts and records maintained by Aceroyal
                Estates may be relied upon as evidence of communications and transactions, subject to applicable
                law.
              </p>
              <p>
                Marketing communications will be managed in accordance with applicable law and your communication
                preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">19. Prohibited Conduct</h2>
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
              <h2 className="text-2xl font-bold mb-4">20. Changes to These Terms</h2>
              <p className="mb-4">
                Aceroyal Estates may amend these Terms from time to time to reflect changes to its services,
                business practices, technology or applicable law. The updated Terms shall be published on the
                Website with the revised &quot;Last Updated&quot; date.
              </p>
              <p className="mb-4">
                Your continued use of the website after an update constitutes acceptance of the revised Terms,
                subject to applicable law.
              </p>
              <p>
                Changes shall apply prospectively and shall not retrospectively alter the rights or obligations
                arising under an existing Transaction Document unless expressly agreed by the parties or required by
                law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">21. Governing Law</h2>
              <p>
                These Terms & Conditions are governed by and interpreted in accordance with the laws of the Federal
                Republic of Nigeria. Any dispute relating to these Terms or the use of our website will be handled
                in accordance with applicable Nigerian law and any dispute-resolution provisions contained in the
                relevant transaction agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">22. Severability</h2>
              <p>
                If any provision of these Terms is found to be invalid, unlawful or unenforceable, the remaining
                provisions will continue to apply to the extent permitted by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">23. Contact Us</h2>
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
