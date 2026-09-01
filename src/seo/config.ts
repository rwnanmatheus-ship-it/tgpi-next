export const TGPI_SITE_URL = "https://www.theglobalpolymath.com" as const;
export const TGPI_SITE_NAME = "TGPI — The Global Polymath Institute" as const;
export const TGPI_SHORT_NAME = "TGPI" as const;
export const TGPI_DEFAULT_TITLE = TGPI_SITE_NAME;
export const TGPI_TITLE_TEMPLATE = "%s | TGPI" as const;
export const TGPI_DESCRIPTION =
  "Compare countries and make smarter global decisions with practical intelligence for living, studying, working and moving abroad." as const;
export const TGPI_LOCALE = "en_US" as const;
export const TGPI_LANGUAGE = "en" as const;
export const TGPI_CONTACT_EMAIL = "contact@theglobalpolymath.com" as const;
export const TGPI_INSTAGRAM_URL =
  "https://www.instagram.com/theglobalpolymath/" as const;

export const TGPI_BRAND = {
  crest: "/brand/tgpi-crest-v2-256.png",
  institutionalImage: "/tgpi-global-hero.png",
  defaultOgImage: "/opengraph-image",
} as const;

export function normalizeSitePath(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? normalized : normalized.replace(/\/+$/, "");
}

export function absoluteUrl(path = "/"): string {
  return new URL(normalizeSitePath(path), TGPI_SITE_URL).toString();
}
