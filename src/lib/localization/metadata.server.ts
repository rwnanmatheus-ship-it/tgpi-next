import 'server-only';
import type { Metadata } from 'next';
import { getLocale } from './server';
import { translate } from './messages';
import { credentialSharingMessages } from './credential-sharing-copy';
import { withSocialMetadata } from './social-metadata';

export async function localizeMetadata(metadata: Metadata): Promise<Metadata> {
  const locale = await getLocale();
  const t = (value: string | null | undefined): string | undefined => value ? (Object.hasOwn(credentialSharingMessages, value) ? credentialSharingMessages[value][locale] : translate(locale, value)) : undefined;
  const title = typeof metadata.title === 'string' ? t(metadata.title) : metadata.title;
  return withSocialMetadata({ ...metadata, title, description: t(metadata.description),
    ...(metadata.openGraph ? { openGraph: { ...metadata.openGraph, ...(typeof metadata.openGraph.title === 'string' ? { title: t(metadata.openGraph.title) } : {}), description: t(metadata.openGraph.description) } } : {}),
    ...(metadata.twitter ? { twitter: { ...metadata.twitter, ...(typeof metadata.twitter.title === 'string' ? { title: t(metadata.twitter.title) } : {}), description: t(metadata.twitter.description) } } : {}),
  }, locale);
}
