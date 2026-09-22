import type { Metadata } from 'next';

const TITLE = 'Privacy Policy | Aceroyal Estates';
const DESCRIPTION = 'How Aceroyal Estates collects, uses, stores, discloses and protects your personal data.';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: DESCRIPTION,
  alternates: { canonical: '/privacy' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/privacy' },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-black">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: September 22, 2026</p>

            <p className="mb-4">
              Aceroyal Estates (&ldquo;Aceroyal Estates&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo; or
              &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal information.
            </p>
            <p className="mb-4">
              This Privacy Policy explains how we collect, use, store, disclose and protect personal data when you
              use our website, mobile applications, customer portals and other digital services, contact us, book a
              property inspection, make an enquiry, create an account or otherwise interact with Aceroyal Estates.
            </p>
            <p className="mb-6">
              We process personal data in accordance with applicable Nigerian data protection laws, including the
              Nigeria Data Protection Act 2023 and applicable regulations and guidance issued by the Nigeria Data
              Protection Commission.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Scope of This Policy</h2>
              <p className="mb-2">This Privacy Policy applies to personal data collected through:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>the Aceroyal Estates website;</li>
                <li>Aceroyal Estates mobile applications;</li>
                <li>customer and property portals;</li>
                <li>online enquiry and inspection forms;</li>
                <li>email, telephone and other official communication channels;</li>
                <li>property purchases, subscriptions and related transactions; and</li>
                <li>other services operated by or on behalf of Aceroyal Estates.</li>
              </ul>
              <p>
                This Policy does not apply to third-party websites, applications or services that we do not
                control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Personal Information We Collect</h2>
              <p className="mb-4">The information we collect depends on how you interact with us.</p>

              <p className="mb-2 font-semibold">a. Identity and Contact Information</p>
              <p className="mb-2">We may collect:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>full name;</li>
                <li>email address;</li>
                <li>telephone number;</li>
                <li>residential or correspondence address;</li>
                <li>date of birth where required;</li>
                <li>occupation or other identification information where relevant to a transaction; and</li>
                <li>government-issued identification details where required for property documentation, identity verification or regulatory purposes.</li>
              </ul>
              <p className="mb-4">
                Government-issued identification, date of birth, occupation and similar information will only be
                collected where reasonably necessary for a specified transaction, verification, regulatory or legal
                purpose, and will not be requested as a general requirement for ordinary website enquiries unless
                necessary.
              </p>

              <p className="mb-2 font-semibold">b. Account Information</p>
              <p className="mb-2">Where you create an account on our digital platforms, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>account username or identifier;</li>
                <li>encrypted authentication credentials;</li>
                <li>account preferences;</li>
                <li>account activity; and</li>
                <li>information necessary to authenticate and secure your account.</li>
              </ul>
              <p className="mb-4">We do not store passwords in readable form.</p>

              <p className="mb-2 font-semibold">c. Property and Transaction Information</p>
              <p className="mb-2">We may collect information relating to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>properties you enquire about or purchase;</li>
                <li>inspection bookings;</li>
                <li>reservations and allocations;</li>
                <li>payment plans;</li>
                <li>transaction history;</li>
                <li>invoices and receipts;</li>
                <li>payment references;</li>
                <li>property documentation;</li>
                <li>ownership or allocation records; and</li>
                <li>communications relating to your transaction.</li>
              </ul>

              <p className="mb-2 font-semibold">d. Payment Information</p>
              <p className="mb-2">
                Where payments are made through third-party payment processors or financial institutions, we may
                receive transaction references, payment status and other information necessary to reconcile your
                payment.
              </p>
              <p className="mb-4">
                We do not intentionally store full payment-card information where payment processing is handled by
                an authorised third-party payment provider.
              </p>

              <p className="mb-2 font-semibold">e. Communications</p>
              <p className="mb-2">We may retain information you provide when you:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>contact customer support;</li>
                <li>submit an enquiry;</li>
                <li>make a complaint;</li>
                <li>send us an email;</li>
                <li>communicate with us by telephone or messaging platforms; or</li>
                <li>respond to surveys, promotions or marketing campaigns.</li>
              </ul>

              <p className="mb-2 font-semibold">f. Technical and Usage Information</p>
              <p className="mb-2">
                When you use our website, mobile application or other digital services, certain information may be
                collected automatically, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address;</li>
                <li>browser type;</li>
                <li>device type;</li>
                <li>operating system;</li>
                <li>device identifiers;</li>
                <li>referring pages;</li>
                <li>pages or features viewed;</li>
                <li>date and time of access;</li>
                <li>session information;</li>
                <li>crash and diagnostic information; and</li>
                <li>general usage and interaction data.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Collect Personal Information</h2>
              <p className="mb-2">We may collect personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>directly from you;</li>
                <li>when you create an account;</li>
                <li>when you submit an enquiry or inspection request;</li>
                <li>when you purchase or reserve a property;</li>
                <li>when you complete transaction documents;</li>
                <li>when you communicate with us;</li>
                <li>automatically through our websites and applications;</li>
                <li>through authorised agents or representatives;</li>
                <li>through payment providers and financial institutions; and</li>
                <li>from other lawful sources where necessary for a transaction or legal obligation.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Why We Process Your Personal Information</h2>
              <p className="mb-2">We may process personal data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>responding to enquiries;</li>
                <li>arranging property inspections;</li>
                <li>providing information about available properties;</li>
                <li>creating and managing customer accounts;</li>
                <li>processing reservations and property transactions;</li>
                <li>processing and reconciling payments;</li>
                <li>preparing transaction and property documentation;</li>
                <li>verifying customer information;</li>
                <li>managing allocations and ownership records;</li>
                <li>providing customer support;</li>
                <li>sending transaction-related notifications;</li>
                <li>communicating important service updates;</li>
                <li>maintaining and improving our websites, mobile applications and digital services;</li>
                <li>preventing fraud, misuse and unauthorised access;</li>
                <li>maintaining security and business continuity;</li>
                <li>complying with legal, regulatory, tax and record-keeping obligations;</li>
                <li>resolving complaints and disputes;</li>
                <li>enforcing contractual rights; and</li>
                <li>sending marketing communications where permitted by law.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Lawful Bases for Processing</h2>
              <p className="mb-4">
                Depending on the circumstances, we process personal information on one or more lawful bases,
                including:
              </p>

              <p className="mb-2 font-semibold">Consent</p>
              <p className="mb-4">
                Where you have given us permission to process your information for a specific purpose, such as
                certain marketing communications. You may withdraw your consent at any time, although this will not
                affect processing that was lawful before your withdrawal.
              </p>

              <p className="mb-2 font-semibold">Performance of a Contract</p>
              <p className="mb-2">Where processing is necessary to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>respond to steps you request before entering into a transaction;</li>
                <li>process a property purchase or reservation;</li>
                <li>administer your account;</li>
                <li>fulfil our obligations under an agreement; or</li>
                <li>provide requested services.</li>
              </ul>

              <p className="mb-2 font-semibold">Legal Obligation</p>
              <p className="mb-4">
                Where we are required to process or retain information to comply with applicable laws, court
                orders, regulatory requirements or lawful requests from authorities.
              </p>

              <p className="mb-2 font-semibold">Legitimate Interests</p>
              <p className="mb-2">
                Where processing is reasonably necessary for our legitimate business interests, provided those
                interests do not override your rights and freedoms. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>protecting our systems;</li>
                <li>preventing fraud;</li>
                <li>improving our services;</li>
                <li>maintaining business records;</li>
                <li>managing customer relationships; and</li>
                <li>analysing how our services are used.</li>
              </ul>
              <p>Other lawful bases permitted by applicable data protection law may also apply where appropriate.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Mobile Application Permissions</h2>
              <p className="mb-4">
                Our mobile applications may request access to certain device features where necessary to provide
                specific functionality.
              </p>
              <p className="mb-2">Depending on the features you use, this may include access to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>notifications;</li>
                <li>camera or photo library for uploading documents or images;</li>
                <li>files or storage for downloading or uploading documents; or</li>
                <li>other device capabilities required by a feature.</li>
              </ul>
              <p className="mb-4">We will request device permissions only where reasonably necessary.</p>
              <p className="mb-4">
                You may manage or revoke permissions through your device settings, although doing so may affect the
                functionality of certain features.
              </p>
              <p>
                We do not access your contacts, microphone, camera or other sensitive device features without an
                appropriate purpose and the permissions required by your device or applicable law.
              </p>
            </section>

            <section id="cookies" className="mb-8 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">7. Cookies and Similar Technologies</h2>
              <p className="mb-2">Our website and digital services may use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>keep the website functioning;</li>
                <li>maintain sessions;</li>
                <li>remember preferences;</li>
                <li>understand website usage;</li>
                <li>identify technical issues;</li>
                <li>improve user experience; and</li>
                <li>measure the performance of our digital services.</li>
              </ul>
              <p className="mb-4">
                Some cookies may be necessary for the website to operate, while others may relate to analytics,
                preferences or other optional functions.
              </p>
              <p className="mb-4">
                Where consent is legally required for non-essential cookies or similar technologies, we will
                provide an appropriate choice before using them.
              </p>
              <p>You may also manage cookies through your browser settings.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Marketing Communications</h2>
              <p className="mb-2">
                With your consent or where otherwise permitted by law, we may send you information about:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>new properties;</li>
                <li>investment opportunities;</li>
                <li>promotions;</li>
                <li>events;</li>
                <li>property launches;</li>
                <li>service updates; and</li>
                <li>other Aceroyal Estates offerings.</li>
              </ul>
              <p className="mb-4">
                You may unsubscribe from promotional communications at any time using the unsubscribe option
                provided in the communication or by contacting us.
              </p>
              <p>
                Service-related or transaction-related communications may still be sent where necessary to provide
                services you have requested.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. How We Share Personal Information</h2>
              <p className="mb-4">We do not sell or rent personal information.</p>
              <p className="mb-4">We may disclose personal information where reasonably necessary to:</p>

              <p className="mb-2 font-semibold">Service Providers</p>
              <p className="mb-2">We may use trusted third parties to provide services such as:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>website and cloud hosting;</li>
                <li>payment processing;</li>
                <li>email delivery;</li>
                <li>communications;</li>
                <li>analytics;</li>
                <li>cybersecurity;</li>
                <li>document management;</li>
                <li>customer support;</li>
                <li>professional services; and</li>
                <li>information technology support.</li>
              </ul>
              <p className="mb-4">
                Such providers are permitted to process personal data only for authorised purposes and are expected
                to protect it appropriately.
              </p>

              <p className="mb-2 font-semibold">Professional Advisers</p>
              <p className="mb-4">
                We may share information with lawyers, auditors, accountants, consultants, surveyors or other
                professional advisers where reasonably necessary.
              </p>

              <p className="mb-2 font-semibold">Financial Institutions and Payment Providers</p>
              <p className="mb-4">Where necessary to process, confirm or reconcile transactions.</p>

              <p className="mb-2 font-semibold">Government and Regulatory Authorities</p>
              <p className="mb-4">
                We may disclose personal information where required by law, regulation, court order or other
                lawful authority.
              </p>

              <p className="mb-2 font-semibold">Business Transactions</p>
              <p className="mb-4">
                Where Aceroyal Estates undergoes a merger, acquisition, restructuring, financing, sale of assets or
                similar corporate transaction, relevant information may be disclosed subject to appropriate
                confidentiality and data-protection safeguards.
              </p>

              <p className="mb-2 font-semibold">With Your Authorisation</p>
              <p>We may share personal data with another party where you have specifically authorised us to do so.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. International Transfers</h2>
              <p className="mb-4">
                Some of our technology providers or service providers may store or process information outside
                Nigeria.
              </p>
              <p className="mb-4">
                Where personal data is transferred outside Nigeria, Aceroyal Estates will take appropriate steps
                required under applicable data protection law to ensure that the information receives an adequate
                level of protection.
              </p>
              <p>These measures may include appropriate contractual, organisational or other lawful safeguards.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Data Security</h2>
              <p className="mb-2">
                We implement reasonable technical and organisational measures designed to protect personal
                information against:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>unauthorised access;</li>
                <li>unlawful processing;</li>
                <li>accidental loss;</li>
                <li>alteration;</li>
                <li>disclosure;</li>
                <li>destruction; and</li>
                <li>misuse.</li>
              </ul>
              <p className="mb-2">These measures may include:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>encrypted communication;</li>
                <li>access controls;</li>
                <li>authentication mechanisms;</li>
                <li>restricted administrative access;</li>
                <li>secure hosting;</li>
                <li>system monitoring;</li>
                <li>regular software updates;</li>
                <li>security reviews; and</li>
                <li>internal data-handling procedures.</li>
              </ul>
              <p>
                While we take reasonable steps to protect your information, no internet-based system or electronic
                storage method can be guaranteed to be completely secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Data Retention</h2>
              <p className="mb-4">
                We retain personal information only for as long as reasonably necessary for the purpose for which
                it was collected or as required by applicable law.
              </p>
              <p className="mb-2">Retention periods may vary depending on:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>the nature of the information;</li>
                <li>whether you have an active account;</li>
                <li>the duration of a property transaction;</li>
                <li>contractual requirements;</li>
                <li>legal or regulatory obligations;</li>
                <li>tax and accounting requirements;</li>
                <li>dispute-resolution requirements;</li>
                <li>fraud prevention;</li>
                <li>legal claims; and</li>
                <li>legitimate business record-keeping needs.</li>
              </ul>
              <p>
                When personal information is no longer required, we will take reasonable steps to securely delete,
                anonymise or otherwise dispose of it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Your Data Protection Rights</h2>
              <p className="mb-2">Subject to applicable law and any lawful exceptions, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>request confirmation of whether we process your personal data;</li>
                <li>request access to personal data we hold about you;</li>
                <li>request correction of inaccurate or incomplete information;</li>
                <li>request deletion of personal information in appropriate circumstances;</li>
                <li>object to certain processing;</li>
                <li>request restriction of processing;</li>
                <li>withdraw consent where processing is based on consent;</li>
                <li>request data portability where applicable;</li>
                <li>object to certain direct-marketing activities; and</li>
                <li>lodge a complaint regarding our handling of your personal information.</li>
              </ul>
              <p className="mb-4">
                A request to delete information may not always result in immediate deletion where we are required
                or permitted to retain the information for legal, contractual, regulatory, security or legitimate
                record-keeping purposes.
              </p>
              <p>
                We may request reasonable information to verify your identity before responding to a data-rights
                request.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Privacy Requests</h2>
              <p className="mb-4">
                Requests relating to access, correction, deletion, restriction, objection, portability, withdrawal
                of consent or other privacy matters may be submitted through Aceroyal Estates&apos; designated
                privacy contact or the privacy request facility provided on the Website.
              </p>
              <p>
                We will review and respond to verified requests within the period required by applicable law,
                taking into account the nature and complexity of the request.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">15. Account Deletion</h2>
              <p className="mb-4">
                You may request deletion of your Aceroyal Estates online account through the available
                account-deletion facility or by contacting us through the designated privacy or customer-support
                channel.
              </p>
              <p className="mb-4">
                Deletion of an online account does not automatically cancel an existing or pending property
                transaction and does not require Aceroyal Estates to delete information that it is legally required
                or reasonably entitled to retain, including contracts, property ownership or allocation records,
                invoices, receipts, payment records, tax records, regulatory records, dispute records or information
                required to establish or protect legal rights.
              </p>
              <p>
                Where account deletion is completed, information that is no longer required will be deleted or
                anonymised where reasonably practicable. Where certain information must be retained, it will
                continue to be protected and used only for the purposes for which retention is required or
                permitted.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">16. Children and Minors</h2>
              <p className="mb-4">
                Our property services are primarily intended for adults who have the legal capacity to enter into
                property transactions.
              </p>
              <p className="mb-4">
                We do not knowingly collect personal information directly from children for ordinary marketing,
                account-registration or property-purchase purposes.
              </p>
              <p className="mb-4">
                Where information relating to a minor is legitimately required in connection with property
                ownership, inheritance, guardianship or another lawful transaction, we will process such
                information only where appropriate legal authority, consent or other lawful basis exists.
              </p>
              <p>
                If you believe that a child&apos;s personal information has been provided to us improperly, please
                contact us so that we can take appropriate action.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">17. Third-Party Websites and Services</h2>
              <p className="mb-4">
                Our websites and applications may contain links to third-party websites, platforms or services.
              </p>
              <p className="mb-4">
                Aceroyal Estates is not responsible for the privacy practices, security or content of third parties
                that we do not control.
              </p>
              <p>
                We encourage you to review the privacy policies of any third-party service before providing
                personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">18. Automated Decision-Making</h2>
              <p className="mb-4">
                Aceroyal Estates does not ordinarily make significant decisions about customers solely through
                automated processing.
              </p>
              <p>
                If we introduce automated decision-making that produces legal or similarly significant effects, we
                will provide appropriate information and safeguards as required by applicable law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">19. Data Breaches</h2>
              <p className="mb-2">If a personal-data breach occurs, we will take reasonable steps to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>contain and investigate the incident;</li>
                <li>reduce potential harm;</li>
                <li>secure affected systems; and</li>
                <li>notify affected individuals or relevant authorities where required by applicable law.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">20. Complaints</h2>
              <p className="mb-4">
                If you have a concern about how Aceroyal Estates processes your personal information, we encourage
                you to contact us first so we can investigate and respond.
              </p>
              <p>
                You also have the right, where applicable, to lodge a complaint with the Nigeria Data Protection
                Commission or another competent regulatory authority.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">21. Changes to This Privacy Policy</h2>
              <p className="mb-2">We may update this Privacy Policy periodically to reflect:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>changes to our services;</li>
                <li>changes to our technology;</li>
                <li>operational developments; or</li>
                <li>changes in legal or regulatory requirements.</li>
              </ul>
              <p className="mb-4">
                When we update this Policy, we will revise the &ldquo;Last updated&rdquo; date.
              </p>
              <p>
                Where an update materially changes how we process personal information, we will take reasonable
                steps to provide additional notice where required.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">22. Contact</h2>
              <p className="mb-2">
                For privacy-related enquiries, data-rights requests or complaints, please contact:
              </p>
              <p className="mb-4">
                Aceroyal Data Protection Officer
                <br />
                Andrew Akinwale Arowolo
                <br />
                Email:{' '}
                <a href="mailto:andrewarowolo@aceroyalestates.com" className="text-primary hover:underline">
                  andrewarowolo@aceroyalestates.com
                </a>
              </p>
              <p>
                For general customer support, you may also reach us at{' '}
                <a href="mailto:customercare@aceroyalestates.com" className="text-primary hover:underline">
                  customercare@aceroyalestates.com
                </a>
                . For privacy-specific requests, please include sufficient information for us to identify and
                respond to your request.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
