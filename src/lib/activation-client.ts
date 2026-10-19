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
  };

  if (!response.ok || !payload.progress) {
    throw new ActivationApiError(
      payload.error || "Unable to update your TGPI progress.",
      response.status,
    );
  }

  return payload.progress;
}

const pendingReads = new Map<string, Promise<TgpiActivationProgress>>();

export function fetchActivationProgress(userId: string) {
  const existing = pendingReads.get(userId);
  if (existing) return existing;
  const request = loadActivationProgress().finally(() => { pendingReads.delete(userId); });
  pendingReads.set(userId, request);
  return request;
}

async function loadActivationProgress() {
  const response = await fetch("/api/progress", {
    cache: "no-store",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  });

  return readResponse(response);
}

export async function mutateActivationProgress(mutation: ActivationMutation) {
  const response = await fetch("/api/progress", {
    body: JSON.stringify(mutation),
    cache: "no-store",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PATCH",
  });

  const progress = await readResponse(response);
  announceProgressSaved();
  return progress;
}
