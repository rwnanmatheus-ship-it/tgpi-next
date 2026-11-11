import { locales, type Locale } from '../localization/config';

export type GuideTopic = 'compare' | 'countries' | 'country-fit' | 'plan' | 'learning' | 'language' | 'documents' | 'credentials' | 'global-key' | 'intelligence' | 'workspace' | 'settings' | 'community' | 'premium';

type Translation = readonly [string, string, string, string, string, string];
export const guideText = (copy: Translation, locale: Locale) => copy[locales.indexOf(locale)];

export const guideLearningProject = [
  'Start with one deliverable. What result could another learner inspect to tell whether you met the brief?',
  'Comece com uma entrega. Que resultado outro aluno poderia verificar para saber se você cumpriu a proposta?',
  'Empieza con una entrega. ¿Qué resultado podría comprobar otro estudiante para saber si cumpliste la propuesta?',
  'Commence par un livrable. Quel résultat un autre apprenant pourrait-il vérifier pour savoir si tu as répondu au brief ?',
  'Beginne mit einem Lieferobjekt. Welches Ergebnis könnte jemand prüfen, um zu erkennen, ob du die Aufgabe erfüllt hast?',
  'Inizia con una consegna. Quale risultato potrebbe verificare un altro studente per capire se hai rispettato il progetto?',
] satisfies Translation;

export const guideFallback = [
  'I can help you plan a move, compare countries, prepare documents, practise a language or find a TGPI tool. Where are you now, and what are you trying to decide?',
  'Posso ajudar a planejar uma mudança, comparar países, preparar documentos, praticar um idioma ou encontrar uma ferramenta da TGPI. Onde você está e o que quer decidir?',
  'Puedo ayudarte a planear una mudanza, comparar países, preparar documentos, practicar un idioma o encontrar una herramienta de TGPI. ¿Dónde estás y qué quieres decidir?',
  'Je peux vous aider à préparer un départ, comparer des pays, organiser vos documents, pratiquer une langue ou trouver un outil TGPI. Où êtes-vous et que souhaitez-vous décider ?',
  'Ich helfe beim Umzug, Ländervergleich, bei Dokumenten, Sprachen oder der Suche nach einem TGPI-Werkzeug. Wo stehst du und was möchtest du entscheiden?',
  'Posso aiutarti a pianificare un trasferimento, confrontare paesi, preparare documenti, praticare una lingua o trovare uno strumento TGPI. Dove sei e cosa vuoi decidere?',
] satisfies Translation;

export const guideCompareOne = [
  'Which other country would you like to compare with {country}?', 'Com qual outro país você quer comparar {country}?', '¿Con qué otro país quieres comparar {country}?',
  'Avec quel autre pays voulez-vous comparer {country} ?', 'Mit welchem anderen Land möchtest du {country} vergleichen?', 'Con quale altro paese vuoi confrontare {country}?',
] satisfies Translation;

export const guideCompareNone = [
  'Tell me at least two countries and what matters most to you.', 'Diga pelo menos dois países e o que mais importa para você.', 'Dime al menos dos países y qué te importa más.',
  'Donnez-moi au moins deux pays et votre priorité.', 'Nenne mir mindestens zwei Länder und deine wichtigste Priorität.', 'Indicami almeno due paesi e cosa conta di più per te.',
] satisfies Translation;

export const guideTopics = {
  compare: {
    prompt: ['Help me compare two destinations.', 'Ajude-me a comparar dois destinos.', 'Ayúdame a comparar dos destinos.', 'Aidez-moi à comparer deux destinations.', 'Hilf mir, zwei Ziele zu vergleichen.', 'Aiutami a confrontare due destinazioni.'],
    answer: [
      'Choose one objective and compare the same indicators for each place. Start with **monthly cost in the same currency**, language demands and access to work or study. Check reference years and treat missing data as unknown. What is your priority?',
      'Defina um objetivo e compare os mesmos indicadores para cada destino. Comece pelo **custo mensal na mesma moeda**, pelo idioma e pelo acesso a trabalho ou estudo. Confira o ano de referência e trate dados ausentes como desconhecidos. Qual é a sua prioridade?',
      'Define un objetivo y compara los mismos indicadores. Empieza por **coste mensual en la misma moneda**, idioma y acceso al trabajo o estudio. Revisa los años de referencia y los datos ausentes. ¿Cuál es tu prioridad?',
      'Fixez un objectif et comparez les mêmes indicateurs. Commencez par le **coût mensuel dans la même devise**, la langue et l’accès au travail ou aux études. Vérifiez l’année de référence et les données manquantes. Quelle est votre priorité ?',
      'Lege ein Ziel fest und vergleiche dieselben Indikatoren. Beginne mit **Monatskosten in derselben Währung**, Sprache und Zugang zu Arbeit oder Studium. Prüfe Referenzjahre und Datenlücken. Was hat Vorrang?',
      'Definisci un obiettivo e confronta gli stessi indicatori. Inizia da **costo mensile nella stessa valuta**, lingua e accesso a studio o lavoro. Controlla gli anni di riferimento e i dati mancanti. Qual è la tua priorità?',
    ],
  },
  countries: {
    prompt: ['Help me explore a country.', 'Ajude-me a explorar um país.', 'Ayúdame a explorar un país.', 'Aidez-moi à explorer un pays.', 'Hilf mir, ein Land zu erkunden.', 'Aiutami a esplorare un paese.'],
    answer: [
      'Open the country profile and start with the region, main language and available evidence. Compare cities separately before estimating housing or transport. Which destination and purpose should we focus on?',
      'Abra o perfil do país e comece pela região, pelo idioma principal e pelas evidências disponíveis. Compare cidades separadamente antes de estimar moradia ou transporte. Qual destino e objetivo você tem em mente?',
      'Abre el perfil del país y revisa región, idioma principal y evidencias. Compara las ciudades por separado antes de estimar vivienda o transporte. ¿Qué destino y objetivo tienes?',
      'Ouvrez le profil du pays et examinez la région, la langue et les sources. Comparez les villes séparément avant d’estimer logement ou transport. Quel est votre objectif ?',
      'Öffne das Länderprofil und prüfe Region, Sprache und Quellen. Vergleiche Städte getrennt, bevor du Wohn- oder Fahrtkosten schätzt. Welches Ziel hast du?',
      'Apri il profilo del paese e controlla regione, lingua e fonti. Confronta le città separatamente prima di stimare alloggio o trasporti. Qual è il tuo obiettivo?',
    ],
  },
  'country-fit': {
    prompt: ['Help me find destinations that fit my goals.', 'Ajude-me a encontrar destinos que combinam com minhas metas.', 'Ayúdame a encontrar destinos acordes a mis metas.', 'Aidez-moi à trouver des destinations adaptées à mes objectifs.', 'Hilf mir, passende Länder zu finden.', 'Aiutami a trovare destinazioni adatte ai miei obiettivi.'],
    answer: [
      'Set three priorities, one non-negotiable constraint and a timeframe. Use Country Fit to build a shortlist, then validate your finalists in Compare. What would rule a country out for you?',
      'Defina três prioridades, uma condição inegociável e um prazo. Use o Country Fit para montar uma lista inicial e valide os finalistas em Comparar. O que eliminaria um país da sua lista?',
      'Define tres prioridades, una condición imprescindible y un plazo. Usa Country Fit para preparar una lista y valida los finalistas en Comparar. ¿Qué descartaría un país?',
      'Fixez trois priorités, une condition incontournable et un délai. Préparez une liste dans Country Fit, puis validez-la avec Comparer. Quel critère éliminerait un pays ?',
      'Lege drei Prioritäten, eine feste Anforderung und einen Zeitraum fest. Erstelle in Country Fit eine Liste und prüfe die Kandidaten im Vergleich. Was wäre ein Ausschlusskriterium?',
      'Definisci tre priorità, un requisito essenziale e una scadenza. Crea una lista con Country Fit e verifica i finalisti con Confronta. Cosa escluderebbe un paese?',
    ],
  },
  plan: {
    prompt: ['Build a preparation plan with me.', 'Monte um plano de preparação comigo.', 'Crea conmigo un plan de preparación.', 'Construisons un plan de préparation.', 'Erstelle mit mir einen Vorbereitungsplan.', 'Costruiamo un piano di preparazione.'],
    answer: [
      'Work in three stages. **This week**, write one measurable objective and choose two destinations. **This month**, compare costs, document requirements and language gaps. **Before committing**, validate one viable route and set a decision date. What deadline should the plan use?',
      'Trabalhe em três etapas. **Nesta semana**, escreva uma meta mensurável e escolha dois destinos. **Neste mês**, compare custos, requisitos documentais e lacunas de idioma. **Antes de decidir**, valide uma rota viável e marque a data da decisão. Qual prazo devemos usar?',
      'Trabaja en tres etapas. **Esta semana**, fija una meta medible y dos destinos. **Este mes**, compara costes, documentos e idioma. **Antes de comprometerte**, valida una ruta y fija la fecha de decisión. ¿Qué plazo usamos?',
      'Avancez en trois étapes. **Cette semaine**, fixez un objectif mesurable et deux destinations. **Ce mois-ci**, comparez coûts, documents et langue. **Avant de vous engager**, validez une voie et fixez une date de décision. Quel délai retenez-vous ?',
      'Plane in drei Etappen. **Diese Woche** legst du ein messbares Ziel und zwei Länder fest. **Diesen Monat** vergleichst du Kosten, Dokumente und Sprache. **Vor der Entscheidung** prüfst du einen machbaren Weg und setzt einen Termin. Bis wann?',
      'Procedi in tre fasi. **Questa settimana**, fissa un obiettivo misurabile e due paesi. **Questo mese**, confronta costi, documenti e lingua. **Prima di impegnarti**, verifica una strada e stabilisci una data. Qual è la scadenza?',
    ],
  },
  learning: {
    prompt: ['How should I prepare to study abroad?', 'Como me preparar para estudar no exterior?', '¿Cómo me preparo para estudiar en el extranjero?', 'Comment me préparer à étudier à l’étranger ?', 'Wie bereite ich ein Auslandsstudium vor?', 'Come mi preparo a studiare all’estero?'],
    answer: [
      'Choose the subject, intake and two institutions. Check their published admission requirements, language evidence, costs and deadlines. Use TGPI Learning to practise a skill you can demonstrate. What subject and intake are you considering?',
      'Escolha a área, o semestre de entrada e duas instituições. Confira os requisitos de admissão, a comprovação de idioma, os custos e os prazos publicados por elas. Use o TGPI Learning para praticar uma habilidade que você possa demonstrar. Qual área e semestre você está considerando?',
      'Elige área, convocatoria y dos instituciones. Revisa admisión, acreditación de idioma, costes y plazos publicados. Usa TGPI Learning para practicar una habilidad que puedas demostrar. ¿Qué área y convocatoria te interesan?',
      'Choisissez une discipline, une rentrée et deux établissements. Consultez les conditions d’admission, preuves linguistiques, coûts et délais. Utilisez TGPI Learning pour exercer une compétence démontrable. Quel domaine et quelle rentrée visez-vous ?',
      'Wähle Fach, Studienbeginn und zwei Einrichtungen. Prüfe veröffentlichte Zulassung, Sprachnachweis, Kosten und Fristen. Übe mit TGPI Learning eine nachweisbare Fähigkeit. Welches Fach und welcher Beginn?',
      'Scegli materia, sessione e due istituti. Verifica ammissione, prova linguistica, costi e scadenze pubblicate. Usa TGPI Learning per esercitare una competenza dimostrabile. Quali materia e sessione consideri?',
    ],
  },
  language: {
    prompt: ['Help me build a language-learning routine.', 'Ajude-me a criar uma rotina de estudos de idioma.', 'Ayúdame a crear una rutina de idiomas.', 'Aidez-moi à créer une routine linguistique.', 'Hilf mir, eine Sprachroutine aufzubauen.', 'Aiutami a creare una routine linguistica.'],
    answer: [
      'Try five 15-minute sessions this week. Spend **5 minutes listening**, **5 repeating out loud**, and **5 answering one practical question**. Record a 60-second introduction on day one and repeat it on day five. Which language and situation should we practise?',
      'Experimente cinco sessões de 15 minutos nesta semana. Use **5 minutos para ouvir**, **5 para repetir em voz alta** e **5 para responder a uma pergunta prática**. Grave uma apresentação de 60 segundos no primeiro dia e repita no quinto. Que idioma e situação você quer praticar?',
      'Prueba cinco sesiones de 15 minutos. Dedica **5 a escuchar**, **5 a repetir en voz alta** y **5 a responder** una pregunta práctica. Graba una presentación de 60 segundos el primer día y repítela el quinto. ¿Qué idioma y situación quieres practicar?',
      'Essayez cinq séances de 15 minutes. Passez **5 minutes à écouter**, **5 à répéter à voix haute** et **5 à répondre** à une question pratique. Enregistrez une présentation de 60 secondes le premier puis le cinquième jour. Quelle langue et situation voulez-vous pratiquer ?',
      'Probiere fünf Einheiten à 15 Minuten. **Höre 5 Minuten**, **sprich 5 Minuten nach** und **beantworte 5 Minuten** eine praktische Frage. Nimm am ersten und fünften Tag eine kurze Vorstellung auf. Welche Sprache und Situation möchtest du üben?',
      'Prova cinque sessioni da 15 minuti. Usa **5 minuti per ascoltare**, **5 per ripetere ad alta voce** e **5 per rispondere** a una domanda pratica. Registra una presentazione di 60 secondi il primo e il quinto giorno. Quale lingua e situazione vuoi praticare?',
    ],
  },
  documents: {
    prompt: ['Help me prepare a document checklist.', 'Ajude-me a preparar uma lista de documentos.', 'Ayúdame a preparar una lista de documentos.', 'Aidez-moi à préparer une liste de documents.', 'Hilf mir mit einer Dokumentenliste.', 'Aiutami a preparare una lista di documenti.'],
    answer: [
      'Make a checklist with identity, purpose, evidence and expiry dates. Check the destination authority’s instructions for your specific route before ordering translations, apostilles or certificates. Which destination and document are you preparing for?',
      'Monte uma lista com identificação, finalidade, comprovantes e validade. Consulte as instruções da autoridade do destino para a sua modalidade antes de contratar traduções, apostilas ou certidões. Para qual destino e documento você está se preparando?',
      'Crea una lista de identidad, finalidad, pruebas y caducidad. Revisa las instrucciones de la autoridad del destino para tu caso antes de solicitar traducciones, apostillas o certificados. ¿Qué destino y documento preparas?',
      'Listez identité, motif, justificatifs et dates de validité. Consultez les consignes de l’autorité du pays pour votre démarche avant de commander traductions, apostilles ou certificats. Quelle destination et quel document préparez-vous ?',
      'Liste Identität, Zweck, Nachweise und Gültigkeit auf. Prüfe die Vorgaben der zuständigen Behörde für deinen Fall, bevor du Übersetzungen, Apostillen oder Urkunden bestellst. Um welches Land und Dokument geht es?',
      'Elenca identità, finalità, prove e scadenze. Consulta le istruzioni dell’autorità del paese per il tuo caso prima di ordinare traduzioni, apostille o certificati. Quale destinazione e documento stai preparando?',
    ],
  },
  credentials: {
    prompt: ['How do I verify a TGPI certificate?', 'Como verifico um certificado TGPI?', '¿Cómo verifico un certificado TGPI?', 'Comment vérifier un certificat TGPI ?', 'Wie prüfe ich ein TGPI-Zertifikat?', 'Come verifico un certificato TGPI?'],
    answer: [
      'Open the TGPI verification page from the certificate’s QR code or credential link. Compare the displayed name, program and credential identifier with the document. Use your account certificates page to find your own issued credentials.',
      'Abra a página de verificação da TGPI pelo QR Code ou link da credencial. Compare o nome, o programa e o identificador exibidos com o documento. Consulte a página de certificados da conta para encontrar suas credenciais emitidas.',
      'Abre la verificación de TGPI desde el QR o enlace. Compara nombre, programa e identificador con el documento. Consulta los certificados de tu cuenta para localizar tus credenciales.',
      'Ouvrez la vérification TGPI via le QR ou le lien. Comparez le nom, le programme et l’identifiant avec le document. Vos attestations figurent dans l’espace certificats.',
      'Öffne die TGPI-Prüfung über QR-Code oder Link. Vergleiche Name, Programm und Kennung mit dem Dokument. Eigene Nachweise findest du im Zertifikatsbereich.',
      'Apri la verifica TGPI dal QR o dal link. Confronta nome, programma e identificativo con il documento. I tuoi attestati sono nella pagina certificati.',
    ],
  },
  'global-key': {
    prompt: ['Where can I inspect my TGPI Global ID?', 'Onde posso consultar meu TGPI Global ID?', '¿Dónde consulto mi TGPI Global ID?', 'Où consulter mon TGPI Global ID ?', 'Wo sehe ich meine TGPI Global ID?', 'Dove consulto il mio TGPI Global ID?'],
    answer: ['Open Global ID to see the identity and proof tools available to your account. Use the official verification link for a proof you want to check.', 'Abra o ID Global para consultar as ferramentas de identidade e prova disponíveis na sua conta. Use o link oficial de verificação para consultar uma prova.', 'Abre Global ID para consultar las herramientas de identidad y prueba de tu cuenta. Usa el enlace oficial para verificar una prueba.', 'Ouvrez Global ID pour accéder aux outils d’identité et de preuve de votre compte. Utilisez le lien officiel de vérification.', 'Öffne Global ID für die Identitäts- und Nachweisfunktionen deines Kontos. Prüfe Nachweise über den offiziellen Link.', 'Apri Global ID per vedere gli strumenti di identità e prova dell’account. Usa il link ufficiale per verificare una prova.'],
  },
  intelligence: {
    prompt: ['Help me read TGPI sources and methodology.', 'Ajude-me a entender as fontes e a metodologia da TGPI.', 'Ayúdame a entender las fuentes y la metodología de TGPI.', 'Aidez-moi à lire les sources et la méthodologie TGPI.', 'Hilf mir, TGPI-Quellen und Methoden zu verstehen.', 'Aiutami a leggere le fonti e la metodologia TGPI.'],
    answer: ['Separate the **reference year** of an observation from when TGPI retrieved it. Before comparing, check publisher, unit, geography and coverage. A missing observation cannot be treated as zero. Open the methodology to inspect the source record.', 'Separe o **ano de referência** da observação da data em que a TGPI consultou a fonte. Antes de comparar, confira instituição, unidade, região e cobertura. Dado ausente não equivale a zero. Abra a metodologia para consultar o registro da fonte.', 'Distingue el **año de referencia** de la fecha de consulta. Revisa editor, unidad, geografía y cobertura. Un dato ausente no equivale a cero. Consulta el registro en Metodología.', 'Distinguez **l’année de référence** de la date de collecte. Vérifiez éditeur, unité, géographie et couverture. Une donnée manquante ne vaut pas zéro. Consultez le registre dans Méthodologie.', 'Trenne **Referenzjahr** und Abrufdatum. Prüfe Herausgeber, Einheit, Region und Abdeckung. Ein fehlender Wert ist keine Null. Sieh in der Methodik nach.', 'Distingui **anno di riferimento** e data di consultazione. Verifica editore, unità, area e copertura. Un dato mancante non è zero. Consulta il registro nella metodologia.'],
  },
  workspace: {
    prompt: ['Where do I find my TGPI workspace?', 'Onde encontro meu Espaço de Trabalho TGPI?', '¿Dónde está mi espacio de trabajo TGPI?', 'Où est mon espace de travail TGPI ?', 'Wo finde ich meinen TGPI-Arbeitsbereich?', 'Dove trovo il mio spazio di lavoro TGPI?'],
    answer: ['Open your workspace to review your TGPI activity and resume an available task. Tell me which part you want to find and I can point you to it.', 'Abra seu Espaço de Trabalho para consultar suas atividades na TGPI e retomar uma tarefa disponível. Diga qual área você procura para eu indicar o caminho.', 'Abre tu espacio de trabajo para ver tu actividad en TGPI y retomar una tarea. Dime qué sección buscas.', 'Ouvrez votre espace de travail pour consulter votre activité et reprendre une tâche. Dites-moi quelle rubrique vous cherchez.', 'Öffne den Arbeitsbereich für deine TGPI-Aktivitäten und laufenden Aufgaben. Sag mir, welchen Bereich du suchst.', 'Apri lo spazio di lavoro per vedere la tua attività e riprendere un compito. Dimmi quale area cerchi.'],
  },
  settings: {
    prompt: ['How do I find account and privacy settings?', 'Como encontro as configurações de conta e privacidade?', '¿Dónde están los ajustes de cuenta y privacidad?', 'Où sont les paramètres du compte et de confidentialité ?', 'Wo finde ich Konto und Datenschutz?', 'Dove trovo le impostazioni di account e privacy?'],
    answer: ['Use Account & Privacy to review sign-in methods and security settings. The Atlas history panel lets you export or delete a conversation from this browser. Never include passwords or verification codes in a chat.', 'Use Conta e Privacidade para revisar métodos de acesso e configurações de segurança. No histórico do Atlas, você pode baixar ou excluir uma conversa deste navegador. Mantenha senhas e códigos de verificação fora do chat.', 'Usa Cuenta y privacidad para revisar inicio de sesión y seguridad. En Atlas puedes exportar o borrar conversaciones de este navegador. Evita compartir contraseñas y códigos.', 'Utilisez Compte et confidentialité pour vérifier connexion et sécurité. L’historique Atlas permet d’exporter ou supprimer les conversations de ce navigateur. Gardez vos mots de passe et codes privés.', 'Unter Konto und Datenschutz findest du Anmeldung und Sicherheit. Im Atlas-Verlauf kannst du Gespräche dieses Browsers exportieren oder löschen. Halte Passwörter und Codes geheim.', 'Usa Account e privacy per rivedere accesso e sicurezza. Nella cronologia Atlas puoi esportare o eliminare conversazioni da questo browser. Mantieni privati password e codici.'],
  },
  community: {
    prompt: ['Help me find the TGPI community.', 'Ajude-me a encontrar a comunidade TGPI.', 'Ayúdame a encontrar la comunidad TGPI.', 'Aidez-moi à trouver la communauté TGPI.', 'Hilf mir, die TGPI-Community zu finden.', 'Aiutami a trovare la community TGPI.'],
    answer: ['Open Community to explore the available spaces and discussions. When asking for advice, include your goal and timeframe and keep personal documents out of the post.', 'Abra a Comunidade para explorar os espaços e discussões disponíveis. Ao pedir orientação, informe sua meta e seu prazo e mantenha documentos pessoais fora da publicação.', 'Abre Comunidad para ver espacios y conversaciones disponibles. Al pedir consejo, indica tu meta y plazo y evita publicar documentos personales.', 'Ouvrez Communauté pour découvrir les espaces et échanges disponibles. Pour demander conseil, indiquez votre objectif et votre délai et gardez vos documents privés.', 'Öffne die Community für verfügbare Räume und Gespräche. Nenne bei einer Frage dein Ziel und deinen Zeitraum und halte Dokumente privat.', 'Apri Community per esplorare gli spazi e le discussioni. Quando chiedi consiglio, indica obiettivo e scadenza e mantieni privati i documenti.'],
  },
  premium: {
    prompt: ['Where can I review TGPI plans?', 'Onde posso consultar os planos da TGPI?', '¿Dónde consulto los planes de TGPI?', 'Où consulter les offres TGPI ?', 'Wo finde ich TGPI-Tarife?', 'Dove consulto i piani TGPI?'],
    answer: ['Open the plans page to review current features, price and billing terms before making a decision. The Atlas free guide works independently of a subscription.', 'Abra a página de planos para consultar recursos, preço e condições de cobrança antes de decidir. O guia gratuito do Atlas funciona independentemente de assinatura.', 'Consulta funciones, precio y facturación en la página de planes. La guía gratuita de Atlas funciona sin suscripción.', 'Consultez fonctionnalités, prix et conditions sur la page des offres. Le guide gratuit Atlas fonctionne sans abonnement.', 'Prüfe Funktionen, Preis und Bedingungen auf der Tarifseite. Der kostenlose Atlas-Guide funktioniert ohne Abo.', 'Controlla funzioni, prezzo e condizioni nella pagina dei piani. La guida gratuita Atlas funziona senza abbonamento.'],
  },
} satisfies Record<GuideTopic, { prompt: Translation; answer: Translation }>;
