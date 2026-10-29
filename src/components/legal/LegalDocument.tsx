import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";
import Link from "next/link";
import type { ReactNode } from "react";

const legalNav = [
  { label: "Company", href: "/legal" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Billing", href: "/billing-terms" },
  { label: "Refunds", href: "/refunds" },
  { label: "Cookies", href: "/cookies" },
] as const;

export default async function LegalDocument({
  eyebrow,
  title,
  summary,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  updated: string;
  children: ReactNode;
}) {
  const locale = await getLocale();
  const t = (key: string, values?: Record<string, string | number>) => translate(locale, key, values);
  const timestamp = Date.parse(updated);
  const date = Number.isNaN(timestamp) ? updated : new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(timestamp);
  return (
    <main
      className="bg-[var(--tgpi-canvas)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <article className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)]">
        <header className="border-b border-[var(--tgpi-border)] bg-[linear-gradient(135deg,#06162A_0%,#0B1F3A_68%,#102C4D_100%)] px-7 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[var(--tgpi-gold-light)]">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
            {summary}
          </p>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-white/45">
            {t("Last updated: {date}", { date })}
          </p>
        </header>

        <nav
          className="flex gap-2 overflow-x-auto border-b border-[var(--tgpi-border)] bg-[#FFFDF8] px-5 py-4 sm:px-8"
          aria-label={t("TGPI legal documents")}
        >
          {legalNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-[#D8D2C4] bg-white px-4 py-2 text-xs font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A] hover:text-[#956A13]"
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>

        <div className="px-7 py-10 sm:px-10 lg:px-14 lg:py-14">
          <div className="space-y-9 text-[15px] leading-8 text-[#4D5868] sm:text-base">
            {children}
          </div>

          <aside className="mt-12 rounded-2xl border border-[#D8D2C4] bg-[#F8F5EE] p-5 text-sm leading-7 text-[#596576]">
            <p className="font-extrabold text-[#0B1F3A]">TGPI GLOBAL EDUCATION LTDA</p>
            <p>{t("CNPJ 49.709.438/0001-32 · Campinas, São Paulo, Brazil")}</p>
            <p>
              {t("Official electronic address:")}{" "}
              <a
                href="mailto:corporate@theglobalpolymath.com"
                className="font-bold text-[#956A13] underline-offset-4 hover:underline"
              >
                corporate@theglobalpolymath.com
              </a>
            </p>
            <p>
              {t("Customer and billing support:")}{" "}
              <a
                href="mailto:contact@theglobalpolymath.com"
                className="font-bold text-[#956A13] underline-offset-4 hover:underline"
              >
                contact@theglobalpolymath.com
              </a>
            </p>
          </aside>
        </div>
      </article>
    </main>
  );
}
