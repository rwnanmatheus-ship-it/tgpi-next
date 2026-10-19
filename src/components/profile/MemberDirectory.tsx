'use client';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
type Member = { name: string; avatar: string; handle: string; number: string; path: string };
export default function MemberDirectory() {
  const [query, setQuery] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [status, setStatus] = useState('Enter an exact @ID or full TGPI number.');
  const [busy, setBusy] = useState(false);
  async function search(event: FormEvent) {
    event.preventDefault(); if (busy) return; setBusy(true); setMembers([]); setStatus('Searching…');
    try {
      const response = await fetch(`/api/members?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
      const result = await response.json(); if (!response.ok) throw new Error(result.error);
      setMembers(result.members); setStatus(result.members.length ? 'Member found.' : 'No discoverable member found. Check the exact ID and privacy settings.');
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Unable to search. Retry shortly.'); }
    finally { setBusy(false); }
  }
  return <section className="tgpi-member-panel"><p className="tgpi-member-eyebrow">TGPI / Member discovery</p><h2>Find a global perspective.</h2><p>Exact identifiers only. Discovery inside TGPI is separate from publication on the internet.</p><form onSubmit={search} className="mt-5 flex flex-wrap items-end gap-3"><label className="min-w-0 flex-1">@ID or TGPI number<input className="tgpi-account-input mt-2" value={query} onChange={e => setQuery(e.target.value)} autoCapitalize="none" autoComplete="off" spellCheck={false} maxLength={40} required placeholder="@member or TGPI-XXXX-XXXX-XXXX" /></label><button className="tgpi-member-button" disabled={busy} type="submit">{busy ? 'Searching…' : 'Find member'}</button></form><p role="status" aria-live="polite" className="mt-3 text-sm">{status}</p>{members.map(m => <Link key={m.number} href={m.path} className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-300 p-4"><span className="h-14 w-14 shrink-0 rounded-full bg-slate-200 bg-cover bg-center" role="img" aria-label={`${m.name} avatar`} style={{ backgroundImage: `url(${m.avatar})` }} /><span className="min-w-0"><strong className="block break-words">{m.name}</strong><span className="block break-all">@{m.handle}</span><span className="block break-all text-sm">{m.number}</span></span><span className="ml-auto">View profile →</span></Link>)}</section>;
}
