import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-3">Ready to book an inspection?</h2>
          <p className="text-primary-foreground/80">
            Our advisors will guide you through the property journey end-to-end.
          </p>
        </div>
        <div className="flex gap-4 md:justify-end">
          <Button asChild variant="secondary">
            <Link href="/book-inspection">Book Inspection</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-white/80 !text-white hover:bg-white hover:!text-primary dark:hover:bg-white dark:hover:!text-primary"
          >
            <Link href="/estates">Explore Estates</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
