import "server-only";

/** Read public instance capabilities; never exposes or changes login credentials. */
export async function isUsernameEnabled() {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  const encodedHost = key.replace(/^pk_(test|live)_/, "");
  const host = Buffer.from(encodedHost, "base64").toString("utf8").replace(/\$$/, "");
  if (!/^[a-z0-9.-]+$/i.test(host) || !host.includes(".")) return false;
  try {
    const response = await fetch(`https://${host}/v1/environment`, {
      next: { revalidate: 60 }, signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return false;
    const data = await response.json() as { user_settings?: { attributes?: { username?: { enabled?: boolean } } } };
    return data.user_settings?.attributes?.username?.enabled === true;
  } catch { return false; }
}
