export const GLOBAL_KEY_SHARE_DAYS = [1, 7, 30] as const;
export type GlobalKeyShareDays = typeof GLOBAL_KEY_SHARE_DAYS[number];

export type GlobalKeyShareEntry = {
  id: string;
  revision: number;
  createdAt: string;
  expiresAt: string;
  revokedAt?: string;
};

export function isGlobalKeyShareToken(value: string) {
  return /^TGS1\.[A-Za-z0-9_-]{43}$/.test(value);
}

export function isGlobalKeyShareId(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

export function getGlobalKeyShareStatus(
  share: GlobalKeyShareEntry,
  currentRevision: number,
  now = Date.now(),
) {
  if (share.revokedAt) return "revoked";
  if (!(Date.parse(share.createdAt) <= now && now < Date.parse(share.expiresAt))) return "expired";
  return share.revision === currentRevision ? "active" : "superseded";
}
