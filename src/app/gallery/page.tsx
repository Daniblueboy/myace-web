import type { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

const GALLERY_TITLE = 'Gallery | Aceroyal Estates';
const GALLERY_DESCRIPTION = 'Photos and videos from Aceroyal Estates — allocations, site progress, events and more.';

export const metadata: Metadata = {
  title: 'Gallery',
  description: GALLERY_DESCRIPTION,
  alternates: { canonical: '/gallery' },
  openGraph: { title: GALLERY_TITLE, description: GALLERY_DESCRIPTION, url: '/gallery' },
  twitter: { title: GALLERY_TITLE, description: GALLERY_DESCRIPTION },
};

export default async function GalleryPage() {
  const items = await fetchAPI('/gallery').catch(() => []);

  return (
    <div className="bg-background">
      <section className="py-16 md:py-24 text-center">
        <div className="container">
          <h1 className="text-5xl font-bold mb-6">Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A look at life at Aceroyal Estates — allocations, site progress, launch events and
            more.
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
