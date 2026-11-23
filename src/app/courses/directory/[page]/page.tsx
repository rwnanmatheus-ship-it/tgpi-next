import { notFound, redirect } from "next/navigation";
import CourseDirectory, { directoryMetadata } from "@/components/courses/CourseDirectory";
import { publishedDirectory } from "@/lib/seo/course-directory.server";
import { directoryPageCount, parseDirectoryPage } from "@/lib/seo/course-directory";
type Props = { params: Promise<{ page: string }> };
export function generateStaticParams() { return Array.from({length:directoryPageCount(publishedDirectory.length)-1},(_,index)=>({page:String(index+2)})); }
async function getPage(params: Props["params"]) {
  const page = parseDirectoryPage((await params).page,publishedDirectory.length);
  if (!page) notFound();
  if (page===1) redirect("/courses/directory");
  return page;
}
export async function generateMetadata({params}:Props) { return directoryMetadata(await getPage(params)); }
export default async function Page({params}:Props) { return <CourseDirectory page={await getPage(params)} />; }
