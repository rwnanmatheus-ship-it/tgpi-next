export class CommunityRequestError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

export async function api<T>(
  params: Record<string, string> = {},
  body?: Record<string, unknown>,
  signal?: AbortSignal,
): Promise<T> {
  const r = await fetch(
    `/api/community?${new URLSearchParams(params)}`,
    body
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          cache: "no-store",
          signal,
        }
      : { cache: "no-store", signal },
  );
  const data = await r.json();
  if (!r.ok)
    throw new CommunityRequestError(data.error || "Unable to complete this action.", r.status);
  return data;
}
export type Action = (body: Record<string, unknown>) => Promise<boolean>;
