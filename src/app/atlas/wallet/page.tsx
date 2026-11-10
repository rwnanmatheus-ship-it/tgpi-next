import { localizeMetadata } from "@/lib/localization/metadata.server";

import { LocalizedElement } from "@/components/localization/LocalizedElement";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import AtlasWallet from '@/components/atlas/AtlasWallet';
const sourceMetadata: Metadata = { title: 'Atlas Wallet | TGPI', description: 'Prepaid Atlas credits and transaction history.', robots: { index: false, follow: false } };
export default async function WalletPage() {
  const { userId } = await auth();
  const founder = !!userId && (process.env.TGPI_FOUNDER_USER_IDS || '').split(',').map(id => id.trim()).includes(userId);
  return <>{founder && <LocalizedElement as="nav" aria-label="Administração da carteira" className="mx-auto max-w-5xl px-6 pt-6 text-sm text-amber-200"><Link href="/atlas/wallet/treasury"><LocalizedText text={"Tesouraria e diagnóstico de ativação →"} /></Link></LocalizedElement>}<AtlasWallet /></>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
