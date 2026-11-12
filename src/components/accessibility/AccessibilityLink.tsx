'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigationIcon from '@/components/navigation/NavigationIcon';
import { useLocale } from '@/components/localization/LocaleProvider';
import { accessCopy } from '@/lib/localization/accessibility-center';

export default function AccessibilityLink() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const label = accessCopy(locale, 'access');
  return <Link href="/accessibility" className="tgpi-accessibility-link" aria-label={label}
    title={label} aria-current={pathname === '/accessibility' ? 'page' : undefined}>
    <NavigationIcon name="accessibility" width={22} height={22} />
  </Link>;
}
