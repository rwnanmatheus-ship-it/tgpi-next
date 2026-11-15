import { isExpansionCourse } from './expansion/listing';
import { isSpecialization } from './specializations/listing';

export function isPremiumAcademyCourse(id: string) {
  return isExpansionCourse(id) || isSpecialization(id);
}
