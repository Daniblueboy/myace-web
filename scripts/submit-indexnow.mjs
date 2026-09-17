// One-off / re-runnable IndexNow submission — pings Bing (and Yandex,
// Seznam, Naver, which also honor IndexNow) with every URL in the live
// sitemap, so they crawl on request instead of waiting on their normal
// schedule. Key file must already be live at SITE_URL/<key>.txt (see
// public/<key>.txt) before this will validate.
//
// Usage: node scripts/submit-indexnow.mjs

const SITE_URL = 'https://aceroyalestates.com';
const INDEXNOW_KEY = '7a8b546073864732988b2f3f3ead77f0';

async function main() {
  const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!sitemapRes.ok) {
    throw new Error(`Failed to fetch sitemap: HTTP ${sitemapRes.status}`);
  }
  const xml = await sitemapRes.text();
  const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  if (urlList.length === 0) {
    throw new Error('No URLs found in sitemap.xml');
  }

  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });

  console.log(`IndexNow response: HTTP ${res.status}`);
  const body = await res.text().catch(() => '');
  if (body) console.log(body);

  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow submission failed with HTTP ${res.status}`);
  }
  console.log('Submitted successfully.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
