'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavigationIcon from '@/components/navigation/NavigationIcon';
import { getSuperAppIconName } from '@/lib/navigation-system';
import { SUPER_APP_MODULES } from '@/lib/super-app';
import { matchesWorkspaceSearch } from '@/lib/workspace-intelligence';
import type { WorkspaceResource } from '@/lib/workspace-control';
import { workspaceResourceCopy, workspaceKindLabels } from '@/lib/localization/workspace-copy';
import { useLocale } from '@/components/localization/LocaleProvider';
import styles from './WorkspaceCommandCenter.module.css';

const featured = ['plan', 'country-fit', 'compare', 'learning', 'documents', 'atlas'];
export default function WorkspaceNavigator({ resources, compareHref }: { resources: WorkspaceResource[]; compareHref: string }) {
  const { t, locale } = useLocale();
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const searching = Boolean(query.trim());
  const modules = SUPER_APP_MODULES.filter(item => item.id !== 'workspace' && (searching ? matchesWorkspaceSearch(`${t(item.label)} ${t(item.shortLabel)} ${t(item.description)} ${item.keywords.join(' ')}`, query) : expanded || featured.includes(item.id)));
  const found = searching ? resources.map(item => ({ ...item, ...workspaceResourceCopy(item, t, locale) })).filter(item => matchesWorkspaceSearch(`${item.title} ${item.detail} ${t(workspaceKindLabels[item.kind])}`, query)) : [];
  return <section id="workspace-tools" className={styles.navigator} aria-labelledby="navigator-title">
    <div className={styles.sectionHeading}>
      <div><p className={styles.eyebrow}>{t('Your connected TGPI')}</p><h2 id="navigator-title">{t('Where do you want to go next?')}</h2></div>
      <label className={styles.toolSearch}><span className={styles.srOnly}>{t('Search tools and saved resources')}</span><NavigationIcon name="search" width={20} height={20} /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t('Search tools and saved resources')} aria-controls="workspace-search-results" /></label>
    </div>
    <div id="workspace-search-results">
      {searching && <p className={styles.searchCount} role="status">{t('{count} results', { count: modules.length + found.length })}</p>}
      <nav className={styles.launchGrid} aria-label={t('TGPI tools')}>{modules.map(item => <Link href={item.id === 'compare' ? compareHref : item.href} key={item.id} className={styles.launchCard} data-module={item.id}>
        <span className={styles.launchIcon}><NavigationIcon name={getSuperAppIconName(item.id)} width={23} height={23} /></span><span><strong>{t(item.shortLabel)}</strong><small>{t(item.description)}</small></span><span aria-hidden="true">↗</span>
      </Link>)}</nav>
      {found.length > 0 && <div className={styles.searchResources}><h3>{t('Personal library')}</h3>{found.slice(0, 8).map(item => <Link key={item.id} href={item.href}><span>{item.title}<small>{item.detail}</small></span><span aria-hidden="true">↗</span></Link>)}{found.length > 8 && <a href="#workspace-library">{t('Show more resources')} ↓</a>}</div>}
      {searching && !modules.length && !found.length && <p className={styles.empty}>{t('No matching resources.')} {t('Try a different term or resource type.')}</p>}
    </div>
    <button type="button" className={styles.textButton} onClick={() => { setExpanded(value => !value); setQuery(''); }}>{t(expanded ? 'Show essential tools' : 'Show all tools')} <span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
  </section>;
}
