export const professionalAreas = [
  ['ai', 'Artificial intelligence operations'],
  ['cyber', 'Cybersecurity operations'],
  ['data', 'Data and research'],
  ['energy', 'Energy and resources'],
  ['care', 'Digital health administration'],
  ['industry', 'Industry and construction'],
  ['logistics', 'Logistics and traceability'],
  ['quality', 'Quality and scientific documentation'],
  ['business', 'Specialist business services'],
  ['content', 'Content, culture and accessibility'],
] as const;

export type ProfessionalArea = typeof professionalAreas[number][0];
