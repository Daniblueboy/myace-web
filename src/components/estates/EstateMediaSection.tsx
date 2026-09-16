'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { View, FileText, Play, X } from 'lucide-react';
import { VirtualTourSimulator } from '@/components/estates/VirtualTourSimulator';
import PropertyPanorama from '@/components/properties/PropertyPanorama';

export type FlyerItem = { id: string; title: string; url: string };

type EstateMediaSectionProps = {
  estateName: string;
  panoramaUrls?: string[];
  virtualTourEmbedUrl?: string | null;
  tourImages: string[];
  isSamplePreviewTour: boolean;
  photos: string[];
  flyers: FlyerItem[];
};

function isImageUrl(url: string) {
  return /\.(png|jpe?g|webp|gif)$/i.test(url);
}

type MediaTile =
  | { kind: 'tour' }
  | { kind: 'photo'; url: string; index: number }
  | { kind: 'flyer'; flyer: FlyerItem };

const FILTERS = ['All', 'Virtual Tour', 'Photos', 'Flyers'] as const;

export function EstateMediaSection({
  estateName,
  panoramaUrls,
  virtualTourEmbedUrl,
  tourImages,
  isSamplePreviewTour,
  photos,
  flyers,
}: EstateMediaSectionProps) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [tourOpen, setTourOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const hasTour = true; // always has at least an empty-state fallback
  const items: MediaTile[] = [
    ...(hasTour ? [{ kind: 'tour' as const }] : []),
    ...photos.map((url, index) => ({ kind: 'photo' as const, url, index })),
    ...flyers.map((flyer) => ({ kind: 'flyer' as const, flyer })),
  ];

  const availableFilters = FILTERS.filter((f) => {
    if (f === 'All' || f === 'Virtual Tour') return true;
    if (f === 'Photos') return photos.length > 0;
    if (f === 'Flyers') return flyers.length > 0;
    return false;
  });

  const visibleItems = items.filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Virtual Tour') return item.kind === 'tour';
    if (filter === 'Photos') return item.kind === 'photo';
    if (filter === 'Flyers') return item.kind === 'flyer';
    return true;
  });

  const tourPreviewImage = tourImages[0] || photos[0];
  const lightboxSlides = photos.map((src) => ({ src }));

  return (
    <div className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Media</h2>
        {availableFilters.length > 2 && (
          <div className="flex flex-wrap gap-2">
            {availableFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border transition-colors ${
                  filter === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-muted-foreground border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* A single horizontal filmstrip for every media type — filtering
          swaps which tiles show in the same row instead of switching to
          stacked vertical sections, which was adding a lot of scroll
          height on mobile for not much payoff. */}
      <div className="flex gap-3 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-6 px-6">
        {visibleItems.map((item, i) => {
          if (item.kind === 'tour') {
            return (
              <button
                key="tour"
                type="button"
                onClick={() => setTourOpen(true)}
                className="group relative shrink-0 w-32 sm:w-40 aspect-square snap-center overflow-hidden rounded-xl border bg-slate-100 dark:bg-slate-950"
              >
                {tourPreviewImage ? (
                  <img
                    src={tourPreviewImage}
                    alt={`${estateName} virtual tour`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <View className="h-8 w-8" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900">
                    <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                  </span>
                </div>
                <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 text-left text-xs font-semibold text-white">
                  Virtual Tour
                </span>
              </button>
            );
          }
          if (item.kind === 'photo') {
            return (
              <button
                key={`photo-${item.index}`}
                type="button"
                onClick={() => {
                  setLightboxIndex(item.index);
                  setLightboxOpen(true);
                }}
                className="group relative shrink-0 w-32 sm:w-40 aspect-square snap-center overflow-hidden rounded-xl border bg-slate-100 dark:bg-slate-950"
              >
                <img
                  src={item.url}
                  alt={`${estateName} photo ${item.index + 1}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            );
          }
          return (
            <a
              key={item.flyer.id}
              href={item.flyer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative shrink-0 w-32 sm:w-40 aspect-square snap-center overflow-hidden rounded-xl border bg-slate-100 dark:bg-slate-950"
            >
              {isImageUrl(item.flyer.url) ? (
                <img
                  src={item.flyer.url}
                  alt={item.flyer.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <FileText className="h-8 w-8" />
                </div>
              )}
              <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 text-left text-xs font-semibold text-white line-clamp-1">
                {item.flyer.title}
              </span>
            </a>
          );
        })}
      </div>

      {photos.length > 0 && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
          on={{ view: ({ index }) => setLightboxIndex(index) }}
        />
      )}

      {tourOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 p-4 sm:p-6 space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Virtual Tour</h3>
                {isSamplePreviewTour && (
                  <span className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                    Sample preview
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setTourOpen(false)}
                aria-label="Close virtual tour"
                className="rounded-full p-1.5 text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {panoramaUrls?.length ? (
              <PropertyPanorama panoramaUrls={panoramaUrls} estateName={estateName} />
            ) : virtualTourEmbedUrl ? (
              <div className="aspect-video rounded-xl overflow-hidden border">
                <iframe
                  src={virtualTourEmbedUrl}
                  title={`Virtual tour of ${estateName}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
                  allowFullScreen
                />
              </div>
            ) : tourImages.length > 0 ? (
              <div className="space-y-3">
                <VirtualTourSimulator estateName={estateName} images={tourImages} />
                <p className="text-sm text-muted-foreground">
                  Interactive photo simulation for feature preview. It is not captured 360° media or
                  a substitute for an in-person inspection.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed p-8 text-center space-y-3">
                <View className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  A virtual walkthrough of {estateName} isn't available yet. Book an inspection to
                  tour it in person.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
