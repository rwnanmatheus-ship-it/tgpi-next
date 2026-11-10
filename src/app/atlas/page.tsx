import { localizeMetadata } from "@/lib/localization/metadata.server";
import { isSponsoredAtlas } from '@/lib/atlas/sponsored.server';
import type { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import AtlasChat from '@/components/atlas/AtlasChat';
import { requireAtlasGeneration } from '@/lib/atlas/http.server';

const sourceMetadata: Metadata = {
  title: 'Atlas AI | TGPI',
  description: 'Intelligence for your global life.',
  robots: { index: false, follow: false },
};
export default async function AtlasPage() {
  const { userId } = await auth();
  if (!userId) return null;
  let enabled = false;
  try { requireAtlasGeneration(userId); enabled = true; } catch { /* Interface preview remains available. */ }
  return <AtlasChat key={userId} userId={userId} enabled={enabled} sponsored={isSponsoredAtlas()} />;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
