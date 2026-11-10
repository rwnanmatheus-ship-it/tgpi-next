import 'server-only';
import type { Metadata } from 'next';
import { getLocale } from './server';
import { translate } from './messages';

export async function localizeMetadata(metadata: Metadata): Promise<Metadata> {
  const locale = await getLocale();
  const t = (value: string | null | undefined): string | undefined => value ? translate(locale, value) : undefined;
  const openGraphLocale = { en: 'en_US', 'pt-BR': 'pt_BR', es: 'es_ES', fr: 'fr_FR', de: 'de_DE', it: 'it_IT' }[locale];
  const title = typeof metadata.title === 'string' ? t(metadata.title) : metadata.title;
  return { ...metadata, title, description: t(metadata.description),
    ...(metadata.openGraph ? { openGraph: { ...metadata.openGraph, locale: openGraphLocale, ...(typeof metadata.openGraph.title === 'string' ? { title: t(metadata.openGraph.title) } : {}), description: t(metadata.openGraph.description) } } : {}),
    ...(metadata.twitter ? { twitter: { ...metadata.twitter, ...(typeof metadata.twitter.title === 'string' ? { title: t(metadata.twitter.title) } : {}), description: t(metadata.twitter.description) } } : {}),
  };
}
