import { siteConfig } from '@/config/site';

export const siteUrl = 'https://www.sriharshaagencies.in';
export const siteImage = `${siteUrl}/images/sri-harsha-shop.png`;

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path.startsWith('/') ? path : `/${path}`, siteUrl).toString();
}

export function createPageMetadata({ title, description, path = '/', noindex = false, absoluteTitle = false }) {
  const displayTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: 'en_IN',
      title: displayTitle,
      description,
      images: [{ url: siteImage, alt: `${siteConfig.name} shop in Tuni` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description,
      images: [siteImage],
    },
  };
}

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${siteUrl}/#store`,
    name: siteConfig.name,
    url: siteUrl,
    logo: absoluteUrl('/images/sri-harsha-logo.png'),
    image: siteImage,
    telephone: siteConfig.phone || undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tuni',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
    sameAs: siteConfig.socials.map((social) => social.href),
  };
}

export function jsonLdScript(data) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}
