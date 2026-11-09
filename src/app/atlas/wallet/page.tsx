import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import AtlasWallet from '@/components/atlas/AtlasWallet';
export const metadata: Metadata = { title: 'Atlas Wallet | TGPI', description: 'Prepaid Atlas credits and transaction history.', robots: { index: false, follow: false } };
export default async function WalletPage() {
  const { userId } = await auth();
  const founder = !!userId && (process.env.TGPI_FOUNDER_USER_IDS || '').split(',').map(id => id.trim()).includes(userId);
  return <>{founder && <nav aria-label="Administração da carteira" className="mx-auto max-w-5xl px-6 pt-6 text-sm text-amber-200"><Link href="/atlas/wallet/treasury">Tesouraria e diagnóstico de ativação →</Link></nav>}<AtlasWallet /></>;
}
