import { courseCoverBadges } from '@/lib/cinematic-art';
import styles from './course-cover-badges.module.css';

const productTones: Readonly<Record<string, string>> = {
  Excel: 'spreadsheet',
  'Google Sheets': 'spreadsheet',
  'Power BI': 'analytics',
  Python: 'language',
};

export default function CourseCoverBadges({ courseId }: { courseId: string }) {
  const badges = courseCoverBadges(courseId);
  if (!badges) return null;

  return <div className={styles.badges} aria-hidden="true">
    {badges.map(label => (
      <span key={label} className={styles.badge} data-tone={productTones[label]}>
        <span className={styles.mark} />
        {label}
      </span>
    ))}
  </div>;
}
