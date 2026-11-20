import 'server-only';
import type { AcademyLesson, AcademyPrivateQuestion } from '@/lib/learning/academy/types';
import { marketAcademy } from '../curricula.server';
import { globalSpecs } from './specs.server';
import { globalWorkload } from './types';

/** Shared occupational foundations plus a separately authored technical practicum. */
export function globalAcademy(version: string) {
  const byId = new Map(globalSpecs.map(spec => [spec.id, spec]));
  return marketAcademy(version, globalSpecs).map(entry => {
    const spec = byId.get(entry.course.id);
    if (!spec) throw new Error(`Missing global practicum: ${entry.course.id}`);
    const references = [...new Set([...spec.sources, ...entry.course.lessons[0].references])];
    const additions: AcademyLesson[] = [
      {
        id: `${spec.id}-technical-method`, title: 'Prática técnica — método e reprodução',
        objective: `Aplicar o método de ${spec.title.toLocaleLowerCase('pt-BR')} ao caso e produzir ${spec.tasks[0].toLocaleLowerCase('pt-BR')}.`,
        minutes: globalWorkload.technicalLessonMinutes, language: 'pt-BR', foundation: false, references,
        sections: [
          { title: 'Método técnico específico', body: spec.method },
          { title: 'Caso de trabalho', body: spec.scenario },
          { title: 'Plano das seis horas de trabalho', body: '60 min: estudar o método, definir os termos e consultar as duas fontes técnicas. 90 min: reproduzir o procedimento com entradas sintéticas identificadas. 90 min: construir os dois primeiros entregáveis. 60 min: executar testes de fronteira e reconciliar resultados. 60 min: revisar, registrar uma correção e preparar instruções de reprodução. As leituras são aprofundamento; o método e o caso permanecem disponíveis nesta aula. Registre qualquer requisito local que precise de validação antes de aplicação real.' },
        ],
        practice: [
          `Produza ${spec.tasks[0]} e ${spec.tasks[1]}. Explicite entrada, unidade, transformação e critério de aceite.`,
          `Reexecute com a alteração: ${spec.changedConstraint} Compare entradas, decisão e limites em duas versões.`,
          'Registre um teste que rejeite uma alternativa inadequada e explique qual observação mudaria sua conclusão.',
        ], deliverable: `${spec.tasks[0]}; ${spec.tasks[1]}; memória de execução e testes.`,
      },
      {
        id: `${spec.id}-technical-example`, title: 'Prática técnica — exemplo resolvido e transferência',
        objective: `Reproduzir e criticar a resolução do caso de ${spec.role.toLocaleLowerCase('pt-BR')}.`,
        minutes: globalWorkload.technicalLessonMinutes, language: 'pt-BR', foundation: false, references,
        sections: [
          { title: 'Exemplo técnico resolvido', body: spec.workedExample, workedExample: true },
          { title: 'Teste de uma mudança', body: spec.changedConstraint },
          { title: 'Plano das seis horas de trabalho', body: '60 min: reproduzir o exemplo, conferir cada cálculo e explicitar premissas. 90 min: construir o terceiro e quarto entregáveis. 90 min: criar uma variante do caso com seis entradas sintéticas novas e registrar o resultado esperado antes de executar. 60 min: comparar solução inicial e variante e investigar diferenças. 60 min: corrigir e documentar os limites da transferência. Identifique explicitamente valores inventados; não os apresente como dados de empresas, trabalhadores ou mercado.' },
        ],
        practice: [
          `Desenvolva ${spec.tasks[2]} e ${spec.tasks[3]} usando o método e o exemplo, justificando as escolhas.`,
          `Explique por que esta proposta falha: ${spec.misconception}`,
          `Construa uma variante em que a decisão inicial precise ser reavaliada. Use a restrição: ${spec.changedConstraint}`,
        ], deliverable: `${spec.tasks[2]}; ${spec.tasks[3]}; variante independente com teste e revisão.`,
      },
    ];
    const privateQuestions: AcademyPrivateQuestion[] = additions.map((lesson, index) => ({
      id: `${lesson.id}-check`, lessonId: lesson.id, essential: true, language: 'pt-BR',
      prompt: index === 0 ? `${spec.scenario} Qual decisão atende aos fatos apresentados?` : `${spec.scenario} Qual proposta deve ser rejeitada à luz do método e do exemplo?`,
      options: (index === 0 ? [spec.decision, spec.misconception, 'Substituir os fatos fornecidos por uma previsão não verificada e tratar a simulação como resultado observado.'] : [spec.misconception, spec.decision, 'Registrar as hipóteses separadamente e pedir validação quando um requisito não puder ser confirmado.']).map((label, i) => ({ id: `option-${i}`, label })),
      correctOptionId: 'option-0', explanation: `${spec.decision} ${spec.workedExample}`,
    }));
    const lessons = [additions[0], ...entry.course.lessons.slice(0, 6), additions[1], ...entry.course.lessons.slice(6)]
      .map(lesson => ({ ...lesson, references }));
    const course = {
      ...entry.course, lessons, minutes: globalWorkload.hours * 60,
      portfolioMinutes: entry.course.portfolioMinutes + globalWorkload.extraPortfolioMinutes,
      description: `Formação aplicada complementar de 60h estimadas em ${spec.title.toLocaleLowerCase('pt-BR')}. Caso simulado, método técnico, exemplo resolvido e seis entregáveis.`,
      projectBrief: `${entry.course.projectBrief} Portfólio estendido: reserve oito horas adicionais para produzir os dois últimos entregáveis, reproduzir o conjunto com uma variante independente, realizar revisão cruzada e redigir um manual de transferência. Registre separadamente quatro horas de construção, duas de teste, uma de revisão e uma de documentação.`,
      scopeNotice: `${entry.course.scopeNotice?.replace('As 40 horas', 'As 60 horas')} A edição de 60h acrescenta 12h de prática técnica específica e 8h de portfólio independente. O foco regional orienta o contexto do estudo; não comprova demanda individual, autorização de trabalho ou reconhecimento profissional local.`,
    };
    if (lessons.length !== globalWorkload.lessons || course.minutes !== lessons.reduce((sum, lesson) => sum + lesson.minutes, course.portfolioMinutes + course.assessmentMinutes)) throw new Error(`Invalid global workload: ${course.id}`);
    return { ...entry, course, questions: [...entry.questions, ...privateQuestions] };
  });
}
