export type CountryMapRegionId =
  | "world"
  | "north-america"
  | "south-america"
  | "europe"
  | "africa"
  | "asia"
  | "oceania";

export type CountryMapRegion = {
  id: CountryMapRegionId;
  label: string;
  sourceRegions: readonly string[];
  viewport: readonly [x: number, y: number, width: number, height: number];
};

export const COUNTRY_MAP_REGIONS: readonly CountryMapRegion[] = [
  {
    id: "world",
    label: "World",
    sourceRegions: [],
    viewport: [0, 0, 1000, 500],
  },
  {
    id: "north-america",
    label: "North America",
    sourceRegions: ["North America"],
    viewport: [20, 15, 440, 220],
  },
  {
    id: "south-america",
    label: "South America",
    sourceRegions: ["South America"],
    viewport: [260, 205, 185, 210],
  },
  {
    id: "europe",
    label: "Europe",
    sourceRegions: ["Europe", "Europe / Asia"],
    viewport: [430, 50, 220, 110],
  },
  {
    id: "africa",
    label: "Africa",
    sourceRegions: ["Africa", "Africa / Middle East"],
    viewport: [440, 140, 230, 225],
  },
  {
    id: "asia",
    label: "Asia",
    sourceRegions: ["Asia", "Asia / Europe"],
    viewport: [555, 40, 445, 235],
  },
  {
    id: "oceania",
    label: "Oceania",
    sourceRegions: ["Oceania"],
    viewport: [795, 180, 340, 220],
  },
] as const;

export function getCountryMapRegionId(sourceRegion: string): CountryMapRegionId {
  const region = COUNTRY_MAP_REGIONS.find(
    (candidate) =>
      candidate.id !== "world" && candidate.sourceRegions.includes(sourceRegion),
  );

  return region?.id ?? "world";
}
