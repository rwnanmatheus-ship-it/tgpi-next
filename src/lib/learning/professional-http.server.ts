import "server-only";
import { NextResponse } from "next/server";
import { TgpiAuthenticationError } from "@/lib/auth/guards";
import { ProfessionalLearningError } from "./professional-records.server";
import { FirestoreAdminError } from "@/lib/firestore-admin-rest.server";

export const professionalPrivateHeaders = { "Cache-Control": "private, no-store, max-age=0", "X-Content-Type-Options": "nosniff" };
export function professionalJson(value: unknown, status = 200) { return NextResponse.json(value, { status, headers: professionalPrivateHeaders }); }
export function assertProfessionalOrigin(request: Request) {
  try {
    if (new URL(request.headers.get("origin") || "").origin === new URL(request.url).origin) return;
  } catch { /* Missing and invalid origins are denied. */ }
  throw new ProfessionalLearningError("Origem da solicitação não autorizada.", 403);
}
export async function readProfessionalBody(request: Request, maxBytes = 90_000) {
  const reader = request.body?.getReader();
  if (!reader) throw new ProfessionalLearningError("Corpo da solicitação ausente.");
  const chunks: Uint8Array[] = []; let length = 0;
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    length += value.byteLength;
    if (length > maxBytes) { await reader.cancel(); throw new ProfessionalLearningError("Arquivo ou solicitação acima do limite.", 413); }
    chunks.push(value);
  }
  const output = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) { output.set(chunk, offset); offset += chunk.byteLength; }
  return output;
}
export function professionalError(error: unknown) {
  if (error instanceof TgpiAuthenticationError) return professionalJson({ error: "Entre na sua conta para continuar." }, 401);
  if (error instanceof ProfessionalLearningError) return professionalJson({ error: error.message }, error.status);
  if (error instanceof SyntaxError) return professionalJson({ error: "Solicitação JSON inválida." }, 400);
  if (error instanceof FirestoreAdminError) return professionalJson({ error: "Armazenamento seguro indisponível. Seu último registro confirmado foi preservado." }, 503);
  console.error("Professional learning operation failed", error instanceof Error ? error.name : "unknown");
  return professionalJson({ error: "Não foi possível concluir. Tente novamente." }, 500);
}
