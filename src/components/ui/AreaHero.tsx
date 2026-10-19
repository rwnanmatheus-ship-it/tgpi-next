import Image from "next/image";
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
export default function AreaHero({ id, eyebrow, title, description, image = "/images/platform/global-study-v1.webp", actions = [], children, headingLevel = 1 }: Props) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <header className="tgpi-area-hero" aria-labelledby={id}>
      <div className="tgpi-area-hero-art" aria-hidden="true">
        <Image src={image} alt="" fill priority sizes="(max-width: 767px) 100vw, 70vw" className="object-cover" />
      </div>
      <div className="tgpi-area-hero-content">
        <p className="tgpi-area-eyebrow">{eyebrow}</p>
        <Heading id={id}>{title}</Heading>
        <p className="tgpi-area-description">{description}</p>
        {actions.length ? <div className="tgpi-area-actions">{actions.map((action, index) => <Link key={action.href} href={action.href} className={index === 0 ? "tgpi-area-primary" : "tgpi-area-secondary"}>{action.label}<span aria-hidden="true">↗</span></Link>)}</div> : null}
        {children}
      </div>
    </header>
  );
}
