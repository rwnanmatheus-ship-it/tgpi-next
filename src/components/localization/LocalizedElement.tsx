'use client';

import { createElement, type ComponentPropsWithRef, type JSX } from 'react';
import { useLocale } from './LocaleProvider';

type ElementName = keyof JSX.IntrinsicElements;
type Props<T extends ElementName> = { as: T } & Omit<ComponentPropsWithRef<T>, 'as'>;
const attributes = ['aria-label', 'aria-description', 'aria-valuetext', 'placeholder', 'alt', 'title'] as const;

/** Localizes authored accessibility copy without changing values, refs or event handlers. */
export function LocalizedElement<T extends ElementName>({ as, ...props }: Props<T>) {
  const { t } = useLocale();
  const localized: Record<string, unknown> = { ...props };
  for (const attribute of attributes) {
    const value = localized[attribute];
    if (typeof value === 'string') localized[attribute] = t(value);
  }
  return createElement(as, localized);
}
