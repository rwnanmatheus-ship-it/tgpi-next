import type { StudyGuide } from "./types";

export default {
  slug: "argentina",
  countrySlug: "argentina",
  sources: [
    { label: "Secretaría de Educación · Guía de carreras universitarias", url: "https://www.argentina.gob.ar/capital-humano/educacion/universidades/guia-de-carreras-universitarias" },
    { label: "Secretaría de Educación · Resolución 480/2026", url: "https://www.argentina.gob.ar/normativa/nacional/norma-428570/texto" },
    { label: "Argentina.gob.ar · Validación de estudios en el exterior", url: "https://www.argentina.gob.ar/tema/educacion/guia-validez-titulos-estudios" },
    { label: "Universidad de Buenos Aires · Estudiantes extranjeros", url: "https://uba.ar/estudiantesextranjeros" },
    { label: "UBA · Ingreso y Ciclo Básico Común", url: "https://www.uba.ar/ingresouba" },
    { label: "CBC · Aspirantes sin DNI argentino", url: "https://www4.cbc.uba.ar/inscripciones/nodniarg.php" },
    { label: "UBA XXI · Preguntas frecuentes", url: "https://ubaxxi.uba.ar/preguntas-frecuentes/" },
    { label: "UBA XXI · Sedes de examen", url: "https://ubaxxi.uba.ar/sedes/" },
  ],
  locales: {
    en: {
      country: "Argentina",
      title: "Study in Argentina with a foreign school diploma",
      description: "Find Argentine degrees, prepare a foreign secondary diploma and compare UBA’s CBC and UBA XXI options, Spanish certificates and in-person exam costs.",
      intro: "A full degree, a semester abroad and a remote class lead to different applications in Argentina. Start by finding the qualification and city you want. Then use the University of Buenos Aires (UBA) as a worked example of what enrolling actually involves.",
      alt: "A student carries notebooks along a tiled gallery overlooking a courtyard.",
      sections: [
        {
          heading: "Find a degree and the campus that teaches it",
          body: "The national Guía de carreras universitarias lists qualifications at pregrado, grado and posgrado levels. A first full university degree is typically listed under grado. Searching by subject and mode of study lets you compare options beyond Buenos Aires.",
          steps: ["Choose two programmes. Record the exact award, teaching location, study mode and duration published by each university.", "Ask both registrars for admission dates for a foreign secondary diploma and for any charges applicable to your circumstances. Price housing and travel for the actual teaching site."],
          sources: [0],
        },
        {
          heading: "Prepare your secondary diploma before registration",
          body: "Argentina’s Resolution 480/2026 covers completed foreign secondary qualifications for further study. It calls for ID, the qualification from the competent authority, and the applicable apostille or official certification. An authorised Spanish translation is required where applicable.",
          steps: ["Use the national guidance for the country that issued your qualification. Check the rules for the school certificate itself before paying for a translation.", "Keep a copy of the application and the final decision. Ask your chosen university which document it accepts at pre-registration and when it needs the final record."],
          sources: [1, 2],
        },
        {
          heading: "How admission to UBA works",
          body: "International applicants for a first degree enter UBA through the Ciclo Básico Común (CBC), without a separate entrance exam. For applicants whose secondary diploma was issued in a non-Spanish-speaking country, UBA lists C1 Spanish and names the certificates it accepts, including SIELE Global.",
          steps: ["Use the specific CBC instructions if you lack an Argentine national ID (DNI). The published application window for that group for the first term of 2027 ended on 26 November 2026.", "Track pre-registration, document submission, choice of site and shift, and subject registration. Each is a separate action on UBA’s calendar."],
          sources: [3, 4, 5],
        },
        {
          heading: "Budget for UBA XXI exams even if you study online",
          body: "UBA XXI offers CBC subjects online. Partial and final exams take place in person and require prior registration in SIU Guaraní. A regional exam site may be closer than Buenos Aires, but the choice depends on which subjects the site hosts.",
          steps: ["Check the site list against each subject. In Buenos Aires the assigned building can vary, so verify your room in SIU Guaraní before travelling.", "Add exam journeys, accommodation if needed, Spanish certification and document processing to the budget. Ask when you will need to attend your degree faculty after the CBC."],
          sources: [4, 6, 7],
        },
      ],
      faq: [
        { question: "Can I complete the first part of my UBA degree entirely from abroad?", answer: "The UBA XXI learning platform can be accessed online. Its exam rules require attendance at an authorised site and advance registration. Compare the exam locations and dates available for your subjects before committing to study from another country." },
        { question: "I only want one semester at UBA. Should I enrol in the CBC?", answer: "Start with the international office at your home university. UBA lists mobility agreements and the option of applying directly to the relevant faculty as an independent exchange student. The CBC procedure described here is for applicants pursuing a degree." },
      ],
    },
    pt: {
      country: "Argentina",
      title: "Como fazer graduação na Argentina com ensino médio estrangeiro",
      description: "Encontre cursos na Argentina e entenda a validação do ensino médio, o espanhol C1 na UBA, o Ciclo Básico Comum e as provas presenciais do UBA XXI.",
      intro: "Uma graduação completa, um semestre de intercâmbio e uma disciplina a distância têm processos de ingresso diferentes na Argentina. Comece pelo diploma e pela cidade em que pretende estudar. Em seguida, veja como essas escolhas mudam a matrícula na Universidade de Buenos Aires (UBA).",
      alt: "Uma estudante leva cadernos por uma galeria de piso ladrilhado com vista para um pátio.",
      sections: [
        {
          heading: "Encontre o curso e a sede das aulas",
          body: "A Guía de carreras universitarias, do governo argentino, reúne cursos de pregrado, grado e posgrado. Uma graduação universitária completa costuma aparecer em grado. A busca por área e modalidade permite comparar instituições de Buenos Aires com outras do país.",
          steps: ["Escolha duas formações. Anote o nome exato do diploma, o local das aulas, a modalidade e a duração informada por cada universidade.", "Peça às secretarias o calendário para quem concluiu o ensino médio no exterior e os valores aplicáveis ao seu caso. Pesquise moradia e transporte perto da sede indicada."],
          sources: [0],
        },
        {
          heading: "Prepare a documentação do ensino médio",
          body: "A Resolução argentina 480/2026 trata de certificados estrangeiros de ensino médio completo para continuação dos estudos. Prevê apresentação de identidade e diploma emitido pela autoridade competente, com apostila ou certificação aplicável. A tradução ao espanhol por tradutor autorizado é exigida quando cabível.",
          steps: ["No portal nacional, consulte as orientações para o país emissor do diploma. Verifique as exigências para o documento escolar antes de encomendar a tradução.", "Guarde o protocolo e o resultado do pedido. Consulte a universidade sobre o documento aceito no pré-ingresso e a data em que precisará apresentar a validação definitiva."],
          sources: [1, 2],
        },
        {
          heading: "Como funciona o ingresso na UBA",
          body: "Quem pretende fazer uma graduação completa na UBA ingressa pelo Ciclo Básico Comum (CBC), sem vestibular específico para estrangeiros. Quando o diploma de ensino médio vem de país que não fala espanhol, a UBA indica nível C1 e lista os certificados aceitos, entre eles o SIELE Global.",
          steps: ["Quem ainda não tem o documento argentino de identidade (DNI) deve consultar as instruções próprias do CBC. Para esse grupo, a janela publicada para o primeiro semestre de 2027 terminou em 26 de novembro de 2026.", "Anote os prazos de pré-ingresso, entrega de documentos, escolha da sede e do turno e inscrição nas disciplinas."],
          sources: [3, 4, 5],
        },
        {
          heading: "Quanto custa o deslocamento para as provas do UBA XXI?",
          body: "O UBA XXI oferece disciplinas do CBC a distância. As provas parciais e finais são presenciais e exigem inscrição no SIU Guaraní. Uma sede regional pode encurtar a viagem se oferecer a prova da sua disciplina.",
          steps: ["Cruze cada disciplina com a lista de sedes. Na cidade de Buenos Aires, o prédio muda conforme a matéria. Confirme a sala no SIU Guaraní antes da prova.", "Some viagem, eventual hospedagem, certificação de idioma e documentação ao orçamento. Pergunte à faculdade quando será necessário comparecer presencialmente depois do CBC."],
          sources: [4, 6, 7],
        },
      ],
      faq: [
        { question: "Posso cursar o começo da graduação da UBA sem sair do Brasil?", answer: "O ambiente de estudos do UBA XXI pode ser acessado pela internet. Para fazer as avaliações é preciso se inscrever e comparecer a uma sede autorizada. Confira onde e quando são aplicadas as provas das disciplinas que você escolheu antes de planejar uma estadia curta." },
        { question: "Quero fazer apenas um semestre de intercâmbio. Preciso entrar pelo CBC?", answer: "Consulte primeiro a área internacional da sua universidade. A UBA descreve convênios de mobilidade e a possibilidade de solicitar uma vaga de intercâmbio diretamente na faculdade de interesse. O fluxo do CBC deste guia é para quem busca uma graduação completa." },
      ],
    },
    es: {
      country: "Argentina",
      title: "Cómo estudiar en Argentina con un título secundario extranjero",
      description: "Busca carreras en Argentina y prepara el ingreso a la UBA. Consulta la convalidación del secundario, el español C1, el CBC y los exámenes de UBA XXI.",
      intro: "Cursar una carrera completa, hacer un intercambio y tomar una materia a distancia son decisiones distintas en Argentina. Empieza por identificar qué título quieres y en qué ciudad se dicta. Después, mira cómo se traducen esas decisiones en trámites concretos en la Universidad de Buenos Aires (UBA).",
      alt: "Una estudiante lleva cuadernos por una galería de suelo de baldosas que da a un patio.",
      sections: [
        {
          heading: "Encuentra la carrera y la sede donde se dicta",
          body: "La Guía de carreras universitarias reúne la oferta nacional de pregrado, grado y posgrado. Si buscas una primera carrera universitaria completa, empieza por grado. Filtrar por área y modalidad te permite comparar universidades de Buenos Aires y de otras ciudades del país.",
          steps: ["Elige dos carreras y anota el nombre exacto del título, la localidad, la modalidad de cursada y la duración que publica la institución.", "Pregunta en cada secretaría por el calendario para aspirantes con secundario extranjero y los cargos aplicables a tu situación. Cotiza alojamiento y transporte para la sede concreta."],
          sources: [0],
        },
        {
          heading: "Prepara el título secundario para su convalidación",
          body: "La Resolución 480/2026 regula la convalidación de estudios secundarios completos cursados en el exterior para continuar estudios en Argentina. Pide identificación y título expedido por autoridad competente, con apostilla o certificación aplicable. La traducción al español por traductor autorizado se presenta cuando corresponde.",
          steps: ["Consulta la orientación nacional según el país que emitió tu título. Verifica qué exige para la documentación escolar antes de encargar una traducción.", "Conserva la constancia de inicio y la resolución final. Pregunta a la universidad qué admite al preinscribirte y hasta cuándo puedes presentar la acreditación definitiva."],
          sources: [1, 2],
        },
        {
          heading: "Cómo ingresar a una carrera en la UBA",
          body: "Los aspirantes extranjeros que quieren cursar una carrera de grado ingresan por el Ciclo Básico Común (CBC), sin examen de admisión específico. Si obtuviste el secundario en un país no hispanohablante, la UBA indica un nivel C1 de español y enumera los certificados que acepta, entre ellos SIELE Global.",
          steps: ["Consulta el instructivo especial del CBC si aún no tienes DNI argentino. Para ese grupo, el plazo publicado para el primer cuatrimestre de 2027 terminó el 26 de noviembre de 2026.", "Registra por separado las fechas de preingreso, presentación de documentación, elección de sede y turno, e inscripción a materias."],
          sources: [3, 4, 5],
        },
        {
          heading: "Qué viajes exige cursar por UBA XXI",
          body: "UBA XXI permite estudiar materias del CBC en línea. Sus exámenes parciales y finales son presenciales y requieren inscripción previa por SIU Guaraní. Una subsede puede acortar el viaje si ofrece la materia que quieres cursar.",
          steps: ["Cruza cada materia con el listado de sedes. En la Ciudad de Buenos Aires el edificio depende de la asignatura. Confirma el aula en SIU Guaraní antes de desplazarte.", "Suma traslados, posible alojamiento, certificación de idioma y trámites al presupuesto. Pregunta qué asistencia exigirá la facultad cuando termines el CBC."],
          sources: [4, 6, 7],
        },
      ],
      faq: [
        { question: "¿Puedo hacer el primer tramo de la UBA sin viajar a Argentina?", answer: "El campus virtual de UBA XXI se puede consultar en línea. Para rendir debes inscribirte y asistir a una sede autorizada. Comprueba las sedes y fechas disponibles para tus materias antes de organizar la cursada desde otro país." },
        { question: "Quiero cursar un solo semestre en la UBA. ¿Debo inscribirme en el CBC?", answer: "Consulta a la oficina internacional de tu universidad. La UBA contempla convenios de movilidad y la posibilidad de solicitar un intercambio libre en la facultad correspondiente. El ingreso por CBC que se explica aquí se dirige a quienes quieren obtener un título de grado." },
      ],
    },
  },
} satisfies StudyGuide;
