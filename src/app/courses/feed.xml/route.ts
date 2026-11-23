import { publishedDirectory } from "@/lib/seo/course-directory.server";
import { courseRss } from "@/lib/seo/course-directory";
export function GET() {
  return new Response(courseRss(publishedDirectory), {headers:{ "Content-Type":"application/rss+xml; charset=utf-8", "Cache-Control":"public, max-age=3600, stale-while-revalidate=86400", "X-Content-Type-Options":"nosniff" }});
}
