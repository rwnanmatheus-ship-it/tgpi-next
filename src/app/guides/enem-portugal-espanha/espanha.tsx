const admissao = "https://www.uc3m.es/grado/admision/solicitud/estudiantes-internacionales";
const fontes = {
  consulta: "https://unedasiss.uned.es/informacionuniversidad",
  perguntas: "https://unedasiss.uned.es/faqs",
  geral: admissao + "/no-europeos-preinscripcion",
  antecipada: admissao + "/early-admission/que-es",
  calendario: admissao + "/early-admission/plazos",
  curso: "https://www.uc3m.es/grado/informatica",
  precos: "https://www.uc3m.es/bachelor-degree/admission/application/enrollment/prices/non-eu",
};

const texto = {
  titulo: "Graduação na Espanha para quem fez o ensino médio no Brasil",
  inicio: "Escolha a universidade, o curso e o campus antes de pagar por provas. Uma pessoa com histórico do ensino médio brasileiro e outra com diploma de Bacharelado Internacional podem seguir vias diferentes, mesmo que ambas tenham passaporte brasileiro. A UC3M separa essas vias no seu portal.",
  mapa: "Consultar as vias de ingresso internacional da UC3M",
  termos: "Homologação, acreditação e PCE: qual é a diferença?",
  consulta: "Consultar Brasil e a universidade de destino na UNEDasiss",
  duvidas: "Conferir o que a UNEDasiss aceita como acreditação provisória",
  ingresso: "Pré-inscrição geral em Madri",
  geral: "Para o ensino médio de um sistema fora da UE e sem acordo de reciprocidade, a UC3M descreve a via geral com o bacharelado homologado. Na modalidade com PCE, ela exige a acreditação da modalidade de bacharelado para a convocatória ordinária. As matérias que podem elevar a pontuação dependem da graduação desejada.",
  nota: "Na via com PCE descrita pela universidade, a nota de acesso vai até 10. Para calcular a nota de admissão, a UC3M pode somar até quatro pontos com as duas matérias aprovadas que mais favoreçam o candidato segundo a tabela de ponderações. Copie da tabela do seu ciclo a disciplina e o peso antes de decidir quais provas fazer.",
  linkGeral: "Ver critérios da via geral e tabela de ponderações da UC3M",
  antecipada: "Admissão antecipada da UC3M: datas e idioma",
  requisitos: "A universidade também avalia candidaturas internacionais por uma via própria. A comissão considera o histórico escolar, com atenção às notas das disciplinas relacionadas à graduação escolhida. A UC3M pede comprovação de nível B2 no idioma em que o curso será ministrado por essa via.",
  prazo: "O calendário publicado para essa seleção indica candidaturas de 5 de outubro de 2026 a 2 de abril de 2027. As vagas são preenchidas ao longo do período e um curso pode sair da oferta antes da data final. A pré-inscrição geral e as provas da UNED têm calendários próprios.",
  linkRequisitos: "Ver quem pode solicitar admissão antecipada",
  linkCalendario: "Conferir o calendário atualizado da seleção antecipada",
  informatica: "Engenharia Informática: qual campus e quanto custa?",
  campus: "O curso da UC3M dura quatro anos, totaliza 240 créditos e é oferecido em Leganés e Colmenarejo. A opção bilíngue fica em Leganés. Ao escolher moradia, faça a cotação do trajeto até o campus da turma, que pode ser diferente do caminho até o centro de Madri.",
  linkCurso: "Conferir campus, idiomas e disciplinas de Ingeniería Informática",
  custo: "Na tabela de 2026/27, para estudantes de fora da UE sem condição de residente na Espanha e sem equiparação ao regime comunitário, Engenharia Informática custa € 128,57 por crédito. Sessenta créditos em primeira matrícula somam € 7.714,20. A universidade acrescenta encargos administrativos, seguro escolar e, para quem está entrando, abertura de expediente.",
  aplicacao: "Use esse valor como referência do ano letivo indicado. Para montar seu orçamento, confirme com a secretaria qual tabela se aplica à sua situação e some moradia, alimentação, transporte e custos iniciais. Se a sua turma começa em outro ano, consulte a tabela correspondente antes de fechar a conta.",
  linkCusto: "Abrir a tabela de preços da UC3M por curso e condição de residência",
};

const processos = [
  { termo: "Homologação do ensino médio", definicao: "É o reconhecimento de equivalência dos estudos estrangeiros ao Bachillerato espanhol. A UNEDasiss orienta candidatos de sistemas fora da UE e sem acordo a solicitá-la à autoridade competente. Se o pedido estiver pendente, confirme com a universidade se aceita acreditação provisória e até quando exige a definitiva." },
  { termo: "Acreditação UNEDasiss", definicao: "É o documento que reúne os serviços acadêmicos exigidos na via escolhida. No buscador da UNEDasiss, selecione o país do sistema de ensino e o tipo de formação. Depois confronte a resposta com os critérios atuais da universidade. A solicitação da vaga é uma etapa separada." },
  { termo: "Pruebas de Competencias Específicas (PCE)", definicao: "São provas por matéria da UNED. Anote quais disciplinas a sua via exige e quanto cada uma pesa para o curso. Guarde separadamente os prazos de inscrição nas provas e de candidatura à universidade." },
];

export default function Espanha() {
  return (
    <section id="espanha" className="guides-section" aria-labelledby="titulo-espanha">
      <h2 id="titulo-espanha">{texto.titulo}</h2>
      <p>{texto.inicio}</p>
      <p><a href={admissao}>{texto.mapa}</a></p>

      <h3>{texto.termos}</h3>
      <dl>
        {processos.map(({ termo, definicao }) => (
          <div key={termo}>
            <dt><strong>{termo}</strong></dt>
            <dd><p>{definicao}</p></dd>
          </div>
        ))}
      </dl>
      <ul>
        <li><a href={fontes.consulta}>{texto.consulta}</a></li>
        <li><a href={fontes.perguntas}>{texto.duvidas}</a></li>
      </ul>

      <h3>{texto.ingresso}</h3>
      <p>{texto.geral}</p>
      <p>{texto.nota}</p>
      <p><a href={fontes.geral}>{texto.linkGeral}</a></p>

      <h3>{texto.antecipada}</h3>
      <p>{texto.requisitos}</p>
      <p>{texto.prazo}</p>
      <ul>
        <li><a href={fontes.antecipada}>{texto.linkRequisitos}</a></li>
        <li><a href={fontes.calendario}>{texto.linkCalendario}</a></li>
      </ul>

      <h3>{texto.informatica}</h3>
      <p>{texto.campus}</p>
      <p><a href={fontes.curso}>{texto.linkCurso}</a></p>
      <p>{texto.custo}</p>
      <p>{texto.aplicacao}</p>
      <p><a href={fontes.precos}>{texto.linkCusto}</a></p>
    </section>
  );
}
