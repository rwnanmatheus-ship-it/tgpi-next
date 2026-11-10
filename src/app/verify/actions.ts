"use server";

import { redirect } from "next/navigation";
import { readVerificationReference } from "@/lib/certificate-reference";

export async function submitVerificationReference(form: FormData) {
  const reference = form.get("reference");
  const result = typeof reference === "string" ? readVerificationReference(reference) : null;
  if (result) redirect(result.href);
  redirect(form.get("type") === "global_key" ? "/verify?type=global_key&invalid=1" : "/verify?invalid=1");
}
