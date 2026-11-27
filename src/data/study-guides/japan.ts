import type { StudyGuide } from './types';

export default {
  slug: 'japan',
  countrySlug: 'japan',
  sources: [
    { label: 'Study in Japan · Undergraduate admission', url: 'https://www.studyinjapan.go.jp/en/planning/learn-about-schools/universities/' },
    { label: 'JASSO · EJU subjects', url: 'https://www.jasso.go.jp/en/ryugaku/eju/examinee/procedure/subject.html' },
    { label: 'JASSO · Pre-arrival admission', url: 'https://www.jasso.go.jp/en/ryugaku/eju/about/prearrival_admission.html' },
    { label: 'Nagoya University · G30 undergraduate admissions', url: 'https://admissions.g30.nagoya-u.ac.jp/admissions/undergraduate/' },
    { label: 'Nagoya University · G30 undergraduate FAQ', url: 'https://admissions.g30.nagoya-u.ac.jp/qa_type/ug/' },
    { label: 'Study in Japan · Academic fees', url: 'https://www.studyinjapan.go.jp/en/planning/academic-fees/' },
    { label: 'Study in Japan · Living costs', url: 'https://www.studyinjapan.go.jp/en/life/cost-of-living/' },
  ],
  locales: {
    en: {
      country: 'Japan',
      title: 'Study in Japan: the EJU, English-taught degrees and first-year costs',
      description: 'Compare Japanese- and English-taught degrees, check the Nagoya G30 application calendar and build a first-year budget in yen with JASSO figures.',
      intro: 'An applicant considering science in Japan faces two different decisions: which subjects to take for an entrance exam and which language to study in for an entire degree. Start with a specific undergraduate programme. Nagoya University illustrates how much an English-taught application can differ from the EJU route.',
      alt: 'A student holding notebooks smiles in a sunlit corridor as others pack their bags.',
      sections: [
        {
          heading: 'Will your school qualification give you access?',
          body: 'Japan’s official study portal lists several routes to undergraduate eligibility. Twelve years of formal schooling is one. Recognised qualifications such as the International Baccalaureate can also qualify. If your school system ends earlier, the portal describes designated preparatory courses and other eligible cases.',
          steps: ['Write down the exact qualification, years of schooling and expected graduation date. Send these to admissions if your case falls between categories.', 'Check the language of instruction for the whole degree. A single English-language seminar tells you little about later compulsory modules.'],
          sources: [0],
        },
        {
          heading: 'Which EJU subjects should you register for?',
          body: 'For a programme using the Examination for Japanese University Admission for International Students (EJU), copy the department’s requirements before registering. A science applicant selects two of physics, chemistry and biology. Science and Japan and the World cannot be taken in the same session.',
          steps: ['Record the subject combination, mathematics course, exam language and accepted session for each choice.', 'If applying from abroad, check whether the programme offers pre-arrival admission. Send a separate application to the university after you register for the exam.'],
          sources: [1, 2],
        },
        {
          heading: 'An English-taught example: Nagoya University G30',
          body: 'Nagoya’s G30 undergraduate programmes teach degree subjects in English and include Japanese language classes in year one. EJU scores are optional on this route. For 2027 entry, the second application round runs from 5 January to noon on 21 January 2027, Japan time. Only participating programmes take applications in this round.',
          steps: ['Check your major in the current application guide before planning around January.', 'Read the appendix for your school curriculum and the English-language evidence required. Ask the correct subject teacher for your reference early.'],
          sources: [3, 4],
        },
        {
          heading: 'Build a first-year budget in yen',
          body: 'Study in Japan lists about ¥820,000 in first-year academic fees at a national undergraduate university. JASSO’s 2023 survey of privately financed international students found average living costs of ¥105,000 per month, excluding study and research. Twelve months plus that academic benchmark comes to ¥2,080,000.',
          steps: ['Replace the averages with your university fee schedule and a housing quote near your campus.', 'Add any entrance exams, travel and move-in costs your figures omit. Count an admission charge just once.'],
          sources: [5, 6],
        },
      ],
      faq: [
        { question: 'Does taking the EJU submit my university application?', answer: 'No. JASSO handles the exam and the university handles admission. Keep both deadlines, the exam registration voucher and confirmation that the university received your application.' },
        { question: 'Can I use the national average to budget for Tokyo rent?', answer: 'Use it for an initial comparison. JASSO’s survey put average monthly rent at ¥41,000 nationwide and ¥57,000 in Tokyo. Compare a real room near the department with a cheaper option farther out, including the commute.' },
      ],
    },
    pt: {
      country: 'Japão',
      title: 'Graduação no Japão: prova EJU, cursos em inglês e custo do primeiro ano',
      description: 'Entenda quando fazer o EJU, confira o calendário do G30 de Nagoya e estime o primeiro ano de graduação no Japão com dados oficiais em ienes.',
      intro: 'Para estudar ciências no Japão, duas escolhas mudam o plano de candidatura: quais matérias prestar e em que idioma cursar a graduação inteira. Comece por um curso específico. A Universidade de Nagoya mostra como a seleção em inglês pode ter requisitos bem diferentes dos de uma seleção pelo EJU.',
      alt: 'Uma estudante com cadernos nas mãos sorri em um corredor ensolarado enquanto colegas arrumam as mochilas.',
      sections: [
        {
          heading: 'Seu diploma permite concorrer à graduação?',
          body: 'O portal oficial japonês descreve várias formas de ingresso. Uma delas é ter completado doze anos de educação formal. Qualificações reconhecidas, como o Bacharelado Internacional (IB), também podem dar acesso. Para quem concluiu um sistema escolar mais curto, o portal apresenta cursos preparatórios reconhecidos e outras situações aceitas.',
          steps: ['Anote o nome exato do diploma, os anos cursados e a previsão de conclusão. Se houver dúvida de equivalência, envie esses dados à universidade.', 'Confira o idioma das disciplinas obrigatórias até o último ano. Uma matéria em inglês no primeiro semestre diz pouco sobre o restante da graduação.'],
          sources: [0],
        },
        {
          heading: 'Quais matérias escolher no EJU?',
          body: 'No exame de admissão para estudantes internacionais (EJU), a combinação depende do curso. Na prova de Ciências, o candidato escolhe duas entre Física, Química e Biologia. Ciências e a prova Japan and the World ocupam a mesma sessão e são incompatíveis nessa edição.',
          steps: ['Copie do edital de cada curso as matérias, a modalidade de Matemática, o idioma da prova e a edição aceita.', 'Para concorrer do exterior, procure a opção de admissão antes da viagem. Guarde os prazos separados da inscrição no exame e da candidatura à universidade.'],
          sources: [1, 2],
        },
        {
          heading: 'Graduação em inglês pelo G30 de Nagoya',
          body: 'No G30, as matérias da graduação são em inglês e os alunos estudam japonês no primeiro ano. O resultado do EJU é opcional nessa seleção. Para o ingresso de 2027, a segunda rodada vai de 5 de janeiro até o meio-dia de 21 de janeiro de 2027, no horário do Japão. Apenas parte dos cursos participa.',
          steps: ['Localize seu curso na lista da segunda rodada antes de assumir que pode concorrer em janeiro.', 'Leia o anexo referente ao seu currículo escolar e confira como comprovar o inglês. Veja qual professor pode assinar sua recomendação.'],
          sources: [3, 4],
        },
        {
          heading: 'Quanto reservar para o primeiro ano?',
          body: 'O portal Study in Japan indica cerca de ¥ 820 mil em taxas acadêmicas de primeiro ano em uma universidade nacional. A pesquisa da JASSO de 2023 estimou ¥ 105 mil por mês em despesas de vida de estudantes internacionais com financiamento próprio, excluindo estudo e pesquisa. Doze meses mais as taxas somam ¥ 2,08 milhões nesse cenário.',
          steps: ['Substitua as médias pelo valor do seu curso e por um orçamento de moradia próximo ao campus.', 'Inclua provas, passagem e despesas iniciais que ainda estejam fora da conta. Confira se a taxa de ingresso já entrou no total.'],
          sources: [5, 6],
        },
      ],
      faq: [
        { question: 'Fazer o EJU já conta como candidatura?', answer: 'Não. A JASSO organiza a prova e a universidade recebe a candidatura. Registre as duas datas e guarde o comprovante do exame e a confirmação de envio à instituição.' },
        { question: 'Posso usar a média nacional para calcular o aluguel em Tóquio?', answer: 'Use a média como ponto de partida. Na pesquisa da JASSO, o aluguel mensal médio foi de ¥ 41 mil no país e ¥ 57 mil em Tóquio. Compare um quarto perto do curso com outro mais distante, incluindo o transporte.' },
      ],
    },
    es: {
      country: 'Japón',
      title: 'Estudiar en Japón: examen EJU, grados en inglés y coste del primer año',
      description: 'Compara las vías de ingreso en japonés e inglés, consulta las fechas del G30 de Nagoya y calcula el presupuesto del primer año en yenes.',
      intro: 'Si te interesa un grado en ciencias en Japón, el idioma de las asignaturas y la combinación de exámenes determinan qué opciones tienes. El itinerario G30 de la Universidad de Nagoya permite comparar una candidatura en inglés con otra que exige el EJU.',
      alt: 'Una estudiante con cuadernos en las manos sonríe en un pasillo soleado mientras sus compañeros preparan las mochilas.',
      sections: [
        {
          heading: '¿Tu título de secundaria te permite solicitar plaza?',
          body: 'El portal oficial japonés recoge varias vías de acceso. Una de ellas exige doce años de educación formal. También se reconocen titulaciones como el Bachillerato Internacional. Si tu sistema educativo dura menos, consulta las vías equivalentes y los cursos preparatorios reconocidos.',
          steps: ['Envía a admisiones el nombre exacto del título, los años cursados y la fecha prevista de graduación si tienes dudas sobre tu caso.', 'Revisa el idioma de las materias obligatorias de todos los cursos antes de decidir que puedes completar el grado en inglés.'],
          sources: [0],
        },
        {
          heading: 'Cómo elegir las materias del EJU',
          body: 'Cada departamento que utiliza el examen de admisión para estudiantes internacionales (EJU) especifica qué pruebas acepta. En Ciencias se eligen dos entre Física, Química y Biología. Ciencias y Japan and the World se celebran en la misma sesión y no pueden combinarse.',
          steps: ['Anota para cada grado las asignaturas, la modalidad de Matemáticas, el idioma del examen y la convocatoria válida.', 'Si presentas la solicitud desde otro país, comprueba si el grado admite candidatos antes de su llegada a Japón. Inscribirse en el EJU y solicitar plaza son dos trámites distintos.'],
          sources: [1, 2],
        },
        {
          heading: 'Estudiar en inglés en el G30 de la Universidad de Nagoya',
          body: 'En el G30 las asignaturas del grado se imparten en inglés y en el primer año se cursa lengua japonesa. El EJU es opcional en esta vía. Para el ingreso de 2027, la segunda convocatoria abre el 5 de enero y cierra el 21 de enero de 2027 al mediodía, hora de Japón. Participan solo algunos grados.',
          steps: ['Comprueba si tu grado figura en la segunda convocatoria antes de organizar el calendario.', 'Revisa el anexo de tu sistema educativo y cómo acreditar el inglés. Identifica también qué docente puede entregar la carta de recomendación.'],
          sources: [3, 4],
        },
        {
          heading: 'Cómo calcular el primer año en yenes',
          body: 'Study in Japan sitúa los gastos académicos del primer año en una universidad nacional en unos 820.000 yenes. En su encuesta de 2023, JASSO estimó en 105.000 yenes mensuales los gastos de vida de estudiantes internacionales con financiación propia, excluidos estudio e investigación. Doce meses más las tasas arrojan 2.080.000 yenes.',
          steps: ['Sustituye ambas cifras por las tasas de tu grado y una oferta de alojamiento próxima al campus.', 'Añade los exámenes, los vuelos y los gastos de instalación que falten. Cuenta una sola vez la tasa de ingreso.'],
          sources: [5, 6],
        },
      ],
      faq: [
        { question: '¿Inscribirme en el EJU sirve para solicitar una plaza universitaria?', answer: 'No. El examen lo gestiona JASSO y la admisión depende de la universidad. Apunta ambos plazos y conserva tanto el justificante del examen como la confirmación del envío a la universidad.' },
        { question: '¿La media nacional de alquiler sirve para Tokio?', answer: 'Es una referencia inicial. JASSO registró 41.000 yenes mensuales de alquiler medio en Japón y 57.000 en Tokio. Compara una habitación próxima a la facultad con otra más alejada y suma el transporte.' },
      ],
    },
  },
} satisfies StudyGuide;
