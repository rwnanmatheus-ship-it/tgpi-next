import type { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import AtlasChat from '@/components/atlas/AtlasChat';

export const metadata: Metadata = {
  title: 'Atlas AI | TGPI',
  description: 'Intelligence for your global life.',
  robots: { index: false, follow: false },
};
export default async function AtlasPage() {
  const { userId } = await auth();
  if (!userId) return null;
  return <AtlasChat key={userId} userId={userId} />;
}
