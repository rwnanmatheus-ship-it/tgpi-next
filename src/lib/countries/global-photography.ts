import type { CountryPhoto } from './editorial-photography';
import catalog from './global-photography.json';

type FieldPhoto = { id: string; place: string; author: string };
const fieldPhotos: Readonly<Record<string, readonly FieldPhoto[]>> = catalog;
const basePath = '/images/countries/field-photography';

export function getGlobalCountryPhotos(slug: string): readonly CountryPhoto[] {
  if (!Object.hasOwn(fieldPhotos, slug)) return [];
  return fieldPhotos[slug].map(({ id, place, author }) => ({
    src: `${basePath}/${slug}-${id}.webp`,
    location: place,
    alt: place,
    photographer: author,
    creditUrl: `${basePath}/credits.html#${slug}-${id}`,
    position: '50% 50%',
  }));
}
