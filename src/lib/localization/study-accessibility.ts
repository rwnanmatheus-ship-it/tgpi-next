import type { Locale } from './config';

const copy = {
  center: ['Accessibility center', 'Central de acessibilidade', 'Centro de accesibilidad', 'Centre d’accessibilité', 'Barrierefreiheit', 'Centro di accessibilità'],
  intro: ['Adjust how you study. Try the reader, choose your display preferences, or tell us about an accessibility barrier.', 'Ajuste sua forma de estudar. Teste o leitor, escolha suas preferências de exibição ou relate uma barreira de acessibilidade.', 'Ajusta cómo estudias. Prueba el lector, elige tus preferencias de pantalla o informa de una barrera.', 'Adaptez votre façon d’étudier. Essayez le lecteur, réglez l’affichage ou signalez un obstacle.', 'Passen Sie Ihre Lernumgebung an. Testen Sie den Lesemodus, ändern Sie die Anzeige oder melden Sie eine Barriere.', 'Personalizza lo studio. Prova il lettore, modifica la visualizzazione o segnala una barriera.'],
  settings: ['Display preferences', 'Preferências de exibição', 'Preferencias de pantalla', 'Préférences d’affichage', 'Anzeigeeinstellungen', 'Preferenze di visualizzazione'],
  sample: ['Try the study reader', 'Teste o leitor de estudos', 'Prueba el lector de estudio', 'Essayez le lecteur', 'Lesemodus ausprobieren', 'Prova il lettore'],
  navigation: ['Keyboard and screen readers', 'Teclado e leitores de tela', 'Teclado y lectores de pantalla', 'Clavier et lecteurs d’écran', 'Tastatur und Screenreader', 'Tastiera e lettori di schermo'],
  keys: ['Use Tab and Shift+Tab to move between controls, Enter to activate links, and Escape to close the study reader. You can also navigate by headings with your screen reader.', 'Use Tab e Shift+Tab para passar pelos controles, Enter para abrir links e Esc para fechar o leitor. No leitor de tela, também é possível navegar pelos títulos.', 'Usa Tab y Mayús+Tab para moverte, Intro para abrir enlaces y Esc para cerrar el lector. Puedes navegar por encabezados con tu lector de pantalla.', 'Utilisez Tab et Maj+Tab pour vous déplacer, Entrée pour ouvrir les liens et Échap pour fermer le lecteur. Le lecteur d’écran permet aussi de parcourir les titres.', 'Wechseln Sie mit Tab und Umschalt+Tab zwischen Elementen, öffnen Sie Links mit Enter und schließen Sie den Lesemodus mit Esc. Screenreader können nach Überschriften navigieren.', 'Usa Tab e Maiusc+Tab per spostarti, Invio per aprire i link ed Esc per chiudere il lettore. Puoi anche navigare per titoli con il lettore di schermo.'],
  report: ['Report an accessibility barrier by email', 'Relatar uma barreira de acessibilidade por e-mail', 'Informar de una barrera por correo', 'Signaler un obstacle par e-mail', 'Barriere per E-Mail melden', 'Segnala una barriera via e-mail'],
  reader: ['Study reader', 'Leitor de estudos', 'Lector de estudio', 'Lecteur d’étude', 'Lesemodus', 'Lettore di studio'],
  chapter: ['Reading section', 'Seção de leitura', 'Sección de lectura', 'Section de lecture', 'Leseabschnitt', 'Sezione di lettura'],
  previous: ['Previous section', 'Seção anterior', 'Sección anterior', 'Section précédente', 'Vorheriger Abschnitt', 'Sezione precedente'],
  next: ['Next section', 'Próxima seção', 'Sección siguiente', 'Section suivante', 'Nächster Abschnitt', 'Sezione successiva'],
  listen: ['Read aloud', 'Ler em voz alta', 'Leer en voz alta', 'Lire à voix haute', 'Vorlesen', 'Leggi ad alta voce'],
  pause: ['Pause reading', 'Pausar leitura', 'Pausar lectura', 'Mettre en pause', 'Vorlesen pausieren', 'Metti in pausa'],
  resume: ['Resume reading', 'Retomar leitura', 'Reanudar lectura', 'Reprendre la lecture', 'Vorlesen fortsetzen', 'Riprendi la lettura'],
  stop: ['Stop reading', 'Parar leitura', 'Detener lectura', 'Arrêter la lecture', 'Vorlesen stoppen', 'Interrompi la lettura'],
  speed: ['Reading speed', 'Velocidade de leitura', 'Velocidad de lectura', 'Vitesse de lecture', 'Lesegeschwindigkeit', 'Velocità di lettura'],
  size: ['Text size', 'Tamanho do texto', 'Tamaño del texto', 'Taille du texte', 'Textgröße', 'Dimensione del testo'],
  spacing: ['Increase text spacing', 'Aumentar espaçamento do texto', 'Aumentar el espaciado', 'Augmenter l’espacement', 'Textabstände vergrößern', 'Aumenta la spaziatura'],
  contrast: ['High contrast', 'Alto contraste', 'Alto contraste', 'Contraste élevé', 'Hoher Kontrast', 'Contrasto elevato'],
  voiceMissing: ['No local voice is available for this section’s language. You can read the text or use your screen reader.', 'Nenhuma voz local está disponível no idioma desta seção. Você pode ler o texto ou usar seu leitor de tela.', 'No hay una voz local para este idioma. Puedes leer el texto o usar tu lector de pantalla.', 'Aucune voix locale n’est disponible pour cette langue. Vous pouvez lire le texte ou utiliser votre lecteur d’écran.', 'Für diese Sprache ist keine lokale Stimme verfügbar. Lesen Sie den Text oder nutzen Sie Ihren Screenreader.', 'Non è disponibile una voce locale per questa lingua. Puoi leggere il testo o usare il lettore di schermo.'],
  voiceError: ['Reading was interrupted. You can try again.', 'A leitura foi interrompida. Você pode tentar novamente.', 'La lectura se interrumpió. Puedes volver a intentarlo.', 'La lecture a été interrompue. Réessayez.', 'Das Vorlesen wurde unterbrochen. Versuchen Sie es erneut.', 'La lettura si è interrotta. Puoi riprovare.'],
  download: ['Download study text (.txt)', 'Baixar texto de estudo (.txt)', 'Descargar texto de estudio (.txt)', 'Télécharger le texte (.txt)', 'Lerntext herunterladen (.txt)', 'Scarica il testo (.txt)'],
  close: ['Close reader', 'Fechar leitor', 'Cerrar lector', 'Fermer le lecteur', 'Lesemodus schließen', 'Chiudi il lettore'],
  atlas: ['Study with Atlas AI', 'Estudar com o Atlas AI', 'Estudiar con Atlas AI', 'Étudier avec Atlas AI', 'Mit Atlas AI lernen', 'Studia con Atlas AI'],
  atlasHint: ['Opens Atlas in a new tab. You choose what to share.', 'Abre o Atlas em uma nova aba. Você escolhe o que compartilhar.', 'Abre Atlas en otra pestaña. Tú eliges qué compartir.', 'Atlas s’ouvre dans un nouvel onglet. Vous choisissez quoi partager.', 'Atlas öffnet sich in einem neuen Tab. Sie entscheiden, was Sie teilen.', 'Atlas si apre in una nuova scheda. Scegli tu cosa condividere.'],
  atlasPlain: ['Prepare a plain-language explanation request', 'Preparar pedido de explicação em linguagem simples', 'Preparar una solicitud de explicación sencilla', 'Préparer une demande d’explication en langage clair', 'Anfrage in einfacher Sprache vorbereiten', 'Prepara una richiesta in linguaggio semplice'],
  atlasTemplate: [
    'Explain the excerpt I provide in plain language. Keep important terms and numbers, give one concrete example, and ask one question to check my understanding. If I have not added the excerpt yet, ask me for it. Do not answer graded questions for me. Excerpt:',
    'Explique o trecho que eu enviar em linguagem simples. Preserve termos e números importantes, dê um exemplo concreto e faça uma pergunta para verificar minha compreensão. Se eu ainda não tiver incluído o trecho, peça que eu o envie. Não responda avaliações por mim. Trecho:',
    'Explica el fragmento que comparta en lenguaje sencillo. Conserva términos y cifras importantes, da un ejemplo y haz una pregunta de comprensión. Si falta el fragmento, pídemelo. No respondas evaluaciones por mí. Fragmento:',
    'Expliquez mon extrait en langage clair. Conservez les termes et chiffres importants, donnez un exemple et posez une question de compréhension. Si l’extrait manque, demandez-le. Ne répondez pas aux évaluations à ma place. Extrait :',
    'Erkläre meinen Auszug in einfacher Sprache. Bewahre wichtige Begriffe und Zahlen, gib ein Beispiel und stelle eine Verständnisfrage. Wenn der Auszug fehlt, bitte mich darum. Beantworte keine Prüfungsfragen für mich. Auszug:',
    'Spiega il mio estratto in linguaggio semplice. Mantieni i termini e i numeri importanti, fai un esempio e poni una domanda di comprensione. Se manca il brano, chiedimelo. Non rispondere agli esami al mio posto. Estratto:',
  ],
  sampleTitle: ['Read a worked example', 'Leia um exemplo resolvido', 'Lee un ejemplo resuelto', 'Lisez un exemple guidé', 'Ein Rechenbeispiel lesen', 'Leggi un esempio svolto'],
  sampleBody: [
    'A student compares two courses. The first has 12 lessons of 25 minutes, for a total of 300 minutes. The second has 8 lessons of 40 minutes, for a total of 320 minutes. The first fits a five-hour study plan exactly.',
    'Uma estudante compara dois cursos. O primeiro tem 12 aulas de 25 minutos, totalizando 300 minutos. O segundo tem 8 aulas de 40 minutos, totalizando 320 minutos. O primeiro cabe exatamente em um plano de cinco horas de estudo.',
    'Una estudiante compara dos cursos. El primero tiene 12 lecciones de 25 minutos, 300 minutos en total. El segundo tiene 8 lecciones de 40 minutos, 320 minutos en total. El primero encaja en un plan de cinco horas.',
    'Une étudiante compare deux cours. Le premier compte 12 leçons de 25 minutes, soit 300 minutes. Le second compte 8 leçons de 40 minutes, soit 320 minutes. Le premier tient exactement dans un plan de cinq heures.',
    'Eine Studentin vergleicht zwei Kurse. Der erste hat 12 Lektionen à 25 Minuten, insgesamt 300 Minuten. Der zweite hat 8 Lektionen à 40 Minuten, insgesamt 320 Minuten. Der erste passt genau in einen Fünf-Stunden-Plan.',
    'Una studentessa confronta due corsi. Il primo ha 12 lezioni da 25 minuti, per un totale di 300 minuti. Il secondo ha 8 lezioni da 40 minuti, per un totale di 320 minuti. Il primo rientra esattamente in un piano di cinque ore.',
  ],
  samplePractice: [
    'If you can study 60 minutes per week, how many weeks will you need for the first course?',
    'Se você puder estudar 60 minutos por semana, de quantas semanas vai precisar para o primeiro curso?',
    'Si puedes estudiar 60 minutos por semana, ¿cuántas semanas necesitas para el primer curso?',
    'Si vous étudiez 60 minutes par semaine, de combien de semaines aurez-vous besoin pour le premier cours ?',
    'Wie viele Wochen brauchen Sie für den ersten Kurs, wenn Sie 60 Minuten pro Woche lernen können?',
    'Se puoi studiare 60 minuti a settimana, quante settimane ti servono per il primo corso?',
  ],
} satisfies Record<string, readonly [string, string, string, string, string, string]>;

const positions: Record<Locale, number> = { en: 0, 'pt-BR': 1, es: 2, fr: 3, de: 4, it: 5 };

export function studyCopy(locale: Locale, key: keyof typeof copy) {
  return copy[key][positions[locale]];
}
