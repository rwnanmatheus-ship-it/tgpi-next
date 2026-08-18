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
    viewport: [5, 35, 410, 285],
  },
  {
    id: "south-america",
    label: "South America",
    sourceRegions: ["South America"],
    viewport: [245, 230, 215, 265],
  },
  {
    id: "europe",
    label: "Europe",
    sourceRegions: ["Europe", "Europe / Asia"],
    viewport: [445, 90, 205, 160],
  },
  {
    id: "africa",
    label: "Africa",
    sourceRegions: ["Africa", "Africa / Middle East"],
    viewport: [430, 180, 245, 280],
  },
  {
    id: "asia",
    label: "Asia",
    sourceRegions: ["Asia", "Asia / Europe"],
    viewport: [555, 45, 420, 300],
  },
  {
    id: "oceania",
    label: "Oceania",
    sourceRegions: ["Oceania"],
    viewport: [690, 220, 470, 250],
  },
] as const;

export function getCountryMapRegionId(sourceRegion: string): CountryMapRegionId {
  const region = COUNTRY_MAP_REGIONS.find(
    (candidate) =>
      candidate.id !== "world" && candidate.sourceRegions.includes(sourceRegion),
  );

  return region?.id ?? "world";
}
