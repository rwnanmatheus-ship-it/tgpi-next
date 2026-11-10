import CinematicImage from '@/components/ui/CinematicImage';
import type { CinematicKey } from '@/lib/cinematic-art';

export type EditorialAsset = 'hero' | 'decision' | 'country' | 'preparation' | 'learning' | 'english' | 'budget';
const assets: Record<EditorialAsset, CinematicKey> = {
  hero: 'global-horizon', decision: 'decision-comparison', country: 'evidence-research',
  preparation: 'documents-preparation', learning: 'learning-atelier',
  english: 'english-dialogue', budget: 'budget-planning',
};
export default function EditorialImage({ asset, alt, sizes, eager = false }: {
  asset: EditorialAsset; alt: string; sizes: string; eager?: boolean;
}) {
  return <CinematicImage asset={assets[asset]} alt={alt} sizes={sizes} priority={eager} />;
}
