'use client';

import { useEffect, useState } from 'react';

// Crossfades through the property's photos instead of showing only the
// first one — same fade pattern as the hero slideshow, just without the
// Ken Burns motion since this card is much smaller.
export default function NewPropertyImageCarousel({
  images,
  alt,
}: {
  images: { url: string }[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return <div className="h-full w-full bg-slate-200 dark:bg-slate-800" />;
  }

  return (
    <>
      {images.map((image, idx) => (
        <img
          key={image.url}
          src={image.url}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            idx === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </>
  );
}
