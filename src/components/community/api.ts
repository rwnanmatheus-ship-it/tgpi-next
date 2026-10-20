export async function api<T>(
  params: Record<string, string> = {},
  body?: Record<string, unknown>,
): Promise<T> {
  const r = await fetch(
    `/api/community?${new URLSearchParams(params)}`,
    body
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          cache: "no-store",
        }
      : { cache: "no-store" },
  );
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || "Unable to complete this action.");
  return data;
}
export type Action = (body: Record<string, unknown>) => Promise<boolean>;
