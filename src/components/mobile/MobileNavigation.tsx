'use client';
import LanguageSelector from '@/components/localization/LanguageSelector';
import { useLocale } from '@/components/localization/LocaleProvider';
import { Show } from '@clerk/nextjs';
import NotificationBell from '@/components/NotificationBell';
import NavigationLink from "@/components/navigation/NavigationLink";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LauncherButton from '@/components/navigation/LauncherButton';
import BrandSignature from '@/components/navigation/BrandSignature';
import NavigationIcon from '@/components/navigation/NavigationIcon';
import { COMPACT_NAVIGATION, isNavigationDestinationActive } from '@/lib/navigation-system';
import { isFocusedMobileRoute } from '@/lib/mobile-experience';

export default function MobileNavigation() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const viewport = window.visualViewport;
    function update() {
      const editing = document.activeElement?.matches('input, textarea, select, [contenteditable=true]');
      setKeyboardOpen(Boolean(editing && viewport && window.innerHeight - viewport.height > 120));
    }
    viewport?.addEventListener('resize', update); document.addEventListener('focusin', update); document.addEventListener('focusout', update);
    return () => { viewport?.removeEventListener('resize', update); document.removeEventListener('focusin', update); document.removeEventListener('focusout', update); };
  }, []);
  return <><header className="tgpi-mobile tgpi-compact-topbar" aria-label={t('TGPI compact navigation')} data-navigation-version="2"><BrandSignature compact /><div className="tgpi-compact-actions"><LanguageSelector compact /><Show when="signed-in"><NotificationBell /></Show><LauncherButton compact /></div></header>
    {!isFocusedMobileRoute(pathname) ? <nav className="tgpi-mobile tgpi-compact-dock" aria-label={t('Mobile primary navigation')} data-keyboard={keyboardOpen ? 'open' : 'closed'}>{COMPACT_NAVIGATION.map(destination => <NavigationLink key={destination.id} href={destination.href} aria-current={isNavigationDestinationActive(pathname,destination) ? 'page' : undefined}><span className="tgpi-compact-dock-icon"><NavigationIcon name={destination.icon} width={22} height={22} /></span><span>{t(destination.shortLabel)}</span></NavigationLink>)}</nav> : null}</>;
}
