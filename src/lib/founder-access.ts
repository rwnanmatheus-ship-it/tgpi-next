type FounderAccessInput = {
  allowedEmails: string | undefined;
  allowedUserIds: string | undefined;
  email: string | null | undefined;
  emailVerified: boolean;
  requestHost: string | null | undefined;
  uid: string;
  vercelEnvironment: string | undefined;
};

const TGPI_PRODUCTION_HOSTS = new Set([
  "theglobalpolymath.com",
  "www.theglobalpolymath.com",
]);

function normalizeHost(value: string | null | undefined) {
  const firstHost = value?.split(",")[0]?.trim().toLowerCase() || "";

  return firstHost.replace(/:\d+$/, "").replace(/\.$/, "");
}

function parseAllowlist(
  value: string | undefined,
  normalizeEntry: (entry: string) => string,
) {
  return new Set(
    (value || "")
      .split(/[,\s]+/)
      .map((entry) => normalizeEntry(entry.trim()))
      .filter(Boolean),
  );
}

export function canGrantFounderAccess({
  allowedEmails,
  allowedUserIds,
  email,
  emailVerified,
  requestHost,
  uid,
  vercelEnvironment,
}: FounderAccessInput) {
  if (!uid || vercelEnvironment !== "production") return false;

  const host = normalizeHost(requestHost);
  if (!TGPI_PRODUCTION_HOSTS.has(host)) return false;

  const allowedByUserId = parseAllowlist(
    allowedUserIds,
    (entry) => entry,
  ).has(uid);

  if (allowedByUserId) return true;
  if (!emailVerified || !email) return false;

  const normalizedEmail = email.trim().toLowerCase();

  return parseAllowlist(
    allowedEmails,
    (entry) => entry.toLowerCase(),
  ).has(normalizedEmail);
}
