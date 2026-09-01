import type { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export const metadata: Metadata = {
  title: 'Allocation Gallery',
  description: 'Photos and videos from Aceroyal Estates allocation events and site visits.',
  alternates: { canonical: '/gallery' },
};

export default async function GalleryPage() {
  const items = await fetchAPI('/gallery').catch(() => []);

  return (
    <div className="bg-background">
      <section className="py-16 md:py-24 text-center">
        <div className="container">
          <h1 className="text-5xl font-bold mb-6">Allocation Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Moments from our allocation events and site visits — see plots and units being handed
            over to their new owners.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container">
          <GalleryGrid items={items} />
        </div>
      </section>
    </div>
  );
}
