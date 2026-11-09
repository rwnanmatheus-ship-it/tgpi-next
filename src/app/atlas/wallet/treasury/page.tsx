import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getFirestoreDocument, isLearningStorageConfigured } from '@/lib/firestore-admin-rest.server';
import { emptyTreasury, fundedLimitMicroUsd, TREASURY_PATH, walletCheckoutConfigured, type Treasury } from '@/lib/wallet/store.server';
import styles from '@/components/atlas/wallet.module.css';
export default async function TreasuryPage() {
  const { userId } = await auth();
  const founders = (process.env.TGPI_FOUNDER_USER_IDS || '').split(',').map(x => x.trim());
  if (!userId || !founders.includes(userId)) notFound();
  if (!isLearningStorageConfigured()) return <main className={styles.page}><h1>Tesouraria TGPI</h1><p>Armazenamento indisponível. Nenhum saldo foi presumido.</p></main>;
  const treasury = (await getFirestoreDocument<Treasury>(TREASURY_PATH))?.data || emptyTreasury();
  const usd = (cents: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(cents / 100);
  return <main className={styles.page}><nav><Link href="/atlas/wallet">← Carteira Atlas</Link><span>TGPI · FOUNDER</span></nav><header><p className={styles.eyebrow}>TESOURARIA</p><h1>Receita com controle.</h1><p>Pagamentos, obrigações de créditos e capacidade da API em contas separadas.</p></header><section className={styles.packs}>
    {[
      ['Recebimentos líquidos registrados', usd(treasury.collectedCents)],
      ['Reversões registradas', usd(treasury.reversedCents)],
      ['Receita por respostas concluídas', usd(treasury.revenueCents)],
      ['Reserva conservadora da API', usd(treasury.providerReservedMicroUsd / 10_000)],
      ['Financiamento da API documentado', usd(fundedLimitMicroUsd() / 10_000)],
      ['Capacidade da API restante', usd(Math.max(0, fundedLimitMicroUsd() - treasury.providerReservedMicroUsd) / 10_000)],
    ].map(([label, value]) => <article key={label}><span>{label}</span><h3>{value}</h3></article>)}
    </section><p className={styles.notice}>{walletCheckoutConfigured() ? 'Configuração comercial habilitada; cada compra e chamada ainda passa por verificação de acesso e capacidade.' : 'Compras desabilitadas até a validação comercial e do financiamento.'}</p><p className={styles.fine}>Recebimentos registrados não são saldo bancário disponível nem lucro distribuível. Créditos ainda não utilizados são obrigações com os usuários. Taxas, impostos, disputas, infraestrutura e demais custos devem ser conciliados antes de calcular o lucro. Pagamentos seguem para a conta Stripe já vinculada à TGPI; esta tela não executa transferências ou saques.</p></main>;
}
