export const SATELLITE_LAYERS = {
  viirs: { id: "VIIRS_SNPP_CorrectedReflectance_TrueColor", label: "Suomi NPP / VIIRS", resolution: "250–500 m imagery" },
  terra: { id: "MODIS_Terra_CorrectedReflectance_TrueColor", label: "Terra / MODIS", resolution: "250 m imagery" },
} as const;
export type SatelliteSensor = keyof typeof SATELLITE_LAYERS;
export type SatelliteCatalog = { checkedAt: string; layers: Record<SatelliteSensor, { latest: string; earliest: string }> };
export const GIBS_CAPABILITIES = "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/1.0.0/WMTSCapabilities.xml";
export function isSatelliteDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
export function parseSatelliteCatalog(xml: string, checkedAt = new Date().toISOString()): SatelliteCatalog {
  const layers = {} as SatelliteCatalog["layers"];
  for (const sensor of Object.keys(SATELLITE_LAYERS) as SatelliteSensor[]) {
    const block = xml.split(/<Layer[\s>]/).find(part => part.includes(`<ows:Identifier>${SATELLITE_LAYERS[sensor].id}</ows:Identifier>`))?.split("</Layer>")[0];
    const latest = block?.match(/<Default>(\d{4}-\d{2}-\d{2})<\/Default>/)?.[1];
    const earliest = block?.match(/<Value>(\d{4}-\d{2}-\d{2})/)?.[1];
    if (!latest || !earliest || !isSatelliteDate(latest) || !isSatelliteDate(earliest) || latest < earliest) throw new Error("NASA layer dates could not be verified.");
    layers[sensor] = { latest, earliest };
  }
  return { checkedAt, layers };
}
export function satelliteTileUrl(sensor: SatelliteSensor, date: string) {
  if (!isSatelliteDate(date)) throw new Error("Invalid observation date");
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${SATELLITE_LAYERS[sensor].id}/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpeg`;
}
export const BASEMAP_URL = "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg";
