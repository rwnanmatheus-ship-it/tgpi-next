import type { StudyGuide } from './types';

export default {
  slug: 'australia',
  countrySlug: 'australia',
  sources: [
    { label: 'Study Australia · Course Search', url: 'https://www.studyaustralia.gov.au/en/plan-your-studies/find-a-course' },
    { label: 'University of Melbourne · International undergraduate entry requirements', url: 'https://study.unimelb.edu.au/how-to-apply/undergraduate-study/international-applications/entry-requirements' },
    { label: 'University of Melbourne · Brazil entry requirements', url: 'https://study.unimelb.edu.au/how-to-apply/undergraduate-study/recognised-vce-equivalent-qualifications/brazil-entry-requirements' },
    { label: 'University of Melbourne · Undergraduate fees and payments', url: 'https://study.unimelb.edu.au/how-to-apply/undergraduate-study/international-applications/fees-and-payments' },
    { label: 'Study Australia · How to apply for your visa', url: 'https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process' },
  ],
  locales: {
    en: {
      country: 'Australia',
      title: 'Study in Australia: find a bachelor’s degree and check entry requirements',
      description: 'Compare CRICOS-listed options, see how Melbourne assesses overseas school results, estimate tuition and understand the steps from an offer to enrolment.',
      intro: 'Start with the qualification you will finish school with and the degree you want to take. An applicant who studied in Brazil, for example, can look up the University of Melbourne’s requirements for the Enem before spending money on another test.',
      alt: 'Three students walk along a tree-lined path carrying notebooks and a roll of paper.',
      sections: [
        { heading: 'Find the course and campus you would actually attend', body: 'The Australian government’s Study Australia search covers courses from providers registered on CRICOS. Search for a bachelor’s degree in your subject, then open the provider’s own course page. Two results with similar names can lead to different cities and different budgets.', steps: ['Save the provider, course name, campus, duration and intake for each option.', 'Check whether the subjects you want are offered at that campus in your intended intake.'], sources: [0] },
        { heading: 'Match your school qualification to the entry route', body: 'Melbourne checks the school qualification, score, individual subject prerequisites and English proficiency. Its Brazilian qualifications table gives a concrete example. For the Bachelor of Agriculture it lists an Enem minimum of 620 plus a qualifying AP, SAT or ACT result and prerequisite subjects in English and maths.', steps: ['Use the row for your own degree and qualification. Other degrees have different scores.', 'If your qualification is missing from Melbourne’s list, ask about individual assessment and send the exact name of the award.'], sources: [1, 2] },
        { heading: 'Build the tuition estimate from the subjects', body: 'Melbourne calculates international undergraduate tuition from the discipline and study load of each subject. The typical annual figure is a starting point. A change in your subject mix can change the bill.', steps: ['Choose a possible first-year subject list and check it against the international fee table for that year.', 'Budget separately for housing, travel and health cover if required. Mark when the offer deposit is due so it appears in your cash-flow plan.'], sources: [0, 3, 4] },
        { heading: 'Read the offer before committing money', body: 'The offer letter sets out fees, enrolment conditions and refund arrangements. The provider generally issues a Confirmation of Enrolment (CoE) after acceptance and completion of its enrolment steps. The government lists a valid CoE among the documents for a Student visa application.', steps: ['Keep the offer, its refund terms and proof that you met any conditions.', 'Before booking travel, use the government checklist for your own visa documents and health cover.'], sources: [4] },
      ],
      faq: [
        { question: 'Can I use my Enem score by itself at Melbourne?', answer: 'For the Brazilian route in its published table, Melbourne also checks school completion, another qualifying test, course prerequisites and English. Read the row for the degree you want before booking a test.' },
        { question: 'What if I studied in English?', answer: 'Melbourne permits certain previous studies in English as evidence alongside approved test routes. Check which studies, dates and documents meet its undergraduate English requirement before paying for an exam.' },
      ],
    },
    pt: {
      country: 'Austrália',
      title: 'Graduação na Austrália: cursos, ingresso com Enem e custos em Melbourne',
      description: 'Encontre cursos no catálogo oficial, confira como Melbourne avalia o Enem e outros diplomas e calcule a anuidade pelas disciplinas que pretende cursar.',
      intro: 'O que falta entre o seu certificado de ensino médio e uma vaga na Austrália? A resposta depende da graduação e da universidade. Veja como localizar a regra da sua formação e como um estudante brasileiro pode conferir se precisa de outra prova além do Enem.',
      alt: 'Três estudantes caminham por uma alameda arborizada com cadernos e um rolo de papel.',
      sections: [
        { heading: 'Encontre o curso e o campus onde você teria aulas', body: 'O buscador do governo australiano reúne cursos de instituições registradas no CRICOS. Filtre por graduação e área de interesse e abra a página da instituição. Cursos com títulos parecidos podem estar em cidades diferentes, com deslocamentos e despesas bem distintos.', steps: ['Anote instituição, campus, duração e período de ingresso de cada opção.', 'Confira se as disciplinas que você procura são oferecidas naquele campus e na entrada desejada.'], sources: [0] },
        { heading: 'Confira quais notas e provas o seu diploma exige', body: 'A Universidade de Melbourne avalia o certificado escolar, a pontuação, as disciplinas exigidas e o inglês. Para o Bachelor of Agriculture, por exemplo, a tabela brasileira indica mínimo de 620 no Enem, desempenho complementar em AP, SAT ou ACT e pré-requisitos em inglês e matemática.', steps: ['Leia a linha da graduação escolhida. A pontuação do curso de Agricultura vale para aquele exemplo.', 'Se o diploma da sua formação não aparecer na lista, informe à universidade o nome exato do certificado e peça uma avaliação individual.'], sources: [1, 2] },
        { heading: 'Calcule a anuidade a partir da grade', body: 'Em Melbourne, o preço da graduação internacional depende da área e da carga de cada disciplina. A estimativa anual publicada ajuda a comparar opções, mas mudar uma matéria pode alterar a cobrança.', steps: ['Monte uma grade provável para o primeiro ano e confira os valores na tabela daquele período.', 'Separe moradia, passagens e cobertura de saúde quando exigida. Registre a data do depósito solicitado na oferta para saber quanto dinheiro precisa ter antes das aulas.'], sources: [0, 3, 4] },
        { heading: 'Entenda o intervalo entre a oferta e a matrícula', body: 'Leia na carta de oferta o valor, as condições de matrícula e as regras de reembolso. Em geral, a instituição emite a Confirmation of Enrolment (CoE) depois do aceite e do cumprimento dessas condições. O governo pede uma CoE válida na solicitação do visto de estudante.', steps: ['Guarde a carta, as regras de reembolso e os comprovantes de cumprimento das condições.', 'Antes de comprar a passagem, confira a lista oficial de documentos e as exigências de cobertura de saúde para o seu caso.'], sources: [4] },
      ],
      faq: [
        { question: 'Só a nota do Enem basta para Melbourne?', answer: 'Na via brasileira publicada pela universidade, também entram o certificado de conclusão, outra prova aceita, as disciplinas exigidas pelo curso e a comprovação de inglês. A linha da sua graduação indica quais resultados consultar.' },
        { question: 'Quem estudou em inglês precisa fazer prova de idioma?', answer: 'Melbourne aceita determinados estudos anteriores em inglês como comprovação. Antes de pagar por uma prova, consulte quais formações, datas e documentos atendem ao requisito da graduação.' },
      ],
    },
    es: {
      country: 'Australia',
      title: 'Estudiar un grado en Australia: requisitos, matrícula y oferta de admisión',
      description: 'Busca grados en el catálogo oficial, consulta cómo Melbourne evalúa los estudios extranjeros y calcula el precio de las asignaturas de tu primer año.',
      intro: 'La pregunta inicial es qué te falta para pasar de tu título de secundaria a un grado concreto. La respuesta cambia según el sistema educativo y la universidad. Melbourne, por ejemplo, publica una tabla para quienes terminaron la secundaria en Brasil y presentan el Enem.',
      alt: 'Tres estudiantes caminan por un sendero arbolado con cuadernos y un rollo de papel.',
      sections: [
        { heading: 'Localiza el grado y el campus donde estudiarías', body: 'El buscador público Study Australia reúne cursos de instituciones registradas en CRICOS. Busca por nivel y materia y consulta después la ficha del centro. Dos grados con nombres parecidos pueden impartirse en ciudades con costes y tiempos de desplazamiento muy diferentes.', steps: ['Anota el centro, el campus, la duración y el periodo de ingreso de cada opción.', 'Comprueba qué asignaturas se imparten en ese campus y en la convocatoria que te interesa.'], sources: [0] },
        { heading: 'Averigua cómo se valorará tu título de secundaria', body: 'Melbourne comprueba la titulación escolar, la nota, las materias previas y el inglés. Para el Bachelor of Agriculture, la tabla brasileña recoge un mínimo de 620 en el Enem, un resultado complementario en AP, SAT o ACT y requisitos de inglés y matemáticas.', steps: ['Busca la fila de tu titulación y tu grado. Las notas del ejemplo de Agricultura corresponden a esa combinación.', 'Si tu título no figura en la lista, indica a admisiones el nombre oficial del certificado y pregunta por la evaluación individual.'], sources: [1, 2] },
        { heading: 'Calcula el coste con un plan de asignaturas', body: 'Melbourne calcula la matrícula internacional según la disciplina y la carga de cada asignatura. La cifra anual orientativa ayuda a comparar grados. Cambiar de asignatura puede modificar el importe final.', steps: ['Haz una lista provisional de asignaturas del primer año y compárala con la tabla de precios de ese periodo.', 'Añade alojamiento, viaje y cobertura sanitaria si se exige. Apunta el vencimiento del depósito de aceptación para saber cuándo necesitarás los fondos.'], sources: [0, 3, 4] },
        { heading: 'Revisa las condiciones de la oferta', body: 'En la carta de admisión encontrarás las condiciones de matrícula, los importes y la política de devolución. Por lo general, el centro emite la Confirmation of Enrolment (CoE) después de que aceptes y cumplas sus condiciones. Para solicitar el visado de estudiante, el gobierno pide una CoE válida.', steps: ['Guarda la oferta, las condiciones de devolución y las pruebas de que has cumplido los requisitos.', 'Antes de reservar el viaje, consulta la lista oficial de documentos y de cobertura sanitaria aplicable a tu caso.'], sources: [4] },
      ],
      faq: [
        { question: '¿Basta la nota del Enem para entrar en Melbourne?', answer: 'Para la vía brasileña publicada, también cuentan la titulación de secundaria, otra prueba admitida, las asignaturas previas y el inglés. Comprueba la fila del grado que quieres cursar antes de reservar un examen.' },
        { question: '¿Puedo demostrar mi inglés con mis estudios anteriores?', answer: 'Melbourne admite ciertos estudios previos en inglés como acreditación. Revisa qué formación, fechas y documentos reconoce para el grado antes de pagar una prueba de idioma.' },
      ],
    },
  },
} satisfies StudyGuide;
