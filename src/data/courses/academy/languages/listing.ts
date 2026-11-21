import type { CourseOverview } from '@/types/course-overview';
import { languageCatalog, languageWorkload } from './catalog';

export const languageOverview: CourseOverview[] = languageCatalog.map(course => ({
  id:course.id, title:course.title, category:`Idiomas · ${course.languageName}`,
  desc:`${course.outcome} Laboratório temático introdutório com explicações em português, expressões no idioma estudado, prática de recuperação, simulação e avaliação automática.`,
  audience:course.targetCode==='pt'?'Aprendizes estrangeiros que já compreendem instruções simples em português e desejam consolidar comunicação cotidiana.':'Falantes de português que desejam desenvolver comunicação inicial em situações internacionais específicas.',
  benefits:[course.outcome,'Treinar escuta com voz do dispositivo, leitura, escrita e recuperação sem consulta.','Construir um portfólio e retomar o conteúdo após a avaliação.'],
  duration:'6h estimadas',lessonCount:languageWorkload.lessons,
  format:'4h de estudo e exercícios, 1h30 de portfólio e 30min de avaliação; tempo autônomo estimado, sem videoaulas ou aulas ao vivo.',
  goal:'global-mobility',goalLabel:'Idiomas para estudo, trabalho e vida internacional',
  href:`/courses/${course.id}`,image:course.image,imageAlt:`Cena ilustrativa de ${course.title}; imagem gerada para o curso.`,
  level:'Laboratório temático introdutório',releaseLabel:'Premium · Instruções em português',status:'available',
  targetLanguage:course.targetCode,
  learningPolicy:{kind:'practice',publicationStatus:'published',accessPolicy:'premium',assessmentPolicy:'automatic_assessment',credentialStatus:'criteria_available',instructionLanguage:'pt-BR'},
}));
