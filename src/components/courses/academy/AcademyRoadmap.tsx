import type { AcademyCourse, AcademyRecord } from '@/lib/learning/academy/types';
import AcademyIcon from './AcademyIcon';
import styles from './academy.module.css';

export default function AcademyRoadmap({ course, record, selected, onSelect, disabled, t }: {
  course: AcademyCourse; record: AcademyRecord; selected: string; onSelect: (id: string) => void; disabled: boolean; t: (key: string) => string;
}) {
  const foundations = course.lessons.filter(lesson => !lesson.project);
  const projects = course.lessons.filter(lesson => lesson.project);
  const group = (lessons: AcademyCourse['lessons'], title: string) => ({ title,
    target: lessons.find(lesson => !record.completed[lesson.id])?.id ?? lessons[0].id,
    complete: lessons.every(lesson => record.completed[lesson.id]), active: lessons.some(lesson => lesson.id === selected),
    detail: `${lessons.filter(lesson => record.completed[lesson.id]).length}/${lessons.length}`,
  });
  const steps = [group(foundations, 'Lessons and practice'), ...(projects.length ? [group(projects, 'Applied project')] : []),
    { title: 'Practice portfolio', target: 'portfolio', complete: record.portfolio.trim().length >= 200, active: selected === 'portfolio', detail: '' },
    { title: 'Final assessment', target: 'final', complete: Boolean(record.final), active: selected === 'final', detail: record.final ? `${record.final.score}%` : '80%' },
    { title: 'Spaced review', target: 'retention', complete: Boolean(record.retention), active: selected === 'retention', detail: record.retention ? `${record.retention.score}%` : '24h' },
  ];
  return <nav id="studio-roadmap" className={styles.roadmap} aria-label={t('Learning milestones')}>
    {steps.map((step, index) => <button key={step.title} className={styles.roadmapStep} type="button" data-complete={step.complete} aria-current={step.active ? 'step' : undefined} onClick={() => onSelect(step.target)} disabled={disabled}>
      <span className={styles.roadmapNumber}>{step.complete ? <AcademyIcon name="check" size={18} /> : String(index + 1).padStart(2, '0')}</span>
      <span><strong>{t(step.title)}</strong><small>{step.complete ? t('Completed step') : t(step.active ? 'Current step' : 'Explore step')}{step.detail ? ` · ${step.detail}` : ''}</small></span><AcademyIcon name="arrow" size={16} />
    </button>)}
  </nav>;
}
