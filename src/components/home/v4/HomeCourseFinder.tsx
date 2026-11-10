"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/localization/LocaleProvider";
import type { HomeCourseGroup, HomeCourseId } from "@/lib/home-content";
import { useHomeGoal } from "./HomeGoalState";
import styles from "./home.module.css";

export type HomeCourse = {
  id: HomeCourseId;
  group: HomeCourseGroup;
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  description: string;
  duration: string;
  series?: string;
  certificate: boolean;
};

const filters = [
  { id: "recommended", label: "For your goal" },
  { id: "all", label: "All featured courses" },
  { id: "language", label: "Language" },
  { id: "mobility", label: "Global mobility" },
  { id: "career", label: "Career & technology" },
] as const;
type Filter = typeof filters[number]["id"];

export default function HomeCourseFinder({ courses }: { courses: readonly HomeCourse[] }) {
  const { t } = useLocale();
  const goal = useHomeGoal();
  const [filter, setFilter] = useState<Filter>("recommended");
  const visible = filter === "recommended"
    ? goal.courses.flatMap(id => courses.filter(course => course.id === id))
    : courses.filter(course => filter === "all" || course.group === filter);

  return (
    <div>
      <div className={styles.filters} role="group" aria-label={t("Find your learning path")}>
        {filters.map(item => (
          <button type="button" key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
            {t(item.label)}
          </button>
        ))}
      </div>
      <p className={styles.resultCount} role="status">
        {t("{count} learning paths shown", { count: visible.length })}
        {filter === "recommended" && <span> · {t(goal.label)}</span>}
      </p>
      <div className={styles.courseGrid}>
        {visible.map(course => (
          <article className={styles.course} key={course.id} data-home-course={course.id}>
            <div className={styles.courseImage}>
              <Image src={course.image} alt={t(course.imageAlt)} fill sizes="(max-width: 620px) 91vw, (max-width: 980px) 45vw, 390px" />
            </div>
            <div className={styles.courseCopy}>
              <p className={styles.courseMeta}>{t(course.series ?? "Applied learning")} <span>· {t(course.duration)}</span></p>
              <h3><Link href={course.href} prefetch={false}>{t(course.title)}</Link></h3>
              <p>{t(course.description)}</p>
              {course.certificate && <span className={styles.courseCertificate}>{t("Certification pathway")}</span>}
              <Link href={course.href} prefetch={false} className={styles.textLink}>{t("Explore this course")} <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
