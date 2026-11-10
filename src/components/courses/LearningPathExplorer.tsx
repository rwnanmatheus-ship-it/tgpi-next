"use client";
import { useLocale } from "@/components/localization/LocaleProvider";

import Image from "next/image";
import CinematicImage from "@/components/ui/CinematicImage";
import { courseArtworkKeys } from "@/lib/cinematic-art";
import Link from "next/link";
import { useEffect, useState } from "react";
import ContinueLearning from "./ContinueLearning";
import { courseLearningPolicy, credentialLabel } from "@/lib/learning/catalog-policy";
import { parseCatalogFilters, catalogFilterParams, defaultCatalogFilters, type CatalogFilters } from "@/lib/learning/catalog-filters";
import ActivationProgressProvider, { useActivationProgress } from "@/components/activation/ActivationProgressProvider";
import type { CourseOverview } from "@/types/course-overview";
import styles from "./learning-catalog.module.css";
import { LocalizedText } from "@/components/localization/LocaleProvider";


type Props = { courses: CourseOverview[]; initialFilters: CatalogFilters };
const goals = [
  ["all", "All subjects"], ["global-mobility", "Language & mobility"],
  ["decision-intelligence", "Better decisions"], ["global-economics", "Money & opportunity"],
  ["future-of-work", "Career & technology"],
] as const;

export default function LearningPathExplorer(props: Props) {
  return <ActivationProgressProvider><Catalog {...props} /></ActivationProgressProvider>;
}

function Catalog({ courses, initialFilters }: Props) {
  const { t } = useLocale();
  const [filters, setFilters] = useState(initialFilters);
  const { goal, query, series, availability, credential, language } = filters;
  const update = (patch: Partial<CatalogFilters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    const params = catalogFilterParams(next, new URLSearchParams(window.location.search));
    window.history.replaceState(null, '', `${window.location.pathname}${params.size ? `?${params}` : ''}${window.location.hash}`);
  };
  useEffect(() => {
    const read = () => setFilters(parseCatalogFilters(new URLSearchParams(window.location.search)));
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, []);
  const seriesNames = [...new Set(courses.flatMap(course => course.series ? [course.series] : []))];
  const { progress } = useActivationProgress();
  const visible = courses.filter(course =>
    (goal === "all" || course.goal === goal) &&
    (series === "all" || course.series === series) &&
    (availability === "all" || course.status === availability) &&
    (credential === "all" || courseLearningPolicy(course).credentialStatus === credential) &&
    (language === "all" || courseLearningPolicy(course).instructionLanguage === language) &&
    `${course.title} ${course.desc} ${course.category} ${course.series ?? ""} ${t(course.title)} ${t(course.desc)} ${t(course.category)} ${t(course.series ?? "")}`.toLowerCase().includes(query.trim().toLowerCase()));
  const liveCount = courses.filter(course => course.status === "available").length;
  return <section id="learning-paths" className={styles.catalog} aria-labelledby="learning-paths-title">
    <ContinueLearning />
    <h2 id="learning-paths-title" className="sr-only">{t("All courses")}</h2>
    <div className={styles.tools}>
      <div className={styles.searchRow}>
        <label className={styles.search}><span><LocalizedText text={t("Search courses")} /></span><input type="search" value={query} onChange={event => update({ query: event.target.value })} placeholder={t("Try English, career or budget")} /></label>
        <label className={styles.select}><span><LocalizedText text={t("Course series")} /></span><select aria-label={t("Course series")} value={series} onChange={event => update({ series: event.target.value })}><option value="all">{t("All series")}</option>{seriesNames.map(name => <option key={name} value={name}>{t(name)}</option>)}</select></label>
        <label className={styles.select}><span><LocalizedText text={t("Availability")} /></span><select aria-label={t("Availability")} value={availability} onChange={event => update({ availability: event.target.value })}><option value="available">{t("Available now")} ({liveCount})</option><option value="planned">{t("In development")}</option><option value="all">{t("Full library")}</option></select></label>
      </div>
      <div className={styles.filters} role="group" aria-label={t("Filter by learning goal")}>{goals.map(([value,label]) => <button key={value} type="button" aria-pressed={goal === value} onClick={() => update({ goal: value })}>{t(label)}</button>)}</div>
      <div className={styles.policyFilters}>
        <label>{t('Credential pathway')}<select value={credential} onChange={event => update({ credential: event.target.value })}><option value="all">{t('All credential types')}</option><option value="criteria_available">{t('Credential pathway')}</option><option value="none">{t('Practice')}</option></select></label>
        <label>{t('Course language')}<select value={language} onChange={event => update({ language: event.target.value })}><option value="all">{t('All languages')}</option><option value="pt-BR">Português</option><option value="en">English</option></select></label>
      </div>
    </div>
    <div className={styles.resultRow}><p role="status">{t("Course results: {count}", { count: visible.length })}</p><Link href="/certificates"><LocalizedText text="My certificates ↗" /></Link></div>
    {visible.length ? <div className={styles.grid}>{visible.map(course => {
      const record = progress.courseProgress[course.id];
      const policy = courseLearningPolicy(course);
      return <article key={course.id} className={styles.card}>
        <Link href={course.href} className={styles.cover} aria-label={t("Explore {course}", { course: t(course.title) })}>
          {courseArtworkKeys[course.id] ? <CinematicImage asset={courseArtworkKeys[course.id]} alt="" sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1100px) 46vw, 400px" className={styles.image} /> : <Image src={course.image} alt="" fill sizes="(max-width: 639px) 100vw, 33vw" className={styles.image} />}
          <span className={styles.badge}>{course.status === "available" ? policy.publicationStatus === "early_access" ? t("Early access") : policy.kind === "flagship" ? t("Flagship course") : t("New · Short course") : t("In development")}</span>
          {course.series && <span className={styles.seriesBadge}>{t(course.series)}<small>{t("Chapter {number}", { number: String(course.seriesOrder).padStart(2, "0") })}</small></span>}
          <span className={styles.coverArrow} aria-hidden="true">↗</span>
        </Link>
        <div className={styles.cardBody}>
          <p className={styles.eyebrow}><LocalizedText text={course.category} /></p>
          <h3><Link href={course.href}><LocalizedText text={course.title} /></Link></h3>
          <p className={styles.description}><LocalizedText text={course.desc} /></p>
          <p className={styles.language}>{t(policy.instructionLanguage === "pt-BR" ? "Instruction: Portuguese" : "Instruction: English")} · {t("Free with an account")}</p>
          <p className={styles.meta}>{t(course.duration)} <span aria-hidden="true">·</span> <LocalizedText text={course.format} /></p>
          <ul className={styles.outcomes}>{course.benefits.slice(0, 2).map(benefit => <li key={benefit}>{t(benefit)}</li>)}</ul>
          <div className={styles.cardFooter}><p>{t(credentialLabel(policy))}</p><Link className={styles.primary} href={course.href}>{course.status === "planned" ? t("Request early access") : record ? t("Continue learning") : t("Explore course")}<span aria-hidden="true"> →</span></Link></div>
        </div>
      </article>;
    })}</div> : <div className={styles.empty}><h3><LocalizedText text="No courses match these filters." /></h3><p><LocalizedText text="Try a broader subject or another search term." /></p><button className={styles.primary} onClick={() => {update(defaultCatalogFilters);}}><LocalizedText text="Reset filters" /></button></div>}
    <aside className={styles.connected}><div><p className={styles.eyebrow}><LocalizedText text="Put learning to work" /></p><h2><LocalizedText text="One course. One concrete next step." /></h2><p><LocalizedText text="Compare your destinations, turn your findings into a personal plan and keep your achievements together." /></p></div><nav aria-label={t("Connected learning tools")}><Link href="/compare"><LocalizedText text="Compare countries ↗" /></Link><Link href="/dashboard"><LocalizedText text="My workspace ↗" /></Link><Link href="/certificates"><LocalizedText text="My achievements ↗" /></Link></nav></aside>
    <details className={styles.standard}><summary><LocalizedText text="How TGPI learning works" /></summary><div><p><strong><LocalizedText text="Learn through situations." /></strong>{" "}<LocalizedText text="Each available course includes scenarios, practical tasks and formative checkpoints with feedback." /></p><p><strong><LocalizedText text="Keep your progress." /></strong>{" "}<LocalizedText text="Practice courses record checkpoints; professional courses also save activities and project submissions in your account." /></p><p><strong><LocalizedText text="Understand your credential." /></strong>{" "}<LocalizedText text="Professional courses combine practice, a quiz and a project reviewed by a person. See each course for its certification criteria." /></p></div></details>
  </section>;
}
