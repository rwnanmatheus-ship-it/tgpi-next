"use client";

import { useEffect, useState } from "react";
import type { Course, CourseLesson } from "@/types/course";
import type { JournalInput, LearningJournal as JournalRecord } from "@/lib/learning/journal";

export default function LearningJournal({ course, lesson }: { course: Course; lesson: CourseLesson }) {
  const [draft, setDraft] = useState<JournalInput>({ courseId: course.id, courseVersion: course.version, lessonId: lesson.id, revision: 0, notes: "", practice: "", diagnostic: "", reviewDays: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState("");
  const [retry, setRetry] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState<JournalRecord | null>(null);
  useEffect(() => {
    const abort = new AbortController();
    setLoading(true);
    const query = new URLSearchParams({ courseId: course.id, courseVersion: course.version, lessonId: lesson.id });
    fetch(`/api/learning/journal?${query}`, { signal: abort.signal, cache: "no-store" }).then(async response => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load your journal.");
      if (data.journal) {
        const record: JournalRecord = data.journal;
        setDraft({ courseId: record.courseId, courseVersion: record.courseVersion, lessonId: record.lessonId, revision: record.revision, diagnostic: record.diagnostic, notes: record.notes, practice: record.practice, reviewDays: record.reviewDays });
        setSaved(record);
      }
      setLoaded(true); setMessage("");
    }).catch(error => { if (!abort.signal.aborted) setMessage(error instanceof Error ? error.message : "Unable to load."); })
      .finally(() => { if (!abort.signal.aborted) setLoading(false); });
    return () => abort.abort();
  }, [course.id, course.version, lesson.id, retry]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    const navigation = (event: MouseEvent) => {
      if (dirty && event.target instanceof Element && event.target.closest("a[href]") && !window.confirm("Your journal has unsaved changes. Leave this page?")) { event.preventDefault(); event.stopPropagation(); }
    };
    window.addEventListener("beforeunload", warn);
    document.addEventListener("click", navigation, true);
    return () => { window.removeEventListener("beforeunload", warn); document.removeEventListener("click", navigation, true); };
  }, [dirty]);
  function change(field: "notes" | "practice" | "diagnostic", value: string) {
    setDraft(current => ({ ...current, [field]: value })); setDirty(true);
  }
  async function save() {
    setSaving(true); setMessage("");
    try {
      const response = await fetch("/api/learning/journal", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed. Keep your draft and retry.");
      setDraft(current => ({ ...current, revision: data.journal.revision })); setSaved(data.journal); setDirty(false);
      setMessage("Saved privately to your account. You can resume on another device.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Save failed. Your draft remains here."); }
    finally { setSaving(false); }
  }
  const fieldClass = "mt-2 w-full rounded-xl border border-[var(--tgpi-border)] bg-white p-3 text-base leading-7 focus-visible:outline-2 focus-visible:outline-[var(--tgpi-gold)] disabled:opacity-60";
  return <section aria-labelledby="journal-heading" className="rounded-3xl border border-[var(--tgpi-border)] bg-white p-5 sm:p-8">
    <p className="text-xs font-bold uppercase tracking-widest text-[var(--tgpi-gold-strong)]">Private learning journal · v{course.version}</p>
    <h2 id="journal-heading" className="mt-2 text-2xl font-semibold">Turn practice into a record you can revisit</h2>
    <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">Your writing is private to your account. It is not shared with Atlas, publicly displayed or graded. Saving a response does not demonstrate competence or earn a certificate. Do not include identity documents or other sensitive information.</p>
    <fieldset disabled={loading || saving || !loaded} className="mt-5 grid gap-5">
      <legend className="sr-only">Practice, reflection and review schedule</legend>
      <label className="block text-sm font-bold" htmlFor="learning-diagnostic">Before studying: what can you already do, and where do you need help?
        <textarea id="learning-diagnostic" rows={3} maxLength={2000} value={draft.diagnostic} onChange={event => change("diagnostic", event.target.value)} className={fieldClass} />
        <span className="text-xs font-normal text-[var(--tgpi-muted)]">Ungraded self-assessment; this is not a diagnostic test score.</span>
      </label>
      <label className="block text-sm font-bold" htmlFor="learning-practice">Your practical output
        <span className="mt-2 block font-normal leading-6">{lesson.practiceTask.prompt}</span>
        <textarea id="learning-practice" rows={7} maxLength={6000} value={draft.practice} onChange={event => change("practice", event.target.value)} className={fieldClass} />
      </label>
      <label className="block text-sm font-bold" htmlFor="learning-notes">Notes, evidence and questions to revisit
        <textarea id="learning-notes" rows={4} maxLength={6000} value={draft.notes} onChange={event => change("notes", event.target.value)} className={fieldClass} />
      </label>
      <label className="block text-sm font-bold" htmlFor="learning-review">Plan a retrieval practice session
        <select id="learning-review" value={draft.reviewDays} onChange={event => { setDraft(current => ({ ...current, reviewDays: Number(event.target.value) as JournalInput["reviewDays"] })); setDirty(true); }} className={fieldClass}>
          <option value={0}>No review scheduled</option>{[1, 3, 7, 14, 30].map(days => <option key={days} value={days}>{days} day{days === 1 ? "" : "s"} after saving</option>)}
        </select>
        <span className="mt-2 block text-xs font-normal leading-6">At your next review, hide the example and recreate the output in a new situation. This is a saved plan, without email reminders. Future reviews do not affect an earned certificate.</span>
      </label>
      <button type="button" disabled={!dirty} onClick={() => void save()} className="min-h-12 rounded-xl bg-[var(--tgpi-navy)] px-5 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-[var(--tgpi-gold)] disabled:opacity-50">{saving ? "Saving…" : "Save private journal"}</button>
    </fieldset>
    {loading && <p role="status" className="mt-4 text-sm">Loading your saved work…</p>}
    {!loading && !loaded && <button type="button" onClick={() => setRetry(value => value + 1)} className="mt-4 min-h-11 rounded-xl border px-4">Retry loading</button>}
    <p role="status" className="mt-4 text-sm leading-6">{message || (dirty ? "Unsaved changes — save before leaving." : "")}</p>
    {saved?.nextReviewAt && <p className="mt-2 text-xs leading-6">Planned review: {new Date(saved.nextReviewAt).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })} (UTC). Retention has not been independently assessed.</p>}
  </section>;
}
