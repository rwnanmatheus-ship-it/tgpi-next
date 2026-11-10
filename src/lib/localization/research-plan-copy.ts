import { personalResearchPlan, type ResearchContext } from '../intelligence/core.ts';
import { localizeKnownLanguage } from './presentation-values.ts';

type Translate = (key: string, values?: Record<string, string | number>) => string;

export const researchGoalLabels: Record<string, string> = {
  learn: 'Expand my global knowledge', live: 'Live in another country', study: 'Study abroad',
  travel: 'Travel smarter', work: 'Work globally',
};
export const researchTimelineLabels: Record<string, string> = {
  now: 'Now', '3-months': 'Within 3 months', '6-months': 'Within 6 months',
  '12-months': 'Within 12 months', exploring: 'Still exploring',
};

const budgetLabels: Record<string, string> = {
  'under-1500': 'Up to US$1,500 / month', '1500-3000': 'US$1,500–3,000 / month',
  '3000-5000': 'US$3,000–5,000 / month', '5000-plus': 'Over US$5,000 / month',
};

/** Presentation-only copy: stored research answers, task IDs and links stay canonical. */
export function localizedPersonalResearchPlan(context: ResearchContext, country: string, t: Translate) {
  return personalResearchPlan(context, country).map(task => {
    const countryName = t(country);
    if (task.id === 'eligibility') {
      const activity = context.primaryGoal === 'work' ? 'work authorization'
        : context.primaryGoal === 'study' ? 'study authorization' : 'permitted activities';
      const key = ['now', '3-months'].includes(context.timeHorizon)
        ? 'Before committing to your near-term timeline, verify nationality-specific entry, residence and {activity} for {country}. TGPI does not determine eligibility.'
        : 'Verify nationality-specific entry, residence and {activity} for {country}. TGPI does not determine eligibility.';
      return { ...task, detail: t(key, { activity: t(activity), country: countryName }) };
    }
    if (task.id === 'budget') {
      const budget = context.budgetRange && context.budgetRange !== 'undecided'
        ? t('Your stated budget band is {band}.', { band: t(budgetLabels[context.budgetRange] ?? context.budgetRange) })
        : t('Set your monthly budget first.');
      return { ...task, detail: `${budget} ${t('Collect dated housing, insurance, transport and education quotes in one currency; include deposits and a contingency. National statistics cannot establish affordability.')}` };
    }
    if (task.id === 'pathway' && context.primaryGoal !== 'study') {
      const profession = context.profession.slice(0, 120);
      return { ...task, detail: profession
        ? t('For {profession}, verify qualifications recognition, any professional licensing and actual opportunities. A national unemployment rate is only background context.', { profession })
        : t('Verify qualifications recognition, any professional licensing and actual opportunities. A national unemployment rate is only background context.') };
    }
    if (task.id === 'learning') {
      const languages = context.languages.slice(0, 8);
      return { ...task, detail: languages.length
        ? t('Your stated languages: {languages}. Compare them with your chosen course, employer and official process. Practice source evaluation before drawing conclusions.', { languages: languages.map(language => localizeKnownLanguage(language, t)).join(', ') })
        : t('Record your language skills. Compare them with your chosen course, employer and official process. Practice source evaluation before drawing conclusions.') };
    }
    return { ...task, detail: t(task.detail) };
  });
}
