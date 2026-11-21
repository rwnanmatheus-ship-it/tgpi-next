import type { Locale } from './config';
type Row = readonly [string,string,string,string,string,string];
const rows: Record<string,Row> = {
  'Language laboratory':['Language laboratory','Laboratório de idiomas','Laboratorio de idiomas','Laboratoire de langues','Sprachlabor','Laboratorio linguistico'],
  'Practice mode':['Practice mode','Tipo de prática','Tipo de práctica','Mode de pratique','Übungsmodus','Modalità di pratica'],
  'Read and understand':['Read and understand','Ler e compreender','Leer y comprender','Lire et comprendre','Lesen und verstehen','Leggere e comprendere'],
  'Recall without notes':['Recall without notes','Recordar sem consulta','Recordar sin consultar','Se rappeler sans notes','Ohne Notizen abrufen','Ricordare senza appunti'],
  'Listen without reading':['Listen without reading','Escutar sem leitura','Escuchar sin leer','Écouter sans lire','Ohne Mitlesen hören','Ascoltare senza leggere'],
  'How would you express this?':['How would you express this?','Como comunicar esta intenção?','¿Cómo expresarías esta intención?','Comment exprimer cette intention ?','Wie würdest du dies ausdrücken?','Come esprimeresti questa intenzione?'],
  'Listen before revealing the meaning.':['Listen before revealing the meaning.','Escute e identifique o sentido antes de revelar.','Escucha e identifica el sentido antes de mostrarlo.','Écoutez et identifiez le sens avant de le révéler.','Höre zuerst zu und erkenne die Bedeutung.','Ascolta e identifica il significato prima di mostrarlo.'],
  'Stop audio':['Stop audio','Parar áudio','Detener audio','Arrêter l’audio','Audio stoppen','Ferma audio'],
  'Listen to item':['Listen to item','Ouvir item','Escuchar elemento','Écouter l’élément','Eintrag anhören','Ascolta elemento'],
  'Speed':['Speed','Velocidade','Velocidad','Vitesse','Geschwindigkeit','Velocità'],
  'Slow':['Slow','Lenta','Lenta','Lente','Langsam','Lenta'],
  'Moderate':['Moderate','Moderada','Moderada','Modérée','Mittel','Moderata'],
  'Natural':['Natural','Natural','Natural','Naturelle','Natürlich','Naturale'],
  'Hide answer':['Hide answer','Ocultar resposta','Ocultar respuesta','Masquer la réponse','Antwort ausblenden','Nascondi risposta'],
  'Reveal and check':['Reveal and check','Revelar e conferir','Mostrar y comprobar','Révéler et vérifier','Anzeigen und prüfen','Mostra e verifica'],
  'Previous item':['Previous item','Item anterior','Elemento anterior','Élément précédent','Vorheriger Eintrag','Elemento precedente'],
  'Practiced · next':['Practiced · next','Pratiquei · próximo','Practicado · siguiente','Pratiqué · suivant','Geübt · weiter','Praticato · avanti'],
  'Vary order':['Vary order','Variar a ordem','Variar el orden','Changer l’ordre','Reihenfolge variieren','Varia ordine'],
  'No local voice':['No compatible local voice was found. Reading and recall remain available; consult the lesson pronunciation reference.','Voz local compatível não encontrada. Leitura e recuperação continuam disponíveis; consulte a referência de pronúncia da aula.','No se encontró una voz local compatible. Puedes leer y recordar; consulta la referencia de pronunciación de la lección.','Aucune voix locale compatible. La lecture et le rappel restent disponibles ; consultez la référence de prononciation.','Keine passende lokale Stimme gefunden. Lesen und Abrufen bleiben verfügbar; nutze die Aussprachequelle der Lektion.','Nessuna voce locale compatibile. Lettura e richiamo restano disponibili; consulta il riferimento di pronuncia della lezione.'],
  'Playback failed':['Playback did not finish. Try again or continue without audio.','A reprodução não foi concluída. Tente novamente ou continue sem áudio.','La reproducción no terminó. Inténtalo de nuevo o continúa sin audio.','La lecture audio ne s’est pas terminée. Réessayez ou continuez sans audio.','Die Wiedergabe wurde nicht abgeschlossen. Versuche es erneut oder fahre ohne Audio fort.','La riproduzione non è terminata. Riprova o continua senza audio.'],
  'Session practice status':['{done} of {total} items marked this session. Self-assessed practice; it does not change grades or complete lessons.','{done} de {total} itens marcados nesta sessão. Autoavaliação de prática; não altera a nota ou conclui a aula.','{done} de {total} elementos marcados en esta sesión. Práctica autoevaluada; no cambia la nota ni completa lecciones.','{done} sur {total} éléments marqués cette session. Autoévaluation ; ne modifie pas la note et ne valide pas la leçon.','{done} von {total} Einträgen in dieser Sitzung markiert. Selbsteinschätzung; ändert keine Note und schließt keine Lektion ab.','{done} di {total} elementi segnati in questa sessione. Autovalutazione; non modifica il voto né completa la lezione.'],
  'Device speech scope':['Speech is synthesized by a local device voice. It is not a teacher recording or a pronunciation assessment. Repeat in chunks, compare with the text and save a correction in your lesson evidence.','Áudio sintetizado por voz local do dispositivo. Não é gravação de professor nem avaliação de pronúncia. Repita por blocos, compare com o texto e salve uma correção nas evidências da aula.','Audio sintetizado con una voz local del dispositivo. No es una grabación docente ni una evaluación de pronunciación. Repite por bloques, compara con el texto y guarda una corrección.','Audio de synthèse par une voix locale. Ce n’est ni un enregistrement de professeur ni une évaluation de prononciation. Répétez par groupes, comparez au texte et conservez une correction.','Sprachausgabe mit lokaler Gerätestimme. Keine Lehrkraftaufnahme oder Aussprachebewertung. Wiederhole in Abschnitten, vergleiche mit dem Text und speichere eine Korrektur.','Audio sintetizzato con una voce locale. Non è una registrazione docente né una valutazione della pronuncia. Ripeti per blocchi, confronta con il testo e salva una correzione.'],
  'Language to learn':['Language to learn','Idioma que quero aprender','Idioma que quiero aprender','Langue à apprendre','Gewünschte Lernsprache','Lingua da imparare'],
  'All courses':['All courses','Todos os cursos','Todos los cursos','Tous les cours','Alle Kurse','Tutti i corsi'],
  'Language laboratories':['Language laboratories','Laboratórios de idiomas','Laboratorios de idiomas','Laboratoires de langues','Sprachlabore','Laboratori linguistici'],
  'Instruction in Portuguese':['Instruction in Portuguese','Instruções em português','Instrucciones en portugués','Consignes en portugais','Anleitung auf Portugiesisch','Istruzioni in portoghese'],
};
const keys:Locale[]=['en','pt-BR','es','fr','de','it'];
export const languageLabMessages=Object.fromEntries(Object.entries(rows).map(([key,values])=>[key,Object.fromEntries(keys.map((locale,index)=>[locale,values[index]])) as Record<Locale,string>]));
export function languageLabCopy(locale:Locale,key:string,values:Record<string,string|number>={}) {
  const text=languageLabMessages[key]?.[locale]??key;
  return text.replace(/\{(\w+)\}/g,(placeholder,name:string)=>String(values[name]??placeholder));
}
