import { getLocale as getFormattingLocale } from "@/lib/localization/server";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import { walletReadiness } from '@/lib/wallet/readiness.server';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getFirestoreDocument, isLearningStorageConfigured } from '@/lib/firestore-admin-rest.server';
import { emptyTreasury, fundedLimitMicroUsd, TREASURY_PATH, walletCheckoutConfigured, type Treasury } from '@/lib/wallet/store.server';
import styles from '@/components/atlas/wallet.module.css';
export default async function TreasuryPage() {
  const locale = await getFormattingLocale();
  const { userId } = await auth();
  const founders = (process.env.TGPI_FOUNDER_USER_IDS || '').split(',').map(x => x.trim());
  if (!userId || !founders.includes(userId)) notFound();
  if (!isLearningStorageConfigured()) return <main className={styles.page}><h1><LocalizedText text={"Tesouraria TGPI"} /></h1><p><LocalizedText text={"Armazenamento indisponível. Nenhum saldo foi presumido."} /></p></main>;
  const [treasuryRecord, readiness] = await Promise.all([getFirestoreDocument<Treasury>(TREASURY_PATH), walletReadiness()]);
  const treasury = treasuryRecord?.data || emptyTreasury();
  const usd = (cents: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(cents / 100);
  return <main className={styles.page}><nav><Link href="/atlas/wallet"><LocalizedText text={"← Carteira Atlas"} /></Link><span><LocalizedText text={"TGPI · FOUNDER"} /></span></nav><header><p className={styles.eyebrow}><LocalizedText text={"TESOURARIA"} /></p><h1><LocalizedText text={"Receita com controle."} /></h1><p><LocalizedText text={"Pagamentos, obrigações de créditos e capacidade da API em contas separadas."} /></p></header><section className={styles.packs}>
    {[
      ['Recebimentos líquidos — equivalente USD', usd(treasury.collectedCents)],
      ['Reversões registradas', usd(treasury.reversedCents)],
      ['Consumo registrado antes de estornos', usd(treasury.revenueCents)],
      ['Reserva conservadora da API', usd(treasury.providerReservedMicroUsd / 10_000)],
      ['Financiamento da API documentado', usd(fundedLimitMicroUsd() / 10_000)],
      ['Capacidade da API restante', usd(Math.max(0, fundedLimitMicroUsd() - treasury.providerReservedMicroUsd) / 10_000)],
    ].map(([label, value]) => <article key={label}><span><LocalizedText text={label} /></span><h3>{value}</h3></article>)}
    </section><section><h2><LocalizedText text={"Diagnóstico de ativação"} /></h2><p className={styles.fine}><LocalizedText text={"Ambiente:"} />{" "}{readiness.mode === 'live' ? <LocalizedText text={"produção"} /> : <LocalizedText text={"testes"} />}<LocalizedText text={". Este painel consulta a integração instalada no site; conectar o Stripe ao ChatGPT não altera automaticamente as credenciais do site."} /></p>
      {readiness.account && <p className={styles.fine}><LocalizedText text={"Conta:"} />{" "}{readiness.account.id}{" "}<LocalizedText text={"· País:"} />{" "}{readiness.account.country || <LocalizedText text={"Não informado"} />}{" "}<LocalizedText text={"· Liquidação:"} />{" "}{readiness.account.currency?.toUpperCase() || <LocalizedText text={"Não informada"} />}</p>}
      <ul className={styles.ledger}>{readiness.checks.map(check => <li key={check.label}><strong><LocalizedText text={check.label} /></strong><span>{check.state === 'met' ? <LocalizedText text={"Confirmado"} /> : check.state === 'pending' ? <LocalizedText text={"Pendente"} /> : <LocalizedText text={"Não verificado"} />}</span></li>)}</ul>
      <details><summary><LocalizedText text={"Eventos Stripe necessários"} /></summary><ul>{readiness.requiredEvents.map(event => <li key={event}><code>{event}</code></li>)}</ul></details>
      <p className={styles.fine}><LocalizedText text={"A existência do webhook não comprova a entrega de eventos. Valores convertidos de BRL usam a liquidação registrada pelo Stripe; não representam dólares disponíveis, saque ou lucro."} /></p>
    </section><p className={styles.notice}>{walletCheckoutConfigured() ? <LocalizedText text={"Configuração comercial habilitada; cada compra e chamada ainda passa por verificação de acesso e capacidade."} /> : <LocalizedText text={"Compras desabilitadas até a validação comercial e do financiamento."} />}</p><p className={styles.fine}><LocalizedText text={"Recebimentos registrados não são saldo bancário disponível nem lucro distribuível. Créditos ainda não utilizados são obrigações com os usuários. Taxas, impostos, disputas, infraestrutura e demais custos devem ser conciliados antes de calcular o lucro. Pagamentos seguem para a conta Stripe já vinculada à TGPI; esta tela não executa transferências ou saques."} /></p></main>;
}
