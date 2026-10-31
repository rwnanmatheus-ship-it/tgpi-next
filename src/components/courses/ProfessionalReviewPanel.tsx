"use client";
import { useState } from "react";
import type { ProfessionalRecord } from "@/lib/learning/professional-model";
import type { ProfessionalCourseDraft } from "@/types/professional-learning";

export default function ProfessionalReviewPanel({ initialRecords, courses }: { initialRecords: ProfessionalRecord[]; courses: ProfessionalCourseDraft[] }) {
  const [records, setRecords] = useState(initialRecords), [error, setError] = useState(""), [message, setMessage] = useState(""), [busy, setBusy] = useState(false);
  async function review(event: React.FormEvent<HTMLFormElement>, record: ProfessionalRecord, course: ProfessionalCourseDraft) {
    event.preventDefault(); if (busy) return;
    const form = new FormData(event.currentTarget);
    setBusy(true); setError(""); setMessage("");
    try {
      const input = { uid: record.uid, courseId: course.id, version: course.version, revision: record.revision,
        scores: Object.fromEntries(course.project.rubric.map(item => [item.id, Number(form.get(`score:${item.id}`))])),
        feedback: String(form.get("feedback") || ""), expertiseAttestation: form.get("expertise") === "on", oralEvidenceReviewed: form.get("oral") === "on" };
      const response = await fetch("/api/admin/learning/professional", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
      const result = await response.json(); if (!response.ok) throw Error(result.error || "Falha ao registrar avaliação.");
      setRecords(previous => previous.filter(item => item.uid !== record.uid || item.courseId !== course.id));
      setMessage("Devolutiva registrada no histórico privado e disponível ao aluno.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Falha ao registrar. Recarregue antes de repetir."); }
    finally { setBusy(false); }
  }
  async function lifecycle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    const form = new FormData(event.currentTarget);
    if (!window.confirm("Confirma a alteração do estado deste certificado? O histórico será preservado e a ação será auditada.")) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/admin/learning/professional/lifecycle", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ operation: form.get("operation"), credentialId: form.get("credentialId"), reason: form.get("reason") }) });
      const result = await response.json(); if (!response.ok) throw Error(result.error || "Não foi possível alterar o certificado.");
      setMessage(`Estado registrado: ${result.status}.${result.replacementId ? ` Substituto: ${result.replacementId}` : ""}`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Operação indisponível."); }
    finally { setBusy(false); }
  }
  return <div className="mt-6 space-y-6">
    <p className="text-sm leading-7">Fila limitada a 50 trabalhos pendentes por consulta. Recarregue após avaliar para buscar mais. Não avalie trabalhos próprios nem áreas que você não tem competência para revisar. A condição de administrador permite acesso, mas não representa qualificação acadêmica. Sem revisor adequado, mantenha o trabalho pendente.</p>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-4">{error}</p>}{message && <p role="status" className="rounded-xl bg-blue-50 p-4">{message}</p>}
    {records.length === 0 && <p className="rounded-2xl border p-6">Nenhum projeto pendente nesta consulta.</p>}
    <details className="rounded-2xl border p-5"><summary className="cursor-pointer font-semibold">Revogar ou substituir um certificado profissional</summary><form onSubmit={event => void lifecycle(event)} className="mt-4 space-y-4"><label className="block text-sm font-semibold">Identificador do certificado<input required name="credentialId" pattern="TGPI-[A-Z0-9_-]{8,90}" className="mt-2 block min-h-12 w-full rounded-xl border p-3" /></label><label className="block text-sm font-semibold">Operação<select required name="operation" className="mt-2 block min-h-12 rounded-xl border p-3"><option value="revoke">Revogar</option><option value="replace">Substituir preservando as evidências originais</option></select></label><label className="block text-sm font-semibold">Justificativa privada<textarea required name="reason" minLength={30} maxLength={2000} rows={4} className="mt-2 w-full rounded-xl border p-3" /></label><p className="text-sm leading-7">A substituição gera novo identificador e preserva nome, conclusão, versão do curso e evidências. Esta operação não corrige notas nem altera os requisitos já cumpridos. Somente certificados deste novo fluxo são aceitos.</p><button disabled={busy} className="min-h-12 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white">Confirmar operação auditada</button></form></details>
    {records.map(record => {
      const course = courses.find(item => item.id === record.courseId && item.version === record.version);
      if (!course || !record.submission) return null;
      return <article key={`${record.uid}:${record.courseId}`} className="rounded-2xl border p-6"><h2 className="text-2xl font-semibold">{course.title}</h2><p className="mt-2 text-xs">Conta: {record.uid} · revisão {record.revision} · {record.state === "appealed" ? "contestação" : "projeto"}</p><h3 className="mt-5 font-semibold">Trabalho submetido</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-7">{record.submission.project}</p><details className="mt-4 rounded-xl bg-slate-50 p-4"><summary className="cursor-pointer font-semibold">Evidências de cada módulo</summary><dl className="mt-3 space-y-4">{course.modules.flatMap(module => module.lessons).map(lesson => <div key={lesson.id}><dt className="font-semibold">{lesson.objective}</dt><dd className="mt-1 whitespace-pre-wrap text-sm leading-7">{record.submission!.evidence[lesson.id]}</dd><dd className="mt-1 text-xs leading-6">Critérios da aula: {lesson.successCriteria.join(" ")}</dd></div>)}</dl></details><h3 className="mt-5 font-semibold">Transferência e declaração de IA</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-7">{record.submission.transfer}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-7">IA: {record.submission.aiDisclosure}</p>
        {record.submission.files?.length ? <section className="mt-4"><h3 className="font-semibold">Arquivos privados — inspecione antes de avaliar</h3><ul className="mt-3 space-y-3">{record.submission.files.map((id, index) => <li key={id}><a className="text-blue-700 underline" href={`/api/learning/professional-files/${encodeURIComponent(record.uid)}/${encodeURIComponent(id)}`}>Baixar evidência {index + 1}</a></li>)}</ul></section> : null}
        {record.submission.audioId && <section className="mt-4"><h3 className="font-semibold">Amostra oral privada</h3><audio className="mt-3 w-full" controls preload="none" src={`/api/learning/professional-audio/${encodeURIComponent(record.uid)}/${encodeURIComponent(record.submission.audioId)}`} /></section>}
        {record.appeal && <aside className="mt-5 rounded-xl border border-amber-300 p-4"><h3 className="font-semibold">Contestação</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-7">{record.appeal.text}</p><p className="mt-3 text-sm">Devolutiva anterior: {record.review?.feedback}</p></aside>}
        <form className="mt-6 space-y-4" onSubmit={event => void review(event, record, course)}><fieldset disabled={busy} className="space-y-4"><legend className="text-lg font-semibold">Rubrica {course.approval.rubricVersion}</legend><p className="text-sm leading-7">Âncoras: 0–39 evidência ausente ou materialmente incorreta; 40–59 aplicação parcial com erros importantes; 60–69 exige correção substancial; 70–84 aplicação correta com limitações identificadas; 85–100 aplicação e transferência consistentes, com justificativas verificáveis. Média mínima {course.approval.projectMinimum}%; nenhum critério essencial abaixo do mínimo pode ser compensado.</p>
        {course.project.rubric.map(item => <label key={item.id} className="block text-sm font-semibold">{item.title} · peso {item.weight}%{item.essential ? ` · essencial ≥ ${item.minimum}%` : ""}<span className="mt-1 block font-normal leading-7">{item.description}</span><input required type="number" min={0} max={100} step={1} name={`score:${item.id}`} className="mt-2 min-h-12 w-28 rounded-xl border p-3 focus-visible:outline-2 focus-visible:outline-blue-600" /></label>)}
        <label className="block font-semibold">Feedback com referências às evidências e orientação de recuperação<textarea required name="feedback" minLength={80} maxLength={6000} rows={6} className="mt-2 w-full rounded-xl border p-3 leading-7 focus-visible:outline-2 focus-visible:outline-blue-600" /></label>
        <label className="flex gap-3 text-sm leading-7"><input required type="checkbox" name="expertise" />Confirmo que tenho competência para revisar este tema e inspecionei as evidências de todos os módulos e critérios, sem usar presença de arquivo ou detector de IA como prova conclusiva.</label>
        {course.id === "ingles-carreira-internacional" && <label className="flex gap-3 text-sm leading-7"><input required type="checkbox" name="oral" />Ouvi a amostra oral e avaliei a comunicação efetivamente demonstrada, sem inferir pronúncia a partir do texto.</label>}
        <button className="min-h-12 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50" type="submit">Registrar avaliação e feedback</button></fieldset></form>
      </article>;
    })}
  </div>;
}
