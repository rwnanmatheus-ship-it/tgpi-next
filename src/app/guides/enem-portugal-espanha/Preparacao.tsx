const steps = [
  {
    when: "Ao escolher a graduação",
    action: "Anote em uma ficha o nome oficial do curso, o campus, o ano letivo e a modalidade de ingresso. Guarde a página do edital e a data em que a consultou. Separe três prazos que podem ser diferentes: inscrição em provas ou acreditação, candidatura à vaga e matrícula após a admissão. Comece pelo que vencer primeiro.",
  },
  {
    when: "Assim que encontrar os prazos",
    action: "Peça à escola uma previsão de emissão do histórico e do certificado de conclusão. Confira como seu nome aparece nesses documentos e no documento de identificação. Se você ainda vai concluir o ensino médio, confirme se a instituição aceita uma declaração provisória, qual texto deve constar e até quando precisa receber o documento definitivo.",
  },
  {
    when: "Antes de contratar serviços",
    action: "Copie do edital a instrução sobre cada documento brasileiro. Verifique se a instituição pede o original, uma cópia, tradução ou apostila e em que etapa. Se duas páginas trouxerem instruções diferentes, envie os dois links ao setor de ingresso. Peça uma resposta por escrito antes de gastar com um serviço que talvez não seja exigido.",
  },
  {
    when: "Antes do encerramento e depois do envio",
    action: "Confira o horário e o fuso indicados no portal. Reserve tempo para corrigir arquivos ilegíveis ou um pagamento pendente. Após enviar, guarde o protocolo e verifique o estado da candidatura. Registre também quando consultar o resultado e até que dia responder a uma oferta de vaga.",
  },
] as const;

const copy = {
  title: "Como organizar documentos e prazos de duas candidaturas",
  intro: "Monte um calendário para cada curso. O roteiro abaixo parte das datas publicadas pela instituição na sua modalidade de ingresso. Ele ajuda a descobrir qual tarefa precisa começar hoje.",
  funding: "Usar a nota do Enem dá direito a bolsa?",
  fundingAnswer: "O Inep informa que os acordos do Enem com instituições portuguesas facilitam o uso da nota e não preveem financiamento estudantil pelo governo brasileiro. Para avaliar uma bolsa, abra a chamada do ano da candidatura e confira o público elegível, o valor coberto, a renovação e o prazo. No orçamento, subtraia apenas o auxílio já concedido.",
  inep: "O que o acordo Enem Portugal cobre, segundo o Inep",
  scholarships: "Bolsas e auxílios de graduação publicados pela UC3M",
  ask: "O que perguntar à universidade antes de pagar uma taxa?",
  template: "Olá, concluí o ensino médio no Brasil e pretendo concorrer a [curso e campus] em [ano letivo]. Fiz o Enem em [edição]. Consultei [link do edital], mas fiquei com dúvida sobre [requisito]. Para a minha modalidade de ingresso, vocês poderiam confirmar qual documento comprova esse requisito, o formato aceito e a data limite de entrega? Obrigado.",
};

export default function Preparacao() {
  return (
    <section id="preparacao" className="guides-section" aria-labelledby="preparacao-titulo">
      <h2 id="preparacao-titulo">{copy.title}</h2>
      <p>{copy.intro}</p>
      <ol>
        {steps.map(({ when, action }) => (
          <li key={when}>
            <strong>{when}.</strong> {action}
          </li>
        ))}
      </ol>
      <h3>{copy.funding}</h3>
      <p>{copy.fundingAnswer}</p>
      <ul>
        <li><a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/enem-portugal">{copy.inep}</a></li>
        <li><a href="https://www.uc3m.es/grado/informacion-practica/becas-ayudas">{copy.scholarships}</a></li>
      </ul>
      <h3>{copy.ask}</h3>
      <blockquote><p>{copy.template}</p></blockquote>
    </section>
  );
}
