export type MobileCountry = {
  slug: string;
  name: string;
  capital: string;
  region: string;
  emoji: string;
};

export const MOBILE_MAX_WIDTH = 767;

export function normalizeMobileSearch(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function searchMobileCountries(countries: readonly MobileCountry[], query: string): MobileCountry[] {
  const search = normalizeMobileSearch(query);
  if (!search) return [];
  const words = search.split(/\s+/);
  return countries
    .map((country) => {
      const name = normalizeMobileSearch(country.name);
      const capital = normalizeMobileSearch(country.capital);
      const text = normalizeMobileSearch(`${country.name} ${country.capital} ${country.region} ${country.slug.replaceAll("-", " ")}`);
      const score = name === search ? 100 : capital === search ? 90 : name.startsWith(search) ? 80 : words.every((word) => text.includes(word)) ? 50 : 0;
      return { country, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.country.name.localeCompare(b.country.name))
    .slice(0, 12)
    .map(({ country }) => country);
}

export function isMobileRouteActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/profile") return ["/profile", "/dashboard", "/onboarding"].some((route) => pathname === route || pathname.startsWith(`${route}/`));
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isFocusedMobileRoute(pathname: string): boolean {
  return /^\/(?:sign-in|sign-up|login|upgrade|upgrade-success)(?:\/|$)/.test(pathname) || pathname.includes("/lessons/");
}
