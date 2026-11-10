"use client";

import { useState } from "react";
import Link from "next/link";
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { useLocale } from "@/components/localization/LocaleProvider";
import styles from "./home.module.css";

type HomeCourse = { id: string; title: string; href: string; image: string; imageAlt: string; description: string; duration: string; group: string; certificate: boolean };
const filters = [{ id: "all", label: "Featured paths" }, { id: "language", label: "Language" }, { id: "mobility", label: "Global mobility" }, { id: "career", label: "Career & technology" }] as const;
type Filter = typeof filters[number]["id"];

export default function HomeCourseFinder({ courses }: { courses: readonly HomeCourse[] }) {
  const { t } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? courses.slice(0, 3) : courses.filter(course => course.group === filter);
  return <div>
    <div className={styles.courseFilters} role="group" aria-label={t("Find your learning path")}>{filters.map(item => <button type="button" key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{t(item.label)}</button>)}</div>
    <p className="sr-only" role="status">{t("{count} learning paths shown", { count: visible.length })}</p>
    <div className={styles.courseGrid}>{visible.map(course => <article className={styles.course} key={course.id}>
      <Link href={course.href} className={styles.courseImage} aria-label={t(course.title)}><LocalizedElement as="img" src={course.image} alt={course.imageAlt} width={1600} height={900} loading="lazy" decoding="async" />{course.certificate && <span className={styles.courseCertificate}>{t("Certification pathway")}</span>}</Link>
      <div className={styles.courseCopy}><p className={styles.courseMeta}>{t(course.duration)} · {t("Applied learning")}</p><h3><Link href={course.href}>{t(course.title)}</Link></h3><p>{t(course.description)}</p><Link href={course.href} className={styles.textLink}>{t("Explore this course")} <span aria-hidden="true">↗</span></Link></div>
    </article>)}</div>
  </div>;
}
