import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DesignSystemSpecimen from '@/components/design-system/DesignSystemSpecimen';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title:'TGPI Design System 2 · Verification', robots:{ index:false, follow:false } };
export default function DesignSystemPage() {
  if (process.env.NODE_ENV !== 'development' && process.env.VERCEL_ENV !== 'preview') notFound();
  return <DesignSystemSpecimen />;
}
