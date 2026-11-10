import { localizeMetadata } from "@/lib/localization/metadata.server";
import { isSponsoredAtlas } from '@/lib/atlas/sponsored.server';
import type { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import AtlasChat from '@/components/atlas/AtlasChat';
import AtlasStudio from '@/components/atlas/AtlasStudio';
import { requireAtlasGeneration } from '@/lib/atlas/http.server';

const sourceMetadata: Metadata = {
  title: 'Atlas AI | TGPI',
  description: 'Intelligence for your global life.',
  robots: { index: false, follow: false },
};
export default async function AtlasPage({ searchParams }: {
  searchParams: Promise<{ guide?: string | string[]; mode?: string | string[] }>;
}) {
  const [{ userId }, { guide, mode }] = await Promise.all([auth(), searchParams]);
  if (!userId) return null;
  let enabled = false;
  try { requireAtlasGeneration(userId); enabled = true; } catch { /* The browser guide remains available. */ }
  const sponsored = isSponsoredAtlas();
  if (mode === 'account') {
    return <AtlasChat key={userId} userId={userId} enabled={enabled && !sponsored} archive />;
  }
  return <main>
    <AtlasStudio key={userId} userId={userId} onlineAvailable={enabled && sponsored}
      context={guide === 'evidence' ? { topic: 'intelligence' } : undefined} />
  </main>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
