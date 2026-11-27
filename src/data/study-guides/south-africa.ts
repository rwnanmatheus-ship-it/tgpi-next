import type { StudyGuide } from './types';

export default {
  slug: 'south-africa',
  countrySlug: 'south-africa',
  sources: [
    { label: 'Universities South Africa · Online assessment', url: 'https://mb.usaf.ac.za/online-assessment/' },
    { label: 'Universities South Africa · Exemption process', url: 'https://mb.usaf.ac.za/exemption-process/' },
    { label: 'University of the Witwatersrand · Application cycle timelines', url: 'https://www.wits.ac.za/undergraduate/apply-to-wits/timelines/' },
    { label: 'University of the Witwatersrand · International fee structure', url: 'https://www.wits.ac.za/internationalstudents/financial-information/fee-structure/' },
    { label: 'University of the Witwatersrand · 2026 fees, chapter 1', url: 'https://www.wits.ac.za/media/wits-university/students/academic-matters/documents/2026%20Fees%20General%20Information.pdf' },
  ],
  locales: {
    en: {
      country: 'South Africa',
      title: 'Study in South Africa: matriculation exemption, Wits applications and fees',
      description: 'Check a foreign school certificate with Universities South Africa, track separate faculty deadlines and work out which Wits tuition category fits your situation.',
      intro: 'If you finished school abroad and want a first degree at a South African public university, you have two decisions to check. The Matriculation Board assesses school qualifications for exemption. The faculty then decides who gets a place. At Wits in Johannesburg, the degree can also determine which deadline comes first.',
      alt: 'Two students study an architectural model beside a laptop and a ceramic mug.',
      sections: [
        { heading: 'Check your school qualification with the Matriculation Board', body: 'Universities South Africa offers an online assessment for holders of foreign school qualifications. Select the type of study and enter the details from your certificate. Its result tells you whether you appear to meet the minimum exemption requirements. The Board separately verifies documents for the certificate.', steps: ['Use the title on your final school award and keep the assessment result.', 'Ask the university which exemption paperwork it needs when you apply and which it needs at registration.'], sources: [0, 1] },
        { heading: 'Prepare copies the Board can verify', body: 'The Board lists the M30 application form, identity evidence, final school certificates and proof of payment. Qualifications issued in another language need a sworn translation into English alongside the original-language documents. Follow its instructions on who can certify copies before sending a package.', steps: ['Keep a scan of each document and check that your name matches across the set.', 'Allow time for physical delivery. The Board says the final certificate can take up to eight weeks, and its published process distinguishes an initial online upload from certified copies.'], sources: [1] },
        { heading: 'Track the faculty deadline separately from your application', body: 'At Wits, some degrees require a portfolio, audition or other selection step. Its 2026 calendar offers a useful case. The architecture application closed on 30 June, while the portfolio deadline was 31 July. Both dates have passed. A single reminder for the later date would have missed the application.', steps: ['For your intake, record the application closing date and each faculty submission date separately.', 'Open the instructions for your chosen degree. Add residence applications to your calendar if you need a room.'], sources: [2] },
        { heading: 'Price your Wits degree using the correct fee group', body: 'Under the 2026 Wits rules, international full-time undergraduates from Southern African Development Community (SADC) countries generally paid local tuition plus an annual international registration fee. The standard category outside SADC paid twice local tuition. The university lists separate categories for particular statuses and for part-time study.', steps: ['Ask which category applies to you and request an estimate in rand for your programme and year.', 'Separate accommodation from tuition and identify the sum due before registration. For a future intake, consult its own fee schedule.'], sources: [3, 4] },
      ],
      faq: [
        { question: 'Does an exemption certificate reserve a university place?', answer: 'The certificate addresses the qualification requirement. Each university still applies its own admissions criteria. For a selective course, check its extra submissions while the Board processes your documents.' },
        { question: 'What if my school certificate is in Portuguese or Spanish?', answer: 'The Board requests the original-language documentation together with a sworn translation. Check the accepted certification authorities on its process page before paying for copies or sending them from abroad.' },
      ],
    },
    pt: {
      country: 'África do Sul',
      title: 'Graduação na África do Sul: equivalência do ensino médio, ingresso e custos na Wits',
      description: 'Consulte o Matriculation Board, organize os prazos da faculdade e descubra qual tabela de preços da Wits se aplica à sua graduação em Joanesburgo.',
      intro: 'Quem terminou o ensino médio no exterior e procura uma graduação em universidade pública sul-africana precisa conferir duas etapas. O Matriculation Board avalia o diploma escolar para a chamada matriculation exemption. A faculdade seleciona os candidatos às vagas. Na Wits, em Joanesburgo, até a data de entrega depende do curso.',
      alt: 'Dois estudantes analisam uma maquete arquitetônica ao lado de um notebook e de uma caneca de cerâmica.',
      sections: [
        { heading: 'Consulte seu diploma no Matriculation Board', body: 'A Universities South Africa mantém uma avaliação online para quem tem certificado escolar estrangeiro. Escolha o tipo de curso e preencha os dados que aparecem no documento. O resultado indica se a formação parece atender aos requisitos mínimos. A conferência dos comprovantes faz parte da emissão do certificado.', steps: ['Copie o nome oficial do diploma de conclusão e guarde o resultado da consulta.', 'Pergunte à universidade qual comprovante aceita na inscrição e qual será exigido para a matrícula.'], sources: [0, 1] },
        { heading: 'Prepare as cópias que serão aceitas', body: 'O órgão lista o formulário M30, documento de identidade, certificados escolares finais e comprovante de pagamento. Para uma formação documentada em português, pede tradução juramentada para o inglês junto com os documentos no idioma de origem. Confira quem está autorizado a certificar as cópias.', steps: ['Guarde uma digitalização e confira a grafia do nome em todos os documentos.', 'Inclua o prazo de entrega física no planejamento. O órgão informa que o certificado final pode levar até oito semanas e diferencia o envio inicial pela internet da entrega das cópias certificadas.'], sources: [1] },
        { heading: 'Separe a inscrição geral da seleção do curso', body: 'Na Wits, algumas graduações exigem portfólio, audição ou outra etapa seletiva. No calendário de 2026, o prazo de inscrição de Arquitetura terminou em 30 de junho, e o portfólio pôde ser entregue até 31 de julho. Ambos já passaram. Quem anotasse só o segundo perderia a candidatura.', steps: ['Para o seu ingresso, registre uma data para a candidatura geral e outra para cada entrega da faculdade.', 'Abra as instruções específicas da graduação. Se precisar de moradia universitária, registre também a inscrição para a residência.'], sources: [2] },
        { heading: 'Descubra qual tabela da Wits vale para você', body: 'Em 2026, a regra geral da Wits para graduação em tempo integral cobrava de estudantes internacionais da Comunidade de Desenvolvimento da África Austral (SADC) o valor local mais uma taxa anual de registro. Para a categoria geral de fora da SADC, a anuidade era o dobro da local. Há categorias próprias para determinadas situações e para estudo parcial.', steps: ['Peça a confirmação da categoria e uma estimativa em rands para o seu curso e ano.', 'Separe moradia, anuidade e valor a pagar antes da matrícula. Para outro ciclo, consulte a tabela correspondente.'], sources: [3, 4] },
      ],
      faq: [
        { question: 'A matriculation exemption garante uma vaga?', answer: 'O certificado trata do requisito referente à formação escolar. A universidade ainda aplica seus critérios. Em cursos seletivos, prepare as entregas adicionais enquanto o órgão analisa seus documentos.' },
        { question: 'Preciso enviar também o certificado em português?', answer: 'O órgão solicita os documentos no idioma original junto com a tradução juramentada. Consulte a lista de autoridades aceitas para certificar as cópias antes de pagar a autenticação ou enviá-las do Brasil.' },
      ],
    },
    es: {
      country: 'Sudáfrica',
      title: 'Estudiar un grado en Sudáfrica: admisión con un título extranjero y tasas de Wits',
      description: 'Consulta la evaluación del Matriculation Board, distingue los plazos de la facultad y comprueba qué tarifa de Wits corresponde a tu situación.',
      intro: 'Si terminaste la secundaria fuera de Sudáfrica y quieres estudiar un grado en una universidad pública, conviene distinguir dos decisiones. El Matriculation Board evalúa la titulación escolar para la matriculation exemption. La facultad selecciona a quienes ocuparán las plazas. En Wits, en Johannesburgo, los plazos también cambian según el grado.',
      alt: 'Dos estudiantes examinan una maqueta arquitectónica junto a un portátil y una taza de cerámica.',
      sections: [
        { heading: 'Comprueba tu título en el Matriculation Board', body: 'Universities South Africa ofrece una evaluación en línea para quienes presentan títulos extranjeros. Selecciona el tipo de estudios e introduce los datos del certificado. El resultado indica si tu formación parece cumplir los requisitos mínimos. La emisión del certificado requiere además verificar la documentación.', steps: ['Introduce el nombre oficial del título final de secundaria y guarda el resultado.', 'Pregunta a la universidad qué justificante necesita al presentar la solicitud y cuál exige al matricularte.'], sources: [0, 1] },
        { heading: 'Prepara copias que el organismo pueda verificar', body: 'El organismo enumera el formulario M30, la identificación, los certificados escolares finales y el justificante de pago. Para documentos expedidos en español, solicita una traducción jurada al inglés junto con la documentación en el idioma original. Revisa quién puede certificar las copias antes de enviarlas.', steps: ['Conserva una copia digital y comprueba que tu nombre coincida en todos los documentos.', 'Cuenta con el envío físico. El organismo indica que emitir el certificado final puede llevar hasta ocho semanas y distingue entre subir archivos y presentar copias certificadas.'], sources: [1] },
        { heading: 'Separa el plazo general de las entregas de la facultad', body: 'Algunos grados de Wits incluyen una audición, una carpeta de trabajos u otra selección adicional. En su calendario de 2026, Arquitectura cerró las solicitudes el 30 de junio y aceptó las carpetas hasta el 31 de julio. Ambos plazos ya han pasado. Anotar solo el segundo habría dejado fuera al aspirante.', steps: ['Para tu convocatoria, apunta la fecha de solicitud y cada entrega específica del grado.', 'Consulta las instrucciones de la facultad y añade la solicitud de residencia si necesitas alojamiento universitario.'], sources: [2] },
        { heading: 'Calcula la matrícula en la categoría adecuada', body: 'En 2026, la regla general de Wits para estudiantes internacionales de grado a tiempo completo de la Comunidad de Desarrollo de África Austral (SADC) era la matrícula local más una tasa anual de registro. La categoría general de fuera de la SADC pagaba el doble de la matrícula local. Existen categorías específicas para determinados estatus y para estudios a tiempo parcial.', steps: ['Solicita la categoría aplicable y un presupuesto en rands para el grado y el año elegidos.', 'Distingue alojamiento, matrícula anual e importe exigido antes de formalizar la inscripción. Para otro curso académico, consulta sus tarifas.'], sources: [3, 4] },
      ],
      faq: [
        { question: '¿La matriculation exemption me asegura una plaza?', answer: 'El certificado resuelve el requisito relativo a tus estudios previos. La universidad aplica sus criterios de selección. Comprueba qué entregas adicionales pide tu grado mientras se tramita la documentación.' },
        { question: '¿Hay que presentar el título en español además de la traducción?', answer: 'El organismo solicita los documentos en el idioma original junto con su traducción jurada. Revisa qué autoridades pueden certificar las copias antes de abonar gastos de certificación o envío desde el extranjero.' },
      ],
    },
  },
} satisfies StudyGuide;
