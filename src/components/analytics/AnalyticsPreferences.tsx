"use client";
import { useLocale } from "@/components/localization/LocaleProvider";
import { useSyncExternalStore } from "react";
import { FUNNEL_CONSENT_COOKIE, hasFunnelConsent } from "@/lib/funnel";
const planningDisclosure = {
  en: "Planning counts include viewed budget simulations, new cloud scenarios and scenarios saved again after at least 24 hours. We also count requests to download decision briefs and study calendars. Amounts, planning dates and destinations are excluded.",
  "pt-BR": "No planejamento, contamos as simulações de orçamento visualizadas, os novos cenários salvos na nuvem e os cenários salvos novamente após pelo menos 24 horas. Também contamos pedidos de download de relatórios de decisão e agendas de estudo. Valores, datas do plano e destinos ficam de fora.",
  es: "En planificación contamos las simulaciones de presupuesto vistas, los nuevos escenarios guardados en la nube y los escenarios guardados de nuevo tras al menos 24 horas. También contamos las solicitudes de descarga de informes de decisión y calendarios de estudio. Se excluyen importes, fechas del plan y destinos.",
  fr: "Pour la planification, nous comptons les simulations de budget consultées, les nouveaux scénarios enregistrés en ligne et les scénarios enregistrés de nouveau après au moins 24 heures. Nous comptons également les demandes de téléchargement des bilans de décision et des calendriers d’étude. Les montants, dates du projet et destinations sont exclus.",
  de: "Bei der Planung zählen wir angesehene Budgetsimulationen, neu in der Cloud gespeicherte Szenarien und Szenarien, die nach mindestens 24 Stunden erneut gespeichert werden. Auch Downloads von Entscheidungshilfen und Lernkalendern werden als Anfragen gezählt. Beträge, Reisedaten und Ziele werden nicht erfasst.",
  it: "Per la pianificazione contiamo le simulazioni di budget visualizzate, i nuovi scenari salvati nel cloud e gli scenari salvati di nuovo dopo almeno 24 ore. Contiamo anche le richieste di download dei rapporti decisionali e dei calendari di studio. Importi, date del piano e destinazioni sono esclusi.",
};
const subscribe = (callback: () => void) => { window.addEventListener("tgpi-consent-change", callback); return () => window.removeEventListener("tgpi-consent-change", callback); };
export default function AnalyticsPreferences() {
  const { t, locale } = useLocale();
  const consent = useSyncExternalStore(subscribe, () => hasFunnelConsent(document.cookie), () => false);
  function setConsent(granted: boolean) {
    document.cookie = `${FUNNEL_CONSENT_COOKIE}=${granted ? "granted" : "denied"}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    window.dispatchEvent(new Event("tgpi-consent-change"));
  }
  return <section className="rounded-xl border border-[var(--tgpi-border)] bg-white p-6" aria-labelledby="analytics-choice"><h2 id="analytics-choice" className="text-2xl">{t("Optional usage measurement")}</h2><p className="mt-3">{t("You can allow basic event counts for Home actions, registration and membership. Event logs exclude your identity, research answers and payment details. This is off by default. Global Privacy Control is respected.")}</p><p className="mt-3">{planningDisclosure[locale]}</p><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => setConsent(true)} aria-pressed={consent} className="min-h-11 rounded-lg bg-[var(--tgpi-navy)] px-5 py-3 text-sm font-bold text-white">{t("Allow optional measurement")}</button><button type="button" onClick={() => setConsent(false)} aria-pressed={!consent} className="min-h-11 rounded-lg border border-[#9A8F7A] px-5 py-3 text-sm font-bold">{t("Keep measurement off")}</button></div><p className="mt-3 text-sm" role="status">{t("Your preference: {status}. You can change it here at any time. Changes apply to future browser events; previously recorded aggregate counts cannot identify you.", { status: t(consent ? "allowed (subject to Global Privacy Control)" : "off") })}</p></section>;
}
