"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireApiUser } from "@/lib/auth/guards";
import { getCourse } from "@/data/courses";
import { submitPortfolio, PortfolioError } from "@/lib/learning/portfolio.server";

export async function submitProject(_previous: { error: string }, form: FormData) {
  const identity = await requireApiUser();
  const course = getCourse(String(form.get("courseId") ?? ""));
  if (!course) redirect("/courses");
  const evidence = Object.fromEntries(course.competencies.map(skill => [skill.id, String(form.get(`evidence:${skill.id}`) ?? "")]));
  let error = "";
  try {
    await submitPortfolio(identity.uid, { courseId: course.id, courseVersion: String(form.get("courseVersion") ?? ""), revision: Number(form.get("revision")), project: String(form.get("project") ?? ""), transfer: String(form.get("transfer") ?? ""), aiDisclosure: String(form.get("aiDisclosure") ?? ""), evidence });
  } catch (cause) { error = cause instanceof PortfolioError ? cause.message : "Secure submission is unavailable. Keep a private copy and retry later."; }
  if (error) return { error };
  revalidatePath(`/courses/${course.id}/project`);
  redirect(`/courses/${course.id}/project?submitted=1`);
}
