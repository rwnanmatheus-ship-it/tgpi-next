'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useState } from 'react';
import NavigationIcon from '@/components/navigation/NavigationIcon';
import { useLocale } from '@/components/localization/LocaleProvider';
import { countryLearningGoals, type CountryLearningGoal, type CountryLearningPathData } from '@/lib/country-learning';
import styles from './CountryLearningPath.module.css';

export default function CountryLearningPath({ countryName, path }: { countryName: string; path: CountryLearningPathData }) {
  const { t } = useLocale();
  const id = useId();
  const [goal, setGoal] = useState<CountryLearningGoal>('arrival');
  const [languageIndex, setLanguageIndex] = useState(0);
  const languageCode = path.languages[languageIndex]?.code ?? 'en';
  const plan = path.plans[goal];
  const courseIds = [plan.languageCourseIds[languageCode], ...plan.mobilityCourseIds].filter(Boolean);
  const courses = courseIds.flatMap(courseId => {
    const course = path.courses.find(item => item.id === courseId);
    return course ? [course] : [];
  });
  return <section id="country-learning" className={styles.section} aria-labelledby={`${id}-heading`}>
    <div className={styles.heading}>
      <div><p className={styles.eyebrow}><NavigationIcon name="book" width={16} height={16} />{t('TGPI Learning')} / {t('Languages & mobility')}</p>
        <h2 id={`${id}-heading`}>{t('Prepare for {country}.', { country: t(countryName) })}</h2>
        <p>{t('Connect your destination to practical language, arrival, career and study skills.')}</p>
      </div>
      <Link href={{ pathname: '/courses', query: { goal: 'global-mobility', target: languageCode } }} className={styles.catalogLink}>{t('Explore language courses')}<NavigationIcon name="book" width={16} height={16} /></Link>
    </div>
    <div className={styles.controls}>
      <div className={styles.goals} role="group" aria-label={t('Preparation goal')}>
        {countryLearningGoals.map(item => <button key={item.id} type="button" aria-pressed={goal === item.id} onClick={() => setGoal(item.id)}>{t(item.label)}</button>)}
      </div>
      {path.languages.length > 0 && <label className={styles.language}><span>{t('Practice language')}</span><select value={languageCode} onChange={event => {
        const nextIndex = path.languages.findIndex(item => item.code === event.target.value);
        if (nextIndex >= 0) setLanguageIndex(nextIndex);
      }}>
        {path.languages.map(item => <option key={item.code} value={item.code}>{t(item.name)} · {item.native}</option>)}
      </select></label>}
    </div>
    <p className={styles.matchNote}>{t(path.internationalComplement
      ? 'International English is a complementary skill here; it is not presented as the local language.'
      : 'Suggestions connect the country language record with available TGPI courses; confirm the language needed for your city, institution or employer.')}</p>
    <div className={styles.grid} aria-live="polite" aria-atomic="true">
      {courses.map(course => <Link key={course.id} href={course.href} className={styles.card}>
        <div className={styles.art}><Image src={course.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 45vw, 25vw" className={styles.image} /><span className={styles.access} data-premium={course.access === 'premium'}>{t(course.access === 'premium' ? 'Premium' : 'Free with account')}</span></div>
        <div className={styles.cardBody}><span className={styles.cardKicker}><NavigationIcon name={course.targetLanguage ? 'globe' : 'compass'} width={14} height={14} />{t(course.targetLanguage ? 'Language practice' : 'Mobility skills')}</span>
          <h3>{t(course.title)}</h3><p>{t(course.reason)}</p>
          <div className={styles.metadata}><span>{t(course.duration)}</span>{course.lessonCount && <span>{course.lessonCount} {t('lessons')}</span>}</div>
          <div className={styles.cardFooter}><span>{t(course.instructionLanguage === 'pt-BR' ? 'Instructions in Portuguese' : 'Instructions in English')}</span><NavigationIcon name="book" width={16} height={16} /></div>
        </div>
      </Link>)}
    </div>
    <div className={styles.footer}><NavigationIcon name="spark" width={16} height={16} /><p>{t('Choose a goal, practice the language and turn research into a preparation plan.')}</p><Link href="/courses?access=free_account">{t('Start with free courses')}</Link></div>
    {(languageCode === 'pt' || languageCode === 'ar') && <p className={styles.variantNote}>{t(languageCode === 'pt' ? 'The Portuguese laboratory uses Brazilian Portuguese. Local varieties may differ.' : 'The Arabic laboratory uses Modern Standard Arabic. Everyday spoken varieties may differ.')}</p>}
  </section>;
}
