'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
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
  const imageSlides = images.map((item) => ({ src: item.mediaUrl, title: item.title }));
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`group relative w-full overflow-hidden rounded-2xl border bg-slate-50 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-slate-900 dark:border-slate-800 ${index % 5 === 0 ? 'h-80 sm:row-span-2 sm:h-full sm:min-h-[344px]' : 'h-64'}`}
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
              loading={index > 2 ? 'lazy' : 'eager'}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
            {item.mediaType === 'video' && (
              <PlayCircle className="absolute inset-0 m-auto h-12 w-12 text-white/90 drop-shadow-lg" />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              {item.estateName && <p className="text-xs text-white/80">{item.estateName}</p>}
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        index={lightboxIndex ?? 0}
        slides={imageSlides}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
      />

      <Dialog open={!!videoItem} onOpenChange={(open) => !open && setVideoItem(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">{videoItem?.title}</DialogTitle>
          {videoItem && (
            <div className="aspect-video w-full">
              <iframe
                src={getEmbedUrl(videoItem.mediaUrl)}
                title={videoItem.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
