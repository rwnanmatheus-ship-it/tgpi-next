import type { StudyGuide } from "./types";

export default {
  slug: "brazil",
  countrySlug: "brazil",
  sources: [
    { label: "Ministério da Educação · PEC-G", url: "https://www.gov.br/pt-br/servicos/estudar-o-ensino-superior-no-brasil" },
    { label: "Inep · Celpe-Bras", url: "https://www.gov.br/inep/pt-br/centrais-de-conteudo/legislacao/celpe-bras" },
    { label: "UNILA · Edital PSI 32/2026, ingresso em 2027", url: "https://atos.unila.edu.br/atos/edital-n-ordm-32-2026-proint-21947" },
    { label: "UNILA · Homologação das inscrições do PSI 2027", url: "https://atos.unila.edu.br/atos/edital-n-ordm-78-2026-proint-22522" },
    { label: "Ministério da Educação · Cadastro e-MEC", url: "https://www.gov.br/mec/pt-br/politica-regulacao-supervisao-educacao-superior/cadastro-nacional-de-cursos-e-ies" },
  ],
  locales: {
    en: {
      country: "Brazil",
      title: "Study in Brazil as an international undergraduate",
      description: "Compare Brazil’s PEC-G and UNILA admission routes, check Portuguese requirements and course records, and budget for a degree in Foz do Iguaçu.",
      intro: "Where did you finish secondary school, and which citizenship do you hold? Those two answers can lead to very different applications in Brazil. Compare a national cooperation programme with a federal university on the border with Argentina and Paraguay.",
      alt: "A student points out a detail on a wooden building model in a shaded, open-air studio.",
      sections: [
        {
          heading: "Who can apply through PEC-G?",
          body: "PEC-G offers tuition-free degree places to eligible citizens of partner countries who live outside Brazil. The published conditions cover age, citizenship, residence and secondary education. The diplomatic post responsible for your place of residence handles part of the process.",
          steps: ["Check your country and family circumstances against the current call, including the rule on Brazilian citizenship or parentage.", "Ask the diplomatic post when it needs your school transcript, proof of income and evidence of Portuguese proficiency. Compare that date with the Celpe-Bras exam calendar."],
          sources: [0, 1],
        },
        {
          heading: "UNILA’s international selection in Foz do Iguaçu",
          body: "UNILA’s initial call for 2027 entry offered 480 places across 29 degrees. It targeted eligible Latin American and Caribbean nationals who completed secondary school abroad and did not hold Brazilian citizenship. This is a past application window you can use to understand the selection.",
          steps: ["Find your country in Annex III and your intended degree in Annex VI of the call. Check amendments for the intake you intend to enter.", "Save the ranking, call-up and pre-registration deadlines separately. UNILA’s notice confirming receipt of an application only confirms that it was submitted on time."],
          sources: [2, 3],
        },
        {
          heading: "Check what the degree actually qualifies you to do",
          body: "Brazil’s education ministry maintains e-MEC, a public register of higher education institutions and courses. A university can offer more than one degree with a similar name. Match the exact programme and institution before you compare curricula or decide where to live.",
          steps: ["Copy the course name and campus from the admissions notice. Check the programme record and read the university’s curriculum.", "If you plan to practise a regulated profession abroad, ask the relevant authority in that country which documents it expects from a Brazilian graduate."],
          sources: [4, 2],
        },
        {
          heading: "Build a budget before accepting a place",
          body: "PEC-G applicants document how they will support themselves. For the UNILA intake above, general admission and selection for need-based assistance followed different rules. Even on the assistance track, an award depended on available places or funds.",
          steps: ["Price the journey to Foz do Iguaçu, document processing, rent and deposit, meals and local transport in reais.", "Calculate what you would need before your first payment of any confirmed aid. Check the call for in-person attendance at the start of classes before booking travel."],
          sources: [0, 2],
        },
      ],
      faq: [
        { question: "I speak Spanish. Which Portuguese certificate should I book?", answer: "Identify your admission route first. The PEC-G service lists proof of Portuguese and Inep publishes Celpe-Bras exam notices. Ask the diplomatic post which evidence your intake accepts. UNILA runs a separate selection with its own eligibility and documentation rules." },
        { question: "Does passing the UNILA application check reserve my degree place?", answer: "The published check concerns submission of the application. Follow the ranking, your individual call-up and compulsory pre-registration. Use the acceptance letter and the university’s instructions to plan enrolment and arrival." },
      ],
    },
    pt: {
      country: "Brasil",
      title: "Como fazer graduação no Brasil sendo estrangeiro",
      description: "Compare o PEC-G e a seleção internacional da UNILA, confira a exigência de português, verifique o curso no e-MEC e planeje o orçamento em Foz do Iguaçu.",
      intro: "Em que país você concluiu o ensino médio e quais são as suas nacionalidades? Essas respostas mudam a forma de concorrer a uma graduação no Brasil. Veja como funciona um programa nacional de cooperação e como uma universidade federal da tríplice fronteira organiza sua própria seleção.",
      alt: "Um estudante aponta um detalhe em uma maquete de madeira em um ateliê aberto e sombreado.",
      sections: [
        {
          heading: "Quem pode concorrer pelo PEC-G?",
          body: "O PEC-G oferece vagas gratuitas de graduação a cidadãos de países parceiros que residam fora do Brasil e atendam às condições do edital. Há requisitos de idade, nacionalidade, residência e escolaridade. O posto diplomático brasileiro responsável pelo seu local de residência participa da inscrição.",
          steps: ["Confira a lista de países e as regras sobre nacionalidade brasileira e filiação antes de solicitar documentos.", "Pergunte ao posto diplomático quando deve entregar histórico escolar, comprovação de renda e certificado de português. Compare o prazo com o calendário do Celpe-Bras."],
          sources: [0, 1],
        },
        {
          heading: "Como ler o edital internacional da UNILA",
          body: "Em Foz do Iguaçu, o edital inicial da UNILA para ingresso em 2027 ofereceu 480 vagas em 29 cursos. A seleção contemplou candidatos de países da América Latina e do Caribe previstos no edital, com ensino médio concluído no exterior e sem nacionalidade brasileira. O período daquela inscrição já encerrou.",
          steps: ["Procure seu país no Anexo III e o curso pretendido no Anexo VI. Para outra turma, leia também as retificações do edital correspondente.", "Anote as datas de classificação, convocação e pré-cadastro. A homologação da inscrição indica que o pedido foi submetido dentro do prazo."],
          sources: [2, 3],
        },
        {
          heading: "Como verificar a graduação no e-MEC",
          body: "O e-MEC reúne o cadastro público de instituições e cursos de educação superior. Uma mesma universidade pode oferecer graduações com nomes parecidos. Identificar a formação exata ajuda a comparar disciplinas obrigatórias e a escolher o campus em que fará sentido procurar moradia.",
          steps: ["Copie o nome da graduação e o local de oferta do edital. Confira o curso no cadastro e abra a matriz curricular da universidade.", "Se pretende exercer uma profissão regulamentada em outro país, consulte a autoridade daquele destino sobre o reconhecimento do diploma e os documentos que precisará guardar."],
          sources: [4, 2],
        },
        {
          heading: "Quanto reservar antes de aceitar uma vaga",
          body: "No PEC-G, o candidato comprova como vai se manter. Na seleção da UNILA usada como exemplo, a modalidade de demanda social exigiu comprovação própria. A concessão do auxílio dependeu de vagas e orçamento, inclusive para quem foi aprovado nessa modalidade.",
          steps: ["Faça cotações em reais para viagem, documentação, aluguel, caução, alimentação e deslocamento até o campus.", "Calcule quanto precisa ter disponível até a primeira parcela de qualquer auxílio confirmado. Confira no edital quando é obrigatória a presença em Foz antes de comprar a passagem."],
          sources: [0, 2],
        },
      ],
      faq: [
        { question: "Falo espanhol. Qual certificado de português devo providenciar?", answer: "Identifique primeiro a seleção. O serviço do PEC-G lista comprovação de português, e o Inep publica os editais do Celpe-Bras. Pergunte ao posto diplomático quais comprovantes são aceitos no seu ciclo. O processo da UNILA tem edital e regras de documentação próprios." },
        { question: "Minha inscrição na UNILA foi homologada. A vaga já está reservada?", answer: "A homologação indicada pela UNILA se refere ao envio da inscrição. Acompanhe a classificação, a sua convocação e o pré-cadastro obrigatório. Use a carta de aceite e as instruções oficiais para programar a matrícula e a chegada." },
      ],
    },
    es: {
      country: "Brasil",
      title: "Cómo estudiar una carrera en Brasil siendo extranjero",
      description: "Compara el PEC-G con la selección internacional de la UNILA, verifica el portugués y la carrera en e-MEC y calcula los gastos para estudiar en Brasil.",
      intro: "El país donde terminaste la secundaria y las nacionalidades que tienes pueden cambiar tu vía de acceso. Compara un programa nacional de cooperación con la convocatoria de una universidad federal situada en la frontera con Argentina y Paraguay.",
      alt: "Un estudiante señala un detalle de una maqueta de madera en un taller abierto y a la sombra.",
      sections: [
        {
          heading: "Quién puede solicitar una plaza por el PEC-G",
          body: "El PEC-G ofrece plazas de grado sin matrícula académica de pago a ciudadanos de países socios que residan fuera de Brasil y cumplan los requisitos. La convocatoria considera edad, nacionalidad, residencia y estudios secundarios. La representación diplomática brasileña de tu lugar de residencia interviene en la solicitud.",
          steps: ["Comprueba si tu país figura en la convocatoria y revisa las condiciones sobre ciudadanía brasileña y nacionalidad de tus padres.", "Pregunta cuándo se entregan el expediente escolar, los justificantes de ingresos y el certificado de portugués. Contrasta esa fecha con el calendario del Celpe-Bras."],
          sources: [0, 1],
        },
        {
          heading: "Cómo leer una convocatoria internacional de la UNILA",
          body: "En Foz do Iguaçu, la convocatoria inicial para ingresar en 2027 ofreció 480 plazas en 29 carreras. Se dirigió a nacionales de los países latinoamericanos y caribeños indicados, con secundaria completa en el extranjero y sin nacionalidad brasileña. El plazo de aquella convocatoria ya cerró.",
          steps: ["Localiza tu país en el anexo III y la carrera en el anexo VI. Si aspiras a otra promoción, revisa su convocatoria y las modificaciones publicadas.", "Guarda por separado las fechas de clasificación, convocatoria personal y prerregistro. La homologación de la inscripción en este proceso solo confirma la entrega dentro del plazo."],
          sources: [2, 3],
        },
        {
          heading: "Cómo comprobar la carrera en e-MEC",
          body: "El Ministerio de Educación publica e-MEC, el registro brasileño de instituciones y carreras de educación superior. Una universidad puede ofrecer dos títulos con nombres parecidos. Identificar el programa concreto permite comparar asignaturas obligatorias y elegir dónde buscar alojamiento.",
          steps: ["Copia el nombre de la carrera y la sede de la convocatoria. Consulta la ficha del programa y el plan de estudios que publica la universidad.", "Si quieres ejercer una profesión regulada en otro país, consulta a la autoridad competente de ese destino qué documentos exige para reconocer un título brasileño."],
          sources: [4, 2],
        },
        {
          heading: "Qué gastos prever al aceptar la plaza",
          body: "Los aspirantes al PEC-G deben acreditar cómo financiarán su estancia. En la convocatoria citada de la UNILA, la modalidad de ayuda por necesidad económica exigía documentación específica. La asignación de ayudas dependía de las plazas y del presupuesto disponibles.",
          steps: ["Cotiza en reales el viaje, los trámites, el alquiler con su depósito, la comida y el transporte al campus.", "Calcula cuánto necesitarías hasta el primer pago de una ayuda confirmada. Antes de comprar el pasaje, verifica cuándo exige la universidad estar en Foz para el inicio de clases."],
          sources: [0, 2],
        },
      ],
      faq: [
        { question: "Hablo español. ¿Qué certificado de portugués debo preparar?", answer: "Identifica primero la vía de ingreso. El servicio del PEC-G enumera la acreditación de portugués e Inep publica las convocatorias del Celpe-Bras. Consulta en la representación diplomática qué documentos acepta tu edición. La UNILA publica requisitos propios para su selección." },
        { question: "La UNILA homologó mi inscripción. ¿Puedo contar con la plaza?", answer: "La homologación se refiere a la entrega de la solicitud. Consulta la clasificación, la convocatoria personal y el prerregistro obligatorio. Espera la carta de aceptación y las instrucciones de la universidad antes de organizar la matrícula y el viaje." },
      ],
    },
  },
} satisfies StudyGuide;
