"use client";

import { useSyncExternalStore } from "react";
import { HOME_GOALS, homeGoal } from "@/lib/home-journey";
import styles from "./home.module.css";
import { LocalizedText } from "@/components/localization/LocaleProvider";


const changeEvent = "tgpi:home-goal";
function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(changeEvent, callback);
  return () => { window.removeEventListener("popstate", callback); window.removeEventListener(changeEvent, callback); };
}
function snapshot() { return homeGoal(new URLSearchParams(window.location.search).get("goal")); }
function serverSnapshot() { return "study" as const; }

export default function HomeGoalExplorer() {
  const goal = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const current = HOME_GOALS.find(item => item.id === goal)!;
  function choose(value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("goal", homeGoal(value));
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event(changeEvent));
  }
  return <form action="/country-fit" method="get" className={styles.goalExplorer} aria-labelledby="goal-explorer-title">
    <div className={styles.goalControls}>
      <p className={styles.eyebrow}><LocalizedText text="Make the first step yours" /></p>
      <h3 id="goal-explorer-title"><LocalizedText text="What brings you here?" /></h3>
      <fieldset className={styles.goalOptions}><legend className="sr-only"><LocalizedText text="Choose your goal" /></legend>
        {HOME_GOALS.map(item => <label key={item.id} className={styles.goalOption}>
          <input type="radio" name="goal" value={item.id} checked={goal === item.id} onChange={() => choose(item.id)} />
          <span><LocalizedText text={item.label} /></span><span aria-hidden="true">↗</span>
        </label>)}
      </fieldset>
      <p className={styles.goalHint}>A starting point, not a commitment. Your choice stays in this page’s URL.</p>
    </div>
    <div className={styles.goalResult}>
      <div aria-live="polite" aria-atomic="true"><p className={styles.goalResultLabel}>Your starting point · <LocalizedText text={current.label} /></p><h3>{current.heading}</h3><p className={styles.goalDescription}>{current.copy}</p><ul>{current.checks.map(check => <li key={check}><span aria-hidden="true">✓</span>{check}</li>)}</ul><p className={styles.goalOutcome}>{current.outcome}</p></div>
      <div className={styles.goalLaunch}><label htmlFor="home-research-country"><LocalizedText text="Start researching" /><select id="home-research-country" name="country" defaultValue="portugal"><option value="portugal">Portugal</option><option value="canada">Canada</option></select></label><button type="submit" className={styles.primary}><LocalizedText text="Build my research plan" />{" "}<span aria-hidden="true">→</span></button></div>
      <p className={styles.goalHint}>Example destinations. Country Fit lets you explore other countries and save a plan after signing in.</p>
    </div>
  </form>;
}
