"use client";

import Link from "next/link";
import BrandCrest from "@/components/BrandCrest";
import ProductSeal from "@/components/brand/ProductSeal";
import brandStyles from "@/components/brand/showcase-brand.module.css";
import NavigationLink from "@/components/navigation/NavigationLink";
import LanguageSelector from "@/components/localization/LanguageSelector";
import { useLocale } from "@/components/localization/LocaleProvider";
import { HOME_PRODUCTS, type HomeProductId } from "@/lib/home-showcase";
import styles from "./global-footer.module.css";
import { studyCopy } from "@/lib/localization/study-accessibility";

function productLink(id: HomeProductId) {
  const { name, href } = HOME_PRODUCTS[id];
  return [name, href] as const;
}

const footerGroups = [
  { title: "Explore & decide", links: [
    productLink("countries"), productLink("fit"), productLink("compare"), productLink("plan"), productLink("evidence"),
  ] },
  { title: "Learn & prepare", links: [
    productLink("learning"), productLink("certificates"), productLink("documents"), ["Verify a credential", "/verify"], ["Guides", "/guides"],
  ] },
  { title: "Your TGPI", links: [
    productLink("atlas"), productLink("integrity"), productLink("global-id"), productLink("workspace"),
    productLink("community"), ["Profile & settings", "/profile/security"],
  ] },
  { title: "The institute", links: [
    productLink("premium"), ["About TGPI", "/about"], ["Resources", "/resources"], ["Company & legal", "/legal"],
  ] },
] as const;

const legalLinks = [
  ["Privacy", "/privacy"], ["Terms", "/terms"], ["Cookies", "/cookies"],
  ["Accessibility", "/accessibility"], ["Billing", "/billing-terms"], ["Refunds & cancellation", "/refunds"],
] as const;

export default function GlobalFooter() {
  const { locale, t } = useLocale();
  return (
    <footer className={`${styles.footer} ${brandStyles.theme}`}>
      <div className={styles.container}>
        <div className={styles.invitation}>
          <div className={styles.orbits} aria-hidden="true"><span /><span /><span /></div>
          <div className={styles.invitationCopy}>
            <p className={styles.eyebrow}>{t("Knowledge without borders")}</p>
            <p className={styles.display}>{t("Your next move starts here.")}</p>
            <p>{t("The perspective to choose. The knowledge to prepare. The confidence to move forward.")}</p>
          </div>
          <div className={styles.invitationActions}>
            <Link href="/#product-demo" prefetch={false} className={styles.collectionButton}>
              {t("Explore TGPI products")} <span aria-hidden="true">↗</span>
            </Link>
            <Link href={HOME_PRODUCTS.premium.href} prefetch={false} className={styles.premiumButton}>
              <ProductSeal product="premium" />{t("View Premium membership")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className={styles.directory}>
          <div className={styles.institute}>
            <Link href="/" aria-label={t("TGPI home")} className={styles.wordmark}>
              <BrandCrest alt="" width={64} height={78} sizes="64px" />
              <span><strong>TGPI</strong><span>{t("The Global Polymath Institute")}</span></span>
            </Link>
            <p>{t("An independent institute connecting practical education, decision intelligence and global adaptability.")}</p>
            <LanguageSelector />
          </div>
          <nav aria-label={t("TGPI footer navigation")} className={styles.groups}>
            {footerGroups.map(({ title, links }) => (
              <div key={title}>
                <h2>{t(title)}</h2>
                <ul>
                  {links.map(([label, href]) => (
                    <li key={href}><NavigationLink href={href} prefetch={false}>{t(label)}</NavigationLink></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.contact}>
          <p>{t("Built in Brazil. Connected to the world.")}</p>
          <div>
            <a href="mailto:contact@theglobalpolymath.com">{t("Contact TGPI")} <span aria-hidden="true">↗</span></a>
            <a href="https://www.instagram.com/theglobalpolymath/" target="_blank" rel="noopener noreferrer">
              Instagram<span className="sr-only"> {t("(opens in a new tab)")}</span> <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className={styles.legal}>
          <div>
            <p>© {new Date().getFullYear()} {t("TGPI — The Global Polymath Institute. All rights reserved.")}</p>
            <p>{t("Educational information supports your research. Confirm requirements with official sources before making decisions.")}</p>
          </div>
          <nav aria-label={t("Legal policies")}>
            {legalLinks.map(([label, href]) => <Link key={href} href={href} prefetch={false}>{href === "/accessibility" ? studyCopy(locale, "center") : t(label)}</Link>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}
