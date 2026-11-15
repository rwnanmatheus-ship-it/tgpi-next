import 'server-only';

import type { AcademyCourse, AcademyLesson, AcademyPrivateQuestion, CaseSpec } from '@/lib/learning/academy/types';
import type { CourseGoal } from '@/types/course-overview';
import { cinematicUrl, courseArtwork } from '@/lib/cinematic-art';
import { assessmentTranslations } from '@/lib/localization/assessment.server';
import { projectLessons } from '../project-stages';
import type { ExpansionCurriculum } from './authoring';
import { expansionCourses, expansionWorkload } from './listing';
import { mobility } from './mobility';
import { decision } from './decision';
import { economics } from './economics';
import { readiness } from './readiness';
import { technology } from './technology';
import { projectCases } from './project-cases';

const projectMessages: Readonly<Record<string, string>> = {
  "Project lab · Scope and baseline": "Laboratório de projeto · Escopo e referência",
  "Define what a usable result looks like and collect the inputs needed to build it.": "Defina como reconhecer um resultado utilizável e reúna os insumos para produzi-lo.",
  "Break the project brief into deliverables. For each one, write a success criterion that someone else can inspect.": "Divida o projeto em entregas. Defina para cada uma um critério que outra pessoa possa verificar.",
  "Prepare fictional inputs or use public sources. Keep a log of assumptions, dates and missing information.": "Prepare dados fictícios ou use fontes públicas. Registre hipóteses, datas e informações faltantes.",
  "Build a small baseline using one method from the course. Save it so you can compare it with the next version.": "Monte uma versão de referência com um método do curso. Salve-a para comparar com a próxima versão.",
  "Save the brief, input log, acceptance criteria and baseline.": "Salve o briefing, o registro de insumos, os critérios de aceitação e a versão de referência.",
  "Project lab · Build and document": "Laboratório de projeto · Construção e registro",
  "Produce a complete first version and make the important decisions traceable.": "Produza uma primeira versão completa e registre as decisões importantes.",
  "Build each deliverable from the brief using the course method. Work in small sections and keep versions.": "Construa cada entrega com o método do curso. Trabalhe em partes e guarde as versões.",
  "Check each section against its criterion before integrating it. Record the input, action and observed output for at least one check per deliverable.": "Confira cada parte antes de integrá-la. Registre entrada, ação e resultado em pelo menos uma verificação por entrega.",
  "Make an alternative for one important design or communication decision. Explain the trade-off and keep the version that best meets your criteria.": "Crie uma alternativa para uma decisão relevante de desenho ou comunicação. Explique a troca e mantenha a versão mais adequada aos critérios.",
  "Save a complete first version, its verification log and one comparison.": "Salve a primeira versão completa, o registro de verificações e uma comparação.",
  "Project lab · Test and revise": "Laboratório de projeto · Teste e revisão",
  "Find a meaningful weakness, revise the work and check whether the revision helped.": "Encontre uma fragilidade relevante, revise o trabalho e verifique se a revisão ajudou.",
  "Run a normal case, a boundary case and a case with missing or contradictory information. Define the expected outcome before each test.": "Execute um caso normal, um caso de limite e um com informação ausente ou contraditória. Defina o resultado esperado antes de cada teste.",
  "Compare expected and observed outcomes. Classify the differences and revise the most consequential weakness.": "Compare resultados esperados e observados. Classifique as diferenças e corrija a fragilidade mais importante.",
  "Repeat the failing case after revision and rerun the baseline. Keep both versions and document any remaining limitation.": "Repita o caso que falhou após a revisão e rode novamente a referência. Guarde as duas versões e registre as limitações restantes.",
  "Save the three test cases, before-and-after evidence and a remaining limitation.": "Salve os três casos, as evidências de antes e depois e uma limitação restante.",
  "Project lab · Transfer and hand over": "Laboratório de projeto · Transferência e entrega",
  "Apply the method in a new situation and explain what someone else needs to reuse it.": "Aplique o método em outra situação e explique como outra pessoa pode reutilizá-lo.",
  "Change one constraint from the original brief. Predict what should carry over and what needs to change.": "Mude uma restrição do briefing original. Preveja o que continua válido e o que deve mudar.",
  "Rebuild the affected part using the new constraint. Compare both results and record where the method stops being reliable.": "Refaça a parte afetada com a nova restrição. Compare os resultados e registre onde o método perde confiabilidade.",
  "Prepare a handover with the final result, evidence, limitations and next action. Walk through it without referring to your notes, then revise unclear steps.": "Prepare uma entrega com resultado, evidências, limites e próxima ação. Apresente sem consultar as anotações e revise os passos pouco claros.",
  "Save a transfer example and a handover another learner can follow.": "Salve um exemplo de transferência e uma entrega que outro aluno consiga seguir.",
  "Applied project brief": "Proposta de projeto aplicado"
};
const projectTranslation = (text: string) => projectMessages[text] ?? text;

export function projectLessonsInPortuguese(id: string, project: string, minutes: number, sources: string[], scenario: string) {
  return projectLessons(id, project, minutes, sources).map(({ lesson, question }) => ({
    lesson: {
      ...lesson,
      title: projectTranslation(lesson.title),
      objective: projectTranslation(lesson.objective),
      sections: [
        { title: 'Projeto aplicado', body: project },
        { title: 'Dados iniciais do projeto', body: scenario },
      ],
      practice: lesson.practice.map(projectTranslation),
      deliverable: projectTranslation(lesson.deliverable),
    },
    question: {
      ...question,
      prompt: assessmentTranslations(question.prompt)['pt-BR'],
      explanation: assessmentTranslations(question.explanation)['pt-BR'],
      options: question.options.map(option => ({ ...option, label: assessmentTranslations(option.label)['pt-BR'] })),
    },
  }));
}

const curricula: Record<string, ExpansionCurriculum> = { ...mobility, ...decision, ...economics, ...readiness, ...technology };

const references: Record<CourseGoal, string[]> = {
  'global-mobility': ['https://educationusa.state.gov/your-5-steps-us-study', 'https://www.coe.int/en/web/common-european-framework-reference-languages'],
  'decision-intelligence': ['https://www.itl.nist.gov/div898/handbook/'],
  'global-economics': ['https://data.worldbank.org/'],
  'future-of-work': ['https://www.nist.gov/itl/ai-risk-management-framework', 'https://www.w3.org/WAI/standards-guidelines/wcag/'],
  'emergency-readiness': ['https://www.ready.gov/plan', 'https://www.ready.gov/business', 'https://www.fema.gov/emergency-managers/national-preparedness/exercises/hseep'],
};

const cases: Record<CourseGoal, CaseSpec> = {
  'global-mobility': {
    prompt: 'Uma instituição fictícia exige {a} horas de prática. Você registrou {b} horas e prevê praticar {c} horas por semana. Em quantas semanas, como valor decimal, você completaria a diferença? Arredonde para duas casas.',
    unit: 'semanas', operation: 'remaining',
    explanation: 'Subtraia as horas registradas do total e divida pelas horas semanais previstas.',
  },
  'decision-intelligence': {
    prompt: 'Ao rever {a} previsões fictícias, {b} ficaram fora do intervalo previsto antes do resultado. Qual percentual ficou fora? Arredonde para duas casas.',
    unit: '%', operation: 'percent',
    explanation: 'Divida o número fora do intervalo pelo total revisto e multiplique por 100.',
  },
  'global-economics': {
    prompt: 'Uma empresa fictícia tem {a} mil unidades monetárias em caixa. Precisa pagar {b} mil imediatamente e tem déficit mensal de {c} mil. Quantos meses o caixa restante cobre? Arredonde para duas casas.',
    unit: 'meses', operation: 'remaining',
    explanation: 'Subtraia o pagamento imediato do caixa e divida pelo déficit mensal.',
  },
  'future-of-work': {
    prompt: 'Seu laboratório verificou {a} registros sintéticos e isolou {b} por falha. Qual percentual foi isolado? Arredonde para duas casas.',
    unit: '%', operation: 'percent',
    explanation: 'Divida os registros isolados pelo total verificado e multiplique por 100.',
  },
  'emergency-readiness': {
    prompt: 'Em um exercício de mesa fictício, {a} mensagens de confirmação foram previstas e {b} não chegaram. Qual percentual de mensagens não chegou? Arredonde para duas casas.',
    unit: '%', operation: 'percent',
    explanation: 'Divida as mensagens que faltaram pelo total previsto no exercício e multiplique por 100.',
  },
};

export function expansionAcademy(version: string) {
  return expansionCourses.map(listing => {
    const { id, title, goal, description, artwork } = listing;
    const { labs, project } = curricula[id];
    const sourceLinks = references[goal];
    const { minutes, labMinutes, portfolioMinutes, assessmentMinutes } = expansionWorkload;

    const questions: AcademyPrivateQuestion[] = [];
    const lessons: AcademyLesson[] = labs.map(([topic, method, example, practice, prompt, correct, distractor, alternative], index) => {
      const lessonId = `${id}-lab-${index + 1}`;
      questions.push({
        id: `${lessonId}-check`, lessonId, prompt, essential: true, correctOptionId: 'option-0',
        options: [correct, distractor, alternative].map((label, i) => ({ id: `option-${i}`, label })),
        explanation: method,
      });
      return {
        id: lessonId, title: topic, objective: practice, minutes: labMinutes, foundation: false,
        sections: [{ title: 'Método', body: method }, { title: 'Caso comentado', body: example }],
        practice: [
          practice,
          'Aplique o mesmo método a um segundo cenário que altere uma condição do caso. Compare os dois resultados e registre o que explica a diferença.',
        ],
        deliverable: 'Salve a aplicação, o teste com a condição alterada, o resultado esperado, o observado e uma correção.',
        references: sourceLinks,
      };
    });

    const projectMinutes = minutes - labs.length * labMinutes - portfolioMinutes - assessmentMinutes;
    for (const { lesson, question } of projectLessonsInPortuguese(id, project, projectMinutes, sourceLinks, projectCases[id])) {
      lessons.push(lesson);
      questions.push(question);
    }

    const course: AcademyCourse = {
      id, version, title, description, outcomes: labs.map(lab => lab[3]), projectBrief: project,
      lessons, minutes, portfolioMinutes, assessmentMinutes,
      language: 'pt-BR', image: courseArtwork(id, cinematicUrl(artwork)),
      ...(goal === 'emergency-readiness' ? {
        scopeNotice: 'Formação teórica de planejamento e simulação de mesa. O certificado TGPI registra conclusão teórica. Treinamentos práticos e habilitações são oferecidos pelas entidades competentes.',
      } : {}),
    };
    return { course, questions, calculation: cases[goal] };
  });
}
