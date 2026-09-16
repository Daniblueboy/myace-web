import type { Estate, GalleryItem, Property, TeamMember, Testimonial } from '@/shared';

const now = '2026-01-01T00:00:00.000Z';

// Every active estate now has real cover/gallery imagery — these stock
// Unsplash placeholders only remain for the internal promo cards below
// (app launch, realtor program, inspection slots), which illustrate a
// feature/concept rather than a specific real property.
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
    // No real photos ever came in for Phase 1 (sold out before this content
    // pass) — leave both empty rather than stock photos; EstateHeroCarousel
    // and the estates grid both render a clean "coming soon"/no-image state
    // for this instead of a fake picture.
    coverImage: null,
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2025/03/Downtown-Brochure.pdf',
    gallery: [],
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
  {
    id: 'fallback-estate-new-city',
    name: 'New City Estate',
    slug: 'new-city-estate',
    description:
      'New City Estate is located at Imota, Ikorodu — the very center of Ikorodu.\n\nEstate Title: Freehold/Registered Survey. Estate Offer: Flexible Plan.\n\nLandmarks: Caleb University, Imota Rice Mill, Lasustech, Land Mark College, Ikorodu Ferry Terminal.',
    state: 'Lagos',
    city: 'Imota, Ikorodu',
    address: 'Imota, Ikorodu, Lagos',
    coverImage: '/images/estates/new-city-estate/new-city-flyer.jpg',
    brochureUrl: null,
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Interlock Road', 'Good Road Network', 'Good Water Supply', 'Green Areas', 'Perimeter Fencing'],
    createdAt: '2023-05-07T00:00:00.000Z',
    updatedAt: '2023-05-07T00:00:00.000Z',
  },
  {
    id: 'fallback-estate-metro-city-garden',
    name: 'Metro City Garden',
    slug: 'metro-city-garden',
    description:
      'Metro City Garden is located at Itoikin, Epe, Lagos.\n\nEstate Title: Freehold/Registered Survey.\n\nLandmarks: Lagos State Food Hub, District 1, Ajebo Grammar School, Isime Lagos.',
    state: 'Lagos',
    city: 'Itoikin, Epe',
    address: 'Itoikin, Epe, Lagos',
    coverImage: '/images/estates/metro-city-garden/metro-city-flyer.jpg',
    brochureUrl: null,
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Perimeter Fencing', 'Green Areas', 'Dry Land', '24-Hour Power', 'Clean Water Supply', 'Drainage', 'Gym/Spa', 'Swimming Pool'],
    createdAt: '2023-03-24T00:00:00.000Z',
    updatedAt: '2023-03-24T00:00:00.000Z',
  },
  {
    id: 'fallback-estate-novena',
    name: 'Novena Estate Phase 2',
    slug: 'novena-estate-phase-2',
    description:
      'Novena Estate Phase 2 is a buy-and-build residential estate located at Iraye, Epe, Lagos State — on the north side of the Lekki Lagoon. Epe is one of the most sought-after destinations for investors looking at land flipping years later or settling in away from the buzz and rush of crowded Lagos. Land Title: Registered Survey.\n\nLandmarks: Isimi Lagos, Alaro City, Dangote Refinery, Epe Resort and Spa, Access Bank, Lekki Trade Fair, the proposed international market, and the proposed local airport.\n\nGoody Bag Promo: buy a plot of land at Novena Estate Phase 2 and get 100 bags of Dangote Cement free — enough to fence your land or start your foundation.',
    state: 'Lagos',
    city: 'Iraye, Epe',
    address: 'Iraye, Epe, Lagos',
    coverImage: '/images/estates/novena-estate/novena-estate-flyer.jpg',
    videoUrl: '/videos/novena-estate.mp4',
    brochureUrl: null,
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Dry Land', 'Perimeter Fencing', 'Steady Water Supply', 'Full Power Supply', 'Private Bar/Gym', 'Estate Security', 'Paved Road', 'Garden', 'Shopping Center', 'Church/Mosque'],
    createdAt: '2022-06-14T00:00:00.000Z',
    updatedAt: '2022-06-14T00:00:00.000Z',
  },
];

export const fallbackProperties: Property[] = [
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
      { id: 'fallback-downtown-phase2-image-1', url: '/images/estates/downtown-lagos-phase-2/dt-flyer-500sqm.jpg', altText: 'Downtown Lagos Phase 2 — 500sqm pricing' },
      { id: 'fallback-downtown-phase2-image-2', url: '/images/estates/downtown-lagos-phase-2/dt-flyer-1000sqm.jpg', altText: 'Downtown Lagos Phase 2 — 1,000sqm pricing' },
      { id: 'fallback-downtown-phase2-image-3', url: '/images/estates/downtown-lagos-phase-2/dt-flyer-payment-plan.jpg', altText: 'Downtown Lagos Phase 2 — payment plan' },
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
  {
    id: 'fallback-property-new-city-plot',
    title: 'New City Estate — 300sqm / 500sqm Plots',
    slug: 'new-city-estate-plots',
    description:
      'Flexible-plan plots at New City Estate, Imota, Ikorodu — Freehold/Registered Survey title. 500sqm at ₦100,000/month or 300sqm at ₦50,000/month, both over 12 months, no lump-sum payment required.',
    type: 'LAND',
    status: 'AVAILABLE',
    price: 600000,
    currency: 'NGN',
    state: 'Lagos',
    city: 'Imota, Ikorodu',
    address: 'Imota, Ikorodu, Lagos',
    bedrooms: null,
    bathrooms: null,
    size: null,
    amenities: ['Interlock Road', 'Good Road Network', 'Good Water Supply', 'Green Areas', 'Perimeter Fencing'],
    featured: false,
    images: [
      { id: 'fallback-new-city-image-1', url: '/images/estates/new-city-estate/new-city-flyer.jpg', altText: 'New City Estate flexible plan flyer' },
    ],
    variants: [
      {
        id: 'fallback-new-city-variant-300sqm',
        label: '300sqm Plot',
        price: 600000,
        currency: 'NGN',
        size: '300sqm',
        sizeUnit: 'SQM',
        paymentType: 'INSTALLMENT',
        installmentMonths: 12,
        installmentAmount: 50000,
        active: true,
        media: [
          { id: 'fallback-new-city-flyer-300sqm-v', type: 'FLYER', title: 'New City Estate — 300sqm Flexible Plan', url: '/images/estates/new-city-estate/new-city-flyer.jpg' },
        ],
      },
      {
        id: 'fallback-new-city-variant-500sqm',
        label: '500sqm Plot',
        price: 1200000,
        currency: 'NGN',
        size: '500sqm',
        sizeUnit: 'SQM',
        paymentType: 'INSTALLMENT',
        installmentMonths: 12,
        installmentAmount: 100000,
        active: true,
        media: [
          { id: 'fallback-new-city-flyer-500sqm-v', type: 'FLYER', title: 'New City Estate — 500sqm Flexible Plan', url: '/images/estates/new-city-estate/new-city-flyer.jpg' },
        ],
      },
    ],
    faqs: [],
    resources: [],
    media: [
      { id: 'fallback-new-city-flyer', type: 'FLYER', title: 'New City Estate — Flexible Plan Pricing', url: '/images/estates/new-city-estate/new-city-flyer.jpg' },
    ],
    estateId: 'fallback-estate-new-city',
    estate: fallbackEstates.find((e) => e.slug === 'new-city-estate'),
    createdAt: '2023-05-07T00:00:00.000Z',
    updatedAt: '2023-05-07T00:00:00.000Z',
  },
  {
    id: 'fallback-property-metro-city-plot',
    title: 'Metro City Garden — 300sqm / 500sqm Plots',
    slug: 'metro-city-garden-plots',
    description:
      'Freehold/Registered Survey plots at Metro City Garden, Itoikin, Epe — 300sqm at ₦1,000,000 or 500sqm at ₦1,500,000, with 100% ROI guaranteed.',
    type: 'LAND',
    status: 'AVAILABLE',
    price: 1000000,
    currency: 'NGN',
    state: 'Lagos',
    city: 'Itoikin, Epe',
    address: 'Itoikin, Epe, Lagos',
    bedrooms: null,
    bathrooms: null,
    size: null,
    amenities: ['Perimeter Fencing', 'Green Areas', 'Dry Land', '24-Hour Power', 'Clean Water Supply', 'Drainage', 'Gym/Spa', 'Swimming Pool'],
    featured: false,
    images: [
      { id: 'fallback-metro-city-image-1', url: '/images/estates/metro-city-garden/metro-city-flyer.jpg', altText: 'Metro City Garden pricing flyer' },
    ],
    variants: [
      {
        id: 'fallback-metro-city-variant-300sqm',
        label: '300sqm Plot',
        price: 1000000,
        currency: 'NGN',
        size: '300sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-metro-city-flyer-300sqm-v', type: 'FLYER', title: 'Metro City Garden — Pricing', url: '/images/estates/metro-city-garden/metro-city-flyer.jpg' },
        ],
      },
      {
        id: 'fallback-metro-city-variant-500sqm',
        label: '500sqm Plot',
        price: 1500000,
        currency: 'NGN',
        size: '500sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-metro-city-flyer-500sqm-v', type: 'FLYER', title: 'Metro City Garden — Pricing', url: '/images/estates/metro-city-garden/metro-city-flyer.jpg' },
        ],
      },
    ],
    faqs: [],
    resources: [],
    media: [
      { id: 'fallback-metro-city-flyer', type: 'FLYER', title: 'Metro City Garden — Pricing Flyer', url: '/images/estates/metro-city-garden/metro-city-flyer.jpg' },
    ],
    estateId: 'fallback-estate-metro-city-garden',
    estate: fallbackEstates.find((e) => e.slug === 'metro-city-garden'),
    createdAt: '2023-03-24T00:00:00.000Z',
    updatedAt: '2023-03-24T00:00:00.000Z',
  },
  {
    id: 'fallback-property-novena-plot',
    title: 'Novena Estate Phase 2 — 500sqm Plot',
    slug: 'novena-estate-phase-2-plot',
    description:
      'A 500sqm plot at Novena Estate Phase 2, Iraye, Epe, Lagos — Registered Survey title, now selling at ₦2.5 million per plot.',
    type: 'LAND',
    status: 'AVAILABLE',
    price: 2500000,
    currency: 'NGN',
    state: 'Lagos',
    city: 'Iraye, Epe',
    address: 'Iraye, Epe, Lagos',
    bedrooms: null,
    bathrooms: null,
    size: '500sqm',
    amenities: [],
    featured: false,
    images: [
      { id: 'fallback-novena-image-1', url: '/images/estates/novena-estate/novena-estate-flyer.jpg', altText: 'Novena Estate Phase 2 pricing flyer' },
      { id: 'fallback-novena-image-2', url: '/images/estates/novena-estate/novena-goody-bag-flyer.jpg', altText: 'Novena Estate Phase 2 Goody Bag Promo flyer' },
    ],
    variants: [
      {
        id: 'fallback-novena-variant-500sqm',
        label: '500sqm Plot',
        price: 2500000,
        currency: 'NGN',
        size: '500sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
        media: [
          { id: 'fallback-novena-flyer-v', type: 'FLYER', title: 'Novena Estate Phase 2 — Pricing', url: '/images/estates/novena-estate/novena-estate-flyer.jpg' },
          { id: 'fallback-novena-goody-bag-flyer-v', type: 'FLYER', title: 'Novena Estate Phase 2 — Goody Bag Promo', url: '/images/estates/novena-estate/novena-goody-bag-flyer.jpg' },
        ],
      },
    ],
    faqs: [],
    resources: [],
    media: [
      { id: 'fallback-novena-flyer', type: 'FLYER', title: 'Novena Estate Phase 2 — Pricing', url: '/images/estates/novena-estate/novena-estate-flyer.jpg' },
      { id: 'fallback-novena-goody-bag-flyer', type: 'FLYER', title: 'Novena Estate Phase 2 — Goody Bag Promo', url: '/images/estates/novena-estate/novena-goody-bag-flyer.jpg' },
    ],
    estateId: 'fallback-estate-novena',
    estate: fallbackEstates.find((e) => e.slug === 'novena-estate-phase-2'),
    createdAt: '2022-06-14T00:00:00.000Z',
    updatedAt: '2022-06-14T00:00:00.000Z',
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

// Most posts below carry Daniel's own verbatim copy and real images from
// this session's content pass. A few — flagged individually with their own
// TODO(content) comment — still have no real image (none was ever
// provided) or, for "Is Lagos Real Estate Still a Good Investment in
// 2025?", still paraphrased content rather than his verbatim text; it's
// one of ~20 older live-blog posts (2022-2025) not yet migrated.
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
    createdAt: '2026-04-20T00:00:00.000Z',
    updatedAt: '2026-04-20T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-millionaires-secret',
    title: 'The Secret Investment That’s Creating Millionaires',
    slug: 'the-secret-investment-thats-creating-millionaires',
    excerpt: 'How hotel-residence investments like Eko Paragon Residence offer passive rental income without landlord headaches.',
    content:
      'Savvy investors are earning passive income by owning hotel residences rather than managing traditional Airbnbs directly. Not all short-term rental investments are worth it — some drain your time and resources, while the right hotel residence gives high returns with zero effort.\n\nEko Paragon Residence, an upcoming five-star hotel residence in Abijo GRA, Lagos, developed by Aceroyal Estate Homes in partnership with LSDPC, offers a fully managed system: the hotel team handles marketing, guest experience, and maintenance, while the owner simply enjoys rental income.\n\nWith a hotel residence like Eko Paragon, investors can expect steady, predictable income, plus appreciating property value in Abijo GRA — earning both rental income and long-term value growth.\n\nPre-launch prices at Eko Paragon Residence are the lowest they\'ll ever be. Now is the best time to invest before the market value jumps.',
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
      'Imagine buying land for ₦150,000 a few years ago and watching it appreciate to over ₦3 million today.\n\nSounds unbelievable? That’s exactly what happened to Overcomer Ibeson, our in-house Architect and Site Manager. His investment decision transformed into generational wealth, while many others missed out.\n\nThis is the power of Land Banking — the strategic purchase of land in high-growth areas, held for future value appreciation. If you’re still waiting for the “right time” to invest, this is your wake-up call: the right time is NOW.\n\nWhy Land Banking is the Ultimate Wealth-Building Strategy\n\nUnlike cars or gadgets that lose value over time, land is an appreciating asset. Lagos, Abuja, and Benin are expanding rapidly, turning today’s outskirts into tomorrow’s prime real estate.\n\nTake Legacy Garden City and Edo Mega City — both are located in developing regions with massive infrastructural projects underway. In 3 to 5 years, landowners here will see exponential returns, just like Overcomer.\n\nThe High Cost of Waiting\n\nMany Nigerians in the diaspora regret not buying land years ago when prices were lower. While they waited, others secured their future.\n\nAt Aceroyal Estate Homes, we’ve helped hundreds of investors, including those in the diaspora, secure land without fear of scams. Our clients testify to our integrity and trustworthiness, a rarity in the real estate industry.\n\nDon’t be the one saying, “I wish I had invested earlier.”',
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
      'If you’ve been paying attention to global trends, you already know that the cost of living in the West is going up while stability is going down.\n\nRent prices are through the roof, jobs are uncertain, and the dream of homeownership keeps getting harder. More Nigerians abroad are beginning to ask the big question — is it time to invest back home?\n\nIf that thought has crossed your mind, you’re on the right track. Real estate in Nigeria is one of the smartest investments you can make, but only if you do it the right way. Buying property is not like ordering online and hoping it arrives. You need a strategy. Let’s break it down.\n\nStart with a Clear Goal\n\nAre you buying for yourself, looking to rent it out, or planning to hold the land until the value skyrockets? Lagos, for example, never stops growing. Places like Lekki and Ajah were once bush, but today a single plot can buy you a house in some parts of the US. Imagine if you had bought land there ten years ago.\n\nPick the Right Location\n\nNot all properties are worth your money. Some areas promise rapid growth, while others stay the same for decades. Lagos, Abuja, and even Benin City have hotspots where land value doubles every few years.\n\nIf you’ve been watching the Lekki-Epe corridor, you already know what’s happening. The Lekki Free Trade Zone, Dangote Refinery, and the proposed airport are turning this region into Nigeria’s real estate jackpot. Smart investors are already securing plots before the prices explode.\n\nVerify the Paperwork\n\nNothing stings more than sending millions home, only to find out the land you paid for belongs to three different people. Before buying, always check for a C of O, Governor’s Consent, or a proper Deed of Assignment. If the documentation isn’t clear, walk away.\n\nStart Small and Grow\n\nIf you’re not ready for a big investment, start with a plot, develop it gradually, and scale up. Land doesn’t depreciate.\n\nWhether you’re abroad or right here in Nigeria, one thing is clear — owning property is always a smart move. If the uncertainty overseas has you thinking about securing something back home, now is the time to act.\n\nCall Aceroyal Estate Homes today and let’s get you started.',
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
    // No image was provided for this post — leave unset rather than a
    // stock photo; the post page and listing cards both render fine
    // without a cover image.
    coverImageUrl: null,
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
      'Have you ever stopped to think about the meaning behind a name? A name is more than just a label — it carries history, purpose, and a vision for the future.\n\nFor AceRoyal Group, our name is a reflection of our roots, values, and commitment to excellence in real estate.\n\nThe Origin of “AceRoyal”\n\nThe name AceRoyal isn’t just a brand, it’s a legacy.\n\n“Ace” comes from the initials of our founder, Dr. Agonor Cletus Endurance. It represents leadership, excellence, and a determination to be the best in everything we do.\n\n“Royal” is a tribute to his proud Edo heritage, a culture deeply rooted in dignity, strength, and leadership. It symbolizes the trust, prestige, and integrity that define every transaction, every development, and every client relationship at AceRoyal.\n\nTogether, AceRoyal represents a vision of prosperity and service to humanity — a vision that has grown into one of Nigeria’s most trusted real estate brands.\n\nA Legacy in the Making\n\nWhat’s in a name? For us, it’s everything. It’s a story of vision, heritage, and a relentless pursuit of excellence. It’s a name that stands for trust, quality, and a future where homeownership is not a privilege, but a right.\n\nWhether you’re looking to buy, invest, or build, AceRoyal Estate Homes is here to guide you every step of the way.\n\nWelcome to AceRoyal — where dreams become reality, and legacies are built.',
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
      'Let’s talk about Allocation Day — that exciting moment when your land goes from “something you paid for” to something you can actually stand on. It’s not just about seeing your plot; it’s about making it official.\n\nAt Aceroyal Estate Homes, we do this every three months, turning your investment into reality. If you’ve secured a plot or acre, this is your moment. Here’s why you don’t want to miss it:\n\n[video](/videos/allocation-day.mp4)\n\n1. You’re Not Just Buying Land — You’re Owning It\n\nUntil you step on your plot, land ownership feels abstract. But on Allocation Day, you walk the land and see exactly what you invested in. Our licensed surveyors, who drafted the survey plans, guide you through the process, ensuring you understand your land’s exact location and boundaries.\n\n![A new landowner celebrates her allocation at The Legacy Garden City](/images/gallery/allocation-day/legacy-garden-city-allocated.jpg)\n\n2. Your Documents Are Ready — No Delays\n\nWe know Nigerian real estate can be stressful, but not with us. Our dedicated Admin team ensures you sign all necessary documents on-site, so you leave with full ownership clarity. No back and forth. No waiting weeks for paperwork.\n\n3. You Meet Your Future Neighbors & Investors\n\nIt’s more than just land — it’s a community. Whether you plan to build soon or invest for appreciation, Allocation Day lets you connect with like-minded buyers, potential partners, and future neighbors. Who knows? You might even find someone with a shared vision for the area.\n\n![Celebrating a new allocation on site](/images/gallery/allocation-day/just-got-allocated.jpg)\n\n4. And Yes, There’s Lunch!\n\nAfter handling business, we make sure you relax, celebrate, and enjoy good food. Because owning land should feel exciting, not stressful.',
    coverImageUrl: '/images/gallery/allocation-day/latest-land-owner.jpg',
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
      'If you were investing ₦50 million in Nigerian real estate today, where would it be — Lagos or Abuja?\n\nThis is the debate every smart investor is having in 2025. Both cities are booming, both offer massive returns, but the real question is: which one is right for you? Let’s break it down.\n\nLagos: The Hustle, The Profit\n\nLagos is the heartbeat of Nigeria’s economy — fast-paced, always moving, and never sleeping. If you’re looking for a city with guaranteed demand, Lagos real estate is king.\n\nWhy Invest in Lagos?\n\nHigh population = high demand — over 20 million people and growing; houses, land, and rentals never stay empty for long. Growing development hubs — Ibeju-Lekki, Epe, and Abijo GRA are turning into prime real estate zones. Massive infrastructure boom — the Lekki-Epe Expressway, Fourth Mainland Bridge, and the Dangote Refinery are making Lagos property more valuable daily. Short-term rental market — with business travelers and tourists, Lagos is the best place to earn passive income from rentals.\n\nBest Places to Invest in Lagos (2025)\n\nEko Paragon Residence (Abijo GRA): luxury apartments with a hotel-style experience, perfect for investors looking for high rental income. Legacy Garden City, Phase 2 (Imota): affordable land in a fast-growing location, ideal for land banking and long-term appreciation.\n\nAbuja: The Prestige, The Stability\n\nAbuja is different. It’s calm, structured, and known for its premium real estate market. Unlike Lagos, property prices don’t fluctuate wildly — they steadily appreciate.\n\nWhy Invest in Abuja?\n\nGovernment presence = stability — Abuja is the political capital, meaning steady development and long-term investment security. Less hustle, more exclusivity — unlike Lagos, Abuja is not overcrowded; property owners enjoy a more serene and organized environment. Land banking opportunities — areas like Gwagwalada and Kuje are currently affordable but won’t be for long.\n\nBest Places to Invest in Abuja (2025)\n\n![Prime Boulevard Annex — Gwagwalada, Abuja](/images/blog/lagos-vs-abuja/prime-annex-abuja.jpg)\n\nPrime Boulevard Annex (Gwagwalada): a fast-rising area with affordable plots now but major price appreciation coming soon.\n\nLagos vs. Abuja: Which Should You Choose?\n\nChoose Lagos if you want fast-paced, high-demand real estate, high rental income potential, and quick appreciation in hot zones. Choose Abuja if you want a stable, structured, long-term investment, luxury and exclusivity, and government-backed real estate stability.\n\nAt the end of the day, both cities are goldmines — it depends on your investment goals.',
    coverImageUrl: '/images/blog/lagos-vs-abuja/eko-paragon-lagos.jpg',
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
      'A realtor once shared a story with me about a client who thought he had secured a prime plot by the roadside in Ibeju-Lekki.\n\nThe land was in a fast-developing area, and the price seemed like a good deal. But when it was time for allocation, he discovered the land belonged to the government — marked for a future road expansion project. His entire investment was gone.\n\nThis is one of the biggest mistakes people make in Lagos real estate — not doing due diligence.\n\nAt Aceroyal Estate Homes, we’ve helped hundreds of buyers invest safely and profitably. Here’s how to ensure your hard-earned money doesn’t go to waste.\n\n1. Don’t Go for “Too Good to Be True” Deals\n\nDo this instead: research market prices in areas like Lekki, Abijo GRA, and Epe. Buy from reputable developers — Aceroyal Estate Homes offers secure properties with full documentation.\n\n2. Don’t Pay Without Proper Documentation\n\n![Eko Paragon Residence — secure documentation and Certificate of Occupancy](/images/blog/lose-money-lagos/eko-paragon-certificate.jpg)\n\nDo this instead: ensure you get a Contract of Sale or Deed of Assignment. Make payments to a corporate account, not personal accounts. Work with established real estate firms like Aceroyal, where every transaction is transparent and secure.\n\n3. Think Long-Term\n\nA lot of people buy real estate expecting quick profits in a few months. But true wealth in Lagos real estate comes from long-term appreciation and smart investments. Consider off-plan properties like Eko Paragon Residence, which offer high ROI and secure documentation. Be patient — the best real estate investments appreciate over time.\n\nMake a Smart Investment Today\n\nAt Aceroyal Estate Homes, we offer secure, high-value properties with full documentation. Don’t take risks with your hard-earned money. Secure your future today — send us a message now!',
    coverImageUrl: '/images/blog/lose-money-lagos/eko-paragon-certificate.jpg',
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
    // TODO(content): one of the ~20 older live-blog posts not migrated with
    // Daniel's own copy — this content is a paraphrase, not his verbatim
    // text, and no image was ever provided. No stock photo either, since
    // that would just swap one placeholder for another.
    coverImageUrl: null,
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
      'Imagine a world where you can enjoy the privacy and comfort of your own home while having access to room service, buffet meals, a world-class spa, and a range of other exclusive services. That’s the Hotel Residence experience. Modern Airbnb ambience infused with Eko hospitality.\n\n![Eko Paragon Residence — 1, 2 and 3 bedroom apartments](/images/blog/hotel-residences/eko-paragon-render.jpg)\n\nAceRoyal Estate Homes, in partnership with Lagos State Development & Property Corporation (LSDPC) and Gidi Homes, is proud to present Eko Paragon Residence, a groundbreaking development that redefines luxury living and investment.\n\nEko Paragon Residence is more than just an investment; it’s a lifestyle. It’s an opportunity to capitalize on Lagos’s vibrant energy and create a lucrative stream of income.\n\nEko Paragon offers furnished 1, 2 or 3 bedroom apartments or suites that are available for short-term or long-term rentals. Fully equipped with 24/7 power supply, valet parking, 24/7 security, a state-of-the-art health center, cinema, high-speed Wi-Fi, an Olympic-size swimming pool, dedicated concierge services, an innovative smart lifestyle, and eco-friendly energy efficiency.\n\nInvesting in a short-term rental can be highly stable and profitable. It’s stable because housing has been one of the most stable asset classes. As the city continues to attract international businesses and high-net-worth individuals, the appeal of hotel residences will only increase.\n\nContact AceRoyal Estate Homes today to learn more about Eko Paragon Residence and discover how you can unlock the potential of Lagos’s thriving hospitality market.',
    coverImageUrl: '/images/blog/hotel-residences/eko-paragon-render.jpg',
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
      'We all make financial goals every year. We dream big, plan to invest, and set ambitious targets. But how often do those plans actually turn into real, lasting wealth?\n\nThis year, flip the switch. Take concrete steps towards building sustainable wealth.\n\nMaking smart financial choices is key. At AceRoyal Estates, we give you the information and support you need to confidently invest in real estate. Our expertise and amazing properties make us the right choice for your investment journey.\n\nIntroducing the AceRoyal Investment Plan — your 2025 roadmap to financial success.\n\nA — Appreciate: Land Banking\n\nInvest in prime land within rapidly developing areas like Legacy Garden City, Imota, Ikorodu and our ultra luxurious Edo Mega City. Land value consistently appreciates over time, offering significant long-term returns.\n\nC — Capitalize: Experience True Passive Income\n\nInvest in our state-of-the-art Eko Paragon Residence. Enjoy modern living with unmatched luxury and comfort. Generate consistent rental income from both short-term and long-term residents with minimal effort on your part. Our expert team handles all aspects of property management, including tenant screening, maintenance, and cleaning. Just relax and reap the reward — sit back and enjoy the benefits of passive income while we take care of the rest.\n\nE — Enhance: Diversify Your Portfolio\n\nExplore both land banking and hotel residence investments to enhance your portfolio’s stability and maximize your returns.',
    // No image was provided for this post — leave unset rather than a
    // stock photo.
    coverImageUrl: null,
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
      'It’s been a minute! We know you’ve missed us and we missed you too! We’re excited to be back and better than ever. We’ve been working hard to bring you more exciting and valuable content, and we can’t wait to share it with you. From now on, you can look forward to fresh insights, tips, and updates from us every single week.\n\nNow, let’s talk about something we know you’ll find super important: land titles and registered surveys. If you’re a landowner or thinking about becoming one, you absolutely need to get this right. Here’s why — and how Aceroyal makes the whole process not just easy, but enjoyable and stress-free.\n\nWhat’s a Land Title Anyway?\n\nA land title is essentially the official document that proves you own a piece of land. In Nigeria, there are a few types of land titles you might come across, such as the Certificate of Occupancy (C of O), Right of Occupancy (R of O), Freehold, and others. Each serves a different purpose and offers various levels of security. For now, let’s focus on one crucial aspect of land ownership: the registered survey, which is an essential step in the process.\n\nWhat’s a Registered Survey?\n\nA registered survey is like a map of your land. It shows the exact boundaries, dimensions, and location of your property, prepared by a licensed surveyor and filed with the state’s Office of the Surveyor-General. Think of it as your land’s GPS coordinates — clearly marking where your property begins and ends, and ensuring there are no disputes with boundaries.\n\nWhy Do You Need a Registered Survey?\n\nA registered survey isn’t just a formality; it’s a vital part of the land ownership process. Here’s why: it gives clarity and security, showing exactly where your land is so there’s no confusion or future arguments with neighbors. It’s essential for obtaining a land title — you can’t get your C of O or other land titles without a registered survey, since it’s a necessary step to prove the land is free from government issues and other encumbrances. And it gives peace of mind, helping verify that the land you’re buying is legitimate and doesn’t have any hidden problems like government acquisition or other claims.\n\nIf you’ve ever tried handling the process on your own, you know it’s not easy, as there are multiple steps involved. These steps come with their own challenges — red tape, delays, and unexpected costs. But here’s the good news: Aceroyal Estates Homes handles all of this for you.\n\nOur goal is simple: to make land ownership a breeze. Every piece of land and property we sell is free from government encumbrances, adverse claimants, and communal issues. We take pride in offering you peace of mind, knowing that your land is secure and legitimate.\n\nOur team of experts knows the Nigerian land documentation process inside and out. From getting a registered survey to securing other land titles, we manage it all, so you don’t have to worry about handling the paperwork or navigating through multiple government offices. We take a full-service approach — whether it’s engaging a certified surveyor, submitting documents to the right authorities, or keeping you informed every step of the way, we ensure that everything is done right.\n\nLet Us Handle the Hard Stuff, You Enjoy the Benefits\n\nLet’s take it back to our first allocation of The Legacy Garden City Phase 1 on August 10th, 2024 — our clients enjoyed a completely hands-off experience. We had already done all the groundwork, so they simply arrived to collect their documents and sign — no stress, no back-and-forth with paperwork. Each of them had their registered survey and every other document ready without having to lift a finger. We took care of everything behind the scenes, making sure the entire process was smooth and effortless. This is what we strive for at Aceroyal Estates Homes — making land ownership as easy as possible for you.\n\nSecuring a property doesn’t have to be a nightmare. With us, you can relax knowing your property is legally yours. We handle all the tough parts so you can focus on what really matters — enjoying your land or planning your next big project.',
    coverImageUrl: '/images/blog/land-titles/land-titles-cover.jpg',
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
      'In a groundbreaking move set to reshape the real estate landscape, AceRoyal Estates Limited is thrilled to announce its official partnership with Africa’s leading brokerage firm, The Billionaire Realtor Group (BRG). This strategic collaboration is designed to fortify our market presence, elevate sales, and enhance delivery capabilities, opening new avenues for real estate development projects in West Africa.\n\nAs a key player in the real estate industry, AceRoyal Estates Limited recognizes the immense potential of this partnership. By aligning with BRG, acknowledged as Africa’s premier brokerage firm, we aim to leverage their vast expertise and expansive network. This collaboration comes at a pivotal time, with property market analysis in Nigeria indicating a growing demand for innovative and upscale real estate solutions.\n\nDr. Endurance Agonor, our esteemed CEO, expressed his enthusiasm about the collaboration, stating: “In an era where collaboration should supersede competition, our partnership with The Billionaire Realtor Group is proof of our commitment to revolutionizing the real estate market. By pooling our resources and expertise, we are not only expanding our reach but also exploring real estate investment opportunities in Africa.”\n\nThe Billionaire Realtor Group, renowned for its expertise in luxury homes in Africa, brings a wealth of experience and a vast network of high-net-worth clients to the table. The synergy between the two entities is expected to create a powerhouse in the real estate domain, focusing on providing unmatched services to clients and staying ahead of real estate trends in Africa in 2024.\n\nThis collaboration is poised to significantly contribute to real estate development projects in West Africa, offering a broader range of premium real estate solutions. As the partnership unfolds, clients can anticipate enhanced efficiency, a wider array of property options, and an elevated customer experience.\n\nThis collaboration has garnered widespread attention, and you can also find the news on various reputable news platforms such as The Guardian. We invite you to cross-reference this exciting development on these esteemed news sources to confirm the authenticity and significance of this partnership.',
    coverImageUrl: '/images/blog/brg-partnership/partnership-photo.jpg',
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
      'In recognition of his achievements and leadership, Endurance Agonor, the CEO of AceRoyal Estate Homes Limited, has been appointed as the President of the prestigious Africa Under 40 CEO Forum. The appointment was announced during the top-notch continental award event held on July 22, 2023.\n\nThe Africa Under 40 CEO Forum is a platform that celebrates and honours young African achievers who have excelled in various industries, demonstrated commitment to professional excellence, and made significant contributions to community service and philanthropy.\n\nThe event, celebrating outstanding young achievers across the African continent, saw influential and accomplished young business leaders, all under the age of 40, come together to receive recognition for their remarkable contributions to the continent’s advancement. The forum aims to encourage and promote young African champions on a global stage, fostering networking and collaboration among successful young Africans for the sole agenda of advancing the African continent.\n\nEndurance Agonor’s appointment as President of the Africa Under 40 CEO Forum is a testament to his leadership qualities and dedication to driving growth and development within the real estate industry and beyond. As the CEO of AceRoyal Estate Homes Limited, he has demonstrated vision, strategic thinking, and a commitment to delivering high-quality real estate projects.\n\nUnder his guidance, AceRoyal Estate Homes Limited has garnered significant acclaim for its innovative approach to property development, sustainable practices, and commitment to community engagement. Dr. Endurance Agonor’s passion for transforming the real estate landscape has positioned the company as a key player in the industry.\n\nIn accepting the prestigious role as President, Agonor expressed his gratitude and emphasized the importance of unity and collaboration among young African business leaders. He highlighted the potential of harnessing their collective efforts to drive positive change and contribute to the advancement of the African continent.',
    coverImageUrl: '/images/blog/ceo-award/ceo-portrait.jpg',
    published: true,
    createdAt: '2023-08-08T00:00:00.000Z',
    updatedAt: '2023-08-08T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-metro-city-buy-hold',
    title: 'Metro City Garden Price Increase Alert',
    slug: 'metro-city-garden-price-increase-alert',
    excerpt: 'Metro City Garden’s price just jumped from ₦850,000 to ₦1,500,000 — see the new pricing and what’s driving the Buy & Hold strategy.',
    content:
      'The investment strategy called Buy & Hold. It’s a very strategic investment that mostly requires a little chunk of your money, resource, time, and above all, patience.\n\nResearch has shown that the Buy & Hold strategy is one outstanding way to triple your real estate portfolio if you have the patience.\n\nNow unto the good news. Metro City Garden price increase alert: from ₦850,000 to ₦1,500,000. This is so much good news to those who subscribed to the just concluded promo — see how your investment just appreciated in a blink.\n\nMetro City Garden now selling: 500sqm at ₦1,500,000, 300sqm at ₦1,000,000. Location: Itoikin, Epe. Landmarks: Lagos State Food Hub, District 1, Ajebo Grammar School, Isime Lagos.\n\nFeatures: perimeter fencing, green areas, dry land, 24-hour power, water supply, drainage, and more. Title: Freehold/Registered Survey.\n\nMetro City Garden guarantees 100% ROI just as you can see now — join a team of landowners today and experience peace of mind. For more information, contact our customer care lines: 09156549709, 08053605093.\n\n~ACE, building the future together.',
    coverImageUrl: '/images/estates/metro-city-garden/metro-city-flyer.jpg',
    published: true,
    createdAt: '2023-03-24T00:00:00.000Z',
    updatedAt: '2023-03-24T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-good-tidings-promo',
    title: 'Aceroyal Estates Homes Brings You Good Tidings!',
    slug: 'aceroyal-estates-homes-brings-you-good-tidings',
    excerpt: 'A 50% End of Year/New Year discount on land at New City Estate, Imota, Ikorodu.',
    content:
      'Good tidings we bring to you and your friends — good tidings of Christmas and a Happy New Year!\n\nAceroyal Estates Homes is giving a 50% discount for our End of the Year/New Year sales — with just ₦850,000 instead of ₦1.7m you can buy 500sqm of land, and with just ₦500,000 instead of ₦850,000 you can buy 300sqm of land, at New City Estate, Imota, Ikorodu, Lagos.\n\nIsn’t this exciting? I know you never saw it coming, right?\n\nThis promo will end on the 31st of January 2023, so don’t miss this amazing offer and be part of the people who will be celebrated in the New Year.\n\nYou! Yes, you! Don’t sleep — wake up and become a landowner!',
    coverImageUrl: '/images/estates/new-city-estate/new-city-flyer.jpg',
    published: true,
    createdAt: '2022-12-29T00:00:00.000Z',
    updatedAt: '2022-12-29T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-goody-bag-promo',
    title: 'Goody Bag Promo',
    slug: 'goody-bag-promo',
    excerpt: 'Buy a plot at Novena Estate Phase 2 and get 100 bags of Dangote Cement free.',
    content:
      'Promo! Promo!! Promo!!! AceRoyal got you covered.\n\nAceRoyal Estates Homes Ltd is known for the amazing promos they always make available to their clients. The Goody Bag Promo is the promo of the century — it’s the first of its kind. No other estate company does it better than ACEROYAL.\n\nWhen you buy 1 plot of land in Novena Estate Phase 2, you get 100 bags of Dangote Cement free of charge. With this, you can start fencing your land or start the foundation of your house in Novena Estate 2, Iraye, Epe.\n\nWe don’t just sell land to you, we also support your vision of becoming a homeowner.\n\nJump on this offer today by calling 09156549709 to book an inspection with us now!\n\nAceroyal: we are building the future together!',
    coverImageUrl: '/images/estates/novena-estate/novena-goody-bag-flyer.jpg',
    published: true,
    createdAt: '2022-10-17T00:00:00.000Z',
    updatedAt: '2022-10-17T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-introducing-novena',
    title: 'Introducing Our Latest Estate in Lagos: Iraye, Epe',
    slug: 'introducing-our-latest-estate-in-lagos-iraye-epe',
    excerpt: 'Novena Estate Phase 2 — a buy-and-build residential estate at Iraye, Epe, now selling at ₦2.5 million per 500sqm plot.',
    content:
      'Introducing our latest estate in Lagos, Iraye, Epe — Novena Estate.\n\nEpe is a town and local government area (LGA) in Lagos State, Nigeria, on the north side of the Lekki Lagoon. Epe right now is one of the most sought-after destinations for investors looking at land flipping years later or settling in away from the buzz and rush of crowded Lagos. You would be amazed at the ROI of this location in the next 2-3 years.\n\nThat is why your No. 1 real estate company, Aceroyal Estates, has decided to bring this to you again — congratulations to those who picked a slot and more from Phase 1 — before this also gets sold out.\n\nLand Title: Registered Survey.\n\nLandmarks: Isimi Lagos, Alaro City, Dangote Refinery, Epe Resort and Spa, Access Bank, Lekki Trade Fair, and the proposed local airport.\n\nFeatures of Novena Estate Phase 2 include: dry land, perimeter fencing, steady water supply and electricity, private bar/gym, estate security, paved road, garden, shopping center, and church/mosque.\n\nA plot of land at Novena Estate Phase 2 is measured at 500sqm. We are currently selling at ₦2.5 million per plot.',
    coverImageUrl: '/images/estates/novena-estate/novena-estate-flyer.jpg',
    published: true,
    createdAt: '2022-06-14T00:00:00.000Z',
    updatedAt: '2022-06-14T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-estate-launch',
    title: 'Estate Launch: La Regina Luxury Resort & Novena Estate Phase 2',
    slug: 'estate-launch-la-regina-luxury-resort-and-novena-estate-phase-2',
    excerpt: 'AceRoyal officially launches La Regina Luxury Resort Estate (Ketu, Epe) and Novena Estate Phase 2 (Iraye, Epe).',
    content:
      'You’re invited!\n\nAceRoyal Estates Homes Ltd invites the general public to the launching of her estates: La Regina Luxury Resort Estate, located at Ketu, Epe, and Novena Estate Phase 2, located at Iraye, Epe.\n\nWith Coach Spark Ovadje as the Chief Launcher and host of other co-launchers. If you know Coach Spark very well (Nigeria’s National Real Estate Coach), then you will know this is not an event to miss, because there is so much to learn and unlearn!\n\nThere are a lot of amazing things that will happen on that day. We will have a raffle draw where so many persons will have the opportunity of winning a free standing fan, an electric kettle, a LED TV, a mini-refrigerator, and lots more!\n\nBuses will be available at strategic locations to pick and drop you off.\n\nYou will have plenty to eat and drink.\n\nThe time remains 9 AM on Saturday, June 18th, 2022. See you on Saturday — and till then, please stay safe!\n\nCall/WhatsApp 09156549709 for further inquiries.',
    coverImageUrl: '/images/blog/estate-launch/launch-invite-flyer.jpg',
    published: true,
    createdAt: '2022-06-17T00:00:00.000Z',
    updatedAt: '2022-06-17T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-ileya-promo',
    title: 'Ileya Mega Discount Promo',
    slug: 'ileya-mega-discount-promo',
    excerpt: 'A 40% Ileya discount on plots at Novena Estate Phase 2 — ₦1.5 million instead of ₦2.5 million.',
    content:
      'It’s Ileya — AceRoyal got you covered.\n\nAt Aceroyal Estate Homes Ltd, we hold dearly our commitment to our customers and the community. Because of this, we are giving out a massive discount on every plot purchased this July, through our Ileya Mega Discount Promo.\n\nDuring this period of celebration, we want to put smiles on the faces of our customers. We would be selling a plot of land at Novena Estate Phase 2 for ₦1.5M instead of the actual price of ₦2.5M — a whopping 40% discount.\n\nThat’s not all — we have also lined up numerous fantastic prizes like bags of rice, oil, phones, a refrigerator, and even a mature ram to be won by all participants.\n\nThis Ileya promo runs for 10 days, starting on the 1st all through till the 10th of July 2022.\n\nMaximize this offer now!',
    coverImageUrl: '/images/blog/ileya-promo/ileya-flyer.jpg',
    published: true,
    createdAt: '2022-07-01T00:00:00.000Z',
    updatedAt: '2022-07-01T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-childrens-day-promo',
    title: 'Happy Children’s Day — Children’s Day Promo',
    slug: 'happy-childrens-day-childrens-day-promo',
    excerpt: 'Buy a plot for your kids at Novena Estate Phase 2 — ₦350k initial deposit, balance spread over 10 months, half a plot free.',
    content:
      'Happy Children’s Day!\n\nBuy a plot for your kids today at Novena Estate Phase 2 — spread the balance for 10 months, pay an initial deposit of ₦350k, and get half a plot free, with instant allocation upon first deposit and documents.\n\nEpe is a town and local government area (LGA) in Lagos State, Nigeria, on the north side of the Lekki Lagoon. Epe right now is one of the most sought-after destinations for investors looking at land flipping years later or settling in away from the buzz and rush of crowded Lagos. You would be amazed at the ROI of this location in the next 2-3 years.\n\nThat is why your No. 1 real estate company, Aceroyal Estates, has decided to bring this to you again — congratulations to those who picked a slot and more from Phase 1 — before this also gets sold out.\n\nLand Title: Registered Survey.\n\nLandmarks: Isimi Lagos, Alaro City, Dangote Refinery, Epe Resort and Spa, Access Bank, Lekki Trade Fair, and the proposed local airport.\n\nFeatures of Novena Estate Phase 2 include: dry land, perimeter fencing, steady water supply and electricity, private bar/gym, estate security, paved road, garden, shopping center, and church/mosque.',
    coverImageUrl: '/images/blog/childrens-day-promo/childrens-day-flyer.jpg',
    published: true,
    createdAt: '2022-05-01T00:00:00.000Z',
    updatedAt: '2022-05-01T00:00:00.000Z',
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
  // Real footage from a quarterly Allocation Day at The Legacy Garden City —
  // shown as an event clip rather than attributed to any one named client,
  // since we don't have a specific person's approved quote to go with it.
  {
    id: 'fallback-testimonial-allocation-video',
    name: 'Allocation Day at The Legacy Garden City',
    role: 'Aceroyal Estate Homes',
    message:
      'New landowners receive their Certificate of Allocation and walk their plots on site — this is what Allocation Day looks like at The Legacy Garden City.',
    videoUrl: '/videos/allocation-day.mp4',
    imageUrl: '/images/gallery/allocation-day/latest-land-owner.jpg',
    active: true,
  },
];

export const fallbackGalleryItems: GalleryItem[] = [
  {
    id: 'fallback-gallery-allocation-1',
    title: 'Latest Land Owner',
    mediaType: 'image',
    mediaUrl: '/images/gallery/allocation-day/latest-land-owner.jpg',
    estateName: 'The Legacy Garden City',
    active: true,
  },
  {
    id: 'fallback-gallery-allocation-2',
    title: 'I Have Just Been Allocated',
    mediaType: 'image',
    mediaUrl: '/images/gallery/allocation-day/legacy-garden-city-allocated.jpg',
    estateName: 'The Legacy Garden City',
    active: true,
  },
  {
    id: 'fallback-gallery-allocation-3',
    title: 'I Just Got Allocated',
    mediaType: 'image',
    mediaUrl: '/images/gallery/allocation-day/just-got-allocated.jpg',
    estateName: 'The Legacy Garden City',
    active: true,
  },
  {
    id: 'fallback-gallery-allocation-4',
    title: 'Allocation Day on Site',
    mediaType: 'image',
    mediaUrl: '/images/gallery/allocation-day/legacy-garden-city-key.jpg',
    estateName: 'The Legacy Garden City',
    active: true,
  },
  {
    id: 'fallback-gallery-allocation-video',
    title: 'Allocation Day Walkthrough',
    mediaType: 'video',
    mediaUrl: '/videos/allocation-day.mp4',
    thumbnailUrl: '/images/gallery/allocation-day/legacy-garden-city-key.jpg',
    estateName: 'The Legacy Garden City',
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

// Real partner names and logos — AEON Trisl Group and Emaar Properties
// Dubai from the About page's "International Reach" section, LSDPC and
// Gidi Homes from the Eko Paragon Residence development credits, and BRG
// from the partnership announcement blog post.
export const fallbackPartners = [
  {
    id: 'fallback-partner-aeon-trisl',
    name: 'AEON Trisl Group',
    logoUrl: '/images/partners/aeon-trisl-logo.png',
    category: 'PARTNER',
    active: true,
  },
  {
    id: 'fallback-partner-emaar',
    name: 'Emaar Properties',
    logoUrl: '/images/partners/emaar-logo.png',
    category: 'PARTNER',
    // Emaar's mark is a filled purple square (not a transparent cutout) —
    // fill the whole card with it instead of padding it onto a white
    // backdrop, which would otherwise double-box it.
    ownBackground: true,
    active: true,
  },
  {
    id: 'fallback-partner-lsdpc',
    name: 'Lagos State Development & Property Corporation (LSDPC)',
    logoUrl: '/images/partners/lsdpc-logo.png',
    category: 'PARTNER',
    active: true,
  },
  {
    id: 'fallback-partner-gidi-homes',
    name: 'Gidi Homes',
    logoUrl: '/images/partners/gidi-homes-logo.png',
    category: 'PARTNER',
    // White-only artwork on a black card — needs its own dark background to
    // stay visible, so fill the card with it rather than padding onto white.
    ownBackground: true,
    active: true,
  },
  {
    id: 'fallback-partner-brg',
    name: 'The Billionaire Realtor Group',
    logoUrl: '/images/partners/brg-logo.jpg',
    category: 'PARTNER',
    // Gold/white badge on a dark gradient — same reasoning as Gidi Homes.
    ownBackground: true,
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
  {
    id: 'fallback-resource-alpha-garden-brochure',
    title: 'Alpha Garden City — Brochure',
    url: 'https://aceroyalestates.com/wp-content/uploads/2026/05/Alpha-Garden-City-Brochure-Plus.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-alpha-garden-city',
    estate: fallbackEstates.find((e) => e.slug === 'alpha-garden-city'),
  },
  {
    id: 'fallback-resource-villa-nova-flyer',
    title: 'Villa Nova Bungalows — Pricing Flyer',
    url: '/images/estates/villa-nova/villa-nova-flyer-1.jpg',
    fileType: 'JPG',
    estateId: 'fallback-estate-villa-nova',
    estate: fallbackEstates.find((e) => e.slug === 'villa-nova-bungalows'),
  },
  {
    id: 'fallback-resource-new-city-flyer',
    title: 'New City Estate — Flexible Plan Flyer',
    url: '/images/estates/new-city-estate/new-city-flyer.jpg',
    fileType: 'JPG',
    estateId: 'fallback-estate-new-city',
    estate: fallbackEstates.find((e) => e.slug === 'new-city-estate'),
  },
  {
    id: 'fallback-resource-metro-city-flyer',
    title: 'Metro City Garden — Pricing Flyer',
    url: '/images/estates/metro-city-garden/metro-city-flyer.jpg',
    fileType: 'JPG',
    estateId: 'fallback-estate-metro-city-garden',
    estate: fallbackEstates.find((e) => e.slug === 'metro-city-garden'),
  },
  {
    id: 'fallback-resource-novena-flyer',
    title: 'Novena Estate Phase 2 — Pricing Flyer',
    url: '/images/estates/novena-estate/novena-estate-flyer.jpg',
    fileType: 'JPG',
    estateId: 'fallback-estate-novena',
    estate: fallbackEstates.find((e) => e.slug === 'novena-estate-phase-2'),
  },
];

export const fallbackFaqs = [
  {
    id: 'fallback-faq-1',
    question: 'Can I inspect before payment?',
    answer: 'Yes. We recommend booking an inspection before making a purchase decision — use the Book Inspection page to join the next scheduled visit to any active estate.',
    sortOrder: 0,
  },
  {
    id: 'fallback-faq-2',
    question: 'Are payment plans available?',
    answer: 'Most estates offer both an outright price and an installment plan (typically 6-12 months with an initial deposit). Payment-plan availability and terms vary by estate and plot size — check the estate’s Available Options section or contact the team for the current schedule.',
    sortOrder: 1,
  },
  {
    id: 'fallback-faq-3',
    question: 'What documents do I get when I buy land or a property?',
    answer: 'Every plot comes with a registered survey — a licensed surveyor’s map of your land’s exact boundaries and location, filed with the state’s Office of the Surveyor-General — which is required before any land title (Certificate of Occupancy, Right of Occupancy, Freehold, etc.) can be issued. Aceroyal handles the surveying, documentation, and title process on your behalf.',
    sortOrder: 2,
  },
  {
    id: 'fallback-faq-4',
    question: 'What happens on Allocation Day?',
    answer: 'Allocation Day is held every three months. Licensed surveyors walk you through your plot’s exact location and boundaries, and our Admin team has your documents ready to sign on-site — no back-and-forth or weeks of waiting. It’s also a chance to meet future neighbors and fellow investors.',
    sortOrder: 3,
  },
  {
    id: 'fallback-faq-5',
    question: 'How do I make a payment?',
    answer: 'Payments should always be made into Aceroyal’s corporate account, never a personal account. Contact the sales team or your assigned agent for current account details before making any payment.',
    sortOrder: 4,
  },
  {
    id: 'fallback-faq-6',
    question: 'Which cities does Aceroyal operate in?',
    answer: 'Aceroyal currently has active estates across Lagos, Oyo, Enugu, Edo, and Abuja, with physical offices to match. See the Estates page for the full current list.',
    sortOrder: 5,
  },
  {
    id: 'fallback-faq-7',
    question: 'Can I buy from outside Nigeria?',
    answer: 'Yes — Aceroyal works with buyers in the diaspora regularly. Documentation, allocation, and payment can all be coordinated remotely; contact the team to discuss your specific location and timeline.',
    sortOrder: 6,
  },
  {
    id: 'fallback-faq-8',
    question: 'Where can I find brochures and consent forms?',
    answer: 'Estate-specific brochures, consent forms, and pricing flyers are available on the Downloads & Resources page, and linked directly from each estate’s own page.',
    sortOrder: 7,
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
