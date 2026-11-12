'use client';

import { LocalizedText } from '@/components/localization/LocaleProvider';

export default function SkipToContent() {
  return <a href="#main-content" className="tgpi-content-skip" onClick={event => {
    const frame = document.getElementById('main-content');
    const main = frame?.querySelector<HTMLElement>('main:not([hidden]), [role="main"]:not([hidden])') ?? frame;
    if (!main) return;
    event.preventDefault();
    if (!main.hasAttribute('tabindex')) main.tabIndex = -1;
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: 'start', behavior: 'instant' });
  }}><LocalizedText text="Skip to content" /></a>;
}
