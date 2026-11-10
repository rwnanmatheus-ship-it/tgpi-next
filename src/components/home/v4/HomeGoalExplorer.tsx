"use client";

import { useState } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import { HOME_GOALS } from "@/lib/home-journey";
import { HOME_ROUTES } from "@/lib/home-content";
import { setHomeGoal, useHomeGoal } from "./HomeGoalState";
import styles from "./home.module.css";

const destinations = [
  { slug: "portugal", label: "Portugal" },
  { slug: "canada", label: "Canada" },
  { slug: "united-states", label: "United States" },
  { slug: "united-kingdom", label: "United Kingdom" },
  { slug: "germany", label: "Germany" },
  { slug: "spain", label: "Spain" },
] as const;

export default function HomeGoalExplorer() {
  const { t } = useLocale();
  const current = useHomeGoal();
  const [country, setCountry] = useState<string>("portugal");
  return (
    <form action={HOME_ROUTES.fit} method="get" className={styles.goalExplorer} aria-labelledby="how-title">
      <div className={styles.goalControls}>
        <fieldset className={styles.goalOptions}>
          <legend className="sr-only">{t("Choose your goal")}</legend>
          {HOME_GOALS.map((item, index) => (
            <label key={item.id} className={styles.goalOption}>
              <input type="radio" name="goal" value={item.id} checked={current.id === item.id} onChange={() => setHomeGoal(item.id)} />
              <span aria-hidden="true">0{index + 1}</span>
              <strong>{t(item.label)}</strong>
              <span aria-hidden="true">↗</span>
            </label>
          ))}
        </fieldset>
      </div>
      <div className={styles.goalResult}>
        <div aria-live="polite" aria-atomic="true">
          <p className={styles.eyebrow}>{t("Your starting point · {goal}", { goal: t(current.label) })}</p>
          <h3>{t(current.heading)}</h3>
          <p className={styles.goalDescription}>{t(current.copy)}</p>
          <ul className={styles.goalChecks}>
            {current.checks.map(check => <li key={check}><span aria-hidden="true">✓</span>{t(check)}</li>)}
          </ul>
          <p className={styles.goalOutcome}>{t(current.outcome)}</p>
        </div>
        {current.id === "learn" ? (
          <div className={styles.goalLaunch}>
            <a href="#practical-learning" className={styles.primary}>{t("See my suggested courses")} <span aria-hidden="true">↓</span></a>
          </div>
        ) : (
          <div className={styles.goalLaunch}>
            <label htmlFor="home-research-country">
              {t("Start researching")}
              <select id="home-research-country" name="country" value={country} onChange={event => setCountry(event.target.value)}>
                {destinations.map(({ slug, label }) => <option key={slug} value={slug}>{t(label)}</option>)}
              </select>
            </label>
            <button type="submit" className={styles.primary}>{t("Build my research plan")} <span aria-hidden="true">→</span></button>
          </div>
        )}
      </div>
    </form>
  );
}
