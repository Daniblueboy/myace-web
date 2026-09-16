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
    <section className="py-12 md:py-28 bg-slate-50 dark:bg-slate-950">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-base uppercase tracking-[0.2em] text-primary">Our Successes</p>
        </div>

        {moments.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">
              Moments From Allocation, Inspection &amp; Handover
            </h2>
            <GalleryGrid items={moments} />
            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link href="/gallery" className="gap-2">
                  View More Success Stories <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {testimonials && testimonials.length > 0 && (
          <div className="mt-14 md:mt-20">
            <h2 className="text-3xl font-bold text-center">What Clients Say</h2>
            <p className="text-muted-foreground text-center mt-2 mb-8">
              Real stories from people who secured properties with Aceroyal Estates.
            </p>
            <TestimonialsSpotlight items={testimonials} />
          </div>
        )}
      </div>
    </section>
  );
}
