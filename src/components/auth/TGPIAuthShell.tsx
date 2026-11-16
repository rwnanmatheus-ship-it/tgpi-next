import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandCrest from "@/components/BrandCrest";
import LanguageSelector from "@/components/localization/LanguageSelector";
import { registrationReturnTo } from "@/lib/auth/return-to";
import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";
import styles from "./auth.module.css";

type TGPIAuthShellProps = {
  children: ReactNode;
  mode: "sign-in" | "sign-up" | "welcome";
  returnTo: string;
};

const accessRoutes = [
  { path: "/sign-in", mode: "sign-in", title: "Sign in" },
  { path: "/sign-up", mode: "sign-up", title: "Create account" },
] as const;

const pathways = [
  { kind: "globe", title: "Country intelligence" },
  { kind: "book", title: "Practical education" },
  { kind: "plan", title: "Your personal plan" },
] as const;

function PathwayIcon({ kind }: { kind: (typeof pathways)[number]["kind"] }) {
  const paths = {
    globe: "M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0Zm10-10c5 5 5 15 0 20-5-5-5-15 0-20ZM2 12h20",
    book: "M12 5v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v14c-4-1-6 0-9 2-3-2-5-3-9-2V4Z",
    plan: "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm1 6 1 1 2-2m2 1h3m-8 6 1 1 2-2m2 1h3",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[kind]} />
    </svg>
  );
}

export default async function TGPIAuthShell({ children, mode, returnTo }: TGPIAuthShellProps) {
  const locale = await getLocale();
  const t = (text: string) => translate(locale, text);

  return (
    <main className={styles.page} data-access-mode={mode}>
      <div className={styles.shell}>
        <section className={styles.story} aria-label={t("Global education and decision intelligence")}>
          <Image
            src="/images/auth/global-observatory.webp"
            alt=""
            fill
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 1280px) 590px, (min-width: 840px) 48vw, (min-width: 620px) 560px, 100vw"
            className={styles.photo}
          />
          <Link href="/" className={styles.brand} aria-label={t("TGPI home")}>
            <span className={styles.crest}><BrandCrest fill sizes="40px" className="object-contain" /></span>
            <span><strong>TGPI</strong><small>The Global Polymath Institute</small></span>
          </Link>
          <div className={styles.storyCopy}>
            <p>{t("Education for a global life")}</p>
            <h2>{t("Your world.")}<br />{t("A clearer direction.")}</h2>
            <ul className={styles.pathways}>
              {pathways.map(({ kind, title }) => (
                <li key={kind}><PathwayIcon kind={kind} /><span>{t(title)}</span></li>
              ))}
            </ul>
          </div>
        </section>
        <section className={styles.panel} aria-label={t("Account access")}>
          <div className={styles.formWrap}>
            <div className={styles.panelTop}>
              <Link href="/" className={styles.back}>{t("← Home")}</Link>
              <LanguageSelector compact />
            </div>
            {mode === "welcome" ? (
              <ol className={styles.steps} aria-label={t("Registration steps")}>
                <li><span>1</span>{t("Secure access")}</li>
                <li aria-current="step"><span>2</span>{t("Your profile")}</li>
              </ol>
            ) : (
              <nav className={styles.accessNav} aria-label={t("Account access")}>
                {accessRoutes.map(route => (
                  <Link
                    key={route.mode}
                    href={{ pathname: route.path, query: { next: route.mode === "sign-up" ? registrationReturnTo(returnTo) : returnTo } }}
                    prefetch={false}
                    aria-current={mode === route.mode ? "page" : undefined}
                  >
                    {t(route.title)}
                  </Link>
                ))}
              </nav>
            )}
            <div className={styles.authWidget}>{children}</div>
            <nav className={styles.legal} aria-label={t("Account help and policies")}>
              <Link href="/privacy">{t("Privacy")}</Link>
              <Link href="/terms">{t("Terms")}</Link>
              <a href="mailto:contact@theglobalpolymath.com">{t("Need help?")}</a>
            </nav>
          </div>
        </section>
      </div>
    </main>
  );
}
