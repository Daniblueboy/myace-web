import type { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import { MapPin, Home, ShieldCheck, ArrowLeft, View, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EstateOfferings from '@/components/estates/EstateOfferings';
import EstateGallery from '@/components/estates/EstateGallery';
import { EstateHeroCarousel } from '@/components/estates/EstateHeroCarousel';
import { Reveal } from '@/components/motion/Reveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VirtualTourSimulator } from '@/components/estates/VirtualTourSimulator';
import PropertyPanorama from '@/components/properties/PropertyPanorama';
import { ShareEstate } from '@/components/estates/ShareEstate';
import { RelatedEstates } from '@/components/estates/RelatedEstates';
import { getOfferingLabel } from '@/lib/estate-offerings';

const SITE_URL = 'https://aceroyalestates.com';

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

// Same embed conversion as getEmbedUrl, plus autoplay+mute params —
// browsers block non-muted autoplay outright, and starting muted (with
// controls still available to unmute) is what lets the video draw
// attention the moment this section scrolls into view.
function getAutoplayEmbedUrl(url: string) {
  const embed = getEmbedUrl(url);
  if (!embed) return embed;
  if (embed.includes('youtube.com/embed/')) return `${embed}${embed.includes('?') ? '&' : '?'}autoplay=1&mute=1&playsinline=1`;
  if (embed.includes('player.vimeo.com')) return `${embed}${embed.includes('?') ? '&' : '?'}autoplay=1&muted=1`;
  return embed;
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

  const title = `${estate.name} | Aceroyal Estates`;

  return {
    title: estate.name,
    description,
    alternates: { canonical: `/estates/${slug}` },
    openGraph: {
      title,
      description,
      url: `/estates/${slug}`,
      images: estate.coverImage ? [estate.coverImage] : undefined,
    },
    twitter: {
      title,
      description,
      images: estate.coverImage ? [estate.coverImage] : undefined,
    },
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

  const tourImages: string[] = [...new Set([estate.coverImage, ...(estate.gallery || [])].filter(Boolean))];
  const offeringLabel = getOfferingLabel(estate);

  return (
    <div className="min-h-screen">
      <div className="container py-12 md:py-16 space-y-10">
        <div>
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/estates">
              <ArrowLeft className="h-4 w-4" /> Back to Estates
            </Link>
          </Button>
        </div>
        <div className="rounded-3xl bg-white dark:bg-slate-900 border dark:border-slate-800 overflow-hidden">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 space-y-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
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
                  {offeringLabel && (
                    <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {offeringLabel}
                    </span>
                  )}
                  {/* Only Enquire sits up here with the status badge — the
                      rest of the CTAs stay in their original spot below the
                      description. */}
                  <Button size="sm" asChild>
                    <Link href={`/contact?estate=${estate.slug}&enquiry=PURCHASE`}>Enquire to Purchase</Link>
                  </Button>
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
              {/* nowrap + icon-only Brochure/Share keeps this one row on
                  every screen width instead of wrapping to a second line. */}
              <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scroll-hide">
                <Button asChild className="shrink-0">
                  <Link href={`/book-inspection?estate=${estate.slug}`}>Book Inspection</Link>
                </Button>
                <a
                  href={estate.brochureUrl || '/resources'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Brochure"
                  className="group inline-flex h-9 shrink-0 items-center overflow-hidden rounded-md border bg-background px-3 shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                >
                  <Download className="h-4 w-4 shrink-0" />
                  <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-[max-width,opacity,margin-left] duration-300 group-hover:ml-2 group-hover:max-w-[160px] group-hover:opacity-100">
                    Download Brochure
                  </span>
                </a>
                <div className="shrink-0">
                  <ShareEstate name={estate.name} url={`${SITE_URL}/estates/${estate.slug}`} iconOnly />
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:gap-3 lg:grid-cols-2">
                {estate.properties?.length ? (
                  <div className="shrink-0 w-[45%] snap-center rounded-xl border bg-slate-50 dark:bg-slate-950 dark:border-slate-800 p-4 lg:w-auto lg:shrink">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Home className="h-4 w-4" /> Available Units
                    </div>
                    <div className="text-2xl font-semibold mt-1">{estate.properties.length}</div>
                  </div>
                ) : null}
                <div className="shrink-0 w-[45%] snap-center rounded-xl border bg-slate-50 dark:bg-slate-950 dark:border-slate-800 p-4 lg:w-auto lg:shrink">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" /> Amenities
                  </div>
                  <div className="text-2xl font-semibold mt-1">{estate.amenities?.length || 0}</div>
                </div>
              </div>
            </div>
            <div className="group relative min-h-[280px] lg:min-h-full">
              <EstateHeroCarousel images={tourImages} alt={estate.name} />
            </div>
          </div>
        </div>

        {/* Video & Virtual Tour — promoted out of the Media tab to right
            after the header/description (was buried as the 2nd of four
            tabs); video autoplays (muted, per browser rules) so it catches
            attention as soon as it scrolls into view, and this is where the
            primary Book Inspection CTA for this block lives. */}
        {(estate.videoUrl ||
          estate.panoramaUrls?.length ||
          estate.virtualTourUrl ||
          tourImages.length > 0 ||
          (estate.gallery && estate.gallery.length > 0)) && (
          <Reveal>
            <div className="space-y-6">
              {estate.videoUrl && (
                <div className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Estate Launch Video</h2>
                  <div className="aspect-video rounded-xl overflow-hidden border">
                    {estate.videoUrl.includes('youtube') || estate.videoUrl.includes('vimeo') || estate.videoUrl.includes('youtu.be') ? (
                      <iframe
                        src={getAutoplayEmbedUrl(estate.videoUrl)}
                        title={`Launch video for ${estate.name}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video autoPlay muted loop playsInline controls preload="metadata" className="w-full h-full">
                        <source src={estate.videoUrl} type="video/mp4" />
                      </video>
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-2xl font-bold">Virtual Tour</h2>
                  {!estate.panoramaUrls?.length && !estate.virtualTourUrl && tourImages.length > 0 && (
                    <span className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      Sample preview
                    </span>
                  )}
                </div>
                {estate.panoramaUrls?.length ? (
                  <PropertyPanorama panoramaUrls={estate.panoramaUrls} estateName={estate.name} />
                ) : estate.virtualTourUrl ? (
                  <div className="aspect-video rounded-xl overflow-hidden border">
                    <iframe
                      src={getEmbedUrl(estate.virtualTourUrl)}
                      title={`Virtual tour of ${estate.name}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
                      allowFullScreen
                    />
                  </div>
                ) : tourImages.length > 0 ? (
                  <div className="space-y-3">
                    <VirtualTourSimulator estateName={estate.name} images={tourImages} />
                    <p className="text-sm text-muted-foreground">
                      Interactive photo simulation for feature preview. It is not captured 360° media or
                      a substitute for an in-person inspection.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed p-8 text-center space-y-3">
                    <View className="h-8 w-8 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      A virtual walkthrough of {estate.name} isn't available yet. Book an inspection to
                      tour it in person.
                    </p>
                  </div>
                )}
              </div>

              {estate.gallery && estate.gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                  <EstateGallery images={estate.gallery} />
                </div>
              )}

              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href={`/book-inspection?estate=${estate.slug}`}>Book Inspection</Link>
              </Button>
            </div>
          </Reveal>
        )}

        <Reveal>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="units">Available Units</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
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
                  <Link href={`/book-inspection?estate=${estate.slug}`}>Book a Slot</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="faqs" className="mt-6">
              <div className="rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 space-y-4">
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
              </div>
            </TabsContent>

            <TabsContent value="units" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Available Options</h2>
              <EstateOfferings properties={estate.properties || []} estateSlug={estate.slug} />
            </TabsContent>
          </Tabs>
        </Reveal>

        <Reveal>
          <RelatedEstates currentSlug={estate.slug} state={estate.state} />
        </Reveal>
      </div>
    </div>
  );
}
