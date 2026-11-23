import type { CourseOverview } from "../../types/course-overview.ts";
export const directoryPageSize = 40;
export const directoryOrigin = "https://www.theglobalpolymath.com";
export function selectPublishedCourses(candidates: readonly CourseOverview[]): CourseOverview[] {
  const unique = new Map<string, CourseOverview>();
  for (const course of candidates) {
    if (course.id === "directory" || course.status !== "available" || course.href !== `/courses/${course.id}` || !/^[a-z0-9][a-z0-9-]*$/.test(course.id) || (course.learningPolicy && course.learningPolicy.publicationStatus !== "published")) continue;
    if (!unique.has(course.id)) unique.set(course.id, course);
  }
  return [...unique.values()].sort((a,b) => a.title.localeCompare(b.title, "en") || a.id.localeCompare(b.id, "en"));
}
export function directoryHref(page = 1): string { return page === 1 ? "/courses/directory" : `/courses/directory/${page}`; }
export function directoryPageCount(total: number): number { return Math.max(1, Math.ceil(total / directoryPageSize)); }
export function parseDirectoryPage(value: string, total: number): number | undefined {
  if (!/^[1-9]\d{0,5}$/.test(value)) return undefined;
  const page = Number(value);
  return page <= directoryPageCount(total) ? page : undefined;
}
export function pageCourses<T>(courses: readonly T[], page: number): readonly T[] { return courses.slice((page-1)*directoryPageSize, page*directoryPageSize); }
export function relatedPublishedCourses(courses: readonly CourseOverview[], id: string, limit = 4): CourseOverview[] {
  const current = courses.find(course => course.id === id);
  if (!current) return [];
  const group = courses.filter(course => course.goal === current.goal && course.targetLanguage === current.targetLanguage);
  const position = group.findIndex(course => course.id === id);
  return Array.from({length:Math.max(0,Math.min(limit,group.length-1))},(_,index)=>group[(position+index+1)%group.length]);
}
export function courseListSchema(courses: readonly CourseOverview[], page: number, total: number) {
  return { "@context": "https://schema.org", "@type": "ItemList", name: "TGPI Course directory", numberOfItems: total,
    itemListElement: courses.map((course,index) => ({ "@type": "ListItem", position: (page-1)*directoryPageSize+index+1, url: directoryOrigin + course.href, name: course.title })) };
}
export const escapeXml = (value: string): string => value.replace(/[<>&"']/g, char => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]!);
export function courseRss(courses: readonly CourseOverview[]): string {
  const items = courses.map(course => `<item><title>${escapeXml(course.title)}</title><link>${directoryOrigin}${course.href}</link><guid isPermaLink="true">${directoryOrigin}${course.href}</guid><description>${escapeXml(course.desc)}</description><category>${escapeXml(course.category)}</category></item>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>TGPI · Published course catalogue</title><link>${directoryOrigin}/courses/directory</link><description>Published practical learning pathways from The Global Polymath Institute.</description><atom:link href="${directoryOrigin}/courses/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
}

export function catalogVariantNeedsNoindex(params: Record<string, string | string[] | undefined>): boolean {
  const facets = new Set(["q","goal","series","availability","credential","language","access","area","region","sector","target","sort","view"]);
  return Object.keys(params).some(key => facets.has(key));
}
