export const SITE_URL = 'https://aceroyalestates.com';
export const SITE_NAME = 'Aceroyal Estates';
export const SITE_LOGO = `${SITE_URL}/images/aceroyal-symbol-colour.png`;

export function absoluteUrl(path: string | null | undefined) {
  if (!path) return undefined;
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function breadcrumbListJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
