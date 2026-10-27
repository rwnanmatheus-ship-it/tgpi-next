"use client";

import { useLocale } from "@/components/localization/LocaleProvider";
import Link from "next/link";
import {
  getNextCapabilityArea,
  TGPI_CAPABILITY_AREAS,
  type CapabilityAreaId,
} from "@/lib/capability-system";

type CapabilitySystemRailProps = {
  active: CapabilityAreaId;
  metric?: {
    detail: string;
    label: string;
    value: string;
  };
  theme?: "dark" | "light";
};

export default function CapabilitySystemRail({
  active,
  metric,
  theme = "light",
}: CapabilitySystemRailProps) {
  const { t } = useLocale();
  const nextArea = getNextCapabilityArea(active);

  return (
    <section
      aria-labelledby={`capability-system-${active}`}
      className="tgpi-capability-system"
      data-theme={theme}
    >
      <div className="tgpi-capability-system__heading">
        <div>
          <p className="tgpi-capability-system__eyebrow">
            {t("TGPI Capability System")}
          </p>
          <h2 id={`capability-system-${active}`}>
            {t("One identity. Four connected capability layers.")}
          </h2>
        </div>
        {metric ? (
          <div className="tgpi-capability-system__metric">
            <dl>
              <dt>{t(metric.label)}</dt>
              <dd>{metric.value}</dd>
            </dl>
            <p>{t(metric.detail)}</p>
          </div>
        ) : (
          <Link
            className="tgpi-capability-system__next"
            href={nextArea.href}
          >
            {t("Next layer · {phase}", { phase: t(nextArea.phase) })}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>

      <nav
        aria-label={t("TGPI capability areas")}
        className="tgpi-capability-system__grid"
      >
        {TGPI_CAPABILITY_AREAS.map((area) => {
          const isActive = area.id === active;

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className="tgpi-capability-system__item"
              data-active={isActive ? "true" : "false"}
              href={area.href}
              key={area.id}
            >
              <span className="tgpi-capability-system__number">
                {area.number}
              </span>
              <span className="tgpi-capability-system__copy">
                <span className="tgpi-capability-system__phase">
                  {t(area.phase)}
                </span>
                <strong>{t(area.label)}</strong>
                <small>{t(area.description)}</small>
              </span>
              <span className="tgpi-capability-system__arrow" aria-hidden="true">
                {isActive ? "●" : "↗"}
              </span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
