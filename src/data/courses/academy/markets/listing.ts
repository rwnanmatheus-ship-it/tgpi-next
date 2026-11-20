import { globalOverview } from './global/listing';
import { globalCatalog } from './global/catalog';
import { courseArtwork } from '@/lib/cinematic-art';
import type { CourseOverview } from '@/types/course-overview';
import { marketCatalog } from './catalog';
import { marketWorkload } from './types';
import { PREMIUM_SPECIALIZATIONS_SERIES } from '@/lib/learning/catalog-filters';

const goals = { ai: 'future-of-work', cyber: 'future-of-work', data: 'decision-intelligence', energy: 'global-economics', care: 'decision-intelligence', industry: 'future-of-work', logistics: 'global-economics', quality: 'decision-intelligence', business: 'global-economics', content: 'global-mobility' } as const;

export const marketCourseIds: ReadonlySet<string> = new Set([...marketCatalog, ...globalCatalog].map(course => course.id));
export const marketOverview: CourseOverview[] = [...globalOverview, ...marketCatalog.map<CourseOverview>(course => ({
  id: course.id, title: course.title, goal: goals[course.track], series: PREMIUM_SPECIALIZATIONS_SERIES, professionalArea: course.track,
  category: course.role, goalLabel: 'Formação aplicada para novos mercados',
  desc: `Desenvolva um projeto simulado de ${course.title.toLocaleLowerCase('pt-BR')}, com seis entregáveis, análise de exceções e evidências rastreáveis.`,
  audience: `Profissionais e estudantes interessados na atuação de ${course.role.toLocaleLowerCase('pt-BR')}. Consulte os pré-requisitos e os limites de atuação na apresentação.`,
  benefits: ['Construir seis entregáveis de um caso ocupacional.', 'Testar uma mudança de restrição e revisar a proposta.', 'Documentar evidências, limites e próximos passos de desenvolvimento.'],
  duration: `${marketWorkload.hours}h`, format: '40h estimadas: 12h de estudo e laboratórios, 17h de projeto, 3h de prática, 6h de portfólio e 2h de avaliação.',
  lessonCount: marketWorkload.lessons, href: `/courses/${course.id}`, image: courseArtwork(course.id),
  imageAlt: '', level: 'Formação aplicada complementar', releaseLabel: 'Premium · Conteúdo em português', status: 'available',
  learningPolicy: { kind: 'practice', publicationStatus: 'published', accessPolicy: 'premium', assessmentPolicy: 'automatic_assessment', credentialStatus: 'criteria_available', instructionLanguage: 'pt-BR' },
}))];
