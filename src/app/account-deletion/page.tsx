import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Clock, ShieldAlert, AlertTriangle } from 'lucide-react';

const TITLE = 'Account Deletion | Aceroyal Estates';
const DESCRIPTION =
  'How to request deletion of your Aceroyal Estates account and personal data, and what to expect once you do.';

export const metadata: Metadata = {
  title: 'Account Deletion',
  description: DESCRIPTION,
  alternates: { canonical: '/account-deletion' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/account-deletion' },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: 'Submit your request',
    description:
      'Email customercare@aceroyalestates.com from the address on your account, or submit a request through the customer portal, with the subject line "Account Deletion Request". If available in the mobile app, you may also initiate this from your account settings.',
  },
  {
    title: 'We verify your identity',
    description:
      'Before processing the request, we may need to confirm you’re the authorised owner of the account — this protects your account, property records and personal information from unauthorised deletion requests.',
  },
  {
    title: 'We process your request',
    description:
      'Once verified, we aim to complete eligible deletion requests within 7–14 business days. We’ll notify you when it’s complete or if we need additional information or action from you.',
  },
];

export default function AccountDeletionPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Account Deletion</p>
            <h1 className="text-4xl font-bold mb-4">Delete Your Aceroyal Account</h1>
            <p className="text-lg text-muted-foreground">
              You&apos;re in control of your personal information. This page explains how to request deletion of
              your Aceroyal Estates account and associated personal data, what information may need to be
              retained, and what happens after you submit your request.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">How to Request Account Deletion</h2>
          <div className="space-y-4 mb-12">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                <div className="shrink-0 h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:grid-cols-2 mb-12">
            <div className="glass-card backdrop-blur-lg shrink-0 w-[85%] snap-center bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex gap-4 lg:w-auto lg:shrink">
              <Clock className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Processing time</h3>
                <p className="text-sm text-muted-foreground">
                  We aim to process verified requests within 7–14 business days. More time may be needed for
                  additional identity verification, complex transaction records, information we’re required to
                  retain, or requests affecting an ongoing property transaction.
                </p>
              </div>
            </div>
            <div className="glass-card backdrop-blur-lg shrink-0 w-[85%] snap-center bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex gap-4 lg:w-auto lg:shrink">
              <ShieldAlert className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">This is permanent</h3>
                <p className="text-sm text-muted-foreground">
                  Once your account is deleted it cannot normally be restored, so make sure you no longer need
                  access before requesting it.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-6 mb-12 flex gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0" />
            <p className="text-sm text-amber-900 dark:text-amber-200">
              If you have an active or pending property transaction on your account, let us know in your request.
              Account deletion may affect access to certain digital services but will not automatically cancel your
              transaction, and your contractual rights and obligations will not automatically end because your
              online account is deleted. Our team will explain what needs to be retained, how your transaction
              continues, how you can access relevant information afterward, and whether any further action is
              required from you.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4">What Happens When Your Account Is Deleted?</h2>
            <p className="mb-2">Where deletion is applicable:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>your Aceroyal account will be permanently closed;</li>
              <li>you will no longer be able to sign in;</li>
              <li>account profile information that is no longer required will be deleted or anonymised;</li>
              <li>personal data associated solely with your account will be deleted where legally and operationally appropriate; and</li>
              <li>relevant service providers may be instructed to delete associated information where applicable.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Information We May Need to Retain</h2>
            <p className="mb-2">
              Deleting your account does not necessarily mean that every record connected with you can be
              immediately deleted. Aceroyal Estates may retain certain information where reasonably necessary or
              required for purposes such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>completed or ongoing property transactions;</li>
              <li>property ownership or allocation records;</li>
              <li>contracts and transaction documentation;</li>
              <li>invoices, receipts and financial records;</li>
              <li>legal, tax or regulatory obligations;</li>
              <li>fraud prevention and security;</li>
              <li>resolving disputes, complaints or legal claims; and</li>
              <li>establishing or protecting the legal rights of Aceroyal Estates or its customers.</li>
            </ul>
            <p className="mb-4">
              Where information must be retained, it will no longer be used for purposes that are incompatible with
              the reason for its retention. For more information about how we retain and protect personal
              information, please review our{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            <h2 className="text-2xl font-bold mb-4">Before You Delete Your Account</h2>
            <p className="mb-2">Before requesting deletion, we recommend that you:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>download or retain any documents you may need;</li>
              <li>save copies of receipts or transaction information;</li>
              <li>confirm the status of any active property transaction; and</li>
              <li>ensure that you no longer require access to your online account.</li>
            </ul>
            <p className="mb-4">
              Once deletion has been completed, access to your online account will not normally be recoverable.
            </p>

            <h2 className="text-2xl font-bold mb-4">Requesting Deletion of Specific Data</h2>
            <p>
              In some circumstances, you may request deletion of certain personal information without closing your
              entire Aceroyal account. Such requests will be considered in accordance with our{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{' '}
              and applicable data protection laws.
            </p>
          </div>

          <div className="text-center bg-white dark:bg-slate-800 rounded-lg shadow-lg p-10">
            <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ready to request deletion?</h2>
            <p className="text-muted-foreground mb-6">
              Email us with the subject line &quot;Account Deletion Request&quot;, or use the contact form and
              select &quot;Support&quot; as your enquiry type.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:customercare@aceroyalestates.com?subject=Account%20Deletion%20Request">
                  Email customercare@aceroyalestates.com
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact?enquiry=SUPPORT">Use the contact form</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
