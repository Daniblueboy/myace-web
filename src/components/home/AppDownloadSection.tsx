import { Apple, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppDownloadSection() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950">
      <div className="container">
        <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-8 md:p-12 grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Aceroyal Mobile</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Our apps are launching soon on iOS & Android
            </h2>
            <p className="text-muted-foreground text-lg">
              Track estate updates, view payment plans, and book inspections from your phone.
              Early access drops first for subscribers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2" disabled>
                <Apple className="h-4 w-4" /> App Store (Soon)
              </Button>
              <Button variant="outline" className="gap-2" disabled>
                <Smartphone className="h-4 w-4" /> Google Play (Soon)
              </Button>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-transparent p-6">
            <div className="space-y-3">
              <p className="text-sm font-medium">What you’ll get:</p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Verified estate updates and new launches</li>
                <li>• Payment plan flyers and brochures</li>
                <li>• Inspection booking and reminders</li>
                <li>• Secure client support messaging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
