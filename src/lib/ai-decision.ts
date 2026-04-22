import { countries } from "@/data/countries";

export function getBestCountries(profile: any) {
  return countries.filter((c) => {
    return (
      c.idealFor?.includes(profile.goal) &&
      c.costLevel === profile.budget
    );
  }).slice(0, 3);
}