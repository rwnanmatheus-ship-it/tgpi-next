import type { StudyGuide } from './types';

export default {
  slug: 'new-zealand',
  countrySlug: 'new-zealand',
  sources: [
    { label: 'New Zealand Qualifications Authority · Bachelor’s Degree', url: 'https://www2.nzqa.govt.nz/qualifications-and-standards/about-qualifications-and-credentials/bachelors-degree/' },
    { label: 'University of Auckland · Overseas secondary school applicants', url: 'https://www.auckland.ac.nz/en/study/applications-and-admissions/entry-requirements/undergraduate-entry-requirements/overseas-secondary-school-applicants.html' },
    { label: 'University of Auckland · Bachelor of Science', url: 'https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-science-bsc..html' },
    { label: 'University of Auckland · First-year enrolment for undergraduate health programmes', url: 'https://www.auckland.ac.nz/en/study/applications-and-admissions/enrolment/choosing-your-courses/first-year-enrolment-for-undergraduate-health-programmes.html' },
  ],
  locales: {
    en: {
      country: 'New Zealand',
      title: 'Study in New Zealand: science degrees, Auckland entry dates and tuition',
      description: 'Compare science majors at Auckland, check admission with an overseas school qualification and budget for 120 points. See when the clinical pathway starts.',
      intro: 'Could you start a science degree in Auckland in July and still apply for a clinical programme the following year? For applicants planning the University of Auckland’s first-year clinical pathway, the starting semester matters. First decide whether you want to complete the science degree itself or use an eligible first year to apply elsewhere in the faculty.',
      alt: 'Two students cross a covered wooden walkway above a stream, with misty hills behind them.',
      sections: [
        { heading: 'Read the degree in points and subjects', body: 'New Zealand’s qualifications authority sets a minimum of 360 credits for a bachelor’s degree. Auckland’s Bachelor of Science (BSc) has 360 points, typically taken over three years of full-time study. You can select a major or a more concentrated specialisation. A final-stage capstone lets you apply your subject knowledge to a problem.', steps: ['Compare the upper-level courses in two majors and find the capstone you would take.', 'Work backwards from your preferred advanced courses to the first-year subjects they require.'], sources: [0, 2] },
        { heading: 'Find the requirements for your school system', body: 'Auckland distinguishes admission to the university, entry to the programme and the English requirement. Its overseas qualifications page links to tables for different school systems. The programme page also has a qualification selector and lists extra requirements for certain majors.', steps: ['Use the award printed on your certificate and select the intake year you are applying for.', 'If you also attended university, check the tertiary-applicant route and ask admissions how your completed study fits.'], sources: [1, 2] },
        { heading: 'Choose your intake before planning a clinical pathway', body: 'The BSc page lists 8 December 2026 as the closing date for Semester One 2027 and 4 July 2027 for Semester Two. The second-semester intake excludes students planning to enter a year-two clinical programme through a BSc health major. Nutrition and Physiology are among the eligible first-year majors.', steps: ['For clinical entry in 2028, check the eight first-year courses required for your chosen route and the selection rules for the clinical programme.', 'If you intend to finish the BSc, plan around your major’s normal course sequence and its own intake availability.'], sources: [2, 3] },
        { heading: 'Estimate the full cost of one year in Auckland', body: 'For 2027, the BSc programme page estimates annual international tuition of NZ$48,426 to NZ$60,910. It separately lists a Student Services Fee of NZ$1,158 for 120 points. At the lower tuition estimate, those two items total NZ$49,584 before housing, books, travel or insurance.', steps: ['Use New Zealand dollars throughout your first calculation. Record which year and study load the quote covers.', 'Price accommodation for the months you expect to stay, then check the final charges after course enrolment.'], sources: [2] },
      ],
      faq: [
        { question: 'Does a BSc health major secure a place in medicine?', answer: 'It can provide an eligible first year. Applicants then go through a separate selection process for the clinical programme. Check the rules for your intended entry year before choosing courses.' },
        { question: 'What is the difference between a major and a specialisation at Auckland?', answer: 'In the BSc, a major takes up roughly a third of your courses and a specialisation about half. Compare the required subjects to see how much room each leaves for other interests.' },
      ],
    },
    pt: {
      country: 'Nova Zelândia',
      title: 'Graduação na Nova Zelândia: Ciências em Auckland, prazos e anuidades',
      description: 'Compare as áreas de Ciências em Auckland, confira o ingresso com diploma estrangeiro e calcule o custo de 120 pontos. Veja qual semestre permite a via clínica.',
      intro: 'Dá para começar Ciências em Auckland em julho e concorrer a Medicina no ano seguinte pela via do primeiro ano? Na Universidade de Auckland, a escolha do semestre muda essa possibilidade. Defina primeiro se pretende concluir Ciências ou usar o primeiro ano de uma área elegível para disputar uma vaga clínica.',
      alt: 'Dois estudantes percorrem uma passarela coberta de madeira sobre um riacho, com colinas envoltas em névoa ao fundo.',
      sections: [
        { heading: 'Entenda os pontos e o que você vai estudar', body: 'A autoridade neozelandesa de qualificações define o mínimo de 360 créditos para um bacharelado. O Bachelor of Science (BSc) de Auckland tem 360 pontos, normalmente distribuídos em três anos de dedicação integral. É possível escolher uma área principal ou uma especialização mais concentrada. Há um projeto final para aplicar o que se aprendeu.', steps: ['Compare as matérias avançadas de duas áreas e veja qual projeto final cada uma prevê.', 'Parta das disciplinas que você quer cursar no último ano e identifique os pré-requisitos já no primeiro.'], sources: [0, 2] },
        { heading: 'Confira como será avaliado seu diploma', body: 'Auckland separa o ingresso na universidade, os critérios do curso e o requisito de inglês. A página de certificados estrangeiros reúne tabelas por sistema educacional. Na ficha do curso, selecione sua formação e confira também as exigências adicionais de algumas áreas.', steps: ['Use o nome oficial impresso no certificado e selecione o ano de ingresso correto.', 'Se já cursou ensino superior, consulte a via para candidatos com estudos universitários e confirme como apresentar seu histórico.'], sources: [1, 2] },
        { heading: 'Escolha o semestre certo para a via clínica', body: 'Para o BSc, Auckland publicou 8 de dezembro de 2026 como prazo do primeiro semestre de 2027 e 4 de julho de 2027 para o segundo. A entrada no segundo semestre exclui quem pretende usar uma área de saúde do BSc para concorrer ao segundo ano de um curso clínico. Nutrição e Fisiologia estão entre as áreas de primeiro ano elegíveis.', steps: ['Para concorrer em 2028, confira as oito disciplinas do primeiro ano e os critérios de seleção do curso clínico pretendido.', 'Se o objetivo for concluir o BSc, consulte a sequência de disciplinas e as entradas disponíveis para a sua área.'], sources: [2, 3] },
        { heading: 'Monte o orçamento de um ano em Auckland', body: 'Para 2027, a página do BSc estima a anuidade internacional entre NZ$ 48.426 e NZ$ 60.910, além de NZ$ 1.158 de taxa de serviços estudantis para 120 pontos. No valor inferior da faixa, as duas parcelas somam NZ$ 49.584 antes de moradia, livros, deslocamentos e seguro.', steps: ['Faça a primeira conta em dólares neozelandeses e registre o ano e a carga de estudo do orçamento.', 'Calcule a moradia pelo número de meses de permanência. Confira o valor final depois da matrícula nas disciplinas.'], sources: [2] },
      ],
      faq: [
        { question: 'Uma área de saúde do BSc garante vaga em Medicina?', answer: 'Ela pode cumprir a etapa de primeiro ano para uma candidatura. A seleção do curso clínico ocorre separadamente. Consulte os critérios do seu ano de ingresso antes de montar a grade.' },
        { question: 'Qual é a diferença entre major e specialisation?', answer: 'No BSc de Auckland, a área principal (major) ocupa cerca de um terço das disciplinas. A specialisation concentra aproximadamente metade. Compare as matérias obrigatórias para saber quanto espaço sobra para outros interesses.' },
      ],
    },
    es: {
      country: 'Nueva Zelanda',
      title: 'Estudiar Ciencias en Nueva Zelanda: admisión, plazos y precios en Auckland',
      description: 'Compara las áreas de Ciencias en Auckland, consulta el acceso con un título extranjero y calcula el coste de 120 puntos. Revisa cuándo comienza la vía clínica.',
      intro: '¿Puedes empezar Ciencias en Auckland en julio y optar a Medicina al año siguiente por la vía de primer año? En la Universidad de Auckland, el semestre de ingreso cambia las opciones. Decide primero si quieres completar Ciencias o aprovechar un primer año en un área admitida para solicitar plaza en un programa clínico.',
      alt: 'Dos estudiantes recorren una pasarela cubierta de madera sobre un arroyo, con colinas entre la niebla al fondo.',
      sections: [
        { heading: 'Interpreta los puntos y el plan de estudios', body: 'La autoridad neozelandesa de cualificaciones establece un mínimo de 360 créditos para un grado. El Bachelor of Science (BSc) de Auckland consta de 360 puntos y normalmente dura tres años a tiempo completo. Permite elegir un área principal o una especialización más concentrada. El proyecto final aplica lo aprendido a un problema concreto.', steps: ['Compara las asignaturas avanzadas y el proyecto final de dos áreas que te interesen.', 'Parte de las asignaturas que quieres cursar al final y comprueba qué requisitos previos debes cubrir desde el primer año.'], sources: [0, 2] },
        { heading: 'Busca la vía de acceso para tu titulación', body: 'Auckland distingue la admisión a la universidad, los requisitos del programa y el dominio del inglés. La página para titulaciones extranjeras reúne tablas por sistema educativo. En la ficha del grado también puedes seleccionar tu titulación y consultar condiciones adicionales según el área.', steps: ['Utiliza el nombre oficial que figura en tu certificado y selecciona el año de ingreso.', 'Si ya cursaste estudios universitarios, revisa esa vía de admisión y consulta cómo presentar tu expediente.'], sources: [1, 2] },
        { heading: 'Escoge el semestre según tu objetivo clínico', body: 'Para el BSc, Auckland indica el 8 de diciembre de 2026 como cierre de solicitudes del primer semestre de 2027 y el 4 de julio de 2027 para el segundo. La entrada en el segundo semestre excluye la vía que permite pasar de un área de salud del BSc a la selección clínica de segundo año. Nutrición y Fisiología figuran entre las áreas admitidas.', steps: ['Para solicitar plaza clínica en 2028, revisa las ocho asignaturas de primer año y los criterios de selección del programa.', 'Si prefieres completar el BSc, consulta la secuencia de asignaturas y los semestres disponibles para tu área.'], sources: [2, 3] },
        { heading: 'Calcula el presupuesto de un año en Auckland', body: 'En 2027, la ficha del BSc estima la matrícula internacional anual entre 48.426 y 60.910 dólares neozelandeses. La tasa de servicios estudiantiles para 120 puntos es de 1.158. Con la estimación inferior, ambos conceptos suman 49.584 dólares antes de añadir alojamiento, libros, desplazamientos y seguro.', steps: ['Trabaja en dólares neozelandeses y apunta el año y la carga lectiva del presupuesto.', 'Calcula los meses reales de alojamiento y revisa la cifra definitiva después de matricularte en las asignaturas.'], sources: [2] },
      ],
      faq: [
        { question: '¿Una especialidad de salud del BSc garantiza el acceso a Medicina?', answer: 'Puede servir como primer año válido para solicitar plaza. Después hay una selección propia del programa clínico. Revisa sus reglas para el año en que quieras ingresar antes de elegir las asignaturas.' },
        { question: '¿Cuál es la diferencia entre major y specialisation?', answer: 'En el BSc de Auckland, el área principal (major) supone aproximadamente un tercio de las asignaturas y la specialisation cerca de la mitad. Revisa las obligatorias para calcular cuánto margen te queda para otras materias.' },
      ],
    },
  },
} satisfies StudyGuide;
