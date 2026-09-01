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
};

export const fallbackEstates: Estate[] = [
  {
    id: 'fallback-estate-alpha-garden-city',
    name: 'Alpha Garden City',
    slug: 'alpha-garden-city',
    description:
      'Alpha Garden City is a thoughtfully planned, nature-forward residential community in Ibadan, built around orchard-style landscapes, wellness-focused amenities, and low-density planning. Every acre is enriched with 10-15 fruit-bearing trees, and the estate features a Central Wellness Village (holistic spa, wellness clinics, fitness studios), an integrated golf course, and a low-density model of roughly one home per acre. Residential options include wellness villas, eco lodges, retirement homes, and serviced apartments.\n\nPrelaunch pricing: 500sqm from ₦3.5M, 1 acre (+1 plot free) from ₦12.5M. Initial deposit from ₦500K (500sqm) / ₦1.5M (1 acre). Promotional pricing — confirm current rates before publishing.',
    state: 'Oyo',
    city: 'Ibadan',
    address: 'Ibadan, Oyo State',
    coverImage: estateImages.alphaGardenCity,
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/05/Alpha-Garden-City-Brochure-Plus.pdf',
    gallery: [estateImages.alphaGardenCity],
    status: 'ACTIVE',
    amenities: ['Golf Course', 'Central Wellness Village', 'Nature Walking Trails', 'Yoga & Meditation Platforms', 'Cycling Paths'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-heritage',
    name: 'Heritage Estate',
    slug: 'heritage-estate',
    description:
      'Heritage Estate (Obodo Oma) is a premium residential and commercial estate in Ekwegbe Nike, Enugu State, with an approved layout and registered survey. Less than 5 minutes from Maduka University, Police Quarters, the Bio-Research Institute, and Ugwugo Roundabout, and about 15 minutes from Nike Lake.\n\nNow selling: 500sqm at ₦6M, initial deposit ₦1M. Promotional pricing — confirm current rates before publishing.',
    state: 'Enugu',
    city: 'Nike',
    address: 'Ekwegbe Nike, Enugu State',
    coverImage: estateImages.placeholder1,
    videoUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/01/Heritage-Enugu.mp4',
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/01/The-Heritage-Estate-Brochure.pdf',
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Approved Layout', 'Registered Survey'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-edo-mega-city',
    name: 'Edo Mega City',
    slug: 'edo-mega-city',
    description:
      'Edo Mega City is the biggest and most secured private residential estate in Edo State, located on the Aduduwa By-Pass and heavily guarded by the Army. Available in 100ft x 100ft (900sqm) duplex plots and one-acre (3,500sqm) country home mansion plots, titled C of O.',
    state: 'Edo',
    city: 'Benin City',
    address: 'Aduduwa By-Pass, Benin City, Edo State',
    coverImage: estateImages.placeholder2,
    brochureUrl: null,
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Army-Guarded Security', 'C of O Title'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-downtown-lagos-phase-2',
    name: 'Downtown Lagos Commercial City — Phase 2',
    slug: 'downtown-lagos-phase-2',
    description:
      'Downtown Commercial City Phase 2 follows the sold-out Phase 1, in Labour City, Ibeju-Lekki, on the Coastal Road — near the Lekki Free Trade Zone, Dangote Refinery, Lekki Deep Sea Port, and Lekki-Epe International Airport. Titled C of O / Government Allocation.',
    state: 'Lagos',
    city: 'Ibeju-Lekki',
    address: 'Labour City, Ibeju-Lekki, Coastal Road, Lagos State',
    coverImage: estateImages.placeholder3,
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2025/03/Downtown-Brochure.pdf',
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Near Lekki Free Trade Zone', 'Near Lekki Deep Sea Port', 'Near Lekki-Epe International Airport'],
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
    gallery: [],
    status: 'SOLD_OUT',
    amenities: ['Business District', 'Green Spaces & Waterways', '24/7 Power', 'High-Speed Internet'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-eko-paragon',
    name: 'Eko Paragon Residence',
    slug: 'eko-paragon-residence',
    description:
      'Eko Paragon Residence is a premium hotel-residence development in Abijo G.R.A., Lagos, developed in partnership with the Lagos State Development & Property Corporation (LSDPC). Unit types include 1-bedroom business suites, 2-bedroom signature suites, and 3-bedroom presidential terrace duplexes with BQ.\n\nPricing: 1-bedroom business suite ₦85M (₦5M initial deposit), 2-bedroom signature suite ₦95M (₦10M initial deposit), 3-bedroom presidential terrace duplex + BQ ₦150M (₦20M initial deposit). Promotional pricing — confirm current rates before publishing.',
    state: 'Lagos',
    city: 'Abijo',
    address: 'Abijo G.R.A., Lagos',
    coverImage: estateImages.placeholder2,
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/01/EKO-PARAGON-MAIN-BROCHURE-1.pdf',
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Fitness Center', 'Swimming Pool', '24/7 Security', 'Uninterrupted Power Supply', 'Bio-Digester Waste System'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-prime-annex',
    name: 'Prime Boulevard Annex',
    slug: 'prime-annex',
    description:
      'Prime Boulevard Annex sits behind Prime Boulevard 1 in Gwagwalada, Abuja, close to the University of Abuja, Nnamdi Azikiwe International Airport, and the University of Abuja Teaching Hospital. Available for residential (300sqm & 500sqm) and commercial (1000sqm) purposes, titled C of O.\n\nNow selling: 300sqm at ₦3M (₦1M initial deposit), 500sqm at ₦5M (₦1.5M initial deposit). Promotional pricing — confirm current rates before publishing.',
    state: 'Abuja',
    city: 'Gwagwalada',
    address: 'Gwagwalada, Abuja (tarred road behind Prime Boulevard 1)',
    coverImage: estateImages.placeholder3,
    brochureUrl: null,
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Perimeter Fencing', 'Maximum Security', 'Stable Electricity', 'Shopping Complex'],
    createdAt: now,
    updatedAt: now,
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
    images: [
      {
        id: 'fallback-property-duplex-image',
        url: estateImages.placeholder2,
        altText: 'Luxury duplex exterior',
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
    estateId: 'fallback-estate-eko-paragon',
    estate: fallbackEstates.find((e) => e.slug === 'eko-paragon-residence'),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-property-land',
    title: 'Prime Estate Land',
    slug: 'prime-estate-land-abuja',
    description: 'Serviced estate plots suitable for residential development, with access roads and documentation support.',
    type: 'LAND',
    status: 'AVAILABLE',
    price: 25000000,
    currency: 'NGN',
    state: 'Abuja',
    city: 'Gwarinpa',
    address: 'Plot 45, Gwarinpa Estate',
    bedrooms: null,
    bathrooms: null,
    size: '500sqm',
    amenities: ['Gated Estate', 'Good Road Access', 'Survey Plan'],
    featured: true,
    latitude: 9.109,
    longitude: 7.404,
    images: [
      {
        id: 'fallback-property-land-image',
        url: estateImages.placeholder3,
        altText: 'Prime estate land',
      },
    ],
    variants: [
      {
        id: 'fallback-land-variant-plot',
        label: '500sqm Plot',
        price: 25000000,
        currency: 'NGN',
        size: '500sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
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
        url: brochureUrl,
      },
    ],
    estateId: 'fallback-estate-prime-annex',
    estate: fallbackEstates.find((e) => e.slug === 'prime-annex'),
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
      'What unfolded at Downtown Lagos Commercial City Phase 2 wasn’t just a gathering, a celebration, or even a launch event. It was an experience, one that blended energy, people, and possibility into something far more meaningful than a typical carnival.\n\nThe launch marked more than the unveiling of a new development — it introduced a commercial land in Lagos positioned for relevance, growth, and long-term value. Strategically located just minutes from the Dangote Refinery and in close proximity to the Calabar Coastal Road, Downtown Lagos Commercial City Phase 2 sits within a fast-rising economic corridor.\n\nOwning a plot here is not just about buying land, it is about securing a position within a future commercial center. For investors and business owners, early entry into developments like this often defines long-term advantage.\n\nDowntown Lagos Commercial City Phase 2 is not just expanding commercial space. It is creating a hub where business, visibility, and future value intersect.',
    coverImageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
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
      'A lot of people are starting to look beyond the usual places like Lekki and Ajah, because the real opportunity now is getting in early somewhere that is still growing. That’s exactly why smart investors are beginning to buy land in Eleko.\n\nLagos keeps expanding — what used to be considered "far" a few years ago is now fully developed and expensive, as happened with Lekki, Ajah, and Sangotedo. That same movement is heading toward Eleko now, and the price of land there is still at entry level compared to other parts of Lagos on the same axis.\n\nEleko sits along the Lekki-Epe corridor, one of the fastest-developing parts of Lagos. One major confidence point for investors: Phase 1 of Downtown Lagos Commercial City was a success — allocations were completed and all clients received their plots as promised.',
    coverImageUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
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
      'Savvy investors are earning passive income by owning hotel residences rather than managing traditional Airbnbs directly. Not all short-term rental investments are worth it — some drain your time and resources, while the right hotel residence gives high returns with zero effort.\n\nEko Paragon Residence, an upcoming five-star hotel residence in Abijo GRA, Lagos, developed by Aceroyal Estate Homes in partnership with LSDPC, offers a fully managed system: the hotel team handles marketing, guest experience, and maintenance, while the owner simply enjoys rental income.\n\nWith a hotel residence like Eko Paragon, investors can expect steady, predictable income, plus appreciating property value in Abijo GRA — earning both rental income and long-term value growth.',
    coverImageUrl: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
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
      'Unlike cars or gadgets that lose value over time, land is an appreciating asset. Lagos, Abuja, and Benin are expanding rapidly, turning today’s outskirts into tomorrow’s prime real estate.\n\nLand banking — the strategic purchase of land in high-growth areas, held for future value appreciation — has turned modest early investments into significant returns for those who got in early, including Aceroyal’s own in-house Architect and Site Manager.\n\nAt Aceroyal Estate Homes, we’ve helped hundreds of investors, including those in the diaspora, secure land without fear of scams.',
    coverImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2025-03-26T00:00:00.000Z',
    updatedAt: '2025-03-26T00:00:00.000Z',
  },
  {
    id: 'fallback-blog-nigerian-real-estate-getting-started',
    title: 'Thinking of Investing in Nigerian Real Estate? Here’s the Right Way to Get Started',
    slug: 'thinking-of-investing-in-nigerian-real-estate-here-is-the-right-way-to-get-started',
    excerpt: 'A practical checklist for diaspora and first-time investors: goals, location, paperwork, and starting small.',
    content:
      'Real estate in Nigeria is one of the smartest investments you can make, but only if you do it the right way — buying property is not like ordering online and hoping it arrives. You need a strategy.\n\nStart with a clear goal: are you buying for yourself, to rent out, or to hold until the value grows? Pick the right location — the Lekki-Epe corridor, with the Lekki Free Trade Zone, Dangote Refinery, and proposed airport, is turning the region into a real estate hotspot.\n\nAlways verify the paperwork before buying — check for a C of O, Governor’s Consent, or a proper Deed of Assignment. If the documentation isn’t clear, walk away. If you’re not ready for a big investment, start with a plot, develop it gradually, and scale up.',
    coverImageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
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
      'Investors dislike hidden fees, misrepresentation, or surprises about property issues. They value honesty and transparency above all — buyers and investors are especially cautious in the Nigerian property market.\n\nWhen a developer consistently demonstrates honesty, they build trust, and trust is the foundation for long-lasting relationships that turn clients into brand evangelists.\n\nAt Aceroyal Estates, our commitment to transparency means every transaction is handled with care so clients receive exactly what they are promised — we’ve earned our reputation by choosing honesty over hype.',
    coverImageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: '2025-03-15T00:00:00.000Z',
    updatedAt: '2025-03-15T00:00:00.000Z',
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
    photoUrl: null,
    active: true,
  },
  {
    id: 'fallback-team-regional-manager',
    name: 'Esther Udorji',
    role: 'Regional Manager',
    photoUrl: null,
    active: true,
  },
  {
    id: 'fallback-team-hr-manager',
    name: 'Umeh Jennifer Oluchi',
    role: 'HR Manager',
    photoUrl: null,
    active: true,
  },
  {
    id: 'fallback-team-head-legal',
    name: 'Barr. Arowolo Akinwale',
    role: 'Head of Legal',
    photoUrl: null,
    active: true,
  },
  {
    id: 'fallback-team-project-manager',
    name: 'Abidemi Adedoyin',
    role: 'Project Manager',
    photoUrl: null,
    active: true,
  },
  {
    id: 'fallback-team-client-service',
    name: 'Mary A. Adekahunsi',
    role: 'Head, Client Service/Customer Support (CSCSP, ACISCSM)',
    photoUrl: null,
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
];

// Deliberately empty — no real allocation event photos/videos sourced yet.
// Do not fill this with stock imagery: unlike hero/mood photography, gallery
// items specifically claim "this happened at our allocation event," so a
// stock substitute here would misrepresent something that didn't occur.
// Populate once Daniel supplies real media (photos/video from an allocation
// event, ideally hosted on Cloudinary per the earlier asset-storage decision).
export const fallbackGalleryItems: GalleryItem[] = [];

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
    logoUrl: '/images/cropped-cropped-logo-jpeg.jpg',
    category: 'PARTNER',
    active: true,
  },
  {
    id: 'fallback-partner-brg',
    name: 'The Billionaire Realtor Group',
    logoUrl: '/images/cropped-cropped-logo-jpeg.jpg',
    category: 'PARTNER',
    active: true,
  },
  {
    id: 'fallback-partner-emaar',
    name: 'Emaar Properties',
    logoUrl: '/images/cropped-cropped-logo-jpeg.jpg',
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
