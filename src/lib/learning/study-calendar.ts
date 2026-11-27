import { escapeCalendarText, foldCalendarLine } from '../icalendar.ts';

export const studyDurations = [15, 30, 45, 60, 90] as const;
export const studySessionCounts = [1, 4, 8] as const;

type StudySchedule = {
  courseId: string;
  title: string;
  localStart: string;
  minutes: number;
  sessions: number;
};

function localMinute(date: Date) {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function nextStudyEvening(now = new Date()) {
  const evening = new Date(now);
  evening.setDate(evening.getDate() + 1);
  evening.setHours(19, 0, 0, 0);
  return localMinute(evening);
}

/** Floating calendar time repeats at the chosen local hour across DST changes. */
export function studyCalendar(schedule: StudySchedule, now = new Date()): string | null {
  const { courseId, title, localStart, minutes, sessions } = schedule;
  if (!/^[a-z0-9][a-z0-9-]*$/.test(courseId) || !title.trim()) return null;
  if (!studyDurations.some(value => value === minutes) || !studySessionCounts.some(value => value === sessions)) return null;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(localStart)) return null;
  const start = new Date(localStart);
  if (!Number.isFinite(start.getTime()) || localMinute(start) !== localStart || start <= now) return null;
  const timestamp = now.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const floating = localStart.replace(/[-:]/g, '') + '00';
  const url = `https://www.theglobalpolymath.com/courses/${courseId}`;
  const summary = escapeCalendarText(`TGPI · ${title.trim()}`);
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TGPI//Study Calendar//EN', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT', `UID:study-${courseId}-${floating}@theglobalpolymath.com`, `DTSTAMP:${timestamp}`,
    `DTSTART:${floating}`, `DURATION:PT${minutes}M`, `SUMMARY:${summary}`, `URL:${url}`, `DESCRIPTION:${url}`,
    ...(sessions > 1 ? [`RRULE:FREQ=WEEKLY;COUNT=${sessions}`] : []),
    'BEGIN:VALARM', 'TRIGGER:-PT10M', 'ACTION:DISPLAY', `DESCRIPTION:${summary}`, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR', '',
  ];
  return lines.map(foldCalendarLine).join('\r\n');
}
