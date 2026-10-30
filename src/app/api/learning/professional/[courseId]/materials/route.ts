import { requireApiUser } from "@/lib/auth/guards";
import { getProfessionalRecord } from "@/lib/learning/professional-records.server";
import { getProfessionalCourse } from "@/lib/learning/professional-runtime";
import { professionalError, professionalPrivateHeaders } from "@/lib/learning/professional-http.server";
export async function GET(_request: Request, context: { params: Promise<{ courseId: string }> }) {
  try {
    const identity = await requireApiUser(), { courseId } = await context.params;
    await getProfessionalRecord(identity.uid, courseId);
    const course = getProfessionalCourse(courseId)!;
    const parts = [`# ${course.title}`, `TGPI · versão ${course.version} · instrução em português`, "## Resultados", ...course.outcomes.map(item => `- ${item}`), "## Diagnóstico", course.diagnostic];
    for (const module of course.modules) for (const lesson of module.lessons) parts.push(`## ${lesson.title}`, `Objetivo: ${lesson.objective}`, lesson.explanation, "### Exemplo resolvido", lesson.workedExample, "### Prática guiada", lesson.guidedPractice, "### Prática independente", lesson.independentPractice, "### Critérios", ...lesson.successCriteria.map(item => `- ${item}`), "### Erros frequentes", ...lesson.commonErrors.map(item => `- ${item}`), `Recuperação: ${lesson.recovery}`, "### Seu trabalho", "Resultado:", "Justificativa:", "Limite identificado:");
    parts.push("## Projeto final", course.project.brief, ...course.project.deliverables.map(item => `- ${item}`), `Transferência: ${course.project.transfer}`, "## Rubrica", ...course.project.rubric.map(item => `- ${item.title}: ${item.description} Peso ${item.weight}%. ${item.essential ? `Essencial: mínimo ${item.minimum}%.` : ""}`), "## Continuidade", course.continuation, "Guarde seu material com segurança. Não inclua credenciais nem dados confidenciais nos exercícios.");
    return new Response(parts.join("\n\n") + "\n", { headers: { ...professionalPrivateHeaders, "Content-Type": "text/markdown; charset=utf-8", "Content-Disposition": `attachment; filename="${courseId}-material.md"` } });
  } catch (error) { return professionalError(error); }
}
