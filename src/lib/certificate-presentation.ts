/** Presentation changes never mutate the signed learning record. */
export const CERTIFICATE_DESIGN_VERSION = "2026.3";
export const CERTIFICATE_ORIGIN = "https://www.theglobalpolymath.com";
export const CERTIFICATE_QUALITY_MARKS = [
  { title: "Identity linked", detail: "Bound to a TGPI Global ID" },
  { title: "Assessed learning", detail: "Evidence-backed achievement" },
  { title: "Public verification", detail: "Live issuer record" },
] as const;

export function certificateVerificationUrl(id: string) {
  return `${CERTIFICATE_ORIGIN}/verify/credentials/${encodeURIComponent(id)}`;
}

export function certificateDate(value: string, locale = "en") {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? locale === "pt-BR" ? "Data indisponível" : "Date unavailable"
    : new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
}

