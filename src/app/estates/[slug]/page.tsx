import type { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import { MapPin, Home, ShieldCheck, ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EstateOfferings from '@/components/estates/EstateOfferings';
import { EstateHeroCarousel } from '@/components/estates/EstateHeroCarousel';
import { EstateMediaSection, type FlyerItem } from '@/components/estates/EstateMediaSection';
import { Reveal } from '@/components/motion/Reveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShareEstate } from '@/components/estates/ShareEstate';
import { RelatedEstates } from '@/components/estates/RelatedEstates';
import { getOfferingLabel, getAvailableCountLabel } from '@/lib/estate-offerings';
import { getVideoAspectRatio } from '@/lib/video-aspect-ratio';
import { AdaptiveVideoPlayer } from '@/components/media/AdaptiveVideoPlayer';
import type { Property, PropertyResource, PropertyMedia } from '@/shared';
import { SITE_URL, breadcrumbListJsonLd } from '@/lib/json-ld';

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
  const availableCountLabel = getAvailableCountLabel(estate);
  const isHostedVideo = (url: string) => url.includes('youtube') || url.includes('vimeo') || url.includes('youtu.be');
  const launchVideoAspectRatio = estate.videoUrl && isHostedVideo(estate.videoUrl)
    ? await getVideoAspectRatio(estate.videoUrl)
    : null;

  // Flyers/brochures pulled together from wherever they're catalogued —
  // the estate's own brochure, each linked property's resources, and (once
  // real data has it) property.media entries typed FLYER/BROCHURE — deduped
  // by URL since the same PDF sometimes gets linked from more than one spot.
  const flyerUrls = new Set<string>();
  const flyers: FlyerItem[] = [];
  const addFlyer = (title: string, url: string | null | undefined) => {
    if (!url || flyerUrls.has(url)) return;
    flyerUrls.add(url);
    flyers.push({ id: url, title, url });
  };
  addFlyer(`${estate.name} — Estate Brochure`, estate.brochureUrl);
  (estate.properties || []).forEach((property: Property) => {
    (property.resources || [])
      .filter((r: PropertyResource) => r.fileType === 'PDF' || /flyer|brochure/i.test(r.title))
      .forEach((r: PropertyResource) => addFlyer(r.title, r.url));
    (property.media || [])
      .filter((m: PropertyMedia) => m.type === 'FLYER' || m.type === 'BROCHURE')
      .forEach((m: PropertyMedia) => addFlyer(m.title || `${property.title} — Flyer`, m.url));
  });

  const prices = (estate.properties || [])
    .flatMap((property: Property) => (property.variants && property.variants.length > 0 ? property.variants : [property]))
    .map((item: any) => Number(item.price))
    .filter((price: number) => !Number.isNaN(price) && price > 0);
  const lowPrice = prices.length > 0 ? Math.min(...prices) : undefined;
  const highPrice = prices.length > 0 ? Math.max(...prices) : undefined;
  const absoluteImage = estate.coverImage
    ? estate.coverImage.startsWith('http')
      ? estate.coverImage
      : `${SITE_URL}${estate.coverImage}`
    : undefined;

  const estateJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: estate.name,
    description: estate.description || undefined,
    url: `${SITE_URL}/estates/${estate.slug}`,
    image: absoluteImage ? [absoluteImage] : undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: estate.city,
      addressRegion: estate.state,
      addressCountry: 'NG',
    },
    ...(lowPrice !== undefined && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'NGN',
        lowPrice,
        highPrice,
        availability:
          estate.status === 'SOLD_OUT' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      },
    }),
  };

  const breadcrumbJsonLd = breadcrumbListJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Estates', path: '/estates' },
    { name: estate.name, path: `/estates/${estate.slug}` },
  ]);

  return (
    <div className="min-h-screen">
      <script
        id="estate-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(estateJsonLd) }}
      />
      <script
        id="estate-breadcrumb-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
                  every screen width instead of wrapping to a second line.
                  Download sits last so its hover-expand never shoves a
                  sibling sideways — that shift is what read as "shaking"
                  when it sat between Book Inspection and Share. */}
              <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scroll-hide">
                <Button asChild className="shrink-0">
                  <Link href={`/book-inspection?estate=${estate.slug}`}>Book Inspection</Link>
                </Button>
                <div className="shrink-0">
                  <ShareEstate name={estate.name} url={`${SITE_URL}/estates/${estate.slug}`} iconOnly />
                </div>
                <a
                  href={estate.brochureUrl || '/resources'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Brochure"
                  className="group inline-flex h-9 shrink-0 items-center overflow-hidden rounded-md border bg-background px-3 shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                >
                  <Download className="h-4 w-4 shrink-0" />
                  <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-[max-width,opacity,margin-left] duration-300 lg:group-hover:ml-2 lg:group-hover:max-w-[90px] lg:group-hover:opacity-100">
                    Brochure
                  </span>
                </a>
              </div>
              {/* Always exactly 2 cards — a plain 2-col grid (not the
                  sitewide scroll-row pattern) so each cell can actually
                  shrink via minmax(0,1fr) instead of forcing a wider
                  min-content that overflowed the column on narrow phones.
                  Labels can still wrap to 2 lines on a narrow card (nowrap
                  reintroduces the overflow), so the label row reserves a
                  fixed height on both cards — that's what keeps the counts
                  aligned regardless of which label actually wraps. */}
              <div className="grid grid-cols-2 gap-3">
                {estate.properties?.length ? (
                  <div className="min-w-0 rounded-xl border bg-slate-50 dark:bg-slate-950 dark:border-slate-800 p-4">
                    <div className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground min-h-10 sm:min-h-5">
                      <Home className="h-4 w-4 shrink-0 mt-0.5" /> <span>{availableCountLabel}</span>
                    </div>
                    <div className="text-2xl font-semibold mt-1">{estate.properties.length}</div>
                  </div>
                ) : null}
                <div className="min-w-0 rounded-xl border bg-slate-50 dark:bg-slate-950 dark:border-slate-800 p-4">
                  <div className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground min-h-10 sm:min-h-5">
                    <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" /> <span>Amenities</span>
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

        {/* Estate Launch Video, then one unified Media section (virtual
            tour + photos + flyers behind a pill filter) instead of three
            always-stacked blocks — promoted out of the Media tab to right
            after the header/description; video autoplays (muted, per
            browser rules) so it catches attention as soon as it scrolls
            into view, and this is where the primary Book Inspection CTA
            for this block lives. */}
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
                  <AdaptiveVideoPlayer
                    src={estate.videoUrl}
                    embedSrc={isHostedVideo(estate.videoUrl) ? getAutoplayEmbedUrl(estate.videoUrl) : null}
                    title={`Launch video for ${estate.name}`}
                    initialAspectRatio={launchVideoAspectRatio}
                  />
                </div>
              )}

              <EstateMediaSection
                estateName={estate.name}
                panoramaUrls={estate.panoramaUrls}
                virtualTourEmbedUrl={estate.virtualTourUrl ? getEmbedUrl(estate.virtualTourUrl) : null}
                photos={estate.gallery || []}
                flyers={flyers}
              />

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
              <TabsTrigger value="units">{availableCountLabel}</TabsTrigger>
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
