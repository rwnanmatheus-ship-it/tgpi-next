'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import type { WalletAccount, WalletEntry, WalletPack } from '@/lib/wallet/policy';
import styles from './wallet.module.css';
import { walletCopy } from '@/lib/wallet/copy';
type Wallet = WalletAccount & { mode: 'live' | 'test'; entries: WalletEntry[]; cursor: string | null; turnPriceCents: number; packs: { id: WalletPack; cents: number }[]; checkoutEnabled: boolean };

export default function AtlasWallet() {
  const { locale } = useLocale(); const c = walletCopy[locale];
  const [wallet, setWallet] = useState<Wallet | null>(null); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const money = (cents: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(cents / 100);
  const load = useCallback(async (cursor?: string) => {
    setBusy(true); setError('');
    try {
      if (!cursor) {
        let recoveryCursor: string | undefined;
        // Bounded recovery batches; balances change only from server-owned expired reservations.
        for (let page = 0; page < 5; page++) {
          const recovery = await fetch('/api/atlas/wallet/recover', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cursor: recoveryCursor }) });
          if (!recovery.ok) break;
          const recovered = await recovery.json(); recoveryCursor = recovered.cursor || undefined;
          if (!recoveryCursor) break;
        }
      }
      const response = await fetch(`/api/atlas/wallet${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ''}`, { cache: 'no-store' });
      const body = await response.json(); if (!response.ok) throw Error(body.error || c.failed);
      setWallet(previous => ({ ...body, entries: cursor && previous ? [...previous.entries, ...body.entries] : body.entries }));
    } catch (e) { setError(e instanceof Error ? e.message : c.failed); } finally { setBusy(false); }
  }, [c.failed]);
  useEffect(() => { void load(); }, [load]);
  async function checkout(pack: WalletPack) {
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/atlas/wallet/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pack }) });
      const body = await response.json(); if (!response.ok) throw Error(body.error || c.failed);
      const url = new URL(body.url); if (url.protocol !== 'https:' || url.hostname !== 'checkout.stripe.com') throw Error(c.failed);
      window.location.assign(url.href);
    } catch (e) { setError(e instanceof Error ? e.message : c.failed); setBusy(false); }
  }
  return <main className={styles.page}>
    <nav><Link href="/atlas">← {c.back}</Link><span>TGPI / ATLAS</span></nav>
    <header><p className={styles.eyebrow}>ATLAS WALLET</p><h1>{c.title}</h1><p>{c.subtitle}</p></header>
    {wallet?.mode === 'test' && <p className={styles.notice} role="status">{c.testing}</p>}
    {error && <p role="alert" className={styles.notice}>{error}</p>}
    {!wallet && !error && <p role="status">{c.loading}</p>}
    <section className={styles.balance} aria-label={c.available}>
      <div><p>{c.available}</p><strong>{wallet ? money(wallet.balanceCents) : '—'}</strong><span>USD · {wallet ? money(wallet.turnPriceCents) : 'US$ 0.10'} {c.price}</span></div>
      <dl><div><dt>{c.reserved}</dt><dd>{wallet ? money(wallet.reservedCents) : '—'}</dd></div><div><dt>{c.spent}</dt><dd>{wallet ? money(wallet.spentCents) : '—'}</dd></div></dl>
    </section>
    {wallet && wallet.balanceCents < 0 && <p role="alert" className={styles.notice}>{c.debt}</p>}
    {wallet && !wallet.checkoutEnabled && <p className={styles.notice}>{c.closed}</p>}
    <section><h2>{c.add}</h2><div className={styles.packs}>{(wallet?.packs || [{ id: 'starter' as const, cents: 500 }, { id: 'explorer' as const, cents: 1000 }, { id: 'global' as const, cents: 2500 }]).map(pack => <article key={pack.id}><span>{c.creditLabel}</span><h3>{money(pack.cents)}</h3><button disabled={busy || !wallet?.checkoutEnabled} onClick={() => void checkout(pack.id)}>{c.add} ↗</button></article>)}</div><p className={styles.fine}>{c.terms}</p></section>
    <section><div className={styles.heading}><h2>{c.history}</h2><button disabled={busy} onClick={() => void load()}>{c.refresh}</button></div><p className={styles.fine}>{c.notice}</p>
      {wallet?.entries.length ? <ul className={styles.ledger}>{wallet.entries.map(entry => <li key={entry.id}><div><strong>{c[entry.kind]}</strong><time dateTime={entry.createdAt}>{new Date(entry.createdAt).toLocaleString(locale)}</time></div><span>{entry.amountCents > 0 ? '+' : ''}{money(entry.amountCents)}</span></li>)}</ul> : wallet && <p className={styles.empty}>{c.empty}</p>}
      {wallet?.cursor && <button disabled={busy} onClick={() => void load(wallet.cursor!)}>{c.more}</button>}
    </section>
  </main>;
}
