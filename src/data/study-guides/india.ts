import type { StudyGuide } from './types';

export default {
  slug: 'india',
  countrySlug: 'india',
  sources: [
    { label: 'Study in India · Student ID and offers', url: 'https://www.studyinindia.gov.in/About-Us' },
    { label: 'Study in India · Application FAQ', url: 'https://www.studyinindia.gov.in/FAQ' },
    { label: 'University of Delhi · Foreign Students’ Registry', url: 'https://fsr.du.ac.in/' },
    { label: 'University of Delhi · International admission 2026/27', url: 'https://fsr.du.ac.in/06052026_FSR-Brochure_compressed.pdf' },
    { label: 'JEE (Advanced) · Eligibility for 2027', url: 'https://jeeadv.ac.in/eligibility.html' },
    { label: 'IIT Madras · Undergraduate fees 2026/27, Annex I', url: 'https://fees.iitm.ac.in/assets/circular/fees_structure_2026_admission_ug_pg.pdf' },
  ],
  locales: {
    en: {
      country: 'India',
      title: 'Study in India: the SII ID, Delhi admissions and engineering at IITs',
      description: 'Compare the University of Delhi route with JEE Advanced for international applicants, then read an actual IIT Madras fee schedule in rupees.',
      intro: 'An economics applicant to the University of Delhi and an engineering applicant to an Indian Institute of Technology (IIT) can face different exams, even with the same school diploma. Identify your admission route first. Then check the fees for your citizenship category before accepting an offer.',
      alt: 'Two students discuss a tabletop solar-panel prototype beside a brick arcade.',
      sections: [
        {
          heading: 'What does the Study in India ID do?',
          body: 'International students register on the government’s Study in India portal to obtain an SII ID. The portal lists participating programmes and lets applicants send choices to several institutes. Each institute evaluates the application. You may receive several offers and can accept one at a time.',
          steps: ['Prepare passport details, school records and any exam results required by the programme. Keep the SII ID with your application records.', 'Record each offer’s acceptance date, course, campus, teaching language and any fee waiver in writing. Confirm whether the institution also requires its own application.'],
          sources: [0, 1],
        },
        {
          heading: 'University of Delhi: read the foreign-student bulletin',
          body: 'For 2026/27, Delhi’s Foreign Students’ Registry assessed applicants in its foreign-national category on merit without the CUET undergraduate entrance test. The bulletin required a foreign passport and a school qualification recognised as equivalent to India’s 10+2 system. Specific degrees could set additional subject or mark requirements.',
          steps: ['Find the degree in the foreign-student bulletin and match its compulsory subjects to your transcript.', 'Use the Registry’s notice for your intake to check the application window. The 2026/27 example explains the route and requirements for that cohort.'],
          sources: [2, 3],
        },
        {
          heading: 'IIT engineering: who can go straight to JEE Advanced?',
          body: 'For the 2027 exam, applicants classified as foreign nationals under the JEE rules can register for JEE Advanced without taking JEE Main. The other conditions still apply. The usual qualifying-school requirement includes Physics, Chemistry and Mathematics, with the first Class XII or equivalent examination in 2026 or 2027. The rules list specific exceptions.',
          steps: ['Read the foreign-candidate section, including age, previous attempts and earlier IIT admission. If you hold an OCI or PIO card, check which category applies to you.', 'Keep proof of when your examination board released the results. Check the programme’s seat-allocation rules after confirming exam eligibility.'],
          sources: [4],
        },
        {
          heading: 'What did an incoming IIT Madras undergraduate pay?',
          body: 'For its 2026/27 B.Tech, B.S. and dual-degree intake, IIT Madras listed ₹568,000 initially for the standard foreign-national fee category. That comprised ₹50,000 in one-time charges, ₹513,000 in semester charges and a ₹5,000 refundable deposit. A footnote sets different fees for certain OCI/PIO cardholders.',
          steps: ['Open Annex I and check your fee column. For the next semester, start with recurring charges and check for revised rates.', 'Budget hostel charges, meals and required medical insurance separately where applicable. Ask for the current intake’s schedule before paying.'],
          sources: [5],
        },
      ],
      faq: [
        { question: 'Does an SII ID mean I have been admitted?', answer: 'No. Registration gives you an identifier. Look for the university’s offer and its acceptance deadline. If you need a student visa, Study in India directs you to a separate application after you receive an offer.' },
        { question: 'How do I compare two tuition waivers?', answer: 'Get the institute’s written terms for the amount, covered fees, duration and renewal criteria. Apply the waiver to the eligible fee lines, then add remaining academic charges, housing and meals. The institutes decide what support to award.' },
      ],
    },
    pt: {
      country: 'Índia',
      title: 'Graduação na Índia: cadastro SII, Universidade de Délhi e engenharia nos IITs',
      description: 'Veja como funciona o cadastro Study in India, compare a seleção de Délhi com o JEE Advanced e leia uma tabela real de taxas do IIT Madras.',
      intro: 'Quem quer cursar economia na Universidade de Délhi pode seguir uma seleção bem diferente da exigida para engenharia em um Instituto Indiano de Tecnologia (IIT), mesmo apresentando o mesmo diploma do ensino médio. Confira a modalidade de ingresso e o valor cobrado de acordo com a sua cidadania.',
      alt: 'Dois estudantes conversam sobre um protótipo de painel solar em uma mesa junto a arcos de tijolos.',
      sections: [
        {
          heading: 'Para que serve o identificador do Study in India?',
          body: 'No portal do governo Study in India, o estudante internacional faz o cadastro e recebe um identificador, o SII ID. É possível concorrer a cursos de várias instituições participantes. Cada uma avalia a candidatura e envia sua oferta. Você pode receber mais de uma e aceitar uma por vez.',
          steps: ['Separe os dados do passaporte, os documentos escolares e as notas exigidas pelo curso. Guarde o SII ID junto com os comprovantes.', 'Registre o prazo de aceite, o campus, o idioma e os descontos oferecidos por escrito. Verifique se a instituição pede candidatura própria.'],
          sources: [0, 1],
        },
        {
          heading: 'Universidade de Délhi: qual edital consultar?',
          body: 'Na seleção de 2026/27 da categoria de estrangeiros, a Universidade de Délhi avaliou o mérito acadêmico com dispensa da prova CUET de graduação. O edital exigia passaporte estrangeiro e formação escolar equivalente ao sistema indiano de doze anos, conhecido como 10+2. Cada curso podia estabelecer exigências adicionais de matérias ou notas.',
          steps: ['Encontre a graduação no edital da Foreign Students’ Registry e compare as matérias exigidas com as do seu histórico.', 'Use os avisos da secretaria para verificar as datas do seu ciclo. As regras de 2026/27 servem como exemplo daquele processo.'],
          sources: [2, 3],
        },
        {
          heading: 'Engenharia: quem pode fazer o JEE Advanced direto?',
          body: 'Para a prova de 2027, candidatos enquadrados como estrangeiros pelas regras do JEE podem se inscrever diretamente no JEE Advanced, com dispensa do JEE Main. As demais condições continuam valendo. Em geral, exige-se Física, Química e Matemática e que a primeira prova de conclusão equivalente ao Class XII tenha ocorrido em 2026 ou 2027. O edital detalha exceções.',
          steps: ['Confira idade, tentativas anteriores e eventual ingresso prévio em IIT. Quem tem cartão OCI ou PIO deve verificar o enquadramento específico.', 'Guarde a data de divulgação do resultado pelo órgão examinador. Confira também as regras de distribuição de vagas do curso desejado.'],
          sources: [4],
        },
        {
          heading: 'Quanto custou o primeiro semestre no IIT Madras?',
          body: 'Para ingressantes de 2026/27 em B.Tech, B.S. e dupla diplomação, a tabela do IIT Madras indicava ₹ 568 mil no pagamento inicial da categoria padrão de estrangeiros. A conta reunia ₹ 50 mil de taxas únicas, ₹ 513 mil de cobranças semestrais e ₹ 5 mil de depósito reembolsável. Há regra própria para determinados titulares de cartões OCI/PIO.',
          steps: ['Confira sua coluna no Anexo I. Para o semestre seguinte, parta das cobranças recorrentes e verifique reajustes.', 'Consulte os valores de alojamento, refeições e seguro médico exigido. Antes de pagar, peça os valores do seu ano de ingresso.'],
          sources: [5],
        },
      ],
      faq: [
        { question: 'Ter o SII ID significa que fui aprovado?', answer: 'Não. O cadastro gera um identificador. Procure a carta de oferta da instituição e seu prazo de aceite. Se precisar de visto estudantil, o portal indica uma solicitação separada após a oferta.' },
        { question: 'Como comparar dois descontos na graduação?', answer: 'Peça por escrito o valor, as taxas cobertas, a duração e as regras de renovação. Aplique o desconto só nas taxas elegíveis e some os custos restantes, a moradia e a alimentação. Cada instituição decide o apoio que concederá.' },
      ],
    },
    es: {
      country: 'India',
      title: 'Estudiar en India: registro SII, Universidad de Delhi e ingeniería en los IIT',
      description: 'Compara la admisión internacional en Delhi con el JEE Advanced de ingeniería y calcula los gastos a partir de las tasas reales del IIT Madras.',
      intro: 'Con el mismo título de secundaria, la vía para estudiar economía en la Universidad de Delhi puede diferir mucho de la exigida para ingeniería en un Instituto Indio de Tecnología (IIT). Antes de elegir, comprueba la categoría de admisión y qué tasas corresponden a tu nacionalidad.',
      alt: 'Dos estudiantes conversan sobre un prototipo de panel solar en una mesa junto a una galería de arcos de ladrillo.',
      sections: [
        {
          heading: 'Para qué sirve el identificador SII',
          body: 'Los estudiantes internacionales se registran en el portal estatal Study in India para obtener un SII ID. El portal permite enviar candidaturas a varias instituciones participantes. Cada una evalúa la solicitud. Puedes recibir varias cartas de admisión, aunque solo se puede aceptar una a la vez.',
          steps: ['Prepara los datos del pasaporte, el expediente de secundaria y las notas exigidas por el grado. Conserva el identificador con esos documentos.', 'Apunta el plazo de aceptación, el campus, la lengua de enseñanza y cualquier exención por escrito. Comprueba si la institución exige su propia solicitud.'],
          sources: [0, 1],
        },
        {
          heading: 'Universidad de Delhi: la vía para extranjeros',
          body: 'En 2026/27, la Universidad de Delhi evaluó por mérito a los aspirantes de la categoría de extranjeros, exentos del CUET de grado. El boletín exigía un pasaporte extranjero y estudios reconocidos como equivalentes al sistema indio de doce años, denominado 10+2. Cada grado podía fijar requisitos adicionales de asignaturas o notas.',
          steps: ['Busca el grado en el boletín del Foreign Students’ Registry y compara las asignaturas obligatorias con tu expediente.', 'Consulta las fechas de tu convocatoria en los avisos del registro. Las reglas de 2026/27 describen el proceso de aquella promoción.'],
          sources: [2, 3],
        },
        {
          heading: 'Ingeniería: el acceso directo al JEE Advanced',
          body: 'En la convocatoria de 2027, los aspirantes clasificados como extranjeros por las reglas del JEE pueden inscribirse en el JEE Advanced sin presentarse al JEE Main. Deben cumplir el resto de las condiciones. En general se exige haber cursado Física, Química y Matemáticas y haberse presentado por primera vez al examen equivalente a Class XII en 2026 o 2027. La convocatoria detalla excepciones.',
          steps: ['Comprueba la edad, los intentos previos y las admisiones anteriores a un IIT. Si tienes tarjeta OCI o PIO, revisa tu categoría.', 'Guarda la fecha de publicación de las notas por la autoridad examinadora. Revisa también las reglas de asignación de plazas de tu grado.'],
          sources: [4],
        },
        {
          heading: 'El coste inicial de un grado en el IIT Madras',
          body: 'Para la promoción 2026/27 de B.Tech, B.S. y dobles titulaciones, el IIT Madras fijó el pago inicial de la categoría ordinaria de extranjeros en 568.000 rupias. Incluía 50.000 de cargos únicos, 513.000 de gastos semestrales y 5.000 de depósito reembolsable. Hay una regla específica para determinados titulares de tarjetas OCI/PIO.',
          steps: ['Busca tu columna en el anexo I. Para el semestre siguiente, cuenta los cargos recurrentes y comprueba si se han actualizado.', 'Consulta por separado el alojamiento, las comidas y el seguro médico exigido. Antes de pagar, solicita la tabla de tu promoción.'],
          sources: [5],
        },
      ],
      faq: [
        { question: '¿Conseguir el SII ID significa que tengo plaza?', answer: 'No. El registro genera un identificador. Busca la carta de admisión de la universidad y el plazo para aceptarla. Si necesitas visado de estudiante, el portal indica un trámite separado después de recibir la oferta.' },
        { question: '¿Cómo comparo dos exenciones de matrícula?', answer: 'Pide el importe, los conceptos cubiertos, la duración y los criterios de renovación por escrito. Descuenta solo los conceptos elegibles y añade los demás gastos, el alojamiento y las comidas. Cada institución decide la ayuda que concede.' },
      ],
    },
  },
} satisfies StudyGuide;
