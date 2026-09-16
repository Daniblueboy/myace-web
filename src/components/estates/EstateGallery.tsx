'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

function isImage(url: string) {
  if (!url) return false;
  if (/\.pdf($|\?)/i.test(url)) return false;
  return true;
}

export default function EstateGallery({ images = [] }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-white dark:bg-slate-900 dark:border-slate-800 p-8 text-muted-foreground">
        Gallery images will be uploaded soon.
      </div>
    );
  }

  const slides = images.filter(isImage).map((src) => ({ src }));

  return (
    <div className="space-y-4">
      {/* Instagram/Snapchat-style explore grid, matching the main gallery
          (GalleryGrid) — a dense mosaic scrolling with the page instead of
          its own horizontal row, with an occasional larger featured tile. */}
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-0.5 sm:gap-1 grid-flow-dense">
        {images.map((image, idx) => {
          const featured = idx % 7 === 0;
          return (
            <button
              key={`${image}-${idx}`}
              type="button"
              className={`relative overflow-hidden bg-slate-100 dark:bg-slate-900 ${featured ? 'col-span-2 row-span-2' : 'aspect-square'}`}
              onClick={() => {
                setIndex(idx);
                setOpen(true);
              }}
              aria-label={`View estate gallery image ${idx + 1}`}
            >
              <img
                src={image}
                alt={`Estate gallery ${idx + 1}`}
                loading={idx > 8 ? 'lazy' : 'eager'}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </button>
          );
        })}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{
          view: ({ index: current }) => setIndex(current),
        }}
      />
    </div>
  );
}
