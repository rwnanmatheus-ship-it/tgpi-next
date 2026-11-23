import type { CourseOverview } from '../types/course-overview';

/** Language suggestions use the existing country record, never an inferred visa requirement. */
const languageNames = [
  ['en', 'English', 'English'], ['es', 'Spanish', 'Español'], ['fr', 'French', 'Français'],
  ['de', 'German', 'Deutsch'], ['ja', 'Japanese', '日本語'], ['ko', 'Korean', '한국어'],
  ['zh', 'Mandarin Chinese', '普通话'], ['it', 'Italian', 'Italiano'], ['pt', 'Portuguese', 'Português'],
  ['ar', 'Arabic', 'العربية'], ['hi', 'Hindi', 'हिन्दी'], ['sw', 'Swahili', 'Kiswahili'],
  ['id', 'Indonesian', 'Bahasa Indonesia'], ['tr', 'Turkish', 'Türkçe'], ['ru', 'Russian', 'Русский'],
  ['nl', 'Dutch', 'Nederlands'], ['sv', 'Swedish', 'Svenska'], ['pl', 'Polish', 'Polski'],
  ['vi', 'Vietnamese', 'Tiếng Việt'], ['th', 'Thai', 'ภาษาไทย'],
] as const;

export type CountryLearningGoal = 'arrival' | 'work' | 'study';
export const countryLearningGoals: readonly { id: CountryLearningGoal; label: string; topic: string; mobility: readonly string[] }[] = [
  { id: 'arrival', label: 'Arrive & settle', topic: 'cidade-e-transporte', mobility: ['arrival-playbook', 'housing-abroad', 'relocation-budget'] },
  { id: 'work', label: 'Work & connect', topic: 'trabalho-e-equipe', mobility: ['international-career', 'career-networking', 'cross-cultural-confidence'] },
  { id: 'study', label: 'Study & adapt', topic: 'estudo-e-universidade', mobility: ['study-abroad-planning', 'evidence-literacy', 'cross-cultural-confidence'] },
];

export type CountryLearningCourse = Pick<CourseOverview, 'id' | 'title' | 'href' | 'image' | 'duration' | 'lessonCount'> & {
  access: 'premium' | 'free_account';
  instructionLanguage: 'en' | 'pt-BR';
  reason: string;
  targetLanguage?: string;
};
export type CountryLearningPathData = {
  languages: { code: string; name: string; native: string }[];
  internationalComplement: boolean;
  courses: CountryLearningCourse[];
  plans: Record<CountryLearningGoal, { languageCourseIds: Record<string, string>; mobilityCourseIds: string[] }>;
};

export function countryLearningLanguageCodes(language: string): string[] {
  const words = language.toLowerCase().replace(/[^a-z]+/g, ' ').split(' ').filter(Boolean);
  return languageNames.flatMap(([code, name]) => {
    const position = words.indexOf(name.split(' ')[0].toLowerCase());
    const index = position < 0 && code === 'zh' ? words.indexOf('chinese') : position;
    return index < 0 ? [] : [{ code, index }];
  }).sort((a, b) => a.index - b.index).map(({ code }) => code);
}

/** Only published catalog entries with a canonical lesson route may enter a learning path. */
export function createCountryLearningPath(language: string, catalog: readonly CourseOverview[]): CountryLearningPathData {
  const available = new Map(catalog.filter(course => course.status === 'available'
    && course.href === `/courses/${course.id}`
    && course.learningPolicy?.publicationStatus === 'published').map(course => [course.id, course]));
  const matchedCodes = countryLearningLanguageCodes(language)
    .filter(code => available.has(`idiomas-${code}-cidade-e-transporte`));
  const internationalComplement = matchedCodes.length === 0;
  const codes = internationalComplement ? ['en'] : matchedCodes;
  const languages = codes.flatMap(code => {
    const definition = languageNames.find(([value]) => value === code);
    return definition ? [{ code, name: definition[1], native: definition[2] }] : [];
  });
  const selected = new Map<string, CountryLearningCourse>();
  function add(id: string, reason: string): string | undefined {
    const course = available.get(id);
    if (!course) return;
    selected.set(id, {
      id: course.id, title: course.title, href: course.href, image: course.image, duration: course.duration,
      lessonCount: course.lessonCount, targetLanguage: course.targetLanguage,
      access: course.learningPolicy!.accessPolicy, instructionLanguage: course.learningPolicy!.instructionLanguage,
      reason,
    });
    return id;
  }
  const plans = Object.fromEntries(countryLearningGoals.map(goal => {
    const languageCourseIds = Object.fromEntries(codes.flatMap(code => {
      const id = add(`idiomas-${code}-${goal.topic}`, 'Practice the language in a real situation.');
      return id ? [[code, id]] : [];
    }));
    const mobilityCourseIds = goal.mobility.flatMap(id => {
      const added = add(id, 'Build the practical skills behind your next move.');
      return added ? [added] : [];
    });
    return [goal.id, { languageCourseIds, mobilityCourseIds }];
  })) as CountryLearningPathData['plans'];
  return { languages, internationalComplement, courses: [...selected.values()], plans };
}
