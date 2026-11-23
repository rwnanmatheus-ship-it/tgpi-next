import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";
import { withSocialMetadata } from "@/lib/localization/social-metadata";
import { courseDiscoveryCopy } from "@/lib/localization/course-discovery-copy";
import { courseLearningPolicy } from "@/lib/learning/catalog-policy";
import { fullyLocalizedAcademyCourses } from "@/lib/localization/academy-coverage";
import { publishedDirectory } from "@/lib/seo/course-directory.server";
import { directoryPageCount, directoryHref, directoryOrigin, pageCourses, courseListSchema, structuredDataJson } from "@/lib/seo/course-directory";
import styles from "./course-directory.module.css";
export async function directoryMetadata(page: number): Promise<Metadata> {
  const locale = await getLocale(), copy = courseDiscoveryCopy(locale);
  return withSocialMetadata({ title: `${copy.directory} · ${copy.page} ${page} | TGPI`, description: copy.description,
    alternates: { canonical: directoryOrigin + directoryHref(page), types: { "application/rss+xml": `${directoryOrigin}/courses/feed.xml` } },
  }, locale);
}
export default async function CourseDirectory({ page }: { page: number }) {
  const locale = await getLocale(), copy = courseDiscoveryCopy(locale), t = (key: string) => translate(locale,key);
  const pages = directoryPageCount(publishedDirectory.length), courses = pageCourses(publishedDirectory,page);
  const schema = { ...courseListSchema(courses.map(course=>({...course,title:t(course.title)})),page,publishedDirectory.length), name:copy.directory };
  const breadcrumb = { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement: [
    { "@type":"ListItem", position:1, name:copy.catalogue, item:`${directoryOrigin}/courses` },
    { "@type":"ListItem", position:2, name:copy.directory, item:`${directoryOrigin}/courses/directory` },
    ...(page > 1 ? [{ "@type":"ListItem", position:3, name:`${copy.page} ${page}`, item:directoryOrigin+directoryHref(page) }] : []),
  ] };
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:structuredDataJson([schema,breadcrumb])}} />
    <nav className={styles.breadcrumb} aria-label={copy.navigation}><Link href="/courses">{copy.catalogue}</Link><span>/</span><Link href="/courses/directory">{copy.directory}</Link></nav>
    <header className={styles.header}><p className={styles.eyebrow}>{"TGPI ACADEMY"}</p><h1>{copy.title}</h1><p>{copy.description}</p><p>{publishedDirectory.length} {copy.courses} · {copy.page} {page} {copy.of} {pages}</p><nav className={styles.links}><Link href="/courses">{copy.interactive}</Link><a href="/courses/feed.xml" type="application/rss+xml">{copy.feed}</a></nav></header>
    <p className={styles.intro}>{copy.intro}</p>
    <div className={styles.grid}>{courses.map(course => {
      const policy = courseLearningPolicy(course);
      const language = policy.instructionLanguage === "pt-BR" && !fullyLocalizedAcademyCourses.has(course.id) ? "pt-BR" : locale;
      return <article key={course.id} className={styles.card}><p className={styles.category}>{t(course.category)}</p><h2 lang={language}><Link href={course.href} prefetch={false}>{t(course.title)}</Link></h2><p lang={language}>{t(course.desc)}</p><p className={styles.meta}>{copy.workload}: {course.duration}</p><Link className={styles.explore} href={course.href} prefetch={false}>{copy.explore}</Link></article>;
    })}</div>
    <nav className={styles.pagination} aria-label={copy.navigation}>
      {page > 1 && <Link href={directoryHref(page-1)} prefetch={false} rel="prev">{copy.previous}</Link>}
      <span aria-current="page">{copy.page} {page} {copy.of} {pages}</span>
      {page < pages && <Link href={directoryHref(page+1)} prefetch={false} rel="next">{copy.next}</Link>}
    </nav><nav className={styles.numbers} aria-label={copy.directory}>{Array.from({length:pages},(_,index)=>index+1).map(number => <Link key={number} href={directoryHref(number)} prefetch={false} aria-current={number===page?"page":undefined}>{number}</Link>)}</nav>
    <p className={styles.note}>{copy.credentialNote}</p>
  </main>;
}
