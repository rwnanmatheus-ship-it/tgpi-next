type PremiumPreviewAccessInput = {
  allowedUserIds: string | undefined;
  requestHost: string | null | undefined;
  uid: string;
  vercelEnvironment: string | undefined;
};

const VERCEL_PREVIEW_HOST_SUFFIX = ".vercel.app";

function normalizeHost(value: string | null | undefined) {
  const firstHost = value?.split(",")[0]?.trim().toLowerCase() || "";
  if (!firstHost) return "";

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

export function canGrantPremiumPreviewAccess({
  allowedUserIds,
  requestHost,
  uid,
  vercelEnvironment,
}: PremiumPreviewAccessInput) {
  if (!uid || vercelEnvironment !== "preview") return false;

  const host = normalizeHost(requestHost);
  if (!host || !host.endsWith(VERCEL_PREVIEW_HOST_SUFFIX)) return false;
  if (host === VERCEL_PREVIEW_HOST_SUFFIX.slice(1)) return false;

  return parseAllowedUserIds(allowedUserIds).has(uid);
}
