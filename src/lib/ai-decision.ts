import { countries } from "@/data/countries";
import type { Country } from "@/types";
import type { GlobalProfile } from "@/lib/global-profile";

export function getBestCountries(profile: GlobalProfile | null): Country[] {
  const goal = profile?.goal;
  const budget = profile?.budget;

  if (!goal || !budget) return [];

  return countries
    .filter(
      (country) =>
        country.idealFor?.includes(goal) && country.costLevel === budget
    )
    .slice(0, 3);
}
