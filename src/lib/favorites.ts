import {
  getUserMemory,
  toggleFavoriteCountryInMemory,
  appendUserActivity,
} from "@/lib/user-memory";

export async function getFavoriteCountries() {
  const memory = await getUserMemory();
  return memory?.favoriteCountries || [];
}

export async function toggleFavoriteCountry(country: string) {
  const updated = await toggleFavoriteCountryInMemory(country);

  const isFavorite = updated.includes(country);

  await appendUserActivity(
    isFavorite
      ? `Added ${country} to favorites`
      : `Removed ${country} from favorites`
  );

  return updated;
}