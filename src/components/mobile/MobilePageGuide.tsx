import type { ReactNode } from "react";
import MobileIcon from "./MobileIcon";

type MobilePageGuideProps = {
  label: string;
  title: string;
  children: ReactNode;
  links: ReadonlyArray<{ label: string; href: string }>;
};

export default function MobilePageGuide({ label, title, children, links }: MobilePageGuideProps) {
  return <section className="tgpi-mobile mobile-page-guide" aria-label={label}><p className="mobile-eyebrow">{label}</p><h2>{title}</h2><p>{children}</p><nav aria-label={`${label} shortcuts`}>{links.map(({ label: text, href }) => <a key={href} href={href}>{text}<MobileIcon name="arrow" width={17} height={17} /></a>)}</nav></section>;
}
