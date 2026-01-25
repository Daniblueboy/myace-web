import { MapPin } from 'lucide-react';

export default function CeoWelcomeSection() {
  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
        <div className="relative">
          <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-primary/10" />
          <img
            src="/images/ceo.jpg"
            alt="Dr Endurance Agonor - CEO of Aceroyal Estates"
            className="relative rounded-3xl w-full h-[360px] object-cover object-top shadow-xl"
          />
        </div>
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Message from the CEO</p>
          <h2 className="text-3xl md:text-4xl font-bold">Welcome to Aceroyal Estates</h2>
          <p className="text-muted-foreground text-lg">
            Our mission is to deliver secure, well-planned estates with clear titles and
            transparent payment plans. We are committed to helping families and investors
            own property with confidence.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Corporate HQ: 123 Admiralty Way, Lekki Phase 1, Lagos</span>
            </div>
            <p className="font-semibold text-slate-900 dark:text-white">Dr Endurance Agonor</p>
            <p>Chief Executive Officer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
