import type { Metadata } from "next";
import Link from "next/link";
import { enemGuidePath, exampleComparison, worksheetPath } from "@/app/guia-paises/campaign";
import { structuredDataJson } from "@/lib/seo/course-directory";
import { Show } from "@clerk/nextjs";
import Portugal from "./portugal";
import Espanha from "./espanha";
import Orcamento from "./Orcamento";
import Preparacao from "./Preparacao";
import Partilhar from "./Partilhar";
import styles from "./guia.module.css";
import "../guides.css";

const site = "https://www.theglobalpolymath.com";
const canonical = site + enemGuidePath;
const title = "Posso usar o Enem para estudar em Portugal ou na Espanha?";
const description = "Compare a nota do Enem em Coimbra com as vias de ingresso na UC3M. Consulte editais, prazos e taxas e calcule o custo da graduação nos dois destinos.";
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

const courses = [
  { label: "ISEC · Coimbra", href: "https://isec.pt/pt/estudar/licenciaturas/EngInfor/", detail: "A licenciatura em Engenharia Informática tem seis semestres. Ao estimar quanto custa se formar, conte três anuidades e os meses em que precisará manter moradia." },
  { label: "UC3M · Comunidade de Madri", href: "https://www.uc3m.es/grado/informatica", detail: "O Grado en Ingeniería Informática dura quatro anos e soma 240 créditos. Compare o preço aplicável por crédito e o deslocamento até o campus escolhido." },
] as const;

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
  courseTitle: "Dois cursos de informática, dois orçamentos",
  index: "Escolha por onde começar",
  options: [
    ["portugal", "Usar o Enem em Portugal"],
    ["espanha", "Candidatar-se na Espanha"],
    ["orcamento", "Calcular o custo dos cursos"],
    ["preparacao", "Organizar prazos e documentos"],
    ["duvidas", "Resolver dúvidas frequentes"],
  ],
  faqTitle: "Dúvidas de quem está escolhendo a graduação",
  faq: [
    ["Ainda não fiz o Enem. O que posso pesquisar agora?", "Escolha um curso, uma instituição e um campus de cada país. Em Portugal, procure no edital as qualificações que o curso aceita e de quais edições. Na Espanha, consulte a via correspondente ao seu diploma de ensino médio. Assim você identifica se o que falta é uma prova, um documento ou apenas a publicação do próximo edital."],
    ["Os dois cursos se chamam Engenharia Informática. Como comparar o que vou aprender?", "Abra as matrizes curriculares e escolha uma área que lhe interessa, como redes ou desenvolvimento de software. Marque em qual semestre ela aparece, se a disciplina é obrigatória e em que idioma a turma funciona. Compare também projetos e estágios. O nome do diploma sozinho não responde a essas perguntas."],
    ["Como comparar o preço se uma universidade cobra por ano e a outra por crédito?", "Multiplique os créditos em que pretende se matricular pelo preço por crédito da sua categoria. Registre esse resultado como anuidade. Some as taxas separadamente e use no simulador os meses de moradia e a duração de cada curso. Repita a conta com outro aluguel para ver se a escolha muda."],
    ["Como fazer a conta se minha renda está em reais?", "Faça a comparação inicial em euros. Depois multiplique cada total pela mesma cotação de euro em reais, anotando a data, e repita com uma cotação maior. Separe taxas de remessa e despesas pagas no Brasil. Isso mostra quanto seu orçamento tolera de variação antes de você assumir o compromisso."],
    ["Esse roteiro serve para um mestrado ou intercâmbio de um semestre?", "O exemplo é de ingresso em uma graduação completa após o ensino médio brasileiro. Para um mestrado, procure o edital do programa. Para intercâmbio, consulte o convênio e o calendário da sua instituição de origem. Você ainda pode usar a ficha para comparar idioma, campus e despesas."],
  ],
  nextTitle: "Leve a comparação para o seu plano",
  nextText: "Abra os dois destinos com o objetivo de estudo já selecionado. Se quiser manter sua pesquisa na TGPI, crie uma conta gratuita e continue no comparador.",
  signup: "Criar conta gratuita e continuar a comparação",
  methodology: "Como a TGPI verificou este guia",
  review: "Comparamos Engenharia Informática no ISEC e na UC3M porque as duas instituições publicam os currículos e os critérios de ingresso. Identificamos o campus, a categoria do candidato e o ano de cada preço. Para outra graduação ou outro ciclo, refaça a consulta na fonte que acompanha o dado.",
  compare: "Abrir Portugal e Espanha no comparador de estudos",
  worksheet: "Baixar a ficha gratuita para preencher a comparação (PDF)",
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
    dateModified: published,
    author: { "@type": "Organization", name: "The Global Polymath Institute", url: site },
    citation: [...Object.values(sources).map(source => source.url), ...courses.map(course => course.href)],
  };
  return (
    <main className={`guides-page ${styles.page}`} lang="pt-BR">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson(article) }} />
      <nav aria-label={copy.breadcrumb}><Link href="/guides">{copy.guides}</Link></nav>
      <article>
        <header>
          <p className="guides-kicker">{copy.section}</p>
          <h1>{title}</h1>
          <p className="guides-meta">{copy.byline} · <time dateTime={published}>{copy.date}</time></p>
          <p>{copy.answer}</p>
          <nav aria-label={copy.index} className={styles.contents}>
            <strong>{copy.index}</strong>
            <ul>{copy.options.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
          </nav>
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
          <h2>{copy.courseTitle}</h2>
          <dl>{courses.map(course => <div key={course.href}>
            <dt><a href={course.href}>{course.label}</a></dt>
            <dd>{course.detail}</dd>
          </div>)}</dl>
        </section>
        <Portugal />
        <Espanha />
        <Orcamento />
        <Preparacao />
        <section id="duvidas" className="guides-section">
          <h2>{copy.faqTitle}</h2>
          {copy.faq.map(([question, answer]) => <details key={question} className={styles.question}><summary>{question}</summary><p>{answer}</p></details>)}
        </section>
        <section className={styles.actions}>
          <h2>{copy.nextTitle}</h2>
          <p>{copy.nextText}</p>
          <Link href={exampleComparison} data-funnel-event="editorial_compare_opened">{copy.compare} →</Link>
          <Show when="signed-out"><Link href={`/sign-up?next=${encodeURIComponent(exampleComparison)}`} data-funnel-event="editorial_signup_clicked">{copy.signup} →</Link></Show>
          <a href={worksheetPath} download data-funnel-event="editorial_pdf_clicked">{copy.worksheet}</a>
        </section>
        <Partilhar />
        <section>
          <h2>{copy.methodology}</h2>
          <p>{copy.review}</p>
          <h3>{copy.references}</h3>
          <ul>{Object.values(sources).map(source => <li key={source.url}><a href={source.url}>{source.name}</a></li>)}</ul>
        </section>
      </article>
    </main>
  );
}
