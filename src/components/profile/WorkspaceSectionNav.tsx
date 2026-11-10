'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import NavigationIcon from '@/components/navigation/NavigationIcon';
import styles from './WorkspaceCommandCenter.module.css';

const sections = [
  { id: 'workspace-personal', label: 'Now', icon: 'target' },
  { id: 'workspace-tools', label: 'TGPI tools', icon: 'apps' },
  { id: 'workspace-journey', label: 'My journey', icon: 'compass' },
  { id: 'workspace-library', label: 'My library', icon: 'book' },
  { id: 'workspace-history', label: 'My history', icon: 'graph' },
] as const;

export default function WorkspaceSectionNav() {
  const { t } = useLocale();
  const [active, setActive] = useState<string>(sections[0].id);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string = sections[0].id;
      const scrollPadding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        const scrollMargin = Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
        const activationLine = Math.max(200, scrollPadding + scrollMargin + 2);
        if (element.getBoundingClientRect().top <= activationLine) current = section.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return <nav className={styles.localNav} aria-label={t('Workspace sections')}>
    {sections.map(section => <a href={`#${section.id}`} key={section.id} aria-current={active === section.id ? 'location' : undefined} onClick={() => setActive(section.id)}><NavigationIcon name={section.icon} width={17} height={17} /><span>{t(section.label)}</span></a>)}
  </nav>;
}
