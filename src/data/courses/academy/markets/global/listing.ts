import type { CourseOverview } from '@/types/course-overview';
import { courseArtwork } from '@/lib/cinematic-art';
import { courseRegions } from '@/lib/learning/course-regions';
import { PREMIUM_SPECIALIZATIONS_SERIES } from '@/lib/learning/catalog-filters';
import { globalCatalog } from './catalog';
import { globalWorkload } from './types';

const goals = { ai: 'future-of-work', cyber: 'future-of-work', data: 'decision-intelligence', energy: 'global-economics', care: 'decision-intelligence', industry: 'future-of-work', logistics: 'global-economics', quality: 'decision-intelligence', business: 'global-economics', content: 'global-mobility' } as const;
export const globalCourseIds: ReadonlySet<string> = new Set(globalCatalog.map(course => course.id));
export const globalOverview: CourseOverview[] = globalCatalog.map(course => ({
  id: course.id, title: course.title, goal: goals[course.track], series: PREMIUM_SPECIALIZATIONS_SERIES,
  professionalArea: course.track, marketRegion: course.region, category: course.role,
  goalLabel: `Contexto regional: ${courseRegions.find(([id]) => id === course.region)?.[1] ?? course.region}`,
  desc: `Aprenda ${course.title.toLocaleLowerCase('pt-BR')} com método técnico, exemplo resolvido, caso simulado e seis entregáveis integrados.`,
  audience: `Profissionais e estudantes interessados na atuação de ${course.role.toLocaleLowerCase('pt-BR')}. Consulte pré-requisitos e escopo antes de iniciar.`,
  benefits: ['Aplicar um método técnico a um caso ocupacional específico.', 'Construir seis entregáveis e testar uma variante independente.', 'Revisar evidências, limites e condições de transferência.'],
  duration: `${globalWorkload.hours}h`, lessonCount: globalWorkload.lessons,
  format: '60h estimadas de trabalho autônomo: 12h de fundamentos, 12h de prática técnica, 17h de projeto, 3h de revisão aplicada, 14h de portfólio e 2h de avaliação.',
  href: `/courses/${course.id}`, image: courseArtwork(course.id), imageAlt: `Ilustração fotográfica do curso ${course.title}`,
  level: 'Formação aplicada complementar', releaseLabel: 'Premium · Conteúdo em português', status: 'available',
  learningPolicy: { kind: 'practice', publicationStatus: 'published', accessPolicy: 'premium', assessmentPolicy: 'automatic_assessment', credentialStatus: 'criteria_available', instructionLanguage: 'pt-BR' },
}));
