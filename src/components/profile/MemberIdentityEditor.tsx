'use client';
import { useEffect, useState, useId } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleError, normalizeHandle, type MemberIdentity } from '@/lib/members/identity';
import { LocalizedText } from "@/components/localization/LocaleProvider";

export default function MemberIdentityEditor() {
  const router = useRouter(); const id = useId();
  const [identity, setIdentity] = useState<MemberIdentity | null>(null);
  const [handle, setHandle] = useState('');
  const [busy, setBusy] = useState(true);
  const [available, setAvailable] = useState(false);
  const [message, setMessage] = useState('Loading your member identity…');
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/member-identity', { cache: 'no-store', signal: controller.signal }).then(async r => {
      const data = await r.json(); if (!r.ok) throw new Error(data.error);
      setIdentity(data.identity); setHandle(data.identity?.handle || ''); setAvailable(data.available);
      setMessage(data.available ? 'Saved separately from your personal information. One change every 30 days; old IDs remain reserved to you and keep resolving to your profile.' : 'Member identity is temporarily unavailable. Your other settings remain available.');
    }).catch(e => { if (e.name !== 'AbortError') { setError('Unable to load your identity. Reload to retry.'); setMessage('Member identity is unavailable. Your profile draft is preserved.'); } }).finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  }, []);
  async function save() {
    const validation = handleError(normalizeHandle(handle)); if (validation) { setError(validation); return; }
    setBusy(true); setError('');
    try {
      const r = await fetch('/api/member-identity', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ handle }) });
      const data = await r.json(); if (!r.ok) throw new Error(data.error);
      setIdentity(data.identity); setHandle(data.identity.handle); setMessage('Member identity saved. Your TGPI number is stable.'); router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to save. Your entry is preserved.'); }
    finally { setBusy(false); }
  }
  return <section className="tgpi-member-panel mt-5"><p className="tgpi-member-eyebrow"><LocalizedText text="Member identity" /></p><h3>Your name across TGPI.</h3><label htmlFor={id} className="mt-4 block font-bold">Unique @ID</label><div className="mt-2 flex flex-wrap gap-3"><input id={id} aria-describedby={`${id}-help ${id}-error`} aria-invalid={Boolean(error)} disabled={!available || busy} autoCapitalize="none" autoComplete="off" spellCheck={false} maxLength={30} className="tgpi-account-input min-w-0 flex-1" value={handle} onChange={e => { setHandle(normalizeHandle(e.target.value)); setError(''); }} /><button className="tgpi-member-button" disabled={!available || busy || identity?.handle === handle} onClick={save} type="button">{busy ? 'Please wait…' : identity?.handle ? 'Change @ID' : 'Create @ID'}</button></div><p id={`${id}-help`} role="status" className="mt-3 text-sm">{message}</p><p id={`${id}-error`} role="alert" className="text-sm text-red-800">{error}</p>{identity ? <p className="mt-3 break-all font-mono text-sm">{identity.number}</p> : null}<Link href="/members" className="mt-4 inline-flex min-h-11 items-center font-bold text-[#164e83]">Find another member →</Link></section>;
}
