'use client';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useLocale } from './LocaleProvider';

/** Route, prefetch, children and click behavior remain under Next's Link. */
export default function LocalizedLink(props: ComponentProps<typeof Link>) {
  const { t } = useLocale();
  return <Link {...props} aria-label={props['aria-label'] ? t(props['aria-label']) : undefined} title={props.title ? t(props.title) : undefined} />;
}
