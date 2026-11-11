import Link from 'next/link';
import type { AcademyCourse } from '@/lib/learning/academy/types';
import styles from './academy.module.css';

type Translate = (text: string) => string;

export default function AcademyJourney({ course, t }: { course: AcademyCourse; t: Translate }) {
  const foundations = course.lessons.filter(lesson => !lesson.project);
  const labs = course.lessons.filter(lesson => lesson.project);
  const steps = [
    ['Set your starting point', 'Choose a goal and a weekly study rhythm.'],
    ['Lessons and practice', 'Work through the lesson examples and check each skill.'],
    ...(labs.length ? [['Applied project', 'Build, test and hand over a result for the course scenario.']] : []),
    ['Practice portfolio', 'Organize your work and document what you changed.'],
    ['Final assessment', 'Pass the objective checks and a numerical case.'],
    ['Spaced review', 'Return at least 24 hours later to check what you retained.'],
    ['Certificate', 'Confirm your name and email for private issuance.'],
  ];

  return <section id="journey" className={styles.journey}>
    <div className={styles.journeyIntro}>
      <h2>{t('Your path to certification')}</h2>
      <p>{t('Preview each milestone before you start.')}</p>
    </div>
    <ol className={styles.journeySteps}>
      {steps.map(([title, description], index) => <li key={title}>
        <span className={styles.journeyNumber}>{index + 1}</span>
        <div><strong>{t(title)}</strong><p>{t(description)}</p>
          {title === 'Lessons and practice' && <small>{foundations.length} {t('lessons and laboratories')} · {foundations.reduce((total, lesson) => total + lesson.minutes, 0)} {t('min')}</small>}
          {title === 'Applied project' && <small>{labs.length} {t('lessons and laboratories')} · {labs.reduce((total, lesson) => total + lesson.minutes, 0)} {t('min')}</small>}
        </div>
      </li>)}
    </ol>
    {course.projectBrief && <div className={styles.journeyBrief}>
      <h3>{t('Applied project brief')}</h3>
      <p>{course.projectBrief}</p>
      <Link href={`/atlas?guide=learning&course=${course.id}`}>{t('Open Atlas AI')} <span aria-hidden="true">↗</span></Link>
    </div>}
  </section>;
}
