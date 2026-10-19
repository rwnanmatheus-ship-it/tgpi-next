// Curated suggestions, not an exhaustive city registry. Custom cities remain supported.
export const citySuggestions: Record<string, readonly string[]> = {
  brazil: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte", "Curitiba", "Florianópolis", "Porto Alegre", "Recife", "Salvador", "Fortaleza", "Manaus", "Belém", "Goiânia", "Campinas", "Santos", "Vitória", "Natal", "João Pessoa"],
  portugal: ["Lisbon", "Porto", "Braga", "Coimbra", "Faro", "Aveiro", "Funchal", "Setúbal"],
  spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Málaga", "Bilbao", "Alicante"],
  france: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Bordeaux", "Lille"],
  germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", "Düsseldorf"],
  italy: ["Rome", "Milan", "Florence", "Turin", "Bologna", "Naples", "Venice"],
  "united-states": ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "Boston", "San Francisco", "Seattle", "Austin", "Orlando", "San Diego", "Washington, D.C."],
  canada: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary", "Edmonton", "Quebec City", "Winnipeg"],
  "united-kingdom": ["London", "Manchester", "Edinburgh", "Birmingham", "Bristol", "Liverpool", "Glasgow"],
  ireland: ["Dublin", "Cork", "Galway", "Limerick"],
  australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra"],
  "new-zealand": ["Auckland", "Wellington", "Christchurch", "Hamilton"],
  japan: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Fukuoka", "Nagoya"],
  china: ["Beijing", "Shanghai", "Shenzhen", "Guangzhou", "Chengdu", "Hangzhou"],
  "south-korea": ["Seoul", "Busan", "Incheon", "Daegu"],
  singapore: ["Singapore"],
  "united-arab-emirates": ["Dubai", "Abu Dhabi", "Sharjah"],
  netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
  switzerland: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"],
  sweden: ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
  norway: ["Oslo", "Bergen", "Trondheim", "Stavanger"],
  denmark: ["Copenhagen", "Aarhus", "Odense", "Aalborg"],
  finland: ["Helsinki", "Tampere", "Turku", "Oulu"],
  austria: ["Vienna", "Graz", "Salzburg", "Innsbruck"],
  belgium: ["Brussels", "Antwerp", "Ghent", "Bruges"],
  poland: ["Warsaw", "Kraków", "Wrocław", "Gdańsk"],
  mexico: ["Mexico City", "Guadalajara", "Monterrey", "Cancún", "Puebla"],
  argentina: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
  chile: ["Santiago", "Valparaíso", "Concepción"],
  colombia: ["Bogotá", "Medellín", "Cali", "Cartagena"],
  peru: ["Lima", "Arequipa", "Cusco"],
  uruguay: ["Montevideo", "Punta del Este", "Salto"],
  india: ["New Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Pune"],
  "south-africa": ["Cape Town", "Johannesburg", "Durban", "Pretoria"],
  thailand: ["Bangkok", "Chiang Mai", "Phuket"],
};

export const professionSuggestions = [
  "Software engineer", "Web developer", "Mobile developer", "Data analyst", "Data scientist", "AI engineer", "Cybersecurity analyst", "Cloud engineer", "DevOps engineer", "IT support specialist", "Product manager", "Project manager", "UX designer", "UI designer", "Graphic designer", "Architect", "Civil engineer", "Mechanical engineer", "Electrical engineer", "Chemical engineer", "Industrial engineer", "Environmental engineer", "Doctor", "Nurse", "Dentist", "Pharmacist", "Physiotherapist", "Psychologist", "Nutritionist", "Veterinarian", "Medical laboratory technician", "Caregiver", "Teacher", "University lecturer", "Researcher", "Translator", "Interpreter", "Language instructor", "Lawyer", "Accountant", "Financial analyst", "Economist", "Banker", "Insurance specialist", "Business analyst", "Management consultant", "Entrepreneur", "Founder", "Sales representative", "Marketing specialist", "Digital marketing specialist", "SEO specialist", "Content creator", "Journalist", "Writer", "Photographer", "Video editor", "Filmmaker", "Human resources specialist", "Recruiter", "Customer support specialist", "Administrative assistant", "Executive assistant", "Operations manager", "Logistics coordinator", "Supply chain analyst", "Procurement specialist", "Real estate agent", "Chef", "Cook", "Baker", "Pastry chef", "Waiter", "Bartender", "Barista", "Restaurant manager", "Hotel manager", "Receptionist", "Tour guide", "Travel consultant", "Flight attendant", "Pilot", "Driver", "Truck driver", "Delivery courier", "Electrician", "Plumber", "Carpenter", "Welder", "Mechanic", "Construction worker", "Technician", "Farmer", "Agronomist", "Biologist", "Chemist", "Geologist", "Social worker", "Personal trainer", "Sports coach", "Hairdresser", "Barber", "Beautician", "Fashion designer", "Musician", "Artist", "Student", "Independent professional", "Retired",
].sort((a, b) => a.localeCompare(b));

export function filterProfileOptions<T extends { label: string }>(options: readonly T[], query: string) {
  const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const term = normalize(query.trim());
  return options.filter(option => normalize(option.label).includes(term)).slice(0, 30);
}
