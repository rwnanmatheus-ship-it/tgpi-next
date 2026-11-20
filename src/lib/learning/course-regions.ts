/** Regional context is a learning focus, never work authorization or a job guarantee. */
export const courseRegions = [
  ['north-america', 'North America'],
  ['asia', 'Asia'],
  ['south-america', 'South America'],
  ['africa', 'Africa'],
  ['oceania', 'Oceania'],
] as const;
export type CourseRegion = typeof courseRegions[number][0];
