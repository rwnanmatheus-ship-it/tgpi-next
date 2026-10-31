"use client";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import { professionalEarlyAccessNotice } from "@/lib/learning/professional-runtime";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useLocale } from "@/components/localization/LocaleProvider";
import { professionalWorkedLabs } from "@/data/courses/professional/worked-labs";
import { professionalUi } from "@/lib/learning/professional-ui";
import type { ProfessionalCourseDraft, ProfessionalAssessmentQuestion } from "@/types/professional-learning";
import type { ProfessionalRecord } from "@/lib/learning/professional-model";

type Question = Pick<ProfessionalAssessmentQuestion, "id" | "prompt" | "options">;
type Feedback = { questionId: string; correct: boolean; explanation: string };
const field = "mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-base leading-7 focus-visible:outline-2 focus-visible:outline-blue-600 disabled:bg-slate-100";
const button = "inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-wait disabled:opacity-50";

export default function ProfessionalStudy({ course }: { course: ProfessionalCourseDraft }) {
  const { user } = useUser();
  return <StudyAccount key={`${course.id}:${course.version}:${user?.id || "pending"}`} course={course} />;
}
function StudyAccount({ course }: { course: ProfessionalCourseDraft }) {
  const { locale, t } = useLocale();
  const ui = professionalUi(locale);
  const lessons = course.modules.flatMap(module => module.lessons);
  const [record, setRecord] = useState<ProfessionalRecord | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [error, setError] = useState(""), [message, setMessage] = useState("");
  const [lessonIndex, setLessonIndex] = useState(0), [activity, setActivity] = useState(""), [diagnostic, setDiagnostic] = useState("");
  const [project, setProject] = useState(""), [transfer, setTransfer] = useState(""), [evidence, setEvidence] = useState<Record<string, string>>({}), [aiDisclosure, setAiDisclosure] = useState(""), [audioId, setAudioId] = useState<string | undefined>();
  const [files, setFiles] = useState<string[]>([]);
  const [audioConsent, setAudioConsent] = useState(false), [nameConsent, setNameConsent] = useState(false), [sharing, setSharing] = useState(false), [appeal, setAppeal] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({}), [feedback, setFeedback] = useState<Feedback[]>([]);
  const endpoint = `/api/learning/professional/${course.id}`;
  const lesson = lessons[lessonIndex];
  function changeLesson(index: number) {
    if (activity !== (record?.activities[lesson.id] || "") && !window.confirm(t("A prática desta aula ainda não foi salva. Deseja trocar de aula e descartar este campo?"))) return;
    setLessonIndex(index); setActivity(record?.activities[lessons[index].id] || "");
  }
  useEffect(() => {
    const dirty = activity !== (record?.activities[lesson.id] || "") || project !== (record?.draft?.project || "") || transfer !== (record?.draft?.transfer || "") || aiDisclosure !== (record?.draft?.aiDisclosure || "") || JSON.stringify(evidence) !== JSON.stringify(record?.draft?.evidence || {}) || JSON.stringify(files) !== JSON.stringify(record?.draft?.files || []) || audioId !== record?.draft?.audioId;
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [activity, aiDisclosure, audioId, evidence, files, lesson.id, project, record, transfer]);
  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const response = await fetch(endpoint, { cache: "no-store", signal: controller.signal });
        const data = await response.json(); if (!response.ok) throw Error(data.error || "Falha ao carregar.");
        const saved = data.record as ProfessionalRecord | null;
        setRecord(saved); setQuestions(data.questions); setProject(saved?.draft?.project || ""); setTransfer(saved?.draft?.transfer || ""); setEvidence(saved?.draft?.evidence || {}); setAiDisclosure(saved?.draft?.aiDisclosure || ""); setAudioId(saved?.draft?.audioId); setFiles(saved?.draft?.files || []);
        const index = Math.max(0, lessons.findIndex(item => item.id === saved?.lastLessonId));
        setLessonIndex(index); setActivity(saved?.activities[lessons[index].id] || "");
      } catch (cause) { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "Falha ao carregar."); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    })();
    return () => controller.abort();
  // course is the immutable server-provided version for this component instance.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);
  async function mutate(input: Record<string, unknown>) {
    if (busy) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...input, version: course.version }) });
      const data = await response.json(); if (!response.ok) throw Error(data.error || "Não foi possível salvar.");
      if (data.record) setRecord(data.record);
      if (data.feedback) setFeedback(data.feedback);
      if (data.credentialId) setRecord(previous => previous ? { ...previous, credentialId: data.credentialId } : previous);
      setMessage("Registro confirmado no servidor.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Falha ao salvar. Seus campos permanecem nesta tela."); }
    finally { setBusy(false); }
  }
  async function uploadAudio(file: File | undefined) {
    if (!file) return;
    setError("");
    if (!audioConsent || file.size > 600_000) { setError("Confirme o consentimento e use WebM ou WAV de até 600 KB."); return; }
    setBusy(true);
    try {
      const type = file.name.toLowerCase().endsWith(".wav") ? "audio/wav" : file.type.split(";")[0];
      const response = await fetch(`${endpoint}/audio`, { method: "POST", headers: { "Content-Type": type, "X-Audio-Consent": "true" }, body: file });
      const data = await response.json(); if (!response.ok) throw Error(data.error || "Falha no envio.");
      setAudioId(data.audioId); setMessage("Áudio privado recebido. Salve o rascunho para vinculá-lo ao projeto.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Falha no envio."); }
    finally { setBusy(false); }
  }
  async function uploadFile(file: File | undefined) {
    if (!file) return;
    if (file.size > 3_000_000 || files.length >= 6) { setError("Use até seis arquivos, cada um com até 3 MB."); return; }
    setBusy(true); setError("");
    try {
      const response = await fetch(`${endpoint}/files`, { method: "POST", headers: { "Content-Type": "application/octet-stream", "X-File-Name": encodeURIComponent(file.name) }, body: file });
      const data = await response.json(); if (!response.ok) throw Error(data.error || "Falha no envio.");
      setFiles(previous => [...previous, data.fileId]); setMessage("Arquivo privado recebido. Salve o rascunho para vinculá-lo ao projeto.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Falha no envio."); }
    finally { setBusy(false); }
  }
  const completed = lessons.filter(item => record?.activities[item.id]).length;
  const locked = busy || ["submitted", "approved", "appealed"].includes(record?.state || "");
  if (loading) return <main className="mx-auto max-w-5xl px-4 py-12" role="status">{ui.loading}</main>;
  return <main lang={locale} className="mx-auto max-w-6xl px-4 py-8 text-slate-950">
    <Link href={`/courses/${course.id}`} className="text-sm underline">← {ui.back}</Link><h1 className="mt-5 text-3xl font-semibold">{course.title}</h1>
    <p role="note" className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-7">{t(professionalEarlyAccessNotice)}</p><p className="mt-3 text-sm leading-7">{ui.instructionNotice}</p><p className="mt-3 text-sm leading-7"><LocalizedText text="Instrução: português · exemplos de idioma preservados ·" />{" "}{course.version}<LocalizedText text=". O registro das práticas indica atividade realizada; a competência depende do questionário e do projeto avaliado." /></p>
    <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-blue-700"><a href={`${endpoint}/materials`} download><LocalizedText text="Baixar material e caderno de prática" /></a>{course.id === "python-automacao-profissionais" && ["README.md", "expenses.csv", "expected.json", "solution.py", "test_solution.py"].map(file => <a key={file} href={`/learning-assets/professional/python/${file}`} download>{file}</a>)}{course.id === "planilhas-decisoes-profissionais" && <><a href="/learning-assets/professional/spreadsheets/exercise.xlsx" download><LocalizedText text="Planilha de exercício" /></a><a href="/learning-assets/professional/spreadsheets/solution.xlsx" download><LocalizedText text="Solução comentada" /></a></>}{course.id === "analise-dados-power-bi-ia" && <><a href="/learning-assets/professional/data/world-bank-gdp.csv" download><LocalizedText text="Dataset público" /></a><a href="/learning-assets/professional/data/README.md" download><LocalizedText text="Origem e dicionário" /></a><a href="/learning-assets/professional/data/power-query.m" download><LocalizedText text="Power Query comentado" /></a></>}</div>
    {error && <div role="alert" className="my-4 rounded-xl border border-red-300 bg-red-50 p-4"><p>{t(error)}</p><button onClick={() => window.location.reload()} className="mt-2 underline"><LocalizedText text="Recarregar o último registro confirmado" /></button><p className="mt-2 text-xs"><LocalizedText text="Copie os campos ainda não salvos antes de recarregar." /></p></div>}
    {message && <p role="status" className="my-4 rounded-xl bg-blue-50 p-4">{t(message)}</p>}
    {!record ? <form className="mt-6 max-w-3xl rounded-2xl border p-6" onSubmit={event => { event.preventDefault(); void mutate({ action: "enrol", diagnostic }); }}><h2 className="text-xl font-semibold"><LocalizedText text="Diagnóstico inicial" /></h2><p className="mt-3 leading-7">{course.diagnostic}</p><label className="mt-4 block font-semibold"><LocalizedText text="Sua análise inicial (80–4.000 caracteres)" /><textarea required minLength={80} maxLength={4000} value={diagnostic} onChange={event => setDiagnostic(event.target.value)} rows={6} className={field} /></label><p className="my-4 text-sm leading-7"><LocalizedText text="Use dados fictícios. Este diagnóstico é uma reflexão inicial, não uma atribuição automática de nível. Compare sua resposta com os exemplos durante o curso." /></p><button className={button} disabled={busy} type="submit">{ui.enrol}</button></form> : <>
      <section aria-label={t("Progresso persistido")} className="my-6 rounded-2xl border bg-slate-50 p-5"><div className="flex flex-wrap justify-between gap-3"><p className="font-semibold">{completed}/{lessons.length}{" "}<LocalizedText text="práticas registradas" /></p><p className="text-sm"><LocalizedText text="Estado:" />{" "}{t(({ studying: "em estudo", submitted: "aguardando revisão", revision_requested: "revisão solicitada", approved: "aprovado", appealed: "contestação em análise" })[record.state])}</p></div><progress className="mt-4 h-3 w-full accent-blue-600" value={completed} max={lessons.length}>{completed}/{lessons.length}</progress><p className="mt-2 text-sm"><LocalizedText text="Próximo passo:" />{" "}{t(completed < lessons.length ? "produzir e salvar as práticas" : !record.quiz?.passed ? "responder e revisar o questionário" : record.state === "studying" || record.state === "revision_requested" ? "preparar e enviar o projeto" : record.state === "approved" ? "conferir a devolutiva e emitir seu certificado" : "acompanhar a devolutiva do revisor")}.</p></section>
      <div className="grid gap-6 lg:grid-cols-[250px_1fr]"><nav aria-label={t("Aulas")} className="space-y-2">{lessons.map((item, index) => <button key={item.id} className={`w-full rounded-xl border p-3 text-left text-sm leading-6 focus-visible:outline-2 focus-visible:outline-blue-600 ${index === lessonIndex ? "border-blue-600 bg-blue-50" : "bg-white"}`} aria-current={index === lessonIndex ? "step" : undefined} onClick={() => changeLesson(index)}>{record.activities[item.id] ? "✓ " : `${index + 1}. `}{item.title}</button>)}</nav>
      <article className="space-y-5 rounded-2xl border p-5 sm:p-7"><h2 className="text-2xl font-semibold">{lesson.title}</h2><p className="font-medium leading-7">{lesson.objective}</p><p className="leading-8">{lesson.explanation}</p><section className="rounded-xl bg-slate-100 p-4"><h3 className="font-semibold"><LocalizedText text="Exemplo resolvido" /></h3><p className="mt-2 leading-7">{lesson.workedExample}</p></section><section className="rounded-xl border border-blue-200 bg-blue-50 p-4"><h3 className="font-semibold"><LocalizedText text="Laboratório resolvido e variação" /></h3><p className="mt-2 leading-7">{professionalWorkedLabs[course.id]?.[lessonIndex]}</p><p className="mt-3 text-xs leading-6"><LocalizedText text="Pessoas, organizações e números deste laboratório são fictícios. Dados públicos dos arquivos de apoio preservam sua própria proveniência." /></p></section><section><h3 className="font-semibold"><LocalizedText text="Prática guiada" /></h3><p className="mt-2 leading-7">{lesson.guidedPractice}</p></section><section><h3 className="font-semibold"><LocalizedText text="Prática independente" /></h3><p className="mt-2 leading-7">{lesson.independentPractice}</p></section><section><h3 className="font-semibold"><LocalizedText text="Critérios de sucesso" /></h3><ul className="mt-2 list-disc space-y-2 pl-5 leading-7">{lesson.successCriteria.map(item => <li key={item}>{item}</li>)}</ul></section><section><h3 className="font-semibold"><LocalizedText text="Erros frequentes" /></h3><ul className="mt-2 list-disc space-y-2 pl-5 leading-7">{lesson.commonErrors.map(item => <li key={item}>{item}</li>)}</ul></section><p className="leading-7"><strong><LocalizedText text="Recuperação:" />{" "}</strong>{lesson.recovery}</p>
      <form onSubmit={event => { event.preventDefault(); void mutate({ action: "activity", revision: record.revision, lessonId: lesson.id, text: activity }); }}><label className="block font-semibold"><LocalizedText text="Sua prática e autoavaliação" /><textarea required minLength={80} maxLength={4000} disabled={locked} value={activity} onChange={event => setActivity(event.target.value)} rows={7} className={field} /></label><p className="my-3 text-sm leading-6"><LocalizedText text="Descreva o resultado, sua justificativa e um limite. Privado à conta e aos revisores autorizados. Não envie senhas, documentos ou informações confidenciais." /></p><button className={button} disabled={locked}>{ui.savePractice}</button></form></article></div>
      <section className="mt-8 rounded-2xl border p-6"><h2 className="text-2xl font-semibold"><LocalizedText text="Questionário de aplicação" /></h2><p className="mt-3 leading-7"><LocalizedText text="Uma decisão por módulo; mínimo" />{" "}{course.approval.quizMinimum}<LocalizedText text="% e todas as questões essenciais corretas. Revise a explicação e tente novamente quando necessário. A aprovação do projeto continua obrigatória." /></p>{record.quiz && <p className="mt-3 font-semibold"><LocalizedText text="Última tentativa:" />{" "}{record.quiz.score.toFixed(1)}% · {record.quiz.passed ? "aprovada" : "revisão necessária"}</p>}<form onSubmit={event => { event.preventDefault(); void mutate({ action: "quiz", answers: questions.map(question => ({ questionId: question.id, optionId: answers[question.id] })) }); }}><fieldset disabled={locked || completed !== lessons.length} className="mt-5 space-y-6">{questions.map((question, index) => <fieldset key={question.id} className="rounded-xl border p-4"><legend className="px-2 font-semibold">{index + 1}. {question.prompt}</legend>{question.options.map(option => <label key={option.id} className="mt-3 flex min-h-12 cursor-pointer items-start gap-3 text-sm leading-7"><input className="mt-2 size-4" type="radio" required name={question.id} value={option.id} checked={answers[question.id] === option.id} onChange={() => setAnswers(previous => ({ ...previous, [question.id]: option.id }))} />{option.label}</label>)}</fieldset>)}<button className={button}>{ui.submitAnswers}</button></fieldset></form>{feedback.length > 0 && <div className="mt-5 space-y-3" aria-live="polite">{feedback.map(item => <p key={item.questionId} className="rounded-xl bg-slate-100 p-4 text-sm leading-7"><strong>{item.correct ? "Correta. " : "Revise. "}</strong>{item.explanation}</p>)}</div>}</section>
      <section className="mt-8 rounded-2xl border p-6"><h2 className="text-2xl font-semibold"><LocalizedText text="Projeto final" /></h2><p className="mt-3 leading-7">{course.project.brief}</p><ul className="mt-3 list-disc pl-5 leading-7">{course.project.deliverables.map(item => <li key={item}>{item}</li>)}</ul><p className="mt-4 leading-7"><strong><LocalizedText text="Desafio de transferência:" />{" "}</strong>{course.project.transfer}</p>
      <form className="mt-5 space-y-5" onSubmit={event => { event.preventDefault(); void mutate({ action: "draft", revision: record.revision, project, transfer, evidence, aiDisclosure, files, ...(audioId ? { audioId } : {}) }); }}><fieldset disabled={locked} className="space-y-5"><label className="block font-semibold"><LocalizedText text="Seu projeto" /><textarea value={project} onChange={event => setProject(event.target.value)} maxLength={14000} rows={10} className={field} /></label>{lessons.map(item => <label key={item.id} className="block text-sm font-semibold"><LocalizedText text="Evidência:" />{" "}{item.objective}<textarea value={evidence[item.id] || ""} onChange={event => setEvidence(previous => ({ ...previous, [item.id]: event.target.value }))} maxLength={2000} rows={3} className={field} /></label>)}<label className="block font-semibold"><LocalizedText text="Resposta ao desafio de transferência" /><textarea value={transfer} onChange={event => setTransfer(event.target.value)} maxLength={6000} rows={5} className={field} /></label><label className="block font-semibold"><LocalizedText text="Como utilizou IA, ou informe “não utilizei”" /><textarea value={aiDisclosure} onChange={event => setAiDisclosure(event.target.value)} maxLength={1000} rows={2} className={field} /></label><button className={button}>{ui.saveDraft}</button></fieldset></form>
      <section className="mt-6 rounded-xl border p-5"><h3 className="font-semibold"><LocalizedText text="Arquivos privados do projeto" /></h3><p className="mt-2 text-sm leading-7"><LocalizedText text="Até seis arquivos de 3 MB: XLSX, PBIX, PDF, CSV, JSON, PY, TXT ou MD. Planilhas exige XLSX; Power BI exige PBIX; Python exige PY. Não envie credenciais ou dados pessoais. Os arquivos não são executados pelo servidor; o revisor deve inspecionar o resultado." /></p><label className="mt-3 block font-semibold"><LocalizedText text="Adicionar arquivo" /><input type="file" accept=".xlsx,.pbix,.pdf,.csv,.json,.py,.txt,.md" className={field} disabled={locked || files.length >= 6} onChange={event => void uploadFile(event.target.files?.[0])} /></label><ul className="mt-3 space-y-2">{files.map((id, index) => <li key={id} className="flex flex-wrap items-center gap-4"><a className="text-blue-700 underline" href={`/api/learning/professional-files/${encodeURIComponent(record.uid)}/${encodeURIComponent(id)}`}><LocalizedText text="Baixar arquivo" />{" "}{index + 1}</a><button type="button" disabled={locked} onClick={() => setFiles(previous => previous.filter(item => item !== id))} className="min-h-12 underline"><LocalizedText text="Remover do rascunho" /></button></li>)}</ul><p className="mt-3 text-sm"><LocalizedText text="Salve o rascunho após adicionar ou remover vínculos." /></p></section>
      {course.id === "ingles-carreira-internacional" && <section className="mt-6 rounded-xl bg-slate-100 p-5"><h3 className="font-semibold"><LocalizedText text="Evidência oral privada" /></h3><p className="mt-2 text-sm leading-7"><LocalizedText text="Grave localmente uma apresentação e uma resposta de entrevista. Use WebM ou WAV, até 600 KB, sem dados sensíveis. Se necessário, divida a fala em uma amostra curta que demonstre os critérios. O revisor avaliará compreensão, clareza e adequação; texto não comprova pronúncia." /></p><label className="mt-3 flex gap-3 text-sm leading-7"><input type="checkbox" checked={audioConsent} onChange={event => setAudioConsent(event.target.checked)} disabled={locked} /><LocalizedText text="Consinto com o armazenamento privado da minha voz para avaliação por revisor autorizado." /></label><label className="mt-3 block text-sm font-semibold"><LocalizedText text="Selecionar amostra" /><input type="file" accept="audio/webm,audio/wav,.webm,.wav" className={field} disabled={locked || !audioConsent} onChange={event => void uploadAudio(event.target.files?.[0])} /></label>{audioId && <p className="mt-3 text-sm"><LocalizedText text="Amostra recebida. Salve o rascunho antes de enviar o projeto." /></p>}</section>}
      <p className="my-4 text-sm leading-7"><LocalizedText text="Salve o rascunho antes de submeter. A submissão fica bloqueada durante a revisão. Um revisor autorizado precisa inspecionar o trabalho; nenhum arquivo ou tamanho de texto aprova automaticamente o projeto. Sem prazo de devolutiva prometido." /></p><button className={button} disabled={locked || !record.quiz?.passed} onClick={() => void mutate({ action: "submit", revision: record.revision })}>{ui.submitProject}</button>
      {record.review && <section className="mt-6 rounded-xl bg-blue-50 p-5"><h3 className="text-xl font-semibold"><LocalizedText text="Devolutiva" /></h3><p className="mt-3 whitespace-pre-wrap leading-7">{record.review.feedback}</p><ul className="mt-3 space-y-2 text-sm">{course.project.rubric.map(item => <li key={item.id}>{item.title}: {record.review!.scores[item.id]}<LocalizedText text="% · peso" />{" "}{item.weight}%{item.essential ? t(" · essencial, mínimo {minimum}%", { minimum: item.minimum }) : ""}</li>)}</ul>{!record.credentialId && record.state !== "appealed" && <form className="mt-5" onSubmit={event => { event.preventDefault(); void mutate({ action: "appeal", revision: record.revision, text: appeal }); }}><label className="block font-semibold"><LocalizedText text="Contestar um critério (80–4.000 caracteres)" /><textarea required value={appeal} onChange={event => setAppeal(event.target.value)} minLength={80} maxLength={4000} rows={4} className={field} /></label><button disabled={busy} className={`${button} mt-3`}><LocalizedText text="Enviar contestação fundamentada" /></button></form>}</section>}
      {record.state === "approved" && <section className="mt-6 rounded-xl border border-[#D4AF37] p-5"><h3 className="text-xl font-semibold"><LocalizedText text="Seu certificado" /></h3>{record.credentialId ? <><Link className="mt-3 inline-block font-semibold text-blue-700 underline" href={`/certificates/${record.credentialId}`}>{ui.openCertificate}</Link><label className="mt-4 flex gap-3 text-sm"><input type="checkbox" checked={sharing} onChange={event => setSharing(event.target.checked)} /><LocalizedText text="Permitir verificação pública com nome e competências, sem e-mail, respostas ou áudio." /></label><button className={`${button} mt-3`} disabled={busy} onClick={() => void mutate({ action: "sharing", sharing })}>{ui.saveSharing}</button></> : <><label className="mt-4 flex gap-3 text-sm leading-7"><input type="checkbox" checked={nameConsent} onChange={event => setNameConsent(event.target.checked)} /><LocalizedText text="Conferi o nome de certificado nas configurações da minha conta e autorizo a emissão com esse nome." /></label><label className="mt-3 flex gap-3 text-sm leading-7"><input type="checkbox" checked={sharing} onChange={event => setSharing(event.target.checked)} /><LocalizedText text="Permitir consulta pública do nome e competências; posso desativar depois." /></label><button disabled={busy || !nameConsent} className={`${button} mt-4`} onClick={() => void mutate({ action: "issue", nameConsent: true, sharing })}>{ui.issue}</button></>}</section>}
      </section>
      <section className="my-8 rounded-2xl bg-slate-100 p-6"><h2 className="font-semibold"><LocalizedText text="Próximos passos na TGPI" /></h2><p className="mt-3 leading-7">{course.continuation}</p><div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold text-blue-700"><Link href="/dashboard"><LocalizedText text="Workspace" /></Link><Link href="/countries"><LocalizedText text="Países" /></Link><Link href="/compare"><LocalizedText text="Comparar" /></Link><Link href="/courses"><LocalizedText text="Cursos" /></Link><Link href="/certificates"><LocalizedText text="Certificados" /></Link></div></section>
    </>}
  </main>;
}
