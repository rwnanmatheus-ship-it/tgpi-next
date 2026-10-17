/** Presentation changes never mutate the signed learning record. */
export const CERTIFICATE_DESIGN_VERSION = "2026.2";
export const CERTIFICATE_ORIGIN = "https://www.theglobalpolymath.com";
export const CERTIFICATE_QUALITY_MARKS = [
  { title: "Identity linked", detail: "Bound to a TGPI Global ID" },
  { title: "Assessed learning", detail: "Evidence-backed achievement" },
  { title: "Public verification", detail: "Live issuer record" },
] as const;

export function certificateVerificationUrl(id: string) {
  return `${CERTIFICATE_ORIGIN}/verify/credentials/${encodeURIComponent(id)}`;
}

export function certificateDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
}
