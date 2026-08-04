import { countries } from "@/data/countries";
import type { Country } from "@/types";
import type { GlobalProfile } from "@/lib/global-profile";

export function getBestCountries(profile: GlobalProfile | null): Country[] {
  if (!profile) return [];

  return countries
    .filter((country) => {
      return (
        Boolean(profile.goal) &&
        country.idealFor?.includes(profile.goal) &&
        country.costLevel === profile.budget
      );
    })
    .slice(0, 3);
}
