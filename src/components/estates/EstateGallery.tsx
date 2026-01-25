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
      <div className="grid gap-4 md:grid-cols-3">
        {images.map((image, idx) => (
          <button
            key={`${image}-${idx}`}
            type="button"
            className="h-48 w-full overflow-hidden rounded-lg border bg-slate-50 dark:bg-slate-900 dark:border-slate-800"
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
          >
            <img src={image} alt={`Estate gallery ${idx + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
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
