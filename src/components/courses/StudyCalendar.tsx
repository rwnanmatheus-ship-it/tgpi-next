'use client';

import { sendClientFunnelEvent } from "@/lib/funnel.client";
import { useState, type FormEvent } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import { nextStudyEvening, studyCalendar, studyDurations, studySessionCounts } from '@/lib/learning/study-calendar';
import type { Locale } from '@/lib/localization/config';

type Labels = { heading: string; start: string; length: string; count: string; submit: string; help: string; invalid: string; ready: string };
const messages: Record<Locale, Labels> = {
  en: { heading: 'Schedule study time', start: 'First session (local time)', length: 'Minutes per session', count: 'Number of weekly sessions', submit: 'Download study calendar', help: 'Import the file into your calendar. Each session includes a course link and a 10-minute reminder.', invalid: 'Choose a valid future date and time.', ready: 'Your calendar file is ready to import.' },
  'pt-BR': { heading: 'Agendar horário de estudo', start: 'Primeira sessão (hora local)', length: 'Minutos por sessão', count: 'Número de sessões semanais', submit: 'Baixar agenda de estudos', help: 'Importe o arquivo no seu calendário. Cada sessão inclui o link do curso e um lembrete 10 minutos antes.', invalid: 'Escolha uma data e hora futuras válidas.', ready: 'Sua agenda de estudos está pronta para importar.' },
  es: { heading: 'Programar sesiones de estudio', start: 'Primera sesión (hora local)', length: 'Minutos por sesión', count: 'Número de sesiones semanales', submit: 'Descargar calendario de estudio', help: 'Importa el archivo en tu calendario. Cada sesión incluye el enlace al curso y un aviso 10 minutos antes.', invalid: 'Elige una fecha y hora futuras válidas.', ready: 'El calendario está listo para importar.' },
  fr: { heading: 'Planifier des séances d’étude', start: 'Première séance (heure locale)', length: 'Minutes par séance', count: 'Nombre de séances hebdomadaires', submit: 'Télécharger le calendrier d’étude', help: 'Importez le fichier dans votre calendrier. Chaque séance contient le lien du cours et un rappel 10 minutes avant.', invalid: 'Choisissez une date et une heure futures valides.', ready: 'Votre calendrier est prêt à être importé.' },
  de: { heading: 'Lernzeiten planen', start: 'Erste Lerneinheit (Ortszeit)', length: 'Minuten pro Lerneinheit', count: 'Anzahl der wöchentlichen Lerneinheiten', submit: 'Lernkalender herunterladen', help: 'Importiere die Datei in deinen Kalender. Jeder Termin enthält den Kurslink und eine Erinnerung 10 Minuten vor Beginn.', invalid: 'Wähle ein gültiges Datum und eine Uhrzeit in der Zukunft.', ready: 'Dein Kalender ist bereit zum Import.' },
  it: { heading: 'Programma le sessioni di studio', start: 'Prima sessione (ora locale)', length: 'Minuti per sessione', count: 'Numero di sessioni settimanali', submit: 'Scarica il calendario di studio', help: 'Importa il file nel tuo calendario. Ogni sessione include il link al corso e un promemoria 10 minuti prima.', invalid: 'Scegli una data e un orario validi nel futuro.', ready: 'Il calendario è pronto per essere importato.' },
};

export default function StudyCalendar({ courseId, title }: { courseId: string; title: string }) {
  const { locale } = useLocale();
  const labels = messages[locale];
  const [start, setStart] = useState('');
  const [minutes, setMinutes] = useState(30);
  const [sessions, setSessions] = useState(4);
  const [downloadState, setDownloadState] = useState<'ready' | 'invalid' | null>(null);

  function download(event: FormEvent) {
    event.preventDefault();
    const calendar = studyCalendar({ courseId, title, localStart: start, minutes, sessions });
    if (!calendar) { setDownloadState('invalid'); return; }
    const url = URL.createObjectURL(new Blob([calendar], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `tgpi-${courseId}.ics`;
    document.body.append(link);
    link.click();
    sendClientFunnelEvent("study_calendar_export_requested");
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloadState('ready');
  }

  const control = 'mt-1 block min-h-11 w-full rounded-lg border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] px-3 py-2 text-base text-[var(--tgpi-ink)]';
  return <details className="my-5 rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] px-5 text-[var(--tgpi-ink)]"
    onToggle={event => { if (event.currentTarget.open && !start) setStart(nextStudyEvening()); }}>
    <summary className="cursor-pointer py-4 font-semibold">{labels.heading}</summary>
    <form onSubmit={download} onChange={() => setDownloadState(null)} className="pb-5">
      <p className="mb-4 max-w-2xl text-sm">{labels.help}</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="min-w-0 text-sm font-semibold">{labels.start}<input type="datetime-local" required value={start} onChange={event => setStart(event.target.value)} className={control} /></label>
        <label className="text-sm font-semibold">{labels.length}<select value={minutes} onChange={event => setMinutes(Number(event.target.value))} className={control}>{studyDurations.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
        <label className="text-sm font-semibold">{labels.count}<select value={sessions} onChange={event => setSessions(Number(event.target.value))} className={control}>{studySessionCounts.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
      </div>
      <button type="submit" className="mt-4 min-h-11 rounded-lg bg-[var(--tgpi-navy)] px-4 py-2 font-semibold text-white">{labels.submit}</button>
      <p role="status" className="mt-2 text-sm">{downloadState && labels[downloadState]}</p>
    </form>
  </details>;
}
