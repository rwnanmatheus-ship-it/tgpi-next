import CinematicImage from './CinematicImage';

/** Shared institutional artwork, delivered at the device's required resolution. */
export default function PlatformBannerImage({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return <CinematicImage asset="learning-atelier" alt="" sizes="(min-width: 1440px) 900px, 100vw" priority={priority} className={className} />;
}
