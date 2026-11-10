import { CERTIFICATE_ORIGIN } from "./certificate-presentation.ts";
import { isGlobalKeyShareToken } from "./global-key-share.ts";

export const CERTIFICATE_ID_PATTERN = /^TGPI-[A-Z0-9_-]{8,90}$/;
export const MAX_VERIFICATION_REFERENCE = 2_300;
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

export function readVerificationReference(value: string, sameOrigin?: string) {
  const reference = value.trim();
  if (!reference || reference.length > MAX_VERIFICATION_REFERENCE) return null;
  const certificate = readCertificateReference(reference);
  if (certificate) return { kind: "certificate" as const, href: `/verify/credentials/${encodeURIComponent(certificate)}` };

  let proof = reference;
  let share = reference;
  if (reference.includes("://")) {
    try {
      const url = new URL(reference);
      const official = url.protocol === "https:" && !url.port && registryHosts.has(url.hostname);
      if ((!official && url.origin !== sameOrigin) || url.username || url.password ||
          !/^\/verify\/global-key\/?$/.test(url.pathname)) return null;
      const proofs = url.searchParams.getAll("proof");
      const shares = new URLSearchParams(url.hash.slice(1)).getAll("share");
      if (proofs.length + shares.length !== 1) return null;
      proof = proofs[0] ?? "";
      share = shares[0] ?? "";
    } catch {
      return null;
    }
  }
  if (isGlobalKeyProofReference(proof)) {
    return { kind: "proof" as const, href: `/verify/global-key?proof=${encodeURIComponent(proof)}` };
  }
  if (isGlobalKeyShareToken(share)) {
    return { kind: "share" as const, href: `/verify/global-key#share=${share}` };
  }
  return null;
}
