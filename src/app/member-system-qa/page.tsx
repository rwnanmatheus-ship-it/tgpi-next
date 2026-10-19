import { notFound } from 'next/navigation';
import QRCode from 'qrcode';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import MemberVisualFixture from './fixture';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'TGPI member QA — synthetic fixtures', robots: { index: false, follow: false } };
export default async function Page({ searchParams }: { searchParams: Promise<{ frame?: string; mode?: string }> }) {
 if (process.env.VERCEL_ENV !== 'preview') notFound();
 const params = await searchParams;
 const crest = await readFile(path.join(process.cwd(), 'src/assets/brand/tgpi-crest-print.png'));
 return <MemberVisualFixture framed={params.frame === '1'} mode={params.mode || 'account'} crest={`data:image/png;base64,${crest.toString('base64')}`} qr={await QRCode.toDataURL('https://theglobalpolymath.com/member/TGPI-AAAA-BBBB-CCCC',{width:420,margin:4})} />;
}
