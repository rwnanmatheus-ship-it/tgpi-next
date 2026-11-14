"use client";

import Image from "next/image";
import Link from "next/link";
import BrandCrest from "@/components/BrandCrest";
import { InstallGuideButton } from "@/components/app-runtime/TgpiInstallGuide";
import brandStyles from "@/components/brand/showcase-brand.module.css";
import LanguageSelector from "@/components/localization/LanguageSelector";
import { useLocale } from "@/components/localization/LocaleProvider";
import LauncherButton from "@/components/navigation/LauncherButton";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import NavigationLink from "@/components/navigation/NavigationLink";
import AppearanceControl from "@/components/profile/AppearanceControl";
import { HOME_PRODUCTS, type HomeProductId } from "@/lib/home-showcase";
import type { Locale } from "@/lib/localization/config";
import { studyCopy } from "@/lib/localization/study-accessibility";
import styles from "./global-footer.module.css";

function productLink(id: HomeProductId) {
  const { name, href } = HOME_PRODUCTS[id];
  return [name, href] as const;
}

const footerGroups = [
  { title: "Explore & decide", icon: "compass", links: [
    productLink("countries"), productLink("fit"), productLink("compare"), productLink("plan"), productLink("evidence"),
  ] },
  { title: "Learn & prepare", icon: "book", links: [
    productLink("learning"), productLink("certificates"), productLink("documents"), ["Verify a credential", "/verify"], ["Guides", "/guides"],
  ] },
  { title: "Your TGPI", icon: "apps", links: [
    productLink("global-id"), productLink("workspace"), productLink("community"), ["Profile & settings", "/profile/security"],
  ] },
  { title: "The institute", icon: "globe", links: [
    productLink("premium"), ["About TGPI", "/about"], ["Company & legal", "/legal"], ["Resources", "/resources"],
  ] },
] as const;

const legalLinks = [
  ["Privacy", "/privacy"], ["Terms", "/terms"], ["Cookies", "/cookies"],
  ["Billing", "/billing-terms"], ["Refunds & cancellation", "/refunds"],
] as const;

const atlas = HOME_PRODUCTS.atlas;
const backToTop = {
  en: "Back to top",
  "pt-BR": "Voltar ao topo",
  es: "Volver arriba",
  fr: "Retour en haut",
  de: "Nach oben",
  it: "Torna in alto",
} satisfies Record<Locale, string>;

function FooterGroup({ group, collapsible = false }: {
  group: typeof footerGroups[number];
  collapsible?: boolean;
}) {
  const { t } = useLocale();
  const heading = <>
    <NavigationIcon name={group.icon} />
    <span>{t(group.title)}</span>
  </>;
  const links = <ul>
    {group.links.map(([label, href]) => (
      <li key={href}><NavigationLink href={href} prefetch={false}>{t(label)}</NavigationLink></li>
    ))}
  </ul>;

  return collapsible ? (
    <details>
      <summary className={styles.groupHeading}>{heading}<NavigationIcon name="chevron" className={styles.chevron} /></summary>
      {links}
    </details>
  ) : (
    <div>
      <h2 className={styles.groupHeading}>{heading}</h2>
      {links}
    </div>
  );
}

export default function GlobalFooter() {
  const { locale, t } = useLocale();

  return (
    <footer className={`${styles.footer} ${brandStyles.theme}`} data-tgpi-footer="">
      <div className={styles.container}>
        <div className={styles.atlasPanel}>
          <div className={styles.atlasArt} aria-hidden="true">
            <Image src="/brand/atlas/owl-poster.webp" alt="" fill sizes="(max-width: 480px) 128px, 250px" />
          </div>
          <div className={styles.atlasCopy}>
            <h2><NavigationIcon name="spark" />{t(atlas.name)}</h2>
            <p>{t(atlas.description)}</p>
            <Link href={atlas.href} prefetch={false} className={styles.atlasLink}>
              {t("Ask Atlas")} <NavigationIcon name="arrow" />
            </Link>
          </div>
        </div>

        <div className={styles.utilities}>
          <LauncherButton className={styles.utility} />
          <Link href="/accessibility" prefetch={false} className={styles.utility}>
            <NavigationIcon name="accessibility" />{studyCopy(locale, "center")}
          </Link>
          <InstallGuideButton className={styles.utility} />
        </div>

        <div className={styles.directory}>
          <div className={styles.institute}>
            <Link href="/" aria-label={t("TGPI home")} className={styles.wordmark}>
              <BrandCrest alt="" width={52} height={64} sizes="52px" />
              <span><strong>TGPI</strong><span>{t("The Global Polymath Institute")}</span></span>
            </Link>
            <p>{t("Built in Brazil. Connected to the world.")}</p>
            <div className={styles.preferences}>
              <LanguageSelector native />
              <AppearanceControl variant="compact" />
            </div>
          </div>

          <nav aria-label={t("TGPI footer navigation")} className={styles.directoryNav}>
            <div className={styles.desktopGroups}>
              {footerGroups.map(group => <FooterGroup key={group.title} group={group} />)}
            </div>
            <div className={styles.mobileGroups}>
              {footerGroups.map(group => <FooterGroup key={group.title} group={group} collapsible />)}
            </div>
          </nav>
        </div>

        <div className={styles.support}>
          <a href="mailto:contact@theglobalpolymath.com">{t("Contact TGPI")}</a>
          <a href="https://www.instagram.com/theglobalpolymath/" target="_blank" rel="noopener noreferrer">
            Instagram<span className="sr-only"> {t("(opens in a new tab)")}</span><span aria-hidden="true">↗</span>
          </a>
          <Link href={HOME_PRODUCTS.integrity.href} prefetch={false}>{t(HOME_PRODUCTS.integrity.name)}</Link>
          <a href="#top" className={styles.backToTop}>{backToTop[locale]}<NavigationIcon name="arrow" /></a>
        </div>

        <div className={styles.legal}>
          <div>
            <p>© {new Date().getUTCFullYear()} {t("TGPI — The Global Polymath Institute. All rights reserved.")}</p>
            <p>{t("Educational information supports your research. Confirm requirements with official sources before making decisions.")}</p>
          </div>
          <nav aria-label={t("Legal policies")}>
            {legalLinks.map(([label, href]) => <Link key={href} href={href} prefetch={false}>{t(label)}</Link>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}
