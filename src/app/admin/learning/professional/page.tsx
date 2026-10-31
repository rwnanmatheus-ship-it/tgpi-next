
import { LocalizedText } from "@/components/localization/LocaleProvider";
import Image from "next/image";
import Link from "next/link";
import { professionalCourseDrafts } from "@/data/courses/professional";
import { professionalArtwork } from "@/data/courses/professional/artwork";
import { requireAdmin } from "@/lib/auth/guards";
import { professionalReleaseBlockers } from "@/lib/learning/professional-policy";

export const metadata = { title: "Revisão dos cursos profissionais | TGPI", robots: { index: false, follow: false } };

export default async function ProfessionalCurriculumReview() {
  await requireAdmin();
  return <main className="mx-auto max-w-6xl px-4 py-10 text-slate-950">
    <Link href="/admin" className="underline focus-visible:outline-2 focus-visible:outline-blue-600">← Administração</Link>
    <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-blue-700">TGPI Learning · revisão editorial</p>
    <h1 className="mt-3 text-3xl font-semibold tracking-tight">Dez percursos profissionais em preparação</h1>
    <Link href="/admin/learning/professional/reviews" className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Avaliar projetos e contestações</Link>
    <p className="mt-4 max-w-3xl leading-7">Rascunhos iniciais em português. Esta área permite inspecionar o conteúdo, os projetos e as rubricas. Os cursos ainda não estão disponíveis para matrícula ou certificação. As estimativas de tempo não constituem carga horária final.</p>
    <nav aria-label="Cursos em revisão" className="mt-6 flex flex-wrap gap-2">{professionalCourseDrafts.map((course, index) => <a key={course.id} href={`#${course.id}`} className="rounded-full border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600">{String(index + 1).padStart(2, "0")} · {course.title}</a>)}</nav>
    <div className="mt-10 space-y-10">{professionalCourseDrafts.map(course => {
      const artwork = professionalArtwork[course.id];
      return <article id={course.id} key={course.id} className="scroll-mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid md:grid-cols-2"><Image src={`/images/courses/professional/${artwork.key}.webp`} alt={artwork.alt} width={1600} height={900} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" /><div className="p-6"><p className="text-sm font-semibold text-amber-800">Rascunho · {course.version}</p><h2 className="mt-2 text-2xl font-semibold">{course.title}</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6">{course.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul><p className="mt-4 text-xs text-slate-600">Imagens geradas de pessoas fictícias. Não representam professores ou alunos reais.</p></div></div>
        <div className="space-y-6 p-6">
          <section><h3 className="font-semibold">Requisitos e ferramentas</h3><ul className="mt-2 list-disc pl-5 text-sm leading-7">{[...course.prerequisites, ...course.tools].map(item => <li key={item}>{item}</li>)}</ul></section>
          <section><h3 className="font-semibold">Diagnóstico de entrada</h3><p className="mt-2 text-sm leading-7">{course.diagnostic}</p></section>
          {course.id === "python-automacao-profissionais" && <section><h3 className="font-semibold">Arquivos iniciais de prática · Python</h3><p className="mt-2 text-sm leading-7">Execução local, dados sintéticos e solução comentada. Não constitui avaliação final.</p><ul className="mt-2 flex flex-wrap gap-3 text-sm">{["README.md", "expenses.csv", "expected.json", "solution.py", "test_solution.py"].map(file => <li key={file}><a href={`/learning-assets/professional/python/${file}`} download className="underline focus-visible:outline-2 focus-visible:outline-blue-600">{file}</a></li>)}</ul></section>}
          {course.modules.map((module, index) => <details key={module.id} className="rounded-xl border border-slate-200 p-4"><summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-blue-600">{index + 1}. {module.title}</summary>{module.lessons.map(lesson => <div key={lesson.id} className="mt-4 space-y-4 text-sm leading-7">
            <p><strong>Objetivo: </strong>{lesson.objective}</p><p>{lesson.explanation}</p>
            <p><strong>Exemplo resolvido: </strong>{lesson.workedExample}</p>
            <p><strong>Prática guiada: </strong>{lesson.guidedPractice}</p>
            <p><strong>Prática independente: </strong>{lesson.independentPractice}</p>
            <div><h4 className="font-semibold"><LocalizedText text="Critérios de sucesso" /></h4><ul className="list-disc pl-5">{lesson.successCriteria.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div><h4 className="font-semibold"><LocalizedText text="Erros frequentes" /></h4><ul className="list-disc pl-5">{lesson.commonErrors.map(item => <li key={item}>{item}</li>)}</ul></div>
            <p><strong><LocalizedText text="Recuperação:" />{" "}</strong>{lesson.recovery}</p>
          </div>)}</details>)}
          <section className="rounded-2xl bg-slate-950 p-5 text-white"><h3 className="text-xl font-semibold">Projeto final proposto</h3><p className="mt-3 text-sm leading-7">{course.project.brief}</p><ul className="mt-3 list-disc pl-5 text-sm leading-7">{course.project.deliverables.map(item => <li key={item}>{item}</li>)}</ul><p className="mt-4 text-sm leading-7"><strong>Transferência: </strong>{course.project.transfer}</p></section>
          <div className="overflow-x-auto"><table className="w-full min-w-[480px] text-left text-sm"><caption className="mb-3 text-left font-semibold">Rubrica proposta · {course.approval.rubricVersion}</caption><thead><tr><th scope="col" className="p-2">Critério</th><th scope="col" className="p-2">Evidência</th><th scope="col" className="p-2">Peso</th><th scope="col" className="p-2">Essencial</th></tr></thead><tbody>{course.project.rubric.map(item => <tr key={item.id} className="border-t border-slate-200"><th scope="row" className="p-2">{item.title}</th><td className="p-2 leading-6">{item.description}</td><td className="p-2">{item.weight}%</td><td className="p-2">{item.essential ? `Sim · mínimo ${item.minimum}%` : "Não"}</td></tr>)}</tbody></table></div>
          <p className="text-sm leading-7">Proposta de aprovação: cada avaliação obrigatória ≥ {course.approval.quizMinimum}%; projeto ≥ {course.approval.projectMinimum}%, com todos os critérios essenciais atendidos. Esses parâmetros ainda precisam de calibração pedagógica. Correção humana proposta; operação ainda não integrada.</p>
          <p className="text-sm leading-7"><strong>Continuidade: </strong>{course.continuation}</p>
          <aside className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-7"><h3 className="font-semibold">Liberação bloqueada</h3><p>Conteúdo requer expansão e revisão. Questões, arquivos, operação de avaliação e validação autenticada permanecem pendentes. Acesso comercial ainda não definido.</p><p className="mt-2 font-mono text-xs">{professionalReleaseBlockers(course).join(" · ")}</p></aside>
        </div>
      </article>;
    })}</div>
  </main>;
}
