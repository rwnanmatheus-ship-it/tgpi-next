import { getGlobalCountryPhotos } from "./global-photography";
import highResolutionCatalog from "./high-resolution-photography.json";

/** Documentary photography used in country profiles, the directory and presentation view. */
export type CountryPhoto = {
  src: string;
  location: string;
  alt: string;
  photographer: string;
  creditUrl: string;
  position: string;
};

const curatedPhotos: Readonly<Record<string, readonly CountryPhoto[]>> = {
  "australia": [
    {
      src: "/images/countries/photography/australia/sydney-harbour.webp",
      location: "Sydney Harbour",
      alt: "Ferries cross Sydney Harbour between the Opera House and the city skyline.",
      photographer: "Dan Freeman",
      creditUrl: "https://unsplash.com/photos/sydney-opera-house-during-daytime-7Zb7kUyQg1E",
      position: "14% 52%",
    },
    {
      src: "/images/countries/photography/australia/flinders-street.webp",
      location: "Melbourne",
      alt: "Pedestrians gather beneath the domed entrance of Flinders Street Station in Melbourne.",
      photographer: "ANGIE BAONGOC",
      creditUrl: "https://unsplash.com/photos/flinders-street-station-in-melbourne-cUef0oU_JeE",
      position: "50% 56%",
    },
    {
      src: "/images/countries/photography/australia/port-campbell.webp",
      location: "Port Campbell, Victoria",
      alt: "Pale limestone cliffs rise above the surf on the coast of Victoria.",
      photographer: "You Le",
      creditUrl: "https://unsplash.com/photos/coastal-cliffs-meet-the-vast-calm-ocean-cfLc_qKdWLM",
      position: "64% 55%",
    },
    {
      src: "/images/countries/photography/australia/heart-reef.webp",
      location: "Heart Reef, Queensland",
      alt: "Turquoise water surrounds the coral formations of the Great Barrier Reef.",
      photographer: "Queensland, Australia",
      creditUrl: "https://unsplash.com/photos/heart-reef-in-great-barrier-reef-wGvrsVP4TEw/",
      position: "55% 54%",
    },
  ],
  "portugal": [
    {
      src: "/images/countries/photography/portugal/lisboa.webp",
      location: "Lisboa",
      alt: "A yellow tram rounds a corner between Lisbon’s sunlit buildings.",
      photographer: "Aayush Gupta",
      creditUrl: "https://unsplash.com/photos/yellow-tram-in-historic-lisbon-street-ljhCEaHYWJ8",
      position: "48% 57%",
    },
    {
      src: "/images/countries/photography/portugal/porto.webp",
      location: "Porto",
      alt: "The Luís I Bridge crosses the Douro beside Porto’s red rooftops.",
      photographer: "Seric Burns",
      creditUrl: "https://unsplash.com/pt-br/fotografias/ponte-dom-luis-i-sobre-o-rio-douro-no-porto-PhZGy0XgKfY",
      position: "58% 55%",
    },
  ],
  "japan": [
    {
      src: "/images/countries/photography/japan/kawaguchiko.webp",
      location: "Kawaguchiko",
      alt: "Snow-capped Mount Fuji reflects in the still water of Lake Kawaguchi.",
      photographer: "Bryan Heng",
      creditUrl: "https://unsplash.com/photos/mount-fuji-reflecting-in-lake-kawaguchi-KAeQFByCzDs",
      position: "50% 57%",
    },
    {
      src: "/images/countries/photography/japan/kyoto.webp",
      location: "Kyoto",
      alt: "Yasaka Pagoda rises above the wooden buildings of a quiet Kyoto street.",
      photographer: "Filipe Freitas",
      creditUrl: "https://unsplash.com/photos/an-empty-street-with-a-pagoda-in-the-background-gIdyXL8VHEc",
      position: "55% 45%",
    },
  ],
  "canada": [
    {
      src: "/images/countries/photography/canada/moraine-lake.webp",
      location: "Moraine Lake, Alberta",
      alt: "Rocky peaks and evergreens frame the turquoise water of Moraine Lake.",
      photographer: "Elliott Stambler",
      creditUrl: "https://unsplash.com/photos/moraine-lake-and-rocky-mountain-peaks-n0PuNpAgdf0",
      position: "50% 50%",
    },
    {
      src: "/images/countries/photography/canada/toronto.webp",
      location: "Toronto",
      alt: "The CN Tower stands above Toronto’s skyline at sunset.",
      photographer: "Manas Kale",
      creditUrl: "https://unsplash.com/photos/toronto-skyline-with-cn-tower-UWkDiZkcD80",
      position: "54% 60%",
    },
  ],
  "brazil": [
    {
      src: "/images/countries/photography/brazil/guanabara.webp",
      location: "Rio de Janeiro",
      alt: "Sugarloaf Mountain rises across Guanabara Bay in Rio de Janeiro.",
      photographer: "Jonathan Borba",
      creditUrl: "https://unsplash.com/photos/sugarloaf-mountain-and-guanabara-bay-in-rio-de-janeiro-j_ibL7ytVBY",
      position: "46% 55%",
    },
    {
      src: "/images/countries/photography/brazil/sao-paulo.webp",
      location: "São Paulo",
      alt: "Office towers rise on either side of a São Paulo street.",
      photographer: "Patrick Duarte Silveira",
      creditUrl: "https://unsplash.com/photos/high-rise-buildings-TJMwism44Ck",
      position: "46% 55%",
    },
  ],
  "south-africa": [
    {
      src: "/images/countries/photography/south-africa/cape-town.webp",
      location: "Cape Town",
      alt: "Rocky slopes overlook Cape Town and Lion’s Head.",
      photographer: "Jo Round",
      creditUrl: "https://unsplash.com/photos/a-view-of-the-city-of-cape-town-from-the-top-of-a-mountain-uTQoSHg_nmc",
      position: "42% 45%",
    },
    {
      src: "/images/countries/photography/south-africa/muizenberg.webp",
      location: "Muizenberg",
      alt: "Brightly painted beach huts line the sand at Muizenberg.",
      photographer: "Arno Smit",
      creditUrl: "https://unsplash.com/photos/assorted-color-beach-houses-qY_yTu7YBT4",
      position: "35% 55%",
    },
  ],
  "france": [
    {
      src: "/images/countries/photography/france/paris.webp",
      location: "Paris",
      alt: "The Eiffel Tower stands beside the Seine in the evening light.",
      photographer: "Karwin Luo",
      creditUrl: "https://unsplash.com/photos/eiffel-tower-and-seine-river-at-sunset-pqmy90uUxuc",
      position: "43% 56%",
    },
    {
      src: "/images/countries/photography/france/lyon.webp",
      location: "Lyon",
      alt: "A bridge crosses the Saône between the waterfront buildings of Lyon.",
      photographer: "Thomas K",
      creditUrl: "https://unsplash.com/photos/cityscape-with-river-and-buildings-at-sunset-6iRECCTVv4g",
      position: "53% 55%",
    },
  ],
  "italy": [
    {
      src: "/images/countries/photography/italy/venezia.webp",
      location: "Venezia",
      alt: "Boats follow the Grand Canal past Venetian rooftops at sunset.",
      photographer: "Luca Bravo",
      creditUrl: "https://unsplash.com/photos/grand-canal-venice-Wt2ZI8FDPyI",
      position: "53% 48%",
    },
    {
      src: "/images/countries/photography/italy/milano.webp",
      location: "Milano",
      alt: "People cross Piazza del Duomo beneath the spires of Milan Cathedral.",
      photographer: "Diane Picchiottino",
      creditUrl: "https://unsplash.com/photos/people-walking-on-street-near-buildings-during-daytime-L4QYl7mxhwQ",
      position: "52% 58%",
    },
  ],
  "spain": [
    {
      src: "/images/countries/photography/spain/barcelona.webp",
      location: "Barcelona",
      alt: "An avenue stretches through the sunlit grid of Barcelona’s Eixample.",
      photographer: "Bogdan C Rogulin",
      creditUrl: "https://unsplash.com/photos/an-aerial-view-of-a-city-with-tall-buildings-Je97gGFJpp4",
      position: "51% 62%",
    },
    {
      src: "/images/countries/photography/spain/madrid.webp",
      location: "Madrid",
      alt: "Pedestrians gather beside the illuminated buildings of Madrid’s Gran Vía.",
      photographer: "Alex Quezada",
      creditUrl: "https://unsplash.com/photos/a-group-of-people-standing-in-front-of-a-tall-building-eVKD_A0jo3o",
      position: "49% 58%",
    },
  ],
  "germany": [
    {
      src: "/images/countries/photography/germany/hamburg.webp",
      location: "Hamburg",
      alt: "Illuminated brick warehouses line a canal in Hamburg’s Speicherstadt.",
      photographer: "Claudio Testa",
      creditUrl: "https://unsplash.com/photos/canal-between-buildings-during-nighttime-qpemSW6_1Z0",
      position: "48% 49%",
    },
    {
      src: "/images/countries/photography/germany/berlin.webp",
      location: "Berlin",
      alt: "Berlin’s television tower is silhouetted against the evening sky.",
      photographer: "Yana Ralko",
      creditUrl: "https://unsplash.com/photos/berlin-skyline-with-tv-tower-at-dusk-0rarcry1u78",
      position: "51% 62%",
    },
  ],
  "united-kingdom": [
    {
      src: "/images/countries/photography/united-kingdom/london.webp",
      location: "London",
      alt: "London’s skyline rises beyond a bridge over the Thames.",
      photographer: "Eduard Pretsi",
      creditUrl: "https://unsplash.com/photos/london-skyline-with-bridge-and-river-at-sunset-PUFgFo4PptI",
      position: "52% 51%",
    },
    {
      src: "/images/countries/photography/united-kingdom/edinburgh.webp",
      location: "Edinburgh",
      alt: "Calton Hill overlooks the rooftops and monuments of Edinburgh.",
      photographer: "Alessandro Santoro",
      creditUrl: "https://unsplash.com/photos/a-view-of-a-city-from-a-hill-YJUzTfL1JXw",
      position: "45% 53%",
    },
  ],
  "united-states": [
    {
      src: "/images/countries/photography/united-states/new-york.webp",
      location: "New York City",
      alt: "Brooklyn Bridge stretches across the East River toward Manhattan.",
      photographer: "Peter Beke",
      creditUrl: "https://unsplash.com/photos/brooklyn-bridge-and-manhattan-skyline-e1uXetzjgZI",
      position: "56% 54%",
    },
    {
      src: "/images/countries/photography/united-states/san-francisco.webp",
      location: "San Francisco",
      alt: "Fog curls around a red tower of the Golden Gate Bridge.",
      photographer: "Rita",
      creditUrl: "https://unsplash.com/photos/golden-gate-bridge-san-francisco-california-OtDMI0LYM2s",
      position: "49% 57%",
    },
  ],
  "israel": [
    {
      src: "/images/countries/photography/israel/tel-aviv.webp",
      location: "Tel Aviv",
      alt: "Breakwaters trace the Mediterranean shoreline beside Tel Aviv’s skyline.",
      photographer: "Shai Pal",
      creditUrl: "https://unsplash.com/photos/aerial-photo-of-city-KdrM-22BDCY",
      position: "46% 55%",
    },
    {
      src: "/images/countries/photography/israel/haifa.webp",
      location: "Haifa",
      alt: "Terraced gardens overlook the port of Haifa.",
      photographer: "George 🦅",
      creditUrl: "https://unsplash.com/photos/cityscape-overlooking-a-harbor-with-many-ships-9BgC9IkHN4M",
      position: "52% 53%",
    },
  ],
  "guatemala": [
    {
      src: "/images/countries/photography/guatemala/antigua.webp",
      location: "Antigua Guatemala",
      alt: "The Santa Catalina Arch spans a cobbled street in Antigua Guatemala.",
      photographer: "Manuel González Asturias, SJ",
      creditUrl: "https://unsplash.com/photos/people-walking-on-street-near-brown-concrete-building-during-daytime-Vq-NkZ42I24",
      position: "50% 56%",
    },
    {
      src: "/images/countries/photography/guatemala/atitlan.webp",
      location: "Lago de Atitlán",
      alt: "Small boats float on Lake Atitlán beneath a volcanic peak.",
      photographer: "Jose Figueroa",
      creditUrl: "https://unsplash.com/photos/boats-on-the-water-tgAv-tm-O8E",
      position: "52% 54%",
    },
  ],
  "ethiopia": [
    {
      src: "/images/countries/photography/ethiopia/simien.webp",
      location: "Simien Mountains",
      alt: "Green slopes descend into a deep valley in the Simien Mountains.",
      photographer: "BDU Fellowship VLM",
      creditUrl: "https://unsplash.com/photos/a-view-of-a-valley-with-mountains-in-the-background-UnqrHaKPPTI",
      position: "52% 52%",
    },
    {
      src: "/images/countries/photography/ethiopia/addis-ababa.webp",
      location: "Addis Ababa",
      alt: "Trees frame Saint George’s Cathedral in Addis Ababa.",
      photographer: "Moti Abebe",
      creditUrl: "https://unsplash.com/photos/a-building-with-trees-around-it-Hv1mf4NL9cI",
      position: "47% 52%",
    },
  ],
  "jamaica": [
    {
      src: "/images/countries/photography/jamaica/negril.webp",
      location: "Negril",
      alt: "Beach umbrellas line the clear waters of the Negril coast.",
      photographer: "Josh Eaton",
      creditUrl: "https://unsplash.com/photos/aerial-view-of-huts-at-the-shore-7z1TWaPlYoE",
      position: "48% 53%",
    },
    {
      src: "/images/countries/photography/jamaica/blue-mountains.webp",
      location: "Blue Mountains",
      alt: "Forested ridges stretch across Jamaica’s Blue Mountains.",
      photographer: "Yves Alarie",
      creditUrl: "https://unsplash.com/photos/green-mountain-under-blue-sky-BXk-N2fPLYo",
      position: "51% 53%",
    },
  ],
};

export function getCountryPhotos(slug: string): readonly CountryPhoto[] {
  const gallery = Object.hasOwn(curatedPhotos, slug) ? curatedPhotos[slug] : getGlobalCountryPhotos(slug);
  const catalog: Readonly<Record<string, { photo: CountryPhoto; replaces: readonly string[] }>> = highResolutionCatalog;
  const preferred = Object.hasOwn(catalog, slug) ? catalog[slug] : undefined;
  return preferred
    ? [preferred.photo, ...gallery.filter(photo => !preferred.replaces.includes(photo.src))]
    : gallery;
}
