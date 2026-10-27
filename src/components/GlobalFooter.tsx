"use client";
import LanguageSelector from "@/components/localization/LanguageSelector";
import { useLocale } from "@/components/localization/LocaleProvider";
import Link from "next/link";
import BrandCrest from "@/components/BrandCrest";

const footerGroups = [
  { title: "Explore & decide", links: [
    ["Countries", "/countries"], ["Compare countries", "/compare"],
    ["Country Fit", "/country-fit"], ["Sources & methodology", "/authority"],
  ] },
  { title: "Learn & prepare", links: [
    ["Learning", "/courses"], ["Documents", "/passport"],
    ["Certificates", "/certificates"], ["Verify a credential", "/verify"],
  ] },
  { title: "Your TGPI", links: [
    ["Workspace", "/dashboard"], ["Global Key", "/global-key"],
    ["Profile & settings", "/profile"], ["Premium", "/premium"],
  ] },
  { title: "The institute", links: [
    ["About TGPI", "/about"], ["Resources", "/resources"],
    ["Community", "/community"], ["Company & legal", "/legal"],
  ] },
] as const;

const legalLinks = [
  ["Privacy", "/privacy"], ["Terms", "/terms"],
  ["Cookies", "/cookies"], ["Billing", "/billing-terms"],
  ["Refunds & cancellation", "/refunds"],
] as const;

const linkStyle = "inline-flex min-h-11 items-center rounded-md py-2 text-sm leading-5 text-[#C8D4E2] transition-colors hover:text-[#F1D796] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1D796]";

export default function GlobalFooter() {
  const { t } = useLocale();
  return (
    <footer style={{ fontFamily: "var(--tgpi-font-sans)" }} className="relative isolate overflow-hidden border-t border-[#C5A059]/30 bg-[#040E19] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(197,160,89,0.09),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(42,100,155,0.13),transparent_55%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#D4B36E,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-24 h-[480px] w-[480px] text-[#CDAE70]/[0.12] sm:right-0 lg:right-16">
        <svg viewBox="0 0 480 480" fill="none" className="h-full w-full">
          <circle cx="240" cy="240" r="190" stroke="currentColor" />
          <circle cx="240" cy="240" r="213" stroke="currentColor" strokeDasharray="1 9" />
          <ellipse cx="240" cy="240" rx="112" ry="190" stroke="currentColor" />
          <ellipse cx="240" cy="240" rx="42" ry="190" stroke="currentColor" />
          <ellipse cx="240" cy="240" rx="190" ry="68" stroke="currentColor" />
          <ellipse cx="240" cy="240" rx="190" ry="137" stroke="currentColor" />
          <path d="M50 240h380M240 50v380" stroke="currentColor" />
          <path d="M80 104l320 272M80 376l320-272" stroke="currentColor" strokeDasharray="3 8" />
          <circle cx="106" cy="106" r="4" fill="#E5C887" />
          <circle cx="374" cy="374" r="4" fill="#E5C887" />
          <circle cx="430" cy="240" r="3" fill="#E5C887" />
        </svg>
      </div>
      <div className="tgpi-container relative py-8 sm:py-10 lg:py-12">
        <div className="mb-8 grid gap-7 border-b border-[#D4B36E]/20 pb-8 sm:mb-10 sm:pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase leading-5 tracking-[0.24em] text-[#E5C887]"><span aria-hidden="true" className="h-px w-8 bg-[#D4B36E]/70" />{t("Knowledge without borders")}</p>
            <p className="font-medium text-[clamp(1.875rem,3.6vw,3.125rem)] leading-[1.16] tracking-[-0.035em] text-[#F5F0E5]">{t("A wider world.")}<br /><span className="bg-[linear-gradient(110deg,#B8914F,#F6E5B8_45%,#C9A35B)] bg-clip-text text-transparent">{t("A more considered life.")}</span></p>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#B7C7D9]">{t("The perspective to choose. The knowledge to prepare. The confidence to move forward.")}</p>
          </div>
          <Link href="/dashboard" className="group inline-flex min-h-12 w-fit items-center gap-5 rounded-full border border-[#D4B36E]/50 bg-[linear-gradient(120deg,rgba(212,179,110,0.17),rgba(212,179,110,0.04))] px-6 py-3 text-sm font-semibold text-[#F1D796] shadow-[inset_0_1px_0_rgba(255,244,211,0.14),0_8px_30px_rgba(0,0,0,0.18)] transition-colors hover:border-[#F1D796] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1D796]">{t("Enter your workspace")}<span aria-hidden="true">↗</span></Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:gap-12">
          <div className="min-w-0">
            <Link href="/" aria-label={t("TGPI home")} className="inline-flex max-w-full items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1D796]">
              <BrandCrest width={1041} height={1274} sizes="66px" className="h-20 w-auto shrink-0 object-contain" />
              <span className="min-w-0">
                <span className="block text-2xl font-semibold tracking-[0.12em] text-white">TGPI</span>
                <span className="mt-1 block text-[11px] font-semibold leading-5 tracking-[0.08em] text-[#E5C887]">The Global Polymath Institute</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#B7C7D9]">{t("An independent institute connecting practical education, decision intelligence and global adaptability.")}</p>
            <div className="mt-4"><LanguageSelector /></div>
          </div>
        <nav aria-label={t("TGPI footer navigation")} className="grid grid-cols-2 gap-x-6 gap-y-7 pb-8 md:grid-cols-4 lg:gap-x-10">
          {footerGroups.map(({ title, links }) => (
            <div key={t(title)} className="min-w-0">
              <h2 style={{ fontFamily: "var(--tgpi-font-sans)", fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.5, letterSpacing: "0.015em" }} className="mb-3 text-[#E5C887]">{t(title)}</h2>
              <ul>
                {links.map(([label, href]) => <li key={href}><Link href={href} prefetch={false} className={linkStyle}>{t(label)}</Link></li>)}
              </ul>
            </div>
          ))}
        </nav>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-[#D4B36E]/15 bg-[linear-gradient(110deg,rgba(212,179,110,0.055),rgba(60,100,150,0.035))] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-sm font-medium leading-6 text-[#DCE5EE]">{t("Built in Brazil. Connected to the world.")}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a href="mailto:contact@theglobalpolymath.com" className={linkStyle}>{t("Contact TGPI")}<span aria-hidden="true" className="ml-2">↗</span></a>
            <a href="https://www.instagram.com/theglobalpolymath/" target="_blank" rel="noopener noreferrer" className={linkStyle}>Instagram<span className="sr-only">{t("(opens in a new tab)")}</span><span aria-hidden="true" className="ml-2">↗</span></a>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="min-w-0 text-xs leading-5 text-[#AABBD0]">
            <p>© {new Date().getFullYear()}{" "}{t("TGPI — The Global Polymath Institute. All rights reserved.")}</p>
            <p className="mt-2 max-w-2xl">{t("Educational information supports your research. Confirm requirements with official sources before making decisions.")}</p>
          </div>
          <nav aria-label={t("Legal policies")} className="flex max-w-full flex-wrap gap-x-5 gap-y-1 lg:max-w-md lg:justify-end">
            {legalLinks.map(([label, href]) => <Link key={href} href={href} prefetch={false} className={`${linkStyle} text-xs`}>{t(label)}</Link>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}
