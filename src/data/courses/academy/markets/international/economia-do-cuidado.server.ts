import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "planejamento-de-visitas-de-apoio-domiciliar",
    "scenario": "Quatro visitas de 45 minutos cabem em três horas sem contabilizar viagens.",
    "decision": "Adicionar tempos de deslocamento antes de confirmar a rota.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma pessoa autorizada cancela sua participação com pouco aviso.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de visitas de apoio domiciliar",
      "Base de análise: agenda de apoio por usuário fictício",
      "Conferência de evidências: mapa de disponibilidade e consentimento",
      "Memória de decisão — Quatro visitas de 45 minutos cabem em três horas sem contabilizar viagens",
      "Simulação da mudança: uma pessoa autorizada cancela sua participação com pouco aviso",
      "Relatório de transferência para coordenador de serviços de apoio"
    ]
  },
  {
    "id": "coordenacao-de-transporte-para-centros-de-convivencia",
    "scenario": "Há 14 confirmações e o veículo oferece 12 lugares na configuração aprovada.",
    "decision": "Abrir segunda janela ou outra capacidade antes de prometer transporte.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma pessoa autorizada cancela sua participação com pouco aviso.",
    "tasks": [
      "Dossiê de trabalho — Coordenação de transporte para centros de convivência",
      "Base de análise: agenda de apoio por usuário fictício",
      "Conferência de evidências: mapa de disponibilidade e consentimento",
      "Memória de decisão — Há 14 confirmações e o veículo oferece 12 lugares na configuração aprovada",
      "Simulação da mudança: uma pessoa autorizada cancela sua participação com pouco aviso",
      "Relatório de transferência para coordenador de serviços de apoio"
    ]
  },
  {
    "id": "gestao-de-atividades-em-comunidades-de-idosos",
    "scenario": "Duas atividades atraem o mesmo grupo e ocupam salas de capacidades distintas.",
    "decision": "Combinar preferência declarada, capacidade e horário em uma programação acessível.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma pessoa autorizada cancela sua participação com pouco aviso.",
    "tasks": [
      "Dossiê de trabalho — Gestão de atividades em comunidades de idosos",
      "Base de análise: agenda de apoio por usuário fictício",
      "Conferência de evidências: mapa de disponibilidade e consentimento",
      "Memória de decisão — Duas atividades atraem o mesmo grupo e ocupam salas de capacidades distintas",
      "Simulação da mudança: uma pessoa autorizada cancela sua participação com pouco aviso",
      "Relatório de transferência para coordenador de serviços de apoio"
    ]
  },
  {
    "id": "organizacao-documental-de-redes-de-apoio",
    "scenario": "Dois contatos constam na rede de apoio e apenas um tem autorização vigente.",
    "decision": "Restringir o compartilhamento ao contato e escopo documentados.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma pessoa autorizada cancela sua participação com pouco aviso.",
    "tasks": [
      "Dossiê de trabalho — Organização documental de redes de apoio",
      "Base de análise: agenda de apoio por usuário fictício",
      "Conferência de evidências: mapa de disponibilidade e consentimento",
      "Memória de decisão — Dois contatos constam na rede de apoio e apenas um tem autorização vigente",
      "Simulação da mudança: uma pessoa autorizada cancela sua participação com pouco aviso",
      "Relatório de transferência para coordenador de serviços de apoio"
    ]
  },
  {
    "id": "planejamento-de-refeicoes-entregues-em-domicilio",
    "scenario": "Uma rota entrega 36 refeições mas seis usuários pausaram naquela data.",
    "decision": "Conferir lista ativa e ajustar expedição para 30 se não houver pedidos extras.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma pessoa autorizada cancela sua participação com pouco aviso.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de refeições entregues em domicílio",
      "Base de análise: agenda de apoio por usuário fictício",
      "Conferência de evidências: mapa de disponibilidade e consentimento",
      "Memória de decisão — Uma rota entrega 36 refeições mas seis usuários pausaram naquela data",
      "Simulação da mudança: uma pessoa autorizada cancela sua participação com pouco aviso",
      "Relatório de transferência para coordenador de serviços de apoio"
    ]
  },
  {
    "id": "operacoes-de-emprestimo-de-tecnologia-assistiva",
    "scenario": "Cinco dispositivos estão reservados e dois deles aguardam conferência de devolução.",
    "decision": "Separar reserva de disponibilidade liberada e comunicar alternativa.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma pessoa autorizada cancela sua participação com pouco aviso.",
    "tasks": [
      "Dossiê de trabalho — Operações de empréstimo de tecnologia assistiva",
      "Base de análise: agenda de apoio por usuário fictício",
      "Conferência de evidências: mapa de disponibilidade e consentimento",
      "Memória de decisão — Cinco dispositivos estão reservados e dois deles aguardam conferência de devolução",
      "Simulação da mudança: uma pessoa autorizada cancela sua participação com pouco aviso",
      "Relatório de transferência para coordenador de serviços de apoio"
    ]
  },
  {
    "id": "gestao-de-agenda-de-acompanhantes",
    "scenario": "Um acompanhante encerra visita às 14h e a próxima começa às 14h10 a 30 min de distância.",
    "decision": "Reagendar a janela para cobrir diferença mínima de vinte minutos.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma pessoa autorizada cancela sua participação com pouco aviso.",
    "tasks": [
      "Dossiê de trabalho — Gestão de agenda de acompanhantes",
      "Base de análise: agenda de apoio por usuário fictício",
      "Conferência de evidências: mapa de disponibilidade e consentimento",
      "Memória de decisão — Um acompanhante encerra visita às 14h e a próxima começa às 14h10 a 30 min de distância",
      "Simulação da mudança: uma pessoa autorizada cancela sua participação com pouco aviso",
      "Relatório de transferência para coordenador de serviços de apoio"
    ]
  },
  {
    "id": "atendimento-administrativo-a-cuidadores-familiares",
    "scenario": "A central recebeu pedido de benefício sem o documento estipulado no checklist local.",
    "decision": "Informar a pendência específica e registrar acompanhamento sem decidir elegibilidade.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma pessoa autorizada cancela sua participação com pouco aviso.",
    "tasks": [
      "Dossiê de trabalho — Atendimento administrativo a cuidadores familiares",
      "Base de análise: agenda de apoio por usuário fictício",
      "Conferência de evidências: mapa de disponibilidade e consentimento",
      "Memória de decisão — A central recebeu pedido de benefício sem o documento estipulado no checklist local",
      "Simulação da mudança: uma pessoa autorizada cancela sua participação com pouco aviso",
      "Relatório de transferência para coordenador de serviços de apoio"
    ]
  },
  {
    "id": "planejamento-de-oficinas-intergeracionais",
    "scenario": "Uma oficina oferece 18 lugares e prevê duplas entre participantes de dois grupos.",
    "decision": "Reservar até nove duplas e ajustar inscrição quando os grupos tiverem tamanhos distintos.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma pessoa autorizada cancela sua participação com pouco aviso.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de oficinas intergeracionais",
      "Base de análise: agenda de apoio por usuário fictício",
      "Conferência de evidências: mapa de disponibilidade e consentimento",
      "Memória de decisão — Uma oficina oferece 18 lugares e prevê duplas entre participantes de dois grupos",
      "Simulação da mudança: uma pessoa autorizada cancela sua participação com pouco aviso",
      "Relatório de transferência para coordenador de serviços de apoio"
    ]
  },
  {
    "id": "medicao-de-continuidade-em-servicos-de-apoio",
    "scenario": "Foram planejadas 60 visitas e 48 ocorreram com o profissional habitual.",
    "decision": "Registrar continuidade de 80% sobre o planejado e distinguir visitas não realizadas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma pessoa autorizada cancela sua participação com pouco aviso.",
    "tasks": [
      "Dossiê de trabalho — Medição de continuidade em serviços de apoio",
      "Base de análise: agenda de apoio por usuário fictício",
      "Conferência de evidências: mapa de disponibilidade e consentimento",
      "Memória de decisão — Foram planejadas 60 visitas e 48 ocorreram com o profissional habitual",
      "Simulação da mudança: uma pessoa autorizada cancela sua participação com pouco aviso",
      "Relatório de transferência para coordenador de serviços de apoio"
    ]
  }
];

export default cases;
