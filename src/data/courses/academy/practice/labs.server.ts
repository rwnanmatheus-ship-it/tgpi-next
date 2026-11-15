import 'server-only';

import type { AcademyCourse, AcademyLesson, AcademyPrivateQuestion } from '@/lib/learning/academy/types';
import { advancedPractice } from './advanced';
import { corePractice } from './core';
import type { PracticeCase } from './types';
import { practiceWorkload } from './workload';

const cases: Readonly<Record<string, PracticeCase>> = { ...corePractice, ...advancedPractice };

export function practiceLabs(course: AcademyCourse, entry = cases[course.id]) {
  if (!entry) throw new Error(`Missing applied practice case: ${course.id}`);
  const [scenario, workedExample, changedConstraint, evidence] = entry;
  const [guidedMinutes, transferMinutes] = practiceWorkload(course.minutes);
  const guidedId = `${course.id}-guided-practice`;
  const transferId = `${course.id}-independent-transfer`;
  const references = [...new Set(course.lessons.flatMap(lesson => lesson.references))].slice(0, 3);
  const format = { foundation: false, language: 'pt-BR', practiceLab: true, references } as const;
  const lessons: AcademyLesson[] = [
    {
      ...format,
      id: guidedId,
      title: 'Laboratório guiado · Resolver e revisar',
      objective: 'Resolver um caso do curso, comparar o resultado com o exemplo comentado e corrigir uma decisão.',
      minutes: guidedMinutes,
      sections: [
        { title: 'Caso inicial', body: scenario },
        { title: 'Exemplo comentado', body: workedExample, workedExample: true },
        { title: 'Plano de estudo', body: `10 min para recordar o método e ler o caso. ${guidedMinutes - 30} min para construir a primeira solução. 20 min para comparar, corrigir e fazer a checagem.` },
      ],
      practice: [
        'Escreva sua primeira solução sem consultar o exemplo comentado. Indique os dados usados e classifique o que é observado e o que é assumido.',
        'Abra o exemplo comentado, compare os passos e refaça o ponto que mais altera sua decisão. Se as soluções forem diferentes, explique em quais condições cada uma funciona.',
      ],
      deliverable: evidence,
    },
    {
      ...format,
      id: transferId,
      title: 'Laboratório independente · Transferir e testar',
      objective: 'Adaptar a solução a uma mudança no caso e testar quando ela deixa de funcionar.',
      minutes: transferMinutes,
      sections: [
        { title: 'Situação de partida', body: scenario },
        { title: 'Nova condição', body: changedConstraint },
        { title: 'Como verificar', body: 'Declare previamente o que deve mudar e o que deve permanecer. Faça um teste que possa contrariar sua previsão. Use o resultado para revisar a solução e explicitar seus limites.' },
        { title: 'Plano de estudo', body: `15 min para prever o efeito da mudança. ${transferMinutes - 40} min para adaptar a solução e executar o teste. 25 min para revisar, documentar e fazer a checagem.` },
      ],
      practice: [
        changedConstraint,
        'Compare a versão original e a adaptada usando o mesmo critério. Registre um resultado esperado, o observado e a evidência que sustenta sua conclusão.',
        'Inclua no portfólio uma nota que permita a outra pessoa repetir a verificação. Indique a primeira condição que exigiria refazer a análise.',
      ],
      deliverable: `${evidence} Inclua a comparação entre as duas versões e o resultado do teste de transferência.`,
    },
  ];
  function check(lessonId: string, prompt: string, choices: string[], explanation: string): AcademyPrivateQuestion {
    return {
      id: `${lessonId}-check`, lessonId, language: 'pt-BR', prompt, essential: true,
      options: choices.map((label, index) => ({ id: `option-${index}`, label })),
      correctOptionId: 'option-0', explanation,
    };
  }
  const questions = [
    check(guidedId, `Considere o caso inicial. ${scenario} Qual análise melhor sustenta a decisão?`, [
      workedExample,
      'Use apenas o resultado mais favorável ao objetivo original e deixe as informações incompletas para a revisão.',
      'Adote a primeira interpretação razoável e valide a decisão a partir de um exemplo com resultado semelhante.',
    ], workedExample),
    check(transferId, `Você já tem uma solução inicial para o caso. Agora execute a variação. ${changedConstraint} Qual comparação testa o efeito dessa mudança?`, [
      'Aplique o mesmo critério às duas versões, registre a previsão e use os resultados observados para revisar a conclusão.',
      'Ajuste o critério na segunda versão para que as duas entregas atinjam a mesma meta.',
      'Avalie somente a segunda versão e use o resultado final para inferir o que mudou.',
    ], 'Com um critério consistente e uma previsão anterior ao teste, você consegue identificar o efeito da mudança e explicar o que ainda precisa ser verificado.'),
  ];
  return { lessons, questions };
}
