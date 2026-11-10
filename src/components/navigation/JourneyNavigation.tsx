"use client";

import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationLink from "./NavigationLink";
import { getJourneyStage, isImmersiveLearningRoute, PLATFORM_JOURNEY } from "@/lib/platform-journey";

export default function JourneyNavigation({ pathname }: { pathname: string }) {
  const { t } = useLocale();
  const current = getJourneyStage(pathname);
  // Marketing and focused access pages retain their own editorial composition.
  if (!current || pathname === "/onboarding" || isImmersiveLearningRoute(pathname)) return null;
  return (
    <div className="tgpi-journey-context">
      <div className="tgpi-container">
        <div className="tgpi-journey-heading">
          <NavigationLink href="/profile">{t("Your global journey")}</NavigationLink>
          <span>{t(current.description)}</span>
        </div>
        <nav aria-label={t("Global journey")} className="tgpi-platform-journey">
          <ol>
            {PLATFORM_JOURNEY.map((stage, index) => (
              <li key={stage.id}>
                <NavigationLink href={stage.href} prefetch={false} aria-current={stage.id === current.id ? "location" : undefined}>
                  <span className="tgpi-journey-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span>{t(stage.label)}</span>
                </NavigationLink>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
