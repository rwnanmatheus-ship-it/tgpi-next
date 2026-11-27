const ipc = "https://www.ipc.pt/internacional/estudante-internacional/acesso-e-ingresso/candidaturas/";
const edital = "https://www.ipc.pt/wp-content/uploads/2026/03/Despacho-EI-26-27-VF_signed.pdf";
const tuition = "https://www.ipc.pt/wp-content/uploads/2026/03/Propinas_1ociclo_EI_26_27-2.pdf";
const requirements = "https://www.ipc.pt/wp-content/uploads/2026/03/Provas-de-ingresso_2026-27_EI.pdf";

const content = {
  title: "Portugal: qual nota do Enem servia para Engenharia Informática em Coimbra?",
  overview: "Veja como ler um edital real. Este exemplo é do concurso de estudante internacional de 2026/27 do Instituto Superior de Engenharia de Coimbra (ISEC). Na tabela de anuidades, procure a unidade 3064 e o curso 9119. O mesmo nome de curso também aparece em outra escola do Politécnico, com critérios e preço diferentes.",
  gradeHeading: "Média geral e Matemática eram dois filtros diferentes",
  grade: "O concurso de 2026/27 aceitou edições do Enem de 2021 a 2025 e exigiu média geral acima de 500. Para Engenharia Informática no ISEC, exigiu também pelo menos 500 em Matemática e suas Tecnologias. No anexo do edital, leia a coluna do Enem: as provas listadas para o ensino secundário português pertencem a outra via de acesso.",
  example: "Exemplo: com média geral de 620 e Matemática de 490, o candidato não atingiria o segundo mínimo. Com média geral de 510 e Matemática de 500, passaria por esses dois filtros. Ainda teria de cumprir as demais exigências e disputar uma das quatro vagas previstas no edital. A classificação do último colocado depende dos candidatos daquela edição.",
  requirementsLink: "Consultar a tabela de requisitos do Enem por escola e curso (PDF)",
  costHeading: "Quanto reservar para a instituição no primeiro ano?",
  cost: "Para esse curso e regime, a anuidade de 2026/27 foi de € 3.000. O Politécnico publicou € 50 pela candidatura e € 50 pela matrícula. Para uma candidatura e uma matrícula, a soma dessas três parcelas é € 3.100. Acrescente ao seu orçamento moradia, alimentação, deslocamento e eventuais exames ou documentos cobrados à parte.",
  timing: "O momento do pagamento também importa: o edital de 2026/27 previa o pagamento integral da primeira anuidade para firmar o compromisso de matrícula após a colocação. Ao planejar o dinheiro disponível, separe a data para pagar da média mensal que você usaria para poupar.",
  tuitionLink: "Conferir o valor da anuidade pela unidade 3064 e pelo curso 9119 (PDF)",
  calendarHeading: "Como conferir prazos e preparar a próxima candidatura",
  calendar: "Na edição de 2026/27, a primeira fase recebeu candidaturas de 9 de março a 2 de abril de 2026. A segunda, para vagas remanescentes, teve janela de 17 a 31 de agosto. Esses prazos já passaram. Para outro ingresso, procure o edital que identifica seu ano letivo. As edições aceitas do Enem, as vagas, os valores e as datas podem mudar.",
  checklist: [
    "Confirme se a sua situação permite concorrer pelo regime de estudante internacional. Quem também tem cidadania portuguesa ou de outro país da União Europeia deve consultar a via aplicável antes de pagar a taxa.",
    "Separe identificação, comprovativo de conclusão do ensino médio e boletim do Enem por área. Confira no edital as exigências de autenticação e o que será apresentado em original na matrícula.",
    "Na plataforma Inforestudante, confira o curso, a fase e as instruções de pagamento. Guarde os comprovativos, acompanhe a lista provisória e anote o prazo de reclamação e a data da lista definitiva.",
  ],
  editalLink: "Ler o edital de 2026/27 (regras de seleção, calendário e anexo do ISEC)",
  nextLink: "Buscar o concurso em vigor no portal de candidaturas de Coimbra",
};

export default function PortugalGuideSection() {
  return (
    <section id="portugal" className="guides-section" aria-labelledby="portugal-titulo">
      <h2 id="portugal-titulo">{content.title}</h2>
      <p>{content.overview}</p>
      <h3>{content.gradeHeading}</h3>
      <p>{content.grade}</p>
      <p>{content.example}</p>
      <p><a href={requirements}>{content.requirementsLink}</a></p>
      <h3>{content.costHeading}</h3>
      <p>{content.cost}</p>
      <p>{content.timing}</p>
      <p><a href={tuition}>{content.tuitionLink}</a></p>
      <h3>{content.calendarHeading}</h3>
      <p>{content.calendar}</p>
      <ol>{content.checklist.map(step => <li key={step}>{step}</li>)}</ol>
      <p><a href={edital}>{content.editalLink}</a></p>
      <p><a href={ipc}>{content.nextLink}</a></p>
    </section>
  );
}
