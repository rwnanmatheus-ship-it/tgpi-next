export type StudyLocale = "en" | "pt" | "es";

export type StudyGuideCopy = {
  country: string;
  title: string;
  description: string;
  intro: string;
  alt: string;
  sections: { heading: string; body: string; steps: string[]; sources: number[] }[];
  faq: { question: string; answer: string }[];
};

export type StudyGuide = {
  slug: string;
  countrySlug: string;
  sources: { label: string; url: string }[];
  locales: Record<StudyLocale, StudyGuideCopy>;
};
