import { fetchAPI } from '@/lib/api';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';

export default async function TestimonialsSection() {
  const testimonials = await fetchAPI('/testimonials').catch(() => []);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">What Clients Say</h2>
          <p className="text-muted-foreground mt-2">
            Real stories from people who secured properties with Aceroyal Estates.
          </p>
        </div>
        <TestimonialsCarousel items={testimonials} />
      </div>
    </section>
  );
}
