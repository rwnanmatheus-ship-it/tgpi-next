import type { Metadata } from "next";
import Link from "next/link";
import { enemGuidePath, exampleComparison, worksheetPath } from "@/app/guia-paises/campaign";
import { structuredDataJson } from "@/lib/seo/course-directory";
import "../guides.css";

const site = "https://www.theglobalpolymath.com";
const canonical = site + enemGuidePath;
const title = "Posso usar o Enem para estudar em Portugal ou na Espanha?";
const description = "Veja como o Enem entra na seleção em Portugal e como verificar a admissão na Espanha. Compare dois cursos de informática e monte sua ficha de candidatura.";
const image = {
  url: site + "/images/home/tgpi-portugal-spain-story.webp",
  width: 1122,
  height: 1402,
  alt: "Portugal e Espanha no comparador da TGPI",
};
const published = "2026-11-27";

export const metadata: Metadata = {
  title: title + " | TGPI",
  description,
  alternates: { canonical },
  openGraph: {
    type: "article", siteName: "TGPI", locale: "pt_BR", url: canonical,
    title, description, images: [image], publishedTime: published,
  },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

const sources = {
  inep: { name: "Inep · Enem Portugal e vigência dos acordos", url: "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/enem-portugal" },
  coimbra: { name: "Politécnico de Coimbra · Perguntas sobre o ingresso internacional", url: "https://www.ipc.pt/internacional/estudante-internacional/acesso-e-ingresso/perguntas-frequentes/" },
  uned: { name: "UNEDasiss · Critérios por sistema de ensino e universidade", url: "https://unedasiss.uned.es/informacionuniversidad" },
  unedFaq: { name: "UNEDasiss · Acreditação, homologação e provas específicas", url: "https://unedasiss.uned.es/faqs" },
};

const checks = [
  {
    question: "Onde começo?",
    portugal: "Na lista do Inep, localize a instituição e a vigência do acordo. Abra o edital de ingresso internacional do curso escolhido.",
    spain: "No buscador da UNEDasiss, selecione Brasil como país do seu sistema de ensino, informe sua formação e consulte a universidade de destino.",
  },
  {
    question: "Qual nota conta?",
    portugal: "Confira as edições aceitas do Enem, as notas mínimas por área e os pesos usados pelo curso.",
    spain: "Verifique se a seleção pede acreditação da UNEDasiss e quais disciplinas têm peso. A instituição pode levar em conta provas específicas, chamadas PCE.",
  },
  {
    question: "O que registro antes de pagar?",
    portugal: "O valor anual do curso para a sua modalidade, a taxa de candidatura e o prazo da fase em que você pretende concorrer.",
    spain: "O preço aplicável ao seu perfil, os prazos de pré-inscrição e de eventuais provas, e o idioma da turma.",
  },
];

const copy = {
  breadcrumb: "Navegação do guia", guides: "Guias", section: "Graduação no exterior",
  byline: "Pesquisa editorial TGPI", date: "27 de novembro de 2026",
  answer: "Em Portugal, você pode usar o Enem para concorrer em instituições que aceitam o exame. Cada uma define os pesos e as regras por curso. Na Espanha, comece pelo sistema de ensino em que concluiu o ensino médio e pelos critérios da universidade escolhida. A nota do Enem, sozinha, não permite concluir que você está apto a concorrer.",
  heading: "O que muda na candidatura de quem fez o ensino médio no Brasil?",
  caption: "Três perguntas para comparar duas candidaturas à graduação",
  labels: ["Pergunta", "Portugal", "Espanha"],
  example: "Exemplo prático: Engenharia Informática em Coimbra ou Madri",
  portugalCourse: "Engenharia Informática no ISEC, do Politécnico de Coimbra",
  coimbraExample: "A licenciatura do ISEC tem seis semestres. Para o concurso de estudante internacional, o Politécnico informa que considera o Enem dos cinco anos civis anteriores à candidatura e exige média superior a 500, além das notas específicas da graduação. Na ficha do curso e no edital vigente, confira quais áreas entram no cálculo para a sua edição.",
  spainCourse: "Ingeniería Informática na Universidad Carlos III de Madrid",
  madridExample: "Na UC3M, a graduação tem quatro anos e 240 créditos. Confirme o idioma das disciplinas e os requisitos da turma em inglês. Antes de escolher a turma, consulte o caminho de ingresso aplicável ao seu ensino médio. Confira com a universidade se precisa homologar os estudos e se há exigência de acreditação ou de provas para essa via.",
  exercise: "A diferença de duração muda o orçamento total. Para cada curso, some as anuidades de todo o período e estime quantos meses de moradia seriam necessários. Na ficha, abra uma coluna para cada curso. Preencha o requisito que você já cumpre, a próxima pendência e a data limite. Se um valor ou prazo ainda não saiu no edital da sua edição, deixe-o em aberto.",
  compare: "Abrir Portugal e Espanha no comparador de estudos",
  worksheet: "Baixar a ficha gratuita para preencher a comparação",
  references: "Fontes para conferir sua candidatura",
};

export default function EnemPortugalEspanha() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: canonical,
    inLanguage: "pt-BR",
    image: image.url,
    datePublished: published,
    author: { "@type": "Organization", name: "The Global Polymath Institute", url: site },
    citation: Object.values(sources).map(source => source.url),
  };
  return (
    <main className="guides-page" lang="pt-BR">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson(article) }} />
      <nav aria-label={copy.breadcrumb}><Link href="/guides">{copy.guides}</Link></nav>
      <article>
        <header>
          <p className="guides-kicker">{copy.section}</p>
          <h1>{title}</h1>
          <p className="guides-meta">{copy.byline} · <time dateTime={published}>{copy.date}</time></p>
          <p>{copy.answer}</p>
        </header>
        <section className="guides-section">
          <h2>{copy.heading}</h2>
          <div className="guides-table">
            <table>
              <caption>{copy.caption}</caption>
              <thead><tr>{copy.labels.map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
              <tbody>{checks.map(row => <tr key={row.question}>
                <th scope="row">{row.question}</th><td>{row.portugal}</td><td>{row.spain}</td>
              </tr>)}</tbody>
            </table>
          </div>
        </section>
        <section className="guides-section">
          <h2>{copy.example}</h2>
          <h3><a href="https://isec.pt/pt/estudar/licenciaturas/EngInfor/">{copy.portugalCourse}</a></h3>
          <p>{copy.coimbraExample}</p>
          <h3><a href="https://www.uc3m.es/grado/informatica">{copy.spainCourse}</a></h3>
          <p>{copy.madridExample}</p>
          <p>{copy.exercise}</p>
          <Link href={exampleComparison} data-funnel-event="editorial_compare_opened" className="guides-next">{copy.compare} →</Link>
          <a href={worksheetPath} download data-funnel-event="editorial_pdf_clicked">{copy.worksheet} (PDF)</a>
        </section>
        <section>
          <h2>{copy.references}</h2>
          <ul>{Object.values(sources).map(source => <li key={source.url}><a href={source.url}>{source.name}</a></li>)}</ul>
        </section>
      </article>
    </main>
  );
}
