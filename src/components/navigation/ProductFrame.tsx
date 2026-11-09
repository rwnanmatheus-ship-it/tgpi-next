"use client";
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import { productDestinations, isProductRoute, isStudyRoute } from '@/lib/product-navigation';
import { SUPER_APP_OPEN_EVENT } from '@/lib/super-app';
import NavigationIcon from './NavigationIcon';

export default function ProductFrame({ pathname, children }: { pathname: string; children: ReactNode }) {
  const { t } = useLocale();
  const [collapsed, setCollapsed] = useState(false);
  if (!isProductRoute(pathname)) return <>{children}</>;
  if (isStudyRoute(pathname)) return <div className="product-study"><nav aria-label={t('Learning navigation')}><Link href="/courses">← {t('All courses')}</Link><Link href="/profile">{t('My workspace')} ↗</Link></nav>{children}</div>;
  return <div className="product-frame" data-collapsed={collapsed}>
    <aside className="product-sidebar">
      <div className="product-sidebar-heading"><span>{t('Learning and planning')}</span><button type="button" onClick={() => setCollapsed(value => !value)} aria-expanded={!collapsed} aria-label={t(collapsed ? 'Expand navigation' : 'Collapse navigation')} title={t(collapsed ? 'Expand navigation' : 'Collapse navigation')}><NavigationIcon name="menu" /></button></div>
      <button className="product-command" type="button" onClick={() => window.dispatchEvent(new Event(SUPER_APP_OPEN_EVENT))} title={t('Explore your tools')} aria-label={t('Explore your tools')}><NavigationIcon name="search" /><span>{t('Explore your tools')}</span><kbd aria-hidden="true">⌘ K</kbd></button>
      <nav aria-label={t('Application navigation')}>{productDestinations.map(item => <Link key={item.href} href={item.href} prefetch={false} title={t(item.label)} aria-label={t(item.label)} aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? 'page' : undefined}><NavigationIcon name={item.icon} /><span>{t(item.label)}</span></Link>)}</nav>
      <div className="product-sidebar-secondary">{[['/certificates','Certificates','certificate'],['/passport','Documents','file'],['/global-key','Global Key','key']] .map(([href,label,icon]) => <Link href={href} key={href} title={t(label)} aria-label={t(label)} aria-current={pathname === href ? 'page' : undefined}><NavigationIcon name={icon as 'certificate' | 'file' | 'key'} /><span>{t(label)}</span></Link>)}</div>
      <div className="product-sidebar-bottom"><Link href="/profile/security" title={t('Settings')}><NavigationIcon name="settings" /><span>{t('Settings')}</span></Link><div><Link href="/privacy">{t('Privacy')}</Link><Link href="/terms">{t('Terms')}</Link></div></div>
    </aside>
    <div className="product-body">{children}</div>
  </div>;
}
