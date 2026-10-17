"use client";

import { useState } from "react";
import type { CourseLesson } from "@/types/course";

/** A private rehearsal: this response is never submitted as assessment evidence. */
export default function ActiveRecallPractice({ lesson, applied = false }: { lesson: CourseLesson; applied?: boolean }) {
  const [response, setResponse] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const criteria = applied ? ["I used traceable evidence and stated uncertainty.", "I made the assumptions and calculation basis explicit.", "I tested an alternative or downside case.", "I defined a practical next action and review date."] : [
    "I stated the purpose before adding details.",
    "I used a specific fact, amount, place or deadline.",
    "I asked for clarification instead of pretending to understand.",
    "I confirmed the next action in my own words.",
  ];

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--tgpi-border)] bg-white">
      <div className="border-b border-[var(--tgpi-border)] bg-[var(--tgpi-navy)] p-5 text-white">
        <h3 className="text-xl font-semibold">Your real-world rehearsal</h3>
        <p className="mt-2 text-sm leading-6 text-white/80">{applied ? "Read the scenario and create the practical output. Review the evidence, assumptions and next step." : "Read the scenario. Look away from the model. Say your response aloud, then write it from memory."}</p>
      </div>
      <div className="p-5">
        <label htmlFor={`rehearsal-${lesson.id}`} className="text-sm font-bold">{applied ? "What would you decide, and what evidence supports it?" : "What would you actually say?"}</label>
        <textarea id={`rehearsal-${lesson.id}`} value={response} onChange={(event) => setResponse(event.target.value)} rows={5} maxLength={2000} spellCheck lang="en" placeholder="Start with your purpose. Add the essential detail. Confirm the next step." className="mt-3 w-full rounded-xl border border-[var(--tgpi-border)] p-4 text-base leading-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]" />
        <p className="mt-2 text-xs leading-5 text-[var(--tgpi-muted)]">Private scratchpad for this visit. Copy anything you want to keep. This practice is self-reviewed and is not graded.</p>
        <button type="button" aria-expanded={showModel} onClick={() => setShowModel((value) => !value)} className="mt-4 min-h-11 rounded-xl border border-[var(--tgpi-border)] px-4 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">{showModel ? "Hide worked example" : "Compare with the worked example"}</button>
        {showModel ? <div className="mt-4 rounded-xl bg-[var(--tgpi-canvas)] p-4">{lesson.dialogue.map((line, index) => <p key={index} className="mb-2 text-sm leading-7"><strong>{line.speaker}:</strong> {line.line}</p>)}</div> : null}
        <fieldset className="mt-6">
          <legend className="text-sm font-bold">Review your response, then repeat without looking</legend>
          {criteria.map((criterion) => <label key={criterion} className="mt-3 flex cursor-pointer gap-3 text-sm leading-6"><input type="checkbox" checked={reviewed.includes(criterion)} onChange={(event) => setReviewed((items) => event.target.checked ? [...items, criterion] : items.filter((item) => item !== criterion))} className="mt-1 h-4 w-4 shrink-0 accent-[var(--tgpi-navy)]" />{criterion}</label>)}
        </fieldset>
        <p role="status" className="mt-5 rounded-xl bg-[var(--tgpi-gold-soft)] p-4 text-sm leading-6">{reviewed.length === criteria.length ? "Now change one detail in the scenario and answer again. Revisit tomorrow and in seven days to test retrieval." : "Transfer challenge: change the location, deadline or amount. Can you still achieve the same outcome?"}</p>
      </div>
    </div>
  );
}
