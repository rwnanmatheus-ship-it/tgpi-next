import { professionalCourseDrafts } from "../../data/courses/professional";

/** Founder-authorized early access on 2026-10-31. Pending acceptance is disclosed; assessment controls remain mandatory. */
export const professionalEarlyAccessNotice = "Acesso antecipado: validações pedagógicas, de usabilidade e do fluxo completo de certificação ainda estão em andamento. A carga de 8 horas é estimada. O certificado exige práticas, aprovação no questionário e revisão independente do projeto; o envio não garante aprovação. Não há prazo de devolutiva prometido.";
export const publishedProfessionalCourseIds: readonly string[] = [
  "ia-trabalho-global", "ingles-carreira-internacional", "planilhas-decisoes-profissionais",
  "carreira-internacional-profissional", "analise-dados-power-bi-ia", "gestao-projetos-equipes-globais",
  "marketing-mercados-internacionais", "ciberseguranca-vida-trabalho", "python-automacao-profissionais",
  "comunicacao-negociacao-pensamento-critico",
];

export function getProfessionalCourse(id: string) {
  return professionalCourseDrafts.find(course => course.id === id);
}

export function professionalCourseEnabled(id: string, environment: string | undefined) {
  return Boolean(getProfessionalCourse(id)) && (environment === "preview" || environment === "development" || publishedProfessionalCourseIds.includes(id));
}
