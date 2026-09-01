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
    title: 'Send a deletion request',
    description:
      'Email customercare@aceroyalestates.com from the address on your account with the subject line "Account Deletion Request", or reach out through the customer portal.',
  },
  {
    title: 'We verify your identity',
    description:
      'Our team confirms the request is genuinely from you before touching any account or transaction data.',
  },
  {
    title: 'Your data is removed',
    description:
      'Once verified, your account and associated personal data are deleted within 7–14 business days. You will get a confirmation email when it is done.',
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
              You're in control of your data. Here's how to request permanent deletion of your
              Aceroyal Estates account, and what happens after you do.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                <div className="shrink-0 h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <h2 className="font-semibold text-lg mb-1">{step.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex gap-4">
              <Clock className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Processing time</h3>
                <p className="text-sm text-muted-foreground">
                  Requests are processed within 7–14 business days of verification.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex gap-4">
              <ShieldAlert className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">This is permanent</h3>
                <p className="text-sm text-muted-foreground">
                  Once your account is deleted it cannot be restored, so make sure you no longer
                  need access before requesting it.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-6 mb-12 flex gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0" />
            <p className="text-sm text-amber-900 dark:text-amber-200">
              If you have an active or pending property transaction on your account, let us know in
              your request — we'll confirm how deletion affects that transaction before proceeding.
            </p>
          </div>

          <div className="text-center bg-white dark:bg-slate-800 rounded-lg shadow-lg p-10">
            <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ready to request deletion?</h2>
            <p className="text-muted-foreground mb-6">
              Email us directly, or use the contact form and select "Support" as your enquiry type.
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
