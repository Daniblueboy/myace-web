'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { PlayCircle, ImageIcon, Images, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { GalleryItem } from '@/shared';

function getEmbedUrl(url: string) {
  if (!url) return url;
  if (url.includes('youtube.com/embed/') || url.includes('player.vimeo.com')) return url;
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split(/[?&]/)[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes('youtube.com/watch')) {
    const id = new URL(url).searchParams.get('v');
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes('vimeo.com/')) {
    const id = url.split('vimeo.com/')[1]?.split(/[?&]/)[0];
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }
  return url;
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoItem, setVideoItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  if (!items || items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-white dark:bg-slate-900 dark:border-slate-800 p-12 md:p-16 text-center max-w-2xl mx-auto">
        <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Photos and videos coming soon</h3>
        <p className="text-muted-foreground">
          We&apos;ll be sharing photos and videos here as they happen. Follow us on social media or
          check back soon.
        </p>
      </div>
    );
  }

  const images = items.filter((item) => item.mediaType === 'image');
  const videoCount = items.length - images.length;
  const imageSlides = images.map((item) => ({
    src: item.mediaUrl,
    title: item.title,
    description: item.estateName || undefined,
  }));
  const visibleItems = filter === 'all' ? items : items.filter((item) => item.mediaType === filter);
  const filters = [
    { value: 'all' as const, label: 'All media', icon: Images, count: items.length },
    { value: 'image' as const, label: 'Photos', icon: ImageIcon, count: images.length },
    ...(videoCount > 0 ? [{ value: 'video' as const, label: 'Videos', icon: Video, count: videoCount }] : []),
  ];

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground" aria-live="polite">Showing {visibleItems.length} {visibleItems.length === 1 ? 'moment' : 'moments'}</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
          {filters.map(({ value, label, icon: Icon, count }) => (
            <button key={value} type="button" onClick={() => setFilter(value)} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${filter === value ? 'border-primary bg-primary text-primary-foreground shadow-sm' : 'bg-background hover:border-primary/50 hover:text-primary'}`} aria-pressed={filter === value}>
              <Icon className="h-4 w-4" /> {label} <span className="opacity-70">{count}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Instagram/Snapchat-style explore grid: a dense, uniform 3-up mosaic
          with an occasional larger featured tile, scrolling with the page
          (not its own horizontal row) — every tile is a plain CSS aspect
          box, so grid-flow-dense just packs around the bigger ones without
          any JS masonry layout. */}
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-0.5 sm:gap-1 grid-flow-dense">
        {visibleItems.map((item, index) => {
          const featured = index % 7 === 0;
          return (
            <button
              key={item.id}
              type="button"
              className={`group relative aspect-square overflow-hidden bg-slate-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary dark:bg-slate-900 ${
                featured ? 'col-span-2 row-span-2' : ''
              }`}
              onClick={() => {
                if (item.mediaType === 'video') {
                  setVideoItem(item);
                } else {
                  setLightboxIndex(images.findIndex((img) => img.id === item.id));
                }
              }}
              aria-label={`${item.mediaType === 'video' ? 'Play' : 'View'} ${item.title}`}
            >
              <img
                src={item.mediaType === 'video' ? item.thumbnailUrl || item.mediaUrl : item.mediaUrl}
                alt={item.title}
                loading={index > 8 ? 'lazy' : 'eager'}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              {item.mediaType === 'video' && (
                <>
                  <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/25" />
                  <PlayCircle
                    className={`absolute inset-0 m-auto text-white/90 drop-shadow-lg ${featured ? 'h-14 w-14' : 'h-7 w-7'}`}
                  />
                </>
              )}
              <div className={`absolute inset-x-0 bottom-0 text-left ${featured ? 'p-4' : 'p-1.5'}`}>
                <p className={`font-semibold text-white line-clamp-1 ${featured ? 'text-sm' : 'text-[10px] leading-tight'}`}>
                  {item.title}
                </p>
                {item.estateName && (
                  <p className={`text-white/75 line-clamp-1 ${featured ? 'text-xs mt-0.5' : 'text-[9px]'}`}>
                    {item.estateName}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        index={lightboxIndex ?? 0}
        slides={imageSlides}
        plugins={[Captions]}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
      />

      <Dialog open={!!videoItem} onOpenChange={(open) => !open && setVideoItem(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <DialogTitle className="text-base font-semibold leading-tight">{videoItem?.title}</DialogTitle>
            {videoItem?.estateName && (
              <p className="text-sm text-muted-foreground mt-0.5">{videoItem.estateName}</p>
            )}
          </div>
          {videoItem && (
            <div className="aspect-video w-full">
              {videoItem.mediaUrl.includes('youtube') || videoItem.mediaUrl.includes('vimeo') ? (
                <iframe
                  src={getEmbedUrl(videoItem.mediaUrl)}
                  title={videoItem.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video controls playsInline preload="metadata" className="h-full w-full">
                  <source src={videoItem.mediaUrl} type="video/mp4" />
                </video>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
