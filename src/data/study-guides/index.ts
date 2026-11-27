import catalog from "@/lib/countries/high-resolution-photography.json";
import argentina from "./argentina";
import australia from "./australia";
import brazil from "./brazil";
import canada from "./canada";
import france from "./france";
import germany from "./germany";
import india from "./india";
import japan from "./japan";
import mexico from "./mexico";
import newZealand from "./new-zealand";
import southAfrica from "./south-africa";
import southKorea from "./south-korea";
import unitedKingdom from "./united-kingdom";
import unitedStates from "./united-states";
import type { StudyGuide, StudyLocale } from "./types";

export type { StudyGuide, StudyGuideCopy, StudyLocale } from "./types";

export const studyGuides: StudyGuide[] = [
  argentina, australia, brazil, canada, france, germany, india, japan, mexico,
  newZealand, southAfrica, southKorea, unitedKingdom, unitedStates,
];
export const studyLocales = ["en", "pt", "es"] as const;
export const studyReviewed = "2026-11-27";
export const studyOrigin = "https://www.theglobalpolymath.com";

export function isStudyLocale(value: string): value is StudyLocale {
  return studyLocales.some(locale => locale === value);
}
export function studyReaderLocale(value: string): StudyLocale {
  return value === "pt-BR" ? "pt" : isStudyLocale(value) ? value : "en";
}
export function studyPath(lang: StudyLocale, destination?: string) {
  return `/guides/study/${lang}${destination ? "/" + destination : ""}`;
}
export function studyAlternates(destination?: string) {
  const url = (locale: StudyLocale) => studyOrigin + studyPath(locale, destination);
  return { en: url("en"), "pt-BR": url("pt"), es: url("es"), "x-default": url("en") };
}

export function studyPhoto(countrySlug: string) {
  if (!Object.hasOwn(catalog, countrySlug)) throw new Error(`Missing study guide photo for ${countrySlug}`);
  const { photo, source, asset } = catalog[countrySlug as keyof typeof catalog];
  return {
    src: photo.src, width: asset.width, height: asset.height, caption: photo.alt,
    author: source.photographer, license: source.license,
    sourceUrl: source.url, licenseUrl: source.licenseUrl,
  };
}

export const studyDirectoryLabels = {
  en: "International undergraduate study guides",
  pt: "Guias de graduação no exterior",
  es: "Guías para estudiar una carrera en el extranjero",
};
