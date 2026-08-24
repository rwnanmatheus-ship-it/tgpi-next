type FounderAccessInput = {
  allowedUserIds: string | undefined;
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

function parseAllowedUserIds(value: string | undefined) {
  return new Set(
    (value || "")
      .split(/[,\s]+/)
      .map((entry) => entry.trim())
      .filter(Boolean),
  );
}

export function canGrantFounderAccess({
  allowedUserIds,
  requestHost,
  uid,
  vercelEnvironment,
}: FounderAccessInput) {
  if (!uid || vercelEnvironment !== "production") return false;

  const host = normalizeHost(requestHost);
  if (!TGPI_PRODUCTION_HOSTS.has(host)) return false;

  return parseAllowedUserIds(allowedUserIds).has(uid);
}
