'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

interface PropertyGalleryProps {
  images: Array<{ id: string; url: string; altText?: string | null }>;
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
        <p>No images available</p>
      </div>
    );
  }

  const slides = images.map((img) => ({
    src: img.url,
    alt: img.altText || 'Property image',
  }));

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {/* Main Image */}
        <div
          className="col-span-4 md:col-span-3 aspect-video cursor-pointer overflow-hidden rounded-lg"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
        >
          <img
            src={images[0].url}
            alt={images[0].altText || 'Main property image'}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Thumbnail Grid */}
        <div className="col-span-4 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-2">
          {images.slice(1, 5).map((img, idx) => (
            <div
              key={img.id}
              className="aspect-video cursor-pointer overflow-hidden rounded-lg relative"
              onClick={() => {
                setIndex(idx + 1);
                setOpen(true);
              }}
            >
              <img
                src={img.url}
                alt={img.altText || `Property image ${idx + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {idx === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold">
                  +{images.length - 5} more
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Thumbnails, Zoom]}
      />
    </>
  );
}
