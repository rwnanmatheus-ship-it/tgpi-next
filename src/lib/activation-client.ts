"use client";

import { announceProgressSaved } from "@/lib/progress-sync";

import type {
  ActivationMutation,
  TgpiActivationProgress,
} from "@/lib/activation-progress";

export class ActivationApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ActivationApiError";
    this.status = status;
  }
}

async function readResponse(response: Response) {
  const payload = (await response.json()) as {
    error?: string;
    progress?: TgpiActivationProgress;
    readOnly?: boolean;
  };

  if (!response.ok || !payload.progress) {
    throw new ActivationApiError(
      payload.error || "Unable to update your TGPI progress.",
      response.status,
    );
  }

  return { progress: payload.progress, readOnly: payload.readOnly === true };
}

const pendingReads = new Map<string, ReturnType<typeof loadActivationProgress>>();

export function fetchActivationProgress(sessionId: string) {
  const existing = pendingReads.get(sessionId);
  if (existing) return existing;
  const request = loadActivationProgress(sessionId).finally(() => {
    if (pendingReads.get(sessionId) === request) pendingReads.delete(sessionId);
  });
  pendingReads.set(sessionId, request);
  return request;
}

async function loadActivationProgress(sessionId: string) {
  const response = await fetch("/api/progress", {
    cache: "no-store",
    credentials: "same-origin",
    headers: { Accept: "application/json", "X-TGPI-Session": sessionId },
  });

  return readResponse(response);
}

export async function mutateActivationProgress(mutation: ActivationMutation, sessionId: string) {
  const response = await fetch("/api/progress", {
    body: JSON.stringify(mutation),
    cache: "no-store",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-TGPI-Session": sessionId,
    },
    method: "PATCH",
  });

  const { progress } = await readResponse(response);
  pendingReads.delete(sessionId);
  announceProgressSaved();
  return progress;
}
