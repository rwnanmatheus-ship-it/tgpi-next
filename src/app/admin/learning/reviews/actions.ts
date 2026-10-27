"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guards";
import { tryPublishNotification } from "@/lib/notifications/store.server";
import { getCourse } from "@/data/courses";
import { reviewPortfolio, PortfolioError } from "@/lib/learning/portfolio.server";
export async function assessProject(form: FormData) {
  const admin = await requireAdmin();
  const course = getCourse(String(form.get("courseId") ?? "")); if (!course) redirect("/admin/learning/reviews");
  let error = "";
  try {
    if (form.get("attestation") !== "confirmed") throw new PortfolioError("Confirm that you inspected all evidence against the course rubric.");
    const scores = Object.fromEntries(course.competencies.map(skill => [skill.id, form.get(`score:${skill.id}`) === "" ? NaN : Number(form.get(`score:${skill.id}`))]));
    const uid = String(form.get("uid") ?? "");
    const result = await reviewPortfolio(admin.userId, uid, course.id, { revision: Number(form.get("revision")), scores, feedback: String(form.get("feedback") ?? "") });
    await tryPublishNotification(uid, { key: `project-review:${course.id}:${result.revision}`, category: "learning", title: result.state === "approved" ? "Your course project was approved" : "Your course project has feedback", body: "Open your private project page to read the competency assessment and next steps.", href: `/courses/${course.id}/project`, actionLabel: "View project review", important: true });
  } catch (cause) { error = cause instanceof PortfolioError ? cause.message : "Review storage is unavailable. Reload before retrying."; }
  revalidatePath("/admin/learning/reviews"); revalidatePath(`/courses/${course.id}/project`);
  redirect(`/admin/learning/reviews${error ? `?error=${encodeURIComponent(error)}` : "?saved=1"}`);
}
