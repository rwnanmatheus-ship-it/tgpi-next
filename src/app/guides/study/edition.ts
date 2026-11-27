import type { Metadata } from "next";
import { studyAlternates, studyLocales, studyOrigin, studyPath, studyReviewed } from "@/data/study-guides";

export type Edition = (typeof studyLocales)[number];
export const languageNames = { en: "English", pt: "Português", es: "Español" };
export const languageTags = { en: "en", pt: "pt-BR", es: "es" };
const socialLocales = { en: "en_US", pt: "pt_BR", es: "es_ES" };
export const hubCover = "/images/study-guides/world-study.webp";

export const labels = {
  en: {
    enem: "Applying with a Brazilian high-school qualification?", enemLink: "Read the ENEM guide to Portugal and Spain (Portuguese)",
    guides: "Guides", hub: "Study abroad", title: "Study abroad: undergraduate guides by country",
    description: "Compare admission routes, language requirements, costs and deadlines for an undergraduate degree abroad. Choose a destination and check its official sources.",
    directories: "Choose a destination", languages: "Read in another language", breadcrumb: "Breadcrumb",
    art: "Editorial illustration created with AI.", verified: "Reviewed", by: "The Global Polymath Institute",
    contents: "In this guide", sources: "Official sources", faq: "Questions before you apply",
    photo: "Photography", license: "License", research: "Continue your research", compare: "Compare study destinations",
    profile: "Explore the country profile", more: "More study guides", all: "All destinations",
  },
  pt: {
    enem: "Fez o ensino médio no Brasil?", enemLink: "Comparar Portugal e Espanha no guia do Enem",
    guides: "Guias", hub: "Estudar no exterior", title: "Estudar no exterior: guias de graduação por país",
    description: "Compare formas de ingresso, exigências de idioma, custos e prazos para cursar uma graduação no exterior. Escolha um destino e consulte as fontes oficiais.",
    directories: "Escolha um destino", languages: "Ler em outro idioma", breadcrumb: "Caminho da página",
    art: "Ilustração editorial criada com IA.", verified: "Revisado em", by: "The Global Polymath Institute",
    contents: "Neste guia", sources: "Fontes oficiais", faq: "Dúvidas antes da candidatura",
    photo: "Fotografia", license: "Licença", research: "Continue sua pesquisa", compare: "Comparar destinos de estudo",
    profile: "Explorar o perfil do país", more: "Outros guias de estudo", all: "Todos os destinos",
  },
  es: {
    enem: "¿Cursaste la secundaria en Brasil?", enemLink: "Consultar la guía del ENEM para Portugal y España (en portugués)",
    guides: "Guías", hub: "Estudiar en el extranjero", title: "Estudiar en el extranjero: guías de grado por país",
    description: "Compara vías de acceso, requisitos de idioma, costes y plazos para cursar un grado en el extranjero. Elige un destino y consulta las fuentes oficiales.",
    directories: "Elige un destino", languages: "Leer en otro idioma", breadcrumb: "Ruta de navegación",
    art: "Ilustración editorial creada con IA.", verified: "Revisado el", by: "The Global Polymath Institute",
    contents: "En esta guía", sources: "Fuentes oficiales", faq: "Preguntas antes de solicitar plaza",
    photo: "Fotografía", license: "Licencia", research: "Continúa tu investigación", compare: "Comparar destinos de estudio",
    profile: "Explorar el perfil del país", more: "Otras guías de estudio", all: "Todos los destinos",
  },
};

export function editionMetadata(lang: Edition, title: string, description: string,
  cover: { src: string; width: number; height: number; caption: string }, slug?: string): Metadata {
  const canonical = studyOrigin + studyPath(lang, slug);
  const images = [{ url: studyOrigin + cover.src, width: cover.width, height: cover.height, alt: cover.caption }];
  return {
    title: { absolute: title + " | TGPI" }, description,
    alternates: { canonical, languages: studyAlternates(slug), types: { "application/rss+xml": studyOrigin + "/feed.xml" } },
    openGraph: {
      ...(slug ? { type: "article", publishedTime: studyReviewed, modifiedTime: studyReviewed, authors: [studyOrigin + "/about"] } as const : { type: "website" } as const),
      url: canonical, title, description, images, siteName: "TGPI", locale: socialLocales[lang],
      alternateLocale: studyLocales.filter(other => other !== lang).map(other => socialLocales[other]),
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export const directoryCover = (lang: Edition) => ({
  src: hubCover, width: 1536, height: 1024, caption: labels[lang].art,
});

const photoTranslations: Record<string, { pt: string; es: string }> = {
  "Buenos Aires": { pt: "Buenos Aires", es: "Buenos Aires" },
  "Rio de Janeiro": { pt: "Rio de Janeiro", es: "Río de Janeiro" },
  "Paseo de la Reforma, Mexico City": { pt: "Paseo de la Reforma, Cidade do México", es: "Paseo de la Reforma, Ciudad de México" },
  "Dal Lake, Srinagar": { pt: "Lago Dal, em Srinagar", es: "Lago Dal, en Srinagar" },
  "Milford Sound": { pt: "Milford Sound", es: "Milford Sound" },
  "Gyeongbokgung, Seoul": { pt: "Gyeongbokgung, em Seul", es: "Gyeongbokgung, en Seúl" },
  "Brooklyn Bridge stretches across the East River toward Manhattan.": {
    pt: "A Ponte do Brooklyn cruza o East River em direção a Manhattan.",
    es: "El puente de Brooklyn cruza el East River en dirección a Manhattan.",
  },
  "London’s skyline rises beyond a bridge over the Thames.": {
    pt: "O horizonte de Londres visto além de uma ponte sobre o Tâmisa.",
    es: "El perfil de Londres se alza al otro lado de un puente sobre el Támesis.",
  },
  "Snow-capped Mount Fuji reflects in the still water of Lake Kawaguchi.": {
    pt: "O Monte Fuji coberto de neve se reflete nas águas calmas do lago Kawaguchi.",
    es: "El monte Fuji nevado se refleja en las aguas tranquilas del lago Kawaguchi.",
  },
  "Rocky slopes overlook Cape Town and Lion’s Head.": {
    pt: "Encostas rochosas dominam a vista da Cidade do Cabo e do pico Lion’s Head.",
    es: "Las laderas rocosas dominan la vista de Ciudad del Cabo y el pico Lion’s Head.",
  },
  "Rocky peaks and evergreens frame the turquoise water of Moraine Lake.": {
    pt: "Picos rochosos e coníferas cercam as águas turquesa do lago Moraine.",
    es: "Picos rocosos y coníferas rodean las aguas turquesas del lago Moraine.",
  },
  "Illuminated brick warehouses line a canal in Hamburg’s Speicherstadt.": {
    pt: "Armazéns de tijolos iluminados margeiam um canal no bairro Speicherstadt, em Hamburgo.",
    es: "Almacenes de ladrillo iluminados bordean un canal del barrio de Speicherstadt, en Hamburgo.",
  },
  "The Eiffel Tower stands beside the Seine in the evening light.": {
    pt: "A Torre Eiffel à margem do Sena, ao entardecer.",
    es: "La torre Eiffel junto al Sena al atardecer.",
  },
  "Ferries cross Sydney Harbour between the Opera House and the city skyline.": {
    pt: "Balsas atravessam a baía de Sydney entre a Ópera e o horizonte da cidade.",
    es: "Los ferris cruzan la bahía de Sídney entre la Ópera y el perfil urbano.",
  },
};

export function localizedPhotoCaption(lang: Edition, original: string) {
  const translated = lang === "en" ? undefined : photoTranslations[original]?.[lang];
  return { text: translated ?? original, tag: translated ? languageTags[lang] : "en" };
}
