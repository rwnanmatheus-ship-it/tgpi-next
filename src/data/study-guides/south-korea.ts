import type { StudyGuide } from './types';

export default {
  slug: 'south-korea',
  countrySlug: 'south-korea',
  sources: [
    { label: 'Study in Korea · Undergraduate programmes', url: 'https://www.studyinkorea.go.kr/eng/plan/schoolType.do?tab=undergraduate-college' },
    { label: 'Study in Korea · TOPIK', url: 'https://studyinkorea.go.kr/en/plan/examAndKoreanStudy.do' },
    { label: 'KAIST · International undergraduate eligibility', url: 'https://admission.kaist.ac.kr/intl-undergraduate/before/sub02' },
    { label: 'KAIST · 2027 application timeline', url: 'https://admission.kaist.ac.kr/intl-undergraduate/application/ApplicationGuide/ApplicationTimeline' },
    { label: 'Study in Korea · Living expenses', url: 'https://studyinkorea.go.kr/en/life/livingExpense.do' },
    { label: 'KAIST · Scholarship', url: 'https://admission.kaist.ac.kr/intl-undergraduate/support/scholarships/kaist/' },
    { label: 'KAIST · Cost of attendance', url: 'https://admission.kaist.ac.kr/intl-undergraduate/support/coa' },
  ],
  locales: {
    en: {
      country: 'South Korea',
      title: 'Study in South Korea: TOPIK, KAIST admissions and living costs',
      description: 'Check the language requirements for a Korean degree, the KAIST 2027 undergraduate deadline and what an undergraduate scholarship leaves to budget.',
      intro: 'Two departments in South Korea can accept different language certificates and apply different rules for international students. Start with your secondary school record, citizenship and intended teaching language. KAIST in Daejeon provides a concrete example of how to read a university’s admission and funding rules together.',
      alt: 'Two students read notes on wooden steps beside windows overlooking the city at dusk.',
      sections: [
        {
          heading: 'Which international admission category fits?',
          body: 'The government portal lists categories involving parental citizenship or an entire school education abroad. KAIST sets its own terms. Applicants with Korean citizenship, including dual citizens, cannot use its foreign-student route. Read the university’s conditions for parental citizenship and for applicants of Korean origin who attended school abroad.',
          steps: ['List the countries where you completed primary and secondary school alongside your citizenship and your parents’ citizenship.', 'Match your case to one published category. If you attended an international school located in Korea, check how KAIST classifies that schooling.'],
          sources: [0, 2],
        },
        {
          heading: 'When do you need TOPIK?',
          body: 'A Korean-taught department may ask for a Test of Proficiency in Korean (TOPIK) result. English-taught departments may specify English proficiency instead. Study in Korea says that TOPIK results are valid for two years from the date scores are announced. Admission and graduation can have different language conditions.',
          steps: ['Write down your department’s accepted tests and levels for both entry and graduation. Check whether compulsory courses run in the advertised language.', 'Count from the result announcement date. Confirm which date the department uses to check validity before booking a test or submitting an old score.'],
          sources: [0, 1],
        },
        {
          heading: 'KAIST fall 2027: which deadline matters?',
          body: 'For regular international undergraduate admission for fall 2027, KAIST lists 10 November 2026 through 14 January 2027 at 6 p.m. Korean time for the application and supporting documents. Applicants must finish high school by 31 August 2027. KAIST’s international undergraduate intake is for first-year admission, including for students applying after starting elsewhere.',
          steps: ['Convert the document deadline to your time zone. Check the separate recommendation row with your referee and aim to finish both early.', 'Students start with an undeclared major at KAIST and choose after the second semester. Compare this with universities that admit directly to a department.'],
          sources: [2, 3],
        },
        {
          heading: 'How much does a tuition scholarship leave to cover?',
          body: 'The government portal estimates living expenses at ₩750,000–1,000,000 a month. The KAIST Scholarship lists eight semesters of tuition, a ₩350,000 monthly stipend and health insurance. Against that broad living estimate, the gap is about ₩400,000–650,000 monthly. Use campus prices to refine it.',
          steps: ['Compare a campus room and meal plan with your alternative, covering the same number of months.', 'Select the scholarship option in the application’s financial resources section. Check the continuation rule: KAIST specifies a GPA above 2.7 out of 4.3 after the first year.'],
          sources: [4, 5, 6],
        },
      ],
      faq: [
        { question: 'Can I transfer directly into year two at KAIST?', answer: 'Its international route accepts first-year applications only. If you already study elsewhere, KAIST also requires that you no longer hold degree-seeking status at another university by the time you enrol there. Check the admissions instructions before changing your current enrolment.' },
        { question: 'Will a dormitory quote include food?', answer: 'Study in Korea notes that dormitory prices vary with room occupancy and whether meals are included. Ask the residence office for the contract dates, number of occupants and meal coverage before converting a term price into a monthly figure.' },
      ],
    },
    pt: {
      country: 'Coreia do Sul',
      title: 'Graduação na Coreia do Sul: TOPIK, ingresso no KAIST e custo de vida',
      description: 'Entenda o TOPIK, confira o prazo de ingresso no KAIST em 2027 e calcule quanto a bolsa de graduação deixa por cobrir no orçamento mensal.',
      intro: 'Dois cursos na Coreia do Sul podem aceitar certificados de idioma diferentes e adotar critérios próprios para estudantes estrangeiros. Comece pelo país em que estudou, pela cidadania e pelo idioma da graduação. O KAIST, em Daejeon, permite ver como a seleção e a bolsa funcionam na mesma instituição.',
      alt: 'Dois estudantes leem anotações em degraus de madeira, junto a janelas com vista para a cidade ao anoitecer.',
      sections: [
        {
          heading: 'Em qual modalidade de candidatura você se enquadra?',
          body: 'O portal do governo descreve modalidades que consideram a cidadania dos pais ou toda a escolaridade cursada fora da Coreia. No KAIST, quem tem cidadania coreana, inclusive dupla, não pode usar a seleção para estrangeiros. O instituto detalha os critérios relativos à cidadania dos pais e à escolaridade no exterior para candidatos de origem coreana.',
          steps: ['Liste a cidadania dos seus pais e a sua, além dos países em que concluiu o ensino fundamental e médio.', 'Cruze esses dados com a categoria do edital. Quem frequentou escola internacional em território coreano deve conferir como o KAIST classifica essa escolaridade.'],
          sources: [0, 2],
        },
        {
          heading: 'Quando o TOPIK entra na candidatura?',
          body: 'O TOPIK avalia a proficiência em coreano. Cursos ministrados nesse idioma podem exigir a nota da prova, enquanto programas em inglês podem pedir comprovação de inglês. Segundo o Study in Korea, o resultado do TOPIK vale por dois anos a partir da divulgação. O nível para entrar pode ser diferente do exigido para se formar.',
          steps: ['Anote os exames e níveis aceitos pelo departamento no ingresso e na conclusão. Confira o idioma das matérias obrigatórias.', 'Conte a validade a partir da divulgação da nota e confirme em que data o departamento verifica essa validade antes de pagar por outra prova.'],
          sources: [0, 1],
        },
        {
          heading: 'KAIST em 2027: como ler o calendário da seleção',
          body: 'A seleção regular internacional para o semestre de outono de 2027 recebe candidaturas e documentos de 10 de novembro de 2026 até as 18h de 14 de janeiro de 2027, no horário da Coreia. É preciso concluir o ensino médio até 31 de agosto de 2027. Mesmo quem já cursou universidade concorre a uma vaga no primeiro ano por essa via.',
          steps: ['Converta o horário para sua cidade. Confira a linha da carta de recomendação com o professor e programe os dois envios com antecedência.', 'No KAIST, o estudante ingressa sem especialidade definida e escolhe a área após o segundo semestre. Compare esse formato com a entrada direta em um curso.'],
          sources: [2, 3],
        },
        {
          heading: 'Quanto ainda falta no orçamento de quem recebe bolsa?',
          body: 'O portal do governo estima entre ₩ 750 mil e ₩ 1 milhão por mês em despesas de vida. A bolsa do KAIST prevê oito semestres de taxas acadêmicas, auxílio de ₩ 350 mil mensais e seguro de saúde. Nessa comparação inicial, faltariam entre ₩ 400 mil e ₩ 650 mil por mês. Refine o cálculo com os preços do campus.',
          steps: ['Compare alojamento com refeições e outra opção cobrindo os mesmos meses. Verifique os gastos que cada preço já inclui.', 'Marque a opção de bolsa na seção de recursos financeiros da candidatura. Para mantê-la após o primeiro ano, o KAIST exige média superior a 2,7 em uma escala de 4,3.'],
          sources: [4, 5, 6],
        },
      ],
      faq: [
        { question: 'Posso pedir transferência direto para o segundo ano do KAIST?', answer: 'Essa seleção internacional recebe apenas candidaturas para o primeiro ano. Para a matrícula no KAIST, você também precisa ter encerrado o vínculo como aluno de graduação em outra universidade. Consulte as regras antes de alterar sua matrícula atual.' },
        { question: 'O preço do alojamento estudantil inclui refeições?', answer: 'O Study in Korea informa que o preço depende da ocupação do quarto e da inclusão de refeições. Peça ao alojamento as datas do contrato, o número de moradores por quarto e as refeições incluídas antes de calcular o custo por mês.' },
      ],
    },
    es: {
      country: 'Corea del Sur',
      title: 'Estudiar en Corea del Sur: TOPIK, admisión al KAIST y coste de vida',
      description: 'Comprueba el idioma de tu grado, las fechas de admisión al KAIST en 2027 y cuánto tendrías que cubrir al mes incluso con una beca de matrícula.',
      intro: 'Dos grados en Corea del Sur pueden pedir certificados de idioma distintos y aplicar criterios propios a los estudiantes internacionales. Empieza por tu nacionalidad, el país donde estudiaste y el idioma de la carrera. El KAIST, en Daejeon, permite comparar las condiciones de admisión y de financiación de una institución concreta.',
      alt: 'Dos estudiantes leen apuntes en unos escalones de madera junto a ventanales que dan a la ciudad al anochecer.',
      sections: [
        {
          heading: '¿Qué vía de admisión te corresponde?',
          body: 'El portal del Gobierno recoge categorías que tienen en cuenta la nacionalidad de los padres o toda la escolaridad cursada en el extranjero. En el KAIST, las personas con nacionalidad coreana, incluida la doble nacionalidad, no pueden utilizar la vía para extranjeros. La institución detalla las condiciones para hijos de extranjeros y solicitantes de origen coreano escolarizados fuera del país.',
          steps: ['Anota tu nacionalidad, la de tus padres y los países donde cursaste primaria y secundaria.', 'Busca la categoría que describe tu caso. Si estudiaste en un colegio internacional situado en Corea, comprueba cómo clasifica esa formación el KAIST.'],
          sources: [0, 2],
        },
        {
          heading: 'Cuándo presentar el TOPIK',
          body: 'El TOPIK acredita el dominio del coreano. Un departamento que imparte clases en coreano puede exigir esa nota, mientras que otro que enseña en inglés puede pedir un certificado de inglés. Study in Korea fija la validez del TOPIK en dos años desde la publicación de los resultados. Los requisitos de admisión y graduación pueden diferir.',
          steps: ['Apunta los exámenes y niveles que exige el departamento para entrar y para terminar. Revisa también el idioma de las materias obligatorias.', 'Confirma en qué fecha se comprueba la vigencia del certificado antes de inscribirte en un nuevo examen.'],
          sources: [0, 1],
        },
        {
          heading: 'KAIST: calendario para el otoño de 2027',
          body: 'En la convocatoria ordinaria internacional para otoño de 2027, el KAIST recibe solicitudes y documentos del 10 de noviembre de 2026 al 14 de enero de 2027 a las 18:00, hora de Corea. Debes terminar la secundaria a más tardar el 31 de agosto de 2027. Esta vía es de ingreso a primer año, también para quienes ya han comenzado otra carrera.',
          steps: ['Convierte la hora límite a la de tu ciudad. Revisa con tu docente la fecha de la carta de recomendación y anticipa ambos envíos.', 'En el KAIST se ingresa sin especialidad y se elige después del segundo semestre. Compáralo con las universidades que admiten directamente a un grado.'],
          sources: [2, 3],
        },
        {
          heading: 'Qué parte del coste de vida cubre la beca',
          body: 'El portal estatal estima gastos mensuales de entre 750.000 y 1.000.000 de wones. La beca del KAIST cubre ocho semestres de matrícula, incluye seguro médico y aporta 350.000 wones al mes. Con ese presupuesto orientativo quedarían entre 400.000 y 650.000 wones mensuales por cubrir. Sustituye la media por los precios de tu campus.',
          steps: ['Compara una habitación con plan de comidas y otra opción durante el mismo periodo. Anota si incluyen los meses de vacaciones.', 'Marca la beca en el apartado de recursos económicos al presentar tu solicitud. Para conservarla después del primer año, el KAIST exige una media superior a 2,7 sobre 4,3.'],
          sources: [4, 5, 6],
        },
      ],
      faq: [
        { question: '¿Puedo trasladar mi matrícula directamente al segundo año del KAIST?', answer: 'La vía internacional solo admite solicitudes de ingreso a primer año. Además, al matricularte en el KAIST debes haber dejado de estar inscrito en una titulación de otra universidad. Lee las condiciones antes de modificar tu matrícula actual.' },
        { question: '¿Incluye comidas el precio de la residencia universitaria?', answer: 'Study in Korea indica que el precio depende de cuántas personas ocupan la habitación y de si incluye comidas. Pide las fechas del contrato, la ocupación y el detalle del plan de comidas antes de calcular el coste mensual.' },
      ],
    },
  },
} satisfies StudyGuide;
