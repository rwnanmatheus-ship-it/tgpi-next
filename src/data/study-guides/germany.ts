import type { StudyGuide } from './types';

export default {
  slug: 'germany',
  countrySlug: 'germany',
  sources: [
    { label: 'DAAD · Zulassung', url: 'https://www.daad.de/en/studying-in-germany/requirements/overview/' },
    { label: 'uni-assist · VPD', url: 'https://www.uni-assist.de/en/how-to-apply/plan-your-application/vpd/' },
    { label: 'Technische Universität München · B.Sc. Informatik', url: 'https://www.tum.de/en/studies/degree-programs/detail/informatics-bachelor-of-science-bsc' },
    { label: 'DAAD · Studienfinanzierung', url: 'https://www.daad.de/en/studying-in-germany/living-in-germany/finances/' },
  ],
  locales: {
    en: {
      country: 'Germany',
      title: 'Study in Germany with a foreign diploma',
      description: 'Check direct entry or Studienkolleg, plan a uni-assist VPD and estimate tuition using an Informatics degree in Garching as a worked example.',
      intro: 'Can you start a German bachelor’s degree with your school diploma? Start with the country that awarded the qualification, the exams you took and any university study you have already completed. Then check what the individual degree expects. The Informatics programme at the Technical University of Munich (TUM) illustrates how the answer changes your timeline and budget.',
      alt: 'Two students position a model bridge over a miniature river in a workshop.',
      sections: [
        { heading: 'Check whether you qualify for direct entry', body: 'Use the DAAD admission database with the exact name of your qualification. Direct entry may cover all subjects or be limited to a field. If a preparatory route is required, a Studienkolleg offers subject-specific courses leading to the Feststellungsprüfung, an assessment that can qualify you to apply in the corresponding field.', steps: ['Save the result with your diploma title and any university semesters you entered.', 'Ask the admissions office to confirm eligibility for your subject. For a Studienkolleg, check its entrance test and German requirement.'], sources: [0] },
        { heading: 'Leave time for the VPD and the university application', body: 'Some universities ask uni-assist for a preliminary review called a VPD. It evaluates your certificates and converts your grade for the university you selected. Uni-assist reports a usual processing time of four to six weeks and recommends applying at least eight weeks before the university deadline.', steps: ['Read the instructions for the exact degree and save both portal deadlines.', 'If the university uses a VPD, upload it to the university with the remaining documents and retain your submission confirmation.'], sources: [1] },
        { heading: 'Read the course record for Garching', body: 'TUM’s Informatics B.Sc. is a six-semester, 180-ECTS degree in Garching. It begins in the winter semester, requires German and has an aptitude assessment. Use the campus address when estimating travel from accommodation in Munich.', steps: ['Check the current application window and accepted proof of German before booking a language test.', 'Open the curriculum and compare first-year mathematics and computing modules with your school preparation.'], sources: [2] },
        { heading: 'Build a semester-by-semester budget', body: 'TUM lists €3,000 per semester for international students in the third-country fee category on this programme. At that rate, two semesters come to €6,000 in tuition. The university lists its student fee separately. DAAD explains that fee rules vary by institution and federal state.', steps: ['Ask which fee category and exemptions apply to you, then add the semester contribution.', 'Price twelve months of housing, health insurance and transport alongside tuition to compare two offers.'], sources: [2, 3] },
      ],
      faq: [
        { question: 'Can I use one VPD for two universities?', answer: 'Uni-assist issues the VPD for the named university. Check each institution separately. A second degree at the same university may share the review, but you still need to follow the application instructions for each course.' },
        { question: 'Does passing a Studienkolleg exam guarantee a place?', answer: 'Passing the assessment can give you a subject-specific entrance qualification. You then apply for the degree. The university still reviews programme conditions such as language, selection criteria and deadlines.' },
      ],
    },
    pt: {
      country: 'Alemanha',
      title: 'Como fazer graduação na Alemanha com diploma estrangeiro',
      description: 'Veja quando cabe ingresso direto ou Studienkolleg, como usar o VPD da uni-assist e quanto pode custar uma graduação em Informática em Garching.',
      intro: 'O diploma de ensino médio permite começar uma graduação alemã? A resposta depende do país que o emitiu, dos exames concluídos e dos semestres que você já cursou em uma universidade. Depois dessa verificação vem a análise do curso. O bacharelado em Informática da Universidade Técnica de Munique (TUM) mostra como essas etapas afetam o calendário e o orçamento.',
      alt: 'Dois estudantes posicionam uma ponte sobre o rio de uma maquete em uma oficina.',
      sections: [
        { heading: 'Descubra se o diploma dá acesso direto', body: 'Consulte a base de admissão do DAAD com o nome exato da sua qualificação. O ingresso direto pode abranger qualquer área ou apenas determinadas disciplinas. Quando há exigência de preparação, o Studienkolleg oferece uma formação por área. O exame final, Feststellungsprüfung, pode habilitar o estudante a concorrer aos cursos daquela área.', steps: ['Guarde o resultado com o nome do diploma e os semestres universitários declarados.', 'Confirme com a universidade se a área escolhida está coberta. No Studienkolleg, verifique a prova de entrada e o alemão exigido.'], sources: [0] },
        { heading: 'Conte o tempo do VPD e da inscrição final', body: 'Algumas universidades pedem à uni-assist a avaliação prévia VPD. O documento analisa seus certificados e converte a nota para a instituição indicada. A uni-assist informa que costuma levar de quatro a seis semanas e recomenda iniciar o pedido pelo menos oito semanas antes do prazo da universidade.', steps: ['Abra as instruções da graduação e anote os prazos de cada portal.', 'Se houver VPD, envie-o à universidade com os demais documentos e salve o comprovante da candidatura.'], sources: [1] },
        { heading: 'Leia a ficha de Informática em Garching', body: 'Na TUM, o bacharelado em Informática dura seis semestres, soma 180 créditos ECTS e fica em Garching. A turma começa no semestre de inverno, exige alemão e passa por avaliação de aptidão. Use o endereço do campus para estimar o trajeto a partir de um imóvel em Munique.', steps: ['Confira o período vigente e os certificados de alemão aceitos antes de pagar por um exame.', 'Compare as disciplinas de matemática e computação do primeiro ano com o que você estudou no ensino médio.'], sources: [2] },
        { heading: 'Calcule o preço de dois semestres', body: 'Para esse curso, a TUM informa € 3.000 por semestre para quem se enquadra na categoria tarifária de países terceiros. Dois semestres somam € 6.000 em ensino. A contribuição estudantil é cobrada à parte. O DAAD explica como os valores variam entre instituições e estados alemães.', steps: ['Pergunte à universidade qual regra ou isenção se aplica ao seu caso e some a contribuição semestral.', 'Inclua doze meses de aluguel, seguro-saúde e deslocamentos ao comparar propostas.'], sources: [2, 3] },
      ],
      faq: [
        { question: 'O mesmo VPD serve para duas universidades?', answer: 'A uni-assist emite o VPD para a universidade identificada no pedido. Confira as exigências de cada instituição. Mesmo quando a avaliação atende a dois cursos da mesma universidade, cada candidatura segue as instruções da graduação.' },
        { question: 'Passar na prova do Studienkolleg garante uma vaga?', answer: 'A aprovação pode habilitar você a concorrer em determinada área. A etapa seguinte é a candidatura. A universidade ainda verifica as exigências específicas do curso, como idioma, seleção e prazo de inscrição.' },
      ],
    },
    es: {
      country: 'Alemania',
      title: 'Cómo estudiar un grado en Alemania con un título extranjero',
      description: 'Comprueba si accedes directamente o necesitas un Studienkolleg, cómo tramitar el VPD y cuánto cuesta estudiar Informática en Garching.',
      intro: '¿Tu título de secundaria te permite empezar un grado en Alemania? Influyen el país que lo expidió, los exámenes aprobados y los estudios universitarios previos. Después debes comprobar los requisitos de la carrera. El grado en Informática de la Universidad Técnica de Múnich (TUM) permite ver cómo estas decisiones afectan al calendario y al presupuesto.',
      alt: 'Dos estudiantes colocan un puente sobre el río de una maqueta en un taller.',
      sections: [
        { heading: 'Comprueba si tienes acceso directo', body: 'Consulta la base de admisión del DAAD con la denominación exacta de tu título. El acceso directo puede abarcar todas las disciplinas o limitarse a una rama. Una de las vías preparatorias es el Studienkolleg. Sus cursos conducen a la Feststellungsprüfung, una evaluación que puede habilitarte para solicitar plaza en la rama correspondiente.', steps: ['Guarda el resultado con el nombre de tu título y los semestres universitarios declarados.', 'Confirma con admisiones que tu carrera está incluida. Para el Studienkolleg, consulta la prueba de ingreso y el nivel de alemán exigido.'], sources: [0] },
        { heading: 'Reserva tiempo para el VPD y la solicitud', body: 'Algunas universidades exigen una evaluación previa de uni-assist llamada VPD. El documento analiza tus certificados y convierte la nota para la universidad indicada. Uni-assist calcula entre cuatro y seis semanas de tramitación y aconseja solicitarlo al menos ocho semanas antes del cierre de la convocatoria.', steps: ['Consulta las instrucciones de la carrera y anota las fechas de cada portal.', 'Si se exige el VPD, súbelo al portal universitario con los demás documentos y guarda el justificante de envío.'], sources: [1] },
        { heading: 'Examina el grado de Informática en Garching', body: 'El grado de la TUM tiene seis semestres y 180 créditos ECTS. Se imparte en Garching, empieza en el semestre de invierno y exige alemán y una evaluación de aptitud. Si buscas alojamiento en Múnich, calcula el desplazamiento hasta este campus.', steps: ['Revisa el plazo vigente y qué certificados de alemán acepta la universidad antes de reservar un examen.', 'Compara las asignaturas de matemáticas y computación de primer año con tu preparación escolar.'], sources: [2] },
        { heading: 'Calcula los gastos por semestre', body: 'La TUM publica un precio de 3.000 € por semestre para este grado y la categoría tarifaria de estudiantes de terceros países. Dos semestres suman 6.000 € de matrícula, más la contribución estudiantil. El DAAD explica cómo varían los precios entre centros y estados federados.', steps: ['Confirma con el centro la categoría y las exenciones que te corresponden. Añade la contribución semestral.', 'Al comparar dos ofertas, suma doce meses de alojamiento, seguro médico y transporte.'], sources: [2, 3] },
      ],
      faq: [
        { question: '¿Sirve el mismo VPD para dos universidades?', answer: 'Uni-assist expide el VPD para la universidad indicada en la solicitud. Revisa cada centro por separado. Aunque la evaluación sirva para dos grados del mismo centro, cada uno mantiene su propio procedimiento de solicitud.' },
        { question: '¿Aprobar el examen del Studienkolleg me asegura plaza?', answer: 'La prueba puede darte acceso a las solicitudes en una rama concreta. Después debes solicitar plaza. La universidad examina los requisitos del grado, incluidos el idioma, los criterios de selección y el calendario.' },
      ],
    },
  },
} satisfies StudyGuide;
