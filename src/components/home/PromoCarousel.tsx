"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

type Promo = {
  id: string;
  title: string;
  message: string;
  details?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  linkUrl?: string | null;
};

export default function PromoCarousel({ promos }: { promos: Promo[] }) {
  const [activePromo, setActivePromo] = useState<Promo | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sortedPromos = useMemo(() => promos || [], [promos]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || sortedPromos.length < 2 || isPaused) return;
    const interval = setInterval(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;
      const firstCard = container.querySelector("[data-promo-card]") as HTMLDivElement | null;
      const step = firstCard ? firstCard.offsetWidth + 24 : container.clientWidth * 0.9;
      const next = container.scrollLeft + step;
      if (next >= maxScroll - 8) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [sortedPromos.length, isPaused]);

  return (
    <section className="container py-20 md:py-28">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Announcements</p>
          <h2 className="text-2xl md:text-3xl font-bold">Estate Updates & Promos</h2>
        </div>
        <p className="text-sm text-muted-foreground hidden md:block">Scroll for more</p>
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {sortedPromos.map((promo) => (
          <div
            key={promo.id}
            data-promo-card
            className="min-w-[320px] md:min-w-[520px] lg:min-w-[640px] bg-primary rounded-2xl overflow-hidden shadow-2xl snap-start"
          >
            <div className="grid md:grid-cols-[1.1fr_0.9fr] min-h-[340px]">
              <div className="p-8 flex flex-col justify-center text-white space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">{promo.title}</h2>
                <p className="text-primary-foreground/90 text-base md:text-lg">
                  {promo.message}
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setActivePromo(promo)}
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              {promo.videoUrl ? (
                <div className="min-h-[280px] relative">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    src={promo.videoUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent" />
                </div>
              ) : (
                <div
                  className="min-h-[280px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${promo.imageUrl || "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1400&q=80"})`,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!activePromo} onOpenChange={(open) => !open && setActivePromo(null)}>
        {activePromo ? (
          <DialogContent>
            <DialogClose className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>{activePromo.title}</DialogTitle>
              <DialogDescription>{activePromo.message}</DialogDescription>
            </DialogHeader>
            {(activePromo.videoUrl || activePromo.imageUrl) && (
              <div className="h-48 md:h-64 rounded-xl overflow-hidden border shrink-0">
                {activePromo.videoUrl ? (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    src={activePromo.videoUrl}
                  />
                ) : (
                  <img
                    src={activePromo.imageUrl || ""}
                    alt={activePromo.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}
            <div className="space-y-4 text-sm text-muted-foreground">
              {activePromo.details ? (
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(activePromo.details),
                  }}
                />
              ) : (
                <p>
                  Details for this announcement will be available soon. Contact our team for more information.
                </p>
              )}
            </div>
            <DialogFooter>
              <Button asChild>
                <Link href={activePromo.linkUrl || "/contact"}>Continue</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  );
}
