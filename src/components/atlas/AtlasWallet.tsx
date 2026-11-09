'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import type { WalletAccount, WalletEntry, WalletPack } from '@/lib/wallet/policy';
import styles from './wallet.module.css';
type Wallet = WalletAccount & { entries: WalletEntry[]; cursor: string | null; turnPriceCents: number; packs: { id: WalletPack; cents: number }[]; checkoutEnabled: boolean };
const copy = {
  en: { title: 'Your Atlas wallet', subtitle: 'Intelligence on your terms. Pay only with prepaid credits.', available: 'Available credits', reserved: 'Reserved for replies', spent: 'Used on Atlas', add: 'Add credits', refresh: 'Refresh balance', loading: 'Loading wallet…', closed: 'Credit purchases are not open yet. Payment and funded service capacity must be validated before checkout is enabled.', terms: 'Credits are for Atlas services only: no transfers, withdrawals or automatic top-ups. Premium is separate. Failed or interrupted replies release reserved credits. Refunds and payment disputes adjust your balance.', history: 'Activity', empty: 'No transactions yet. Your balance starts at zero.', back: 'Back to Atlas', price: 'per completed reply', more: 'Load more activity', notice: 'A checkout confirmation does not update your balance immediately. Credits appear only after verified payment processing.', failed: 'Unable to load your wallet. Try again.', topup: 'Credits added', reserve: 'Reply reserved', consume: 'Reply completed', release: 'Credits released', reversal: 'Payment reversed', debt: 'Your account has a payment adjustment. Settle it before using Atlas.' },
  pt: { title: 'Sua carteira Atlas', subtitle: 'Inteligência no seu ritmo. Use somente créditos pré-pagos.', available: 'Créditos disponíveis', reserved: 'Reservado para respostas', spent: 'Utilizado no Atlas', add: 'Adicionar créditos', refresh: 'Atualizar saldo', loading: 'Carregando carteira…', closed: 'A compra de créditos ainda não está aberta. Pagamentos e capacidade financiada do serviço precisam ser validados antes da liberação.', terms: 'Créditos exclusivos para serviços Atlas: sem transferências, saques ou recargas automáticas. Premium é separado. Respostas com falha ou interrompidas devolvem a reserva. Reembolsos e contestações ajustam o saldo.', history: 'Atividade', empty: 'Nenhuma movimentação. Seu saldo começa em zero.', back: 'Voltar ao Atlas', price: 'por resposta concluída', more: 'Carregar mais atividades', notice: 'O retorno do checkout não altera seu saldo imediatamente. Os créditos aparecem somente após a confirmação verificada do pagamento.', failed: 'Não foi possível carregar a carteira. Tente novamente.', topup: 'Créditos adicionados', reserve: 'Resposta reservada', consume: 'Resposta concluída', release: 'Créditos devolvidos', reversal: 'Pagamento revertido', debt: 'Sua conta tem um ajuste de pagamento pendente. Regularize antes de usar o Atlas.' },
};
export default function AtlasWallet() {
  const { locale } = useLocale(); const c = locale.startsWith('pt') ? copy.pt : copy.en;
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
    {error && <p role="alert" className={styles.notice}>{error}</p>}
    {!wallet && !error && <p role="status">{c.loading}</p>}
    <section className={styles.balance} aria-label={c.available}>
      <div><p>{c.available}</p><strong>{wallet ? money(wallet.balanceCents) : '—'}</strong><span>USD · {wallet ? money(wallet.turnPriceCents) : 'US$ 0.10'} {c.price}</span></div>
      <dl><div><dt>{c.reserved}</dt><dd>{wallet ? money(wallet.reservedCents) : '—'}</dd></div><div><dt>{c.spent}</dt><dd>{wallet ? money(wallet.spentCents) : '—'}</dd></div></dl>
    </section>
    {wallet && wallet.balanceCents < 0 && <p role="alert" className={styles.notice}>{c.debt}</p>}
    {wallet && !wallet.checkoutEnabled && <p className={styles.notice}>{c.closed}</p>}
    <section><h2>{c.add}</h2><div className={styles.packs}>{(wallet?.packs || [{ id: 'starter' as const, cents: 500 }, { id: 'explorer' as const, cents: 1000 }, { id: 'global' as const, cents: 2500 }]).map(pack => <article key={pack.id}><span>ATLAS CREDITS</span><h3>{money(pack.cents)}</h3><button disabled={busy || !wallet?.checkoutEnabled} onClick={() => void checkout(pack.id)}>{c.add} ↗</button></article>)}</div><p className={styles.fine}>{c.terms}</p></section>
    <section><div className={styles.heading}><h2>{c.history}</h2><button disabled={busy} onClick={() => void load()}>{c.refresh}</button></div><p className={styles.fine}>{c.notice}</p>
      {wallet?.entries.length ? <ul className={styles.ledger}>{wallet.entries.map(entry => <li key={entry.id}><div><strong>{c[entry.kind]}</strong><time dateTime={entry.createdAt}>{new Date(entry.createdAt).toLocaleString(locale)}</time></div><span>{entry.amountCents > 0 ? '+' : ''}{money(entry.amountCents)}</span></li>)}</ul> : wallet && <p className={styles.empty}>{c.empty}</p>}
      {wallet?.cursor && <button disabled={busy} onClick={() => void load(wallet.cursor!)}>{c.more}</button>}
    </section>
  </main>;
}
