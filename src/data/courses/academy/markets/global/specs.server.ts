import 'server-only';
import type { GlobalCourseSpec } from './types';
import { north_americaSpecs } from './north-america.server';
import { asiaSpecs } from './asia.server';
import { south_americaSpecs } from './south-america.server';
import { africaSpecs } from './africa.server';
import { oceaniaSpecs } from './oceania.server';

export const globalSpecs: readonly GlobalCourseSpec[] = [
  ...north_americaSpecs,
  ...asiaSpecs,
  ...south_americaSpecs,
  ...africaSpecs,
  ...oceaniaSpecs,
];
