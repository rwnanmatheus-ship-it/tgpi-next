'use client';
import Image, { type ImageProps } from 'next/image';
import { useLocale } from './LocaleProvider';
export type { ImageProps } from 'next/image';

/** Keeps Next image optimization and translates only the accessible description. */
export default function LocalizedImage(props: ImageProps) {
  const { t } = useLocale();
  return <Image {...props} alt={t(props.alt)} title={props.title ? t(props.title) : undefined} />;
}
