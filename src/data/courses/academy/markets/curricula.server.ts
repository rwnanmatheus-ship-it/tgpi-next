import 'server-only';
import type { AcademyCourse, AcademyLesson, AcademyPrivateQuestion, CaseSpec } from '@/lib/learning/academy/types';
import { courseArtwork } from '@/lib/cinematic-art';
import { practiceLabs } from '../practice/labs.server';
import { marketSpecs } from './specs.server';
import { marketTracks } from './tracks.server';
import { marketWorkload, type MarketCourseSpec } from './types';

const commonScope = 'Formação livre complementar da TGPI com avaliação automática de conhecimentos e portfólio produzido pelo aluno. O certificado registra a conclusão segundo os critérios da plataforma; não equivale a graduação, licença profissional, acreditação externa ou revisão humana do projeto. As 40 horas são estimativa de estudo e trabalho autônomo, não horas de vídeo. Fundamentos da mesma área são compartilhados; caso, entregáveis e projeto são específicos de cada curso. Conteúdo autoral disponível em português.';

export function marketAcademy(version: string, specs: readonly MarketCourseSpec[] = marketSpecs) {
  return specs.map(spec => {
    const track = marketTracks[spec.track];
    if (!track) throw new Error(`Unknown market track: ${spec.track}`);
    const questions: AcademyPrivateQuestion[] = [];
    const references = [...track.sources];
    const question = (lessonId: string, prompt: string, correct: string, wrong: string, alternative: string, explanation: string) => {
      questions.push({ id: `${lessonId}-check`, lessonId, prompt, essential: true, language: 'pt-BR',
        options: [correct, wrong, alternative].map((label, index) => ({ id: `choice-${index}`, label })),
        correctOptionId: 'choice-0', explanation });
    };
    const lessons: AcademyLesson[] = track.units.map(([title, method, example, correct, wrong, alternative], index) => {
      const id = `${spec.id}-market-${index + 1}`;
      const task = spec.tasks[index];
      question(id, `${example} Qual é a próxima decisão sustentada pelo caso?`, correct, wrong, alternative, `${correct} ${method}`);
      return {
        id, title: `${index + 1}. ${title}`, objective: `Produzir: ${task}.`, minutes: marketWorkload.labMinutes,
        language: 'pt-BR', foundation: true, references,
        sections: [
          { title: 'Método da área', body: method },
          { title: 'Exemplo resolvido', body: `${example} ${correct} Justificativa: ${method}`, workedExample: true },
          { title: 'Caso ocupacional do curso', body: spec.scenario },
          { title: 'Aplicação à função', body: `Atuação de referência: ${spec.role}. Sua entrega nesta etapa é: ${task}. Aplique o método ao caso do curso, diferenciando fatos fornecidos, hipóteses e dados que ainda precisariam ser obtidos. Se um requisito não se aplicar, explique por quê; não crie uma observação ou autorização que o caso não fornece.` },
          { title: 'Roteiro de estudo e execução', body: '20 min: estudar o método e localizar na referência um conceito relevante. 20 min: refazer o exemplo e explicar uma alternativa incorreta. 50 min: construir o entregável do seu caso. 20 min: conferir unidades, estados e requisitos e revisar um erro. 10 min: registrar evidência e responder à checagem. As referências aprofundam o estudo; se uma página mudar, registre a lacuna e use a segunda fonte, sem inventar conteúdo.' },
          { title: 'Critérios de qualidade da entrega', body: 'O arquivo ou registro deve explicitar finalidade, entradas, regra aplicada, saída, teste e limite. Cada número de destaque deve ser reproduzível. Cada decisão deve citar a evidência ou ser marcada como hipótese. Não considere apenas aparência ou extensão. Use planilha, documento ou pseudocódigo legível; nenhuma ferramenta paga é obrigatória.' },
        ],
        practice: [
          `Construa ${task.toLocaleLowerCase('pt-BR')} para o caso fornecido. Inclua uma tabela de pelo menos seis registros sintéticos, com identificadores e estado, ou seis requisitos rastreáveis quando não houver fluxo numérico. Não registre esses dados inventados como observações de mercado.`,
          `Teste a entrega sob a alteração: ${spec.changedConstraint} Registre o resultado esperado antes do teste, a mudança necessária e o risco que permanece.`,
          'Compare sua solução com o método e com o exemplo resolvido. Identifique um erro concreto, corrija-o e explique por que a correção muda ou preserva a decisão. Se não encontrou erro, teste um caso de fronteira: ausência, duplicação, prazo ou permissão.',
        ],
        deliverable: `${task}: versão inicial, teste, revisão e nota de limite. Preserve os seis entregáveis para o projeto integrado.`,
      };
    });
    const projectBrief = `Construa um dossiê de atuação para ${spec.role.toLocaleLowerCase('pt-BR')}. ${spec.scenario} Integre os seis entregáveis: ${spec.tasks.join('; ')}. Faça uma versão inicial, um teste sob restrição alterada e uma revisão justificada. Não apresente a simulação como experiência profissional real.`;
    const stages = [
      { title: 'Projeto I — escopo e desenho', objective: 'Definir problema, fronteira e plano de evidências.',
        body: `Use o caso ocupacional e os seis entregáveis. Nos primeiros 90 minutos, construa uma matriz com tarefa, entrada, método, saída e teste. Nos 45 minutos seguintes, registre cinco hipóteses e três limites de atuação. Nos 120 minutos seguintes, produza o primeiro e o segundo entregáveis e confira sua consistência. Entregue o escopo e a matriz junto das fontes e suas datas de consulta.`,
        correct: 'Separar fatos do caso, hipóteses e evidências ainda necessárias antes de executar o plano.', wrong: 'Preencher lacunas com observações inventadas e apresentá-las como dados reais.' },
      { title: 'Projeto II — construção e integração', objective: 'Integrar artefatos sem perder identidade, unidades ou versão.',
        body: `Dedique 90 minutos à construção do terceiro e quarto entregáveis, 45 minutos à integração com os anteriores e 120 minutos à revisão cruzada. Mantenha identificadores, definições, unidades e versões consistentes. Prepare um índice que permita sair de uma conclusão e localizar sua entrada. Se uma ferramenta não estiver disponível, use tabela ou pseudocódigo e identifique o que não foi executado.`,
        correct: 'Preservar definições e identificadores e reconciliar os resultados entre os entregáveis.', wrong: 'Combinar resultados incompatíveis porque cada arquivo parece correto isoladamente.' },
      { title: 'Projeto III — decisão e teste de estresse', objective: 'Defender uma decisão do caso e testá-la sob nova restrição.',
        body: `Produza o quinto e sexto entregáveis em 90 minutos. Reserve 45 minutos para elaborar uma decisão com pelo menos uma alternativa rejeitada e sua justificativa. Em 120 minutos, repita o teste sob esta alteração: ${spec.changedConstraint} Compare versão inicial e revisada, explique a causa da diferença e registre o que precisaria de validação profissional externa.`,
        correct: spec.decision, wrong: spec.misconception },
      { title: 'Projeto IV — revisão e transferência', objective: 'Entregar um pacote utilizável por outra pessoa.',
        body: `Use 90 minutos para revisar o dossiê pelos critérios de finalidade, rastreabilidade, teste, correção e limites. Em 45 minutos, escreva um memorando de decisão de até uma página. Nos 45 minutos seguintes, prepare instruções para um colega reproduzir a análise. Em 60 minutos, registre três lacunas de competência e um plano de estudo ou validação. Nos 15 minutos finais, reproduza uma conclusão usando somente as instruções de entrega e registre qualquer ajuste necessário. A autoavaliação é parte do estudo; a plataforma não afirma que um especialista revisou seus arquivos.`,
        correct: 'Entregar a versão, as entradas, os testes, os limites e o próximo responsável de forma rastreável.', wrong: 'Declarar validação profissional porque o texto passou na checagem automática.' },
    ];
    for (const [index, stage] of stages.entries()) {
      const id = `${spec.id}-market-project-${index + 1}`;
      question(id, index === 2 ? `${spec.scenario} Qual decisão é sustentada pelos fatos?` : `${stage.objective} Qual procedimento permite avaliar essa entrega?`,
        stage.correct, stage.wrong, 'Omitir dados e restrições que dificultam a conclusão desejada.', `${stage.correct} Verifique entradas, condições e limites; o resultado precisa ser sustentado pelo caso.`);
      lessons.push({ id, title: stage.title, objective: stage.objective, minutes: marketWorkload.projectStageMinutes, language: 'pt-BR', foundation: false, project: true, references,
        sections: [{ title: 'Briefing integrado', body: projectBrief }, { title: 'Execução da etapa', body: stage.body },
          { title: 'Registro de tempo e evidência', body: 'O roteiro soma 255 minutos estimados por etapa. Registre o tempo real e preserve revisão e testes. Se precisar de mais tempo, continue no seu ritmo: a estimativa não é um prazo de entrega nem uma garantia de domínio profissional.' }],
        practice: [stage.objective, `Documente como a etapa se relaciona com: ${spec.tasks[index]}. Inclua o teste, sua expectativa e o resultado observado na simulação.`],
        deliverable: `${stage.title}: artefato, evidência de teste e revisão justificada.` });
    }
    const baseline: AcademyCourse = { id: spec.id, version, title: spec.title,
      description: `Formação aplicada de ${marketWorkload.hours}h estimadas para desenvolver um projeto de ${spec.role.toLocaleLowerCase('pt-BR')}. ${spec.scenario}`,
      outcomes: [...spec.tasks], lessons, minutes: lessons.reduce((sum, lesson) => sum + lesson.minutes, marketWorkload.portfolioMinutes + marketWorkload.assessmentMinutes), portfolioMinutes: marketWorkload.portfolioMinutes,
      assessmentMinutes: marketWorkload.assessmentMinutes, language: 'pt-BR', image: courseArtwork(spec.id), projectBrief,
      prerequisite: track.prerequisite, scopeNotice: `${track.scope} ${commonScope}` };
    const applied = practiceLabs(baseline, [spec.scenario, spec.decision, spec.changedConstraint, `Entregue os seis artefatos: ${spec.tasks.join('; ')}. Inclua entradas, testes e limites.`]);
    const course = { ...baseline, minutes: marketWorkload.hours * 60, lessons: [...lessons, ...applied.lessons] };
    if (course.minutes !== course.lessons.reduce((sum, lesson) => sum + lesson.minutes, course.portfolioMinutes + course.assessmentMinutes)) {
      throw new Error(`Market workload mismatch: ${spec.id}`);
    }
    const calculation: CaseSpec = {
      prompt: `Na revisão simulada de um projeto de ${spec.role.toLocaleLowerCase('pt-BR')}, foram verificados {a} registros e {b} apresentaram o desvio definido antes da análise. Qual é o percentual de registros com desvio? Arredonde para duas casas decimais.`,
      operation: 'percent', unit: '%', explanation: 'Divida os registros com desvio pelo total verificado e multiplique por 100. A taxa da amostra não demonstra prevalência em toda a população.' };
    return { course, questions: [...questions, ...applied.questions], calculation };
  });
}
