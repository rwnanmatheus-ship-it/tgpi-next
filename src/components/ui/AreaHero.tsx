import Image from "@/components/localization/LocalizedImage";
import CinematicImage from './CinematicImage';
import { cinematicKeyFromUrl } from '@/lib/cinematic-art';
import { LocalizedText } from "@/components/localization/LocaleProvider";
import Link from "next/link";
import type { ReactNode } from "react";

type HeroAction = { href: string; label: string };
type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  image?: string;
  actions?: readonly HeroAction[];
  children?: ReactNode;
  headingLevel?: 1 | 2;
};

/** Shared material and hierarchy, with area-specific content and artwork. */
export default function AreaHero({ id, eyebrow, title, description, image = "/images/cinematic-2026/learning-atelier-1600.webp", actions = [], children, headingLevel = 1 }: Props) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const artwork = cinematicKeyFromUrl(image);
  return (
    <header className="tgpi-area-hero" aria-labelledby={id}>
      <div className="tgpi-area-hero-art" aria-hidden="true">
        {artwork ? <CinematicImage asset={artwork} alt="" priority sizes="(max-width: 767px) 100vw, 70vw" /> : <Image src={image} alt="" fill priority sizes="(max-width: 767px) 100vw, 70vw" className="object-cover" />}
      </div>
      <div className="tgpi-area-hero-content">
        <p className="tgpi-area-eyebrow"><LocalizedText text={eyebrow} /></p>
        <Heading id={id}><LocalizedText text={title} /></Heading>
        <p className="tgpi-area-description"><LocalizedText text={description} /></p>
        {actions.length ? <div className="tgpi-area-actions">{actions.map((action, index) => <Link key={action.href} href={action.href} className={index === 0 ? "tgpi-area-primary" : "tgpi-area-secondary"}><LocalizedText text={action.label} /><span aria-hidden="true">↗</span></Link>)}</div> : null}
        {children}
      </div>
    </header>
  );
}
