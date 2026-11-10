import type { CSSProperties } from 'react';
import { cinematicSrcSet, cinematicUrl, type CinematicKey } from '@/lib/cinematic-art';

type Props = {
  asset: CinematicKey;
  alt: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  position?: CSSProperties['objectPosition'];
};

/** Static AVIF/WebP srcsets: native loading, without on-demand image transformation. */
export default function CinematicImage({ asset, alt, sizes, priority = false, fill = true, className, position = 'center' }: Props) {
  const avif = cinematicSrcSet(asset, 'avif');
  const webp = cinematicSrcSet(asset, 'webp');
  return <>
    {priority ? <link rel="preload" as="image" type="image/avif" imageSrcSet={avif} imageSizes={sizes} fetchPriority="high" /> : null}
    <picture style={fill ? { display: 'contents' } : undefined}>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      {/* Encoded ahead of deployment; Next optimization would re-encode these same variants. */}
      <img src={cinematicUrl(asset, 800)} srcSet={webp} sizes={sizes} alt={alt} width={1600} height={900}
        loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async"
        className={className} data-tgpi-art={asset}
        style={{ ...(fill ? { position: 'absolute', inset: 0, height: '100%', width: '100%' } : { width: '100%', height: 'auto' }), objectFit: 'cover', objectPosition: position }} />
    </picture>
  </>;
}
