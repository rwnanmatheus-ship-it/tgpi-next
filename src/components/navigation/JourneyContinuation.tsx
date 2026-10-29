"use client";

import Link from "next/link";
import { getJourneyStage, isImmersiveLearningRoute, PLATFORM_JOURNEY } from "@/lib/platform-journey";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";


export default function JourneyContinuation({ pathname }: { pathname: string }) {
  const { t } = useLocale();
  const current = getJourneyStage(pathname);
  if (!current || isImmersiveLearningRoute(pathname) || pathname === "/onboarding") return null;
  const index = PLATFORM_JOURNEY.findIndex(stage => stage.id === current.id);
  const next = PLATFORM_JOURNEY[(index + 1) % PLATFORM_JOURNEY.length];
  return (
    <nav aria-label={t("Continue your global journey")} className="tgpi-continuation">
      <div className="tgpi-container tgpi-continuation-inner">
        <div><p className="tgpi-area-eyebrow">{t("Connected by TGPI")}</p><p className="tgpi-continuation-title">{t(next.description)}.</p><p className="tgpi-continuation-copy">{t("Explore another part of your journey whenever you are ready.")}</p></div>
        <div className="tgpi-area-actions"><Link className="tgpi-area-primary" href={next.href}>{t(next.label)}<span aria-hidden="true">→</span></Link>{next.href !== "/profile" ? <Link className="tgpi-area-secondary" href="/profile"><LocalizedText text="My workspace" /></Link> : null}</div>
      </div>
    </nav>
  );
}
