"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ActivationProgressProvider, { useActivationProgress } from "@/components/activation/ActivationProgressProvider";
import type { CourseOverview } from "@/types/course-overview";
import styles from "./learning-catalog.module.css";

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
    `${course.title} ${course.desc} ${course.category} ${course.series ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()));
  const activeCourses = courses.filter(course => course.status === "available" && progress.courseProgress[course.id]);
  const resume = [...activeCourses].sort((a, b) => (progress.courseProgress[b.id]?.updatedAt ?? "").localeCompare(progress.courseProgress[a.id]?.updatedAt ?? ""))[0];
  const liveCount = courses.filter(course => course.status === "available").length;
  return <section id="learning-paths" className={styles.catalog} aria-labelledby="learning-paths-title">
    {isAuthenticated && <div className={styles.continue}>
      <div><p className={styles.eyebrow}>Your learning space</p>
        <h2>{isLoading ? "Loading your learning record…" : resume ? "Pick up where you left off." : "Your next chapter starts here."}</h2>
        <p>{resume ? resume.title : "Choose a practical course. Your completed lessons stay connected to your account."}</p>
        {error && <p role="alert">Progress could not load. Open your course to retry. {error}</p>}
      </div>
      <Link className={styles.primary} href={resume?.href ?? "/courses/global-english-2026"}>{resume ? "Open my course →" : "Explore Global English →"}</Link>
    </div>}
    <header className={styles.heading}>
      <div><p className={styles.eyebrow}>The TGPI course library</p><h2 id="learning-paths-title">Learn for the life you want to build.</h2></div>
      <p>Language, country decisions, financial preparation and career readiness. Start with one useful outcome.</p>
    </header>
    <div className={styles.tools}>
      <div className={styles.searchRow}>
        <label className={styles.search}><span>Search courses</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try English, career or budget" /></label>
        <label className={styles.select}><span>Course series</span><select aria-label="Course series" value={series} onChange={event => setSeries(event.target.value)}><option value="all">All series</option>{seriesNames.map(name => <option key={name} value={name}>{name}</option>)}</select></label>
        <label className={styles.select}><span>Availability</span><select aria-label="Availability" value={availability} onChange={event => setAvailability(event.target.value)}><option value="available">Available now ({liveCount})</option><option value="planned">In development</option><option value="all">Full library</option></select></label>
      </div>
      <div className={styles.filters} role="group" aria-label="Filter by learning goal">{goals.map(([value,label]) => <button key={value} type="button" aria-pressed={goal === value} onClick={() => setGoal(value)}>{label}</button>)}</div>
    </div>
    <div className={styles.resultRow}><p role="status">{visible.length} {visible.length === 1 ? "course" : "courses"}{availability === "available" ? " ready to explore" : " found"}</p><Link href="/certificates">My certificates ↗</Link></div>
    {visible.length ? <div className={styles.grid}>{visible.map(course => {
      const record = progress.courseProgress[course.id];
      return <article key={course.id} className={styles.card}>
        <Link href={course.href} className={styles.cover} aria-label={`Explore ${course.title}`}>
          <Image src={course.image} alt={course.imageAlt} fill sizes="(max-width: 639px) 100vw, (max-width: 1100px) 50vw, 33vw" className={styles.image} quality={88} />
          <span className={styles.badge}>{course.status === "available" ? course.id === "global-english-2026" ? "Flagship course" : "New · Short course" : "In development"}</span>
          {course.series && <span className={styles.seriesBadge}>{course.series}<small>Chapter {String(course.seriesOrder).padStart(2, "0")}</small></span>}
          <span className={styles.coverArrow} aria-hidden="true">↗</span>
        </Link>
        <div className={styles.cardBody}>
          <p className={styles.eyebrow}>{course.category}</p>
          <h3><Link href={course.href}>{course.title}</Link></h3>
          <p className={styles.description}>{course.desc}</p>
          <p className={styles.meta}>{course.duration} <span aria-hidden="true">·</span> {course.format}</p>
          <ul className={styles.outcomes}>{course.benefits.slice(0, 2).map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
          <div className={styles.cardFooter}><p>{course.status === "planned" ? "Planned curriculum" : course.id === "global-english-2026" ? "Verified certification pathway" : "Applied practice · No certificate"}</p><Link className={styles.primary} href={course.href}>{course.status === "planned" ? "Request early access" : record ? "Continue learning" : "Explore course"}<span aria-hidden="true"> →</span></Link></div>
        </div>
      </article>;
    })}</div> : <div className={styles.empty}><h3>No courses match these filters.</h3><p>Try a broader subject or another search term.</p><button className={styles.primary} onClick={() => {setGoal("all");setQuery("");setAvailability("available");setSeries("all");}}>Reset filters</button></div>}
    <aside className={styles.connected}><div><p className={styles.eyebrow}>Put learning to work</p><h2>One course. One concrete next step.</h2><p>Compare your destinations, turn your findings into a personal plan and keep your achievements together.</p></div><nav aria-label="Connected learning tools"><Link href="/compare">Compare countries ↗</Link><Link href="/dashboard">My workspace ↗</Link><Link href="/certificates">My achievements ↗</Link></nav></aside>
    <details className={styles.standard}><summary>How TGPI learning works</summary><div><p><strong>Learn through situations.</strong> Each available course includes scenarios, practical tasks and formative checkpoints with feedback.</p><p><strong>Keep your progress.</strong> Sign in to record completed lessons. Practical written outputs are self-reviewed and are not uploaded or graded.</p><p><strong>Understand your credential.</strong> Global English has a separate verified assessment pathway. The new short courses record lesson progress and do not issue professional certificates.</p></div></details>
  </section>;
}
