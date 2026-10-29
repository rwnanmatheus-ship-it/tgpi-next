'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { safeAtlasLink, type AtlasConversation, type AtlasEvent, type AtlasInput, type AtlasMessage, type AtlasScope, type AtlasSummary } from '@/lib/atlas/contracts';
import styles from './atlas.module.css';
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";


const choices: { id: AtlasScope; label: string }[] = [
  { id: 'destinations', label: 'Destinations & goals' }, { id: 'languages', label: 'Languages' },
  { id: 'career', label: 'Career & education' }, { id: 'budget', label: 'Budget range' },
];
const starters = ['Help me compare two destinations.', 'How should I prepare to study abroad?', 'Help me build a language-learning routine.'];
async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, cache: 'no-store', headers: { 'Content-Type': 'application/json', ...init?.headers } });
  const body = await response.json();
  if (!response.ok) throw new Error(typeof body.error === 'string' ? body.error : 'Request failed. Please retry.');
  return body as T;
}

export default function AtlasChat({ userId, enabled = true, embedded = false }: { userId: string; enabled?: boolean; embedded?: boolean }) {
  const { t } = useLocale();
  const [id, setId] = useState('');
  const [messages, setMessages] = useState<AtlasMessage[]>([]);
  const [items, setItems] = useState<AtlasSummary[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const [title, setTitle] = useState('');
  const [scopes, setScopes] = useState<AtlasScope[]>([]);
  const [temporary, setTemporary] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState<AtlasInput | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [action, setAction] = useState<'rename' | 'delete' | null>(null);
  const [rename, setRename] = useState('');
  const [hasNew, setHasNew] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const shell = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const follow = useRef(true);
  const composer = useRef<HTMLTextAreaElement>(null);
  const lock = useRef(false);
  const draftKey = `tgpi:atlas:draft:${userId}`;

  const loadHistory = useCallback(async (next?: string) => {
    setLoadingHistory(true);
    try {
      const page = await api<{ items: AtlasSummary[]; cursor: string | null }>(`/api/atlas/conversations${next ? `?cursor=${encodeURIComponent(next)}` : ''}`);
      setItems(previous => next ? [...new Map([...previous, ...page.items].map(x => [x.id, x])).values()] : page.items);
      setCursor(page.cursor);
    } catch (e) { setError(e instanceof Error ? e.message : 'History unavailable.'); }
    finally { setLoadingHistory(false); }
  }, []);

  useEffect(() => {
    setId(crypto.randomUUID());
    try { setDraft(sessionStorage.getItem(draftKey) || ''); } catch { /* storage disabled */ }
    if (enabled) void loadHistory();
    return () => { abort.current?.abort(); };
  }, [draftKey, loadHistory, enabled]);

  useEffect(() => {
    const visual = window.visualViewport;
    if (!visual) return;
    let baseline = visual.height;
    const resize = () => {
      const element = shell.current;
      if (!element) return;
      const typing = document.activeElement === composer.current;
      if (!typing) baseline = Math.max(baseline, visual.height);
      const keyboard = window.matchMedia('(max-width: 767px)').matches && typing && visual.height < baseline - 100;
      element.dataset.keyboard = String(keyboard);
      if (keyboard) element.style.setProperty('--atlas-keyboard-height', `${Math.max(240, visual.height + visual.offsetTop - element.getBoundingClientRect().top - 8)}px`);
      else element.style.removeProperty('--atlas-keyboard-height');
    };
    visual.addEventListener('resize', resize);
    visual.addEventListener('scroll', resize);
    document.addEventListener('focusout', resize);
    return () => { visual.removeEventListener('resize', resize); visual.removeEventListener('scroll', resize); document.removeEventListener('focusout', resize); };
  }, []);

  useEffect(() => {
    const element = viewport.current;
    if (element && follow.current) element.scrollTop = element.scrollHeight;
    else if (busy) setHasNew(true);
  }, [messages, busy]);

  function updateDraft(value: string) {
    setDraft(value);
    try { if (!temporary) sessionStorage.setItem(draftKey, value); } catch { /* optional draft recovery */ }
  }
  function newConversation(isTemporary = temporary) {
    if (lock.current) return;
    setId(crypto.randomUUID()); setMessages([]); setTitle(''); setPending(null);
    setError(''); setNotice(''); setAction(null); setTemporary(isTemporary); setShowHistory(false);
    setScopes([]); follow.current = true; setHasNew(false);
    if (isTemporary) { try { sessionStorage.removeItem(draftKey); } catch { /* optional */ } }
    composer.current?.focus();
  }
  function applyConversation(conversation: AtlasConversation) {
    setMessages(conversation.messages); setTitle(conversation.title);
    setItems(previous => [{ id: conversation.id, title: conversation.title, updatedAt: conversation.updatedAt }, ...previous.filter(x => x.id !== conversation.id)]);
  }
  async function openConversation(conversationId: string) {
    if (lock.current) return;
    lock.current = true; setBusy(true); setError('');
    try {
      const result = await api<{ conversation: AtlasConversation }>(`/api/atlas/conversations/${conversationId}`);
      setId(conversationId); applyConversation(result.conversation); setTemporary(false); setScopes([]); setShowHistory(false); setPending(null); setAction(null);
      follow.current = true;
      const last = result.conversation.messages.at(-1);
      if (last && (last.role === 'user' || last.status !== 'complete')) {
        const question = result.conversation.messages.find(x => x.role === 'user' && x.id === last.requestId);
        if (question) setPending({ conversationId, requestId: question.id, text: question.content, scopes: [], temporary: false, history: [] });
        setError('The last reply is incomplete. You can retry after any active request finishes.');
      }
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load conversation.'); }
    finally { lock.current = false; setBusy(false); }
  }
  async function send(retry?: AtlasInput) {
    if (!enabled || lock.current || (!retry && !draft.trim()) || !id) return;
    lock.current = true; setBusy(true); setError(''); setNotice('');
    const request: AtlasInput = retry ? { ...retry, requestId: retry.temporary ? crypto.randomUUID() : retry.requestId } : { conversationId: id, requestId: crypto.randomUUID(), text: draft.trim(), scopes, temporary,
      history: temporary ? messages.filter(x => x.status === 'complete').slice(-10).map(x => ({ role: x.role, content: x.content })) : [] };
    setPending(request);
    const baseIndex = messages.findIndex(x => x.role === 'user' && x.requestId === (retry?.requestId || request.requestId));
    const base = baseIndex >= 0 ? messages.slice(0, baseIndex) : messages;
    const now = new Date().toISOString();
    const question: AtlasMessage = { id: request.requestId, requestId: request.requestId, role: 'user', content: request.text, createdAt: now, status: 'complete' };
    const answer: AtlasMessage = { ...question, id: `${request.requestId}-stream`, role: 'assistant', content: '', status: 'interrupted' };
    setMessages([...base, question, answer]);
    const controller = new AbortController(); abort.current = controller;
    let finished = false;
    try {
      const response = await fetch('/api/atlas/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(request), signal: controller.signal });
      if (!response.ok) { const body = await response.json(); throw new Error(body.error || 'Unable to start reply.'); }
      if (!response.body) throw new Error('Response stream unavailable.');
      updateDraft('');
      const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = '';
      const consume = (line: string) => {
        const event = JSON.parse(line) as AtlasEvent;
        if (event.type === 'context') answer.factors = event.factors;
        if (event.type === 'delta') answer.content += event.text;
        if (event.type === 'context' || event.type === 'delta') setMessages([...base, question, { ...answer }]);
        if (event.type === 'error') setError(event.message);
        if (event.type === 'done') {
          finished = true;
          if (event.conversation) applyConversation(event.conversation);
          else if (request.temporary) setMessages([...base, question, { ...answer, status: event.status }]);
          else setError('Conversation no longer exists. Start a new one.');
          if (event.status === 'complete') { setPending(null); setNotice('Reply complete.'); }
          else setError('Reply incomplete. Retry the last question or start a new conversation.');
        }
      };
      for (;;) {
        const part = await reader.read(); buffer += decoder.decode(part.value, { stream: !part.done });
        const lines = buffer.split('\n'); buffer = lines.pop() || '';
        for (const line of lines) if (line.trim()) consume(line);
        if (part.done) { if (buffer.trim()) consume(buffer); break; }
      }
      if (!finished) throw new Error('Connection ended before confirmation. Reload the conversation before retrying.');
    } catch (e) {
      setError(controller.signal.aborted ? 'Reply stopped. Reload to recover any saved text, or retry the last question.' : e instanceof Error ? e.message : 'Connection failed. Your question is preserved.');
    } finally { lock.current = false; setBusy(false); abort.current = null; composer.current?.focus(); }
  }
  async function mutate(change: { title: string } | { messageId: string; feedback: 'up' | 'down' } | 'delete') {
    if (lock.current) return;
    lock.current = true; setBusy(true); setError('');
    try {
      const result = await api<{ conversation?: AtlasConversation }>(`/api/atlas/conversations/${id}`, { method: change === 'delete' ? 'DELETE' : 'PATCH', body: change === 'delete' ? undefined : JSON.stringify(change) });
      if (change === 'delete') { setItems(previous => previous.filter(x => x.id !== id)); lock.current = false; newConversation(); setNotice('Conversation deleted.'); }
      else if (result.conversation) { applyConversation(result.conversation); setNotice('Saved.'); }
      setAction(null);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not save change.'); }
    finally { lock.current = false; setBusy(false); }
  }
  const saved = !temporary && items.some(x => x.id === id);
  return <main id={embedded ? 'atlas-widget-chat' : 'atlas-main'} tabIndex={-1} ref={shell} className={`${styles.shell} ${embedded ? styles.embedded : ''}`}>
    <aside className={`${styles.sidebar} ${showHistory ? styles.sidebarOpen : ''}`} aria-label={t("Atlas conversations")}>
      <Link href="/profile" className={styles.back}><LocalizedText text="← Workspace" /></Link>
      <div className={styles.brand}><Image src="/brand/atlas/avatar.webp" width={48} height={48} alt={t("Atlas owl")} /><div><strong>TGPI ATLAS AI</strong><span>{t("Your global companion")}</span></div></div>
      <button className={styles.primary} disabled={busy} onClick={() => newConversation(false)}>{t("＋ New conversation")}</button>
      <button disabled={busy} onClick={() => newConversation(true)}>{t("Start temporary conversation")}</button>
      <label className={styles.search}>{t("Search loaded history")}<input value={query} onChange={e => setQuery(e.target.value)} placeholder={t("Search by title…")} type="search" /></label>
      <div className={styles.history}>
        {items.filter(x => x.title.toLowerCase().includes(query.toLowerCase())).map(item => <button key={item.id} disabled={busy} aria-current={item.id === id ? 'page' : undefined} onClick={() => void openConversation(item.id)}>{item.title}</button>)}
        {!items.length && !loadingHistory && <p>{t("No saved conversations loaded.")}</p>}
        {cursor && <button disabled={loadingHistory || busy} onClick={() => void loadHistory(cursor)}>{t("Load more conversations")}</button>}
        {loadingHistory && <p role="status">{t("Loading history…")}</p>}
      </div>
      <div className={styles.sideNote}><span>{t("PRIVATE VALIDATION")}</span><p>{t("One thoughtful step at a time.")}</p><Link href="/profile/security">{t("Account & privacy ↗")}</Link></div>
    </aside>
    <section className={styles.chat} aria-label={t("Conversation with Atlas")}>
      <header className={styles.header}>
        <button className={styles.historyToggle} aria-expanded={showHistory} onClick={() => setShowHistory(!showHistory)}>{t("History")}</button>
        <div><h1>Atlas <span>AI</span></h1><p>{temporary ? t('Temporary conversation') : title || t('New conversation')}</p></div>
        <div className={styles.headerActions}>{saved && <><button disabled={busy} onClick={() => void openConversation(id)}>{t("Reload")}</button><button disabled={busy} onClick={() => { setAction('rename'); setRename(title); }}>{t("Rename")}</button><button disabled={busy} onClick={() => setAction('delete')}>{t("Delete")}</button></>}</div>
      </header>
      {!enabled && <div className={styles.confirm} role="status"><p><strong>{t("Atlas preview")}</strong>{' '}{t("— Explore the interface. AI replies are not available for this account yet. Messages cannot be sent during this preview.")}</p></div>}
      {action && <div className={styles.confirm}>
        {action === 'rename' ? <><label>{t("Conversation title")}<input value={rename} maxLength={70} onChange={e => setRename(e.target.value)} /></label><button disabled={busy || !rename.trim()} onClick={() => void mutate({ title: rename.trim() })}>{t("Save title")}</button></> : <><p>{t("Delete this conversation and its messages from TGPI? This cannot be undone.")}</p><button disabled={busy} onClick={() => void mutate('delete')}>{t("Confirm deletion")}</button></>}
        <button disabled={busy} onClick={() => setAction(null)}><LocalizedText text="Cancel" /></button>
      </div>}
      <div className={styles.messages} ref={viewport} tabIndex={0} aria-label={t("Message history")} onScroll={e => {
        const el = e.currentTarget; follow.current = el.scrollHeight - el.scrollTop - el.clientHeight < 90;
        if (follow.current) setHasNew(false);
      }}>
        {!messages.length ? <div className={styles.welcome}>
          <Image src="/brand/atlas/welcome.webp" alt={t("Atlas, the TGPI explorer owl")} width={220} height={220} priority />
          <span className={styles.eyebrow}>{t("INTELLIGENCE FOR YOUR GLOBAL LIFE")}</span>
          <h2><LocalizedText text="A world of possibilities." /><br /><em><LocalizedText text="A clearer next step." /></em></h2>
          <p>{t("Ask about a destination, explore an idea, or work through a decision. We can start wherever you are.")}</p>
          <div className={styles.starters}>{starters.map(prompt => <button key={prompt} onClick={() => { updateDraft(t(prompt)); composer.current?.focus(); }}>{t(prompt)}<span aria-hidden="true">↗</span></button>)}</div>
        </div> : <div className={styles.messageColumn}>{messages.map(message => <article key={message.id} className={message.role === 'user' ? styles.userMessage : styles.assistantMessage}>
          <div className={styles.messageLabel}>{message.role === 'assistant' && <Image src="/brand/atlas/avatar.webp" alt="" width={30} height={30} />}<strong>{message.role === 'user' ? t('You') : 'Atlas'}</strong></div>
          <div className={styles.prose}><ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml urlTransform={safeAtlasLink} components={{ img: () => null, a: ({ href, children }) => href ? <Link href={href}>{children}</Link> : <span>{children}</span> }}>{message.content}</ReactMarkdown></div>
          {message.role === 'assistant' && <>
            {!!message.factors?.length && <p className={styles.factors}>{t("Profile fields shared:")}{' '}{message.factors.map(factor => t(factor)).join(' · ')}</p>}
            {message.status !== 'complete' && message.content && <small>{t("Partial reply")}</small>}
            {message.content && <div className={styles.messageActions}>
              <button onClick={() => { void navigator.clipboard.writeText(message.content).then(() => setNotice('Reply copied.')).catch(() => setError('Copy unavailable. Select the reply to copy it.')); }}><LocalizedText text="Copy" /></button>
              {saved && !message.id.endsWith('-stream') && <><button disabled={busy} aria-pressed={message.feedback === 'up'} onClick={() => void mutate({ messageId: message.id, feedback: 'up' })}>{t("Helpful")}</button><button disabled={busy} aria-pressed={message.feedback === 'down'} onClick={() => void mutate({ messageId: message.id, feedback: 'down' })}>{t("Needs improvement")}</button></>}
            </div>}
          </>}
        </article>)}</div>}
      </div>
      {hasNew && <button className={styles.jump} onClick={() => { follow.current = true; setHasNew(false); if (viewport.current) viewport.current.scrollTop = viewport.current.scrollHeight; }}>{t("New response ↓")}</button>}
      <div className={styles.composerArea}>
        <details className={styles.context}><summary>{scopes.length ? t('Personalization · {count} selected categories', { count: scopes.length }) : t('Personalization · off')}</summary>
          <p>{t("For your next question, share selected fields from your TGPI profile with OpenAI. Unchecking a category stops future retrieval; previous replies may still contain it. Start a new conversation for a fresh context.")}</p>
          <div>{choices.map(choice => <label key={choice.id}><input disabled={busy || !!pending} type="checkbox" checked={scopes.includes(choice.id)} onChange={e => setScopes(previous => e.target.checked ? [...previous, choice.id] : previous.filter(x => x !== choice.id))} />{t(choice.label)}</label>)}</div>
        </details>
        {error && <div role="alert" className={styles.error}><p>{t(error)}</p>{pending && !busy && <div><button onClick={() => void send(pending)}>{t("Retry last question")}</button>{!temporary && <button onClick={() => void openConversation(id)}>{t("Reload conversation")}</button>}<button onClick={() => newConversation()}>{t("Start new conversation")}</button></div>}</div>}
        <form className={styles.composer} onSubmit={e => { e.preventDefault(); if (!pending) void send(); }}>
          <label className={styles.srOnly} htmlFor="atlas-message">{t("Message Atlas")}</label>
          <textarea id="atlas-message" ref={composer} value={draft} maxLength={4000} rows={2} placeholder={t("Ask Atlas anything…")} onChange={e => updateDraft(e.target.value)} onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && window.matchMedia('(min-width: 768px)').matches) { e.preventDefault(); if (!pending) void send(); }
          }} />
          {busy ? <button type="button" disabled={!abort.current} onClick={() => abort.current?.abort()}>{t("Stop")}</button> : <button type="submit" disabled={!enabled || !draft.trim() || !!pending || !id} aria-label={t("Send message")}>{t("Send ↑")}</button>}
        </form>
        <p className={styles.status} role="status" aria-live="polite">{busy ? t('Processing your request…') : t(notice)}</p>
        <details className={styles.privacy}><summary>{temporary ? t('Temporary · not saved in TGPI chat history') : t('Private history · 30-day access window')}{' '}{t("· Privacy & limits")}</summary>
          <p>{t("Messages and selected profile fields are processed by OpenAI. Atlas does not update your profile or create memories. Saved chats expire 30 days after creation; deletion removes the active TGPI record. Provider retention, backup retention and asynchronous cleanup may differ.")}</p>
          <p>{temporary ? t('Temporary messages stay in this page while it is open; TGPI retains usage metadata for rate limits, not their text.') : t('Unsent drafts are kept in this browser tab until sent or cleared. History is stored in your private account.')}{' '}{t("This validation version allows 10 requests per account per UTC day, with a shared spending cap. It has no live web research, attachments, voice or account-changing tools. Verify important or time-sensitive information.")}</p>
        </details>
      </div>
    </section>
  </main>;
}
