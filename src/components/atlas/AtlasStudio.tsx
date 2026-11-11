'use client';

import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLocale } from '@/components/localization/LocaleProvider';
import CinematicImage from '@/components/ui/CinematicImage';
import { safeAtlasLink, type AtlasScope } from '@/lib/atlas/contracts';
import {
  listAtlasDeviceHistory, updateAtlasDeviceHistory, type StudioConversation, type StudioMessage, type StudioMode,
} from '@/lib/atlas/device-history';
import { deviceAtlasAvailability, prepareDeviceAtlas, streamDeviceAtlas, type DeviceAvailability } from '@/lib/atlas/device-model';
import { atlasFreeCopy } from '@/lib/atlas/free-copy';
import { answerAtlasGuide, atlasFirstName, guideResource, nextAtlasTopic, normalizeAtlasText } from '@/lib/atlas/guide';
import { guideText, guideTopics, type GuideTopic } from '@/lib/atlas/guide-copy';
import type { AtlasNavigationContext } from '@/lib/atlas/navigation-context';
import { atlasCopy } from '@/lib/atlas/studio-copy';
import { streamSponsoredAtlas } from '@/lib/atlas/studio-stream';
import AtlasMascot from './AtlasMascot';
import styles from './studio.module.css';

const Budget = dynamic(() => import('./AtlasBudget'));
const tasks = [
  { topic: 'compare', label: 'Compare', icon: '◈' },
  { topic: 'plan', label: 'My plan', icon: '◎' },
  { topic: 'documents', label: 'Documents', icon: '▤' },
  { topic: 'language', label: 'Languages', icon: '◌' },
] as const;
const profileChoices: readonly [AtlasScope, string][] = [
  ['destinations', 'Destinations & goals'], ['languages', 'Languages'],
  ['career', 'Career & education'], ['budget', 'Budget range'],
];
const brand = 'Atlas';
const modeLabels = { guide: 'guide', device: 'device', sponsored: 'online' } as const;

type StudioProps = {
  userId: string;
  onlineAvailable?: boolean;
  embedded?: boolean;
  context?: AtlasNavigationContext;
};
type HistoryChange = { id: string; deleted?: boolean };

function newestFirst(a: StudioConversation, b: StudioConversation) {
  return b.updatedAt.localeCompare(a.updatedAt);
}

function withoutLastTurn(messages: StudioMessage[], requestId?: string) {
  if (!requestId || messages.at(-1)?.requestId !== requestId) return messages;
  return messages.filter(message => message.requestId !== requestId);
}

export default function AtlasStudio({ userId, onlineAvailable = false, embedded = false, context }: StudioProps) {
  const { locale, t } = useLocale();
  const { user } = useUser();
  const name = user?.id === userId ? atlasFirstName(user.firstName || user.fullName) : '';
  const [conversation, setConversation] = useState<StudioConversation | null>(null);
  const [history, setHistory] = useState<StudioConversation[]>([]);
  const [mode, setMode] = useState<StudioMode>('guide');
  const [device, setDevice] = useState<{ locale: typeof locale; availability: DeviceAvailability } | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const [scopes, setScopes] = useState<AtlasScope[]>([]);
  const [temporary, setTemporary] = useState(false);
  const [busy, setBusy] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const [partial, setPartial] = useState('');
  const [issue, setIssue] = useState<'onlineError' | 'deviceError' | 'interrupted' | null>(null);
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [manage, setManage] = useState<'rename' | 'delete' | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [motion, setMotion] = useState(true);
  const [calculator, setCalculator] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const interaction = useRef(false);
  const mounted = useRef(false);
  const channel = useRef<BroadcastChannel | null>(null);
  const follow = useRef(true);
  const view = useRef<HTMLDivElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const shell = useRef<HTMLElement>(null);
  const drawerTrigger = useRef<HTMLButtonElement>(null);
  const actions = useRef<HTMLDetailsElement>(null);
  const ids = useId();
  const draftKey = `tgpi:atlas:studio-draft:${userId}`;
  const deviceAvailability = device?.locale === locale ? device.availability : 'unavailable';
  const canSend = mode === 'guide' || (mode === 'sponsored' ? onlineAvailable : deviceAvailability === 'available');
  const inferenceError = mode === 'device' ? 'deviceError' : 'onlineError';

  useEffect(() => {
    let current = true;
    void deviceAtlasAvailability(locale).then(availability => { if (current) setDevice({ locale, availability }); });
    return () => { current = false; };
  }, [locale]);

  useEffect(() => {
    mounted.current = true;
    const sync = typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel(`tgpi:atlas:${userId}`);
    channel.current = sync;
    let disposed = false;
    function restoreDraft(items: StudioConversation[]) {
      if (interaction.current) return;
      try {
        const saved = JSON.parse(sessionStorage.getItem(draftKey) || 'null') as { mode?: StudioMode; text?: string; id?: string } | null;
        if (typeof saved?.text === 'string' && saved.text && (saved.mode === 'guide' || saved.mode === 'sponsored' || saved.mode === 'device')) {
          setDraft(saved.text.slice(0, 4000));
          setMode(saved.mode);
          setConversation(items.find(item => item.id === saved.id && item.mode === saved.mode) ?? null);
          return;
        }
      } catch { /* Browser draft storage is optional. */ }
      if (items[0]) {
        setConversation(items[0]);
        setMode(items[0].mode);
      }
    }

    function refresh(change?: HistoryChange) {
      void listAtlasDeviceHistory(userId).then(items => {
        if (disposed) return;
        setHistory(items);
        if (!change) restoreDraft(items);
        else if (!controller.current) {
          const updated = items.find(item => item.id === change.id);
          setConversation(current => {
            if (current?.id !== change.id) return current;
            return updated ?? (change.deleted ? null : current);
          });
        }
      }).catch(() => {
        if (disposed) return;
        setStorageFailed(true);
        if (!change) restoreDraft([]);
      });
    }
    refresh();
    if (sync) sync.onmessage = (event: MessageEvent<HistoryChange>) => refresh(event.data);
    return () => {
      disposed = true;
      mounted.current = false;
      controller.current?.abort();
      sync?.close();
      channel.current = null;
    };
  }, [userId, draftKey]);

  useEffect(() => {
    const visual = window.visualViewport;
    const element = shell.current;
    if (!visual || !element) return;
    function adjust() {
      if (!element || !visual) return;
      const typing = document.activeElement === composer.current;
      const keyboard = typing && window.innerHeight - visual.height > 90;
      element.toggleAttribute('data-keyboard', keyboard);
      if (keyboard) element.style.setProperty('--atlas-height', `${Math.max(220, visual.height - Math.max(0, element.getBoundingClientRect().top - visual.offsetTop) - 4)}px`);
      else element.style.removeProperty('--atlas-height');
    }
    visual.addEventListener('resize', adjust);
    document.addEventListener('focusout', adjust);
    return () => { visual.removeEventListener('resize', adjust); document.removeEventListener('focusout', adjust); };
  }, []);

  useEffect(() => {
    if (view.current && follow.current) view.current.scrollTop = view.current.scrollHeight;
    else if (busy) setHasNew(true);
  }, [conversation, partial, busy]);

  function putInList(record: StudioConversation) {
    setHistory(items => [record, ...items.filter(item => item.id !== record.id)].sort(newestFirst));
  }

  function editDraft(value: string) {
    setDraft(value);
    try {
      if (value && !temporary) sessionStorage.setItem(draftKey, JSON.stringify({ mode, text: value, id: conversation?.id }));
      else sessionStorage.removeItem(draftKey);
    } catch { /* The draft remains available in this session. */ }
  }

  function start(nextMode = mode, nextTemporary = temporary) {
    if (controller.current) return;
    interaction.current = true;
    setConversation(null);
    setMode(nextMode);
    setTemporary(nextTemporary);
    setScopes([]);
    editDraft('');
    setIssue(null);
    setNotice('');
    setManage(null);
    setDrawer(false);
    setCalculator(false);
    setHasNew(false);
    follow.current = true;
  }

  function open(record: StudioConversation) {
    if (controller.current) return;
    start(record.mode, false);
    setConversation(record);
    if (record.messages.at(-1)?.status === 'failed') setIssue(record.mode === 'device' ? 'deviceError' : 'onlineError');
    composer.current?.focus({ preventScroll: true });
  }

  async function enableDevice() {
    if (controller.current || deviceAvailability === 'unavailable' || deviceAvailability === 'available') return;
    const request = new AbortController();
    controller.current = request;
    setBusy(true);
    setIssue(null);
    setDownloadProgress(0);
    try {
      const ready = await prepareDeviceAtlas(locale, request.signal, percent => {
        if (mounted.current) setDownloadProgress(percent);
      });
      if (mounted.current && ready) setDevice(current => current?.locale === locale ? { locale, availability: 'available' } : current);
      else if (mounted.current) setIssue('deviceError');
    } catch { if (mounted.current && !request.signal.aborted) setIssue('deviceError'); }
    finally {
      controller.current = null;
      if (mounted.current) { setBusy(false); setDownloadProgress(null); }
    }
  }

  function contextPrompt() {
    if (!context) return '';
    if (context.learningCourse) {
      return t('Coach me through one practice exercise for {course}. Ask one question at a time and give hints before showing an example.', { course: t(context.learningCourse.title) });
    }
    return guideText(guideTopics[context.topic].prompt, locale);
  }

  async function send(text = draft, topic?: GuideTopic, retryId?: string) {
    const questionText = text.trim();
    if (!questionText || questionText.length > 4000 || controller.current || !canSend) return;
    interaction.current = true;
    const request = new AbortController();
    controller.current = request;
    const original = conversation;
    const now = new Date().toISOString();
    const session: StudioConversation = original ?? {
      id: crypto.randomUUID(), mode, title: Array.from(questionText).slice(0, 70).join(''), messages: [], updatedAt: now,
    };
    const wasSaved = history.some(item => item.id === session.id);
    const requestId = crypto.randomUUID();
    const question: StudioMessage = { id: requestId, requestId, role: 'user', content: questionText, createdAt: now, status: 'complete' };
    const append = (base: StudioConversation) => ({
      ...base, updatedAt: now, messages: [...withoutLastTurn(base.messages, retryId), question],
    });
    let pending = append(session);
    let persisted = false;
    let frame = 0;
    const answer: StudioMessage = {
      id: crypto.randomUUID(), requestId, role: 'assistant', content: '', status: 'interrupted', createdAt: now,
    };
    setBusy(true);
    editDraft('');
    setIssue(null);
    setPartial('');
    setNotice('');
    setConversation(pending);
    setHasNew(false);
    follow.current = true;

    function appendDelta(text: string) {
      answer.content += text;
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        if (mounted.current) setPartial(answer.content);
      });
    }

    try {
      if (!temporary) {
        try {
          const saved = await updateAtlasDeviceHistory(userId, session.id, existing => existing || !wasSaved ? append(existing ?? session) : undefined);
          if (saved) {
            persisted = true;
            pending = saved;
            if (mounted.current) { setConversation(saved); putInList(saved); setStorageFailed(false); }
          } else if (mounted.current) setStorageFailed(true);
        } catch { if (mounted.current) setStorageFailed(true); }
      }
      if (request.signal.aborted) throw request.signal.reason;
      const prior = pending.messages.slice(0, -1);
      if (mode === 'guide' || mode === 'device') {
        const previous = prior.findLast(message => message.memory)?.memory;
        const reply = answerAtlasGuide({ question: questionText, locale, previous, context, topic });
        answer.resources = reply.resources;
        answer.memory = reply.memory;
        if (mode === 'guide') {
          const first = !prior.some(message => message.role === 'assistant' && message.status === 'complete');
          const safeName = name.replace(/[^\p{L}\p{M}\p{N}'’-]/gu, '');
          answer.content = safeName && first ? `${atlasCopy(locale, 'named', safeName)}\n\n${reply.content}` : reply.content;
          answer.status = 'complete';
        } else {
          answer.status = await streamDeviceAtlas({
            locale, question: questionText, context: reply.memory ? reply.content : '',
            history: prior, signal: request.signal, onDelta: appendDelta,
          });
        }
      } else {
        answer.status = await streamSponsoredAtlas({
          conversationId: session.id,
          requestId, text: questionText, scopes, temporary: true, access: 'sponsored',
          history: prior.filter(message => message.status === 'complete').slice(-10).map(message => ({ role: message.role, content: message.content.slice(0, 8000) })),
        }, request.signal, event => {
          if (event.type === 'context') answer.factors = event.factors;
          if (event.type === 'delta') appendDelta(event.text);
        });
      }
      if (answer.status === 'complete' && !answer.content.trim()) answer.status = 'interrupted';
      if (answer.status !== 'complete' && mounted.current) setIssue(answer.status === 'failed' ? inferenceError : 'interrupted');
    } catch {
      answer.status = request.signal.aborted ? 'interrupted' : 'failed';
      if (mounted.current) setIssue(request.signal.aborted ? 'interrupted' : inferenceError);
    } finally {
      cancelAnimationFrame(frame);
      function complete(base: StudioConversation) {
        return {
          ...base, updatedAt: new Date().toISOString(),
          messages: base.messages.flatMap(message => message.id === question.id ? [message, answer] : [message]),
        };
      }
      let finished: StudioConversation | null = complete(pending);
      if (persisted) {
        try {
          const saved = await updateAtlasDeviceHistory(userId, session.id, existing =>
            existing?.messages.some(message => message.id === question.id) ? complete(existing) : existing);
          if (saved) {
            finished = saved;
            if (mounted.current) putInList(saved);
            channel.current?.postMessage({ id: session.id } satisfies HistoryChange);
          } else {
            finished = null;
            if (mounted.current) setHistory(items => items.filter(item => item.id !== session.id));
          }
        } catch { if (mounted.current) setStorageFailed(true); }
      }
      if (mounted.current) {
        setConversation(finished);
        setPartial('');
        setBusy(false);
        setNotice(answer.status === 'complete' ? atlasCopy(locale, 'reply') : '');
        if (document.activeElement === document.body) composer.current?.focus({ preventScroll: true });
      }
      controller.current = null;
    }
  }

  async function saveManagement() {
    if (!conversation || !manage || controller.current) return;
    const id = conversation.id;
    const operation = new AbortController();
    controller.current = operation;
    setBusy(true);
    try {
      const record = await updateAtlasDeviceHistory(userId, id, existing => {
        if (manage === 'delete') return null;
        return existing ? { ...existing, title: newTitle.trim(), updatedAt: new Date().toISOString() } : undefined;
      });
      if (!mounted.current) return;
      if (record) { setConversation(record); putInList(record); }
      if (manage === 'delete') {
        controller.current = null;
        setHistory(items => items.filter(item => item.id !== id));
        start();
      }
      setManage(null);
      channel.current?.postMessage({ id, deleted: manage === 'delete' } satisfies HistoryChange);
    } catch { if (mounted.current) setStorageFailed(true); }
    finally { controller.current = null; if (mounted.current) setBusy(false); }
  }

  function download() {
    if (!conversation) return;
    actions.current?.removeAttribute('open');
    const body = conversation.messages.filter(message => message.content).map(message =>
      `## ${message.role === 'assistant' ? 'Atlas' : t('You')}\n\n${message.content}${message.resources?.length
        ? `\n\n${message.resources.map(resource => `- ${resource.literal ? resource.label : t(resource.label)}: ${safeAtlasLink(resource.href)}`).join('\n')}` : ''}`).join('\n\n');
    const url = URL.createObjectURL(new Blob([`# ${conversation.title}\n\n${body}\n`], { type: 'text/markdown;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'atlas-conversation.md';
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const normalizedQuery = normalizeAtlasText(query);
  const filtered = normalizedQuery ? history.filter(item => normalizeAtlasText(item.title).includes(normalizedQuery)
    || item.messages.some(message => normalizeAtlasText(message.content).includes(normalizedQuery))) : history;
  const messages = conversation?.messages ?? [];
  const activeSaved = history.some(item => item.id === conversation?.id);
  const last = messages.at(-1);
  const next = last?.memory && nextAtlasTopic(last.memory.topic);
  const retry = last && (last.role === 'user' || last.status !== 'complete')
    ? messages.find(message => message.role === 'user' && message.requestId === last.requestId)
    : undefined;
  const label = (key: Parameters<typeof atlasCopy>[1]) => atlasCopy(locale, key);

  return <section ref={shell} id={embedded ? 'atlas-widget-chat' : 'atlas-main'} tabIndex={-1}
    className={`${styles.studio} ${embedded ? styles.embedded : ''}`} aria-label={label('studio')}
    onKeyDown={event => {
      if (drawer && event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        setDrawer(false);
        drawerTrigger.current?.focus();
      }
    }}>
    <aside id={`${ids}-history`} className={styles.history} data-open={drawer} aria-label={label('deviceHistory')}>
      <div className={styles.historyBrand}><span aria-hidden="true">◈</span><div><strong>{brand.toUpperCase()}</strong><small>{label('eyebrow')}</small></div></div>
      <button type="button" className={styles.newChat} disabled={busy} onClick={() => start(mode, false)}>
        <span aria-hidden="true">＋</span>{t('New conversation')}
      </button>
      <label className={styles.search}>{label('deviceHistory')}
        <input type="search" value={query} placeholder={label('search')} onChange={event => setQuery(event.target.value)} />
      </label>
      <div className={styles.historyItems}>
        {!filtered.length && <p>{label(normalizedQuery ? 'noResults' : 'noHistory')}</p>}
        {filtered.map(item => <button type="button" key={item.id} disabled={busy} aria-current={item.id === conversation?.id ? 'true' : undefined} onClick={() => open(item)}>
          <span>{item.title}</span><small>{label(modeLabels[item.mode])} · {new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(new Date(item.updatedAt))}</small>
        </button>)}
      </div>
      <Link href="/atlas?mode=account" prefetch={false}>{label('accountHistory')} <span aria-hidden="true">↗︎</span></Link>
      <Link href="/profile/security" prefetch={false}>{t('Account & privacy ↗')}</Link>
    </aside>

    <div className={styles.chat}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <button type="button" ref={drawerTrigger} className={styles.drawerToggle} aria-expanded={drawer} aria-controls={`${ids}-history`} onClick={() => setDrawer(!drawer)}>
            {t('History')}
          </button>
          {messages.length > 0 && <div className={styles.headerOwl}><AtlasMascot animated={motion && busy && mode !== 'guide'} pose="Focus" compact /></div>}
          <div className={styles.headerTitle}><span>{label('eyebrow')}</span><h1>{embedded ? 'Atlas' : label('studio')}</h1></div>
          <div className={styles.headerActions}>
            <button type="button" aria-pressed={temporary} disabled={busy} onClick={() => start(mode, !temporary)}>{label('privateMode')}</button>
            {messages.length > 0 && <details ref={actions} className={styles.actions}>
              <summary aria-label={label('privacy')}>···</summary>
              <div>
                <button type="button" onClick={download}>{label('export')}</button>
                {activeSaved && <>
                  <button type="button" disabled={busy} onClick={() => {
                    actions.current?.removeAttribute('open');
                    setManage('rename');
                    setNewTitle(conversation?.title ?? '');
                  }}>{t('Rename')}</button>
                  <button type="button" disabled={busy} onClick={() => { actions.current?.removeAttribute('open'); setManage('delete'); }}>{t('Delete')}</button>
                </>}
              </div>
            </details>}
          </div>
        </div>
        <div className={styles.modeRow}>
          <div className={styles.modes} role="group" aria-label={label('tools')}>
            <button type="button" aria-pressed={mode === 'guide'} disabled={busy} onClick={() => mode !== 'guide' && start('guide')}>{label('guide')}</button>
            {(deviceAvailability !== 'unavailable' || mode === 'device') &&
              <button type="button" aria-pressed={mode === 'device'} disabled={busy} onClick={() => mode !== 'device' && start('device')}>{label('device')}</button>}
            <button type="button" aria-pressed={mode === 'sponsored'} disabled={busy} onClick={() => mode !== 'sponsored' && start('sponsored')}>{label('online')}</button>
          </div>
          <span className={styles.signal} data-available={canSend}><i aria-hidden="true" />{label(mode === 'guide' ? 'guideStatus' : mode === 'device' ? 'deviceStatus' : onlineAvailable ? 'onlineStatus' : 'onlineClosed')}</span>
        </div>
      </header>

      {manage && <form className={styles.management} onSubmit={event => { event.preventDefault(); void saveManagement(); }}>
        {manage === 'rename'
          ? <label>{t('Conversation title')}<input value={newTitle} maxLength={70} onChange={event => setNewTitle(event.target.value)} /></label>
          : <p>{label('deleteConfirm')}</p>}
        <button type="submit" disabled={busy || (manage === 'rename' && !newTitle.trim())}>{t(manage === 'rename' ? 'Save title' : 'Confirm deletion')}</button>
        <button type="button" onClick={() => setManage(null)}>{t('Cancel')}</button>
      </form>}

      <div ref={view} className={styles.transcript} tabIndex={0} aria-label={t('Message history')} onScroll={event => {
        const element = event.currentTarget;
        follow.current = element.scrollHeight - element.scrollTop - element.clientHeight < 72;
        if (follow.current) setHasNew(false);
      }}>
        {messages.length === 0 ? <div className={styles.welcome}>
          <div className={styles.hero}>
            {!embedded && <div className={styles.backdrop} aria-hidden="true"><CinematicImage asset="atlas-intelligence" alt="" sizes="(max-width: 767px) 95vw, 860px" /></div>}
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>{label('eyebrow')}</span>
              <h2>{name ? atlasCopy(locale, 'named', name) : label('welcome')}</h2>
              {name && <strong>{label('welcome')}</strong>}
              <p>{label('introduction')}</p>
              <button type="button" className={styles.motion} aria-pressed={motion} onClick={() => setMotion(!motion)}>{label(motion ? 'pause' : 'motion')}</button>
            </div>
            <div className={styles.owl}><AtlasMascot pose={busy ? 'Focus' : 'Invite'} animated={motion} /></div>
          </div>
          {mode === 'guide' && <>
            {context && <button type="button" className={styles.contextCard} onClick={() => void send(contextPrompt(), context.topic)}>
              <small>{label('inContext')}</small><strong>{context.learningCourse ? t(context.learningCourse.title) : t(guideResource(context.topic).label)}</strong><span aria-hidden="true">↗︎</span>
            </button>}
            <div className={styles.tools} aria-label={label('tools')}>
              {tasks.map(task => <button type="button" key={task.topic} onClick={() => void send(guideText(guideTopics[task.topic].prompt, locale), task.topic)}>
                <span className={styles.toolIcon} aria-hidden="true">{task.icon}</span><strong>{t(task.label)}</strong><span aria-hidden="true">↗︎</span>
              </button>)}
            </div>
          </>}
        </div> : <div className={styles.messages}>
          {messages.map(message => <article key={message.id} className={styles.message} data-role={message.role}>
            <div className={styles.speaker}>{message.role === 'assistant' ? 'Atlas' : name || t('You')}</div>
            {message.role === 'user' ? <p className={styles.plain}>{message.content}</p> : <>
              {message.content && <div className={styles.prose}><ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml urlTransform={safeAtlasLink}
                components={{ img: () => null, a: ({ href, children }) => href ? <Link href={href} prefetch={false}>{children}</Link> : <span>{children}</span> }}>
                {message.content}
              </ReactMarkdown></div>}
              {!!message.resources?.length && <div className={styles.resources}>{message.resources.map(resource => {
                const href = safeAtlasLink(resource.href);
                return href && <Link key={href} href={href} prefetch={false}>{resource.literal ? resource.label : t(resource.label)} <span aria-hidden="true">↗︎</span></Link>;
              })}</div>}
              {!!message.factors?.length && <p className={styles.factors}>{t('Profile fields shared:')} {message.factors.map(factor => t(factor)).join(' · ')}</p>}
              {message.status !== 'complete' && <p className={styles.factors}>{label(message.status === 'failed' ? inferenceError : 'interrupted')}</p>}
            </>}
          </article>)}
          {busy && mode !== 'guide' && downloadProgress === null && last?.role === 'user' && <article className={styles.message} data-role="assistant">
            <div className={styles.speaker}>{brand}</div><p className={styles.plain}>{partial || label('thinking')}</p>
          </article>}
          {!busy && mode === 'guide' && next && <button type="button" className={styles.contextCard} onClick={() => void send(guideText(guideTopics[next].prompt, locale), next)}>
            <small>{label('nextStep')}</small><strong>{t(guideResource(next).label)}</strong><span aria-hidden="true">↗︎</span>
          </button>}
        </div>}
      </div>

      {hasNew && <button type="button" className={styles.jump} onClick={() => {
        follow.current = true;
        setHasNew(false);
        if (view.current) view.current.scrollTop = view.current.scrollHeight;
      }}>{t('New response ↓')}</button>}

      <div className={styles.composerArea}>
        {mode === 'device' && <div className={styles.deviceNotice}>
          <p>{label(deviceAvailability === 'unavailable' ? 'deviceError' : 'deviceInfo')}</p>
          {!canSend && deviceAvailability !== 'unavailable' && <button type="button" disabled={busy} onClick={() => void enableDevice()}>{label('deviceEnable')}</button>}
          {downloadProgress !== null && <progress max={100} value={downloadProgress} aria-label={label('deviceEnable')} />}
        </div>}
        {mode === 'sponsored' && <details className={styles.privacy} open={!messages.length}>
          <summary>{label(onlineAvailable ? 'onlineStatus' : 'onlineClosed')}</summary>
          <p>{onlineAvailable ? atlasFreeCopy[locale].banner : label('onlineClosed')}</p>
          <p>{label('onlineConsent')}</p>
          {onlineAvailable && <div className={styles.profile}>{profileChoices.map(([id, title]) => <label key={id}>
            <input type="checkbox" disabled={busy} checked={scopes.includes(id)} onChange={event => setScopes(previous =>
              event.target.checked ? [...previous, id] : previous.filter(item => item !== id))} />{t(title)}
          </label>)}</div>}
        </details>}
        {mode === 'guide' && <>
          <div className={styles.quickTools}>
            {!calculator && <button type="button" className={styles.calculatorToggle} onClick={() => setCalculator(true)}>{label('calculator')}</button>}
            {context && messages.length > 0 && <button type="button" className={styles.calculatorToggle} disabled={busy}
              onClick={() => void send(contextPrompt(), context.topic)}>{label('inContext')} · {t(guideResource(context.topic).label)}</button>}
          </div>
          {calculator && <Budget />}
        </>}
        {(issue || retry && !busy) && <div className={styles.warning} role={issue ? 'alert' : undefined}>
          {issue && <p>{label(issue)}</p>}
          {retry && !busy && <div>
            <button type="button" disabled={!canSend} onClick={() => void send(retry.content, undefined, retry.requestId)}>{t('Retry last question')}</button>
            {mode !== 'guide' && <button type="button" onClick={() => { start('guide'); setDraft(retry.content); composer.current?.focus(); }}>{label('tryGuide')}</button>}
          </div>}
        </div>}
        <form className={styles.composer} onSubmit={event => { event.preventDefault(); void send(); }}>
          <label className={styles.srOnly} htmlFor={`${ids}-message`}>{t('Message Atlas')}</label>
          <textarea ref={composer} id={`${ids}-message`} rows={2} value={draft} maxLength={4000} placeholder={label('placeholder')}
            onChange={event => { interaction.current = true; editDraft(event.target.value); }} onKeyDown={event => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && matchMedia('(min-width: 768px)').matches) {
                event.preventDefault();
                void send();
              }
            }} />
          {busy && mode !== 'guide'
            ? <button type="button" onClick={() => controller.current?.abort()}>{t('Stop')}</button>
            : <button type="submit" disabled={busy || !draft.trim() || !canSend} aria-label={t('Send message')}>{t('Send ↑')}</button>}
        </form>
        <div className={styles.foot}>
          <details className={styles.privacy}><summary>{label(temporary ? 'tempStatus' : activeSaved && !storageFailed ? 'saved' : 'privacy')}</summary><p>{label('localPrivacy')}</p></details>
          <span role="status">{busy ? label(mode === 'guide' ? 'saving' : 'thinking') : notice}</span>
        </div>
        {storageFailed && !temporary && <p className={styles.factors} role="status">{label('saveFailed')}</p>}
      </div>
    </div>
  </section>;
}
