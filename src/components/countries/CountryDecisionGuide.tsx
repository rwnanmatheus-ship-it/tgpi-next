"use client";

import Link from "next/link";
import { useLocale } from "@/components/localization/LocaleProvider";
const topics = [
  { title: "Entry & residence", detail: "Check nationality, permitted activities, duration, dependants and application deadlines before committing money.", href: "#research-dossier" },
  { title: "Housing & arrival", detail: "Compare neighbourhoods, deposits, contract terms, transport and temporary accommodation. Build your budget from dated local quotes.", href: "#research-workbench" },
  { title: "Work & study", detail: "Verify work rights, qualification recognition, course accreditation and language requirements with the responsible institution.", href: "#research-dossier" },
  { title: "Health & insurance", detail: "Confirm who can access public care, waiting periods, required coverage and the cost of insurance for your circumstances.", href: "#research-workbench" },
  { title: "Tax & remote work", detail: "Check tax residence, employer restrictions, social contributions and whether your intended remote activity is permitted.", href: "#research-workbench" },
  { title: "Daily life & resilience", detail: "Research local language, accessibility, neighbourhood safety, emergency contacts and a fallback budget before choosing a city.", href: "#documents-to-verify" },
] as const;
export default function CountryDecisionGuide({ country }: { country: string }) {
  const { t } = useLocale();
  return <section className="ig-section country-decision-guide" id="decision-guide"><div className="ig-spread"><div><p className="ig-eyebrow">{t("Beyond the averages")}</p><h2>{t("Six questions before your next move.")}</h2></div><Link href={`/country-fit?country=${country}`} className="ig-link">{t("Adjust my priorities →")}</Link></div><p className="ig-small">{t("A practical research agenda for this destination. These are questions to resolve, not country-specific legal conclusions.")}</p><div className="country-question-grid">{topics.map((topic, i) => <details key={topic.title}><summary><span>{String(i + 1).padStart(2, "0")}</span>{t(topic.title)}<span aria-hidden="true">+</span></summary><p>{t(topic.detail)}</p><a className="ig-link" href={topic.href}>{t("Continue this research")} →</a></details>)}</div></section>;
}
