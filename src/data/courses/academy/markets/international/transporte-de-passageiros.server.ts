import 'server-only';
import type { MarketCourseSpec } from '../types';

const cases: readonly Pick<MarketCourseSpec, 'id' | 'scenario' | 'decision' | 'misconception' | 'changedConstraint' | 'tasks'>[] = [
  {
    "id": "desenho-de-tabelas-horarias-de-onibus",
    "scenario": "Uma volta completa leva 72 minutos e a saída deve ocorrer a cada 12.",
    "decision": "Reservar seis veículos para circulação e calcular reserva operacional separadamente.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma plataforma fica indisponível no período de maior movimento.",
    "tasks": [
      "Dossiê de trabalho — Desenho de tabelas horárias de ônibus",
      "Base de análise: grade horária por serviço",
      "Conferência de evidências: mapa de capacidade e conexão",
      "Memória de decisão — Uma volta completa leva 72 minutos e a saída deve ocorrer a cada 12",
      "Simulação da mudança: uma plataforma fica indisponível no período de maior movimento",
      "Relatório de transferência para analista de operações de transporte de passageiros"
    ]
  },
  {
    "id": "planejamento-de-intervalos-em-linhas-de-alta-frequencia",
    "scenario": "Dois ônibus chegam juntos após lacuna de 18 minutos em linha de intervalo nominal 9.",
    "decision": "Medir dispersão de intervalos além da média e testar regularização na simulação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma plataforma fica indisponível no período de maior movimento.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de intervalos em linhas de alta frequência",
      "Base de análise: grade horária por serviço",
      "Conferência de evidências: mapa de capacidade e conexão",
      "Memória de decisão — Dois ônibus chegam juntos após lacuna de 18 minutos em linha de intervalo nominal 9",
      "Simulação da mudança: uma plataforma fica indisponível no período de maior movimento",
      "Relatório de transferência para analista de operações de transporte de passageiros"
    ]
  },
  {
    "id": "medicao-de-pontualidade-ferroviaria",
    "scenario": "De 100 viagens, 88 chegaram na tolerância, 7 atrasaram e 5 foram canceladas.",
    "decision": "Publicar pontualidade de 88/95 operadas e cancelamentos de 5/100 previstas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma plataforma fica indisponível no período de maior movimento.",
    "tasks": [
      "Dossiê de trabalho — Medição de pontualidade ferroviária",
      "Base de análise: grade horária por serviço",
      "Conferência de evidências: mapa de capacidade e conexão",
      "Memória de decisão — De 100 viagens, 88 chegaram na tolerância, 7 atrasaram e 5 foram canceladas",
      "Simulação da mudança: uma plataforma fica indisponível no período de maior movimento",
      "Relatório de transferência para analista de operações de transporte de passageiros"
    ]
  },
  {
    "id": "integracao-tarifaria-em-redes-metropolitanas",
    "scenario": "A regra fictícia permite integração até 60 min; os registros são 8h10 e 9h15.",
    "decision": "Classificar a conexão como fora da janela e testar o limite exato de 60 minutos.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma plataforma fica indisponível no período de maior movimento.",
    "tasks": [
      "Dossiê de trabalho — Integração tarifária em redes metropolitanas",
      "Base de análise: grade horária por serviço",
      "Conferência de evidências: mapa de capacidade e conexão",
      "Memória de decisão — A regra fictícia permite integração até 60 min; os registros são 8h10 e 9h15",
      "Simulação da mudança: uma plataforma fica indisponível no período de maior movimento",
      "Relatório de transferência para analista de operações de transporte de passageiros"
    ]
  },
  {
    "id": "planejamento-de-informacao-ao-passageiro",
    "scenario": "A plataforma foi alterada após a impressão do quadro em duas línguas.",
    "decision": "Sincronizar áudio, painel e equipe com uma versão e horário de vigência.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma plataforma fica indisponível no período de maior movimento.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de informação ao passageiro",
      "Base de análise: grade horária por serviço",
      "Conferência de evidências: mapa de capacidade e conexão",
      "Memória de decisão — A plataforma foi alterada após a impressão do quadro em duas línguas",
      "Simulação da mudança: uma plataforma fica indisponível no período de maior movimento",
      "Relatório de transferência para analista de operações de transporte de passageiros"
    ]
  },
  {
    "id": "dimensionamento-de-terminais-rodoviarios",
    "scenario": "Três partidas ocupam plataforma por 15 minutos e se sobrepõem durante cinco.",
    "decision": "Dimensionar pela simultaneidade máxima de três posições.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma plataforma fica indisponível no período de maior movimento.",
    "tasks": [
      "Dossiê de trabalho — Dimensionamento de terminais rodoviários",
      "Base de análise: grade horária por serviço",
      "Conferência de evidências: mapa de capacidade e conexão",
      "Memória de decisão — Três partidas ocupam plataforma por 15 minutos e se sobrepõem durante cinco",
      "Simulação da mudança: uma plataforma fica indisponível no período de maior movimento",
      "Relatório de transferência para analista de operações de transporte de passageiros"
    ]
  },
  {
    "id": "gestao-de-conexoes-perdidas",
    "scenario": "Uma conexão exige 8 minutos de caminhada e o primeiro serviço chega às 10h04 para saída às 10h10.",
    "decision": "Registrar conexão inviável de seis minutos e localizar alternativa atendível.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma plataforma fica indisponível no período de maior movimento.",
    "tasks": [
      "Dossiê de trabalho — Gestão de conexões perdidas",
      "Base de análise: grade horária por serviço",
      "Conferência de evidências: mapa de capacidade e conexão",
      "Memória de decisão — Uma conexão exige 8 minutos de caminhada e o primeiro serviço chega às 10h04 para saída às 10h10",
      "Simulação da mudança: uma plataforma fica indisponível no período de maior movimento",
      "Relatório de transferência para analista de operações de transporte de passageiros"
    ]
  },
  {
    "id": "analise-de-demanda-por-parada",
    "scenario": "Há 32 passageiros a bordo; descem 9 e sobem 15.",
    "decision": "Registrar carga de 38 após a parada distinguindo embarques de ocupação.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma plataforma fica indisponível no período de maior movimento.",
    "tasks": [
      "Dossiê de trabalho — Análise de demanda por parada",
      "Base de análise: grade horária por serviço",
      "Conferência de evidências: mapa de capacidade e conexão",
      "Memória de decisão — Há 32 passageiros a bordo; descem 9 e sobem 15",
      "Simulação da mudança: uma plataforma fica indisponível no período de maior movimento",
      "Relatório de transferência para analista de operações de transporte de passageiros"
    ]
  },
  {
    "id": "escalas-de-atendimento-em-estacoes",
    "scenario": "Dois guichês processam juntos 40 pedidos/h e chegam 50 durante duas horas.",
    "decision": "Planejar cobertura para déficit de 20 atendimentos e escalonar pausas.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma plataforma fica indisponível no período de maior movimento.",
    "tasks": [
      "Dossiê de trabalho — Escalas de atendimento em estações",
      "Base de análise: grade horária por serviço",
      "Conferência de evidências: mapa de capacidade e conexão",
      "Memória de decisão — Dois guichês processam juntos 40 pedidos/h e chegam 50 durante duas horas",
      "Simulação da mudança: uma plataforma fica indisponível no período de maior movimento",
      "Relatório de transferência para analista de operações de transporte de passageiros"
    ]
  },
  {
    "id": "planejamento-de-transporte-para-eventos",
    "scenario": "800 pessoas saem em 20 minutos e cada viagem leva 50.",
    "decision": "Dimensionar 16 partidas equivalentes e conferir capacidade de embarque na janela.",
    "misconception": "Aplicar a proposta inicial sem reconciliar os dados e as restrições do caso.",
    "changedConstraint": "Uma plataforma fica indisponível no período de maior movimento.",
    "tasks": [
      "Dossiê de trabalho — Planejamento de transporte para eventos",
      "Base de análise: grade horária por serviço",
      "Conferência de evidências: mapa de capacidade e conexão",
      "Memória de decisão — 800 pessoas saem em 20 minutos e cada viagem leva 50",
      "Simulação da mudança: uma plataforma fica indisponível no período de maior movimento",
      "Relatório de transferência para analista de operações de transporte de passageiros"
    ]
  }
];

export default cases;
