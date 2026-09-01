'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { PlayCircle, ImageIcon } from 'lucide-react';
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

  if (!items || items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-white dark:bg-slate-900 dark:border-slate-800 p-12 md:p-16 text-center max-w-2xl mx-auto">
        <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Photos and videos coming soon</h3>
        <p className="text-muted-foreground">
          We'll be sharing photos and videos here as they happen. Follow us on social media or
          check back soon.
        </p>
      </div>
    );
  }

  const images = items.filter((item) => item.mediaType === 'image');
  const imageSlides = images.map((item) => ({ src: item.mediaUrl, title: item.title }));

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="group relative h-64 w-full overflow-hidden rounded-xl border bg-slate-50 dark:bg-slate-900 dark:border-slate-800"
            onClick={() => {
              if (item.mediaType === 'video') {
                setVideoItem(item);
              } else {
                setLightboxIndex(images.findIndex((img) => img.id === item.id));
              }
            }}
          >
            <img
              src={item.mediaType === 'video' ? item.thumbnailUrl || item.mediaUrl : item.mediaUrl}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
            {item.mediaType === 'video' && (
              <PlayCircle className="absolute inset-0 m-auto h-12 w-12 text-white/90 drop-shadow-lg" />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
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
