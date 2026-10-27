"use client";
import { useActionState, type ReactNode } from "react";
import { submitProject } from "@/app/courses/[id]/project/actions";
export default function ProjectSubmissionForm({ children, locked }: { children: ReactNode; locked: boolean }) {
  const [state, action, pending] = useActionState(submitProject, { error: "" });
  return <form action={action} className="mt-6">{state.error && <p role="alert" className="mb-5 rounded-xl border p-4 text-sm leading-7">{state.error} Your draft remains in this form.</p>}<fieldset disabled={locked || pending} className="grid gap-5 disabled:opacity-70"><legend className="sr-only">Private practical submission</legend>{children}</fieldset><p role="status" className="mt-3 text-sm">{pending ? "Submitting your evidence…" : ""}</p></form>;
}
