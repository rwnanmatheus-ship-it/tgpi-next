"use client";
import { useLocale } from "@/components/localization/LocaleProvider";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ActivationProgressProvider, { useActivationProgress } from "@/components/activation/ActivationProgressProvider";
import type { CourseOverview } from "@/types/course-overview";
import styles from "./learning-catalog.module.css";
import { LocalizedText } from "@/components/localization/LocaleProvider";


type Props = { courses: CourseOverview[] };
const goals = [
  ["all", "All subjects"], ["global-mobility", "Language & mobility"],
  ["decision-intelligence", "Better decisions"], ["global-economics", "Money & opportunity"],
  ["future-of-work", "Career & technology"],
] as const;

export default function LearningPathExplorer(props: Props) {
  return <ActivationProgressProvider><Catalog {...props} /></ActivationProgressProvider>;
}

function Catalog({ courses }: Props) {
  const { t } = useLocale();
  const [goal, setGoal] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState("all");
  const seriesNames = [...new Set(courses.flatMap(course => course.series ? [course.series] : []))];
  const [availability, setAvailability] = useState("available");
  const { progress, error, isAuthenticated, isLoading } = useActivationProgress();
  const visible = courses.filter(course =>
    (goal === "all" || course.goal === goal) &&
    (series === "all" || course.series === series) &&
    (availability === "all" || course.status === availability) &&
    `${course.title} ${course.desc} ${course.category} ${course.series ?? ""} ${t(course.title)} ${t(course.desc)} ${t(course.category)} ${t(course.series ?? "")}`.toLowerCase().includes(query.trim().toLowerCase()));
  const activeCourses = courses.filter(course => course.status === "available" && progress.courseProgress[course.id]);
  const resume = [...activeCourses].sort((a, b) => (progress.courseProgress[b.id]?.updatedAt ?? "").localeCompare(progress.courseProgress[a.id]?.updatedAt ?? ""))[0];
  const liveCount = courses.filter(course => course.status === "available").length;
  return <section id="learning-paths" className={styles.catalog} aria-labelledby="learning-paths-title">
    {isAuthenticated && <div className={styles.continue}>
      <div><p className={styles.eyebrow}><LocalizedText text="Your learning space" /></p>
        <h2>{isLoading ? t("Loading your learning record…") : resume ? t("Pick up where you left off.") : t("Your next chapter starts here.")}</h2>
        <p>{resume ? t(resume.title) : t("Choose a practical course. Your completed lessons stay connected to your account.")}</p>
        {error && <p role="alert">{t("Progress could not load. Open your course to retry.")}</p>}
      </div>
      <Link className={styles.primary} href={resume?.href ?? "/courses/global-english-2026"}>{resume ? t("Open my course →") : t("Explore Global English →")}</Link>
    </div>}
    <header className={styles.heading}>
      <div><p className={styles.eyebrow}><LocalizedText text="The TGPI course library" /></p><h2 id="learning-paths-title"><LocalizedText text="Learn for the life you want to build." /></h2></div>
      <p><LocalizedText text="Language, country decisions, financial preparation and career readiness. Start with one useful outcome." /></p>
    </header>
    <div className={styles.tools}>
      <div className={styles.searchRow}>
        <label className={styles.search}><span><LocalizedText text={t("Search courses")} /></span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("Try English, career or budget")} /></label>
        <label className={styles.select}><span><LocalizedText text={t("Course series")} /></span><select aria-label={t("Course series")} value={series} onChange={event => setSeries(event.target.value)}><option value="all">{t("All series")}</option>{seriesNames.map(name => <option key={name} value={name}>{t(name)}</option>)}</select></label>
        <label className={styles.select}><span><LocalizedText text={t("Availability")} /></span><select aria-label={t("Availability")} value={availability} onChange={event => setAvailability(event.target.value)}><option value="available">{t("Available now")} ({liveCount})</option><option value="planned">{t("In development")}</option><option value="all">{t("Full library")}</option></select></label>
      </div>
      <div className={styles.filters} role="group" aria-label={t("Filter by learning goal")}>{goals.map(([value,label]) => <button key={value} type="button" aria-pressed={goal === value} onClick={() => setGoal(value)}>{t(label)}</button>)}</div>
    </div>
    <div className={styles.resultRow}><p role="status">{t("Course results: {count}", { count: visible.length })}</p><Link href="/certificates"><LocalizedText text="My certificates ↗" /></Link></div>
    {visible.length ? <div className={styles.grid}>{visible.map(course => {
      const record = progress.courseProgress[course.id];
      return <article key={course.id} className={styles.card}>
        <Link href={course.href} className={styles.cover} aria-label={t("Explore {course}", { course: t(course.title) })}>
          <Image src={course.image} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1100px) 50vw, 33vw" className={styles.image} quality={88} />
          <span className={styles.badge}>{course.status === "available" ? course.id === "global-english-2026" ? t("Flagship course") : t("New · Short course") : t("In development")}</span>
          {course.series && <span className={styles.seriesBadge}>{t(course.series)}<small>{t("Chapter {number}", { number: String(course.seriesOrder).padStart(2, "0") })}</small></span>}
          <span className={styles.coverArrow} aria-hidden="true">↗</span>
        </Link>
        <div className={styles.cardBody}>
          <p className={styles.eyebrow}><LocalizedText text={course.category} /></p>
          <h3><Link href={course.href}><LocalizedText text={course.title} /></Link></h3>
          <p className={styles.description}><LocalizedText text={course.desc} /></p>
          <p className={styles.meta}>{t(course.duration)} <span aria-hidden="true">·</span> <LocalizedText text={course.format} /></p>
          <ul className={styles.outcomes}>{course.benefits.slice(0, 2).map(benefit => <li key={benefit}>{t(benefit)}</li>)}</ul>
          <div className={styles.cardFooter}><p>{course.status === "planned" ? t("Planned curriculum") : course.id === "global-english-2026" ? t("Verified certification pathway") : t("Applied practice · No certificate")}</p><Link className={styles.primary} href={course.href}>{course.status === "planned" ? t("Request early access") : record ? t("Continue learning") : t("Explore course")}<span aria-hidden="true"> →</span></Link></div>
        </div>
      </article>;
    })}</div> : <div className={styles.empty}><h3><LocalizedText text="No courses match these filters." /></h3><p><LocalizedText text="Try a broader subject or another search term." /></p><button className={styles.primary} onClick={() => {setGoal("all");setQuery("");setAvailability("available");setSeries("all");}}><LocalizedText text="Reset filters" /></button></div>}
    <aside className={styles.connected}><div><p className={styles.eyebrow}><LocalizedText text="Put learning to work" /></p><h2><LocalizedText text="One course. One concrete next step." /></h2><p><LocalizedText text="Compare your destinations, turn your findings into a personal plan and keep your achievements together." /></p></div><nav aria-label={t("Connected learning tools")}><Link href="/compare"><LocalizedText text="Compare countries ↗" /></Link><Link href="/dashboard"><LocalizedText text="My workspace ↗" /></Link><Link href="/certificates"><LocalizedText text="My achievements ↗" /></Link></nav></aside>
    <details className={styles.standard}><summary><LocalizedText text="How TGPI learning works" /></summary><div><p><strong><LocalizedText text="Learn through situations." /></strong>{" "}<LocalizedText text="Each available course includes scenarios, practical tasks and formative checkpoints with feedback." /></p><p><strong><LocalizedText text="Keep your progress." /></strong>{" "}<LocalizedText text="Sign in to record completed lessons. Practical written outputs are self-reviewed and are not uploaded or graded." /></p><p><strong><LocalizedText text="Understand your credential." /></strong>{" "}<LocalizedText text="Global English has a separate verified assessment pathway. The new short courses record lesson progress and do not issue professional certificates." /></p></div></details>
  </section>;
}
