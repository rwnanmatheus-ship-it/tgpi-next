import type { Metadata } from 'next';
import AtlasWallet from '@/components/atlas/AtlasWallet';
export const metadata: Metadata = { title: 'Atlas Wallet | TGPI', description: 'Prepaid Atlas credits and transaction history.', robots: { index: false, follow: false } };
export default function WalletPage() { return <AtlasWallet />; }
