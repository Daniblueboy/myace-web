import type { Estate, GalleryItem, Property, TeamMember, Testimonial } from '@/shared';

const now = '2026-01-01T00:00:00.000Z';
const brochureUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

// TODO(content): most estates below still use placeholder/stock imagery.
// Real photography exists on the live site but is inconsistently organized
// (mixed with generic stock photos even there) — needs sourcing from Daniel
// rather than scraped, so galleries/coverImage are approximate for now.
const estateImages = {
  alphaGardenCity: '/images/estates/alpha-garden-city.jpeg',
  placeholder1: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
  placeholder2: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  placeholder3: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
  placeholder4: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1200&q=80',
  placeholder5: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&w=1200&q=80',
};

// PRE-CUTOVER CHECKLIST: pricing baked into the descriptions below (Alpha
// Garden City, Heritage Estate, Eko Paragon Residence, Prime Boulevard Annex)
// is confirmed real per the client's own screenshots, but is promotional and
// time-sensitive — verify current rates with Aceroyal before go-live. This
// note was previously (wrongly) appended to the public-facing description
// text itself; moved here so it's visible to us, not site visitors.
export const fallbackEstates: Estate[] = [
  {
    id: 'fallback-estate-alpha-garden-city',
    name: 'Alpha Garden City',
    slug: 'alpha-garden-city',
    description:
      'Alpha Garden City is a thoughtfully planned, nature-forward residential community in Ibadan, designed around a simple idea: land should not just be owned, it should enhance life. Every acre is enriched with 10-15 fruit-bearing trees, forming a living orchard that improves air quality and creates a refreshing, green atmosphere.\n\nWellness is built into daily life here — nature walking trails, yoga and meditation platforms, cycling paths, and the Central Wellness Village (roughly 15-20 acres, with a holistic spa, wellness clinics, healthy dining, fitness studios, and retreat facilities), alongside an integrated golf course and family-friendly outdoor spaces.\n\nThe estate follows a low-density model — about one home per acre — with residential options spanning wellness villas, eco lodges, retirement homes, and serviced apartments.\n\nDeveloped by Aceroyal, whose track record includes Eko Paragon (a 104-unit development delivered in partnership with the Lagos State Government) and Downtown Lagos Commercial City.\n\nPrelaunch pricing: 500sqm from ₦3.5M, 1 acre (+1 plot free) from ₦12.5M. Initial deposit from ₦500K (500sqm) / ₦1.5M (1 acre).',
    state: 'Oyo',
    city: 'Ibadan',
    address: 'Ibadan, Oyo State',
    coverImage: estateImages.alphaGardenCity,
    panoramaUrls: ['/images/virtual-tours/alpha-garden-city-360.png'],
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/05/Alpha-Garden-City-Brochure-Plus.pdf',
    // Only the one real photo we have — removed the generic stock photos
    // that were standing in here, now that real flyers/pricing exist below.
    gallery: [estateImages.alphaGardenCity],
    status: 'ACTIVE',
    amenities: ['Golf Course', 'Wellness Spa', 'Yoga Hall', 'Healthy Restaurants', 'Gym Studio', 'Swimming Pool', 'Orchard Garden'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-heritage',
    name: 'Heritage Estate',
    slug: 'heritage-estate',
    description:
      'Heritage Estate (Obodo Oma) — the heartbeat of Coal City living. A premium residential and commercial estate strategically located in Ekwegbe Nike, Enugu State, one of the fastest-growing corridors in the Coal City, blending heritage, serenity, and modern living for homeowners and investors alike.\n\nThe estate comes with an approved layout and registered survey, guaranteeing secure ownership. Less than 5 minutes from Maduka University, Police Quarters, the Bio-Research Institute, and Ugwugo Roundabout, and about 15 minutes from Nike Lake.\n\nNow selling: 500sqm at ₦6M (₦1M initial deposit), 1 Acre at ₦30M (₦5M initial deposit).',
    state: 'Enugu',
    city: 'Nike',
    address: 'Ekwegbe Nike, Enugu State',
    // Real pricing flyer as the cover — no clean non-flyer photography yet,
    // so no generic stock stand-ins; gallery stays empty (the flyers/video
    // cover the Media section instead).
    coverImage: '/images/estates/heritage/heritage-flyer-500sqm.jpg',
    videoUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/01/Heritage-Enugu.mp4',
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/01/The-Heritage-Estate-Brochure.pdf',
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Electricity', 'Gate House', 'Parking Space', 'Good Security', 'Good Road', 'Drainage', 'Approved Layout', 'Registered Survey'],
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-edo-mega-city',
    name: 'Edo Mega City',
    slug: 'edo-mega-city',
    description:
      'Edo Mega City — "Indeed a Homecoming Project," where every square meter is a canvas for your dreams. The biggest and most secured private residential estate in Edo State, heavily guarded by the Army, curated to bring comfort, luxury living, and an oasis of modern elegance and nature.\n\nAvailable plot sizes: 450sqm (50ft x 100ft), 900sqm (100ft x 100ft, suited to a duplex), and 1 acre / 3,600sqm (a country home mansion plot). Your country home is 100% ready for development.\n\nPrelaunch pricing: 450sqm from ₦1.5M, 900sqm from ₦2.5M (₦500K initial deposit), 1 acre from ₦7.5M (₦1.5M initial deposit). Titled C of O / Government Allocation.',
    state: 'Edo',
    city: 'Benin City',
    address: 'Igue Uwangue Community, Off Aduwawa By-Pass, Benin City, Edo State',
    // Real pricing flyer as the cover — no clean non-flyer photography yet,
    // so no generic stock stand-ins; gallery stays empty (the flyers cover
    // the Media section instead).
    coverImage: '/images/estates/edo-mega-city/edo-flyer-prelaunch.jpg',
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/01/Edo-Mega-City-FAQ-Consent-Form-2.pdf',
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Army-Guarded Security', 'C of O Title', 'Investment Value', 'Quality Infrastructure'],
    offeringType: 'LAND',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-downtown-lagos-phase-2',
    name: 'Downtown Lagos Commercial City — Phase 2',
    slug: 'downtown-lagos-phase-2',
    description:
      'Downtown Commercial City Phase 2 follows the sold-out Phase 1 — a fast-rising commercial district hub in Labour City, Ibeju-Lekki, on the Coastal Road, in the heart of Lagos\'s growth corridor. This is where businesses will stand, traffic will grow, and property value will multiply.\n\nStrategic landmarks nearby: Lekki Free Trade Zone, Dangote Refinery, Lekki Deep Sea Port, and Lekki-Epe International Airport.\n\n500sqm: ₦45M land + ₦15M infrastructure & documentation = ₦60M total (₦5M initial deposit). 1,000sqm: ₦80M land + ₦20M infrastructure & documentation = ₦100M total (₦10M initial deposit). A 6-month installment plan (10% interest included) is also available. Titled C of O / Government Allocation.',
    state: 'Lagos',
    city: 'Ibeju-Lekki',
    address: 'Labour City, Ibeju-Lekki, Coastal Road, Lagos State',
    // Real pricing flyer as the cover — no clean non-flyer photography for
    // this one yet, so no generic stock stand-ins; gallery stays empty
    // rather than showing unrelated stock photos (the flyers/video cover
    // the Media section instead).
    coverImage: '/images/estates/downtown-lagos-phase-2/dt-flyer-500sqm.jpg',
    videoUrl: '/videos/downtown-lagos-phase-2.mp4',
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2025/03/Downtown-Brochure.pdf',
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Office Spaces', 'Health Care Facilities', 'Shopping Mall', 'Financial Districts', 'Exclusive Membership', 'Helipad', 'Restaurants'],
    offeringType: 'LAND',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-downtown-lagos',
    name: 'Downtown Lagos Commercial City — Phase 1',
    slug: 'downtown-lagos',
    description:
      'Downtown Lagos is a master-planned "city within a city" in the heart of Lagos, combining premium residential apartments and smart homes, a state-of-the-art business district, world-class shopping and entertainment, and green spaces and waterways. Phase 1 has sold out.',
    state: 'Lagos',
    city: 'Lagos',
    address: 'Lekki Coastal Road, Lagos',
    coverImage: estateImages.placeholder1,
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2025/03/Downtown-Brochure.pdf',
    gallery: [estateImages.placeholder1, estateImages.placeholder2, estateImages.placeholder4],
    status: 'SOLD_OUT',
    amenities: ['Business District', 'Green Spaces & Waterways', '24/7 Power', 'High-Speed Internet'],
    offeringType: 'LAND',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-eko-paragon',
    name: 'Eko Paragon Residence',
    slug: 'eko-paragon-residence',
    description:
      'A development by AceRoyal Estate Homes, in partnership with Lagos State Development & Property Corporation (LSDPC). Eko Paragon Residence is a premium hotel-residence development designed to deliver comfort, elegance, and modern convenience in one exceptional environment.\n\nLocated in the serene and secure Abijo G.R.A., Lagos, the estate offers a peaceful lifestyle with seamless access to the Lekki-Epe Expressway and major commercial hubs.\n\nThe development features thoughtfully designed 1-bedroom business suite apartments, 2-bedroom signature suite apartments, and 3-bedroom presidential terrace duplexes with BQ, each crafted with contemporary architecture, spacious interiors, quality finishes, and dedicated parking. Eko Paragon Residence offers a hotel-style living experience for homeowners, professionals, and investors seeking a refined lifestyle in Lagos.\n\nPricing: 1-bedroom business suite ₦85M (₦5M initial deposit), 2-bedroom signature suite ₦95M (₦10M initial deposit), 3-bedroom presidential terrace duplex + BQ ₦150M (₦20M initial deposit).',
    state: 'Lagos',
    city: 'Abijo',
    address: 'Abijo G.R.A., Lagos',
    // Real pricing flyer as the cover — no clean non-flyer photography yet,
    // so no generic stock stand-ins; gallery stays empty (the flyers/video
    // cover the Media section instead).
    coverImage: '/images/estates/eko-paragon/eko-flyer-pricing.jpg',
    videoUrl: '/videos/eko-paragon-progress.mp4',
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/01/EKO-PARAGON-MAIN-BROCHURE-1.pdf',
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Fitness Center', 'Swimming Pool', 'Landscaped Green Areas', 'Recreational Facilities', '24/7 Security', 'Uninterrupted Power Supply', 'Bio-Digester Waste System'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-prime-annex',
    name: 'Prime Boulevard Annex',
    slug: 'prime-annex',
    description:
      'Prime Boulevard Annex sits behind Prime Boulevard 1 in Gwagwalada, Abuja — a bubbling area close to Prime Boulevard 1, the University of Abuja, Nnamdi Azikiwe International Airport, and the University of Abuja Teaching Hospital, on a motorable, tarred road leading to the airport and specialist hospital.\n\nAvailable for residential (300sqm & 500sqm) and commercial (1000sqm) purposes, titled C of O.\n\nNow selling: 300sqm at ₦3M (₦1M initial deposit), 500sqm at ₦5M (₦1.5M initial deposit).',
    state: 'Abuja',
    city: 'Gwagwalada',
    address: 'Gwagwalada, Abuja (tarred road behind Prime Boulevard 1)',
    // Real pricing flyer as the cover — no clean non-flyer photography yet,
    // so no generic stock stand-ins; gallery stays empty (the flyers/video
    // cover the Media section instead).
    coverImage: '/images/estates/prime-annex/prime-flyer-pricing.jpg',
    videoUrl: '/videos/prime-annex.mp4',
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/01/PRIME-BOULEVARD-ANNEX-CONSENT-FORM-AND-FAQS.pdf',
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Perimeter Fencing', 'Maximum Security', 'Stable Electricity', 'Maximum Water Supply', 'Good Drainage', 'Good Road Network', 'Estate Gate House', 'Shopping Complex'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-villa-nova',
    name: 'Villa Nova Bungalows',
    slug: 'villa-nova-bungalows',
    description:
      'Villa Nova Bungalows — "The Villa Life, Reimagined." Modern 3-bedroom bungalows in Idera Scheme, Eleko, Lagos, with clean water and power supply, a swimming pool, tennis court, and green spaces throughout. Titled C of O.\n\nNow selling: 3-Bedroom Bungalow at ₦94M, 3-Bedroom Bungalow + Private Pool at ₦120M.',
    state: 'Lagos',
    city: 'Eleko',
    address: 'Idera Scheme, Eleko, Lagos',
    coverImage: '/images/estates/villa-nova/villa-nova-gate.jpg',
    brochureUrl: null,
    gallery: [
      '/images/estates/villa-nova/villa-nova-gate.jpg',
      '/images/estates/villa-nova/villa-nova-exterior-day.jpg',
      '/images/estates/villa-nova/villa-nova-exterior-dusk.jpg',
      '/images/estates/villa-nova/villa-nova-street-1.jpg',
      '/images/estates/villa-nova/villa-nova-street-2.jpg',
      '/images/estates/villa-nova/villa-nova-entry.jpg',
      '/images/estates/villa-nova/villa-nova-3d-aerial.jpg',
    ],
    status: 'ACTIVE',
    amenities: ['Clean Water Supply', 'Power Supply', 'Swimming Pool', 'Tennis Court', 'Green Spaces', 'Prime Location'],
    featured: true,
    // Genuinely the most recent addition (added today) — other estates
    // share the placeholder `now` timestamp, so this is deliberately later
    // to sort first wherever estates are ordered newest-first.
    createdAt: '2026-09-16T00:00:00.000Z',
    updatedAt: '2026-09-16T00:00:00.000Z',
  },
];

export const fallbackProperties: Property[] = [
  {
    id: 'fallback-property-duplex',
    title: 'Luxury 4 Bedroom Duplex',
    slug: 'luxury-4-bedroom-duplex-lekki',
    description: 'A modern duplex offering generous living spaces, estate security, backup power, and easy access to Lekki business corridors.',
    type: 'APARTMENT',
    status: 'AVAILABLE',
    price: 150000000,
    currency: 'NGN',
    state: 'Lagos',
    city: 'Lekki',
    address: 'Admiralty Way, Lekki Phase 1',
    bedrooms: 4,
    bathrooms: 5,
    size: '450sqm',
    amenities: ['Swimming Pool', 'CCTV', 'Backup Power', 'Security'],
    featured: true,
    latitude: 6.4474,
    longitude: 3.4723,
    // Placeholder real-estate stock clip — same stable, verified-embeddable
    // YouTube video used elsewhere as a placeholder (see the
    // gallery/testimonial usages below), not real footage of this property.
    videoUrl: 'https://www.youtube.com/watch?v=2lufRODAVPM',
    images: [
      {
        id: 'fallback-property-duplex-image',
        url: estateImages.placeholder2,
        altText: 'Luxury duplex exterior',
      },
      {
        id: 'fallback-property-duplex-image-2',
        url: estateImages.placeholder1,
        altText: 'Luxury duplex living area',
      },
      {
        id: 'fallback-property-duplex-image-3',
        url: estateImages.placeholder3,
        altText: 'Luxury duplex street view',
      },
    ],
    variants: [
      {
        id: 'fallback-duplex-variant-4bed',
        label: '4 Bedroom Duplex',
        price: 150000000,
        currency: 'NGN',
        bedrooms: 4,
        bathrooms: 5,
        size: '450sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
      },
      {
        id: 'fallback-duplex-installment',
        label: '4 Bedroom Duplex Payment Plan',
        price: 165000000,
        currency: 'NGN',
        bedrooms: 4,
        bathrooms: 5,
        size: '450sqm',
        sizeUnit: 'SQM',
        paymentType: 'INSTALLMENT',
        upfrontPercent: 30,
        installmentMonths: 12,
        installmentAmount: 9600000,
        active: true,
      },
    ],
    faqs: [
      {
        id: 'fallback-property-faq-1',
        question: 'Can I schedule an inspection?',
        answer: 'Yes. Use the booking form or contact the sales team to confirm the next inspection slot.',
      },
    ],
    resources: [
      {
        id: 'fallback-property-resource-1',
        title: 'Property Brochure',
        fileType: 'PDF',
        url: brochureUrl,
      },
    ],
    // Not actually an Eko Paragon unit (generic Lekki duplex, unrelated
    // location/specs) — was only ever linked here as a placeholder.
    // Unlinked now that Eko Paragon has its real 1/2/3-bedroom units below.
    estateId: null,
    estate: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    // Replaced the old generic "Prime Estate Land, Gwarinpa" placeholder
    // (wrong location, wrong price - never actually matched this estate)
    // with the real Prime Boulevard Annex plot sizes/pricing.
    id: 'fallback-property-land',
    title: 'Prime Boulevard Annex — 300sqm / 500sqm Plots',
    slug: 'prime-boulevard-annex-plots',
    description: 'Residential and commercial plots at Prime Boulevard Annex, Gwagwalada, Abuja — 300sqm, 500sqm, or 1000sqm (commercial), titled C of O.',
    type: 'LAND',
    status: 'AVAILABLE',
    price: 3000000,
    currency: 'NGN',
    state: 'Abuja',
    city: 'Gwagwalada',
    address: 'Gwagwalada, Abuja (tarred road behind Prime Boulevard 1)',
    bedrooms: null,
    bathrooms: null,
    size: '300sqm',
    amenities: ['Perimeter Fencing', 'Maximum Security', 'Stable Electricity', 'Maximum Water Supply', 'Good Drainage', 'Good Road Network', 'Estate Gate House', 'Shopping Complex'],
    featured: true,
    images: [
      {
        id: 'fallback-property-land-image',
        url: '/images/estates/prime-annex/prime-flyer-pricing.jpg',
        altText: 'Prime Boulevard Annex',
      },
    ],
    variants: [
      {
        id: 'fallback-land-variant-300',
        label: '300sqm — Outright',
        price: 3000000,
        currency: 'NGN',
        size: '300sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-prime-payment-300-v', type: 'FLYER', title: 'Prime Boulevard Annex — 300sqm Payment Plan', url: '/images/estates/prime-annex/prime-payment-300sqm.jpg' },
        ],
      },
      {
        id: 'fallback-land-variant-300-installment',
        label: '300sqm — 6-Month Plan',
        price: 3300000,
        currency: 'NGN',
        size: '300sqm',
        sizeUnit: 'SQM',
        paymentType: 'INSTALLMENT',
        upfrontPercent: 15,
        installmentMonths: 6,
        installmentAmount: 466000,
        active: true,
      },
      {
        id: 'fallback-land-variant-500',
        label: '500sqm — Outright',
        price: 5000000,
        currency: 'NGN',
        size: '500sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-prime-payment-500-v', type: 'FLYER', title: 'Prime Boulevard Annex — 500sqm Payment Plan', url: '/images/estates/prime-annex/prime-payment-500sqm.jpg' },
        ],
      },
      {
        id: 'fallback-land-variant-500-installment',
        label: '500sqm — 6-Month Plan',
        price: 5500000,
        currency: 'NGN',
        size: '500sqm',
        sizeUnit: 'SQM',
        paymentType: 'INSTALLMENT',
        upfrontPercent: 18,
        installmentMonths: 6,
        installmentAmount: 750000,
        active: true,
      },
    ],
    faqs: [
      {
        id: 'fallback-land-faq-1',
        question: 'Are payment plans available?',
        answer: 'Yes. Payment-plan availability depends on the estate phase and allocation size.',
      },
    ],
    resources: [
      {
        id: 'fallback-land-resource-1',
        title: 'Estate Brochure',
        fileType: 'PDF',
        url: 'https://aceroyalestates.com/wp-content/uploads/2026/01/PRIME-BOULEVARD-ANNEX-CONSENT-FORM-AND-FAQS.pdf',
      },
    ],
    media: [
      { id: 'fallback-prime-payment-300', type: 'FLYER', title: 'Prime Boulevard Annex — 300sqm Payment Plan', url: '/images/estates/prime-annex/prime-payment-300sqm.jpg' },
      { id: 'fallback-prime-payment-500', type: 'FLYER', title: 'Prime Boulevard Annex — 500sqm Payment Plan', url: '/images/estates/prime-annex/prime-payment-500sqm.jpg' },
    ],
    estateId: 'fallback-estate-prime-annex',
    estate: fallbackEstates.find((e) => e.slug === 'prime-annex'),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-property-alpha-garden-plot',
    title: 'Alpha Garden City — 500sqm / 1 Acre Plots',
    slug: 'alpha-garden-city-500sqm-plot',
    description: 'Prelaunch plots at Alpha Garden City, a low-density, orchard-style residential community in Ibadan — 500sqm or 1 acre (+1 plot free).',
    type: 'LAND',
    status: 'AVAILABLE',
    price: 3500000,
    currency: 'NGN',
    state: 'Oyo',
    city: 'Ibadan',
    address: 'Ibadan, Oyo State',
    bedrooms: null,
    bathrooms: null,
    size: '500sqm',
    amenities: ['Golf Course', 'Wellness Spa', 'Yoga Hall', 'Healthy Restaurants', 'Gym Studio', 'Swimming Pool', 'Orchard Garden'],
    featured: false,
    images: [
      {
        id: 'fallback-property-alpha-garden-plot-image',
        url: estateImages.alphaGardenCity,
        altText: 'Alpha Garden City plot',
      },
    ],
    variants: [
      {
        id: 'fallback-alpha-garden-variant-500sqm',
        label: '500sqm Plot',
        price: 3500000,
        currency: 'NGN',
        size: '500sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-alpha-garden-flyer-500-v', type: 'FLYER', title: 'Alpha Garden City — 500sqm Pricing', url: '/images/estates/alpha-garden-city/alpha-flyer-500sqm.jpg' },
        ],
      },
      {
        id: 'fallback-alpha-garden-variant-1acre',
        label: '1 Acre (+1 Plot Free)',
        price: 12500000,
        currency: 'NGN',
        size: '1 Acre',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-alpha-garden-flyer-1acre-v', type: 'FLYER', title: 'Alpha Garden City — 1 Acre Pricing', url: '/images/estates/alpha-garden-city/alpha-flyer-1acre.jpg' },
        ],
      },
    ],
    faqs: [],
    resources: [
      {
        id: 'fallback-alpha-garden-resource-1',
        title: 'Estate Brochure',
        fileType: 'PDF',
        url: 'https://aceroyalestates.com/wp-content/uploads/2026/05/Alpha-Garden-City-Brochure-Plus.pdf',
      },
    ],
    media: [
      { id: 'fallback-alpha-garden-flyer-1', type: 'FLYER', title: 'Alpha Garden City — 500sqm Pricing', url: '/images/estates/alpha-garden-city/alpha-flyer-500sqm.jpg' },
      { id: 'fallback-alpha-garden-flyer-2', type: 'FLYER', title: 'Alpha Garden City — 1 Acre Pricing', url: '/images/estates/alpha-garden-city/alpha-flyer-1acre.jpg' },
      { id: 'fallback-alpha-garden-flyer-3', type: 'FLYER', title: 'Alpha Garden City — Pricing Overview', url: '/images/estates/alpha-garden-city/alpha-flyer-pricing-combined.jpg' },
    ],
    estateId: 'fallback-estate-alpha-garden-city',
    estate: fallbackEstates.find((e) => e.slug === 'alpha-garden-city'),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-property-heritage-plot',
    title: 'Heritage Estate — 500sqm / 1 Acre Plots',
    slug: 'heritage-estate-500sqm-plot',
    description: 'Serviced plots at Heritage Estate (Obodo Oma), Ekwegbe Nike, Enugu State — 500sqm or 1 acre, approved layout, registered survey.',
    type: 'LAND',
    status: 'AVAILABLE',
    price: 6000000,
    currency: 'NGN',
    state: 'Enugu',
    city: 'Nike',
    address: 'Ekwegbe Nike, Enugu State',
    bedrooms: null,
    bathrooms: null,
    size: '500sqm',
    amenities: ['Electricity', 'Gate House', 'Parking Space', 'Good Security', 'Good Road', 'Drainage'],
    featured: false,
    images: [
      {
        id: 'fallback-property-heritage-plot-image',
        url: '/images/estates/heritage/heritage-flyer-500sqm.jpg',
        altText: 'Heritage Estate plot',
      },
    ],
    variants: [
      {
        id: 'fallback-heritage-variant-500sqm',
        label: '500sqm Plot',
        price: 6000000,
        currency: 'NGN',
        size: '500sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-heritage-payment-500sqm-v', type: 'FLYER', title: 'Heritage Estate — 500sqm Payment Plan', url: '/images/estates/heritage/heritage-payment-500sqm.jpg' },
        ],
      },
      {
        id: 'fallback-heritage-variant-1acre',
        label: '1 Acre',
        price: 30000000,
        currency: 'NGN',
        size: '1 Acre',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-heritage-flyer-1acre-v', type: 'FLYER', title: 'Heritage Estate — 1 Acre Pricing', url: '/images/estates/heritage/heritage-flyer-1acre.jpg' },
          { id: 'fallback-heritage-payment-1acre-v', type: 'FLYER', title: 'Heritage Estate — 1 Acre Payment Plan', url: '/images/estates/heritage/heritage-payment-1acre.jpg' },
        ],
      },
    ],
    faqs: [],
    resources: [
      {
        id: 'fallback-heritage-resource-1',
        title: 'Estate Brochure',
        fileType: 'PDF',
        url: 'https://aceroyalestates.com/wp-content/uploads/2026/01/The-Heritage-Estate-Brochure.pdf',
      },
    ],
    media: [
      { id: 'fallback-heritage-flyer-1acre', type: 'FLYER', title: 'Heritage Estate — 1 Acre Pricing', url: '/images/estates/heritage/heritage-flyer-1acre.jpg' },
      { id: 'fallback-heritage-payment-500sqm', type: 'FLYER', title: 'Heritage Estate — 500sqm Payment Plan', url: '/images/estates/heritage/heritage-payment-500sqm.jpg' },
      { id: 'fallback-heritage-payment-1acre', type: 'FLYER', title: 'Heritage Estate — 1 Acre Payment Plan', url: '/images/estates/heritage/heritage-payment-1acre.jpg' },
    ],
    estateId: 'fallback-estate-heritage',
    estate: fallbackEstates.find((e) => e.slug === 'heritage-estate'),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-property-villa-nova-bungalow',
    title: 'Villa Nova — 3-Bedroom Bungalow',
    slug: 'villa-nova-3-bedroom-bungalow',
    description: 'A modern 3-bedroom bungalow at Villa Nova, Idera Scheme, Eleko, Lagos — clean water and power supply, swimming pool, tennis court, and green spaces. Titled C of O.',
    type: 'APARTMENT',
    status: 'AVAILABLE',
    price: 94000000,
    currency: 'NGN',
    state: 'Lagos',
    city: 'Eleko',
    address: 'Idera Scheme, Eleko, Lagos',
    bedrooms: 3,
    bathrooms: null,
    size: null,
    amenities: ['Clean Water Supply', 'Power Supply', 'Swimming Pool', 'Tennis Court', 'Green Spaces'],
    featured: true,
    images: [
      { id: 'fallback-villa-nova-image-1', url: '/images/estates/villa-nova/villa-nova-exterior-day.jpg', altText: 'Villa Nova bungalow exterior' },
      { id: 'fallback-villa-nova-image-2', url: '/images/estates/villa-nova/villa-nova-exterior-dusk.jpg', altText: 'Villa Nova bungalow at dusk' },
    ],
    variants: [
      {
        id: 'fallback-villa-nova-variant-standard',
        label: '3-Bedroom Bungalow',
        price: 94000000,
        currency: 'NGN',
        bedrooms: 3,
        paymentType: 'OUTRIGHT',
        active: true,
      },
      {
        id: 'fallback-villa-nova-variant-pool',
        label: '3-Bedroom Bungalow + Private Pool',
        price: 120000000,
        currency: 'NGN',
        bedrooms: 3,
        paymentType: 'OUTRIGHT',
        active: true,
      },
    ],
    faqs: [],
    resources: [],
    media: [
      { id: 'fallback-villa-nova-flyer-1', type: 'FLYER', title: 'Villa Nova Flyer — Pricing', url: '/images/estates/villa-nova/villa-nova-flyer-1.jpg' },
      { id: 'fallback-villa-nova-flyer-2', type: 'FLYER', title: 'Villa Nova Flyer — 3-Bedroom Overview', url: '/images/estates/villa-nova/villa-nova-flyer-2.jpg' },
      { id: 'fallback-villa-nova-flyer-3', type: 'FLYER', title: 'Villa Nova Flyer — Amenities', url: '/images/estates/villa-nova/villa-nova-flyer-3.jpg' },
      { id: 'fallback-villa-nova-flyer-4', type: 'FLYER', title: 'Villa Nova Flyer — Full Details', url: '/images/estates/villa-nova/villa-nova-flyer-4.jpg' },
    ],
    estateId: 'fallback-estate-villa-nova',
    estate: fallbackEstates.find((e) => e.slug === 'villa-nova-bungalows'),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-property-downtown-phase2-plot',
    title: 'Downtown Lagos Phase 2 — 500sqm / 1,000sqm Plots',
    slug: 'downtown-lagos-phase-2-plots',
    description: 'Commercial-district plots at Downtown Lagos Commercial City Phase 2, Labour City, Ibeju-Lekki — 500sqm or 1,000sqm, outright or a 6-month installment plan.',
    type: 'LAND',
    status: 'AVAILABLE',
    price: 60000000,
    currency: 'NGN',
    state: 'Lagos',
    city: 'Ibeju-Lekki',
    address: 'Labour City, Ibeju-Lekki, Coastal Road, Lagos State',
    bedrooms: null,
    bathrooms: null,
    size: '500sqm',
    amenities: ['Office Spaces', 'Health Care Facilities', 'Shopping Mall', 'Financial Districts', 'Exclusive Membership', 'Helipad', 'Restaurants'],
    featured: true,
    images: [
      { id: 'fallback-downtown-phase2-image-1', url: estateImages.placeholder3, altText: 'Downtown Lagos Phase 2' },
    ],
    variants: [
      {
        id: 'fallback-downtown-phase2-variant-500-outright',
        label: '500sqm — Outright',
        price: 60000000,
        currency: 'NGN',
        size: '500sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-downtown-phase2-flyer-500-v', type: 'FLYER', title: 'Downtown Lagos Phase 2 — 500sqm Pricing', url: '/images/estates/downtown-lagos-phase-2/dt-flyer-500sqm.jpg' },
          { id: 'fallback-downtown-phase2-flyer-payment-500-v', type: 'FLYER', title: 'Downtown Lagos Phase 2 — Payment Plan', url: '/images/estates/downtown-lagos-phase-2/dt-flyer-payment-plan.jpg' },
        ],
      },
      {
        id: 'fallback-downtown-phase2-variant-500-installment',
        label: '500sqm — 6-Month Plan',
        price: 66000000,
        currency: 'NGN',
        size: '500sqm',
        sizeUnit: 'SQM',
        paymentType: 'INSTALLMENT',
        upfrontPercent: 8,
        installmentMonths: 6,
        installmentAmount: 10166667,
        active: true,
      },
      {
        id: 'fallback-downtown-phase2-variant-1000-outright',
        label: '1,000sqm — Outright',
        price: 100000000,
        currency: 'NGN',
        size: '1000sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-downtown-phase2-flyer-1000-v', type: 'FLYER', title: 'Downtown Lagos Phase 2 — 1,000sqm Pricing', url: '/images/estates/downtown-lagos-phase-2/dt-flyer-1000sqm.jpg' },
          { id: 'fallback-downtown-phase2-flyer-payment-1000-v', type: 'FLYER', title: 'Downtown Lagos Phase 2 — Payment Plan', url: '/images/estates/downtown-lagos-phase-2/dt-flyer-payment-plan.jpg' },
        ],
      },
      {
        id: 'fallback-downtown-phase2-variant-1000-installment',
        label: '1,000sqm — 6-Month Plan',
        price: 110000000,
        currency: 'NGN',
        size: '1000sqm',
        sizeUnit: 'SQM',
        paymentType: 'INSTALLMENT',
        upfrontPercent: 9,
        installmentMonths: 6,
        installmentAmount: 16666667,
        active: true,
      },
    ],
    faqs: [],
    resources: [],
    media: [
      { id: 'fallback-downtown-phase2-flyer-1', type: 'FLYER', title: 'Downtown Lagos Phase 2 — 500sqm Pricing', url: '/images/estates/downtown-lagos-phase-2/dt-flyer-500sqm.jpg' },
      { id: 'fallback-downtown-phase2-flyer-2', type: 'FLYER', title: 'Downtown Lagos Phase 2 — 1,000sqm Pricing', url: '/images/estates/downtown-lagos-phase-2/dt-flyer-1000sqm.jpg' },
      { id: 'fallback-downtown-phase2-flyer-3', type: 'FLYER', title: 'Downtown Lagos Phase 2 — Payment Plan', url: '/images/estates/downtown-lagos-phase-2/dt-flyer-payment-plan.jpg' },
    ],
    estateId: 'fallback-estate-downtown-lagos-phase-2',
    estate: fallbackEstates.find((e) => e.slug === 'downtown-lagos-phase-2'),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-property-eko-paragon-1bed',
    title: 'Eko Paragon — 1 Bedroom Business Suite',
    slug: 'eko-paragon-1-bedroom-business-suite',
    description: 'A 1-bedroom business suite at Eko Paragon Residence, Abijo G.R.A., Lagos — contemporary architecture, quality finishes, dedicated parking, hotel-style amenities.',
    type: 'APARTMENT',
    status: 'AVAILABLE',
    price: 85000000,
    currency: 'NGN',
    state: 'Lagos',
    city: 'Abijo',
    address: 'Abijo G.R.A., Lagos',
    bedrooms: 1,
    bathrooms: null,
    size: null,
    amenities: ['Fitness Center', 'Swimming Pool', '24/7 Security', 'Uninterrupted Power Supply'],
    featured: false,
    images: [{ id: 'fallback-eko-1bed-image', url: '/images/estates/eko-paragon/eko-flyer-pricing.jpg', altText: 'Eko Paragon 1 Bedroom Business Suite' }],
    variants: [
      {
        id: 'fallback-eko-1bed-variant-outright',
        label: '1 Bedroom — Outright',
        price: 85000000,
        currency: 'NGN',
        bedrooms: 1,
        paymentType: 'OUTRIGHT',
        active: true,
      },
      {
        id: 'fallback-eko-1bed-variant-installment',
        label: '1 Bedroom — 12-Month Plan',
        price: 93500000,
        currency: 'NGN',
        bedrooms: 1,
        paymentType: 'INSTALLMENT',
        upfrontPercent: 5,
        installmentMonths: 12,
        installmentAmount: 7375000,
        active: true,
      },
    ],
    faqs: [],
    resources: [],
    media: [
      { id: 'fallback-eko-pricing-flyer', type: 'FLYER', title: 'Eko Paragon — Pricing Overview', url: '/images/estates/eko-paragon/eko-flyer-pricing.jpg' },
      { id: 'fallback-eko-1bed-flyer', type: 'FLYER', title: 'Eko Paragon — 1 Bedroom Payment Plan', url: '/images/estates/eko-paragon/eko-payment-plan-1bed.jpg' },
    ],
    estateId: 'fallback-estate-eko-paragon',
    estate: fallbackEstates.find((e) => e.slug === 'eko-paragon-residence'),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-property-eko-paragon-2bed',
    title: 'Eko Paragon — 2 Bedroom Signature Suite',
    slug: 'eko-paragon-2-bedroom-signature-suite',
    description: 'A 2-bedroom signature suite at Eko Paragon Residence, Abijo G.R.A., Lagos — contemporary architecture, quality finishes, dedicated parking, hotel-style amenities.',
    type: 'APARTMENT',
    status: 'AVAILABLE',
    price: 95000000,
    currency: 'NGN',
    state: 'Lagos',
    city: 'Abijo',
    address: 'Abijo G.R.A., Lagos',
    bedrooms: 2,
    bathrooms: null,
    size: null,
    amenities: ['Fitness Center', 'Swimming Pool', '24/7 Security', 'Uninterrupted Power Supply'],
    featured: true,
    images: [{ id: 'fallback-eko-2bed-image', url: '/images/estates/eko-paragon/eko-flyer-pricing.jpg', altText: 'Eko Paragon 2 Bedroom Signature Suite' }],
    variants: [
      {
        id: 'fallback-eko-2bed-variant-outright',
        label: '2 Bedroom — Outright',
        price: 95000000,
        currency: 'NGN',
        bedrooms: 2,
        paymentType: 'OUTRIGHT',
        active: true,
      },
      {
        id: 'fallback-eko-2bed-variant-installment',
        label: '2 Bedroom — 12-Month Plan',
        price: 104500000,
        currency: 'NGN',
        bedrooms: 2,
        paymentType: 'INSTALLMENT',
        upfrontPercent: 10,
        installmentMonths: 12,
        installmentAmount: 7875000,
        active: true,
      },
    ],
    faqs: [],
    resources: [],
    media: [
      { id: 'fallback-eko-2bed-flyer', type: 'FLYER', title: 'Eko Paragon — 2 Bedroom Payment Plan', url: '/images/estates/eko-paragon/eko-payment-plan-2bed.jpg' },
    ],
    estateId: 'fallback-estate-eko-paragon',
    estate: fallbackEstates.find((e) => e.slug === 'eko-paragon-residence'),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-property-eko-paragon-3bed',
    title: 'Eko Paragon — 3 Bedroom Presidential Terrace Duplex + BQ',
    slug: 'eko-paragon-3-bedroom-presidential-terrace-duplex',
    description: 'A 3-bedroom presidential terrace duplex with BQ at Eko Paragon Residence, Abijo G.R.A., Lagos — contemporary architecture, quality finishes, dedicated parking, hotel-style amenities.',
    type: 'APARTMENT',
    status: 'AVAILABLE',
    price: 150000000,
    currency: 'NGN',
    state: 'Lagos',
    city: 'Abijo',
    address: 'Abijo G.R.A., Lagos',
    bedrooms: 3,
    bathrooms: null,
    size: null,
    amenities: ['Fitness Center', 'Swimming Pool', '24/7 Security', 'Uninterrupted Power Supply'],
    featured: false,
    images: [{ id: 'fallback-eko-3bed-image', url: '/images/estates/eko-paragon/eko-flyer-pricing.jpg', altText: 'Eko Paragon 3 Bedroom Presidential Terrace Duplex' }],
    variants: [
      {
        id: 'fallback-eko-3bed-variant-outright',
        label: '3 Bedroom + BQ — Outright',
        price: 150000000,
        currency: 'NGN',
        bedrooms: 3,
        paymentType: 'OUTRIGHT',
        active: true,
      },
      {
        id: 'fallback-eko-3bed-variant-installment',
        label: '3 Bedroom + BQ — 12-Month Plan',
        price: 165000000,
        currency: 'NGN',
        bedrooms: 3,
        paymentType: 'INSTALLMENT',
        upfrontPercent: 12,
        installmentMonths: 12,
        installmentAmount: 12083000,
        active: true,
      },
    ],
    faqs: [],
    resources: [],
    media: [
      { id: 'fallback-eko-3bed-flyer', type: 'FLYER', title: 'Eko Paragon — 3 Bedroom Payment Plan', url: '/images/estates/eko-paragon/eko-payment-plan-3bed.jpg' },
    ],
    estateId: 'fallback-estate-eko-paragon',
    estate: fallbackEstates.find((e) => e.slug === 'eko-paragon-residence'),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-property-edo-mega-plot',
    title: 'Edo Mega City — 450sqm / 900sqm / 1 Acre Plots',
    slug: 'edo-mega-city-plots',
    description: 'Prelaunch plots at Edo Mega City, Igue Uwangue Community, Off Aduwawa By-Pass, Benin City — 450sqm, 900sqm (duplex-ready), or 1 acre (country home mansion plot).',
    type: 'LAND',
    status: 'AVAILABLE',
    price: 2500000,
    currency: 'NGN',
    state: 'Edo',
    city: 'Benin City',
    address: 'Igue Uwangue Community, Off Aduwawa By-Pass, Benin City, Edo State',
    bedrooms: null,
    bathrooms: null,
    size: '900sqm',
    amenities: ['Army-Guarded Security', 'C of O Title'],
    featured: true,
    images: [{ id: 'fallback-edo-mega-image', url: '/images/estates/edo-mega-city/edo-flyer-prelaunch.jpg', altText: 'Edo Mega City' }],
    variants: [
      {
        id: 'fallback-edo-mega-variant-450',
        label: '450sqm (50ft x 100ft)',
        price: 1500000,
        currency: 'NGN',
        size: '450sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-edo-mega-flyer-450-v', type: 'FLYER', title: 'Edo Mega City — 450sqm Pricing', url: '/images/estates/edo-mega-city/edo-flyer-450sqm.jpg' },
        ],
      },
      {
        id: 'fallback-edo-mega-variant-900-outright',
        label: '900sqm (100ft x 100ft) — Outright',
        price: 2500000,
        currency: 'NGN',
        size: '900sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-edo-mega-flyer-900-v', type: 'FLYER', title: 'Edo Mega City — 900sqm Pricing', url: '/images/estates/edo-mega-city/edo-flyer-900sqm.jpg' },
          { id: 'fallback-edo-mega-flyer-payment-900-v', type: 'FLYER', title: 'Edo Mega City — Payment Plan', url: '/images/estates/edo-mega-city/edo-flyer-payment-plan.jpg' },
        ],
      },
      {
        id: 'fallback-edo-mega-variant-900-installment',
        label: '900sqm — 6-Month Plan',
        price: 2750000,
        currency: 'NGN',
        size: '900sqm',
        sizeUnit: 'SQM',
        paymentType: 'INSTALLMENT',
        upfrontPercent: 18,
        installmentMonths: 6,
        installmentAmount: 375000,
        active: true,
      },
      {
        id: 'fallback-edo-mega-variant-1acre-outright',
        label: '1 Acre (3,600sqm) — Outright',
        price: 7500000,
        currency: 'NGN',
        size: '1 Acre',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-edo-mega-flyer-1acre-v', type: 'FLYER', title: 'Edo Mega City — 1 Acre Pricing', url: '/images/estates/edo-mega-city/edo-flyer-1acre.jpg' },
          { id: 'fallback-edo-mega-flyer-payment-1acre-v', type: 'FLYER', title: 'Edo Mega City — Payment Plan', url: '/images/estates/edo-mega-city/edo-flyer-payment-plan.jpg' },
        ],
      },
      {
        id: 'fallback-edo-mega-variant-1acre-installment',
        label: '1 Acre — 6-Month Plan',
        price: 8250000,
        currency: 'NGN',
        size: '1 Acre',
        paymentType: 'INSTALLMENT',
        upfrontPercent: 18,
        installmentMonths: 6,
        installmentAmount: 1125000,
        active: true,
      },
    ],
    faqs: [],
    resources: [],
    media: [
      { id: 'fallback-edo-mega-flyer-450', type: 'FLYER', title: 'Edo Mega City — 450sqm Pricing', url: '/images/estates/edo-mega-city/edo-flyer-450sqm.jpg' },
      { id: 'fallback-edo-mega-flyer-900', type: 'FLYER', title: 'Edo Mega City — 900sqm Pricing', url: '/images/estates/edo-mega-city/edo-flyer-900sqm.jpg' },
      { id: 'fallback-edo-mega-flyer-1acre', type: 'FLYER', title: 'Edo Mega City — 1 Acre Pricing', url: '/images/estates/edo-mega-city/edo-flyer-1acre.jpg' },
      { id: 'fallback-edo-mega-flyer-payment', type: 'FLYER', title: 'Edo Mega City — Payment Plan', url: '/images/estates/edo-mega-city/edo-flyer-payment-plan.jpg' },
    ],
    estateId: 'fallback-estate-edo-mega-city',
    estate: fallbackEstates.find((e) => e.slug === 'edo-mega-city'),
    createdAt: now,
    updatedAt: now,
  },
];

fallbackEstates.forEach((estate) => {
  estate.properties = fallbackProperties.filter((p) => p.estateId === estate.id);
});

fallbackEstates.forEach((estate) => {
  estate.faqs = [
    {
      id: `${estate.id}-faq-1`,
      question: 'Are documents available for review?',
      answer: 'Yes. The sales team can provide brochure, title, and payment-plan details during enquiry or inspection.',
      sortOrder: 0,
    },
  ];
});

// Real posts pulled from the live blog (most recent 6, matching what the
// live homepage features). 20 older posts (2022-2025) not migrated yet.
// TODO(content): cover images are still placeholder Unsplash photos - the
// live posts' own images weren't cleanly resolved during this pass.
export const fallbackBlogPosts = [
  {
    id: 'fallback-blog-downtown-phase-2-launch',
    title: 'Beyond the Carnival, the Rise of Downtown Lagos Commercial City Phase 2',
    slug: 'beyond-the-carnival-downtown-lagos-commercial-city-phase-2',
    excerpt: 'What the Downtown Lagos Commercial City Phase 2 launch event revealed about the project beyond the celebration.',
    content:
      'What unfolded at Downtown Lagos Commercial City Phase 2 wasn\'t just a gathering, a celebration, or even a launch event. It was an experience, one that blended energy, people, and possibility into something far more meaningful than a typical carnival. From the moment guests arrived, there was a noticeable difference. The atmosphere was alive, not just with music and color, but with curiosity. People weren\'t just there to have fun, they came to explore, connect, and understand what Downtown Lagos Commercial City Phase 2 is truly becoming.\n\n![Guests at the Downtown Lagos Commercial City Phase 2 launch](/images/blog/downtown-phase-2-launch/launch-group-photo.jpg)\n\nThe launch of Downtown Lagos Commercial City Phase 2 marked more than the unveiling of a new development, it introduced a commercial land in Lagos positioned for relevance, growth, and long term value. While the carnival brought energy, music, games, and a vibrant crowd, it was only a glimpse into the bigger picture. Beyond the excitement was a clear message, Downtown Lagos is a destination for business and investment opportunity.\n\n![Carnival dancers at the Downtown Lagos Commercial City Phase 2 launch](/images/blog/downtown-phase-2-launch/carnival-dancers.jpg)\n\nStrategically located just minutes from the Dangote Refinery and in close proximity to the Calabar Coastal Road, Downtown Lagos Commercial City Phase 2 sits within a fast rising economic corridor. As infrastructure expands and commercial activity increases, property value in this axis is expected to appreciate significantly, making it a prime choice for real estate investment in Lagos.\n\nOwning a plot here is not just about buying land, it is about securing a position within a future commercial center. For investors and business owners, early entry into developments like this often defines long term advantage.\n\nCurrently, plots are still available at pre launch prices, extended until May 1st:\n\n500sqm, ₦30,000,000\n\n1000sqm, ₦55,000,000\n\nOn and after May 1st:\n\n500sqm, ₦60,000,000\n\n1000sqm, ₦100,000,000\n\nThis is more than a price change, it reflects the projected growth and rising demand within the area. From a marketing standpoint, moments like this define opportunity. The difference between early adopters and late buyers is often timing, and right now, that window is still open.\n\n![Aerial view of the Downtown Lagos Commercial City Phase 2 site](/images/blog/downtown-phase-2-launch/aerial-site-view.jpg)\n\nDowntown Lagos Commercial City Phase 2 is not just expanding commercial space. It is creating a hub where business, visibility, and future value intersect. And for those paying attention, this is the moment to buy land in Lagos and act fast.',
    coverImageUrl: '/images/blog/downtown-phase-2-launch/carnival-dancers.jpg',
    published: true,
    createdAt: '2026-04-20T00:00:00.000Z',
    updatedAt: '2026-04-20T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-eleko-land',
    title: 'Why Smart Investors Are Rushing to Buy Land in Eleko',
    slug: 'why-smart-investors-are-rushing-to-buy-land-in-eleko',
    excerpt: 'Why Eleko, along the Lekki-Epe corridor, is drawing early investors ahead of Lekki- and Ajah-style price growth.',
    content:
      'If you\'ve been thinking about real estate lately, chances are you\'ve heard people mention Eleko more than once. And honestly, it\'s not by accident. A lot of people are starting to look beyond the usual places like Lekki and Ajah. Not because those places are not good, but because the real opportunity now is getting in early somewhere that is still growing. That\'s exactly why smart investors are beginning to buy land in Eleko. Let me break it down for you in a way that actually makes sense.\n\n![Aerial view of the growing Eleko corridor](/images/blog/eleko-land/aerial-corridor.jpg)\n\nEleko is where Lagos is moving next\n\nLagos keeps expanding. It doesn\'t stop. What used to be considered "far" a few years ago is now fully developed and expensive. We\'ve seen it happen with Lekki, Ajah, even Sangotedo. Right now, that same movement is heading towards Eleko. So when people are searching for land for sale in Eleko Lagos, what they\'re really trying to figure out is this — "Am I getting in at the right time?" And the honest answer is yes, you still are.\n\nThe price of land in Eleko is still at entry level\n\nLet\'s talk about what really matters to most people, price. The price of land in Eleko is still relatively affordable compared to other parts of Lagos on the same axis. That\'s not a weakness. That\'s actually the opportunity. Because what happens over time is simple. As development increases, prices follow. It\'s not sudden, but it\'s consistent. This is why people who understand real estate don\'t wait until an area is fully developed. They move while it\'s still accessible.\n\n![A surveyed land plot in Eleko](/images/blog/eleko-land/land-plot.jpg)\n\nPeople are not just buying to build anymore\n\nSomething has changed in how people invest. Before, most people only wanted land when they were ready to start building immediately. Now, more people are buying land just to hold. They buy, leave it for a few years, and come back to meet a higher value.\n\nThat\'s exactly why you\'ll keep seeing searches like buy land in Eleko trending. People are thinking long term now.\n\nLocation still matters and Eleko checks out\n\nOne thing you should never ignore is location. Eleko sits along the Lekki Epe corridor, which is already one of the fastest developing parts of Lagos. Accessibility is improving, developments are moving outward, and naturally, demand follows. That\'s why more people are actively searching for land for sale in Eleko, not just anywhere in Lagos.\n\n![A plot marker on site at Downtown Lagos Commercial City](/images/blog/eleko-land/plot-marker.jpg)\n\nSuccess and Proven delivery\n\nOne major confidence point for investors is that Phase 1 of Downtown Lagos Commercial City was a success. Allocations were successfully completed, and all clients received their plots as promised. This track record of delivery builds trust and shows that the project is not just conceptual, it is structured, active, and reliable.\n\n![Clients on a site inspection at Downtown Lagos Commercial City](/images/blog/eleko-land/site-inspection.jpg)\n\nConclusion\n\nInstead of just buying random land, investors are now looking for something more structured. With Downtown Lagos Commercial City, you\'re not just buying land. You\'re buying into a planned environment within Eleko that is designed for growth. Everything about it is intentional. From documentation to layout to long term value. So when someone is comparing different options for land for sale in Eleko Lagos, this is where the difference becomes clear. It is not just about owning land. It is about owning the right kind of land.',
    coverImageUrl: '/images/blog/eleko-land/aerial-corridor.jpg',
    published: true,
    createdAt: '2026-04-15T00:00:00.000Z',
    updatedAt: '2026-04-15T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-millionaires-secret',
    title: 'The Secret Investment That’s Creating Millionaires',
    slug: 'the-secret-investment-thats-creating-millionaires',
    excerpt: 'How hotel-residence investments like Eko Paragon Residence offer passive rental income without landlord headaches.',
    content:
      'Savvy investors are earning passive income by owning hotel residences rather than managing traditional Airbnbs directly. Not all short-term rental investments are worth it — some drain your time and resources, while the right hotel residence gives high returns with zero effort.\n\n![Eko Paragon Residence pre-launch pricing](/images/blog/eko-millionaires/pricing-flyer.jpg)\n\nEko Paragon Residence, an upcoming five-star hotel residence in Abijo GRA, Lagos, developed by Aceroyal Estate Homes in partnership with LSDPC, offers a fully managed system: the hotel team handles marketing, guest experience, and maintenance, while the owner simply enjoys rental income.\n\nWith a hotel residence like Eko Paragon, investors can expect steady, predictable income, plus appreciating property value in Abijo GRA — earning both rental income and long-term value growth.\n\nPre-launch prices at Eko Paragon Residence are the lowest they\'ll ever be. Now is the best time to invest before the market value jumps.',
    coverImageUrl: '/images/blog/eko-millionaires/pricing-flyer.jpg',
    published: true,
    createdAt: '2025-04-01T00:00:00.000Z',
    updatedAt: '2025-04-01T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-land-banking',
    title: 'Land Banking: The Smartest Investment You’ll Regret Not Making',
    slug: 'land-banking-the-smartest-investment-youll-regret-not-making',
    excerpt: 'Why buying and holding land in high-growth areas like Legacy Garden City and Edo Mega City builds long-term wealth.',
    content:
      'Imagine buying land for ₦150,000 a few years ago and watching it appreciate to over ₦3 million today.\n\nSounds unbelievable? That’s exactly what happened to Overcomer Ibeson, our in-house Architect and Site Manager. His investment decision transformed into generational wealth, while many others missed out.\n\nThis is the power of Land Banking — the strategic purchase of land in high-growth areas, held for future value appreciation. If you’re still waiting for the “right time” to invest, this is your wake-up call: the right time is NOW.\n\nWhy Land Banking is the Ultimate Wealth-Building Strategy\n\nUnlike cars or gadgets that lose value over time, land is an appreciating asset. Lagos, Abuja, and Benin are expanding rapidly, turning today’s outskirts into tomorrow’s prime real estate.\n\n![Legacy Garden City Phase 2 — secured land investment pricing](/images/blog/land-banking/legacy-garden-city-flyer.jpg)\n\nTake Legacy Garden City and Edo Mega City — both are located in developing regions with massive infrastructural projects underway. In 3 to 5 years, landowners here will see exponential returns, just like Overcomer.\n\nThe High Cost of Waiting\n\nMany Nigerians in the diaspora regret not buying land years ago when prices were lower. While they waited, others secured their future.\n\nAt Aceroyal Estate Homes, we’ve helped hundreds of investors, including those in the diaspora, secure land without fear of scams. Our clients testify to our integrity and trustworthiness, a rarity in the real estate industry.\n\nDon’t be the one saying, “I wish I had invested earlier.”',
    coverImageUrl: '/images/blog/land-banking/legacy-garden-city-flyer.jpg',
    published: true,
    createdAt: '2025-03-25T00:00:00.000Z',
    updatedAt: '2025-03-25T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-nigerian-real-estate-getting-started',
    title: 'Thinking of Investing in Nigerian Real Estate? Here’s the Right Way to Get Started',
    slug: 'thinking-of-investing-in-nigerian-real-estate-here-is-the-right-way-to-get-started',
    excerpt: 'A practical checklist for diaspora and first-time investors: goals, location, paperwork, and starting small.',
    content:
      'If you’ve been paying attention to global trends, you already know that the cost of living in the West is going up while stability is going down.\n\nRent prices are through the roof, jobs are uncertain, and the dream of homeownership keeps getting harder. More Nigerians abroad are beginning to ask the big question — is it time to invest back home?\n\nIf that thought has crossed your mind, you’re on the right track. Real estate in Nigeria is one of the smartest investments you can make, but only if you do it the right way. Buying property is not like ordering online and hoping it arrives. You need a strategy. Let’s break it down.\n\nStart with a Clear Goal\n\nAre you buying for yourself, looking to rent it out, or planning to hold the land until the value skyrockets? Lagos, for example, never stops growing. Places like Lekki and Ajah were once bush, but today a single plot can buy you a house in some parts of the US. Imagine if you had bought land there ten years ago.\n\n![True wealth is found in Eko Paragon Residence](/images/blog/nigerian-real-estate-getting-started/eko-paragon-cta.jpg)\n\nPick the Right Location\n\nNot all properties are worth your money. Some areas promise rapid growth, while others stay the same for decades. Lagos, Abuja, and even Benin City have hotspots where land value doubles every few years.\n\nIf you’ve been watching the Lekki-Epe corridor, you already know what’s happening. The Lekki Free Trade Zone, Dangote Refinery, and the proposed airport are turning this region into Nigeria’s real estate jackpot. Smart investors are already securing plots before the prices explode.\n\nVerify the Paperwork\n\nNothing stings more than sending millions home, only to find out the land you paid for belongs to three different people. Before buying, always check for a C of O, Governor’s Consent, or a proper Deed of Assignment. If the documentation isn’t clear, walk away.\n\nStart Small and Grow\n\nIf you’re not ready for a big investment, start with a plot, develop it gradually, and scale up. Land doesn’t depreciate.\n\nWhether you’re abroad or right here in Nigeria, one thing is clear — owning property is always a smart move. If the uncertainty overseas has you thinking about securing something back home, now is the time to act.\n\nCall Aceroyal Estate Homes today and let’s get you started.',
    coverImageUrl: '/images/blog/nigerian-real-estate-getting-started/eko-paragon-cta.jpg',
    published: true,
    createdAt: '2025-03-17T00:00:00.000Z',
    updatedAt: '2025-03-17T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-integrity',
    title: 'The Secret Ingredient to Real Estate Success No One’s Talking About',
    slug: 'the-secret-ingredient-to-real-estate-success-no-one-is-talking-about',
    excerpt: 'Why transparency and honest communication — not hype — are what actually build buyer trust in Nigerian real estate.',
    content:
      'Investors really dislike hidden fees, any kind of misrepresentation, or surprises about property issues.\n\nThey value honesty and transparency above all. Just be upfront — it’s that simple.\n\nWhen you explore property investment opportunities, you quickly learn that integrity is non-negotiable. Buyers and investors are extra cautious, particularly in the Nigerian property market.\n\nThink about it. When you walk into a real estate office, you expect clear and honest communication. No hidden fees, no confusing fine print, just straightforward answers. This type of openness is what creates confidence in buyers and investors.\n\nIn a country where many are searching for affordable real estate Nigeria offers, knowing that you are dealing with a reputable developer makes all the difference.\n\nWhen a developer consistently demonstrates honesty, they build trust. This trust is the foundation for long-lasting relationships that naturally turn clients into brand evangelists.\n\nAt AceRoyal Estates, we have worked hard to establish our brand as a beacon of integrity in the Nigerian property market. Our commitment to transparency means every transaction is handled with care so that our clients receive exactly what they are promised. We have earned our reputation by choosing honesty over hype.\n\nWhen you ask top search engines how to invest in Nigerian property or how to avoid real estate scams Nigeria, the answer always comes back to trust and reliability. At AceRoyal Estates, we stand out because we put integrity at the heart of everything we do.\n\nUltimately, whether you are entering the Nigerian property market as a first-time buyer or as a seasoned investor, remember that integrity is the key.\n\nLet’s get you started on your next real estate investment. Call now for a free consultation.',
    coverImageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2025-03-15T00:00:00.000Z',
    updatedAt: '2025-03-15T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-aceroyal-name-story',
    title: 'What’s in a Name? The Story Behind AceRoyal',
    slug: 'whats-in-a-name-the-story-behind-aceroyal',
    excerpt: 'The meaning behind the AceRoyal name — leadership, Edo heritage, and a vision for Nigerian real estate.',
    content:
      'Have you ever stopped to think about the meaning behind a name? A name is more than just a label — it carries history, purpose, and a vision for the future.\n\nFor AceRoyal Group, our name is a reflection of our roots, values, and commitment to excellence in real estate.\n\nThe Origin of “AceRoyal”\n\nThe name AceRoyal isn’t just a brand, it’s a legacy.\n\n![The AceRoyal team on site](/images/blog/aceroyal-name-story/team-site-visit.jpg)\n\n“Ace” comes from the initials of our founder, Dr. Agonor Cletus Endurance. It represents leadership, excellence, and a determination to be the best in everything we do.\n\n“Royal” is a tribute to his proud Edo heritage, a culture deeply rooted in dignity, strength, and leadership. It symbolizes the trust, prestige, and integrity that define every transaction, every development, and every client relationship at AceRoyal.\n\nTogether, AceRoyal represents a vision of prosperity and service to humanity — a vision that has grown into one of Nigeria’s most trusted real estate brands.\n\nA Legacy in the Making\n\nWhat’s in a name? For us, it’s everything. It’s a story of vision, heritage, and a relentless pursuit of excellence. It’s a name that stands for trust, quality, and a future where homeownership is not a privilege, but a right.\n\nWhether you’re looking to buy, invest, or build, AceRoyal Estate Homes is here to guide you every step of the way.\n\nWelcome to AceRoyal — where dreams become reality, and legacies are built.',
    coverImageUrl: '/images/blog/aceroyal-name-story/team-site-visit.jpg',
    published: true,
    createdAt: '2025-03-06T00:00:00.000Z',
    updatedAt: '2025-03-06T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-allocation-day',
    title: 'Land Ownership Made Easy: Why Allocation Day Matters',
    slug: 'land-ownership-made-easy-why-allocation-day-matters',
    excerpt: 'What happens at Aceroyal’s quarterly Allocation Day, and why walking your plot matters.',
    content:
      'Allocation Day is the moment your land goes from "something you paid for" to something you can actually stand on. At Aceroyal Estate Homes, we hold this every three months.\n\nOn Allocation Day, licensed surveyors who drafted the survey plans guide you through your land’s exact location and boundaries. Documents are signed on-site with the Admin team, so there’s no back-and-forth or weeks of waiting. It’s also a chance to meet future neighbors and fellow investors — and yes, there’s lunch.',
    coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2025-02-24T00:00:00.000Z',
    updatedAt: '2025-02-24T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-lagos-vs-abuja',
    title: 'Lagos vs. Abuja: Where Should You Invest in Real Estate in 2025?',
    slug: 'lagos-vs-abuja-where-should-you-invest-in-real-estate-in-2025',
    excerpt: 'Comparing Lagos’s fast-paced growth against Abuja’s stability — and which fits which kind of investor.',
    content:
      'Lagos is fast-paced, high-demand real estate: over 20 million people, growing development hubs like Ibeju-Lekki and Abijo GRA, and major infrastructure (Lekki-Epe Expressway, Fourth Mainland Bridge, Dangote Refinery) pushing property values up daily. Best picks: Eko Paragon Residence (Abijo GRA) for rental income, Legacy Garden City Phase 2 (Imota) for land banking.\n\nAbuja is calmer and more structured — government presence means steady, long-term investment security, with land banking opportunities in areas like Gwagwalada and Kuje still affordable but appreciating. Best pick: Prime Boulevard Annex (Gwagwalada).\n\nChoose Lagos for fast-paced, high-demand real estate and rental income; choose Abuja for stability, exclusivity, and government-backed security. Both are goldmines — it depends on your goals.',
    coverImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2025-02-17T00:00:00.000Z',
    updatedAt: '2025-02-17T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-lose-money-lagos',
    title: 'Why Most People Lose Money in Lagos Real Estate—And How to Avoid It',
    slug: 'why-most-people-lose-money-in-lagos-real-estate-and-how-to-avoid-it',
    excerpt: 'Common due-diligence mistakes that cost Lagos land buyers their investment, and how to avoid them.',
    content:
      'A common story: a buyer thought he’d secured a prime plot by the roadside in Ibeju-Lekki, only to discover at allocation that the land belonged to the government, marked for a future road expansion. His entire investment was gone — the result of skipping due diligence.\n\nAvoid "too good to be true" deals — research market prices and buy from reputable developers with full documentation. Never pay without proper documentation: get a Contract of Sale or Deed of Assignment, and pay into a corporate account, not a personal one. Think long-term — real wealth in Lagos real estate comes from patience and appreciation, not quick flips.',
    coverImageUrl: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2025-02-11T00:00:00.000Z',
    updatedAt: '2025-02-11T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-is-lagos-still-good',
    title: 'Is Lagos Real Estate Still a Good Investment in 2025?',
    slug: 'is-lagos-real-estate-still-a-good-investment-in-2025',
    excerpt: 'Population growth, infrastructure projects, and rental demand behind Lagos’s continued property boom.',
    content:
      'Lagos real estate remains one of Nigeria’s most profitable investments — thousands relocate to the city daily, pushing demand for land and housing higher. Areas like Ibeju-Lekki, Epe, and Lekki Phase 2 have seen major appreciation, while Ikorodu and Ajah are becoming investor favorites.\n\nMajor infrastructure projects — the Imota Rice Mill, Fourth Mainland Bridge, and Lagos-Calabar Coastal Road — are driving demand further. Rental income is strong too, from short-let apartments to commercial properties, giving landlords steady cash flow.\n\nThe risk is choosing the wrong developer — delayed projects and poor-quality builds are common, so buy from a company with a proven track record and full transparency.',
    coverImageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2025-02-04T00:00:00.000Z',
    updatedAt: '2025-02-04T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-hotel-residences',
    title: 'Luxury Living, Lucrative Returns: Lagos Hotel Residences',
    slug: 'luxury-living-lucrative-returns-lagos-hotel-residences',
    excerpt: 'Inside Eko Paragon Residence — furnished suites, hotel-style amenities, and short/long-term rental income.',
    content:
      'AceRoyal Estate Homes, in partnership with the Lagos State Development & Property Corporation (LSDPC) and Gidi Homes, presents Eko Paragon Residence — furnished 1, 2, or 3-bedroom apartments and suites available for short-term or long-term rental.\n\nAmenities include 24/7 power supply, valet parking, 24/7 security, a state-of-the-art health center, cinema, high-speed Wi-Fi, an Olympic-size swimming pool, dedicated concierge services, and eco-friendly energy efficiency.\n\nAs Lagos continues to attract international businesses and high-net-worth individuals, the appeal of hotel residences as a stable, profitable rental asset class will only increase.',
    coverImageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2025-01-27T00:00:00.000Z',
    updatedAt: '2025-01-27T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-stop-dreaming',
    title: 'Stop Dreaming, Start Doing: Build Real Wealth This Year',
    slug: 'stop-dreaming-start-doing-build-real-wealth-this-year',
    excerpt: 'The AceRoyal Investment Plan — Appreciate, Capitalize, Enhance — for turning financial goals into action.',
    content:
      'Financial goals are easy to set and hard to follow through on. The AceRoyal Investment Plan breaks it into three steps:\n\nAppreciate — land banking in rapidly developing areas like Legacy Garden City, Imota, Ikorodu, and Edo Mega City, where land value consistently appreciates over time.\n\nCapitalize — invest in Eko Paragon Residence for passive rental income from short- and long-term residents, with the management team handling tenant screening, maintenance, and cleaning.\n\nEnhance — diversify across both land banking and hotel-residence investments to strengthen portfolio stability and returns.',
    coverImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-land-titles',
    title: 'Land Titles and Why They Matter',
    slug: 'land-titles-and-why-they-matter',
    excerpt: 'What a registered survey is, why it’s required before any land title, and how Aceroyal handles the paperwork.',
    content:
      'A land title is the official document proving land ownership — in Nigeria this includes the Certificate of Occupancy (C of O), Right of Occupancy (R of O), Freehold, and others. A registered survey — a map of the land’s exact boundaries, dimensions, and location, filed with the state’s Office of the Surveyor-General — is a prerequisite for obtaining any of them.\n\nA registered survey provides clarity (no boundary disputes), is essential for obtaining a land title, and gives peace of mind that the land is free of government acquisition or other claims.\n\nAceroyal Estates Homes handles the full process — engaging certified surveyors, submitting documents to the right authorities, and keeping clients informed — so every property sold is free from government encumbrances, adverse claimants, and communal issues.',
    coverImageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2024-09-15T00:00:00.000Z',
    updatedAt: '2024-09-15T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-brg-partnership',
    title: 'Aceroyal Estates Forges Strategic Partnership With the Billionaire Realtor Group',
    slug: 'aceroyal-estates-forges-strategic-partnership-with-the-billionaire-realtor-group',
    excerpt: 'Aceroyal Estates partners with Africa’s leading brokerage firm to expand reach across West Africa.',
    content:
      'AceRoyal Estates Limited announced an official partnership with The Billionaire Realtor Group (BRG), described as Africa’s leading brokerage firm, to strengthen market presence, elevate sales, and enhance delivery capabilities across West Africa.\n\nCEO Dr. Endurance Agonor said: "In an era where collaboration should supersede competition, our partnership with The Billionaire Realtor Group is proof of our commitment to revolutionizing the real estate market. By pooling our resources and expertise, we are not only expanding our reach but also exploring real estate investment opportunities in Africa."\n\nBRG brings deep expertise in luxury homes across Africa and a wide network of high-net-worth clients, positioning the partnership to expand the range of premium real estate solutions available to clients.',
    coverImageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2023-12-11T00:00:00.000Z',
    updatedAt: '2023-12-11T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-ceo-award',
    title: 'Dr. Endurance Agonor Appointed President of the Africa Under 40 CEO Forum',
    slug: 'dr-endurance-agonor-ceo-of-aceroyal-estates-becomes-president-of-africa-under-40-ceo-forum',
    excerpt: 'Aceroyal Estates’ CEO recognized for leadership at a continental awards event honoring young African achievers.',
    content:
      'Dr. Endurance Agonor, CEO of AceRoyal Estate Homes Limited, was appointed President of the Africa Under 40 CEO Forum, announced at a continental award event on July 22, 2023.\n\nThe Forum celebrates young African achievers who have excelled across industries and made significant contributions to community service and philanthropy, fostering networking and collaboration among successful young Africans to advance the continent.\n\nUnder his leadership, AceRoyal Estate Homes Limited has been recognized for its innovative approach to property development, sustainable practices, and community engagement.',
    coverImageUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2023-08-08T00:00:00.000Z',
    updatedAt: '2023-08-08T00:00:00.000Z',
  },
];

// Real names/roles confirmed against the live site's own "Meet The Team"
// section (2026-09-01). Note the live site's team grid uses "Endurance
// Cletus Agonor" with no "Dr." title — different from how a 2023 blog post
// headline referred to him — the formal team listing is treated as the
// more authoritative source. TODO(content): real headshots still needed
// for everyone except the CEO; using the logo as a placeholder for now.
// Deliberately not reproducing "Abidemi Adedoyin" appearing twice, which
// the live site does — looks like a duplication bug there, not something
// to carry over.
// photoUrl is only set where we have a real photo (currently just the CEO) —
// everyone else renders as an initials avatar on the About page rather than
// the company logo standing in for a face.
export const fallbackTeamMembers: TeamMember[] = [
  {
    id: 'fallback-team-ceo',
    name: 'Dr. Endurance Cletus Agonor',
    role: 'Founder & Chief Executive Officer',
    bio: 'President of the Africa Under 40 CEO Forum and a member of REDAN (Real Estate Developers Association of Nigeria). Leads Aceroyal Estate Homes’ strategy, partnerships, and delivery.',
    photoUrl: '/images/ceo.jpg',
    active: true,
  },
  {
    id: 'fallback-team-coo',
    name: 'Dr. Racheal Okun Agonor',
    role: 'Chief Operating Officer & Co-Founder',
    photoUrl: '/images/team/racheal-agonor.jpg',
    active: true,
  },
  {
    id: 'fallback-team-regional-manager',
    name: 'Esther Udorji',
    role: 'Regional Manager',
    photoUrl: '/images/team/esther-udorji.jpg',
    active: true,
  },
  {
    id: 'fallback-team-hr-manager',
    name: 'Umeh Jennifer Oluchi',
    role: 'HR Manager',
    photoUrl: '/images/team/jennifer-oluchi.jpg',
    active: true,
  },
  {
    id: 'fallback-team-head-legal',
    name: 'Barr. Arowolo Akinwale',
    role: 'Head of Legal',
    photoUrl: '/images/team/akinwale-arowolo.jpg',
    active: true,
  },
  {
    id: 'fallback-team-project-manager',
    name: 'Abidemi Adedoyin',
    role: 'Project Manager',
    photoUrl: '/images/team/abidemi-adedoyin.jpg',
    active: true,
  },
  {
    id: 'fallback-team-client-service',
    name: 'Mary A. Adekahunsi',
    role: 'Head, Client Service/Customer Support (CSCSP, ACISCSM)',
    photoUrl: '/images/team/mary-adekahunsi.jpg',
    active: true,
  },
];

// Sourced from the live site's About page testimonial carousel (all 3 shown
// there, per Daniel — don't silently drop live-site content, flag it for
// validation instead).
//
// PRE-CUTOVER CHECKLIST: the Theodora Agbonkpolor quote is addressed to
// "Chairman_ace" and framed as a staff member (her listed role is "Sales
// executive") praising the CEO personally, rather than a typical client
// testimonial about the buying experience — worth Daniel's read before this
// ships in "What Clients Say" as-is. Also: "Esther Udorji, Student/Digital
// Marketing Expert" here shares a name with "Esther Udorji, Regional
// Manager" in the team roster — flagging in case that's a live-site mix-up
// rather than two different people, not assuming either way.
export const fallbackTestimonials: Testimonial[] = [
  {
    id: 'fallback-testimonial-momodu',
    name: 'Momodu Afegbua',
    role: 'Tech Expert/Consultant',
    message:
      "Let me tell you the truth, Aceroyalestates is unarguably the best real estate company in Nigeria, I have ever dealt with them and I am speaking based on my experience and lots of other reviews. They have some of the best team in the world, very professional, experienced and helpful agents and brokers. They come highly recommended. Great environment, professional and nice people, clean and beautiful estates set up. They care about their clients and train their agents frequently so they are always updated with what's going on in the market, they thoroughly explained everything I needed to know to me, and I started feeling like a guru from the lectures. I recommend Aceroyalestates to anyone looking to do any real estate transaction.",
    active: true,
  },
  {
    id: 'fallback-testimonial-esther',
    name: 'Esther Udorji',
    role: 'Student/Digital Marketing Expert',
    message:
      "Aceroyalestates is a dedicated real estate company that always keeps its clients' interests in mind and diligently ensures all facets of a transaction are attended to. They have a thorough knowledge of the job, communicates effectively and is a pleasure to work with them.",
    active: true,
  },
  {
    id: 'fallback-testimonial-theodora',
    name: 'Theodora Agbonkpolor',
    role: 'Sales Executive',
    message:
      "I've talked to the CEO of Aceroyalestates multiple times about real estate and the real estate market. He is very knowledgeable, professional and passionate about his vision. Anyone who works with him is lucky to have him on their side. It's a competitive market and he knows how to navigate the complexities to his clients advantage, he is constantly challenging the status quo, I once called him the \"robinhood\" of real estate. Was a joy to work with. He really went above and beyond in pursuit of my peculiar constraints, and worked through several challenging buying scenarios until I got just what I wanted. Thank you Chairman_ace.",
    active: true,
  },
  // TODO(content): dummy entries below (not sourced from any real client)
  // written to read like genuine testimonials rather than announcing
  // themselves as placeholders, so the "Our Success" layout — text, photo,
  // and video testimonials — can actually be reviewed as it will look once
  // real content lands. Built per Daniel's standing instruction to build
  // every section during development with placeholders rather than gate on
  // final content, and swap/remove before go-live. Replace name/role/
  // message/imageUrl/videoUrl with real, approved client content; the
  // YouTube clip below (an aerial city/skyline drone tour, chosen for
  // being property/real-estate-adjacent rather than an unrelated clip)
  // is a placeholder, not real client footage. An earlier direct-link
  // (Google Cloud Storage sample bucket) was swapped for a YouTube embed
  // after its bucket permissions started returning AccessDenied — embed
  // URLs don't expire the way that link did.
  {
    id: 'fallback-testimonial-dummy-image',
    name: 'Adaeze Okafor',
    role: 'Homeowner, Alpha Garden City',
    message:
      "From my first site visit to the day I got my allocation letter, the process was clear at every step. No surprises, no hidden charges — just what was agreed from the start. I'm proud to call this estate home.",
    rating: 5,
    imageUrl: estateImages.placeholder3,
    active: true,
  },
  {
    id: 'fallback-testimonial-dummy-video',
    name: 'Chuka Nwosu',
    role: 'Investor, Downtown Lagos Commercial City',
    message:
      "I've bought land before and dealt with a lot of back and forth. With Aceroyal, the inspection was organized, the documentation was ready when they said it would be, and allocation happened on schedule. Watch how it went for me.",
    rating: 5,
    videoUrl: 'https://www.youtube.com/watch?v=2lufRODAVPM',
    active: true,
  },
];

// TODO(content): placeholder stock photos standing in so the gallery grid/
// lightbox can actually be seen and tested before real photos/videos exist.
// Same treatment as the hero/estate stock imagery elsewhere in this file —
// swap every item below for real photos (ideally hosted on Cloudinary, per
// the earlier asset-storage decision) before go-live.
export const fallbackGalleryItems: GalleryItem[] = [
  {
    id: 'fallback-gallery-1',
    title: 'Allocation Day — Alpha Garden City',
    mediaType: 'image',
    mediaUrl: estateImages.alphaGardenCity,
    estateName: 'Alpha Garden City',
    active: true,
  },
  {
    id: 'fallback-gallery-2',
    title: 'Site Inspection Walkthrough',
    mediaType: 'image',
    mediaUrl: estateImages.placeholder1,
    estateName: 'Heritage Estate',
    active: true,
  },
  {
    id: 'fallback-gallery-3',
    title: 'Estate Launch Event',
    mediaType: 'image',
    mediaUrl: estateImages.placeholder2,
    estateName: 'Eko Paragon Residence',
    active: true,
  },
  {
    id: 'fallback-gallery-4',
    title: 'Client Handover',
    mediaType: 'image',
    mediaUrl: estateImages.placeholder3,
    estateName: 'Downtown Lagos',
    active: true,
  },
  // TODO(content): dummy video entry (see the testimonials TODO above for
  // why it reads like real content and where the placeholder clip is from)
  // — replace mediaUrl with a real allocation/inspection-day video.
  {
    id: 'fallback-gallery-5',
    title: 'Allocation Day Walkthrough',
    mediaType: 'video',
    mediaUrl: 'https://www.youtube.com/watch?v=2lufRODAVPM',
    thumbnailUrl: estateImages.placeholder1,
    estateName: 'Heritage Estate',
    active: true,
  },
];

export const fallbackComplianceItems = [
  {
    id: 'fallback-compliance-cac',
    type: 'CAC_REGISTRATION',
    title: 'Registered Real Estate Brand',
    description: 'Company registration and supporting documentation are available for buyer review.',
    registrationNo: 'Available on request',
    issuedBy: 'Corporate Affairs Commission',
    displayOnHome: true,
    active: true,
  },
  {
    id: 'fallback-compliance-docs',
    type: 'LEGAL_DOCUMENT',
    title: 'Documented Estate Process',
    description: 'Brochures, payment details, and title information are shared during enquiry and inspection.',
    displayOnHome: true,
    active: true,
  },
  // PRE-CUTOVER CHECKLIST: not sourced from the live site — added because the
  // site collects personal data via its forms, which brings it under the
  // Nigeria Data Protection Act. Confirm actual NDPC registration status with
  // Aceroyal before go-live; phrasing below deliberately mirrors the CAC
  // item's "available on request" hedge rather than asserting a registration
  // number we haven't seen.
  {
    id: 'fallback-compliance-ndpc',
    type: 'DATA_PROTECTION',
    title: 'Data Protection Compliance',
    description: 'Personal data is handled in line with the Nigeria Data Protection Act. Registration documentation available on request.',
    registrationNo: 'Available on request',
    issuedBy: 'Nigeria Data Protection Commission',
    displayOnHome: true,
    active: true,
  },
];

// TODO(content): logos not sourced yet — using the Aceroyal mark as a
// placeholder until real partner logos are provided.
export const fallbackPartners = [
  {
    id: 'fallback-partner-aeon-trisl',
    name: 'AEON Trisl Group',
    logoUrl: '/images/aceroyal-symbol-colour.png',
    category: 'PARTNER',
    active: true,
  },
  {
    id: 'fallback-partner-brg',
    name: 'The Billionaire Realtor Group',
    logoUrl: '/images/aceroyal-symbol-colour.png',
    category: 'PARTNER',
    active: true,
  },
  {
    id: 'fallback-partner-emaar',
    name: 'Emaar Properties',
    logoUrl: '/images/aceroyal-symbol-colour.png',
    category: 'PARTNER',
    active: true,
  },
];

export const fallbackPromos = [
  {
    id: 'fallback-promo-app-launch',
    title: 'Our Portals & App Are Launching Soon',
    message: 'Track estate updates, view payment plans, and book inspections from your phone. Join the waitlist for early access.',
    details: 'The Aceroyal customer portal and mobile app are on the way, bringing verified estate updates, payment plan flyers, inspection booking, and secure client support messaging. Join the waitlist below the app section to get notified the moment it goes live.',
    imageUrl: estateImages.placeholder2,
    linkUrl: '/#app-download',
    placement: 'SECTION_CARD',
    priority: 1,
    active: true,
  },
  {
    id: 'fallback-promo-realtor',
    title: 'Are You a Realtor? Join Aceroyal Realtor',
    message: 'Earn commissions helping clients find their next estate, land, or apartment — with real-time listing access and dedicated support.',
    details: 'Aceroyal Realtor gives partner agents real-time listing access, payment tracking, and dedicated support for every client they bring on. Fill out the form in the Aceroyal Realtor section below to get started.',
    imageUrl: estateImages.placeholder3,
    linkUrl: '/#realtor',
    placement: 'SECTION_CARD',
    priority: 2,
    active: true,
  },
  {
    id: 'fallback-promo-1',
    title: 'Estate Inspection Slots Open',
    message: 'Book an inspection to review available plots, apartments, and payment plans.',
    details: 'Limited weekly inspection slots are available for Lagos and Abuja estate enquiries.',
    imageUrl: estateImages.placeholder1,
    linkUrl: '/book-inspection',
    placement: 'SECTION_CARD',
    priority: 3,
    active: true,
  },
];

// Real "Consent Form and FAQs" PDFs linked from each estate's page on the
// live site. Note: the live site's own Alpha Garden City page links to the
// Downtown Lagos PDF by mistake (likely a copy-paste template bug) — not
// reproduced here; flagged to Daniel instead of propagating the error.
export const fallbackResources = [
  {
    id: 'fallback-resource-heritage-faq',
    title: 'Heritage Estate — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2026/01/HERITAGE-ESTATES-CONSENT-FORM-AND-FAQS.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-heritage',
    estate: fallbackEstates.find((e) => e.slug === 'heritage-estate'),
  },
  {
    id: 'fallback-resource-edo-faq',
    title: 'Edo Mega City — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2026/01/Edo-Mega-City-FAQ-Consent-Form-2.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-edo-mega-city',
    estate: fallbackEstates.find((e) => e.slug === 'edo-mega-city'),
  },
  {
    id: 'fallback-resource-downtown-lagos-faq',
    title: 'Downtown Lagos — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2025/03/DOWNTOWN-LAGOS-CONSENT-FORM-AND-FAQS-2.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-downtown-lagos',
    estate: fallbackEstates.find((e) => e.slug === 'downtown-lagos'),
  },
  {
    id: 'fallback-resource-downtown-lagos-phase2-faq',
    title: 'Downtown Lagos Phase 2 — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2026/03/DOWNTOWN-LAGOS-PHASE-2.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-downtown-lagos-phase-2',
    estate: fallbackEstates.find((e) => e.slug === 'downtown-lagos-phase-2'),
  },
  {
    id: 'fallback-resource-eko-paragon-faq',
    title: 'Eko Paragon Residence — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2025/01/EKO-PARAGON-CONSENT-FORM-AND-FAQss.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-eko-paragon',
    estate: fallbackEstates.find((e) => e.slug === 'eko-paragon-residence'),
  },
  {
    id: 'fallback-resource-prime-annex-faq',
    title: 'Prime Boulevard Annex — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2026/01/PRIME-BOULEVARD-ANNEX-CONSENT-FORM-AND-FAQS.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-prime-annex',
    estate: fallbackEstates.find((e) => e.slug === 'prime-annex'),
  },
];

export const fallbackFaqs = [
  {
    id: 'fallback-faq-1',
    question: 'Can I inspect before payment?',
    answer: 'Yes. We recommend booking an inspection before making a purchase decision.',
    sortOrder: 0,
  },
  {
    id: 'fallback-faq-2',
    question: 'Are payment plans available?',
    answer: 'Payment-plan availability depends on the estate and unit type. Contact the team for the current schedule.',
    sortOrder: 1,
  },
];

export const fallbackOffices = [
  {
    id: 'fallback-office-lagos',
    state: 'Lagos',
    city: 'Lekki',
    address: 'Providence Plaza, 17 Olokonla Road, Sangotedo, Lekki-Ajah Expressway, Lagos, Nigeria.',
    phones: ['02013300287', '09156549709'],
    emails: ['customercare@aceroyalestates.com'],
    openingHours: 'Mon-Fri: 9am - 5pm',
  },
  {
    id: 'fallback-office-abuja',
    state: 'Abuja',
    city: 'Gwarimpa',
    address: 'House A, 45 Road off Navy Quarters, By First Avenue, Gwarimpa, Abuja.',
    phones: ['02013300287', '09156549709'],
    emails: ['customercare@aceroyalestates.com'],
    openingHours: 'Mon-Fri: 9am - 5pm',
  },
  {
    id: 'fallback-office-benin',
    state: 'Edo',
    city: 'Benin City',
    address: 'No 2 New Lagos Road, Off 2nd Junction, by Akpakpava, Benin City.',
    phones: ['02013300287', '09156549709'],
    emails: ['customercare@aceroyalestates.com'],
    openingHours: 'Mon-Fri: 9am - 5pm',
  },
];

function filterProperties(params: URLSearchParams) {
  return fallbackProperties.filter((property) => {
    const type = params.get('type');
    const status = params.get('status');
    const state = params.get('state');
    const city = params.get('city');
    const featured = params.get('featured');
    const search = params.get('search')?.toLowerCase();
    const estateSlug = params.get('estateSlug');
    const priceMin = Number(params.get('priceMin') || 0);
    const priceMax = Number(params.get('priceMax') || 0);

    if (type && property.type !== type) return false;
    if (status && property.status !== status) return false;
    if (state && !property.state.toLowerCase().includes(state.toLowerCase())) return false;
    if (city && !property.city.toLowerCase().includes(city.toLowerCase())) return false;
    if (featured !== null && property.featured !== (featured === 'true')) return false;
    if (estateSlug && property.estate?.slug !== estateSlug) return false;
    if (priceMin && property.price < priceMin) return false;
    if (priceMax && property.price > priceMax) return false;
    if (search) {
      const haystack = `${property.title} ${property.description} ${property.city} ${property.address}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });
}

function paginate<T>(items: T[], params: URLSearchParams) {
  const skip = Number(params.get('skip') || 0);
  const take = Number(params.get('take') || items.length);
  return items.slice(skip, skip + take);
}

export function getFallbackData(endpoint: string, method = 'GET') {
  if (method !== 'GET') return undefined;

  const url = new URL(endpoint.startsWith('/') ? endpoint : `/${endpoint}`, 'https://fallback.local');
  const pathname = url.pathname;
  const params = url.searchParams;

  if (pathname === '/estates') {
    const items = paginate(fallbackEstates, params);
    return { items, total: fallbackEstates.length };
  }

  if (pathname.startsWith('/estates/')) {
    const slug = pathname.split('/')[2];
    return fallbackEstates.find((estate) => estate.slug === slug) || null;
  }

  if (pathname === '/properties') {
    let items = filterProperties(params);
    const sort = params.get('sort');
    if (sort === 'price_asc') items = [...items].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') items = [...items].sort((a, b) => b.price - a.price);
    return paginate(items, params);
  }

  if (pathname.startsWith('/properties/')) {
    const slug = pathname.split('/')[2];
    return fallbackProperties.find((property) => property.slug === slug) || null;
  }

  if (pathname === '/blog') {
    return { items: paginate(fallbackBlogPosts, params), total: fallbackBlogPosts.length };
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.split('/')[2];
    return fallbackBlogPosts.find((post) => post.slug === slug) || null;
  }

  if (pathname === '/team') return fallbackTeamMembers;
  if (pathname === '/testimonials') return fallbackTestimonials;
  if (pathname === '/gallery') return fallbackGalleryItems;
  if (pathname === '/compliance') return fallbackComplianceItems;
  if (pathname === '/partners') return fallbackPartners;
  if (pathname === '/promos') return fallbackPromos;
  if (pathname === '/resources') return fallbackResources;
  if (pathname === '/faqs') return fallbackFaqs;
  if (pathname === '/offices') return fallbackOffices;

  return undefined;
}
