
import { LocalizedText } from "@/components/localization/LocaleProvider";
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CinematicImage from '@/components/ui/CinematicImage';
import { cinematicKeys } from '@/lib/cinematic-art';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'TGPI · Art direction review', robots: { index: false, follow: false } };
export default function ArtDirectionPage() {
  if (process.env.NODE_ENV !== 'development' && process.env.VERCEL_ENV !== 'preview') notFound();
  return <main className="mx-auto max-w-7xl p-5 sm:p-10">
    <h1 className="text-3xl font-semibold"><LocalizedText text={"TGPI · Cinematic collection"} /></h1>
    <p className="my-5">{cinematicKeys.length}{" "}<LocalizedText text={"illustrative scenes · 27 course mappings · AVIF + WebP · 480 / 800 / 1200 / 1600 px"} /></p>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{cinematicKeys.map(asset => <figure key={asset} className="overflow-hidden rounded-xl border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)]">
      <div className="relative aspect-video"><CinematicImage asset={asset} alt="" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" /></div>
      <figcaption className="p-4 text-sm">{asset}</figcaption>
    </figure>)}</div>
  </main>;
}
