'use client';
import { useEffect, useState, type ReactNode, type KeyboardEvent } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';

type Tab = { id: string; label: string; content: ReactNode };
export default function PlanTabs({ id, tabs }: { id: string; tabs: Tab[] }) {
  const { t } = useLocale();
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  const [visited, setVisited] = useState<string[]>([tabs[0]?.id ?? '']);
  const ids = tabs.map(tab => tab.id).join('|');
  useEffect(() => {
    let frame = 0;
    const sync = () => {
      const hash = window.location.hash.slice(1);
      const available = ids.split('|');
      const requested = hash === 'research-workbench' ? 'budget' : hash;
      const target = available.includes(requested) ? requested : available[0];
      setActive(target);
      setVisited(previous => previous.includes(target) ? previous : [...previous, target]);
      cancelAnimationFrame(frame);
      if (available.includes(requested)) frame = requestAnimationFrame(() => {
        document.getElementById(`${id}-tabs`)?.scrollIntoView({ block: 'start' });
      });
    };
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [id, ids]);
  function select(tabId: string) {
    setActive(tabId);
    setVisited(previous => previous.includes(tabId) ? previous : [...previous, tabId]);
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#${tabId}`);
  }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index - 1 + tabs.length) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault(); select(tabs[next].id);
    document.getElementById(`${id}-tab-${tabs[next].id}`)?.focus();
  }
  return <>
    <div className="plan-tabs" id={`${id}-tabs`} role="tablist" aria-label={t('Plan tools')}>
      {tabs.map((tab, index) => <button key={tab.id} type="button" role="tab" id={`${id}-tab-${tab.id}`} aria-controls={`${id}-panel-${tab.id}`} aria-selected={active === tab.id} tabIndex={active === tab.id ? 0 : -1} onKeyDown={event => keyboard(event, index)} onClick={() => select(tab.id)}>{t(tab.label)}</button>)}
    </div>
    {tabs.map(tab => <section key={tab.id} role="tabpanel" id={`${id}-panel-${tab.id}`} aria-labelledby={`${id}-tab-${tab.id}`} hidden={active !== tab.id} tabIndex={0} className="plan-tab-panel">{visited.includes(tab.id) ? tab.content : null}</section>)}
  </>;
}
