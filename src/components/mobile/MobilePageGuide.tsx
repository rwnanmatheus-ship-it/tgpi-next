
import { LocalizedText } from "@/components/localization/LocaleProvider";

import { LocalizedElement } from "@/components/localization/LocalizedElement";
import type { ReactNode } from "react";
import MobileIcon from "./MobileIcon";

type MobilePageGuideProps = {
  label: string;
  title: string;
  children: ReactNode;
  links: ReadonlyArray<{ label: string; href: string }>;
};

export default function MobilePageGuide({ label, title, children, links }: MobilePageGuideProps) {
  return <LocalizedElement as="section" className="tgpi-mobile mobile-page-guide" aria-label={label}><p className="mobile-eyebrow"><LocalizedText text={label} /></p><h2><LocalizedText text={title} /></h2><p>{children}</p><LocalizedElement as="nav" aria-label={`${label} shortcuts`}>{links.map(({ label: text, href }) => <a key={href} href={href}><LocalizedText text={text} /><MobileIcon name="arrow" width={17} height={17} /></a>)}</LocalizedElement></LocalizedElement>;
}
