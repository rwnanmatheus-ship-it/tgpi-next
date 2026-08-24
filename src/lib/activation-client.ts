"use client";

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

export async function fetchActivationProgress() {
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

  return readResponse(response);
}
