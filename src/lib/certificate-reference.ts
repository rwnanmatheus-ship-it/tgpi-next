import { CERTIFICATE_ORIGIN } from "./certificate-presentation.ts";

export const CERTIFICATE_ID_PATTERN = /^TGPI-[A-Z0-9_-]{8,90}$/;
const globalIdPattern = /^TGPI-(?:[A-F0-9]{4}-){2}[A-F0-9]{4}$/;
const registryHosts = new Set([new URL(CERTIFICATE_ORIGIN).hostname, "theglobalpolymath.com"]);

export function normalizeCertificateId(value: string) {
  if (!/^TGPI-[A-Z0-9_-]{8,90}$/i.test(value)) return null;
  const id = value.toUpperCase();
  return CERTIFICATE_ID_PATTERN.test(id) && !globalIdPattern.test(id) ? id : null;
}

export function readCertificateReference(value: string) {
  const reference = value.trim();
  if (reference.length > 512) return null;
  const direct = normalizeCertificateId(reference);
  if (direct) return direct;

  try {
    const url = new URL(reference);
    if (url.protocol !== "https:" || url.username || url.password || url.port || !registryHosts.has(url.hostname)) return null;
    const match = url.pathname.match(/^\/verify\/(?:credentials\/)?([^/]+)\/?$/);
    return match ? normalizeCertificateId(decodeURIComponent(match[1])) : null;
  } catch {
    return null;
  }
}

export function isGlobalKeyProofReference(value: string) {
  return value.length <= 2048 && /^TGK1\.[AB]\.[A-Za-z0-9_-]+$/.test(value);
}
