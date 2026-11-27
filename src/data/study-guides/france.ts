import type { StudyGuide } from './types';

export default {
  slug: 'france',
  countrySlug: 'france',
  sources: [
    { label: 'Ministère de l’Enseignement supérieur · DAP', url: 'https://www.enseignementsup-recherche.gouv.fr/fr/dossier-blanc-demande-d-admission-prealable-dap-pour-une-premiere-inscription-dans-une-universite-46452' },
    { label: 'Campus France · Parcoursup & Études en France', url: 'https://www.campusfrance.org/en/application-higher-education-france' },
    { label: 'Université Paris-Saclay · L1 Mathématiques, Informatique', url: 'https://www.sciences.universite-paris-saclay.fr/en/education/licence-undergraduate-programme/informatique/l1-portail-mathematiques-informatique-mi' },
    { label: 'Service Public · Droits d’inscription 2026–2027', url: 'https://www.service-public.gouv.fr/particuliers/actualites/A17481' },
    { label: 'Étudiant.gouv.fr · CVEC', url: 'https://www.etudiant.gouv.fr/fr/cvec-une-demarche-de-rentree-incontournable-955' },
  ],
  locales: {
    en: {
      country: 'France',
      title: 'Study in France after secondary school',
      description: 'Choose between DAP and Parcoursup, check the 2027 first-year deadline, compare public licence fees and explore a French-taught course at Paris-Saclay.',
      intro: 'Which application opens the door to a first-year licence in France? Two students in the same graduating class can need different portals. Write down your citizenship, country of residence, the diploma you will hold and the exact programme. Use those four details when you look up the route, the cost and the timetable.',
      alt: 'A student with a canvas tote crosses a tree-shaded courtyard lined with stone arches.',
      sections: [
        { heading: 'Choose the route for your diploma and residence', body: 'For a first university licence, an applicant abroad with a foreign secondary diploma and citizenship outside the EU, EEA and Switzerland generally needs a demande d’admission préalable (DAP). In participating countries such as Brazil, the process runs through Études en France. In other countries the French embassy’s cultural service handles the white application file.', steps: ['Check whether your country of residence appears on the ministry list and read the local Campus France instructions.', 'For an EU applicant or a holder of the French or European Baccalaureate, check Parcoursup. Selective first-year programmes can have a different route.'], sources: [0, 1] },
        { heading: 'Plan backwards from the 2027 DAP deadline', body: 'The ministry gives 15 December 2026 as the submission deadline for the 2027–28 first-year DAP covered by its white-file guidance. It allows three university choices. Language testing generally applies unless an exemption covers you. Use the local office’s dates for appointments and processing.', steps: ['Record the application year, each course title and any language-test date before submitting.', 'Keep the receipt and check your account for decisions. Parcoursup and other intakes have their own calendars.'], sources: [0, 1] },
        { heading: 'Read a real first-year course at Paris-Saclay', body: 'The L1 Mathématiques, Informatique pathway is taught in French at Orsay/Bures-sur-Yvette. First-semester students study introductory programming alongside calculus, algebra and geometry. Algorithms and modular programming follow in the second semester. The combination helps you judge the mathematics involved in this computing pathway.', steps: ['Compare the course units and language of instruction with your strengths and goals.', 'Locate the teaching site before estimating rent and rail travel. Confirm the timetable for the year you intend to enter.'], sources: [2] },
        { heading: 'Price tuition and the campus contribution separately', body: 'For 2026–27, the standard public licence fee is €178 and the differentiated rate is €2,902 for students covered by it. The campus contribution (CVEC) is €105 for those who must pay. A student liable for the differentiated fee and the CVEC would budget €3,007 before housing, food and travel.', steps: ['Ask the institution which category and exemptions apply to your circumstances.', 'Use the figures for your actual entry year and obtain the CVEC certificate if your enrolment requires it.'], sources: [3, 4] },
      ],
      faq: [
        { question: 'Does any high-school diploma from Europe count as a European Baccalaureate?', answer: 'The ministry uses this term for a specific diploma from accredited European Schools. If you studied at another school, check the exact name of your qualification alongside your citizenship before selecting Parcoursup or the DAP.' },
        { question: 'Can I use the 2026–27 fees to budget for autumn 2027?', answer: 'Use them as a starting estimate. Enter the fee category, the academic year and the CVEC separately. Recalculate once the new national rates and your university’s decision about any exemption are available.' },
      ],
    },
    pt: {
      country: 'França',
      title: 'Como fazer graduação na França após o ensino médio',
      description: 'Entenda DAP, Études en France e Parcoursup, confira o prazo de 2027, calcule as taxas da licence e conheça um curso em francês na Paris-Saclay.',
      intro: 'Quem quer entrar no primeiro ano de uma licence na França precisa descobrir qual candidatura se aplica ao próprio caso. Duas pessoas que terminaram o ensino médio juntas podem usar portais diferentes. Anote sua nacionalidade, o país onde mora, o nome do diploma e o curso exato antes de comparar calendário, requisitos e despesas.',
      alt: 'Uma estudante com bolsa de tecido atravessa um pátio arborizado cercado por arcos de pedra.',
      sections: [
        { heading: 'Identifique o portal a partir do diploma e da residência', body: 'Para a primeira licence universitária, quem mora no exterior, tem diploma estrangeiro de ensino médio e cidadania de fora da UE, do Espaço Econômico Europeu e da Suíça geralmente precisa da demande d’admission préalable (DAP). Em países participantes, como o Brasil, ela é feita pelo Études en France. Nos demais, o serviço cultural da embaixada francesa recebe o dossiê branco.', steps: ['Procure seu país de residência na lista do ministério e consulte o escritório local da Campus France.', 'Quem tem cidadania da UE ou baccalauréat francês ou europeu deve conferir o Parcoursup. Formações seletivas também podem ter outra via.'], sources: [0, 1] },
        { heading: 'Prepare a DAP para o ingresso de 2027', body: 'Para a DAP de primeiro ano descrita nas instruções do dossiê branco de 2027/28, o ministério indica 15 de dezembro de 2026 como prazo de entrega. É possível indicar três universidades. Em regra há prova de idioma, salvo dispensa. Confira com o escritório local os agendamentos e a tramitação.', steps: ['Registre o ano de ingresso, o nome oficial de cada formação e a data da prova de idioma.', 'Guarde o comprovante e acompanhe as respostas na conta. O Parcoursup e os outros processos têm calendários próprios.'], sources: [0, 1] },
        { heading: 'Veja o que se estuda no primeiro ano da Paris-Saclay', body: 'A formação L1 Mathématiques, Informatique é ministrada em francês em Orsay/Bures-sur-Yvette. O primeiro semestre combina introdução à programação, cálculo, álgebra e geometria. No segundo entram algoritmos e programação modular. A grade permite avaliar quanto de matemática faz parte da formação em computação.', steps: ['Compare as disciplinas e o idioma das aulas com a sua preparação e seus objetivos.', 'Localize o campus antes de orçar aluguel e trem. Confirme o calendário para o ano em que pretende começar.'], sources: [2] },
        { heading: 'Faça a conta da matrícula e da contribuição de campus', body: 'Na licence pública de 2026/27, a taxa anual padrão é € 178. A tarifa diferenciada chega a € 2.902 para quem se enquadra nela. A contribuição de vida estudantil e de campus (CVEC) é € 105 para quem deve pagá-la. No cenário de tarifa diferenciada e CVEC integral, são € 3.007 antes de moradia, alimentação e transporte.', steps: ['Pergunte à instituição qual categoria se aplica ao seu caso e se existe dispensa.', 'Atualize os valores para o ano de ingresso e emita o comprovante da CVEC quando a matrícula o exigir.'], sources: [3, 4] },
      ],
      faq: [
        { question: 'Qualquer diploma europeu de ensino médio conta como baccalauréat europeu?', answer: 'O ministério usa esse nome para um diploma específico das Escolas Europeias credenciadas. Se você estudou em outra escola, confira o nome oficial do seu certificado e a sua nacionalidade antes de escolher entre Parcoursup e DAP.' },
        { question: 'Posso usar os preços de 2026/27 para planejar o ingresso em 2027?', answer: 'Eles servem como estimativa inicial. Registre separadamente o ano, a categoria da taxa e a CVEC. Refaça o cálculo quando saírem os novos valores e a universidade responder sobre eventual dispensa.' },
      ],
    },
    es: {
      country: 'Francia',
      title: 'Cómo estudiar un grado en Francia después de secundaria',
      description: 'Elige entre DAP y Parcoursup, comprueba el plazo de 2027, calcula las tasas de la licence y conoce un curso en francés en Paris-Saclay.',
      intro: '¿Qué vía debes usar para solicitar plaza en el primer año de una licence francesa? Incluso dos alumnos del mismo colegio pueden necesitar portales diferentes. Anota tu nacionalidad, el país donde vives, el nombre de tu título y la carrera concreta. Esos cuatro datos orientan la búsqueda de requisitos, fechas y costes.',
      alt: 'Una estudiante con una bolsa de tela cruza un patio arbolado rodeado de arcos de piedra.',
      sections: [
        { heading: 'Elige el portal según tu título y lugar de residencia', body: 'Para la primera licence universitaria, quien vive en el extranjero, tiene un título extranjero de secundaria y posee nacionalidad de fuera de la UE, el Espacio Económico Europeo y Suiza suele necesitar una demande d’admission préalable (DAP). En países participantes como Brasil se tramita por Études en France. En otros países, el servicio cultural de la embajada francesa recibe el expediente blanco.', steps: ['Busca tu país de residencia en la lista del ministerio y consulta a la oficina local de Campus France.', 'Con nacionalidad de la UE o un bachillerato francés o europeo, consulta Parcoursup. Las titulaciones selectivas también pueden seguir otra vía.'], sources: [0, 1] },
        { heading: 'Organiza los plazos de la DAP para 2027', body: 'El ministerio fija el 15 de diciembre de 2026 como fecha de entrega para la DAP de primer año de 2027/28 recogida en las instrucciones del expediente blanco. Se pueden indicar tres universidades. Por regla general se realiza una prueba de idioma, salvo exención. Consulta con la oficina local las citas y los tiempos de tramitación.', steps: ['Apunta el año de ingreso, el nombre oficial de las carreras y la fecha de la prueba de idioma.', 'Conserva el justificante y revisa las decisiones en tu cuenta. Parcoursup y otras convocatorias tienen calendarios propios.'], sources: [0, 1] },
        { heading: 'Explora el primer año de Informática en Paris-Saclay', body: 'La vía L1 Mathématiques, Informatique se imparte en francés en Orsay/Bures-sur-Yvette. En el primer semestre se cursan introducción a la programación, cálculo, álgebra y geometría. En el segundo llegan algoritmos y programación modular. El programa permite estimar la carga matemática de esta opción.', steps: ['Compara las asignaturas y el idioma de las clases con tu preparación y tus objetivos.', 'Localiza el campus antes de calcular el alquiler y el trayecto en tren. Confirma las fechas del año de ingreso.'], sources: [2] },
        { heading: 'Suma la matrícula y la contribución al campus', body: 'En una licence pública de 2026/27, la tasa ordinaria es de 178 €. La tarifa diferenciada es de 2.902 € para quienes estén sujetos a ella. La contribución a la vida estudiantil y al campus (CVEC) es de 105 € para quien deba abonarla. Con tarifa diferenciada y CVEC íntegra serían 3.007 € antes de alojamiento, alimentación y transporte.', steps: ['Pregunta a la institución qué tarifa y exenciones corresponden a tu situación.', 'Actualiza los importes para tu curso de ingreso y obtén el certificado de la CVEC si la matrícula lo exige.'], sources: [3, 4] },
      ],
      faq: [
        { question: '¿Cualquier título de secundaria europeo equivale al Bachillerato Europeo?', answer: 'El ministerio utiliza esa denominación para un diploma específico de las Escuelas Europeas acreditadas. Si estudiaste en otro centro, revisa el nombre oficial de tu título junto con tu nacionalidad antes de elegir Parcoursup o la DAP.' },
        { question: '¿Puedo usar las tarifas de 2026/27 para presupuestar el ingreso en 2027?', answer: 'Sirven como primera estimación. Anota por separado el curso, la categoría de la tasa y la CVEC. Recalcula cuando se publiquen los nuevos importes y la universidad te responda sobre una posible exención.' },
      ],
    },
  },
} satisfies StudyGuide;
