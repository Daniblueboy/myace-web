import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import TestimonialsSpotlight from '@/components/home/TestimonialsSpotlight';

// "Our Successes" — the testimonial carousel (text/photo/video quotes) plus a
// clickable preview of the full gallery: reuses GalleryGrid as-is (same
// lightbox-with-next/prev for photos, same video modal) rather than a
// static thumbnail strip, so a moment actually pops up and scrolls the way
// the full /gallery page does — plus a View More link to that full page.
export default async function TestimonialsSection() {
  const [testimonials, gallery] = await Promise.all([
    fetchAPI('/testimonials').catch(() => []),
    fetchAPI('/gallery').catch(() => []),
  ]);

  const moments = (Array.isArray(gallery) ? gallery : []).slice(0, 6);

  if ((!testimonials || testimonials.length === 0) && moments.length === 0) return null;

  return (
    <section className="py-12 md:py-28 bg-slate-50 dark:bg-slate-900">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Our Successes</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">
            Moments From Allocation, Inspection &amp; Handover
          </h2>
        </div>

        {moments.length > 0 && (
          <div>
            <GalleryGrid items={moments} showFilters={false} />
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link href="/gallery" className="gap-2">
                  View More Success Stories <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {testimonials && testimonials.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">What Clients Say</h3>
            <TestimonialsSpotlight items={testimonials} />
          </div>
        )}
      </div>
    </section>
  );
}
