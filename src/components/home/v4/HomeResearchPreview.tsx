import Link from "next/link";
import { personalResearchPlan } from "@/lib/intelligence/core";
import styles from "./home.module.css";

// Uses the same planner as CountryFitWorkspace; no invented fit scores or user data.
const tasks = personalResearchPlan({ primaryGoal: "work", budgetRange: "undecided", timeHorizon: "exploring", languages: [], profession: "", priorities: [] }, "Portugal").slice(0, 2);

export default function HomeResearchPreview() {
  return <aside className={styles.researchPreview} aria-label="Example Country Fit research plan">
    <div className={styles.previewTop}><span>Country Fit</span><span className={styles.exampleBadge}>Example plan</span></div>
    <p className={styles.previewTitle}>A move starts with better questions.</p>
    <p className={styles.previewContext}>Goal: work abroad · Exploring Portugal</p>
    <ol>{tasks.map((task, index) => <li key={task.id}><span aria-hidden="true">0{index + 1}</span><Link href={task.href.startsWith("#") ? `/countries/portugal${task.href}` : task.href}>{task.title}<span aria-hidden="true">↗</span></Link></li>)}</ol>
    <Link className={styles.previewLink} href="/country-fit?country=portugal&goal=work">Try this research plan <span aria-hidden="true">→</span></Link>
  </aside>;
}
