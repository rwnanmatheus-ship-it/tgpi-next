import { normalizeSitePath } from "@/seo/config";

export const tgpiUrls = {
  about: () => "/about",
  authority: () => "/authority",
  compare: () => "/compare",
  contact: () => "/contact",
  country: (slug: string) => normalizeSitePath(`/countries/${slug}`),
  countries: () => "/countries",
  course: (id: string) => normalizeSitePath(`/courses/${id}`),
  courses: () => "/courses",
  editorialPolicy: () => "/editorial-policy",
  founder: () => "/founder",
  home: () => "/",
  passport: () => "/passport",
  pricing: () => "/pricing",
  privacy: () => "/privacy",
  resources: () => "/resources",
  search: () => "/search",
  terms: () => "/terms",
  why: () => "/why",
} as const;
