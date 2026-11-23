import Link from "next/link";
import type { Locale } from "@/lib/localization/config";
import { translate } from "@/lib/localization/messages";
import { courseDiscoveryCopy } from "@/lib/localization/course-discovery-copy";
import { publishedDirectory } from "@/lib/seo/course-directory.server";
import { directoryOrigin, relatedPublishedCourses, structuredDataJson } from "@/lib/seo/course-directory";
import styles from "./course-directory.module.css";
export default function CourseDiscoveryLinks({currentId,locale}:{currentId?:string;locale:Locale}) {
  const copy=courseDiscoveryCopy(locale),t=(value:string)=>translate(locale,value);
  const current=publishedDirectory.find(course=>course.id===currentId);
  const related=currentId ? relatedPublishedCourses(publishedDirectory,currentId) : [];
  const breadcrumb=current ? {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[
    {"@type":"ListItem",position:1,name:copy.catalogue,item:`${directoryOrigin}/courses`},
    {"@type":"ListItem",position:2,name:t(current.title),item:directoryOrigin+current.href},
  ]} : null;
  return <aside className={styles.related} aria-label={current ? copy.related : copy.continue}>
    {breadcrumb && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:structuredDataJson(breadcrumb)}} />}
    <h2>{current ? copy.related : copy.continue}</h2>
    {related.length>0 && <ul>{related.map(course=><li key={course.id}><Link href={course.href} prefetch={false}>{t(course.title)}</Link></li>)}</ul>}
    <nav><Link href="/courses/directory" prefetch={false}>{copy.all}</Link><a href="/courses/feed.xml" type="application/rss+xml">{copy.feed}</a></nav>
  </aside>;
}
