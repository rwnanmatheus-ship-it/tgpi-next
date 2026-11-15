import type { Metadata } from 'next';
import type { Locale } from './config';

const openGraphLocales: Record<Locale, string> = {
  en: 'en_US', 'pt-BR': 'pt_BR', es: 'es_ES', fr: 'fr_FR', de: 'de_DE', it: 'it_IT',
};
const defaultImage = {
  url: '/images/cinematic-2026/global-horizon-1600.webp',
  width: 1600,
  height: 900,
  alt: 'TGPI',
};

/** Public pages share brand defaults and keep their own canonical, text and images. */
export function withSocialMetadata(metadata: Metadata, locale: Locale): Metadata {
  const { openGraph, twitter } = metadata;
  const canonical = metadata.alternates?.canonical;
  const url = typeof canonical === 'string' || canonical instanceof URL
    ? canonical
    : canonical?.url;
  if (!openGraph && !url) return metadata;

  const title = typeof metadata.title === 'string' ? metadata.title : undefined;
  const images = openGraph?.images ?? [defaultImage];

  return {
    ...metadata,
    openGraph: {
      siteName: 'TGPI',
      type: 'website',
      ...openGraph,
      title: openGraph?.title ?? title,
      description: openGraph?.description ?? metadata.description ?? undefined,
      locale: openGraphLocales[locale],
      url: url ?? openGraph?.url,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metadata.description ?? undefined,
      images,
      ...twitter,
    },
  };
}
