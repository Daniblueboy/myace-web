import type { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import { MapPin, Home, ShieldCheck, ArrowLeft, View } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EstateOfferings from '@/components/estates/EstateOfferings';
import EstateGallery from '@/components/estates/EstateGallery';
import { EstateHeroCarousel } from '@/components/estates/EstateHeroCarousel';
import { Reveal } from '@/components/motion/Reveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const estate = await fetchAPI(`/estates/${slug}`).catch(() => null);

  if (!estate) {
    return { title: 'Estate Not Found' };
  }

  const description =
    (estate.description as string | undefined)?.slice(0, 155) ||
    `${estate.name} — an Aceroyal Estates development in ${[estate.city, estate.state].filter(Boolean).join(', ')}.`;

  return {
    title: estate.name,
    description,
    alternates: { canonical: `/estates/${slug}` },
    openGraph: estate.coverImage ? { images: [estate.coverImage] } : undefined,
  };
}

export default async function EstateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const estate = await fetchAPI(`/estates/${slug}`).catch(() => null);

  if (!estate) {
    return (
      <div className="container py-24 text-center space-y-4">
        <h1 className="text-3xl font-bold">Estate not found</h1>
        <p className="text-muted-foreground">
          This estate may have been removed or is not yet published.
        </p>
        <Button asChild variant="outline">
          <Link href="/estates">Back to Estates</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container py-12 md:py-16 space-y-10">
        <div>
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/estates">
              <ArrowLeft className="h-4 w-4" /> Back to Estates
            </Link>
          </Button>
        </div>
        <div className="rounded-3xl bg-white dark:bg-slate-900 border dark:border-slate-800 overflow-hidden">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 space-y-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Estate Spotlight</p>
                  {estate.status && (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        estate.status === 'SOLD_OUT'
                          ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {estate.status === 'SOLD_OUT' ? 'Sold Out' : 'Available'}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">{estate.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{estate.city}, {estate.state}</span>
                </div>
                <p className="text-muted-foreground text-lg">
                  {estate.description || 'A master-planned estate with verified titles and modern infrastructure.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/book-inspection">Book Inspection</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={estate.brochureUrl || '/resources'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Brochure
                  </a>
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border bg-slate-50 dark:bg-slate-950 dark:border-slate-800 p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Home className="h-4 w-4" /> Available Units
                  </div>
                  <div className="text-2xl font-semibold mt-1">{estate.properties?.length || 0}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 dark:bg-slate-950 dark:border-slate-800 p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" /> Amenities
                  </div>
                  <div className="text-2xl font-semibold mt-1">{estate.amenities?.length || 0}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 dark:bg-slate-950 dark:border-slate-800 p-4">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="text-lg font-semibold mt-1">
                    {estate.status || 'Available'}
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative min-h-[280px] lg:min-h-full">
              <EstateHeroCarousel
                images={[...new Set([estate.coverImage, ...(estate.gallery || [])].filter(Boolean))]}
                alt={estate.name}
              />
            </div>
          </div>
        </div>

        <Reveal className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 space-y-4">
            <h2 className="text-2xl font-bold">Estate Highlights</h2>
            {estate.amenities && estate.amenities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {estate.amenities.map((amenity: string) => (
                  <span key={amenity} className="px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Infrastructure and title details will be published here. Contact us for a full brochure.
              </p>
            )}
          </div>
          <div className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 space-y-3">
            <h3 className="text-xl font-semibold">Inspection Schedule</h3>
            <p className="text-muted-foreground">
              Join our weekly site inspections to walk the estate, view available plots, and tour apartments.
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link href="/book-inspection">Book a Slot</Link>
            </Button>
          </div>
        </Reveal>

        {estate.videoUrl ? (
          <Reveal className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 space-y-4">
            <h2 className="text-2xl font-bold">Estate Launch Video</h2>
            <div className="aspect-video rounded-xl overflow-hidden border">
              {estate.videoUrl.includes('youtube') || estate.videoUrl.includes('vimeo') || estate.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={getEmbedUrl(estate.videoUrl)}
                  title={`Launch video for ${estate.name}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video controls playsInline preload="metadata" className="w-full h-full">
                  <source src={estate.videoUrl} type="video/mp4" />
                </video>
              )}
            </div>
          </Reveal>
        ) : null}

        <Reveal className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 space-y-4">
          <h2 className="text-2xl font-bold">Virtual Tour</h2>
          {estate.virtualTourUrl ? (
            <div className="aspect-video rounded-xl overflow-hidden border">
              <iframe
                src={getEmbedUrl(estate.virtualTourUrl)}
                title={`Virtual tour of ${estate.name}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-center space-y-3">
              <View className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">
                A virtual walkthrough of {estate.name} isn't available yet. Book an inspection to
                tour it in person.
              </p>
              <Button variant="outline" asChild>
                <Link href="/book-inspection">Book Inspection</Link>
              </Button>
            </div>
          )}
        </Reveal>

        <Reveal>
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <EstateGallery images={estate.gallery || []} />
        </Reveal>

        <Reveal className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 space-y-4">
          <h2 className="text-2xl font-bold">Estate FAQs</h2>
          {estate.faqs && estate.faqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {estate.faqs.map((faq: any) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground">
              FAQs will be published soon. Contact us for more details.
            </p>
          )}
        </Reveal>

        <Reveal>
          <h2 className="text-2xl font-bold mb-4">Available Options</h2>
          <EstateOfferings properties={estate.properties || []} />
        </Reveal>
      </div>
    </div>
  );
}
