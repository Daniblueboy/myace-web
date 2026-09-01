import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // --- Active estates: same slug, different path prefix ---
      { source: "/alpha-garden-city", destination: "/estates/alpha-garden-city", permanent: true },
      { source: "/heritage-estate", destination: "/estates/heritage-estate", permanent: true },
      { source: "/edo-mega-city", destination: "/estates/edo-mega-city", permanent: true },
      { source: "/downtown-lagos-phase-2", destination: "/estates/downtown-lagos-phase-2", permanent: true },
      { source: "/downtown-lagos", destination: "/estates/downtown-lagos", permanent: true },
      { source: "/eko-paragon-residence", destination: "/estates/eko-paragon-residence", permanent: true },
      { source: "/prime-annex", destination: "/estates/prime-annex", permanent: true },

      // --- Discontinued/legacy estate pages: no new-site equivalent, send
      // to the current estate catalogue instead of 404 ---
      { source: "/legacy-garden", destination: "/estates", permanent: true },
      { source: "/the-prime", destination: "/estates", permanent: true },
      { source: "/the-prime-2", destination: "/estates", permanent: true },
      { source: "/prestige", destination: "/estates", permanent: true },
      { source: "/property-2", destination: "/estates", permanent: true },
      { source: "/new-city-estate", destination: "/estates", permanent: true },
      { source: "/metro-city", destination: "/estates", permanent: true },
      { source: "/la-regina", destination: "/estates", permanent: true },
      { source: "/la-regina-scheme-2", destination: "/estates", permanent: true },
      { source: "/property", destination: "/estates", permanent: true },

      // --- Migrated blog posts: old date-based WordPress URL -> new /blog/:slug ---
      // Note: the old site's own URL for this post has a slug that doesn't
      // match its actual title (a copy/paste artifact on their end) -
      // redirect target is intentionally different from the source slug.
      { source: "/2026/04/20/why-smart-investors-are-rushing-to-buy-land-in-eleko-2", destination: "/blog/beyond-the-carnival-downtown-lagos-commercial-city-phase-2", permanent: true },
      { source: "/2026/04/20/why-smart-investors-are-rushing-to-buy-land-in-eleko", destination: "/blog/why-smart-investors-are-rushing-to-buy-land-in-eleko", permanent: true },
      { source: "/2025/04/01/the-secret-investment-thats-creating-millionaires", destination: "/blog/the-secret-investment-thats-creating-millionaires", permanent: true },
      { source: "/2025/03/26/land-banking-the-smartest-investment-youll-regret-not-making", destination: "/blog/land-banking-the-smartest-investment-youll-regret-not-making", permanent: true },
      { source: "/2025/03/17/thinking-of-investing-in-nigerian-real-estate-here-is-the-right-way-to-get-started", destination: "/blog/thinking-of-investing-in-nigerian-real-estate-here-is-the-right-way-to-get-started", permanent: true },
      { source: "/2025/03/15/the-secret-ingredient-to-real-estate-success-no-one-is-talking-about", destination: "/blog/the-secret-ingredient-to-real-estate-success-no-one-is-talking-about", permanent: true },
      { source: "/2025/02/24/land-ownership-made-easy-why-allocation-day-matters", destination: "/blog/land-ownership-made-easy-why-allocation-day-matters", permanent: true },
      { source: "/2025/02/17/lagos-vs-abuja-where-should-you-invest-in-real-estate-in-2025", destination: "/blog/lagos-vs-abuja-where-should-you-invest-in-real-estate-in-2025", permanent: true },
      { source: "/2025/02/11/why-most-people-lose-money-in-lagos-real-estate-and-how-to-avoid-it", destination: "/blog/why-most-people-lose-money-in-lagos-real-estate-and-how-to-avoid-it", permanent: true },
      { source: "/2025/02/04/is-lagos-real-estate-still-a-good-investment-in-2025", destination: "/blog/is-lagos-real-estate-still-a-good-investment-in-2025", permanent: true },
      { source: "/2025/01/27/luxury-living-lucrative-returns-lagos-hotel-residences", destination: "/blog/luxury-living-lucrative-returns-lagos-hotel-residences", permanent: true },
      { source: "/2025/01/15/stop-dreaming-start-doing-build-real-wealth-this-year", destination: "/blog/stop-dreaming-start-doing-build-real-wealth-this-year", permanent: true },
      { source: "/2024/09/15/land-titles-and-why-they-matter", destination: "/blog/land-titles-and-why-they-matter", permanent: true },
      { source: "/2023/12/11/aceroyal-estates-limited-forges-strategic-partnership-with-the-billionaire-realtor-group", destination: "/blog/aceroyal-estates-forges-strategic-partnership-with-the-billionaire-realtor-group", permanent: true },
      { source: "/2023/08/08/dr-endurance-agonor-ceo-of-aceroyal-estates-becomes-president-of-africa-under-40-ceo-forum", destination: "/blog/dr-endurance-agonor-ceo-of-aceroyal-estates-becomes-president-of-africa-under-40-ceo-forum", permanent: true },

      // --- Older blog posts not migrated: no new-site equivalent, send to
      // the blog archive instead of 404 ---
      { source: "/2023/03/24/metro-city-garden-price-increase-alert", destination: "/blog", permanent: true },
      { source: "/2023/03/24/the-investment-strategy-called-buy-hold", destination: "/blog", permanent: true },
      { source: "/2023/05/07/introducing-new-city-estate-flexible-plan", destination: "/blog", permanent: true },
      { source: "/2022/06/14/introducing-our-latest-estate-in-lagos-iraye-epe", destination: "/blog", permanent: true },
      { source: "/2022/06/14/novena-phase-ii-selling-now", destination: "/blog", permanent: true },
      { source: "/2022/06/17/launching-launching-launching", destination: "/blog", permanent: true },
      { source: "/2022/07/01/ileya-mega-discount-promo-notice", destination: "/blog", permanent: true },
      { source: "/2022/10/17/elementor-19641", destination: "/blog", permanent: true },
      { source: "/2022/12/29/aceroyal-estates-homes-brings-you-good-tiding", destination: "/blog", permanent: true },
      { source: "/2022/05/01/happy-childrens-day", destination: "/blog", permanent: true },
      { source: "/blog-2", destination: "/blog", permanent: true },

      // --- Utility / static pages ---
      { source: "/about-2", destination: "/about", permanent: true },
      { source: "/contact-2", destination: "/contact", permanent: true },
      { source: "/policy", destination: "/privacy", permanent: true },
      { source: "/newsletter", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
