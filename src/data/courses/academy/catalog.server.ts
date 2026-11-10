import 'server-only';
import { courses } from '@/data/courses';
import { coursesOverview } from '@/data/courses-overview';
import { professionalCourseDrafts } from '@/data/courses/professional';
import { professionalWorkedLabs } from '@/data/courses/professional/worked-labs';
import { professionalQuestionBank } from '@/data/courses/professional/assessment-bank.server';
import { courseArtwork } from '@/lib/cinematic-art';
import type { AcademyCourse, AcademyLab, AcademyLesson, AcademyPrivateQuestion, CaseSpec } from '@/lib/learning/academy/types';
import { mobilityLabs } from './mobility';
import { workLabs } from './work';
import { technologyLabs } from './technology';
import { languageAndStrategyLabs } from './language-and-strategy';

export const ACADEMY_VERSION = '2026.11.1';
export const ACADEMY_REVIEW_DELAY_MS = 24 * 60 * 60 * 1000;
export const ACADEMY_PASS_SCORE = 80;
const labs = { ...mobilityLabs, ...workLabs, ...technologyLabs, ...languageAndStrategyLabs };
const plannedFoundations: Record<string, AcademyLab[]> = {
  'critical-thinking': technologyLabs['evidence-literacy'],
  'technology-future': technologyLabs['ai-workflow-foundations'],
  'global-economics': mobilityLabs['cost-of-living-lab'],
};
const courseMap = new Map<string, AcademyCourse>();
const banks = new Map<string, AcademyPrivateQuestion[]>();
const section = (title: string, body: string) => ({ title, body });
const references: Record<string, string[]> = {
  'python-automacao-profissionais': ['https://docs.python.org/3/library/csv.html', 'https://docs.python.org/3/library/unittest.html'],
  'analise-dados-power-bi-ia': ['https://learn.microsoft.com/en-us/power-bi/guidance/star-schema'],
  'planilhas-decisoes-profissionais': ['https://support.microsoft.com/excel'],
  'ciberseguranca-vida-trabalho': ['https://www.cisa.gov/secure-our-world'],
  'digital-safety-abroad': ['https://www.cisa.gov/secure-our-world'],
  'ia-trabalho-global': ['https://airc.nist.gov/airmf-resources/airmf/'],
  'ai-workflow-foundations': ['https://airc.nist.gov/airmf-resources/airmf/'],
  'global-economics': ['https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information'],
};
function labLesson(courseId: string, lab: AcademyLab, index: number, foundation: boolean, questions: AcademyPrivateQuestion[]): AcademyLesson {
  const id = `${courseId}-academy-${index + 1}`;
  lab.decisions.forEach(([prompt, correct, incorrect, alternative, explanation], q) => {
    questions.push({ id: `${id}-q${q + 1}`, lessonId: id, prompt, essential: q === 0,
      options: [correct, incorrect, alternative].map((label, n) => ({ id: `answer-${n}`, label })), correctOptionId: 'answer-0', explanation });
  });
  return { id, title: lab.title, objective: lab.practice, foundation, minutes: 60,
    sections: [section('Understand the method', lab.concept), section('Worked example', lab.example), section('Transfer to a new situation', lab.transfer)],
    practice: [lab.practice, 'Produce a first version without copying the example. Compare it with the method, identify a specific error and revise the result.', lab.transfer],
    deliverable: 'Save your result, the assumption you tested, one correction and one limit. Use fictional or redacted information.', references: references[courseId] ?? [] };
}
for (const [id, additions] of Object.entries(labs)) {
  const old = courses.find(c => c.id === id), pro = professionalCourseDrafts.find(c => c.id === id), overview = coursesOverview.find(c => c.id === id);
  const questions: AcademyPrivateQuestion[] = [];
  let base: AcademyLesson[] = [];
  if (old) base = old.modules.flatMap(m => m.lessons).map(lesson => {
    questions.push({ id: `${lesson.id}-checkpoint`, lessonId: lesson.id, prompt: lesson.checkpoint.prompt,
      options: lesson.checkpoint.options, correctOptionId: lesson.checkpoint.correctOptionId, explanation: lesson.checkpoint.explanation, essential: true });
    return { id: lesson.id, title: lesson.title, objective: lesson.objective, minutes: lesson.durationMinutes, foundation: true,
      sections: [section('Scenario', lesson.scenario), section('Core lesson', lesson.summary),
        ...lesson.dialogue.map(line => section(line.speaker, line.line)),
        ...lesson.keyPhrases.map(phrase => section(phrase.phrase, `${phrase.meaning}\n${phrase.example}`)),
        section('Common mistake', `${lesson.commonMistake.avoid}\n${lesson.commonMistake.reason}\n${lesson.commonMistake.useInstead}`),
        ...lesson.coachNotes.map(body => section('Practice guidance', body))],
      practice: [lesson.practiceTask.prompt, lesson.practiceTask.instruction], deliverable: lesson.practiceTask.title, references: [] };
  });
  if (pro) {
    const bank = professionalQuestionBank(id);
    base = pro.modules.flatMap(m => m.lessons).map((lesson, i) => {
      const q = bank[i];
      if (!q) throw new Error(`Missing foundation assessment: ${id}/${i}`);
      questions.push({ ...q, id: `${lesson.id}-checkpoint`, lessonId: lesson.id });
      return { id: lesson.id, title: lesson.title, objective: lesson.objective, foundation: true, minutes: 45,
        sections: [section('Core lesson', lesson.explanation), section('Worked example', lesson.workedExample), section('Applied laboratory', professionalWorkedLabs[id]?.[i] || lesson.workedExample),
          section('Success criteria', lesson.successCriteria.join('\n')), section('Common mistakes', lesson.commonErrors.join('\n')), section('Recovery practice', lesson.recovery)],
        practice: [lesson.guidedPractice, lesson.independentPractice], deliverable: lesson.objective, references: lesson.referenceUrls.length ? lesson.referenceUrls : references[id] ?? [] };
    });
  }
  if (!old && !pro) base = (plannedFoundations[id] ?? []).map((lab, i) => labLesson(id, lab, i, true, questions));
  const lessons = [...base, ...additions.map((lab, i) => labLesson(id, lab, i + (plannedFoundations[id]?.length ?? 0), false, questions))];
  if (!lessons.length || new Set(lessons.map(l => l.id)).size !== lessons.length) throw new Error(`Invalid academy lessons: ${id}`);
  const portfolioMinutes = 90, assessmentMinutes = 60;
  courseMap.set(id, { id, version: ACADEMY_VERSION, title: old?.title ?? pro?.title ?? overview?.title ?? id,
    description: old?.description ?? overview?.desc ?? pro?.outcomes.join(' ') ?? '', outcomes: old?.outcomes ?? pro?.outcomes ?? overview?.benefits ?? [],
    lessons, portfolioMinutes, assessmentMinutes, minutes: lessons.reduce((sum, l) => sum + l.minutes, 0) + portfolioMinutes + assessmentMinutes,
    language: pro ? 'pt-BR / en' : 'en', image: overview?.image ?? courseArtwork(id),
    ...(old ? { legacyHref: `/courses/${id}/lessons/${old.modules[0].lessons[0].id}` } : pro ? { legacyHref: `/courses/${id}/history` } : {}),
  });
  banks.set(id, questions);
}
export const academyCourses = [...courseMap.values()];
export function getAcademyCourse(id: string) { return courseMap.get(id === 'english-abroad' ? 'global-english-2026' : id); }
export function academyQuestions(id: string) { return banks.get(id) ?? []; }

/** Fresh numeric cases test application instead of trusting a browser-supplied score. */
export function academyCase(id: string): CaseSpec {
  const budget = { prompt: 'Fictional planning case: liquid funds are {a} units, committed setup costs are {b} units, and the monthly shortfall is {c} units. Excluding other risks, how many months does the remaining cash cover? Round to two decimal places.', operation: 'remaining', unit: 'months', explanation: 'Subtract committed costs from available cash, then divide by the monthly shortfall. This simplified estimate is not a guarantee.' } as const;
  const throughput = { prompt: 'Fictional workflow: the baseline takes {a} minutes. The revised workflow takes {b} minutes of preparation and {c} minutes of verification. How many minutes are saved per run? Round to two decimal places.', operation: 'remaining', unit: 'minutes', explanation: 'Compare the complete workflow with the baseline, including preparation and verification.' } as const;
  const percent = { prompt: 'Fictional evaluation: {a} cases were checked and {b} failed the defined criterion. What percentage failed? Round to two decimal places.', operation: 'percent', unit: '%', explanation: 'Divide failed cases by all checked cases and multiply by 100. A sample result does not guarantee future performance.' } as const;
  if (['country-fit','relocation-budget','housing-abroad','cost-of-living-lab','study-abroad-planning','global-economics','planilhas-decisoes-profissionais'].includes(id)) return budget;
  if (['ia-trabalho-global','ai-workflow-foundations','technology-future','remote-work-systems','python-automacao-profissionais'].includes(id)) return { ...throughput, operation: 'sum' };
  if (['global-english-2026','ingles-carreira-internacional'].includes(id)) return { prompt: 'Read the handover: “We have {a} tasks. {b} are complete and {c} are cancelled. Please report the number still open.” How many tasks remain open?', operation: 'sum', unit: 'tasks', explanation: 'Subtract the completed and cancelled tasks from the total. The language task asks for the remaining open items.' };
  return percent;
}
