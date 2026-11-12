export const emergencyCourseGoal = 'emergency-readiness';

export const emergencyCourses = [
  {
    id: 'primeiros-socorros-rcp-dea',
    title: 'Primeiros Socorros, RCP e DEA — Fundamentos Teóricos',
    description: 'Aprenda a reconhecer emergências, pedir ajuda e tomar decisões iniciais em cenários de primeiros socorros para adultos. Prepare-se para uma formação prática com instrutor.',
    audience: 'Adultos, viajantes, estudantes e equipes.',
    outcomes: ['Reconhecer sinais que exigem ajuda imediata.', 'Organizar uma resposta com divisão de tarefas e entrega ao socorro.', 'Identificar quais habilidades precisam de treino supervisionado.'],
    hours: 16, lessons: 8, practicalTraining: true,
    imageAlt: 'Aluna e instrutor em uma sala de treinamento com manequim adulto e DEA de simulação.',
  },
  {
    id: 'preparacao-desastres',
    title: 'Preparação para Desastres e Evacuação',
    description: 'Crie e teste um plano de emergência adaptado ao seu destino, com alertas oficiais, rotas, abrigo, suprimentos e continuidade familiar.',
    audience: 'Famílias, estudantes internacionais, imigrantes e trabalhadores remotos.',
    outcomes: ['Distinguir riscos locais e interpretar alertas oficiais.', 'Elaborar rotas acessíveis e um plano de comunicação offline.', 'Conduzir um exercício de mesa e corrigir lacunas do plano.'],
    hours: 18, lessons: 9, practicalTraining: false,
    imageAlt: 'Família revisando um mapa de evacuação em casa enquanto chove do lado de fora.',
  },
  {
    id: 'ingles-emergencias',
    title: 'Inglês para Emergências no Exterior',
    description: 'Pratique chamadas simuladas, comunicação de endereço, alertas e entrega de informações em inglês. Inclui roteiros, reformulação e um cartão bilíngue offline.',
    audience: 'Pessoas com inglês básico que pretendem viver ou viajar no exterior.',
    outcomes: ['Comunicar endereço e natureza da emergência em inglês.', 'Confirmar instruções e corrigir mal-entendidos.', 'Criar um cartão bilíngue para usar no destino.'],
    hours: 8, lessons: 6, practicalTraining: false,
    imageAlt: 'Viajante falando ao telefone em uma calçada ao anoitecer.',
  },
  {
    id: 'primeiros-socorros-pediatricos',
    title: 'Primeiros Socorros para Bebês e Crianças — Fundamentos Teóricos',
    description: 'Estude prevenção, reconhecimento de emergências, engasgo, parada cardiorrespiratória e comunicação com a família e o socorro. Prepare-se para a prática pediátrica supervisionada.',
    audience: 'Famílias, cuidadores, au pairs e educadores.',
    outcomes: ['Reconhecer situações que exigem resposta urgente.', 'Diferenciar os contextos de atendimento de bebês e crianças.', 'Preparar um plano de resposta e comunicação para a família ou escola.'],
    hours: 15, lessons: 8, practicalTraining: true,
    imageAlt: 'Cuidadora e instrutora em uma sala de treinamento com manequim infantil.',
  },
  {
    id: 'controle-hemorragias',
    title: 'Controle de Hemorragias Graves — Fundamentos Teóricos',
    description: 'Treine a identificação de sangramento grave, o acionamento do socorro, as decisões de proteção e a comunicação em equipe. Prepare-se para uma oficina presencial.',
    audience: 'Leigos, educadores e equipes de ambientes compartilhados.',
    outcomes: ['Identificar situações que exigem ajuda imediata.', 'Delegar chamada, localização do kit e recepção do socorro.', 'Distinguir reconhecimento teórico de habilidades que exigem simulador.'],
    hours: 8, lessons: 6, practicalTraining: true,
    imageAlt: 'Materiais de treinamento para controle de sangramento em uma bancada.',
  },
  {
    id: 'primeiros-socorros-psicologicos',
    title: 'Primeiros Socorros Psicológicos em Desastres',
    description: 'Aprenda a oferecer apoio humano imediato, identificar necessidades, reduzir barreiras de comunicação e conectar pessoas a serviços após uma crise.',
    audience: 'Voluntários, educadores, famílias e equipes de apoio comunitário.',
    outcomes: ['Pedir consentimento e oferecer apoio respeitoso.', 'Usar a sequência observar, escutar e conectar em cenários simulados.', 'Organizar encaminhamentos e encerrar o atendimento com clareza.'],
    hours: 12, lessons: 7, practicalTraining: false,
    imageAlt: 'Duas pessoas conversando em um centro de apoio após um desastre.',
  },
] as const;

export const practicalScope = 'Formação teórica online. O certificado registra conclusão teórica. Habilidades físicas exigem prática supervisionada e avaliação em um centro de treinamento.';

export function emergencyCover(id: string) {
  return `/images/courses/learning-2026/${id}.webp`;
}
